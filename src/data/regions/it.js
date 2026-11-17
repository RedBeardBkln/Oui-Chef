// Italian — Format: Name | roles | category | regions | methods | extras
export default `
# --- Main proteins ---
Chianina beef | umami,fatty,chewy | beef | it.tuscany | grilled,seared,raw | n:smoky,toasty
Fassona beef | umami,soft | beef | it.piedmont | raw,braised | n:earthy
Oxtail | fatty,umami,soft | beef | it.lazio | braised,stewed | n:warm-spice
Tripe | chewy,soft | beef | it.lazio,it.tuscany | braised,stewed,poached | n:funky
Abbacchio | umami,fatty | lamb | it.lazio | roasted,grilled,fried | n:herbal
Cinta Senese pork | fatty,umami | pork | it.tuscany | roasted,grilled,cured | n:nutty
Cotechino | fatty,umami,soft | pork | it.emilia | poached | n:warm-spice
Wild boar (cinghiale) | umami,chewy | game | it.tuscany | braised,stewed | pork nonkosher n:earthy,warm-spice
Swordfish | umami,fatty | fish | it.sicily | grilled,seared,raw | nonkosher n:briny
Bluefin tuna | umami,fatty,soft | fish | it.sicily | raw,seared,grilled,cured | n:briny
Sardines | fatty,umami,salty | fish | it.sicily,gr | grilled,fried,cured | n:briny
Octopus | chewy,umami | mollusk | it.campania,gr | braised,grilled,poached | n:briny
Vongole veraci | salty,umami,soft | mollusk | it.campania | steamed,sauteed | n:briny
Gambero rosso di Mazara | sweet,umami,soft | shellfish | it.sicily | raw,grilled | n:briny
# --- Accent proteins & fats ---
Guanciale | fatty,salty,umami | pork | it.lazio | cured,fried,sauteed | acc n:warm-spice
Prosciutto di Parma | salty,umami,fatty | pork | it.emilia | cured,shaved | acc n:nutty,dairy
Mortadella | fatty,salty,soft | pork | it.emilia | shaved,as-is | acc a:treenut n:warm-spice
Soppressata calabrese | spicy,fatty,salty | pork | it | shaved,as-is | acc h:2 n:warm-spice,funky
'Nduja | spicy,fatty,salty | pork | it | as-is,fried | acc h:3 n:funky,smoky
Bottarga | salty,umami | fish | it.sicily | shaved,cured | acc n:briny
Colatura di alici | salty,umami | condiment | it.campania | as-is | a:fish n:briny,funky
Lardo di Colonnata | fatty,soft,salty | fat | it.tuscany | cured,shaved | pork n:herbal,warm-spice
Capon broth (brodo) | umami,fatty | condiment | it.emilia,it.piedmont | as-is,poached | meat f:broth n:herbal
# --- Cheese & dairy ---
Parmigiano-Reggiano | salty,umami,crunchy | cheese | it.emilia | shaved,as-is,baked | rennet n:nutty,dairy
Pecorino Romano | salty,umami,fatty | cheese | it.lazio | shaved,as-is | rennet n:funky,dairy
Pecorino Toscano | salty,fatty | cheese | it.tuscany | shaved,as-is | rennet n:nutty
Mozzarella di bufala | soft,fatty | cheese | it.campania | raw,baked | rennet n:dairy
Caciocavallo | salty,umami,chewy | cheese | it.sicily,it.campania | grilled,baked,as-is | rennet n:dairy,smoky
Gorgonzola | soft,salty,bitter | cheese | it.piedmont | as-is,baked | rennet n:funky
Ricotta | soft,sweet | cheese | it.sicily,it.lazio | whipped,baked,as-is | dessert rennet n:dairy
Mascarpone | fatty,soft,sweet | dairy | it | whipped,as-is | dessert n:dairy
# --- Produce, fungi & herbs ---
San Marzano tomatoes | acidic,sweet,umami | fruit | it.campania | stewed,pureed,roasted | n:fruity
Friarielli | bitter,aromatic | veg | it.campania | sauteed,braised | n:green,allium
Puntarelle | bitter,crunchy | veg | it.lazio | raw | f:greens n:green
Carciofi romaneschi | bitter,soft | veg | it.lazio | braised,fried,roasted | n:green,herbal
Cavolo nero | bitter,chewy | veg | it.tuscany | braised,stewed,sauteed | n:earthy,green
Fave (fresh fava beans) | sweet,soft | legume | it.lazio,it.sicily | raw,stewed,pureed | n:green
Cannellini beans | soft | legume | it.tuscany | braised,stewed,pureed | n:earthy
Porcini | umami,soft | fungi | it.piedmont,it.tuscany | sauteed,grilled,raw,shaved | n:earthy,nutty
White truffle (Alba) | aromatic,umami | fungi | it.piedmont | shaved | n:earthy,funky,allium
Blood oranges | sweet,acidic | fruit | it.sicily | raw,pureed | dessert n:citrus,fruity
Castelvetrano olives | salty,fatty | pickle | it.sicily | as-is | n:fruity,green
Capers | salty,acidic | pickle | fr.provence,it.sicily,gr | as-is,fried | n:briny,floral
Wild fennel (finocchietto) | aromatic,sweet | herb | it.sicily | raw,braised | n:anise,green
Basil | aromatic,sweet | herb | it | raw | n:herbal,anise
Mentuccia (Roman mint) | aromatic | herb | it.lazio | raw,braised | n:herbal
Sage | aromatic,bitter | herb | it.tuscany | fried,as-is | n:herbal,earthy
Dried Sicilian oregano | aromatic,bitter | herb | it.sicily | as-is | n:herbal
Fennel pollen | aromatic,sweet | spice | it.tuscany | as-is | n:anise,floral
Peperoncino | spicy | chile | it | as-is,fried,toasted | h:3 n:fruity
Calabrian chiles in oil | spicy,fatty | chile | it | as-is | h:3 n:fruity,smoky
# --- Nuts & sweets ---
Pistachio di Bronte | fatty,sweet,crunchy | nut | it.sicily | toasted,raw,pureed | dessert a:treenut n:nutty,green
Avola almonds | fatty,crunchy,sweet | nut | it.sicily | toasted,raw | dessert a:treenut n:nutty
Nocciola Piemonte (hazelnuts) | fatty,crunchy | nut | it.piedmont | toasted | dessert a:treenut n:nutty,toasty
Chestnut flour | sweet,soft | nut | it.tuscany,it.piedmont | baked | dessert a:treenut n:earthy,nutty
Gianduja | sweet,fatty,soft | sweetener | it.piedmont | as-is,whipped | dessert a:treenut,dairy n:nutty,toasty
Amaretti | sweet,bitter,crunchy | sweetener | it.piedmont | crumbled | dessert a:treenut,egg n:nutty
Saba (cooked grape must) | sweet,acidic | sweetener | it.emilia | as-is,glazed | dessert n:fruity,caramel
Aceto balsamico tradizionale | acidic,sweet | condiment | it.emilia | as-is | dessert a:sulfite n:fruity,caramel
Marsala | sweet,aromatic | condiment | it.sicily | glazed,braised | dessert alcohol a:sulfite n:caramel,nutty
Vin Santo | sweet,aromatic | condiment | it.tuscany | as-is,poached | dessert alcohol a:sulfite n:nutty,caramel
Barolo | acidic,bitter | condiment | it.piedmont | braised | alcohol a:sulfite n:fruity,earthy
Limoncello | sweet,aromatic | condiment | it.campania | as-is | dessert alcohol n:citrus
# --- Pasta, grains & bread ---
Spaghetti di Gragnano | chewy | noodle | it.campania,it.lazio | poached | a:gluten f:noodle
Pici | chewy | noodle | it.tuscany | poached | a:gluten f:noodle
Tajarin | chewy,fatty | noodle | it.piedmont | poached | a:gluten,egg f:noodle n:dairy
Tagliatelle | chewy,soft | noodle | it.emilia | poached | a:gluten,egg f:noodle
Carnaroli rice | soft,chewy | grain | it.piedmont | braised | f:grain
Farro | chewy,crunchy | grain | it.tuscany | poached,braised | a:gluten f:grain n:nutty
Polenta | soft | grain | it | stewed,grilled,fried | f:grain n:earthy
Pane toscano | chewy,crunchy | bread | it.tuscany | toasted,grilled | a:gluten f:bread n:toasty
Neapolitan pizza dough | chewy | bread | it.campania | baked,fried | a:gluten f:flatbread n:toasty
Grissini | crunchy | bread | it.piedmont | baked | a:gluten n:toasty
`;
