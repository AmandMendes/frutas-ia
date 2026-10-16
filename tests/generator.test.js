import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, MARKERS } from '../generator.js';
const values = Object.fromEntries(MARKERS.map(key => [key, key.toLowerCase()]));
const template = '\r\n  FIXED $& ` ${example} <tag>\n' + MARKERS.map(key => `[${key}]`).join(' | ') + '\n[FRUIT]  \r\n';
test('preserves every fixed character and replaces all fruit occurrences', () => {
 const expected = '\r\n  FIXED $& ` ${example} <tag>\nfruit | gender | age | body type | hairstyle | clothing style | personality | expression\nfruit  \r\n';
 assert.equal(generate(template, values), expected);
});
test('replacement values stay literal and are not recursively substituted', () => {
 const result = generate(template, {...values, FRUIT: '$& $` $\' <script>'});
 assert.equal(result.split('$& $` $\' <script>').length, 3);
 assert.throws(() => generate(template, {...values, FRUIT: '[AGE]'}));
});
test('rejects absent template, incomplete fields and unresolved markers', () => {
 assert.throws(() => generate('', values));
 for (const key of MARKERS) assert.throws(() => generate(template, {...values, [key]: '  '}));
 assert.throws(() => generate(template + '[UNKNOWN]', values));
 assert.throws(() => generate('[FRUIT]', values));
});
import { PROMPT_MESTRE_V3 } from '../prompt-mestre.js';
import { readFileSync } from 'node:fs';
test('real master source is intact and fixed spans survive generation', () => {
 assert.equal(PROMPT_MESTRE_V3, readFileSync(new URL('../prompt-mestre-original.txt', import.meta.url), 'utf8'));
 const filled = {...values, FRUIT:'strawberry', GENDER:'female', AGE:'adult', 'BODY TYPE':'athletic', HAIRSTYLE:'curly', 'CLOTHING STYLE':'casual', PERSONALITY:'cheerful', EXPRESSION:'a warm smile'};
 const result = generate(PROMPT_MESTRE_V3, filled);
 let expected = PROMPT_MESTRE_V3;
 for (const key of MARKERS) expected = expected.split(`[${key}]`).join(filled[key]);
 assert.equal(result, expected);
 assert.equal(result.split('strawberry').length-1, 2);
 assert.ok(result.startsWith('[PROMPT MESTRE 3.0: Create'));
 assert.ok(result.endsWith('cropped feet.  ]'));
 assert.ok(!/\[(FRUIT|GENDER|AGE|BODY TYPE|HAIRSTYLE|CLOTHING STYLE|PERSONALITY|EXPRESSION)\]/.test(result));
});
import { BASE_MARKERS } from '../generator.js';
import { PROMPT_MESTRE_V31 } from '../prompt-mestre-v31.js';
test('Mestre 3.1 uses only four fields and preserves its complete fixed text', () => {
 assert.equal(PROMPT_MESTRE_V31, readFileSync(new URL('../prompt-mestre-v31-original.txt', import.meta.url), 'utf8'));
 assert.deepEqual([...new Set(PROMPT_MESTRE_V31.match(/\[[A-Z ]+\]/g))], BASE_MARKERS.map(key => `[${key}]`));
 const base = {FRUIT:'lemon', GENDER:'male', AGE:'adult', 'BODY TYPE':'athletic'};
 const result = generate(PROMPT_MESTRE_V31, base, BASE_MARKERS);
 let expected = PROMPT_MESTRE_V31;
 for (const key of BASE_MARKERS) expected = expected.split(`[${key}]`).join(base[key]);
 assert.equal(result, expected);
 assert.equal(result.split('lemon').length - 1, 2);
 for (const fixed of ['plain fitted white top', 'plain fitted gray pants', 'simple white neutral shoes', 'front-facing view', 'pure white background', 'calm neutral facial expression']) assert.ok(result.includes(fixed));
 for (const key of BASE_MARKERS) assert.throws(() => generate(PROMPT_MESTRE_V31, {...base, [key]:''}, BASE_MARKERS));
 assert.equal(generate(PROMPT_MESTRE_V31, {...base, HAIRSTYLE:'DO NOT INSERT', EXPRESSION:'DO NOT INSERT'}, BASE_MARKERS), result);
});
