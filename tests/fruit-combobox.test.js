import test from 'node:test';
import assert from 'node:assert/strict';
import { FRUTAS, filterFruits } from '../fruit-combobox.js';
import { generateHyperRealistic } from '../hiper-realista-generator.js';
import { generatePersonality } from '../personality-generator.js';

test('combobox supplies exactly the 25 requested fruits in order', () => {
  assert.deepEqual(FRUTAS, ['Laranja','Manga','Banana','Maçã','Morango','Melancia','Abacaxi','Limão','Pera','Kiwi','Pitaya','Carambola','Maracujá','Coco','Mamão','Goiaba','Acerola','Caju','Jabuticaba','Cereja','Pêssego','Ameixa','Melão','Mirtilo','Abacate']);
  assert.deepEqual(filterFruits(''),FRUTAS);
});
test('filter ignores case and accents, allows partial names and never changes custom input', () => {
  assert.deepEqual(filterFruits('mora'),['Morango']);
  for(const query of ['maça','MAÇÃ','maca','  MaCa ']) assert.deepEqual(filterFruits(query),['Maçã']);
  assert.deepEqual(filterFruits('LIMAO'),['Limão']);
  assert.deepEqual(filterFruits('Rambutã'),[]);
});
test('selected and custom fruit names work unchanged in both generators', () => {
  for(const fruta of ['Morango','Maçã','Rambutã']) {
    const image=generateHyperRealistic({fruta,sexo:'Feminino'});
    const voice=generatePersonality({fruta,sexo:'Feminino'},null,()=>0);
    assert.ok(image.includes(`FRUTA ESCOLHIDA: ${fruta}`));
    assert.equal(image.split(fruta).length-1,2);
    assert.ok(voice.text.includes(`PERSONAGEM: ${fruta}`));
  }
});
