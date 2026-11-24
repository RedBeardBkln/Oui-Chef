// Oui Chef generation engine: turns chef settings into ingredient combinations
// that cover the organoleptic panel. Pure functions with no DOM, so the
// engine can be tested in Node.
import { ROLES, REQUIRED_ROLES, OPTIONAL_ROLES, CATEGORIES, METHODS, SPICE_LEVELS } from './data/taxonomy.js';
import { REGIONS, REGION_BY_ID, regionLabel } from './data/regions.js';
import { FORMATS, PLACEMENTS, CREATIVITY, DEFAULT_SETTINGS } from './config.js';

// ---------------------------------------------------------------- utilities
export function makeRng(seed = Date.now()) {
  let a = (typeof seed === 'string' ? [...seed].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 1) : seed) >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

function weightedPick(items, weightFn, rng) {
  let total = 0;
  const w = items.map(i => { const x = Math.max(0, weightFn(i)); total += x; return x; });
  if (!total) return null;
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) { r -= w[i]; if (r <= 0) return items[i]; }
  return items[items.length - 1];
}

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const MEAT_CATS = new Set(['beef', 'pork', 'lamb', 'goat', 'poultry', 'game']);
const RED_MEAT_CATS = new Set(['beef', 'pork', 'lamb', 'goat', 'game']);
const SEA_ALLERGENS = ['fish', 'shellfish', 'mollusk'];

export const proteinGroup = ing => CATEGORIES[ing.category]?.protein || null;
export const isMainProtein = ing => !!proteinGroup(ing) && !ing.flags.includes('acc');
const has = (ing, flag) => ing.flags.includes(flag);
// Broths, noodles, breads, wraps and wrappers define a dish's format, so they
// only enter a list through a base slot, never as a random sensory filler.
const STRUCTURAL = ['broth', 'noodle', 'bread', 'wrap', 'wrapper', 'flatbread'];
const isStructural = ing => ing.formats.some(f => STRUCTURAL.includes(f));
const containsMeat = ing => MEAT_CATS.has(ing.category) || has(ing, 'meat') || has(ing, 'pork');
const containsDairy = ing => ing.allergens.includes('dairy');
const containsFish = ing => ing.category === 'fish' || ing.allergens.includes('fish');

// ------------------------------------------------------- dietary filtering
// Returns null if the ingredient is allowed, else a short reason.
export function dietConflict(ing, s) {
  for (const a of s.allergens || []) if (ing.allergens.includes(a)) return `contains ${a}`;
  const d = new Set(s.diets || []);
  const c = ing.category;
  if (d.has('vegan')) {
    if (MEAT_CATS.has(c) || ['fish', 'shellfish', 'mollusk', 'egg', 'dairy', 'cheese'].includes(c)) return 'not vegan';
    if (ing.allergens.some(a => ['dairy', 'egg', ...SEA_ALLERGENS].includes(a))) return 'not vegan';
    if (['meat', 'pork', 'honey'].some(f => has(ing, f))) return 'not vegan';
  }
  if (d.has('vegetarian')) {
    if (MEAT_CATS.has(c) || ['fish', 'shellfish', 'mollusk'].includes(c)) return 'not vegetarian';
    if (ing.allergens.some(a => SEA_ALLERGENS.includes(a))) return 'not vegetarian';
    if (['meat', 'pork', 'rennet'].some(f => has(ing, f))) return 'not vegetarian';
  }
  if (d.has('pescatarian') && (MEAT_CATS.has(c) || has(ing, 'meat') || has(ing, 'pork'))) return 'not pescatarian';
  if (d.has('halal') && (c === 'pork' || has(ing, 'pork') || has(ing, 'alcohol'))) return 'not halal';
  if (d.has('kosher') && (['pork', 'shellfish', 'mollusk'].includes(c) || has(ing, 'pork') || has(ing, 'nonkosher')
      || ing.allergens.includes('shellfish') || ing.allergens.includes('mollusk'))) return 'not kosher';
  if (d.has('no-pork') && (c === 'pork' || has(ing, 'pork'))) return 'contains pork';
  if (d.has('no-red-meat') && RED_MEAT_CATS.has(c)) return 'red meat';
  if (d.has('no-alcohol') && has(ing, 'alcohol')) return 'contains alcohol';
  return null;
}

// Kosher-style: never combine meat with dairy, nor meat with fish.
function kosherClash(ing, picked) {
  const all = picked.map(p => p.ing).filter(Boolean);
  if (containsMeat(ing) && all.some(p => containsDairy(p) || containsFish(p))) return true;
  if ((containsDairy(ing) || containsFish(ing)) && all.some(containsMeat)) return true;
  return false;
}

// --------------------------------------------------------- settings logic
export function resolveSettings(raw) {
  const s = { ...DEFAULT_SETTINGS, ...raw };
  const format = FORMATS.find(f => f.id === s.format) || null;
  const placement = PLACEMENTS.find(p => p.id === s.placement) || null;
  const spice = SPICE_LEVELS.find(x => x.id === s.spice) || SPICE_LEVELS[1];
  const creativity = CREATIVITY.find(c => c.id === s.creativity) || CREATIVITY[1];
  const dessert = !!placement?.dessert;

  // Protein groups: explicit chef choice ∩ format restriction.
  let proteins = (s.proteins || []).filter(Boolean);
  const notes = [];
  if (format?.proteins) {
    const inter = proteins.length ? proteins.filter(p => format.proteins.includes(p)) : format.proteins;
    if (proteins.length && !inter.length) notes.push(`${format.label} overrides the protein selection.`);
    proteins = inter.length ? inter : format.proteins;
  }
  const d = new Set(s.diets);
  if (d.has('vegan')) proteins = proteins.filter(p => p === 'plant' || p === 'none');
  if (d.has('vegetarian')) proteins = proteins.filter(p => ['plant', 'egg', 'none'].includes(p));
  if ((s.proteins || []).length && !proteins.length && (d.has('vegan') || d.has('vegetarian')))
    notes.push('Selected proteins conflict with the dietary restriction; using plant-based protein.');
  if ((s.proteins || []).length && !proteins.length) proteins = d.has('vegan') ? ['plant'] : ['plant', 'egg'];

  let proteinMode = placement?.protein || 'required';
  if (dessert) proteinMode = 'none';
  if (proteins.includes('none')) proteinMode = proteins.length === 1 ? 'none' : 'optional';
  // A protein the chef picked is always used (e.g. a Side with Pork), except in desserts.
  if ((s.proteins || []).filter(p => p !== 'none').length && proteinMode !== 'required' && !dessert && !proteins.includes('none')) proteinMode = 'required';

  const bases = [...new Set([...(format?.base || []), ...(placement?.base || [])])];
  const methodBias = [...new Set([...(format?.methodBias || []), ...(placement?.methodBias || [])])];
  const required = [...REQUIRED_ROLES];
  if (spice.id !== 'none') required.push('spicy');
  if (dessert) required.splice(required.indexOf('umami'), 1); // umami optional in desserts
  const optional = [...OPTIONAL_ROLES, ...(dessert ? ['umami'] : [])];

  return {
    ...s, format, placement, spice, creativity, dessert, proteins: proteins.filter(p => p !== 'none'),
    proteinMode, bases, methodBias, required, optional, notes,
    excludeTerms: (s.exclude || []).map(norm).filter(Boolean),
  };
}

function regionMatch(ing, anchor) {
  // 0 = off-region, 0.5 = global pantry, 1 = other sub of same region, 3 = region, 5 = sub-region
  let best = 0;
  for (const r of ing.regions) {
    if (r === 'global') { best = Math.max(best, 0.5); continue; }
    const [rid, sub] = r.split('.');
    if (rid !== anchor.region) continue;
    if (!sub) best = Math.max(best, 3);
    else if (sub === anchor.sub) best = Math.max(best, 5);
    else best = Math.max(best, anchor.sub ? 1 : 3);
  }
  return best;
}

export function originLabel(ing) {
  const ids = [...new Set(ing.regions.filter(r => r !== 'global').map(r => r.split('.')[0]))];
  if (!ids.length) return 'Pantry staple';
  return ids.slice(0, 2).map(id => REGION_BY_ID[id]?.name).filter(Boolean).join(' / ');
}

// Base eligibility for the whole batch (diet, allergens, exclusions, heat, dessert).
export function eligiblePool(ingredients, rs) {
  return ingredients.filter(ing => {
    if (dietConflict(ing, rs)) return false;
    if (ing.heat > rs.spice.max) return false;
    if (rs.dessert && !has(ing, 'dessert')) return false;
    const n = norm(ing.name);
    if (rs.excludeTerms.some(t => n.includes(t) || ing.id === t.replace(/ /g, '-'))) return false;
    // When the chef picked protein groups, keep meat accents within them.
    if (rs.proteins.length && proteinGroup(ing) && proteinGroup(ing) !== 'plant' && proteinGroup(ing) !== 'egg'
        && !rs.proteins.includes(proteinGroup(ing))) return false;
    if (rs.proteinMode === 'none' && isMainProtein(ing) && !['egg', 'plantprotein'].includes(ing.category)) return false;
    return true;
  });
}

export function findIngredient(ingredients, name) {
  const n = norm(name);
  return ingredients.find(i => norm(i.name) === n || i.id === n.replace(/ /g, '-'))
    || ingredients.find(i => norm(i.name).startsWith(n) && n.length >= 4) || null;
}

// --------------------------------------------------------- cooking methods
// Condiments, wines, fats and sweeteners aren't "braised" themselves; they're used in a braise.
const USED_IN = {
  braised: 'in the braise', stewed: 'in the stew', 'stir-fried': 'in the stir-fry', poached: 'as poaching liquid',
  fried: 'for frying', roasted: 'for roasting', steamed: 'in the steam', sauteed: 'for sautéing',
  grilled: 'as a grill baste', seared: 'for searing', baked: 'baked in', simmered: 'in the simmer',
};
export function methodLabel(ing, method) {
  if (!method || method === 'as-is') return '';
  if (ing && ['condiment', 'fat', 'sweetener'].includes(ing.category) && USED_IN[method]) return USED_IN[method];
  return METHODS[method] || method;
}
function chooseMethod(ing, slot, rs, usedMethods, rng) {
  let opts = ing.methods.length ? ing.methods : ['as-is'];
  if (slot === 'protein' && rs.format?.proteinMethods) {
    const r = opts.filter(m => rs.format.proteinMethods.includes(m));
    if (r.length) opts = r;
  }
  return weightedPick(opts, m => {
    let w = 1;
    if (rs.methodBias.includes(m)) w *= 2.5;
    if (!['as-is', 'raw'].includes(m) && usedMethods.has(m)) w *= 0.35;
    return w;
  }, rng) || opts[0];
}

// -------------------------------------------------------------- one list
function panelRoles(ing, rs) {
  return ing.roles.filter(r => r !== 'spicy' || (ing.heat >= rs.spice.min && rs.spice.id !== 'none'));
}

function buildItem(ing, extra) {
  return {
    id: ing.id, name: ing.name, category: ing.category, roles: [...ing.roles], heat: ing.heat,
    allergens: [...ing.allergens], origin: originLabel(ing), ing, ...extra,
  };
}

export function generateList(ingredients, pool, rs, opts = {}) {
  const rng = opts.rng || Math.random;
  const usage = opts.usage || new Map();
  const anchor = opts.anchor || pickAnchor(rs, rng);
  const kosher = (rs.diets || []).includes('kosher');
  const picked = [];
  const covered = new Set();
  const warnings = [];
  const usedIds = new Set();
  const usedCats = new Map();

  const add = (ing, extra) => {
    const item = ing ? buildItem(ing, extra) : extra;
    picked.push(item);
    if (ing) {
      usedIds.add(ing.id);
      usedCats.set(ing.category, (usedCats.get(ing.category) || 0) + 1);
      for (const r of panelRoles(ing, rs)) covered.add(r);
    } else for (const r of item.roles || []) covered.add(r);
    return item;
  };

  const allowed = ing => !usedIds.has(ing.id) && !(kosher && kosherClash(ing, picked));
  const affinity = ing => {
    const notes = new Set(picked.flatMap(p => p.ing?.notes || []));
    return 1 + 0.3 * Math.min(3, ing.notes.filter(n => notes.has(n)).length);
  };
  const weight = (ing, { wildcard = false } = {}) => {
    const rm = regionMatch(ing, anchor);
    if (wildcard && isMainProtein(ing)) return 0; // wildcards accent a dish; they don't replace its protein
    let w = wildcard ? (rm === 0 ? 1 : 0) : rm;
    if (!w) return 0;
    w *= affinity(ing);
    w /= 1 + 1.5 * (usage.get(ing.id) || 0);
    const catN = usedCats.get(ing.category) || 0;
    if (catN && !['veg', 'herb', 'fruit'].includes(ing.category)) w *= 0.4 ** catN;
    if (isMainProtein(ing) && picked.some(p => p.ing && isMainProtein(p.ing))) w *= 0.15;
    return w;
  };
  const pick = (cands, extra, wildcard = false) => {
    let c = cands.filter(allowed);
    let ing = weightedPick(c, i => weight(i, { wildcard }), rng);
    let isWild = wildcard;
    if (!ing && !wildcard) { // nothing on-region: borrow from anywhere
      ing = weightedPick(c, i => affinity(i) / (1 + (usage.get(i.id) || 0)), rng);
      isWild = !!ing && regionMatch(ing, anchor) === 0;
    }
    if (!ing) return null;
    return add(ing, { ...extra, wildcard: isWild && regionMatch(ing, anchor) === 0 });
  };

  // 1. Locked items carried over from a re-roll.
  for (const l of opts.locked || []) {
    const ing = ingredients.find(i => i.id === l.id);
    add(ing || null, { ...l, ing: ing || undefined, locked: true });
  }
  const lockedSlots = new Set(picked.map(p => p.slot));

  // 2. Chef-included ingredients.
  for (const inc of rs.include || []) {
    if (picked.some(p => norm(p.name) === norm(inc))) continue;
    const ing = findIngredient(ingredients, inc);
    if (ing && !pool.includes(ing)) { warnings.push(`“${ing.name}” skipped: ${dietConflict(ing, rs) || 'outside current settings'}.`); continue; }
    if (ing) add(ing, { slot: 'include', forced: true });
    else add(null, { id: 'custom-' + norm(inc).replace(/ /g, '-'), name: inc, roles: [], category: 'custom', custom: true, forced: true, slot: 'include', origin: 'Chef’s pick', allergens: [] });
  }

  // 3. Main protein.
  const hasProtein = picked.some(p => p.slot === 'protein' || (p.ing && isMainProtein(p.ing)));
  const wantProtein = rs.proteinMode === 'required' || (rs.proteinMode === 'optional' && rng() < 0.6);
  if (!hasProtein && wantProtein && !lockedSlots.has('protein')) {
    const groups = rs.proteins.length ? rs.proteins : null;
    const cands = pool.filter(i => isMainProtein(i) && (groups ? groups.includes(proteinGroup(i)) : proteinGroup(i) !== 'egg'));
    if (!pick(cands, { slot: 'protein' })) warnings.push('No protein matches these settings.');
  }

  // 4. Format / placement bases.
  for (const b of rs.bases) {
    if (picked.some(p => p.ing?.formats.includes(b))) continue;
    if (!pick(pool.filter(i => i.formats.includes(b)), { slot: 'base' }))
      warnings.push(`No ${b} base fits these restrictions.`);
  }
  if (rs.placement?.extra?.includes('starch') && !picked.some(p => p.slot === 'base' || p.slot === 'starch')) {
    pick(pool.filter(i => i.category === 'starch' || i.formats.some(f => ['grain', 'noodle', 'bread'].includes(f))), { slot: 'starch' });
  }
  if (rs.format?.force && !picked.some(p => p.category === rs.format.force)) {
    pick(pool.filter(i => i.category === rs.format.force), { slot: 'feature' });
  }

  // 5. Cover the sensory panel. Wildcard roles come from outside the cuisine.
  const needed = shuffle(rs.required, rng);
  const wildRoles = new Set(needed.filter(r => !covered.has(r)).slice(0, rs.creativity.wildcards));
  for (const role of [...needed, ...rs.optional]) {
    if (covered.has(role)) continue;
    const roleOk = i => i.roles.includes(role) && (role !== 'spicy' || i.heat >= rs.spice.min);
    const c = pool.filter(i => roleOk(i) && allowed(i) && !isStructural(i));
    const uncovered = [...rs.required, ...rs.optional].filter(r => !covered.has(r) && r !== role);
    const bonus = i => 1 + 0.5 * i.roles.filter(r => uncovered.includes(r)).length;
    const isWild = wildRoles.has(role);
    let ing = weightedPick(c, i => weight(i, { wildcard: isWild }) * bonus(i), rng);
    let wild = isWild && !!ing;
    if (!ing && isWild) ing = weightedPick(c, i => weight(i) * bonus(i), rng);
    if (!ing) { // nothing on-region: borrow from anywhere
      ing = weightedPick(c, i => affinity(i) * bonus(i), rng);
      wild = !!ing && regionMatch(ing, anchor) === 0;
    }
    const item = ing ? add(ing, { slot: 'role', role, wildcard: wild }) : null;
    if (!item && rs.required.includes(role)) warnings.push(`Couldn’t cover ${ROLES[role].label.toLowerCase()} with these restrictions.`);
  }

  // 5b. Reinforce: lists under the minimum size double up on roles that
  //     only one ingredient provides, so the chef has more to work with.
  const minItems = rs.placement?.id === 'amuse' ? 6 : 8;
  for (let guard = 0; picked.length < minItems && guard < 12; guard++) {
    const counts = Object.fromEntries(rs.required.map(r => [r, 0]));
    for (const p of picked) for (const r of (p.ing ? panelRoles(p.ing, rs) : [])) if (r in counts) counts[r]++;
    const thin = shuffle(rs.required.filter(r => r !== 'spicy'), rng).sort((a, b) => counts[a] - counts[b]);
    let added = false;
    for (const role of thin.slice(0, 4)) {
      const c = pool.filter(i => i.roles.includes(role) && allowed(i) && !isMainProtein(i) && !isStructural(i));
      const ing = weightedPick(c, i => weight(i), rng);
      if (ing) { add(ing, { slot: 'role', role, wildcard: false }); added = true; break; }
    }
    if (!added) break;
  }

  // 6. Cooking methods (keep locked ones).
  const usedMethods = new Set(picked.filter(p => p.method).map(p => p.method));
  for (const p of picked) {
    if (p.method || !p.ing) continue;
    p.method = chooseMethod(p.ing, p.slot, rs, usedMethods, rng);
    usedMethods.add(p.method);
  }
  for (const p of picked) {
    p.methodLabel = methodLabel(p.ing, p.method);
    if (p.ing) usage.set(p.id, (usage.get(p.id) || 0) + 1);
  }

  const coverage = Object.fromEntries([...rs.required, ...rs.optional].map(r => [r, covered.has(r)]));
  return {
    id: Math.floor(rng() * 1e9).toString(36),
    anchor: { ...anchor, label: regionLabel(anchor.region, anchor.sub) },
    items: order(picked),
    coverage,
    gaps: rs.required.filter(r => !covered.has(r)),
    warnings,
  };
}

const SLOT_ORDER = { protein: 0, feature: 1, base: 2, starch: 3, include: 4, role: 5 };
function order(items) {
  return [...items].sort((a, b) => (SLOT_ORDER[a.slot] ?? 9) - (SLOT_ORDER[b.slot] ?? 9));
}

function pickAnchor(rs, rng) {
  if (rs.region) return { region: rs.region, sub: rs.sub || '' };
  const r = REGIONS[Math.floor(rng() * REGIONS.length)];
  return { region: r.id, sub: '' };
}

// ---------------------------------------------------------- whole batch
export function generate(ingredients, settings, { count = 10, seed } = {}) {
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
  const rs = resolveSettings(settings);
  const pool = eligiblePool(ingredients, rs);
  const usage = new Map();
  // With no region chosen, spread the ten lists across different cuisines.
  const anchors = rs.region ? null : shuffle(REGIONS, rng).slice(0, count).map(r => ({ region: r.id, sub: '' }));
  const lists = [];
  for (let i = 0; i < count; i++) {
    lists.push(generateList(ingredients, pool, rs, { rng, usage, anchor: anchors?.[i % anchors.length] }));
  }
  const warnings = [...new Set([...rs.notes, ...lists.flatMap(l => l.warnings)])];
  return { lists, warnings, settings: { ...settings } };
}

// Re-roll one list, keeping locked items.
export function rerollList(ingredients, settings, list, { seed } = {}) {
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
  const rs = resolveSettings(settings);
  const pool = eligiblePool(ingredients, rs);
  const locked = list.items.filter(i => i.locked).map(({ ing, ...rest }) => rest);
  return generateList(ingredients, pool, rs, { rng, locked, anchor: { region: list.anchor.region, sub: list.anchor.sub } });
}

// Swap one ingredient for another that covers the same panel roles.
export function swapItem(ingredients, settings, list, index, { seed } = {}) {
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
  const rs = resolveSettings(settings);
  const pool = eligiblePool(ingredients, rs);
  const target = list.items[index];
  const others = list.items.filter((_, i) => i !== index);
  const otherRoles = new Set(others.flatMap(o => o.ing ? panelRoles(o.ing, rs) : o.roles || []));
  const mustCover = (target.ing ? panelRoles(target.ing, rs) : []).filter(r => !otherRoles.has(r));
  const anchor = list.anchor;
  const kosher = (rs.diets || []).includes('kosher');
  const ids = new Set(list.items.map(i => i.id));
  let cands = pool.filter(i => !ids.has(i.id) && mustCover.every(r => i.roles.includes(r) && (r !== 'spicy' || i.heat >= rs.spice.min))
    && !(kosher && kosherClash(i, others)));
  if (target.slot === 'protein') cands = cands.filter(i => isMainProtein(i) && (!rs.proteins.length || rs.proteins.includes(proteinGroup(i))));
  else if (target.slot === 'base') cands = cands.filter(i => i.formats.some(f => target.ing?.formats.includes(f)));
  else cands = cands.filter(i => (!isMainProtein(i) || i.category === target.category) && !isStructural(i));
  const onRegion = cands.filter(i => regionMatch(i, anchor) > 0);
  const choice = weightedPick(onRegion.length && !target.wildcard ? onRegion : cands, i => 1 + regionMatch(i, anchor), rng);
  if (!choice) return null;
  const item = buildItem(choice, { slot: target.slot, role: target.role, wildcard: regionMatch(choice, anchor) === 0 });
  item.method = chooseMethod(choice, target.slot, rs, new Set(others.map(o => o.method)), rng);
  item.methodLabel = methodLabel(choice, item.method);
  const items = [...list.items];
  items[index] = item;
  const covered = new Set(items.flatMap(o => o.ing ? panelRoles(o.ing, rs) : o.roles || []));
  return { ...list, items, coverage: Object.fromEntries(Object.keys(list.coverage).map(r => [r, covered.has(r)])),
    gaps: rs.required.filter(r => !covered.has(r)) };
}

// Strip engine references so a list can be stored as JSON.
export function serializeList(list) {
  return { ...list, items: list.items.map(({ ing, ...rest }) => rest) };
}
export function hydrateList(ingredients, list) {
  return { ...list, items: list.items.map(i => ({ ...i, ing: ingredients.find(x => x.id === i.id) })) };
}
