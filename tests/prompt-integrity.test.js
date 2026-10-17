import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { PROMPT_MESTRE_V3 } from '../prompt-mestre.js';
import { PROMPT_MESTRE_V31 } from '../prompt-mestre-v31.js';
import { PROMPT_LAPIDACAO_V31 } from '../prompt-lapidacao.js';

// Digests fixos detectam alterações mesmo quando a referência também é editada.
test('three official prompts match their pinned SHA-256 and full reference text', () => {
 for (const [prompt, file, sha] of [
  [PROMPT_MESTRE_V3, 'prompt-mestre-original.txt', 'd648412a6a90fa3bae6643ac20670953701d24ae4466f50641e76c0dbe449bdb'],
  [PROMPT_MESTRE_V31, 'prompt-mestre-v31-original.txt', '0adefa059ede0c801ba6f0253842b5d7c632cc48f9372ab1c3efc7a895041764'],
  [PROMPT_LAPIDACAO_V31, 'prompt-lapidacao-original.txt', 'd799b054e75f7a790b6b4af9d2ab0afb2749d386d3e877667b405fe716fff1d9']
 ]) {
  assert.equal(prompt, readFileSync(new URL('../' + file, import.meta.url), 'utf8'));
  assert.equal(createHash('sha256').update(prompt).digest('hex'), sha);
 }
});
