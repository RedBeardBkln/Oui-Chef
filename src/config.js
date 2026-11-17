// User-facing option sets and how each one shapes generation.

export const DIETS = [
  { id: 'vegan',       label: 'Vegan' },
  { id: 'vegetarian',  label: 'Vegetarian', hint: 'Also excludes cheeses traditionally made with animal rennet' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'halal',       label: 'Halal', hint: 'Excludes pork & alcohol. Meat/poultry must still be halal-certified' },
  { id: 'kosher',      label: 'Kosher-style', hint: 'No pork, shellfish or non-kosher species; never mixes meat with dairy. Products still need certification' },
  { id: 'no-pork',     label: 'No pork' },
  { id: 'no-red-meat', label: 'No red meat' },
  { id: 'no-alcohol',  label: 'No alcohol' },
];

export const PROTEINS = [
  { id: 'beef', label: 'Beef' },
  { id: 'pork', label: 'Pork' },
  { id: 'lamb', label: 'Lamb' },
  { id: 'goat', label: 'Goat' },
  { id: 'poultry', label: 'Poultry' },
  { id: 'game', label: 'Game' },
  { id: 'fish', label: 'Fish' },
  { id: 'shellfish', label: 'Shellfish & mollusks' },
  { id: 'egg', label: 'Egg' },
  { id: 'plant', label: 'Plant-based' },
  { id: 'none', label: 'No protein' },
];

// Non-region-specific cuisine / format.
//   base        f: tags; one base item is added to every list
//   methodBias  preferred cooking methods
//   proteins    restrict main protein groups
//   proteinMethods  restrict how the main protein is cooked
//   force       category that must appear (if diet allows)
export const FORMATS = [
  { id: 'pizza',      label: 'Pizza & Flatbreads', noun: 'Flatbread', base: ['flatbread'], methodBias: ['baked', 'charred', 'roasted'] },
  { id: 'bbq',        label: 'Barbecue',           noun: '', methodBias: ['smoked', 'grilled', 'charred', 'glazed'], proteinMethods: ['smoked', 'grilled', 'braised', 'glazed', 'roasted'] },
  { id: 'seafood',    label: 'Seafood',            noun: '', proteins: ['fish', 'shellfish'] },
  { id: 'salads',     label: 'Salads',             noun: 'Salad', base: ['greens'], methodBias: ['raw', 'shaved', 'grilled', 'pickled', 'charred'] },
  { id: 'soups',      label: 'Soups & Stews',      noun: 'Soup', base: ['broth'], methodBias: ['stewed', 'braised', 'poached', 'roasted'] },
  { id: 'tacos',      label: 'Tacos & Wraps',      noun: 'Tacos', base: ['wrap'], methodBias: ['grilled', 'charred', 'braised', 'pickled'] },
  { id: 'sandwiches', label: 'Sandwiches & Burgers', noun: 'Sandwich', base: ['bread'], methodBias: ['grilled', 'fried', 'pickled', 'roasted'] },
  { id: 'noodles',    label: 'Noodles & Pasta',    noun: 'Noodles', base: ['noodle'] },
  { id: 'bowls',      label: 'Rice & Grain Bowls', noun: 'Bowl', base: ['grain'] },
  { id: 'dumplings',  label: 'Dumplings & Pastry', noun: 'Dumplings', base: ['wrapper'], methodBias: ['steamed', 'fried', 'baked'] },
  { id: 'brunch',     label: 'Brunch',             noun: '', force: 'egg', methodBias: ['poached', 'fried', 'baked'] },
  { id: 'street',     label: 'Street Food & Snacks', noun: '', methodBias: ['fried', 'grilled', 'charred'] },
  { id: 'veg',        label: 'Vegetable-Forward',  noun: '', proteins: ['none'] },
];

// Menu placement.
//   protein: 'required' | 'optional' | 'none'
//   extra:   extra slots ('starch')
export const PLACEMENTS = [
  { id: 'amuse',     label: 'Amuse / Snack', protein: 'optional', noun: 'Bite' },
  { id: 'appetizer', label: 'Appetizer',     protein: 'required', noun: '' },
  { id: 'small',     label: 'Small Plate',   protein: 'optional', noun: '' },
  { id: 'salad',     label: 'Salad',         protein: 'optional', noun: 'Salad', base: ['greens'], methodBias: ['raw', 'shaved', 'grilled', 'pickled'] },
  { id: 'soup',      label: 'Soup',          protein: 'optional', noun: 'Soup', base: ['broth'], methodBias: ['stewed', 'braised', 'poached'] },
  { id: 'entree',    label: 'Entrée',        protein: 'required', noun: '', extra: ['starch'] },
  { id: 'side',      label: 'Side',          protein: 'none', noun: '' },
  { id: 'dessert',   label: 'Dessert',       protein: 'none', noun: '', dessert: true },
];

export const CREATIVITY = [
  { id: 'classic',     label: 'Classic',     wildcards: 0, hint: 'Stays within the cuisine' },
  { id: 'inspired',    label: 'Inspired',    wildcards: 1, hint: 'One ingredient from outside the cuisine' },
  { id: 'adventurous', label: 'Adventurous', wildcards: 3, hint: 'Several cross-cultural wildcards' },
];

export const DEFAULT_SETTINGS = {
  region: '', sub: '', format: '', diets: [], allergens: [], proteins: [],
  spice: 'mild', placement: '', creativity: 'inspired', include: [], exclude: [],
};
