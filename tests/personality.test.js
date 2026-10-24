import test from 'node:test';
import assert from 'node:assert/strict';
import { PERSONALIDADES, SOTAQUES, TIMBRES, RITMOS } from '../personality-data.js';
import { generatePersonality, FICHA_PERSONALIDADE_MODELO } from '../personality-generator.js';

test('official list sizes and independent selection reach every entry for either sex', () => {
  assert.equal(PERSONALIDADES.length,20); assert.equal(SOTAQUES.length,25); assert.equal(RITMOS.length,15);
  for (const sexo of ['Feminino','Masculino']) {
    assert.equal(TIMBRES[sexo].length,10);
    for (let i=0;i<25;i++) {
      const indices=[i%20,i,i%10,i%15];
      const sizes=[20,25,10,15]; let call=0;
      const result=generatePersonality({fruta:'uva',sexo},null,()=>{const current=call++;return (indices[current]+0.5)/sizes[current];});
      assert.equal(call,4);
      assert.equal(result.personalidade,PERSONALIDADES[indices[0]][sexo==='Feminino'?0:1]);
      assert.equal(result.sotaque,SOTAQUES[i]);
      assert.equal(result.timbre,TIMBRES[sexo][indices[2]]);
      assert.equal(result.ritmo,RITMOS[indices[3]]);
      assert.ok(result.text.includes('Sotaque brasileiro natural, sem caricaturas.'));
    }
  }
});
test('personality does not depend on accent, and gender flexion is explicit', () => {
  const make=(accent,sexo)=>{const seq=[0,accent,0,0];return generatePersonality({fruta:'pera',sexo},null,()=>seq.shift());};
  assert.equal(make(0,'Feminino').personalidade,make(0.99,'Feminino').personalidade);
  assert.notEqual(make(0,'Feminino').sotaque,make(0.99,'Feminino').sotaque);
  assert.equal(make(0,'Masculino').personalidade,'Confiante, vaidoso e dramático.');
});
test('consecutive complete combinations differ even when random source is constant', () => {
  let previous=null;
  for (let i=0;i<100;i++) {
    const next=generatePersonality({fruta:'morango',sexo:'Feminino'},previous,()=>0);
    if (previous) assert.notEqual(next.combination,previous.combination);
    previous=next;
  }
});
test('full sheet follows official format, literal fruit values and native pt-BR direction', () => {
  const result=generatePersonality({fruta:'$&',sexo:'Masculino'},null,()=>0.999999);
  const values={FRUTA:'$&',SEXO:'Masculino',PERSONALIDADE:result.personalidade,SOTAQUE:result.sotaque+' Sotaque brasileiro natural, sem caricaturas.',TIMBRE:result.timbre,RITMO:result.ritmo};
  let expected=FICHA_PERSONALIDADE_MODELO;
  for(const [key,value] of Object.entries(values)) expected=expected.split(`[${key}]`).join(value);
  assert.equal(result.text,expected);
  assert.ok(result.text.includes('IDIOMA OBRIGATÓRIO: Português brasileiro (pt-BR).'));
  assert.ok(result.text.includes('Evitar português europeu'));
  assert.throws(()=>generatePersonality({fruta:'',sexo:'Feminino'}));
  assert.throws(()=>generatePersonality({fruta:'pera',sexo:''}));
  for(const bad of [NaN,1,-0.1]) assert.throws(()=>generatePersonality({fruta:'pera',sexo:'Feminino'},null,()=>bad));
});
