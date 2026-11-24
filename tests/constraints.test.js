import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INGREDIENTS } from '../src/data/index.js';
import { REGIONS } from '../src/data/regions.js';
import { ALLERGENS, SPICE_LEVELS } from '../src/data/taxonomy.js';
import { DIETS, PROTEINS, FORMATS, PLACEMENTS, DEFAULT_SETTINGS } from '../src/config.js';
import { conflicts, sanitize } from '../src/constraints.js';
import { generate, resolveSettings, makeRng, proteinGroup } from '../src/engine.js';

const base = { ...DEFAULT_SETTINGS };

test('selecting Beef greys out Vegan, Vegetarian, Pescatarian and No red meat', () => {
  const cf = conflicts({ ...base, proteins: ['beef'] });
  for (const d of ['vegan', 'vegetarian', 'pescatarian', 'no-red-meat']) assert.ok(cf.diets[d], d);
  for (const d of ['halal', 'kosher', 'no-pork', 'no-alcohol']) assert.ok(!cf.diets[d], d);
});

test('rules work in both directions', () => {
  const cf = conflicts({ ...base, diets: ['vegan'] });
  for (const p of ['beef', 'pork', 'lamb', 'goat', 'poultry', 'game', 'fish', 'shellfish', 'egg']) assert.ok(cf.proteins[p], p);
  assert.ok(!cf.proteins.plant);
  const halal = conflicts({ ...base, diets: ['halal'] });
  assert.deepEqual(Object.keys(halal.proteins), ['pork']);
  const kosher = conflicts({ ...base, diets: ['kosher'] });
  assert.deepEqual(Object.keys(kosher.proteins).sort(), ['pork', 'shellfish']);
});

test('shellfish protein only conflicts once both crustaceans and mollusks are excluded', () => {
  assert.ok(!conflicts({ ...base, allergens: ['shellfish'] }).proteins.shellfish);
  assert.ok(conflicts({ ...base, allergens: ['shellfish', 'mollusk'] }).proteins.shellfish);
  assert.ok(conflicts({ ...base, proteins: ['shellfish'], allergens: ['shellfish'] }).allergens.mollusk);
});

test('selected options are never disabled', () => {
  const cf = conflicts({ ...base, proteins: ['beef'], diets: ['vegan'] });
  assert.ok(!cf.proteins.beef && !cf.diets.vegan);
});

test('sanitize resolves contradictions in favor of restrictions', () => {
  const s = sanitize({ ...base, proteins: ['beef', 'fish'], diets: ['vegetarian'], format: 'seafood', placement: 'dessert', spice: 'xhot' });
  assert.deepEqual(s.proteins, []);
  assert.deepEqual(s.diets, ['vegetarian']);
  assert.equal(s.format, '');
  assert.equal(s.placement, 'dessert');
  assert.equal(s.spice, 'hot');
  const ok = { ...base, proteins: ['poultry'], diets: ['halal'] };
  assert.deepEqual(sanitize(ok), ok);
});

// Simulates a chef clicking only enabled options, then checks that the engine
// never has to override anything and every chosen protein is honored.
test('any brief built from enabled options generates without contradictions', () => {
  const rng = makeRng(99);
  const pick = a => a[Math.floor(rng() * a.length)];
  const options = [
    ...DIETS.map(d => ['diets', d.id]), ...PROTEINS.map(p => ['proteins', p.id]),
    ...Object.keys(ALLERGENS).map(a => ['allergens', a]),
    ...FORMATS.map(f => ['format', f.id]), ...PLACEMENTS.map(p => ['placement', p.id]),
    ...SPICE_LEVELS.map(x => ['spice', x.id]),
  ];
  for (let run = 0; run < 250; run++) {
    let s = { ...base, region: pick(REGIONS).id, diets: [], proteins: [], allergens: [], format: '', placement: '', spice: 'mild' };
    for (let click = 0; click < 6; click++) {
      const [g, id] = pick(options);
      if (conflicts(s)[g]?.[id]) continue; // disabled in the UI
      if (Array.isArray(s[g])) {
        if (g === 'proteins' && (id === 'none' || s.proteins.includes('none'))) s.proteins = [id];
        else if (!s[g].includes(id)) s[g] = [...s[g], id];
      } else s[g] = id;
    }
    assert.deepEqual(sanitize(s), s, `UI allowed a contradictory brief: ${JSON.stringify(s)}`);
    assert.deepEqual(resolveSettings(s).notes, [], JSON.stringify(s));
    const chosen = s.proteins.filter(p => p !== 'none');
    if (!chosen.length || s.placement === 'dessert') continue;
    const { lists } = generate(INGREDIENTS, s, { seed: run, count: 2 });
    for (const l of lists) {
      const main = l.items.find(i => i.slot === 'protein');
      assert.ok(main, `no protein for ${JSON.stringify(s)}`);
      const allowed = s.format === 'seafood' ? chosen.filter(p => ['fish', 'shellfish'].includes(p)) : chosen;
      assert.ok(allowed.includes(proteinGroup(main.ing)), `${main.name} not in ${allowed} (${JSON.stringify(s)})`);
    }
  }
});

test('a Side with a chosen protein uses that protein', () => {
  const { lists } = generate(INGREDIENTS, { ...base, region: 'us-south', placement: 'side', proteins: ['pork'] }, { seed: 4 });
  for (const l of lists) assert.equal(proteinGroup(l.items.find(i => i.slot === 'protein').ing), 'pork');
});

test('spicy desserts (mild to hot) cover the spicy role', () => {
  for (const spice of ['mild', 'medium', 'hot']) {
    for (const r of REGIONS) {
      const { lists } = generate(INGREDIENTS, { ...base, region: r.id, placement: 'dessert', spice }, { seed: 1, count: 2 });
      for (const l of lists) assert.ok(l.coverage.spicy, `${r.id} ${spice} dessert not spicy`);
    }
  }
});
