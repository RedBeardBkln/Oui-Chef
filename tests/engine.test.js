import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INGREDIENTS } from '../src/data/index.js';
import { REGIONS } from '../src/data/regions.js';
import { SPICE_LEVELS, ALLERGENS } from '../src/data/taxonomy.js';
import { FORMATS, PLACEMENTS, DIETS } from '../src/config.js';
import { generate, rerollList, swapItem, makeRng, isMainProtein, proteinGroup } from '../src/engine.js';
import { buildDish } from '../src/dish.js';

const MEAT = ['beef', 'pork', 'lamb', 'goat', 'poultry', 'game'];
const real = l => l.items.filter(i => i.ing);

// Independent re-statement of the dietary rules (deliberately not reusing engine code).
const violates = {
  vegan: i => [...MEAT, 'fish', 'shellfish', 'mollusk', 'egg', 'dairy', 'cheese'].includes(i.category)
    || i.allergens.some(a => ['dairy', 'egg', 'fish', 'shellfish', 'mollusk'].includes(a))
    || ['meat', 'pork', 'honey'].some(f => i.ing.flags.includes(f)),
  vegetarian: i => [...MEAT, 'fish', 'shellfish', 'mollusk'].includes(i.category)
    || i.allergens.some(a => ['fish', 'shellfish', 'mollusk'].includes(a))
    || ['meat', 'pork', 'rennet'].some(f => i.ing.flags.includes(f)),
  pescatarian: i => MEAT.includes(i.category) || ['meat', 'pork'].some(f => i.ing.flags.includes(f)),
  halal: i => i.category === 'pork' || ['pork', 'alcohol'].some(f => i.ing.flags.includes(f)),
  kosher: i => ['pork', 'shellfish', 'mollusk'].includes(i.category) || ['pork', 'nonkosher'].some(f => i.ing.flags.includes(f))
    || i.allergens.includes('shellfish') || i.allergens.includes('mollusk'),
  'no-pork': i => i.category === 'pork' || i.ing.flags.includes('pork'),
  'no-red-meat': i => ['beef', 'pork', 'lamb', 'goat', 'game'].includes(i.category),
  'no-alcohol': i => i.ing.flags.includes('alcohol'),
};

function randomSettings(rng) {
  const pick = a => a[Math.floor(rng() * a.length)];
  const some = (a, p) => a.filter(() => rng() < p);
  const region = rng() < 0.15 ? null : pick(REGIONS);
  return {
    region: region?.id || '',
    sub: region?.subs.length && rng() < 0.5 ? pick(region.subs).id : '',
    format: rng() < 0.4 ? pick(FORMATS).id : '',
    placement: rng() < 0.7 ? pick(PLACEMENTS).id : '',
    diets: some(DIETS.map(d => d.id), 0.12),
    allergens: some(Object.keys(ALLERGENS), 0.12),
    proteins: rng() < 0.4 ? some(['beef', 'pork', 'lamb', 'poultry', 'fish', 'shellfish', 'plant', 'egg'], 0.3) : [],
    spice: pick(SPICE_LEVELS).id,
    creativity: pick(['classic', 'inspired', 'adventurous']),
    include: [], exclude: [],
  };
}

const RUNS = 300;

test('always returns ten lists', () => {
  const r = generate(INGREDIENTS, { region: 'mx', sub: 'central', placement: 'salad', spice: 'mild' }, { seed: 1 });
  assert.equal(r.lists.length, 10);
});

test('dietary restrictions and allergens are never violated', () => {
  const rng = makeRng(42);
  for (let n = 0; n < RUNS; n++) {
    const s = randomSettings(rng);
    const { lists } = generate(INGREDIENTS, s, { seed: n, count: 3 });
    for (const l of lists) for (const it of real(l)) {
      for (const d of s.diets) assert.ok(!violates[d](it), `${it.name} violates ${d} (${JSON.stringify(s)})`);
      for (const a of s.allergens) assert.ok(!it.allergens.includes(a), `${it.name} contains ${a}`);
    }
  }
});

test('kosher-style lists never mix meat with dairy or fish', () => {
  for (let n = 0; n < 150; n++) {
    const { lists } = generate(INGREDIENTS, { diets: ['kosher'], spice: 'mild' }, { seed: n, count: 3 });
    for (const l of lists) {
      const items = real(l);
      const meat = items.some(i => MEAT.includes(i.category) || i.ing.flags.includes('meat'));
      const dairy = items.some(i => i.allergens.includes('dairy'));
      const fish = items.some(i => i.category === 'fish' || i.allergens.includes('fish'));
      assert.ok(!(meat && (dairy || fish)), `kosher clash: ${items.map(i => i.name).join(', ')}`);
    }
  }
});

test('heat never exceeds the chosen spice level, and spicy is covered when requested', () => {
  for (const lvl of SPICE_LEVELS) {
    for (let n = 0; n < 20; n++) {
      const { lists } = generate(INGREDIENTS, { region: REGIONS[n % REGIONS.length].id, spice: lvl.id }, { seed: n, count: 2 });
      for (const l of lists) {
        for (const it of real(l)) assert.ok(it.heat <= lvl.max, `${it.name} heat ${it.heat} > ${lvl.id}`);
        if (lvl.id === 'none') assert.ok(!('spicy' in l.coverage));
      }
    }
  }
});

test('every required sensory role is covered with unrestricted settings', () => {
  let gaps = 0, total = 0;
  for (const r of REGIONS) {
    for (let n = 0; n < 5; n++) {
      const { lists } = generate(INGREDIENTS, { region: r.id, spice: 'medium' }, { seed: n, count: 2 });
      for (const l of lists) { total++; if (l.gaps.length) { gaps++; console.log(r.id, l.gaps); } }
    }
  }
  assert.equal(gaps, 0, `${gaps}/${total} lists had gaps`);
});

test('chosen protein groups are respected for the main protein', () => {
  const rng = makeRng(7);
  for (let n = 0; n < 100; n++) {
    const s = randomSettings(rng);
    s.proteins = ['poultry']; s.diets = []; s.placement = 'entree'; s.format = '';
    const { lists } = generate(INGREDIENTS, s, { seed: n, count: 2 });
    for (const l of lists) {
      const main = l.items.find(i => i.slot === 'protein');
      if (main) assert.equal(proteinGroup(main.ing), 'poultry');
      for (const it of real(l)) if (isMainProtein(it.ing) && proteinGroup(it.ing) !== 'plant' && proteinGroup(it.ing) !== 'egg')
        assert.equal(proteinGroup(it.ing), 'poultry', `${it.name} not poultry`);
    }
  }
});

test('seafood format restricts main protein to fish/shellfish', () => {
  for (let n = 0; n < 40; n++) {
    const { lists } = generate(INGREDIENTS, { region: REGIONS[n % REGIONS.length].id, format: 'seafood', spice: 'mild' }, { seed: n, count: 2 });
    for (const l of lists) {
      const main = l.items.find(i => i.slot === 'protein');
      assert.ok(main, 'seafood list has a protein');
      assert.ok(['fish', 'shellfish'].includes(proteinGroup(main.ing)), main.name);
    }
  }
});

test('desserts only use dessert-suitable ingredients and no main protein', () => {
  for (let n = 0; n < 40; n++) {
    const { lists } = generate(INGREDIENTS, { region: REGIONS[n % REGIONS.length].id, placement: 'dessert', spice: 'none' }, { seed: n, count: 2 });
    for (const l of lists) {
      assert.ok(!l.items.some(i => i.slot === 'protein'));
      for (const it of real(l)) assert.ok(it.ing.flags.includes('dessert'), `${it.name} not dessert-flagged`);
    }
  }
});

test('format bases are added when available', () => {
  const { lists } = generate(INGREDIENTS, { region: 'it', format: 'pizza', spice: 'mild' }, { seed: 3 });
  for (const l of lists) assert.ok(real(l).some(i => i.ing.formats.includes('flatbread')), 'pizza base present');
});

test('excluded ingredients never appear; included ones always do', () => {
  const excl = generate(INGREDIENTS, { region: 'mx', spice: 'mild', exclude: ['lime', 'cilantro'] }, { seed: 9 });
  for (const l of excl.lists) for (const it of l.items) assert.ok(!/lime|cilantro/i.test(it.name), it.name);
  const target = INGREDIENTS.find(i => i.regions.some(r => r.startsWith('mx')) && !isMainProtein(i) && i.heat === 0);
  const incl = generate(INGREDIENTS, { region: 'mx', spice: 'mild', include: [target.name, 'Grandma’s salsa'] }, { seed: 9 });
  for (const l of incl.lists) {
    assert.ok(l.items.some(i => i.id === target.id), `${target.name} included`);
    assert.ok(l.items.some(i => i.custom && i.name === 'Grandma’s salsa'), 'custom included');
  }
});

test('an included ingredient that breaks a restriction is skipped with a warning', () => {
  const pork = INGREDIENTS.find(i => i.category === 'pork' && isMainProtein(i));
  const r = generate(INGREDIENTS, { diets: ['halal'], include: [pork.name], spice: 'mild' }, { seed: 1 });
  assert.ok(r.warnings.some(w => w.includes(pork.name)));
  for (const l of r.lists) assert.ok(!l.items.some(i => i.id === pork.id));
});

test('re-roll keeps locked items; swap keeps panel coverage', () => {
  const s = { region: 'th', spice: 'medium', placement: 'entree' };
  const { lists } = generate(INGREDIENTS, s, { seed: 5 });
  const list = lists[0];
  list.items[0].locked = true; list.items[1].locked = true;
  const next = rerollList(INGREDIENTS, s, list, { seed: 6 });
  for (const k of [0, 1]) assert.ok(next.items.some(i => i.id === list.items[k].id && i.locked), 'locked kept');
  for (let i = 0; i < list.items.length; i++) {
    const swapped = swapItem(INGREDIENTS, s, list, i, { seed: i });
    if (!swapped) continue;
    assert.notEqual(swapped.items[i].id, list.items[i].id);
    for (const [role, ok] of Object.entries(list.coverage)) if (ok) assert.ok(swapped.coverage[role], `swap lost ${role}`);
  }
});

test('any-region batches spread across different cuisines', () => {
  const { lists } = generate(INGREDIENTS, { spice: 'mild' }, { seed: 11 });
  assert.equal(new Set(lists.map(l => l.anchor.region)).size, 10);
});

test('classic creativity uses no wildcards when the cuisine has options', () => {
  const { lists } = generate(INGREDIENTS, { region: 'fr', creativity: 'classic', spice: 'mild' }, { seed: 2 });
  const wild = lists.flatMap(l => l.items.filter(i => i.wildcard));
  assert.equal(wild.length, 0, wild.map(w => w.name).join(', '));
});

test('dish concept is built from the list only, with no quantities', () => {
  const { lists } = generate(INGREDIENTS, { region: 'mx', sub: 'central', placement: 'salad', spice: 'mild' }, { seed: 4 });
  const d = buildDish(lists[0], { placement: 'salad', placementNoun: 'Salad' }, { seed: 1 });
  assert.ok(d.title.length > 3);
  const names = new Set(lists[0].items.map(i => i.name));
  for (const g of d.groups) for (const i of g.items) assert.ok(names.has(i.name));
  assert.equal(d.groups.reduce((n, g) => n + g.items.length, 0), lists[0].items.length);
  assert.ok(!/\d+\s?(g|kg|ml|cup|tbsp|tsp|oz)\b/i.test(JSON.stringify({ t: d.title, s: d.subtitle, p: d.plating })));
});
