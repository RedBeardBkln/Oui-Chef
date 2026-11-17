import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RAW_SOURCES, INGREDIENTS } from '../src/data/index.js';
import { REGIONS } from '../src/data/regions.js';
import { parseBlock, validateIngredient } from '../src/data/parse.js';

const regionIds = Object.fromEntries(REGIONS.map(r => [r.id, r.subs.map(s => s.id)]));

test('every ingredient line passes schema validation', () => {
  const errs = RAW_SOURCES.flatMap(([src, text]) => parseBlock(text, src).flatMap(i => validateIngredient(i, regionIds)));
  assert.deepEqual(errs, []);
});

test('every region has a populated data file', () => {
  for (const r of REGIONS) {
    const n = INGREDIENTS.filter(i => i.regions.some(x => x.split('.')[0] === r.id)).length;
    assert.ok(n >= 40, `${r.id} has only ${n} ingredients`);
  }
});

test('duplicate ingredients across files agree on category', () => {
  const seen = new Map(); const bad = [];
  for (const [src, text] of RAW_SOURCES) for (const i of parseBlock(text, src)) {
    const p = seen.get(i.id);
    if (p && p !== i.category) bad.push(`${i.name}: ${p} vs ${i.category}`);
    else seen.set(i.id, i.category);
  }
  assert.deepEqual(bad, []);
});
