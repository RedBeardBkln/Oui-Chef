// "Generate dish": arranges one combination into a plated dish concept.
// It gives a name, components grouped by role on the plate, and a plating idea.
// It deliberately produces no quantities, recipes or step-by-step instructions.
import { ROLES } from './data/taxonomy.js';
import { makeRng } from './engine.js';

const GROUPS = [
  { id: 'main',    label: 'The Star' },
  { id: 'base',    label: 'Foundation' },
  { id: 'produce', label: 'Vegetables & Fruit' },
  { id: 'sauce',   label: 'Sauce, Dressing & Fat' },
  { id: 'crunch',  label: 'Crunch & Texture' },
  { id: 'finish',  label: 'Finish & Garnish' },
];

function groupOf(item) {
  if (item.slot === 'protein') return 'main';
  if (item.slot === 'base' || item.slot === 'starch') return 'base';
  const c = item.category;
  const roles = item.roles || [];
  if (['beef', 'pork', 'lamb', 'goat', 'poultry', 'game', 'fish', 'shellfish', 'mollusk', 'plantprotein', 'egg'].includes(c))
    return roles.includes('crunchy') ? 'crunch' : 'produce';
  if (['condiment', 'fat', 'dairy'].includes(c)) return 'sauce';
  if (['nut', 'seed', 'bread'].includes(c) || (roles.includes('crunchy') && ['grain', 'starch', 'seaweed'].includes(c))) return 'crunch';
  if (['grain', 'noodle', 'starch', 'legume'].includes(c)) return 'base';
  if (['herb', 'spice', 'chile', 'cheese', 'sweetener'].includes(c)) return 'finish';
  return 'produce';
}

const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
const describe = it => {
  const m = it.methodLabel && it.methodLabel !== 'Raw' && !isUsage(it.methodLabel) ? it.methodLabel.toLowerCase() : '';
  const n = it.name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  return m && !n.toLowerCase().includes(m.slice(0, 5)) ? `${m} ${n}` : n;
};
const isUsage = l => /^(in |for |as |baked in)/.test(l);
const SMALL = new Set(['with', 'and', 'of', 'de', 'la', 'le', 'du', 'a', 'al', 'en', 'the', 'or']);
const titleCase = s => s.split(' ').map((w, i) =>
  i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const PLATING = {
  default: [
    'Build height at the center with the star element; scatter crunch last so it stays crisp.',
    'Anchor the plate with a swoosh of the sauce element, set the star off-center, and garnish in odd numbers.',
    'Compose in a tight line across the plate so every bite can catch each component.',
    'Use a wide, shallow bowl: sauce pooled first, components layered, aromatic finish on top.',
    'Plate in clusters of contrasting color and texture, leaving negative space on one side.',
  ],
  salad: [
    'Toss the leaves lightly, then tuck the heavier elements in between rather than on top.',
    'Build a loose, airy mound; finish with the crunch and a final hit of the acidic element.',
  ],
  soup: [
    'Arrange the solid components in a warm bowl and pour the broth tableside.',
    'Float the crunch and aromatic garnish on the surface just before service.',
  ],
  dessert: [
    'Quenelle the creamy element beside the star, with the crunch shattered across the plate.',
    'Layer in a glass for a parfait-style build: soft, crunch, sweet, acid, repeat.',
  ],
  amuse: ['Serve as a single, perfect bite on a spoon or small vessel; every component in one mouthful.'],
};

export function buildDish(list, settings = {}, { seed } = {}) {
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 31));
  const items = list.items;
  const groups = GROUPS.map(g => ({ ...g, items: items.filter(i => groupOf(i) === g.id) })).filter(g => g.items.length);

  const star = items.find(i => i.slot === 'protein') || items.find(i => i.slot === 'feature')
    || items.find(i => i.slot === 'base')
    || [...items].filter(i => !i.wildcard).sort((a, b) => (b.roles?.length || 0) - (a.roles?.length || 0))[0] || items[0];
  const supporting = items.filter(i => i !== star && i.slot !== 'base');
  const ranked = [...supporting].sort((a, b) => (b.wildcard - a.wildcard) || ((b.roles?.length || 0) - (a.roles?.length || 0)) || (rng() - 0.5));
  const highlights = ranked.slice(0, 4);

  const noun = settings.formatNoun || settings.placementNoun || '';
  const starName = describe(star);
  const title = titleCase(noun && !norm(starName).includes(norm(noun)) ? `${starName} ${noun}` : starName);
  const subtitle = highlights.map(describe).join(', ');

  // Why it works: the sensory pairings, drawn only from the actual items.
  const byRole = {};
  for (const it of items) for (const r of it.roles || []) (byRole[r] ||= []).push(it.name);
  const balance = Object.keys(list.coverage).filter(r => byRole[r]).map(r => ({ role: r, label: ROLES[r].label, items: byRole[r] }));

  // Prefer ingredients whose primary (first-listed) role is the one in question.
  const find = (role, not) => items.find(i => i.roles?.[0] === role && i !== not)
    || items.find(i => i.roles?.includes(role) && i !== not);
  const soft = find('soft');
  const crunch = find('crunchy', soft);
  const fat = find('fatty');
  const acid = find('acidic', fat);
  const contrasts = [];
  if (soft && crunch) contrasts.push(`${soft.name} against ${crunch.name} for texture contrast`);
  if (fat && acid) contrasts.push(`${acid.name} cutting through ${fat.name}`);
  const methods = [...new Set(items.map(i => i.methodLabel).filter(l => l && !isUsage(l)))];

  const key = settings.placement === 'dessert' ? 'dessert' : settings.placement === 'amuse' ? 'amuse'
    : (settings.placement === 'soup' || settings.format === 'soups') ? 'soup'
    : (settings.placement === 'salad' || settings.format === 'salads') ? 'salad' : 'default';
  const pool = [...(PLATING[key] || []), ...(key === 'default' ? [] : PLATING.default.slice(0, 2))];
  const plating = pool[Math.floor(rng() * pool.length)];

  return { title, subtitle, cuisine: list.anchor?.label || '', groups, balance, contrasts, methods, plating };
}

function norm(s) { return s.toLowerCase(); }
