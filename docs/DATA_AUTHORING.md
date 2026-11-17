# Ingredient database authoring guide

The ingredient database lives in `src/data/regions/<regionId>.js`, one file per
world region (ids are in `src/data/regions.js`). Each file exports a template string with
one ingredient per line:

```js
// Mexican — Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Chicken thighs | fatty,umami | poultry | mx | grilled,braised,roasted | n:smoky
Cochinita-style pork shoulder | fatty,umami,soft | pork | mx.yucatan | braised,roasted | n:citrus
# --- Produce ---
Jícama | crunchy,sweet | veg | mx | raw,pickled | n:green
Pápalo | bitter,aromatic | herb | mx.central,mx.oaxaca | raw | n:herbal,green
Queso fresco | salty,soft | cheese | mx | crumbled | n:dairy
Chile de árbol | spicy | chile | mx | toasted,fried | h:3 n:smoky
`;
```

`#` lines are comments. All controlled vocabularies are in `src/data/taxonomy.js`.
Run `node scripts/validate-data.js <regionId>` and fix every ✗ error. Reduce ⚠ gaps as far as authenticity allows.

## Fields

1. **Name**: the name a chef would write on a prep list, with correct accents and native names where they're standard ("Pápalo", "Gochujang", "Guanciale"). Keep it to a single ingredient or component (a sauce, paste or condiment is fine, e.g. "Salsa macha", "Harissa"). Never a finished dish or a recipe. A short prep descriptor is allowed when it changes the sensory role ("Toasted pepitas", "Pickled red onion").
2. **roles** describe what the ingredient brings to the organoleptic panel, using only `sweet, acidic, salty, bitter, umami, fatty, spicy, aromatic, soft, crunchy, chewy`. List 1–3 roles, the ones that are *clearly dominant*. Don't inflate: garlic is not "sweet". `soft` covers soft and creamy. Any ingredient with `spicy` must have `h:1`–`h:5`, and anything with h>0 must have `spicy`.
3. **category**: exactly one from CATEGORIES in taxonomy.js. A main protein (one a dish could be built around) uses its animal category, or `plantprotein` for tofu, tempeh, seitan and the like. Legumes go in `legume`. Cheese goes in `cheese`.
4. **regions**: the region id (`mx`), and/or sub-region ids (`mx.oaxaca`) where the ingredient is specifically characteristic. Tag a sub-region only when it is genuinely associated with that sub-region. Tag the bare region id for items common to the whole cuisine. Every item in a file must include that file's region (bare or sub). You may add other regions where the item is also authentically used.
5. **methods**: the cooking methods or preparations a chef could realistically apply to this ingredient within this cuisine, from METHODS. Use `as-is` for condiments and other items used straight. List 1–5.
6. **extras** (space-separated):
   - `a:x,y` lists allergens **not** implied by the category (dairy, cheese, egg, fish, shellfish and mollusk categories auto-add their own). Allergens: `dairy egg fish shellfish mollusk treenut peanut gluten soy sesame mustard sulfite lupin`.
     **Tag conservatively.** When common commercial versions vary, include the allergen (e.g. hoisin → `a:soy,gluten,sesame`; soy sauce → `a:soy,gluten`; Worcestershire → `a:fish`; fish sauce → `a:fish`; dashi made with bonito → `a:fish`; mole negro → `a:treenut,sesame,gluten` if typically contains them; pesto → `a:treenut,dairy`; wine/wine vinegar → `a:sulfite`). Peanuts are `peanut`, not `treenut`. Coconut is **not** tagged as a tree nut.
   - `h:N` sets heat from 0 to 5, roughly by Scoville: 1 = <2.5k (poblano, ancho, paprika, Kashmiri, Sichuan peppercorn's numbing), 2 = 2.5k–10k (jalapeño, chipotle, guajillo, gochugaru, Aleppo), 3 = 10k–50k (serrano, árbol, cayenne), 4 = 50k–350k (bird's eye, habanero, Scotch bonnet), 5 = >350k (ghost pepper, reaper). Spicy condiments get the heat of their typical use.
   - `n:a,b` gives 1–3 aroma notes from: `citrus herbal floral earthy smoky nutty fruity toasty allium warm-spice briny funky green anise caramel dairy`.
   - `f:x` tags base/format items: `flatbread` (pizza dough, naan, pita, lavash), `wrap` (tortillas, crepes, lettuce cups, rice paper), `bread` (buns, loaves, sandwich bread), `noodle` (any noodle/pasta), `grain` (rice, grains, polenta, couscous), `wrapper` (dumpling skins, pastry), `greens` (salad leaves), `broth` (stocks, broths, soup bases).
   - Flags:
     - `dessert`: genuinely suitable in desserts (fruits, sweeteners, dairy, nuts, sweet spices, some herbs).
     - `pork`: pork-derived but not in the pork category (lard, pork-based stock).
     - `meat`: contains meat or poultry but isn't a meat category (chicken stock, beef tallow, bone marrow).
     - `alcohol`: contains alcohol (mirin, Shaoxing wine, cooking wine, beer, spirits).
     - `honey`: honey or bee products.
     - `rennet`: cheese traditionally made with animal rennet (Parmigiano-Reggiano, Pecorino Romano, Grana Padano, Gruyère, Comté, traditional Manchego, etc.).
     - `nonkosher`: species that isn't kosher but whose category doesn't already make it so (catfish, eel, monkfish, swordfish, sturgeon, shark, skate, rabbit, frog). Pork, shellfish and mollusks are handled automatically.
     - `acc`: an accent protein that seasons rather than anchors a dish (bacon lardons, chorizo crumble, dried shrimp, bottarga, anchovy, chicharrón crumbs). Use the right animal category with `acc`.

## Coverage targets per region file

- **45–75 ingredients**, all authentic to the cuisine. Accuracy matters more than volume. Don't invent ingredients or misattribute them to a region. If a sub-region is thin, use fewer items rather than inventing.
- **Main proteins:** at least 8 (not `acc`) spread across the animals the cuisine actually uses (beef, pork, lamb/goat, poultry, fish, shellfish/mollusks, game), plus **at least 2 plant proteins/legumes** where authentic.
- **Every role** (`sweet acidic salty bitter umami fatty aromatic soft crunchy spicy chewy`) needs ≥4 items in total, and ≥2 **vegan** items (no animal product, dairy, egg, fish, honey). Cuisines without a vegan source of some role (rare) can rely on the global pantry.
- **Heat:** include chiles or spicy condiments across the heat range the cuisine uses. Cuisines that are traditionally mild should still have at least 2 spicy items (e.g. mustard, horseradish, black-pepper-forward items are NOT spicy unless capsaicin-like; horseradish and wasabi may be `h:2`).
- **Sub-regions:** ≥6 items specifically tagged to each sub-region listed in regions.js for that region.
- **Desserts:** ≥8 items flagged `dessert`.
- **Bases:** tag the cuisine's breads, wraps, noodles, grains, dumpling wrappers, salad greens and broths with `f:` tags. Include at least one `f:broth` and one `f:greens` (or `f:grain`) item per region.
- **Do not duplicate global pantry items** (`src/data/regions/global.js`: flaky sea salt, butter, brown butter, EVOO, eggs, garlic, shallot, red onion, lemon, black pepper, honey, sugar, dark chocolate, cocoa nibs, heavy cream, crème fraîche, yogurt, arugula, frisée, radicchio, radish, cucumber, cherry tomatoes, mushroom/chicken stock, breadcrumbs, microgreens, vanilla, baby lettuces, puffed rice, white rice, potatoes, pickled shallots, brioche, berries, citrus zest). An ingredient that appears in several regions may appear in each region's file, but give it **identical category and allergens** everywhere. Its regions/roles/methods are merged.
