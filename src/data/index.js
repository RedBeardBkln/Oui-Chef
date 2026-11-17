// Auto-assembled ingredient database. One file per region in ./regions.
import { parseBlock } from './parse.js';
import r0 from './regions/global.js';
import r1 from './regions/mx.js';
import r2 from './regions/us-south.js';
import r3 from './regions/us-bbq.js';
import r4 from './regions/us.js';
import r5 from './regions/fr.js';
import r6 from './regions/it.js';
import r7 from './regions/es.js';
import r8 from './regions/gr.js';
import r9 from './regions/me.js';
import r10 from './regions/naf.js';
import r11 from './regions/waf.js';
import r12 from './regions/eaf.js';
import r13 from './regions/in.js';
import r14 from './regions/cn.js';
import r15 from './regions/jp.js';
import r16 from './regions/kr.js';
import r17 from './regions/th.js';
import r18 from './regions/vn.js';
import r19 from './regions/msea.js';
import r20 from './regions/pe.js';
import r21 from './regions/br.js';
import r22 from './regions/sam.js';
import r23 from './regions/car.js';
import r24 from './regions/nordic.js';
import r25 from './regions/uk.js';
import r26 from './regions/ce.js';

const SOURCES = [
  ['global', r0],
  ['mx', r1],
  ['us-south', r2],
  ['us-bbq', r3],
  ['us', r4],
  ['fr', r5],
  ['it', r6],
  ['es', r7],
  ['gr', r8],
  ['me', r9],
  ['naf', r10],
  ['waf', r11],
  ['eaf', r12],
  ['in', r13],
  ['cn', r14],
  ['jp', r15],
  ['kr', r16],
  ['th', r17],
  ['vn', r18],
  ['msea', r19],
  ['pe', r20],
  ['br', r21],
  ['sam', r22],
  ['car', r23],
  ['nordic', r24],
  ['uk', r25],
  ['ce', r26],
];

// Merge duplicates (same id) conservatively: union of tags and allergens, max heat.
function build() {
  const byId = new Map();
  for (const [src, text] of SOURCES) {
    for (const ing of parseBlock(text, src)) {
      const prev = byId.get(ing.id);
      if (!prev) { byId.set(ing.id, ing); continue; }
      for (const k of ['roles', 'regions', 'methods', 'allergens', 'notes', 'formats', 'flags'])
        prev[k] = [...new Set([...prev[k], ...ing[k]])];
      prev.heat = Math.max(prev.heat, ing.heat);
      prev.source += ',' + src;
    }
  }
  return [...byId.values()];
}

export const SOURCE_IDS = SOURCES.map(s => s[0]);
export const RAW_SOURCES = SOURCES;
export const INGREDIENTS = build();
