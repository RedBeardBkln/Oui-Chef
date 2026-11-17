// Greek — Format: Name | roles | category | regions | methods | extras
export default `
# --- Main proteins ---
Lamb shoulder | fatty,umami,soft | lamb | gr | roasted,braised,grilled | n:herbal
Goat (katsiki) | umami,fatty,chewy | goat | gr | roasted,braised,stewed | n:herbal,earthy
Pork neck | fatty,umami | pork | gr | grilled,roasted | n:herbal
Loukaniko | fatty,umami,aromatic | pork | gr | grilled,fried | n:citrus,warm-spice
Chicken thighs | fatty,umami | poultry | gr | grilled,roasted,braised | n:citrus
Rabbit | umami,soft | game | gr | braised,roasted,confit | nonkosher n:herbal
Barbounia (red mullet) | umami,fatty | fish | gr | fried,grilled | n:briny
Tsipoura (gilthead bream) | umami,soft | fish | gr | grilled,baked | n:briny,citrus
Sardines | fatty,umami,salty | fish | it.sicily,gr | grilled,fried,cured | n:briny
Bakaliaros (salt cod) | salty,umami | fish | gr | fried,poached | n:briny
Octopus | chewy,umami | mollusk | it.campania,gr | braised,grilled,poached | n:briny
Kalamari (squid) | chewy,sweet | mollusk | gr | fried,grilled | n:briny
Garides (prawns) | sweet,umami,soft | shellfish | gr | grilled,baked,sauteed | n:briny
# --- Accent proteins ---
Gavros marinatos (marinated anchovies) | acidic,salty | fish | gr | cured,pickled | acc a:sulfite n:briny,herbal
Avgotaracho (Messolonghi bottarga) | salty,umami,fatty | fish | gr | shaved,cured | acc n:briny
Tarama (cured fish roe) | salty,umami | fish | gr | as-is,whipped | acc n:briny
Fish stock (psarozoumo) | umami | condiment | gr | as-is | a:fish f:broth n:briny,citrus
# --- Cheese ---
Feta | salty,acidic,soft | cheese | gr | crumbled,baked,as-is | rennet n:dairy
Graviera | salty,fatty,umami | cheese | gr | fried,shaved,as-is | rennet n:nutty,caramel
Kefalotyri | salty,umami,crunchy | cheese | gr | fried,shaved | rennet n:funky
Mizithra | salty,soft | cheese | gr | crumbled,shaved,as-is | dessert rennet n:dairy
Manouri | soft,fatty,sweet | cheese | gr | as-is,baked,grilled | dessert rennet n:dairy
Tyrokafteri | spicy,salty,soft | cheese | gr | as-is | rennet h:2 n:dairy
# --- Produce & herbs ---
Florina peppers | sweet,soft | veg | gr | roasted,charred,pickled | n:smoky,fruity
Piperies kafteres (hot green peppers) | spicy,bitter | chile | gr | fried,grilled | h:2 n:green
Piperies toursi (pickled hot peppers) | spicy,acidic,crunchy | pickle | gr | pickled | a:sulfite h:2 n:green
Boukovo | spicy | chile | gr | as-is | h:2 n:fruity,smoky
Eggplant | soft,bitter | veg | gr | roasted,fried,charred,stewed | n:smoky
Okra (bamies) | soft,chewy | veg | gr | stewed,fried | n:green
Horta (wild greens) | bitter,soft | veg | gr | poached,raw | f:greens n:green
Glistrida (purslane) | acidic,crunchy | veg | gr | raw | f:greens n:green,citrus
Vine leaves | acidic,soft | veg | gr | pickled,steamed | a:sulfite f:wrap n:green
Liastes (sun-dried tomatoes) | umami,sweet,chewy | fruit | gr | as-is,stewed | n:fruity
Tomato paste (pelte) | umami,sweet,acidic | condiment | gr | as-is,stewed | n:fruity,caramel
Kalamata olives | salty,fatty,bitter | pickle | gr | as-is,baked | n:fruity
Throumba olives | salty,fatty,chewy | pickle | gr | as-is | n:fruity,earthy
Capers | salty,acidic | pickle | fr.provence,it.sicily,gr | as-is,fried | n:briny,floral
Kaparofylla (caper leaves) | salty,acidic,bitter | pickle | gr | as-is,pickled | n:briny,green
Greek oregano (rigani) | aromatic,bitter | herb | gr | as-is,toasted | n:herbal
Dill | aromatic | herb | gr | raw | n:anise,green
Spearmint | aromatic | herb | gr | raw,as-is | n:herbal
# --- Spices & condiments ---
Cinnamon | aromatic,sweet | spice | es,gr | as-is | dessert n:warm-spice
Mastiha (Chios mastic) | aromatic,bitter | spice | gr | as-is | dessert n:herbal,floral
Mahlepi | aromatic,bitter | spice | gr | as-is | dessert n:nutty,floral
Avgolemono | acidic,soft,fatty | condiment | gr | whipped | a:egg n:citrus
Skordalia | aromatic,soft | condiment | gr | pureed,as-is | a:gluten,treenut n:allium
Tzatziki | acidic,aromatic,soft | condiment | gr | as-is | a:dairy n:allium,green
Red wine vinegar | acidic | condiment | gr | as-is | a:sulfite n:fruity
Ouzo | aromatic,sweet | condiment | gr | as-is | alcohol n:anise
Mavrodaphne | sweet,aromatic | condiment | gr | as-is,poached,glazed | dessert alcohol a:sulfite n:caramel,fruity
# --- Nuts, seeds & sweets ---
Walnuts | fatty,crunchy,bitter | nut | gr | toasted,raw | dessert a:treenut n:nutty
Aegina pistachios | fatty,crunchy,sweet | nut | gr | toasted,raw | dessert a:treenut n:nutty
Sesame seeds | crunchy,fatty | seed | gr | toasted | dessert a:sesame n:nutty,toasty
Tahini halva | sweet,fatty,crunchy | sweetener | gr | crumbled,as-is | dessert a:sesame n:nutty,caramel
Petimezi (grape molasses) | sweet | sweetener | gr | as-is,glazed | dessert n:fruity,caramel
Loukoumi | sweet,chewy | sweetener | gr | as-is | dessert n:floral
Vyssino (sour cherry spoon sweet) | sweet,acidic | fruit | gr | as-is | dessert n:fruity
Dried figs | sweet,chewy | fruit | gr | as-is,poached | dessert n:caramel,fruity
# --- Legumes, grains & bases ---
Gigantes (giant beans) | soft | legume | gr | baked,stewed | n:earthy
Santorini fava | soft,sweet | legume | gr | pureed | n:earthy,nutty
Chickpeas (revithia) | soft,umami | legume | gr | stewed,baked | n:nutty
Trahanas | acidic,soft | grain | gr | stewed | a:gluten,dairy f:grain n:funky
Kritharaki (orzo) | soft,chewy | noodle | gr | stewed,baked | a:gluten f:noodle
Hilopites | soft,chewy | noodle | gr | stewed,baked | a:gluten,egg f:noodle
Pita | chewy,soft | bread | gr | grilled,fried | a:gluten f:flatbread n:toasty
Paximadia (barley rusks) | crunchy | bread | gr | as-is | a:gluten n:toasty
Phyllo | crunchy | bread | gr | baked | dessert a:gluten f:wrapper n:toasty
Kataifi | crunchy | bread | gr | baked | dessert a:gluten f:wrapper n:toasty
`;
