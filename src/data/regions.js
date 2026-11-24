// World regions and their sub-regions. Ingredient lines reference these ids
// as `regionId` or `regionId.subId` (e.g. `mx.oaxaca`).
export const REGIONS = [
  { id: 'mx', name: 'Mexican', subs: [
    ['central', 'Central (CDMX / Puebla)'], ['oaxaca', 'Oaxaca'], ['yucatan', 'Yucatán'],
    ['norteno', 'Northern (Norteño)'], ['baja', 'Baja / Pacific'], ['veracruz', 'Veracruz / Gulf'] ] },
  { id: 'us-south', name: 'American Southern', subs: [
    ['lowcountry', 'Lowcountry'], ['louisiana', 'Louisiana (Cajun & Creole)'],
    ['appalachia', 'Appalachian'], ['deep-south', 'Deep South / Soul Food'] ] },
  { id: 'us-bbq', name: 'American Barbecue', subs: [
    ['texas', 'Texas (Central)'], ['memphis', 'Memphis'], ['kansas-city', 'Kansas City'],
    ['carolina', 'Carolinas'], ['alabama', 'Alabama'] ] },
  { id: 'us', name: 'American Regional', subs: [
    ['new-england', 'New England'], ['midwest', 'Midwest'], ['california', 'California'],
    ['pnw', 'Pacific Northwest'], ['southwest', 'Southwest / Tex-Mex'] ] },
  { id: 'fr', name: 'French', subs: [
    ['provence', 'Provence'], ['normandy', 'Normandy & Brittany'], ['lyon', 'Lyon'],
    ['alsace', 'Alsace'], ['burgundy', 'Burgundy'], ['southwest', 'Southwest & Basque'] ] },
  { id: 'it', name: 'Italian', subs: [
    ['sicily', 'Sicily'], ['campania', 'Campania'], ['lazio', 'Lazio (Rome)'],
    ['tuscany', 'Tuscany'], ['emilia', 'Emilia-Romagna'], ['piedmont', 'Piedmont'] ] },
  { id: 'es', name: 'Spanish', subs: [
    ['andalusia', 'Andalusia'], ['catalonia', 'Catalonia'], ['basque', 'Basque Country'], ['galicia', 'Galicia'] ] },
  { id: 'gr', name: 'Greek', subs: [] },
  { id: 'me', name: 'Middle Eastern', subs: [
    ['levant', 'Levantine'], ['turkey', 'Turkish'], ['persia', 'Persian'] ] },
  { id: 'naf', name: 'North African', subs: [
    ['morocco', 'Moroccan'], ['tunisia', 'Tunisian'], ['egypt', 'Egyptian'] ] },
  { id: 'waf', name: 'West African', subs: [
    ['nigeria', 'Nigerian'], ['ghana', 'Ghanaian'], ['senegal', 'Senegalese'] ] },
  { id: 'eaf', name: 'East African', subs: [
    ['ethiopia', 'Ethiopian & Eritrean'], ['swahili', 'Swahili Coast'] ] },
  { id: 'in', name: 'Indian', subs: [
    ['north', 'North (Punjab / Mughlai)'], ['south', 'South (Kerala / Tamil)'],
    ['bengal', 'Bengali'], ['goa', 'Goan'], ['gujarat', 'Gujarati'] ] },
  { id: 'cn', name: 'Chinese', subs: [
    ['sichuan', 'Sichuan'], ['cantonese', 'Cantonese'], ['hunan', 'Hunan'],
    ['jiangnan', 'Shanghai / Jiangnan'], ['northern', 'Northern (Beijing / Xi’an)'] ] },
  { id: 'jp', name: 'Japanese', subs: [
    ['kanto', 'Kanto (Tokyo)'], ['kansai', 'Kansai (Osaka / Kyoto)'], ['okinawa', 'Okinawa'], ['hokkaido', 'Hokkaido'] ] },
  { id: 'kr', name: 'Korean', subs: [] },
  { id: 'th', name: 'Thai', subs: [
    ['central', 'Central'], ['northern', 'Northern (Lanna)'], ['isan', 'Isan'], ['southern', 'Southern'] ] },
  { id: 'vn', name: 'Vietnamese', subs: [
    ['north', 'Northern'], ['central', 'Central'], ['south', 'Southern'] ] },
  { id: 'msea', name: 'Maritime Southeast Asian', subs: [
    ['malaysia', 'Malaysian & Singaporean'], ['indonesia', 'Indonesian'], ['philippines', 'Filipino'] ] },
  { id: 'pe', name: 'Peruvian', subs: [
    ['coast', 'Coastal (Lima)'], ['andes', 'Andean'], ['amazon', 'Amazonian'], ['nikkei', 'Nikkei'] ] },
  { id: 'br', name: 'Brazilian', subs: [
    ['bahia', 'Bahian'], ['minas', 'Minas Gerais'], ['south', 'Southern (Gaúcho)'], ['amazon', 'Amazonian'] ] },
  { id: 'sam', name: 'South American', subs: [
    ['argentina', 'Argentine'], ['chile', 'Chilean'], ['colombia', 'Colombian'] ] },
  { id: 'car', name: 'Caribbean', subs: [
    ['jamaica', 'Jamaican'], ['puerto-rico', 'Puerto Rican'], ['cuba', 'Cuban'], ['trinidad', 'Trinidadian'] ] },
  { id: 'nordic', name: 'Nordic', subs: [] },
  { id: 'uk', name: 'British & Irish', subs: [
    ['england', 'English'], ['scotland', 'Scottish'], ['ireland', 'Irish'] ] },
  { id: 'ce', name: 'Central & Eastern European', subs: [
    ['germany', 'German & Austrian'], ['poland', 'Polish'], ['hungary', 'Hungarian'], ['ukraine', 'Ukrainian'] ] },
].map(r => ({ ...r, subs: r.subs.map(([id, name]) => ({ id, name })) }));

export const REGION_BY_ID = Object.fromEntries(REGIONS.map(r => [r.id, r]));

export function regionLabel(regionId, subId) {
  const r = REGION_BY_ID[regionId];
  if (!r) return '';
  const s = subId && r.subs.find(x => x.id === subId);
  return s ? `${s.name} ${r.name}` : r.name;
}
