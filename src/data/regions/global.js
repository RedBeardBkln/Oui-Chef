// Global pantry: staples used across many cuisines. Tagged `global`, so they
// are always on-region but carry less weight than region-specific items.
// Format: Name | roles | category | regions | methods | extras
export default `
Flaky sea salt | salty,crunchy | spice | global | as-is | dessert n:briny
Unsalted butter | fatty,soft | dairy | global | as-is,whipped,confit | dessert n:dairy
Brown butter | fatty,aromatic | dairy | global | as-is | dessert n:nutty,toasty
Extra-virgin olive oil | fatty,bitter | fat | global | as-is | dessert n:green,fruity
Eggs (soft-boiled) | soft,fatty | egg | global | poached,steamed | n:dairy
Egg yolk (cured) | salty,umami,chewy | egg | global | cured |
Garlic | aromatic,umami | veg | global | roasted,confit,fried,sauteed,raw | n:allium
Shallot | aromatic,sweet | veg | global | raw,pickled,fried,confit | n:allium
Red onion | aromatic,crunchy,sweet | veg | global | pickled,raw,charred,grilled | n:allium
Lemon | acidic,aromatic | fruit | global | raw,charred,cured | dessert n:citrus
Black pepper | aromatic | spice | global | toasted,as-is | n:warm-spice
Honey | sweet | sweetener | global | as-is,glazed | dessert honey n:floral
Granulated sugar | sweet,crunchy | sweetener | global | as-is,glazed | dessert n:caramel
Dark chocolate | bitter,sweet,fatty | sweetener | global | as-is,shaved,whipped | dessert a:dairy n:toasty
Cocoa nibs | bitter,crunchy | seed | global | toasted | dessert n:toasty,nutty
Heavy cream | fatty,soft | dairy | global | whipped,as-is | dessert n:dairy
Crème fraîche | fatty,acidic,soft | dairy | global | whipped,as-is | dessert n:dairy
Greek-style yogurt | acidic,soft,fatty | dairy | global | as-is,whipped | dessert n:dairy
Arugula | bitter,aromatic | veg | global | raw | f:greens n:green
Frisée | bitter,crunchy | veg | global | raw | f:greens n:green
Radicchio | bitter,crunchy | veg | global | raw,grilled,charred | f:greens n:green
Radish | crunchy,bitter | veg | global | raw,shaved,pickled,roasted | n:green
Cucumber | crunchy,soft | veg | global | raw,pickled,shaved | n:green
Cherry tomatoes | sweet,acidic,soft | fruit | global | raw,blistered,roasted,confit | n:fruity
Mushroom stock | umami | condiment | global | as-is | f:broth n:earthy
Chicken stock | umami,fatty | condiment | global | as-is | meat f:broth
Toasted breadcrumbs | crunchy | bread | global | toasted,fried | a:gluten n:toasty
Microgreens | aromatic,bitter | herb | global | raw | n:green
Vanilla bean | aromatic,sweet | spice | global | as-is | dessert n:floral
Mixed baby lettuces | soft,bitter | veg | global | raw | f:greens n:green
Puffed rice | crunchy | grain | global | fried,toasted | dessert n:toasty
White rice | soft | grain | global | steamed | f:grain
Potatoes | soft,crunchy | starch | global | roasted,fried,pureed,confit | n:earthy
Pickled shallots | acidic,crunchy,sweet | pickle | global | pickled | n:allium
Brioche | sweet,fatty,soft | bread | global | toasted | dessert a:gluten,dairy,egg f:bread
Burnt-honey caramel | sweet,bitter | sweetener | global | as-is | dessert honey n:caramel
Seasonal berries | sweet,acidic,soft | fruit | global | raw,pureed,roasted | dessert n:fruity
Citrus zest | aromatic,bitter | fruit | global | raw | dessert n:citrus
`;
