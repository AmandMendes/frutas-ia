import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PROMPT_HIPER_REALISTA_ORIGINAL } from '../prompt-hiper-realista.js';
import { generateHyperRealistic, BIOTIPOS, SEXOS, INSTRUCAO_BIOTIPO } from '../hiper-realista-generator.js';

test('approved hyper-realistic original matches the complete source and pinned digest', () => {
  assert.equal(PROMPT_HIPER_REALISTA_ORIGINAL, readFileSync(new URL('../prompt-hiper-realista-original.txt', import.meta.url),'utf8'));
  assert.equal(createHash('sha256').update(PROMPT_HIPER_REALISTA_ORIGINAL).digest('hex'), 'ff77a63c036f727c6d214e59080452f30f0e09c2063ece41bb4e805bbb865ea3');
});
test('unspecified body adds only sex and replaces both fruit markers, preserving all fixed text', () => {
  for (const sexo of SEXOS) {
    const result = generateHyperRealistic({fruta:'morango', sexo});
    const expected = PROMPT_HIPER_REALISTA_ORIGINAL.replace('FRUTA ESCOLHIDA: [FRUTA]',`FRUTA ESCOLHIDA: [FRUTA]\nSEXO DO PERSONAGEM: ${sexo}`).split('[FRUTA]').join('morango');
    assert.equal(result,expected);
    assert.equal(result.split('morango').length-1,2);
    assert.ok(!result.includes('TIPO DE CORPO:'));
    assert.ok(!result.includes(INSTRUCAO_BIOTIPO));
    for (const disallowed of ['corpo inteiro','fundo branco','glossy','lapidação']) assert.ok(!result.toLowerCase().includes(disallowed));
  }
});
test('each selected body adds exactly the approved instructions in section 3', () => {
  for (const biotipo of BIOTIPOS) {
    const result = generateHyperRealistic({fruta:'pera',sexo:'Feminino',biotipo});
    const addition = `TIPO DE CORPO: ${biotipo}\n\n${INSTRUCAO_BIOTIPO}\n\n`;
    assert.ok(result.includes(`3. CORPO ANTROPOMÓRFICO\n\n${addition}`));
    assert.equal(result.replace(addition,''), generateHyperRealistic({fruta:'pera',sexo:'Feminino'}));
  }
});
test('invalid identity or body cannot generate output and fruit text remains literal', () => {
  for (const fields of [{fruta:'',sexo:'Feminino'},{fruta:'uva',sexo:''},{fruta:'uva',sexo:'Masculino',biotipo:'inválido'},{fruta:'[FRUTA]',sexo:'Feminino'}]) assert.throws(()=>generateHyperRealistic(fields));
  assert.ok(generateHyperRealistic({fruta:'$&',sexo:'Feminino'}).includes('FRUTA ESCOLHIDA: $&'));
});
