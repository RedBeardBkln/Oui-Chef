// Thai — Format: Name | roles | category | regions | methods | extras
export default `
# --- Proteins ---
Pork belly | fatty,umami,soft | pork | th,cn,jp,kr,vn | fried,braised,grilled,stewed | n:caramel
Pork neck | fatty,umami | pork | th,th.isan,th.northern | grilled | n:smoky
Chicken thighs | fatty,umami | poultry | th,th.isan | grilled,fried,stewed | n:smoky
Duck | fatty,umami | poultry | th,th.central | roasted,stewed | n:warm-spice
Beef flank | umami,chewy | beef | th,th.isan | grilled,stir-fried | n:smoky
Barramundi (pla kapong) | soft,umami | fish | th,th.central | steamed,fried | n:briny
Walking catfish (pla duk) | fatty,soft | fish | th,th.central,th.isan | grilled,fried | nonkosher n:smoky
Short mackerel (pla tu) | fatty,salty,umami | fish | th.central | steamed,fried | n:briny
River prawns (goong mae nam) | sweet,fatty,umami | shellfish | th.central | grilled | n:briny
Blue swimmer crab (pu ma) | sweet,umami | shellfish | th.southern,th | steamed,stir-fried | n:briny
Squid | chewy,sweet | mollusk | th,jp,kr,vn | grilled,stir-fried | n:briny
Dried shrimp | umami,salty,chewy | shellfish | th,cn,vn | raw,toasted | acc n:briny
Pla salid (dried gourami) | salty,umami,crunchy | fish | th.central | fried | acc n:briny
Sai ua (northern herb sausage) | fatty,aromatic,spicy | pork | th.northern | grilled | acc h:2 n:herbal,citrus
Sai krok Isan (fermented pork-rice sausage) | acidic,fatty,salty | pork | th.isan | grilled,fried | acc n:funky
Cap moo (pork crackling) | crunchy,fatty | pork | th.northern | as-is | acc
Firm tofu | soft,chewy | plantprotein | th,kr,vn | fried,stir-fried | a:soy
Mung beans | soft,sweet | legume | th,kr,vn | steamed,pureed | dessert n:earthy
Sataw (stink bean) | bitter,crunchy | legume | th.southern | stir-fried,raw | n:green,funky
# --- Condiments & ferments ---
Fish sauce | salty,umami | condiment | th,vn | as-is | a:fish n:funky
Kapi (shrimp paste) | salty,umami | condiment | th,th.southern,th.central | as-is,toasted | a:shellfish n:funky
Pla ra (fermented fish) | salty,umami | condiment | th.isan | as-is | a:fish n:funky
Tai pla (fermented fish innards) | salty,umami,bitter | condiment | th.southern | as-is | a:fish n:funky
Tua nao (fermented soybean discs) | umami,salty | condiment | th.northern | toasted | a:soy n:funky,smoky
Thai thin soy sauce | salty,umami | condiment | th | as-is | a:soy,gluten
Oyster sauce | umami,salty,sweet | condiment | th,cn,vn | as-is | a:mollusk,soy,gluten n:briny
Tamarind | acidic,sweet | fruit | th,vn | as-is,pureed | dessert n:fruity,caramel
Palm sugar | sweet | sweetener | th,th.central | as-is,glazed | dessert n:caramel
Coconut cream | fatty,soft,sweet | fat | th,th.central,th.southern | as-is,whipped | dessert n:nutty
Pork bone broth | umami,fatty | condiment | th,vn | as-is | pork f:broth
Red curry paste | spicy,aromatic,salty | condiment | th,th.central | as-is | h:3 a:shellfish n:citrus
Green curry paste | spicy,aromatic | condiment | th,th.central | as-is | h:3 a:shellfish n:citrus,green
Kaeng som / kaeng lueang paste | spicy,acidic,salty | condiment | th.southern | as-is | h:4 a:shellfish
Nam prik pao (roasted chile jam) | sweet,spicy,umami | condiment | th,th.central | as-is | h:2 a:shellfish,fish n:smoky,caramel
Nam prik num (roasted green chile relish) | spicy,aromatic,salty | condiment | th.northern | as-is | h:2 a:fish n:smoky,allium
Nam jim jaew | acidic,spicy,salty | condiment | th.isan | as-is | h:3 a:fish n:toasty,smoky
Sriracha sauce | spicy,sweet,acidic | condiment | th | as-is | h:2 a:sulfite n:allium
# --- Chiles & spices ---
Bird's eye chile | spicy | chile | th,vn | raw,pickled,charred | h:4 n:green
Prik chee fa (spur chile) | spicy,sweet | chile | th | raw,charred | h:2 n:fruity
Prik pon (toasted chile flakes) | spicy,aromatic | chile | th,th.isan | toasted | h:4 n:smoky,toasty
Makhwaen (prickly ash) | spicy,aromatic | spice | th.northern | toasted | h:1 n:citrus,floral
Dee plee (long pepper) | aromatic,bitter | spice | th.northern | toasted | n:warm-spice,earthy
Fresh turmeric | aromatic,bitter | spice | th.southern | raw,pureed | n:earthy
Galangal | aromatic | spice | th,vn | raw,pureed,poached | n:citrus,warm-spice
Krachai (fingerroot) | aromatic | spice | th,th.central | pureed,stir-fried | n:herbal,earthy
# --- Herbs & produce ---
Lemongrass | aromatic,acidic | herb | th,vn | raw,pureed,poached | n:citrus
Makrut lime leaf | aromatic | herb | th | raw,poached,fried | n:citrus,floral
Thai basil | aromatic,sweet | herb | th,vn | raw | n:anise,herbal
Holy basil (krapao) | aromatic | herb | th | stir-fried | n:warm-spice,herbal
Coriander root | aromatic | herb | th | pureed | n:earthy,herbal
Culantro | aromatic | herb | th,th.isan,vn | raw | n:herbal,green
Dill (phak chi lao) | aromatic | herb | th.isan | raw,stewed | n:herbal,anise
Pandan leaf | aromatic,sweet | herb | th,vn | steamed,poached | dessert n:floral,nutty
Lime | acidic | fruit | th,vn | raw | dessert n:citrus
Green papaya | crunchy,acidic | veg | th,th.isan,vn | raw,shaved | n:green
Pea eggplant (makhuea phuang) | bitter,crunchy | veg | th | stewed,raw | n:green
Thai eggplant (makhuea pro) | bitter,crunchy | veg | th | raw,stewed | n:green
Yardlong beans | crunchy,sweet | veg | th,th.isan | raw,stir-fried | n:green
Morning glory (phak bung) | crunchy,soft | veg | th,vn | stir-fried | n:green
Straw mushrooms | umami,soft | fungi | th | poached,stir-fried | n:earthy
Pomelo | sweet,acidic,bitter | fruit | th.central | raw | dessert n:citrus
Nam dok mai mango | sweet,soft | fruit | th | raw | dessert n:floral,fruity
Young coconut | sweet,soft | fruit | th | raw | dessert n:nutty
Durian | sweet,soft,fatty | fruit | th,th.southern | raw | dessert n:funky
Cashews | fatty,crunchy | nut | th.southern | fried,toasted | a:treenut n:nutty
Roasted peanuts | crunchy,fatty | nut | th,cn,vn | toasted | a:peanut n:nutty
Khao khua (toasted rice powder) | crunchy,aromatic | grain | th.isan,th.northern | toasted | n:toasty,nutty
# --- Bases ---
Jasmine rice | soft,aromatic | grain | th,vn | steamed | f:grain n:floral
Glutinous rice | chewy,sweet | grain | th,th.isan,th.northern,cn,jp,kr,vn | steamed | dessert f:grain
Sen lek (thin rice noodles) | chewy,soft | noodle | th | poached,stir-fried | f:noodle
Sen yai (wide rice noodles) | chewy,soft | noodle | th,th.central | stir-fried | f:noodle
Khanom jeen (fermented rice noodles) | soft,acidic | noodle | th,th.southern,th.northern | as-is | f:noodle
Glass noodles | chewy | noodle | th,vn | poached,stir-fried | f:noodle
Lettuce leaves | crunchy,soft | veg | th | raw | f:greens,wrap n:green
`;
