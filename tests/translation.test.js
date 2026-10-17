import test from 'node:test';
import assert from 'node:assert/strict';
import { translateValue, translateValues } from '../translation.js';

test('translates requested examples, case and missing accents', () => {
 for (const [input, expected] of Object.entries({morango:'strawberry',uva:'grape',pera:'pear',feminino:'female',masculino:'male','criança':'child',adolescente:'teenager',adulto:'adult',idoso:'elderly',magro:'slim','curvilíneo':'curvy',musculoso:'muscular',vaidosa:'vain',fofoqueira:'gossipy',brava:'angry',desconfiada:'suspicious','sorriso irônico':'ironic smile','  MAÇÃ  ':'apple','sorriso ironico':'ironic smile'})) {
  assert.deepEqual(translateValue(input,'PERSONALITY'),{value:expected,unknown:[]});
 }
});
test('matches full phrases before words and preserves unknown text and punctuation', () => {
 assert.deepEqual(translateValue('Vaidosa, fofoqueira e brava!','PERSONALITY'),{value:'vain, gossipy and angry!',unknown:[]});
 assert.deepEqual(translateValue('Sorriso irônico; olhar desconfiado.','EXPRESSION'),{value:'ironic smile; suspicious look.',unknown:[]});
 assert.deepEqual(translateValue('cabelo curto e cacheado','HAIRSTYLE'),{value:'short curly',unknown:[]});
 assert.deepEqual(translateValue('roupa elegante','CLOTHING STYLE'),{value:'elegant',unknown:[]});
 assert.deepEqual(translateValue('vaidosa e ZéInventadíssimo','PERSONALITY'),{value:'vain and ZéInventadíssimo',unknown:['ZéInventadíssimo']});
 assert.equal(translateValue('sorriso, irônico','EXPRESSION').value,'smile, ironic');
 assert.equal(translateValue('constructor','FRUIT').value,'constructor');
});
test('English select values stay intact without warnings and blank values stay blank', () => {
 for (const input of ['female','male','child','teenager','young adult','adult','elderly','slim','athletic','average build','curvy','muscular','plus-size','short','long straight','curly','coily','braided','no','casual','elegant','streetwear','sportswear','fantasy']) {
  assert.deepEqual(translateValue(input,'HAIRSTYLE'),{value:input,unknown:[]});
 }
 assert.deepEqual(translateValue('   ','FRUIT'),{value:'',unknown:[]});
});
test('translates only supplied active fields, retaining unknown terms with a warning record', () => {
 assert.deepEqual(translateValues({FRUIT:'morango',GENDER:'feminino',AGE:'adulta','BODY TYPE':'curvilínea'}),{values:{FRUIT:'strawberry',GENDER:'female',AGE:'adult','BODY TYPE':'curvy'},unknown:{}});
 assert.deepEqual(translateValues({PERSONALITY:'brava e xyz'}),{values:{PERSONALITY:'angry and xyz'},unknown:{PERSONALITY:['xyz']}});
});
