// Mexican — Format: Name | roles | category | regions | methods | extras
export default `
# --- Main proteins ---
Pork shoulder | fatty,umami,soft | pork | mx,mx.central,mx.yucatan | braised,confit,roasted | n:warm-spice
Chicken thighs | fatty,umami | poultry | mx | grilled,braised,roasted | n:smoky
Turkey (guajolote) | umami,fatty | poultry | mx.central,mx.oaxaca,mx.yucatan | braised,stewed,roasted | n:earthy
Beef arrachera (skirt steak) | umami,chewy,fatty | beef | mx,mx.norteno | grilled,seared | n:smoky
Cecina (salted dried beef) | salty,chewy,umami | beef | mx.central | grilled,cured | n:smoky
Tasajo | salty,chewy,umami | beef | mx.oaxaca | grilled,cured | n:smoky
Machaca (dried shredded beef) | salty,chewy,umami | beef | mx.norteno | sauteed,fried | n:smoky
Cabrito (kid goat) | umami,fatty,soft | goat | mx.norteno | roasted,grilled,braised | n:smoky
Lamb (for barbacoa) | fatty,umami,soft | lamb | mx.central | steamed,braised,roasted | n:herbal
Red snapper (huachinango) | soft,umami | fish | mx.veracruz | fried,roasted,braised | n:briny
Smoked marlin | salty,umami | fish | mx.baja | smoked,sauteed | nonkosher n:smoky,briny
Shrimp | sweet,umami | shellfish | mx,mx.baja,mx.veracruz | raw,grilled,fried,sauteed | n:briny
Spiny lobster (langosta) | sweet,fatty | shellfish | mx.baja | fried,grilled | n:briny
Octopus (pulpo) | chewy,umami | mollusk | mx.veracruz,mx.baja | grilled,braised,poached | n:briny
Chocolate clams (almeja chocolata) | sweet,umami | mollusk | mx.baja | raw,grilled | n:briny
Pen shell scallops (callo de hacha) | sweet,soft | mollusk | mx.baja | raw,seared | n:briny
# --- Accent proteins ---
Mexican chorizo | fatty,spicy,umami | pork | mx,mx.central | fried | acc a:soy h:1 n:warm-spice,smoky
Chicharrón | crunchy,fatty,salty | pork | mx | fried | acc n:toasty
Dried shrimp (camarón seco) | salty,umami | shellfish | mx,mx.oaxaca,mx.veracruz | toasted,stewed | acc n:briny,funky
Chapulines (toasted grasshoppers) | crunchy,salty,acidic | game | mx.oaxaca | toasted | acc a:shellfish n:toasty,earthy
# --- Legumes ---
Black beans | soft,umami | legume | mx,mx.oaxaca,mx.veracruz,mx.yucatan | stewed,fried,pureed | n:earthy
Pinto beans | soft,umami | legume | mx,mx.norteno | stewed,fried | n:earthy
# --- Corn, breads, bases ---
Corn tortillas | chewy,soft | bread | mx | toasted,fried | f:wrap n:toasty,earthy
Flour tortillas | soft,chewy | bread | mx.norteno | toasted | a:gluten pork f:wrap n:toasty
Tlayuda | crunchy,chewy | bread | mx.oaxaca | toasted,grilled | f:flatbread n:toasty
Nixtamalized masa | soft,sweet | grain | mx | steamed,fried,toasted | n:earthy,toasty
Hominy (cacahuazintle) | chewy,soft | grain | mx,mx.central | stewed | f:grain n:earthy
Shrimp-head stock | umami,salty | condiment | mx.veracruz | as-is | a:shellfish f:broth n:briny
# --- Vegetables & fungi ---
Tomatillo | acidic,sweet | veg | mx | raw,charred,roasted,pureed | n:green,citrus
Nopales | acidic,chewy | veg | mx,mx.central | grilled,sauteed,raw,pickled | n:green
Jícama | crunchy,sweet | veg | mx | raw,pickled | n:green
Squash blossoms (flor de calabaza) | soft,sweet | veg | mx.central,mx.oaxaca | sauteed,fried | n:floral
Verdolagas (purslane) | acidic,crunchy | veg | mx.central | raw,stewed,sauteed | f:greens n:green
Huitlacoche | umami,soft | fungi | mx.central | sauteed | n:earthy
Avocado | fatty,soft | fruit | mx | raw,charred | n:green,nutty
# --- Herbs & aromatics ---
Pápalo | bitter,aromatic | herb | mx.central,mx.oaxaca | raw | n:herbal,green
Epazote | aromatic,bitter | herb | mx,mx.central,mx.oaxaca,mx.veracruz | raw,stewed | n:herbal
Hoja santa | aromatic | herb | mx.oaxaca,mx.veracruz | steamed,raw,stewed | n:anise,herbal
Mexican oregano | aromatic,bitter | herb | mx,mx.yucatan | toasted,as-is | n:herbal,earthy
Mexican cinnamon (canela) | aromatic,sweet | spice | mx | toasted,as-is | dessert n:warm-spice
# --- Chiles & heat ---
Poblano | spicy,bitter | chile | mx,mx.central | charred,roasted | h:1 n:green,smoky
Ancho chile | sweet,spicy | chile | mx | toasted | h:1 n:fruity,smoky
Pasilla chile | bitter,spicy | chile | mx,mx.central | toasted,fried | h:1 n:fruity,earthy
Guajillo chile | spicy,acidic | chile | mx | toasted | h:2 n:fruity
Chipotle (smoked jalapeño) | spicy,aromatic | chile | mx,mx.veracruz | toasted,braised | h:2 n:smoky
Jalapeño | spicy,crunchy | chile | mx,mx.veracruz | raw,charred,pickled | h:2 n:green
Serrano | spicy,crunchy | chile | mx | raw,charred | h:3 n:green
Chile de árbol | spicy | chile | mx | toasted,fried | h:3 n:smoky
Habanero | spicy,aromatic | chile | mx.yucatan | raw,charred,pickled | h:4 n:fruity,floral
Chiltepín | spicy | chile | mx.norteno | crumbled,as-is | h:4 n:smoky
Salsa macha | spicy,fatty,crunchy | condiment | mx.veracruz | as-is | a:peanut,sesame h:3 n:toasty,nutty
Pickled jalapeños | acidic,spicy | pickle | mx | pickled | h:2 n:green
Chile-lime salt | salty,acidic,spicy | spice | mx | as-is | h:1 n:citrus
Chamoy | salty,acidic,spicy | condiment | mx | as-is | h:1 n:fruity
# --- Pastes, ferments, condiments ---
Achiote paste (recado rojo) | aromatic,bitter | condiment | mx.yucatan | as-is | n:earthy,citrus
Mole negro paste | bitter,sweet,umami | condiment | mx.oaxaca | as-is,braised | a:treenut,peanut,sesame,gluten pork n:smoky,warm-spice
Mole poblano paste | sweet,bitter,umami | condiment | mx.central | as-is,braised | a:treenut,peanut,sesame,gluten pork n:warm-spice,toasty
Pickled red onion | acidic,crunchy,sweet | pickle | mx.yucatan | pickled | n:allium,citrus
Mezcal | aromatic,bitter | condiment | mx.oaxaca | as-is | alcohol n:smoky
# --- Fats & dairy ---
Lard (manteca) | fatty | fat | mx | fried,confit | pork n:toasty
Quesillo (Oaxaca cheese) | chewy,salty,fatty | cheese | mx.oaxaca | as-is,baked,grilled | rennet n:dairy
Queso fresco | salty,soft | cheese | mx | crumbled | rennet n:dairy
Cotija | salty,umami | cheese | mx | crumbled | rennet n:dairy
Queso Chihuahua (menonita) | fatty,soft,salty | cheese | mx.norteno | baked,grilled | rennet n:dairy
Mexican crema | fatty,acidic,soft | dairy | mx | as-is | dessert n:dairy
# --- Fruit, sweet & dessert ---
Mexican lime (limón) | acidic,aromatic | fruit | mx | raw | dessert n:citrus
Sour orange (naranja agria) | acidic,bitter | fruit | mx.yucatan | raw | n:citrus
Ripe plantain | sweet,soft | fruit | mx.veracruz | fried,roasted | dessert n:caramel
Mango (Ataúlfo) | sweet,soft | fruit | mx | raw,pureed | dessert n:fruity,floral
Prickly pear (tuna) | sweet,soft | fruit | mx.central | raw,pureed | dessert n:fruity
Tamarind | acidic,sweet | fruit | mx | pureed | dessert n:fruity
Toasted pepitas | crunchy,fatty | seed | mx,mx.yucatan | toasted | dessert n:nutty,toasty
Piloncillo | sweet | sweetener | mx | as-is | dessert n:caramel
Cajeta | sweet,soft | sweetener | mx.central | as-is | dessert a:dairy n:caramel
Mexican chocolate (tablet) | sweet,bitter,aromatic | sweetener | mx.oaxaca | as-is | dessert a:treenut,soy,dairy n:warm-spice,toasty
`;
