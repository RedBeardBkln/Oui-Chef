// American Barbecue — Format: Name | roles | category | regions | methods | extras
export default `
# --- Beef (Texas / Kansas City) ---
Beef brisket (whole packer) | fatty,umami,soft | beef | us-bbq,us-bbq.texas,us-bbq.kansas-city | smoked,braised | n:smoky
Brisket point (burnt ends) | fatty,chewy,sweet | beef | us-bbq.kansas-city | smoked,glazed | n:smoky,caramel
Beef plate short ribs | fatty,umami,soft | beef | us-bbq.texas | smoked | n:smoky
Beef shoulder clod | umami,chewy | beef | us-bbq.texas | smoked | n:smoky
Texas hot links | fatty,spicy,umami | beef | us-bbq.texas | smoked,grilled | pork h:2 n:smoky,warm-spice
# --- Pork (Memphis / Carolinas / KC / Alabama) ---
Pork spare ribs | fatty,umami,chewy | pork | us-bbq,us-bbq.memphis,us-bbq.kansas-city,us-bbq.alabama | smoked,grilled,glazed | n:smoky
Baby back ribs | fatty,umami,chewy | pork | us-bbq.memphis | smoked,grilled | n:smoky
Pork butt (Boston butt) | fatty,umami,soft | pork | us-bbq,us-bbq.carolina,us-bbq.memphis,us-bbq.alabama | smoked,braised | n:smoky
Whole hog | fatty,umami,soft | pork | us-bbq.carolina | smoked | n:smoky
Smoked bologna | salty,fatty,umami | pork | us-bbq.memphis | smoked,grilled | meat n:smoky
Pork skin (cracklins) | crunchy,fatty,salty | pork | us-bbq.carolina | fried,smoked | acc n:toasty,smoky
# --- Poultry & other ---
Chicken halves | fatty,umami | poultry | us-bbq.alabama | smoked,grilled | n:smoky
Turkey breast | umami,soft | poultry | us-bbq.texas | smoked | n:smoky
Mutton | fatty,umami,chewy | lamb | us-bbq | smoked,braised | n:smoky,funky
# --- Legumes & sides ---
Pinto beans | soft,umami | legume | us-bbq.texas | stewed | n:earthy
Navy beans | soft,umami | legume | us-bbq,us-bbq.kansas-city | baked,stewed | n:earthy
Collard greens | bitter,soft | veg | us-bbq,us-bbq.carolina | braised,stewed | f:greens n:green
Green cabbage | crunchy,sweet | veg | us-bbq.memphis,us-bbq.carolina | raw,pickled | f:greens n:green
Sweet corn | sweet,crunchy | veg | us-bbq | grilled,roasted | n:caramel
Sweet potatoes | sweet,soft | starch | us-bbq | roasted,baked,pureed | dessert n:caramel,earthy
Sliced white bread | soft | bread | us-bbq,us-bbq.texas,us-bbq.alabama | as-is,toasted | a:gluten,soy,dairy f:bread
Beef stock | umami | condiment | us-bbq | as-is | meat f:broth n:smoky
# --- Rubs & seasonings ---
Dalmatian rub (salt & coarse pepper) | salty,aromatic | spice | us-bbq.texas | as-is | n:warm-spice
Memphis dry rub | aromatic,sweet,spicy | spice | us-bbq.memphis | as-is | a:mustard h:1 n:warm-spice,smoky
Paprika | aromatic,sweet,spicy | spice | us-bbq | as-is | h:1 n:smoky,fruity
Celery seed | bitter,aromatic | spice | us-bbq.carolina,us-bbq.memphis | as-is | n:herbal
Crushed red pepper | spicy | chile | us-bbq.carolina | as-is | h:3 n:fruity
Ground coffee | bitter,aromatic | spice | us-bbq.texas | as-is | n:toasty,smoky
# --- Sauces & condiments ---
Eastern Carolina vinegar-pepper sauce | acidic,spicy | condiment | us-bbq.carolina | as-is | h:2 n:fruity
Lexington dip | acidic,sweet,spicy | condiment | us-bbq.carolina | as-is | h:1 n:fruity
South Carolina mustard sauce | acidic,sweet,aromatic | condiment | us-bbq.carolina | as-is,glazed | a:mustard,fish n:warm-spice
Kansas City barbecue sauce | sweet,acidic,umami | condiment | us-bbq.kansas-city | as-is,glazed | a:fish,mustard n:smoky,caramel
Alabama white sauce | acidic,fatty,soft | condiment | us-bbq.alabama | as-is | a:egg,mustard n:warm-spice
Prepared horseradish | spicy,acidic | condiment | us-bbq.alabama | as-is | h:2 n:green
Apple cider vinegar | acidic | condiment | us-bbq,us-bbq.carolina,us-bbq.alabama | as-is | n:fruity
Yellow mustard | acidic,aromatic | condiment | us-bbq,us-bbq.carolina | as-is | a:mustard n:warm-spice
Ketchup | sweet,acidic,umami | condiment | us-bbq.kansas-city | as-is,glazed | n:fruity
Dill pickle chips | acidic,salty,crunchy | pickle | us-bbq,us-bbq.texas | as-is | n:herbal
Pickled jalapeños | acidic,spicy | pickle | us-bbq.texas | pickled | h:2 n:green
Beef tallow | fatty | fat | us-bbq.texas | as-is,confit | meat n:smoky
# --- Sweet & dessert ---
Molasses | sweet,bitter | sweetener | us-bbq,us-bbq.kansas-city | as-is,glazed | dessert a:sulfite n:caramel
Dark brown sugar | sweet | sweetener | us-bbq,us-bbq.kansas-city | as-is,glazed | dessert n:caramel
Pecans | fatty,crunchy | nut | us-bbq,us-bbq.texas | toasted,smoked | dessert a:treenut n:nutty,toasty
Peaches | sweet,acidic,soft | fruit | us-bbq | grilled,roasted,baked | dessert n:fruity,floral
Bananas | sweet,soft | fruit | us-bbq | as-is,raw | dessert n:fruity
Vanilla wafers | sweet,crunchy | bread | us-bbq | as-is | dessert a:gluten,egg,dairy,soy n:toasty
Bourbon | aromatic,sweet | condiment | us-bbq | as-is,glazed | alcohol dessert n:caramel,toasty
`;
