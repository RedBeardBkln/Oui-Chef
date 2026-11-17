// Brazilian (Bahian, Minas Gerais, Southern / Gaúcho, Amazonian)
// Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Picanha | fatty,umami | beef | br,br.south | grilled,roasted | n:smoky
Costela (beef ribs) | fatty,chewy | beef | br.south | roasted,grilled,smoked | n:smoky
Carne-de-sol (salted sun-dried beef) | salty,umami,chewy | beef | br,br.bahia | fried,grilled | 
Cordeiro (lamb) | fatty,umami | lamb | br.south | grilled,roasted | n:smoky
Linguiça (pork sausage) | fatty,salty | pork | br,br.south | grilled,fried | n:allium,smoky
Costelinha de porco (pork ribs) | fatty,umami | pork | br.minas | fried,braised,stewed |
Lombo de porco (pork loin) | umami | pork | br.minas | roasted,braised |
Torresmo (pork cracklings) | crunchy,fatty,salty | pork | br.minas | fried | acc
Frango caipira (free-range chicken) | umami,chewy | poultry | br.minas | stewed,braised |
Camarão (shrimp) | sweet,umami | shellfish | br.bahia | stewed,fried,grilled | n:briny
Camarão seco (dried shrimp) | salty,umami | shellfish | br.bahia | toasted,as-is | acc n:briny,funky
Siri (blue crab) | sweet,soft | shellfish | br.bahia | stewed,baked | n:briny
Robalo (snook) | soft | fish | br.bahia | stewed,grilled | n:briny
Tambaqui | fatty | fish | br.amazon | grilled,roasted |
Pirarucu | soft,umami | fish | br.amazon | cured,grilled,fried |
Feijão preto (black beans) | soft | legume | br | stewed | n:earthy
Feijão carioca (pinto-type beans) | soft | legume | br.minas | stewed,fried | n:earthy
Feijão-fradinho (black-eyed peas) | soft | legume | br.bahia | pureed,fried | n:earthy
# --- Cassava & starches ---
Mandioca (cassava) | soft,crunchy | starch | br | fried,stewed,pureed | n:earthy
Farinha de mandioca (cassava flour) | crunchy | starch | br | toasted,as-is | n:toasty
Farinha d'água (fermented cassava flour) | crunchy,acidic | starch | br.amazon | as-is,toasted | n:funky,toasty
Tapioca starch (goma) | chewy | starch | br | toasted | f:wrap
Polvilho azedo (sour cassava starch) | chewy,crunchy | starch | br.minas | baked | n:funky
Banana-da-terra (plantain) | sweet,soft | starch | br.bahia,br.minas | fried,baked | dessert n:caramel
Fubá (fine cornmeal) | soft | grain | br.minas | stewed,baked | f:grain n:toasty
Canjiquinha (cracked corn) | soft,chewy | grain | br.minas | stewed | f:grain n:earthy
Pão francês | crunchy,soft | bread | br | toasted,as-is | a:gluten f:bread n:toasty
# --- Dairy ---
Queijo Minas frescal | soft,salty | cheese | br.minas | as-is,grilled | dessert rennet n:dairy
Queijo Canastra | salty,umami,fatty | cheese | br.minas | as-is,shaved | rennet n:dairy,funky
Queijo coalho | salty,chewy | cheese | br.bahia | grilled | rennet n:dairy
Requeijão | soft,fatty | cheese | br,br.minas | as-is,baked | n:dairy
Doce de leite | sweet,soft | dairy | br.minas | as-is | dessert n:caramel,dairy
Leite condensado (condensed milk) | sweet,soft | dairy | br | as-is | dessert n:caramel,dairy
# --- Fats, sauces, condiments ---
Azeite de dendê (palm oil) | fatty,aromatic | fat | br.bahia | stewed,fried | n:earthy,fruity
Leite de coco (coconut milk) | fatty,soft,sweet | fat | br.bahia | stewed | dessert n:nutty
Tucupi | acidic,umami | condiment | br.amazon | stewed,as-is | f:broth n:funky,citrus
Molho à campanha | acidic,crunchy | condiment | br,br.south | raw | a:sulfite n:green,allium
Sal grosso (coarse salt) | salty,crunchy | spice | br.south | as-is |
Cachaça | aromatic | condiment | br | as-is | alcohol dessert n:green,fruity
# --- Chiles & herbs ---
Malagueta pepper | spicy | chile | br,br.bahia | raw,pickled | h:4 n:fruity
Dedo-de-moça (red finger chile) | spicy | chile | br | raw,sauteed | h:2 n:fruity
Pimenta-de-cheiro | aromatic,spicy | chile | br.amazon,br.bahia | raw,stewed | h:1 n:fruity,floral
Pimenta biquinho | sweet,spicy,acidic | chile | br.minas | pickled,raw | h:1 n:fruity
Jambu | aromatic,spicy | herb | br.amazon | raw,poached | h:1 n:green,citrus
Erva-mate | bitter,aromatic | herb | br.south | as-is | n:herbal,green
# --- Produce ---
Couve (collard greens) | bitter,crunchy | veg | br.minas | sauteed,raw | n:green
Ora-pro-nóbis | soft | veg | br.minas | sauteed,stewed | n:green
Jiló (scarlet eggplant) | bitter,soft | veg | br.minas | fried,sauteed | n:green
Café (Sul de Minas coffee) | bitter,aromatic | seed | br.minas | as-is | dessert n:toasty,caramel
Quiabo (okra) | soft | veg | br.minas,br.bahia | stewed,sauteed | n:green
Palmito (hearts of palm) | soft,crunchy | veg | br | raw,grilled,braised | n:green
Pequi | fatty,aromatic | fruit | br.minas | stewed | n:funky,fruity
Jabuticaba | sweet,acidic | fruit | br.minas | raw,pureed | dessert n:fruity
Goiabada (guava paste) | sweet,chewy | fruit | br.minas | as-is | dessert n:fruity
Rapadura | sweet | sweetener | br | as-is | dessert n:caramel
Coco ralado (grated coconut) | sweet,chewy | fruit | br.bahia | toasted,as-is | dessert n:nutty
Caju (cashew apple) | acidic,sweet | fruit | br | raw,pureed | a:treenut dessert n:fruity
Açaí | bitter,fatty | fruit | br.amazon | pureed | dessert n:earthy,fruity
Cupuaçu | acidic,sweet | fruit | br.amazon | pureed | dessert n:fruity,floral
Castanha-do-pará (Brazil nut) | fatty,crunchy | nut | br.amazon | toasted,raw | dessert a:treenut n:nutty
Pinhão (araucaria seed) | soft,sweet | nut | br.south | poached,roasted | a:treenut n:nutty,earthy
`;
