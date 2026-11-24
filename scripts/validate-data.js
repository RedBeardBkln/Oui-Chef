#!/usr/bin/env node
// Validates the ingredient database and prints a coverage report per region.
//   node scripts/validate-data.js            # all files
//   node scripts/validate-data.js mx fr      # only these source files
// Exit code 1 on schema errors; coverage gaps are warnings.
import { parseBlock, validateIngredient } from '../src/data/parse.js';
import { RAW_SOURCES } from '../src/data/index.js';
import { REGIONS } from '../src/data/regions.js';
import { REQUIRED_ROLES, CATEGORIES } from '../src/data/taxonomy.js';

const only = process.argv.slice(2);
const regionIds = Object.fromEntries(REGIONS.map(r => [r.id, r.subs.map(s => s.id)]));
const NON_VEGAN = new Set(['dairy', 'egg', 'fish', 'shellfish', 'mollusk']);
const ANIMAL_CATS = new Set(['beef', 'pork', 'lamb', 'goat', 'poultry', 'game']);
const isVegan = i => !ANIMAL_CATS.has(i.category)
  && !i.allergens.some(a => NON_VEGAN.has(a))
  && !i.flags.some(f => ['meat', 'pork', 'honey'].includes(f));

let errors = 0, warnings = 0;
const seen = new Map();

for (const [src, text] of RAW_SOURCES) {
  if (only.length && !only.includes(src)) continue;
  let items;
  try { items = parseBlock(text, src); } catch (e) { console.error('✗', e.message); errors++; continue; }
  const local = new Set();
  for (const ing of items) {
    for (const e of validateIngredient(ing, regionIds)) { console.error('✗', e); errors++; }
    if (local.has(ing.id)) { console.error(`✗ ${src}: duplicate "${ing.name}" in same file`); errors++; }
    local.add(ing.id);
    const prev = seen.get(ing.id);
    if (prev && prev.category !== ing.category) {
      console.warn(`⚠ "${ing.name}" is ${prev.category} in ${prev.source} but ${ing.category} in ${src}`); warnings++;
    }
    if (!prev) seen.set(ing.id, ing);
    if (src !== 'global' && !ing.regions.some(r => r.split('.')[0] === src)) {
      console.warn(`⚠ ${src}: "${ing.name}" not tagged with region ${src}`); warnings++;
    }
  }
  if (src === 'global') { console.log(`global: ${items.length} items`); continue; }

  // ---- coverage report ----
  const region = REGIONS.find(r => r.id === src);
  const gaps = [];
  for (const role of [...REQUIRED_ROLES, 'spicy', 'chewy']) {
    const all = items.filter(i => i.roles.includes(role));
    const vegan = all.filter(isVegan);
    if (all.length < 4) gaps.push(`${role}: only ${all.length}`);
    if (vegan.length < 2) gaps.push(`${role}(vegan): only ${vegan.length}`);
  }
  const proteins = items.filter(i => CATEGORIES[i.category].protein && !i.flags.includes('acc'));
  if (proteins.length < 8) gaps.push(`main proteins: only ${proteins.length}`);
  const dessert = items.filter(i => i.flags.includes('dessert'));
  if (dessert.length < 8) gaps.push(`dessert items: only ${dessert.length}`);
  const heats = new Set(items.map(i => i.heat).filter(Boolean));
  for (const s of region.subs) {
    const n = items.filter(i => i.regions.includes(`${src}.${s.id}`)).length;
    if (n < 6) gaps.push(`sub ${s.id}: only ${n}`);
  }
  const formats = new Set(items.flatMap(i => i.formats));
  console.log(`${src}: ${items.length} items, ${proteins.length} proteins, ${dessert.length} dessert, heat levels [${[...heats].sort()}], formats [${[...formats]}]`);
  for (const g of gaps) { console.warn(`   ⚠ gap — ${g}`); warnings++; }
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
