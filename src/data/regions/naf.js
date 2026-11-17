// North African (Moroccan, Tunisian, Egyptian) — Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Lamb shoulder | fatty,umami,soft | lamb | naf,naf.morocco,naf.tunisia | roasted,braised,stewed,grilled | n:warm-spice
Merguez | fatty,spicy,umami | lamb | naf.tunisia,naf.morocco | grilled,fried | h:2 n:warm-spice
Chicken thighs | fatty,umami | poultry | naf,naf.morocco | braised,grilled,roasted |
Pigeon (squab) | umami,fatty | poultry | naf.morocco,naf.egypt | roasted,braised |
Ground beef | fatty,umami | beef | naf.morocco,naf.egypt | grilled,fried | n:warm-spice
Sardines | fatty,umami,salty | fish | naf.morocco | grilled,fried | n:briny
Gray mullet | fatty,umami | fish | naf.egypt,naf.tunisia | grilled,fried,baked |
Shrimp | sweet,umami | shellfish | naf.morocco,naf.tunisia | grilled,sauteed,stewed | n:briny
Octopus | chewy,umami | mollusk | naf.tunisia | grilled,braised,stewed | n:briny
Oil-packed tuna | fatty,umami,salty | fish | naf.tunisia | as-is | acc n:briny
Fesikh (fermented mullet) | salty,umami | fish | naf.egypt | fermented,cured | acc n:funky,briny
# --- Legumes ---
Dried fava beans (ful) | soft | legume | naf.egypt,me.levant | stewed,pureed,fried | n:earthy
Chickpeas | soft | legume | naf,naf.tunisia,naf.morocco | stewed,pureed | n:nutty
Brown lentils | soft | legume | naf.egypt | stewed | n:earthy
# --- Dairy ---
Smen | fatty,salty | dairy | naf.morocco | as-is | n:funky,dairy
Domiati cheese | salty,soft | cheese | naf.egypt | as-is,crumbled | rennet n:dairy
# --- Condiments & fats ---
Harissa | spicy,umami,aromatic | condiment | naf,naf.tunisia | as-is | h:3 n:smoky,warm-spice
Hrous | spicy,salty,umami | condiment | naf.tunisia | as-is,fermented | h:3 n:funky,allium
Shatta | spicy,acidic | condiment | naf.egypt | as-is | h:3 n:fruity
Chermoula | aromatic,acidic | condiment | naf.morocco,naf.tunisia | as-is,grilled | n:herbal,citrus
Preserved lemon | salty,acidic,aromatic | pickle | naf.morocco | as-is,pickled | n:citrus,funky
Cracked green olives | salty,bitter | pickle | naf.morocco | as-is,braised | n:briny,green
Tomato paste | umami,sweet,acidic | condiment | naf.egypt | sauteed | n:fruity
Dukkah | crunchy,aromatic | condiment | naf.egypt | as-is,toasted | a:treenut,sesame n:nutty,toasty
Amlou | sweet,fatty | condiment | naf.morocco | as-is | a:treenut honey dessert n:nutty
Argan oil | fatty,aromatic | fat | naf.morocco | raw,as-is | a:treenut n:nutty,toasty
# --- Spices & herbs ---
Ras el hanout | aromatic | spice | naf.morocco | toasted,as-is | n:warm-spice,floral
Tabil | aromatic | spice | naf.tunisia | toasted,as-is | n:warm-spice,anise
Caraway seeds | aromatic,bitter | spice | naf.tunisia | toasted | n:anise
Cumin | aromatic,bitter | spice | naf,naf.morocco,naf.egypt | toasted,as-is | n:earthy,warm-spice
Saffron | aromatic,bitter | spice | naf.morocco | as-is | dessert n:floral
Cinnamon | aromatic,sweet | spice | naf.morocco | as-is | dessert n:warm-spice
Orange blossom water | aromatic | condiment | naf.morocco,naf.tunisia | as-is | dessert n:floral,citrus
Spearmint | aromatic | herb | naf,naf.morocco | raw | dessert n:herbal
# --- Produce, nuts & seeds ---
Molokhia (jute mallow) | soft,bitter | veg | naf.egypt,naf.tunisia,me.levant | stewed | n:green,herbal
Mallow greens (khobiza) | bitter,soft | veg | naf.morocco | sauteed,stewed | n:green
Crispy fried onions | crunchy,sweet | veg | naf.egypt | fried | n:caramel,allium
Deglet Nour dates | sweet,chewy | fruit | naf.tunisia | as-is,pureed | dessert n:caramel
Dried figs | sweet,chewy | fruit | naf.morocco,naf.tunisia | as-is,stewed | dessert n:fruity
Almonds | fatty,crunchy,sweet | nut | naf.morocco | toasted,fried,pureed | a:treenut dessert n:nutty
Sesame seeds | crunchy,fatty | seed | naf.morocco,naf.egypt | toasted | a:sesame dessert n:nutty,toasty
# --- Grains, breads, broths ---
Couscous | soft | grain | naf,naf.morocco,naf.tunisia | steamed | a:gluten f:grain
Barley couscous (belboula) | soft,chewy | grain | naf.morocco | steamed | a:gluten f:grain n:nutty
Freekeh | chewy,aromatic | grain | naf.egypt,naf.tunisia | stewed,toasted | a:gluten f:grain n:smoky,toasty
Vermicelli (sha'reya) | chewy | noodle | naf.egypt | toasted,fried | a:gluten f:noodle n:toasty
Aish baladi | chewy | bread | naf.egypt | baked,toasted | a:gluten f:flatbread n:toasty
Msemen | chewy,fatty,crunchy | bread | naf.morocco | fried | a:gluten,dairy f:flatbread
Khobz | soft,chewy | bread | naf.morocco | baked | a:gluten f:bread
Warqa | crunchy | bread | naf.morocco | fried,baked | a:gluten f:wrapper dessert
Malsouka | crunchy | bread | naf.tunisia | fried,baked | a:gluten f:wrapper
Lamb bone broth | umami,fatty | condiment | naf | as-is | meat f:broth
`;
