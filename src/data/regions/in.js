// Indian (North, South, Bengali, Goan, Gujarati) — Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Goat meat | chewy,fatty,umami | goat | in,in.north,in.bengal | braised,stewed,grilled | n:warm-spice
Chicken thighs | fatty,umami | poultry | in,in.north | grilled,braised,roasted | n:smoky
Pork shoulder | fatty,umami | pork | in.goa | braised,stewed |
Duck legs | fatty,umami | poultry | in.south | roasted,braised | n:warm-spice
Hilsa (ilish) | fatty,umami | fish | in.bengal | steamed,fried |
Rohu | soft,umami | fish | in.bengal | fried,stewed |
Kingfish | fatty,umami | fish | in.goa,in.south | fried,grilled | n:briny
Shrimp | sweet,umami | shellfish | in.goa,in.south,in.bengal | stewed,fried | n:briny
Mud crab | sweet,umami | shellfish | in.south | stewed,stir-fried | n:briny
Goan chouriço | fatty,spicy,salty | pork | in.goa | fried,stewed | acc h:3 n:smoky,warm-spice
Paneer | soft,fatty | cheese | in.north | grilled,fried,stewed | n:dairy
# --- Legumes ---
Chickpeas | soft | legume | in.north | stewed | n:nutty
Toor dal | soft | legume | in,in.south,in.gujarat | stewed | n:earthy
Whole black urad | soft,fatty | legume | in.north | stewed | n:earthy
Besan (chickpea flour) | soft | legume | in.gujarat,in.north | fried,steamed | n:nutty
Papad | crunchy,salty | legume | in,in.gujarat | fried,roasted | a:gluten n:toasty
# --- Dairy & fats ---
Ghee | fatty,aromatic | dairy | in | as-is,fried | dessert n:nutty,dairy
Khoya | sweet,fatty,soft | dairy | in.north | as-is | dessert n:caramel,dairy
Chhena | soft | cheese | in.bengal | as-is,crumbled | dessert n:dairy
Mustard oil | fatty,bitter,aromatic | fat | in.bengal | as-is,fried | a:mustard
Coconut oil | fatty | fat | in.south | fried | n:nutty
Coconut milk | fatty,soft,sweet | fat | in.south,in.goa | stewed | dessert n:nutty
# --- Chiles & spicy condiments ---
Kashmiri chile | spicy,aromatic | chile | in,in.north,in.goa | as-is,toasted,fried | h:1 n:smoky,fruity
Guntur chile | spicy | chile | in.south | fried,toasted | h:3 n:smoky
Green chiles | spicy | chile | in | raw,fried | h:3 n:green
Bhut jolokia | spicy,aromatic | chile | in | as-is,pickled | h:5 n:fruity,smoky
Recheado masala | spicy,acidic,aromatic | condiment | in.goa | as-is | h:2 n:warm-spice
Mango pickle (achar) | acidic,salty,spicy | pickle | in,in.gujarat | as-is | a:mustard h:2 n:fruity
Kasundi | acidic,bitter,aromatic | condiment | in.bengal | as-is | a:mustard n:funky
# --- Spices & herbs ---
Garam masala | aromatic | spice | in.north | as-is | n:warm-spice
Panch phoron | aromatic,bitter | spice | in.bengal | fried | n:anise,warm-spice
Black mustard seeds | bitter,aromatic | spice | in.south,in.bengal | fried | a:mustard n:toasty
Curry leaves | aromatic | herb | in.south | fried | n:citrus,herbal
Asafoetida (hing) | aromatic,umami | spice | in.gujarat,in.south | fried | a:gluten n:allium,funky
Turmeric | bitter,aromatic | spice | in | as-is,fried | n:earthy
Cumin seeds | aromatic | spice | in | toasted,fried | n:earthy,warm-spice
Fenugreek seeds | bitter,aromatic | spice | in.bengal,in.gujarat | fried | n:caramel
Kasuri methi | bitter,aromatic | herb | in.north | as-is | n:herbal,caramel
Green cardamom | aromatic | spice | in,in.north | as-is,toasted | dessert n:floral
Nigella seeds | bitter,aromatic | spice | in.bengal,in.north | toasted,fried | n:allium,toasty
Saffron | aromatic,bitter | spice | in.north | as-is | dessert n:floral
Amchur | acidic | spice | in.north | as-is | n:fruity
Kala namak | salty,aromatic | spice | in,in.north | as-is | n:funky
Fresh ginger | aromatic | spice | in | raw,fried,pureed | n:citrus
Rosewater | aromatic | condiment | in.north | as-is | dessert n:floral
# --- Souring agents & sweeteners ---
Tamarind | acidic,sweet | fruit | in.south | pureed,as-is | n:fruity
Kokum | acidic | fruit | in.goa,in.gujarat | as-is,stewed | n:fruity
Goan toddy vinegar | acidic | condiment | in.goa | as-is | n:funky
Jaggery | sweet | sweetener | in,in.gujarat | as-is | dessert n:caramel
Nolen gur (date palm jaggery) | sweet,aromatic | sweetener | in.bengal | as-is | dessert n:caramel,smoky
# --- Produce, nuts & seeds ---
Okra | soft | veg | in | fried,sauteed | n:green
Bitter melon | bitter,crunchy | veg | in,in.bengal,in.gujarat | fried,sauteed | n:green
Mustard greens | bitter | veg | in.north | stewed,pureed | n:green
Drumsticks (moringa pods) | soft,bitter | veg | in.south | stewed | n:green
Raw jackfruit | chewy | veg | in.south,in.bengal | stewed,fried | n:earthy
Gucchi morels | umami | fungi | in.north | sauteed,stewed | n:earthy,smoky
Green mango | acidic,crunchy | fruit | in,in.gujarat | raw,pickled | n:green
Kesar mango | sweet,soft | fruit | in.gujarat | raw,pureed | dessert n:fruity,floral
Mankurad mango | sweet,soft | fruit | in.goa | raw,pureed | dessert n:fruity
Grated coconut | sweet,fatty,chewy | fruit | in.south,in.goa | as-is,toasted | dessert n:nutty
Posto (white poppy seeds) | fatty,soft | seed | in.bengal | pureed | n:nutty
Roasted peanuts | crunchy,fatty | nut | in.gujarat | roasted,crumbled | a:peanut dessert n:nutty
Sesame seeds | crunchy,fatty | seed | in.gujarat | toasted | a:sesame dessert n:nutty
Pistachios | fatty,crunchy,sweet | nut | in.north | as-is,crumbled | a:treenut dessert n:nutty
# --- Grains, breads, broths ---
Basmati rice | soft,aromatic | grain | in.north | steamed | f:grain n:floral
Gobindobhog rice | soft,aromatic | grain | in.bengal | steamed | dessert f:grain n:floral
Dosa batter | acidic,soft | grain | in.south | fermented,steamed,fried | f:wrap n:funky
Naan | chewy,soft | bread | in.north | baked | a:gluten,dairy f:flatbread n:toasty
Roti | chewy | bread | in | baked,charred | a:gluten f:flatbread n:toasty
Thepla | soft,bitter | bread | in.gujarat | fried | a:gluten,dairy f:flatbread
Poi (Goan bread) | chewy,soft | bread | in.goa | baked | a:gluten f:bread
Yakhni (spiced mutton stock) | umami,aromatic,fatty | condiment | in.north | as-is | meat f:broth
`;
