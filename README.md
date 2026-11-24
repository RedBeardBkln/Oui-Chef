# Oui Chef

**A flavor and sensory randomizer for chefs.** Set a brief (cuisine, style, course, protein, spice, diet, ingredients) and Oui Chef returns **ten ingredient combinations**. Each one covers the full organoleptic panel and suggests a cooking method for every component. It's built for creative inspiration: it does **not** write recipes or instructions.

It runs on phones, tablets and desktops as an installable, offline-capable web app (PWA).

## What the chef chooses

| Brief | Options |
|---|---|
| World region | 26 cuisines (Mexican, French, Southern, Thai, West African…) or *Any*, which spreads the ten lists across ten cuisines |
| Sub-region | e.g. Mexican → Central / Oaxaca / Yucatán…, American Barbecue → Texas / Memphis / Kansas City / Carolinas / Alabama |
| Style (non-regional) | Pizza & flatbreads, Barbecue, Seafood, Salads, Soups, Tacos, Sandwiches, Noodles, Bowls, Dumplings, Brunch, Street food, Vegetable-forward |
| Menu placement | Amuse, Appetizer, Small plate, Salad, Soup, Entrée, Side, Dessert |
| Protein | Any combination of beef, pork, lamb, goat, poultry, game, fish, shellfish, egg, plant-based, or none |
| Spice level | None → Extra hot (heat values based on Scoville ranges) |
| Dietary | Vegan, vegetarian, pescatarian, halal, kosher-style, no pork, no red meat, no alcohol |
| Allergen-free | Dairy, egg, fish, crustacean shellfish, mollusks, tree nuts, peanuts, gluten/wheat, soy, sesame, mustard, sulfites |
| Ingredients | Must-include (from the database or any free text) and exclude (matches by name) |
| Creativity | Classic (in-cuisine), Inspired (1 cross-cultural wildcard), Adventurous (3 wildcards) |

**No contradictory briefs.** Options that contradict the current selection are greyed out, with a note saying why. Selecting Beef disables Vegan, Vegetarian, Pescatarian and No red meat; Halal disables Pork; Dessert disables proteins, the Seafood style and Extra-hot spice; and so on in both directions. A few rules come from what the database can support: Dessert can't be combined with the Pizza, Salad, Soup or Noodle styles, and Gluten-free can't be combined with Sandwiches or Dumplings, because there is no matching dessert or gluten-free base yet. A must-include ingredient that the brief rules out (e.g. jamón with Halal) is flagged. The rules live in `src/constraints.js`.

## What the system adds

- **Sensory panel coverage:** every list covers sweet, acidic, salty, bitter, umami, fatty, aromatic, soft/creamy and crunchy, plus spicy when a spice level is set. Chewy is covered when possible. Each card shows which elements are covered, and says so plainly if a restriction makes one impossible.
- **Cooking methods** are assigned per ingredient from the methods realistic for it (e.g. corn → charred, mushrooms → roasted), biased by style (barbecue favors smoked/grilled) and varied within a list.
- **Textures** come from the soft/crunchy/chewy roles.
- **Pairing:** ingredients are drawn mainly from the chosen cuisine and sub-region, so combinations reflect real culinary traditions. Wildcards are chosen for shared aroma notes (citrus, smoky, earthy…) with the rest of the list.

## Working with results

- 🔒 **Lock** ingredients you like, then **Re-roll** a list to regenerate the rest.
- ⇄ **Swap** a single ingredient for another that covers the same sensory roles.
- **Generate dish** turns a list into a plated concept: a menu-style name, components grouped by their place on the plate, sensory balance, contrasts, methods in play, and a plating idea. It has no quantities or steps.
- ♡ **Save** combinations (stored on the device), **Copy** as text, or **Print**.

## Run it

No build step and no dependencies.

```bash
npm run serve        # → http://localhost:8080  (or any static file server)
npm test             # engine + data tests (Node 20+)
npm run validate     # schema check + per-region coverage report
```

To deploy, host the repository root on any static host (GitHub Pages, Netlify, Cloudflare Pages…). Service workers need HTTPS (or localhost).

## The ingredient database

`src/data/regions/*.js` holds a curated, AI-authored database with one file per region and one line per ingredient. Each ingredient is tagged with its sensory roles, category, region/sub-region, realistic cooking methods, allergens, heat, aroma notes, base/format tags and dietary flags. The line format and tagging rules are in [`docs/DATA_AUTHORING.md`](docs/DATA_AUTHORING.md), and `npm run validate` enforces them.

### Accuracy notes (please read)

- The database was generated with AI assistance and checked by automated schema/consistency validation. It has **not yet been reviewed line-by-line by a culinary professional**. Treat regional attributions as a strong starting point, not an authority. Corrections are easy: edit one line.
- **Allergen and dietary tags are guidance, not a guarantee.** Tags are conservative (e.g. soy sauce is tagged gluten, hoisin is tagged sesame), but commercial products vary. Always check the labels of the products you actually use.
- *Halal* and *Kosher-style* filter out prohibited ingredients (and kosher-style never combines meat with dairy or fish), but certification of meat, cheese, wine, etc. is still required. Some fermented products (e.g. soy sauce) contain trace alcohol from fermentation and are not flagged.
- *Vegetarian* also excludes cheeses traditionally made with animal rennet (Parmigiano-Reggiano, Pecorino Romano, etc.).
- Pairing is based on culinary tradition (regional co-occurrence) and shared aroma notes, not on a chemical flavor-compound model.

## Project layout

```
index.html, manifest.webmanifest, sw.js, icons/   PWA shell
src/app.js        UI
src/engine.js     generation engine (pure, testable)
src/dish.js       dish concept builder
src/config.js     diets, proteins, styles, placements, creativity
src/data/         taxonomy, regions, parser, ingredient files
scripts/          data validator, icon renderer
tests/            node:test suites
```
