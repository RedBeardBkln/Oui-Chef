// Controlled vocabularies shared by the data files, the engine and the UI.
// Every ingredient line in src/data/** must only use values defined here
// (scripts/validate-data.js enforces this).

// ---- Organoleptic sensory panel -------------------------------------------
export const ROLES = {
  sweet:    { label: 'Sweet',    group: 'taste' },
  acidic:   { label: 'Acidic',   group: 'taste' },
  salty:    { label: 'Salty',    group: 'taste' },
  bitter:   { label: 'Bitter',   group: 'taste' },
  umami:    { label: 'Umami',    group: 'taste' },
  fatty:    { label: 'Fatty',    group: 'taste' },
  spicy:    { label: 'Spicy',    group: 'taste' },
  aromatic: { label: 'Aromatic', group: 'aroma' },
  soft:     { label: 'Soft / Creamy', group: 'texture' },
  crunchy:  { label: 'Crunchy',  group: 'texture' },
  chewy:    { label: 'Chewy',    group: 'texture' },
};

// Roles every list must cover. `spicy` is added when spice level > none.
export const REQUIRED_ROLES = ['sweet', 'acidic', 'salty', 'bitter', 'umami', 'fatty', 'aromatic', 'soft', 'crunchy'];
// Covered when possible, reported (not failed) when not.
export const OPTIONAL_ROLES = ['chewy'];

// ---- Categories -------------------------------------------------------------
// `protein` = can be chosen as the main protein of a list.
// `allergen` = allergen automatically implied by the category.
export const CATEGORIES = {
  beef:         { label: 'Beef',            protein: 'beef' },
  pork:         { label: 'Pork',            protein: 'pork' },
  lamb:         { label: 'Lamb',            protein: 'lamb' },
  goat:         { label: 'Goat',            protein: 'goat' },
  poultry:      { label: 'Poultry',         protein: 'poultry' },
  game:         { label: 'Game',            protein: 'game' },
  fish:         { label: 'Fish',            protein: 'fish',      allergen: 'fish' },
  shellfish:    { label: 'Shellfish (crustacean)', protein: 'shellfish', allergen: 'shellfish' },
  mollusk:      { label: 'Mollusk',         protein: 'shellfish', allergen: 'mollusk' },
  egg:          { label: 'Egg',             protein: 'egg',       allergen: 'egg' },
  plantprotein: { label: 'Plant protein',   protein: 'plant' },
  dairy:        { label: 'Dairy',           allergen: 'dairy' },
  cheese:       { label: 'Cheese',          allergen: 'dairy' },
  veg:          { label: 'Vegetable' },
  fruit:        { label: 'Fruit' },
  herb:         { label: 'Herb' },
  spice:        { label: 'Spice' },
  chile:        { label: 'Chile' },
  fungi:        { label: 'Mushroom / Fungi' },
  legume:       { label: 'Legume' },
  grain:        { label: 'Grain' },
  starch:       { label: 'Starch / Tuber' },
  bread:        { label: 'Bread / Dough' },
  noodle:       { label: 'Noodle / Pasta' },
  nut:          { label: 'Nut' },
  seed:         { label: 'Seed' },
  seaweed:      { label: 'Seaweed' },
  condiment:    { label: 'Condiment / Sauce' },
  pickle:       { label: 'Pickle / Ferment' },
  fat:          { label: 'Fat / Oil' },
  sweetener:    { label: 'Sweetener' },
};

// ---- Allergens --------------------------------------------------------------
export const ALLERGENS = {
  dairy:     'Dairy / milk',
  egg:       'Egg',
  fish:      'Fish',
  shellfish: 'Shellfish (crustacean)',
  mollusk:   'Mollusks',
  treenut:   'Tree nuts',
  peanut:    'Peanuts',
  gluten:    'Gluten / wheat',
  soy:       'Soy',
  sesame:    'Sesame',
  mustard:   'Mustard',
  sulfite:   'Sulfites',
};

// ---- Cooking methods / preparations ----------------------------------------
export const METHODS = {
  raw: 'Raw', shaved: 'Shaved', grilled: 'Grilled', charred: 'Charred',
  roasted: 'Roasted', baked: 'Baked', fried: 'Fried', sauteed: 'Sautéed',
  'stir-fried': 'Stir-fried', seared: 'Seared', braised: 'Braised',
  stewed: 'Stewed', poached: 'Poached', steamed: 'Steamed', smoked: 'Smoked',
  cured: 'Cured', pickled: 'Pickled', fermented: 'Fermented', toasted: 'Toasted',
  confit: 'Confit', pureed: 'Puréed', whipped: 'Whipped', blistered: 'Blistered',
  glazed: 'Glazed', crumbled: 'Crumbled', 'as-is': 'As is',
};

// ---- Aroma / flavor notes (used for pairing affinity) ----------------------
export const NOTES = ['citrus', 'herbal', 'floral', 'earthy', 'smoky', 'nutty', 'fruity',
  'toasty', 'allium', 'warm-spice', 'briny', 'funky', 'green', 'anise', 'caramel', 'dairy'];

// ---- Base / format tags (f:...) --------------------------------------------
export const FORMAT_TAGS = {
  flatbread: 'Pizza / flatbread base',
  wrap: 'Tortilla / wrap',
  bread: 'Bread / bun',
  noodle: 'Noodle / pasta',
  grain: 'Rice / grain',
  wrapper: 'Dumpling wrapper / pastry',
  greens: 'Salad greens',
  broth: 'Soup / broth base',
};

// ---- Extra flags ------------------------------------------------------------
export const FLAGS = {
  dessert: 'Usable in desserts',
  pork: 'Pork-derived (non-pork category, e.g. lard)',
  meat: 'Contains meat/poultry (e.g. stock)',
  alcohol: 'Contains alcohol',
  honey: 'Honey / bee product',
  rennet: 'Cheese traditionally made with animal rennet',
  nonkosher: 'Not kosher by species (e.g. catfish, rabbit)',
  acc: 'Accent protein, not a main protein (e.g. bacon lardons)',
};

// ---- Spice levels -----------------------------------------------------------
// heat values on ingredients: 0 none, 1 mild … 5 extreme.
export const SPICE_LEVELS = [
  { id: 'none',   label: 'None',      min: 0, max: 0 },
  { id: 'mild',   label: 'Mild',      min: 1, max: 2 },
  { id: 'medium', label: 'Medium',    min: 2, max: 3 },
  { id: 'hot',    label: 'Hot',       min: 3, max: 4 },
  { id: 'xhot',   label: 'Extra hot', min: 4, max: 5 },
];
