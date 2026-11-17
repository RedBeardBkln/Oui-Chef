// Parses the compact ingredient line format used in src/data/**.
//
//   Name | roles | category | regions | methods | extras
//
//   roles    comma list from ROLES                 e.g. crunchy,sweet
//   category one key from CATEGORIES               e.g. veg
//   regions  comma list of region / region.sub ids, or `global`
//   methods  comma list from METHODS               e.g. raw,pickled,grilled
//   extras   space-separated tokens (optional):
//              a:dairy,gluten   allergens beyond those implied by category
//              h:2              heat 0-5
//              n:citrus,herbal  aroma notes
//              f:greens         format/base tag(s)
//              dessert pork meat alcohol honey rennet nonkosher acc   flags
//
// Lines that are blank or start with `#` are ignored.
import { CATEGORIES, ROLES, METHODS, ALLERGENS, NOTES, FORMAT_TAGS, FLAGS } from './taxonomy.js';

const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const list = s => (s || '').split(',').map(x => x.trim()).filter(Boolean);

export function parseLine(line, source = '') {
  const parts = line.split('|').map(p => p.trim());
  if (parts.length < 5) throw new Error(`${source}: expected ≥5 fields: "${line}"`);
  const [name, roles, category, regions, methods, extras = ''] = parts;
  const ing = {
    id: slug(name),
    name,
    roles: list(roles),
    category,
    regions: list(regions),
    methods: list(methods),
    allergens: [],
    heat: 0,
    notes: [],
    formats: [],
    flags: [],
    source,
  };
  for (const tok of extras.split(/\s+/).filter(Boolean)) {
    if (tok.startsWith('a:')) ing.allergens.push(...list(tok.slice(2)));
    else if (tok.startsWith('h:')) ing.heat = Number(tok.slice(2));
    else if (tok.startsWith('n:')) ing.notes.push(...list(tok.slice(2)));
    else if (tok.startsWith('f:')) ing.formats.push(...list(tok.slice(2)));
    else ing.flags.push(tok);
  }
  const implied = CATEGORIES[category]?.allergen;
  if (implied && !ing.allergens.includes(implied)) ing.allergens.push(implied);
  return ing;
}

export function parseBlock(text, source = '') {
  return text.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => parseLine(l, source));
}

// Returns a list of human-readable problems (empty = valid).
export function validateIngredient(ing, regionIds) {
  const errs = [];
  const where = `${ing.source}: "${ing.name}"`;
  if (!ing.name) errs.push(`${where}: missing name`);
  if (!CATEGORIES[ing.category]) errs.push(`${where}: unknown category "${ing.category}"`);
  if (!ing.roles.length) errs.push(`${where}: no roles`);
  for (const r of ing.roles) if (!ROLES[r]) errs.push(`${where}: unknown role "${r}"`);
  if (!ing.methods.length) errs.push(`${where}: no methods`);
  for (const m of ing.methods) if (!METHODS[m]) errs.push(`${where}: unknown method "${m}"`);
  for (const a of ing.allergens) if (!ALLERGENS[a]) errs.push(`${where}: unknown allergen "${a}"`);
  for (const n of ing.notes) if (!NOTES.includes(n)) errs.push(`${where}: unknown note "${n}"`);
  for (const f of ing.formats) if (!FORMAT_TAGS[f]) errs.push(`${where}: unknown format "${f}"`);
  for (const f of ing.flags) if (!FLAGS[f]) errs.push(`${where}: unknown flag "${f}"`);
  if (!Number.isInteger(ing.heat) || ing.heat < 0 || ing.heat > 5) errs.push(`${where}: heat must be 0-5`);
  if (ing.heat > 0 && !ing.roles.includes('spicy')) errs.push(`${where}: heat>0 but no spicy role`);
  if (ing.roles.includes('spicy') && ing.heat === 0) errs.push(`${where}: spicy role but heat 0`);
  if (ing.category === 'nut' && !ing.allergens.some(a => a === 'treenut' || a === 'peanut'))
    errs.push(`${where}: nut without treenut/peanut allergen`);
  if (!ing.regions.length) errs.push(`${where}: no regions`);
  for (const r of ing.regions) {
    if (r === 'global') continue;
    const [rid, sub] = r.split('.');
    if (!regionIds[rid]) errs.push(`${where}: unknown region "${r}"`);
    else if (sub && !regionIds[rid].includes(sub)) errs.push(`${where}: unknown sub-region "${r}"`);
  }
  return errs;
}
