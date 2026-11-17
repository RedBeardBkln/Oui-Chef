// Japanese — Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Wagyu beef | fatty,umami,soft | beef | jp,jp.kansai | seared,grilled,raw,poached | n:dairy
Pork belly | fatty,umami,soft | pork | jp,jp.okinawa | braised,grilled,stewed | n:caramel
Chicken thighs | fatty,umami | poultry | jp | grilled,fried,braised | n:smoky
Hokkaido lamb (jingisukan) | fatty,umami | lamb | jp.hokkaido | grilled | n:smoky
Bluefin tuna (maguro) | umami,fatty,soft | fish | jp,jp.kanto | raw,seared,cured | n:briny
Salmon | fatty,umami | fish | jp,jp.hokkaido | grilled,cured,raw | n:briny
Mackerel (saba) | fatty,umami,salty | fish | jp | cured,grilled,pickled | n:briny
Sea bream (madai) | soft,umami | fish | jp,jp.kansai | raw,grilled,steamed | n:briny
Gizzard shad (kohada) | acidic,umami,salty | fish | jp.kanto | cured,pickled | n:briny
Conger eel (anago) | soft,sweet,umami | fish | jp.kanto | braised,grilled | nonkosher n:caramel
Freshwater eel (unagi) | fatty,sweet,umami | fish | jp | grilled,glazed | nonkosher n:smoky,caramel
Hokkaido scallops (hotate) | sweet,soft,umami | mollusk | jp.hokkaido | raw,seared,grilled | n:briny
Hokkaido hairy crab (kegani) | sweet,umami | shellfish | jp.hokkaido | steamed,poached | n:briny
Sweet shrimp (amaebi) | sweet,soft | shellfish | jp,jp.hokkaido | raw | n:briny
Akashi octopus (tako) | chewy,umami | mollusk | jp.kansai | poached,raw,braised | n:briny
Squid | chewy,sweet | mollusk | jp,kr,th,vn | raw,grilled,fried | n:briny
Salmon roe (ikura) | salty,umami,fatty | fish | jp.hokkaido | cured | acc n:briny
Katsuobushi (bonito flakes) | umami,salty | fish | jp | as-is | acc n:smoky
Silken tofu | soft | plantprotein | jp,cn | raw,steamed,braised | a:soy n:dairy
Shima-dōfu (Okinawan island tofu) | soft,salty | plantprotein | jp.okinawa | stir-fried,raw | a:soy
Natto | umami,chewy | legume | jp.kanto | as-is | a:soy n:funky
Yuba | soft,chewy | plantprotein | jp.kansai | as-is,poached | a:soy n:dairy
# --- Broths & seasonings ---
Dashi (kombu & katsuobushi) | umami,salty | condiment | jp | as-is | a:fish f:broth n:smoky,briny
Kombu dashi | umami | condiment | jp,jp.kansai | as-is | f:broth n:briny
Tonkotsu broth | fatty,umami | condiment | jp | as-is | pork f:broth n:dairy
Koikuchi shoyu | salty,umami | condiment | jp,jp.kanto | as-is,glazed | a:soy,gluten n:caramel
Usukuchi shoyu | salty,umami | condiment | jp.kansai | as-is | a:soy,gluten
Saikyo miso (Kyoto white miso) | sweet,salty,umami | condiment | jp.kansai | cured,glazed,as-is | a:soy n:dairy
Aka miso | salty,umami | condiment | jp | as-is,glazed | a:soy n:funky,earthy
Mugi miso (barley miso) | salty,umami,sweet | condiment | jp | as-is,glazed | a:soy,gluten n:earthy
Hon mirin | sweet,umami | condiment | jp | glazed | alcohol n:caramel
Sake | aromatic,umami | condiment | jp | cured | alcohol n:fruity
Awamori | aromatic | condiment | jp.okinawa | as-is | alcohol n:floral
Rice vinegar | acidic,sweet | condiment | jp,cn,kr,vn | as-is,pickled | n:fruity
Ponzu | acidic,salty,umami | condiment | jp | as-is | a:soy,gluten,fish n:citrus
Toasted sesame oil | fatty,aromatic | fat | jp,cn,kr | as-is | a:sesame n:nutty,toasty
# --- Pickles ---
Umeboshi | acidic,salty | pickle | jp | as-is,pureed | n:fruity
Takuan (pickled daikon) | crunchy,salty,sweet | pickle | jp | as-is | n:funky
# --- Chiles & spices ---
Wasabi | spicy,aromatic | spice | jp | raw | h:2 n:green
Yuzu kosho | spicy,salty,aromatic | condiment | jp | as-is | h:3 n:citrus
Shichimi tōgarashi | spicy,aromatic | spice | jp,jp.kanto | as-is | h:2 a:sesame n:citrus,toasty
Sansho pepper | spicy,aromatic | spice | jp,jp.kansai | as-is | h:1 n:citrus,floral
Kōrēgusu (shima tōgarashi in awamori) | spicy,aromatic | condiment | jp.okinawa | as-is | h:4 alcohol
# --- Produce & herbs ---
Shiso | aromatic,bitter | herb | jp | raw,fried | n:herbal,green
Myōga | aromatic,crunchy | herb | jp | raw,pickled | n:floral,green
Yuzu | acidic,aromatic,bitter | fruit | jp | raw | dessert n:citrus,floral
Kujō negi | aromatic,sweet | veg | jp.kansai | grilled,raw,poached | n:allium
Mizuna | bitter,crunchy | veg | jp.kansai | raw,poached | f:greens n:green
Manganji pepper | sweet,bitter | veg | jp.kansai | grilled,blistered | n:green
Daikon | crunchy,bitter | veg | jp,kr | raw,braised,pickled | n:green
Burdock (gobō) | crunchy,bitter | veg | jp | braised,fried | n:earthy
Gōyā (Okinawan bitter melon) | bitter,crunchy | veg | jp.okinawa | stir-fried,raw | n:green
Kabocha | sweet,soft | veg | jp | braised,steamed,fried | dessert n:caramel
Hokkaido sweet corn | sweet,crunchy | veg | jp.hokkaido | grilled,raw | n:caramel
Beni imo (Okinawan purple sweet potato) | sweet,soft | starch | jp.okinawa | steamed,baked,pureed | dessert n:earthy
Kanpyō (dried gourd strips) | chewy,sweet | veg | jp.kanto | braised | n:caramel
Shiitake | umami,chewy | fungi | jp,kr | grilled,braised | n:earthy
# --- Seaweed ---
Kombu | umami,salty | seaweed | jp,jp.hokkaido | poached,cured | n:briny
Nori | umami,crunchy,salty | seaweed | jp,jp.kanto | toasted | n:briny,toasty
Mozuku | acidic,chewy | seaweed | jp.okinawa | pickled | n:briny
Umibudō (sea grapes) | salty,crunchy | seaweed | jp.okinawa | raw | n:briny
# --- Sweets ---
Matcha | bitter,aromatic | herb | jp,jp.kansai | whipped,as-is | dessert n:green
Kokutō (Okinawan black sugar) | sweet,bitter | sweetener | jp.okinawa | as-is,glazed | dessert n:caramel
Anko (sweet red bean paste) | sweet,soft | legume | jp | as-is | dessert n:earthy
Kinako (roasted soybean flour) | aromatic,sweet | legume | jp | as-is,toasted | dessert a:soy n:nutty,toasty
Black sesame seeds | fatty,bitter,aromatic | seed | jp,cn,kr | toasted,pureed | dessert a:sesame n:nutty,toasty
Hokkaido milk | fatty,sweet | dairy | jp.hokkaido | as-is,whipped | dessert n:dairy
# --- Bases ---
Japanese short-grain rice | soft,sweet | grain | jp | steamed | f:grain
Glutinous rice | chewy,sweet | grain | jp,cn,kr,th,vn | steamed | dessert f:grain
Soba noodles | chewy | noodle | jp,jp.kanto | poached | a:gluten f:noodle
Udon noodles | chewy,soft | noodle | jp,jp.kansai | poached | a:gluten f:noodle
Ramen noodles | chewy | noodle | jp,jp.hokkaido | poached | a:gluten f:noodle
Okinawa soba noodles | chewy | noodle | jp.okinawa | poached | a:gluten f:noodle
Gyoza wrappers | chewy,soft | bread | jp | fried,steamed | a:gluten f:wrapper
Panko | crunchy | bread | jp | fried | a:gluten n:toasty
`;
