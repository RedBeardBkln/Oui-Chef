// American Southern — Format: Name | roles | category | regions | methods | extras
export default `
# --- Main proteins ---
Chicken thighs | fatty,umami | poultry | us-south,us-south.deep-south | fried,braised,roasted | n:toasty
Country ham | salty,umami,chewy | pork | us-south.appalachia | cured,fried,shaved | n:smoky,funky
Chitterlings | chewy,fatty | pork | us-south.deep-south | stewed,fried | n:funky
Andouille | fatty,umami,spicy | pork | us-south.louisiana | smoked,grilled,sauteed | h:1 n:smoky,allium
Boudin (Cajun) | soft,fatty,umami | pork | us-south.louisiana | steamed,grilled | n:allium,warm-spice
Catfish | soft,umami | fish | us-south.deep-south,us-south.louisiana | fried,seared | nonkosher n:earthy
Redfish (red drum) | soft,umami | fish | us-south.louisiana | seared,grilled | n:briny
Rainbow trout | soft,fatty | fish | us-south.appalachia | fried,smoked | n:earthy
Wild white shrimp | sweet,umami | shellfish | us-south,us-south.lowcountry,us-south.louisiana | sauteed,fried,poached,grilled | n:briny
Crawfish | sweet,umami | shellfish | us-south.louisiana | poached,stewed,fried | n:briny
Blue crab | sweet,umami | shellfish | us-south.lowcountry,us-south.louisiana | steamed,fried,sauteed | n:briny
Oysters | salty,soft,umami | mollusk | us-south.lowcountry,us-south.louisiana | raw,fried,grilled,roasted | n:briny
Bobwhite quail | umami,fatty | game | us-south,us-south.deep-south,us-south.lowcountry | fried,grilled,roasted | n:earthy
Rabbit | umami | game | us-south.appalachia | fried,braised,stewed | nonkosher n:earthy
Alligator | chewy,umami | game | us-south.louisiana | fried,grilled | nonkosher
# --- Accent proteins & fats ---
Tasso ham | salty,spicy,umami | pork | us-south.louisiana | sauteed,stewed | acc h:1 n:smoky,warm-spice
Smoked ham hocks | salty,fatty,umami | pork | us-south.deep-south,us-south.appalachia | braised,stewed | acc n:smoky
Bacon drippings | fatty,salty | fat | us-south | fried,as-is | pork n:smoky
# --- Legumes ---
Black-eyed peas | soft,umami | legume | us-south,us-south.deep-south,us-south.lowcountry | stewed | n:earthy
Sea Island red peas | soft,umami | legume | us-south.lowcountry | stewed | n:earthy,nutty
Red beans | soft,umami | legume | us-south.louisiana | stewed,pureed | n:earthy
Butter beans | soft,sweet | legume | us-south.deep-south | stewed | n:green
Boiled peanuts | soft,salty | legume | us-south.deep-south | poached | a:peanut n:earthy,nutty
# --- Grains, breads, broths ---
Stone-ground grits | soft,sweet | grain | us-south,us-south.lowcountry,us-south.appalachia | stewed,baked,fried | f:grain n:earthy
Carolina Gold rice | soft,aromatic | grain | us-south.lowcountry | steamed | f:grain n:nutty,floral
Hominy | chewy,soft | grain | us-south.appalachia,us-south.deep-south | stewed,fried | f:grain n:earthy
Stone-ground cornmeal | crunchy,sweet | grain | us-south | fried,baked | n:toasty
Buttermilk biscuits | soft,fatty | bread | us-south | baked | a:gluten,dairy pork f:bread n:dairy,toasty
Skillet cornbread | crunchy,soft | bread | us-south.deep-south,us-south.appalachia | baked | a:gluten,dairy,egg pork f:bread n:toasty
Pot likker | umami,salty | condiment | us-south.deep-south | as-is | pork f:broth n:smoky,green
Shrimp & crab shell stock | umami,sweet | condiment | us-south.louisiana | as-is | a:shellfish f:broth n:briny
Dark roux | bitter,aromatic,fatty | condiment | us-south.louisiana | toasted | a:gluten,dairy n:toasty,nutty
# --- Vegetables & fungi ---
Collard greens | bitter,soft | veg | us-south,us-south.deep-south | braised,stewed | f:greens n:green
Turnip greens | bitter | veg | us-south.deep-south,us-south.appalachia | braised,stewed | f:greens n:green
Mustard greens | bitter,aromatic | veg | us-south.deep-south | braised,sauteed | f:greens n:green
Okra | soft,crunchy | veg | us-south,us-south.lowcountry,us-south.louisiana | fried,stewed,pickled,charred | n:green
Green bell pepper | bitter,crunchy | veg | us-south.louisiana | sauteed,raw | n:green
Vidalia onion | sweet,aromatic | veg | us-south.deep-south | grilled,roasted,raw | n:allium
Green tomatoes | acidic,crunchy | fruit | us-south.deep-south | fried,pickled | n:green
Creole tomatoes | sweet,acidic,umami | fruit | us-south.louisiana | raw,stewed | n:fruity
Ramps | aromatic,bitter | veg | us-south.appalachia | grilled,pickled,sauteed,raw | n:allium,green
Leather britches (dried green beans) | chewy | veg | us-south.appalachia | stewed | n:earthy,smoky
Morels | umami,aromatic | fungi | us-south.appalachia | sauteed,fried | n:earthy
Sweet potatoes | sweet,soft | starch | us-south | roasted,baked,pureed | dessert n:caramel,earthy
# --- Spices, heat & condiments ---
Filé powder | aromatic | spice | us-south.louisiana | as-is | n:earthy,herbal
Cayenne pepper | spicy | chile | us-south,us-south.louisiana | as-is | h:3 n:fruity
Louisiana-style hot sauce | acidic,spicy,salty | condiment | us-south.louisiana | as-is | h:2 n:fruity
Pepper vinegar | acidic,spicy | condiment | us-south.deep-south | as-is | h:2 n:green
Creole mustard | acidic,aromatic | condiment | us-south.louisiana | as-is | a:mustard n:warm-spice
Chow-chow | acidic,sweet,crunchy | pickle | us-south.appalachia,us-south.deep-south | pickled | a:mustard n:green
Pickled okra | acidic,salty,crunchy | pickle | us-south | pickled | n:green
Bourbon | aromatic,sweet | condiment | us-south | as-is,glazed | alcohol dessert n:caramel,toasty
# --- Dairy & cheese ---
Buttermilk | acidic,soft | dairy | us-south | as-is | dessert n:dairy
Pimento cheese | fatty,soft,salty | cheese | us-south.deep-south | as-is | a:egg rennet n:dairy
# --- Fruit, nuts, sweet ---
Peaches | sweet,acidic,soft | fruit | us-south,us-south.deep-south | raw,grilled,roasted | dessert n:fruity,floral
Muscadine grapes | sweet,acidic | fruit | us-south,us-south.lowcountry | raw,pureed | dessert n:fruity
Satsumas | sweet,acidic | fruit | us-south.louisiana | raw | dessert n:citrus
Pawpaw | sweet,soft | fruit | us-south.appalachia | raw,pureed | dessert n:fruity
Pecans | fatty,crunchy | nut | us-south | toasted,glazed | dessert a:treenut n:nutty,toasty
Black walnuts | bitter,fatty | nut | us-south.appalachia | toasted | dessert a:treenut n:earthy,nutty
Benne seeds | crunchy,fatty | seed | us-south.lowcountry | toasted | dessert a:sesame n:nutty,toasty
Sorghum syrup | sweet,bitter | sweetener | us-south.appalachia | as-is,glazed | dessert n:caramel,earthy
Cane syrup | sweet | sweetener | us-south.louisiana | as-is,glazed | dessert n:caramel
`;
