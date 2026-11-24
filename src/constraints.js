// Compatibility rules for the brief. An option is disabled when it would
// contradict something already selected (e.g. Beef + Vegan). Rules are
// symmetric: whichever is picked first greys out the other.
import { DIETS, PROTEINS, FORMATS, PLACEMENTS } from './config.js';
import { ALLERGENS, SPICE_LEVELS } from './data/taxonomy.js';

const MEATS = ['beef', 'pork', 'lamb', 'goat', 'poultry', 'game'];
const RED_MEATS = ['beef', 'pork', 'lamb', 'goat', 'game'];
const SEAFOOD = ['fish', 'shellfish'];
const ANIMAL = [...MEATS, ...SEAFOOD, 'egg'];
const ALL_PROTEINS = PROTEINS.map(p => p.id);

// [groupA, idA, groupB, idsB]: idA and every id in idsB are mutually exclusive.
const PAIRS = [
  ['diets', 'vegan',       'proteins', ANIMAL],
  ['diets', 'vegetarian',  'proteins', [...MEATS, ...SEAFOOD]],
  ['diets', 'pescatarian', 'proteins', MEATS],
  ['diets', 'no-red-meat', 'proteins', RED_MEATS],
  ['diets', 'no-pork',     'proteins', ['pork']],
  ['diets', 'halal',       'proteins', ['pork']],
  ['diets', 'kosher',      'proteins', ['pork', 'shellfish']],
  ['allergens', 'fish',    'proteins', ['fish']],
  ['allergens', 'egg',     'proteins', ['egg']],
  ['diets', 'vegan',       'format', ['seafood']],
  ['diets', 'vegetarian',  'format', ['seafood']],
  ['placement', 'dessert', 'proteins', ALL_PROTEINS.filter(p => p !== 'none')],
  // Dessert styles: only those the data can't support (no dessert-suitable crust,
  // greens, broth or noodle) or that make no sense (seafood). Smoked (BBQ),
  // crêpe (tacos) and brioche (sandwich) desserts are fine.
  ['placement', 'dessert', 'format', ['seafood', 'pizza', 'salads', 'soups', 'noodles']],
  ['placement', 'dessert', 'spice', ['xhot']],   // no dessert-suitable ingredient is that hot
  ['allergens', 'gluten',  'format', ['sandwiches', 'dumplings']], // no gluten-free bread/wrapper in the data
  ['format', 'veg',        'proteins', ALL_PROTEINS.filter(p => p !== 'none')],
  ['format', 'seafood',    'proteins', ALL_PROTEINS.filter(p => !SEAFOOD.includes(p))],
  ['placement', 'salad',   'format', ['soups', 'pizza', 'dumplings', 'sandwiches']],
  ['placement', 'soup',    'format', ['salads', 'pizza', 'tacos', 'sandwiches']],
];

const LABELS = {
  diets: Object.fromEntries(DIETS.map(d => [d.id, d.label])),
  proteins: Object.fromEntries(PROTEINS.map(p => [p.id, p.label])),
  format: Object.fromEntries(FORMATS.map(f => [f.id, f.label])),
  placement: Object.fromEntries(PLACEMENTS.map(p => [p.id, p.label])),
  allergens: Object.fromEntries(Object.entries(ALLERGENS).map(([k, v]) => [k, `No ${v.toLowerCase()}`])),
  spice: Object.fromEntries(SPICE_LEVELS.map(x => [x.id, `${x.label} spice`])),
};
export const labelOf = (group, id) => LABELS[group]?.[id] || id;

const selected = (s, group) => {
  const v = s[group];
  return Array.isArray(v) ? v : v ? [v] : [];
};

// Returns { group: { optionId: [labels of the selections it conflicts with] } }.
export function conflicts(s) {
  const out = { diets: {}, proteins: {}, format: {}, placement: {}, allergens: {}, spice: {} };
  const mark = (group, id, by) => { (out[group][id] ||= []).includes(by) || out[group][id].push(by); };

  for (const [ga, a, gb, bs] of PAIRS) {
    if (selected(s, ga).includes(a)) for (const b of bs) mark(gb, b, labelOf(ga, a));
    for (const b of bs) if (selected(s, gb).includes(b)) mark(ga, a, labelOf(gb, b));
  }

  // Composite rules: shellfish protein covers crustaceans AND mollusks, and
  // seafood covers fish too, so they only conflict once every kind is excluded.
  const al = new Set(selected(s, 'allergens'));
  if (al.has('shellfish') && al.has('mollusk')) mark('proteins', 'shellfish', 'No shellfish or mollusks');
  if (al.has('shellfish') && al.has('mollusk') && al.has('fish')) mark('format', 'seafood', 'No fish or shellfish');
  const lastOf = (need, why) => {
    const missing = need.filter(a => !al.has(a));
    if (missing.length === 1) mark('allergens', missing[0], why);
  };
  if (selected(s, 'proteins').includes('shellfish')) lastOf(['shellfish', 'mollusk'], 'Shellfish & mollusks');
  if (s.format === 'seafood') lastOf(['shellfish', 'mollusk', 'fish'], 'Seafood');

  // "No protein" is exclusive with every protein (handled by the chip logic),
  // and contradicts a seafood format.
  if (selected(s, 'proteins').includes('none')) mark('format', 'seafood', 'No protein');
  if (s.format === 'seafood') mark('proteins', 'none', 'Seafood');

  // Never disable something that's currently selected; it's shown as a conflict instead.
  for (const g of Object.keys(out)) for (const id of Object.keys(out[g])) {
    if (selected(s, g).includes(id)) delete out[g][id];
  }
  return out;
}

// Removes contradictions from saved/legacy settings. Restrictions (diet,
// allergens, course) win over choices (protein, style), so the result is safe.
export function sanitize(raw) {
  const s = structuredClone(raw);
  const ORDER = ['diets', 'allergens', 'placement', 'format', 'proteins', 'spice'];
  for (const group of [...ORDER].reverse()) {
    for (const id of selected(s, group)) {
      const others = { ...s, [group]: Array.isArray(s[group]) ? s[group].filter(x => x !== id) : '' };
      if (conflicts(others)[group]?.[id]) {
        s[group] = Array.isArray(s[group]) ? s[group].filter(x => x !== id) : group === 'spice' ? 'hot' : '';
      }
    }
  }
  return s;
}
