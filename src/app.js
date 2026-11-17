import { INGREDIENTS } from './data/index.js';
import { REGIONS, REGION_BY_ID } from './data/regions.js';
import { ROLES, ALLERGENS, SPICE_LEVELS } from './data/taxonomy.js';
import { DIETS, PROTEINS, FORMATS, PLACEMENTS, CREATIVITY, DEFAULT_SETTINGS } from './config.js';
import { generate, rerollList, swapItem, serializeList, hydrateList } from './engine.js';
import { buildDish } from './dish.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const store = {
  get(k, d) { try { const v = localStorage.getItem('ouichef:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ouichef:' + k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

let settings = { ...DEFAULT_SETTINGS, ...store.get('settings', {}) };
let lists = [];
let lastSettings = null;
let saved = store.get('saved', []);

const ICON = {
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>',
};

// ------------------------------------------------------------- the brief
function option(value, label, sel) { return `<option value="${esc(value)}"${sel ? ' selected' : ''}>${esc(label)}</option>`; }

function renderBrief() {
  $('#region').innerHTML = option('', 'Any region (ten different cuisines)', !settings.region)
    + REGIONS.map(r => option(r.id, r.name, r.id === settings.region)).join('');
  renderSub();
  $('#format').innerHTML = option('', 'None', !settings.format) + FORMATS.map(f => option(f.id, f.label, f.id === settings.format)).join('');

  const chipSet = (name, opts, multi = true) => {
    const el = $(`.chips[data-name="${name}"]`);
    const cur = settings[name];
    el.innerHTML = opts.map(o => {
      const on = multi ? cur.includes(o.id) : cur === o.id;
      return `<button type="button" class="chip" data-value="${o.id}" aria-pressed="${on}"${o.hint ? ` title="${esc(o.hint)}"` : ''}>${esc(o.label)}</button>`;
    }).join('');
  };
  chipSet('placement', PLACEMENTS, false);
  chipSet('proteins', PROTEINS);
  chipSet('diets', DIETS);
  chipSet('allergens', Object.entries(ALLERGENS).map(([id, label]) => ({ id, label })));

  const seg = (name, opts) => {
    $(`.segmented[data-name="${name}"]`).innerHTML = opts.map(o =>
      `<button type="button" data-value="${o.id}" aria-pressed="${settings[name] === o.id}">${esc(o.label)}</button>`).join('');
  };
  seg('spice', SPICE_LEVELS);
  seg('creativity', CREATIVITY);
  $('#creativity-hint').textContent = CREATIVITY.find(c => c.id === settings.creativity)?.hint || '';

  for (const name of ['include', 'exclude']) {
    $(`.tag-field[data-name="${name}"] .tags`).innerHTML = settings[name].map((t, i) =>
      `<span class="tag">${esc(t)}<button type="button" data-remove="${i}" aria-label="Remove ${esc(t)}">×</button></span>`).join('');
  }
}

function renderSub() {
  const r = REGION_BY_ID[settings.region];
  const wrap = $('#sub-wrap');
  if (!r || !r.subs.length) { wrap.hidden = true; settings.sub = ''; return; }
  wrap.hidden = false;
  if (!r.subs.some(s => s.id === settings.sub)) settings.sub = '';
  $('#sub').innerHTML = option('', `All of ${r.name}`, !settings.sub) + r.subs.map(s => option(s.id, s.name, s.id === settings.sub)).join('');
}

function saveSettings() { store.set('settings', settings); }

function bindBrief() {
  const form = $('#brief');
  $('#region').addEventListener('change', e => { settings.region = e.target.value; settings.sub = ''; renderSub(); saveSettings(); });
  $('#sub').addEventListener('change', e => { settings.sub = e.target.value; saveSettings(); });
  $('#format').addEventListener('change', e => { settings.format = e.target.value; saveSettings(); });

  form.addEventListener('click', e => {
    const chip = e.target.closest('.chips .chip');
    if (chip) {
      const box = chip.parentElement; const name = box.dataset.name; const v = chip.dataset.value;
      if (box.hasAttribute('data-single')) settings[name] = settings[name] === v ? '' : v;
      else {
        let arr = settings[name].includes(v) ? settings[name].filter(x => x !== v) : [...settings[name], v];
        if (name === 'proteins' && v === 'none' && arr.includes('none')) arr = ['none'];
        else if (name === 'proteins') arr = arr.filter(x => x !== 'none' || v === 'none');
        settings[name] = arr;
      }
      saveSettings(); renderBrief(); return;
    }
    const seg = e.target.closest('.segmented button');
    if (seg) { settings[seg.parentElement.dataset.name] = seg.dataset.value; saveSettings(); renderBrief(); return; }
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      const name = rm.closest('.tag-field').dataset.name;
      settings[name] = settings[name].filter((_, i) => i !== Number(rm.dataset.remove));
      saveSettings(); renderBrief();
    }
  });

  for (const field of $$('.tag-field')) {
    const input = $('input', field);
    const commit = () => {
      const vals = input.value.split(',').map(s => s.trim()).filter(Boolean);
      const name = field.dataset.name;
      for (const v of vals) if (!settings[name].some(x => x.toLowerCase() === v.toLowerCase())) settings[name].push(v);
      input.value = ''; saveSettings(); renderBrief();
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); } });
    input.addEventListener('change', () => { if (INGREDIENTS.some(i => i.name === input.value)) commit(); });
    input.addEventListener('blur', () => { if (input.value.trim()) commit(); });
  }

  $('#ingredient-list').innerHTML = [...new Set(INGREDIENTS.map(i => i.name))].sort((a, b) => a.localeCompare(b))
    .map(n => `<option value="${esc(n)}">`).join('');

  form.addEventListener('submit', e => { e.preventDefault(); runGenerate(); });
  $('#reset').addEventListener('click', () => { settings = structuredClone(DEFAULT_SETTINGS); saveSettings(); renderBrief(); });
  $('#surprise').addEventListener('click', () => {
    const pick = a => a[Math.floor(Math.random() * a.length)];
    const r = pick(REGIONS);
    settings = { ...settings, region: r.id, sub: r.subs.length && Math.random() < .6 ? pick(r.subs).id : '',
      format: Math.random() < .4 ? pick(FORMATS).id : '', placement: pick(PLACEMENTS).id,
      spice: pick(SPICE_LEVELS).id, creativity: pick(CREATIVITY).id, proteins: [] };
    saveSettings(); renderBrief(); runGenerate();
  });
}

// -------------------------------------------------------------- results
function genSettings() {
  return {
    ...settings,
    formatNoun: FORMATS.find(f => f.id === settings.format)?.noun || '',
    placementNoun: PLACEMENTS.find(p => p.id === settings.placement)?.noun || '',
  };
}

function runGenerate() {
  lastSettings = genSettings();
  const res = generate(INGREDIENTS, lastSettings, { count: 10 });
  lists = res.lists;
  renderResultsHead(res.warnings);
  renderLists();
  if (matchMedia('(max-width: 979px)').matches) $('.results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function summaryTags(s) {
  const t = [];
  t.push(s.region ? (REGION_BY_ID[s.region].subs.find(x => x.id === s.sub)?.name || 'All') + ' · ' + REGION_BY_ID[s.region].name : 'Any region');
  if (s.format) t.push(FORMATS.find(f => f.id === s.format).label);
  if (s.placement) t.push(PLACEMENTS.find(p => p.id === s.placement).label);
  t.push('Spice: ' + SPICE_LEVELS.find(x => x.id === s.spice).label);
  if (s.proteins.length) t.push(s.proteins.map(p => PROTEINS.find(x => x.id === p)?.label).join(', '));
  for (const d of s.diets) t.push(DIETS.find(x => x.id === d).label);
  for (const a of s.allergens) t.push('No ' + ALLERGENS[a].toLowerCase());
  for (const i of s.include) t.push('+ ' + i);
  for (const x of s.exclude) t.push('− ' + x);
  return t;
}

function renderResultsHead(warnings = []) {
  $('#results-head').innerHTML = `
    <div class="results-summary">
      <div class="summary-tags">${summaryTags(lastSettings).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div><button class="btn" id="regen">↻ Regenerate all</button> <button class="btn" id="print">Print</button></div>
    </div>
    ${warnings.length ? `<div class="warnings"><strong>Heads up</strong><ul>${warnings.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>` : ''}`;
  $('#regen').onclick = runGenerate;
  $('#print').onclick = () => window.print();
}

function roleTag(r) { return `<span class="role" style="--rc:var(--r-${r})">${esc(ROLES[r]?.label.split(' ')[0] || r)}</span>`; }

const SLOT_LABEL = { protein: 'Protein', base: 'Base', starch: 'Starch', include: 'Your pick', feature: 'Feature' };

function cardHTML(list, idx, { savedMode = false } = {}) {
  const panel = Object.entries(list.coverage).map(([r, ok]) =>
    `<span class="dot${ok ? '' : ' miss'}" style="--rc:var(--r-${r})" title="${ROLES[r].label}${ok ? ' covered' : ' not covered'}">${esc(ROLES[r].label.split(' ')[0])}</span>`).join('');
  const isSaved = saved.some(s => s.id === list.id);
  const items = list.items.map((it, i) => {
    const panelRoles = (it.roles || []).filter(r => r !== 'spicy' || it.heat > 0);
    return `<li class="item${it.locked ? ' locked' : ''}">
      <div class="item-name">${esc(it.name)}${it.methodLabel ? `<span class="item-method">${esc(it.methodLabel.toLowerCase())}</span>` : ''}</div>
      <div class="item-meta">
        ${SLOT_LABEL[it.slot] ? `<span class="slot">${SLOT_LABEL[it.slot]}</span>` : ''}
        ${panelRoles.map(roleTag).join('')}
        ${it.wildcard ? `<span class="wild" title="From outside this cuisine">✦ ${esc(it.origin)}</span>` : ''}
      </div>
      ${savedMode ? '' : `<div class="item-actions">
        <button class="icon-btn" data-act="lock" data-i="${i}" aria-pressed="${!!it.locked}" aria-label="${it.locked ? 'Unlock' : 'Lock'} ${esc(it.name)}" title="${it.locked ? 'Unlock' : 'Lock (keep on re-roll)'}">${it.locked ? ICON.lock : ICON.unlock}</button>
        ${it.custom ? '' : `<button class="icon-btn" data-act="swap" data-i="${i}" aria-label="Swap ${esc(it.name)}" title="Swap for an alternative">${ICON.swap}</button>`}
      </div>`}
    </li>`;
  }).join('');
  return `<article class="card" data-idx="${idx}">
    <div class="card-head">
      <div class="card-title"><h3>${esc(list.anchor.label)}</h3><span class="card-num">#${idx + 1}</span></div>
      <div class="panel" aria-label="Sensory panel coverage">${panel}</div>
    </div>
    <ul class="items">${items}</ul>
    ${list.gaps?.length ? `<p class="gap-note">Not covered: ${list.gaps.map(g => ROLES[g].label.toLowerCase()).join(', ')}. Your restrictions leave no option in the database.</p>` : ''}
    <div class="card-foot">
      ${savedMode ? `<button class="btn" data-act="unsave">Remove</button>`
        : `<button class="btn" data-act="reroll" title="New combination, keeping locked items">↻ Re-roll</button>
           <button class="btn${isSaved ? ' saved' : ''}" data-act="save" aria-pressed="${isSaved}">${isSaved ? '♥ Saved' : '♡ Save'}</button>`}
      <button class="btn" data-act="copy">Copy</button>
      <span class="spacer"></span>
      <button class="btn primary" data-act="dish">Generate dish</button>
    </div>
  </article>`;
}

function renderLists() {
  $('#lists').innerHTML = lists.map((l, i) => cardHTML(l, i)).join('');
}

function listText(list, n) {
  const lines = [`Oui Chef — ${list.anchor.label}${n != null ? ` (#${n + 1})` : ''}`];
  for (const it of list.items) {
    const roles = (it.roles || []).filter(r => r !== 'spicy' || it.heat > 0).map(r => ROLES[r]?.label.split(' ')[0].toLowerCase()).join(', ');
    lines.push(`• ${it.name}${it.methodLabel ? ` — ${it.methodLabel.toLowerCase()}` : ''}${roles ? ` (${roles})` : ''}${it.wildcard ? ` ✦ ${it.origin}` : ''}`);
  }
  return lines.join('\n');
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Copied to clipboard'); }
  catch { toast('Copy not available in this browser'); }
}

let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2000);
}

function toggleSave(list) {
  if (saved.some(s => s.id === list.id)) saved = saved.filter(s => s.id !== list.id);
  else saved = [{ ...serializeList(list), settings: lastSettings, savedAt: Date.now() }, ...saved];
  store.set('saved', saved); updateSavedCount();
}

function bindResults() {
  $('#lists').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    const card = btn.closest('.card'); const idx = Number(card.dataset.idx); const list = lists[idx];
    const act = btn.dataset.act;
    if (act === 'lock') { const it = list.items[Number(btn.dataset.i)]; it.locked = !it.locked; }
    else if (act === 'swap') {
      const next = swapItem(INGREDIENTS, lastSettings, list, Number(btn.dataset.i));
      if (next) lists[idx] = next; else { toast('No alternative fits these settings'); return; }
    }
    else if (act === 'reroll') lists[idx] = rerollList(INGREDIENTS, lastSettings, list);
    else if (act === 'save') toggleSave(list);
    else if (act === 'copy') return copy(listText(list, idx));
    else if (act === 'dish') return openDish(list, lastSettings);
    card.outerHTML = cardHTML(lists[idx], idx);
  });
  $('#saved-lists').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    const s = saved[Number(btn.closest('.card').dataset.idx)];
    if (btn.dataset.act === 'unsave') { saved = saved.filter(x => x !== s); store.set('saved', saved); updateSavedCount(); renderSaved(); }
    else if (btn.dataset.act === 'copy') copy(listText(s));
    else if (btn.dataset.act === 'dish') openDish(hydrateList(INGREDIENTS, s), s.settings || {});
  });
}

// ----------------------------------------------------------------- dish
function openDish(list, s) {
  const d = buildDish(list, s);
  const body = $('#dish-body');
  body.innerHTML = `<div class="dish">
      <div class="dish-kicker">${esc(d.cuisine)} · dish concept</div>
      <h2 class="dish-title">${esc(d.title)}</h2>
      <p class="dish-sub">${esc(d.subtitle)}</p>
      <div class="dish-groups">${d.groups.map(g => `<div class="dish-group"><h5>${esc(g.label)}</h5><ul>${g.items.map(i =>
        `<li>${esc(i.name)}${i.methodLabel ? ` <em>${esc(i.methodLabel.toLowerCase())}</em>` : ''}</li>`).join('')}</ul></div>`).join('')}</div>
      <h4>Sensory balance</h4>
      <div class="balance">${d.balance.map(b => `<div><span>${roleTag(b.role)}</span><span>${esc(b.items.join(', '))}</span></div>`).join('')}</div>
      ${d.contrasts.length ? `<h4>Contrast</h4><p>${esc(d.contrasts.join('; '))}.</p>` : ''}
      ${d.methods.length ? `<h4>Cooking methods in play</h4><p>${esc(d.methods.join(' · '))}</p>` : ''}
      <h4>Plating idea</h4>
      <p class="plating">${esc(d.plating)}</p>
    </div>
    <div class="dish-actions">
      <button class="btn" data-dish="again">↻ Another take</button>
      <button class="btn" data-dish="copy">Copy</button>
      <button class="btn primary" data-dish="close">Close</button>
    </div>`;
  const dlg = $('#dish-dialog');
  body.onclick = e => {
    const a = e.target.closest('[data-dish]')?.dataset.dish;
    if (a === 'close') dlg.close();
    if (a === 'again') openDish(list, s);
    if (a === 'copy') copy(`${d.title}\n${d.subtitle}\n\n${d.groups.map(g => `${g.label}: ${g.items.map(i => i.name + (i.methodLabel ? ` (${i.methodLabel.toLowerCase()})` : '')).join(', ')}`).join('\n')}\n\nPlating idea: ${d.plating}`);
  };
  if (!dlg.open) dlg.showModal();
}
$('#dish-dialog').addEventListener('click', e => { if (e.target.id === 'dish-dialog') e.target.close(); });

// ---------------------------------------------------------------- saved
function updateSavedCount() { $('#saved-count').textContent = saved.length || ''; }
function renderSaved() {
  $('#saved-lists').innerHTML = saved.length
    ? saved.map((s, i) => cardHTML(s, i, { savedMode: true })).join('')
    : '<div class="empty"><h2>Nothing saved yet</h2><p>Tap ♡ Save on any combination to keep it here. Saved combinations stay on this device.</p></div>';
}

function bindTabs() {
  for (const tab of $$('.tab')) tab.addEventListener('click', () => {
    const v = tab.dataset.view;
    $$('.tab').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    $('#view-create').hidden = v !== 'create';
    $('#view-saved').hidden = v !== 'saved';
    if (v === 'saved') renderSaved();
  });
}

renderBrief();
bindBrief();
bindResults();
bindTabs();
updateSavedCount();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
