import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { generateHyperRealistic } from '../hiper-realista-generator.js';
import { generatePersonality } from '../personality-generator.js';
import { PROMPT_HIPER_REALISTA_ORIGINAL } from '../prompt-hiper-realista.js';

function mount(clipboard) {
  const ids=['hyper-form','hyper-fruit','hyper-sex','hyper-body','hyper-image-output','hyper-image-copy','hyper-image-feedback','hyper-voice-output','hyper-voice-copy','hyper-voice-feedback','hyper-identity-notice','hyper-voice-again','hyper-original','hyper-shared-identity','hyper-voice-generate'];
  const nodes=Object.fromEntries(ids.map(id=>[id,{value:'',hidden:false,disabled:id.includes('copy')||id==='hyper-voice-again',handlers:{},addEventListener(type,handler){this.handlers[type]=handler;},focus(){this.focused=true;},select(){this.selected=true;}}]));
  nodes['hyper-fruit'].value='morango'; nodes['hyper-sex'].value='Feminino';
  vm.runInNewContext(readFileSync(new URL('../hiper-realista.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{
    PROMPT_HIPER_REALISTA_ORIGINAL,generateHyperRealistic,generatePersonality,navigator:{clipboard},document:{querySelector:selector=>nodes[selector.slice(1)]}
  });
  return {nodes,click:id=>nodes[id].handlers.click(),submit:()=>nodes['hyper-form'].handlers.submit({preventDefault(){}}),change:()=>nodes['hyper-form'].handlers.input()};
}
test('personality can generate first, reroll leaves image unchanged, shared identity updates only on next draw', async () => {
  const copied=[]; const view=mount({writeText:async text=>copied.push(text)}); const n=view.nodes;
  view.click('hyper-voice-generate');
  assert.ok(n['hyper-voice-output'].value.includes('PERSONAGEM: morango'));
  const first=n['hyper-voice-output'].value;
  view.submit(); const image=n['hyper-image-output'].value;
  await view.click('hyper-image-copy'); assert.equal(copied.at(-1),image);
  view.click('hyper-voice-again'); assert.notEqual(n['hyper-voice-output'].value,first);
  assert.equal(n['hyper-image-output'].value,image);
  n['hyper-fruit'].value='pera'; n['hyper-sex'].value='Masculino'; view.change();
  const previous=n['hyper-voice-output'].value;
  assert.equal(n['hyper-image-copy'].disabled,true);
  assert.ok(n['hyper-identity-notice'].textContent.includes('último sorteio'));
  assert.ok(n['hyper-shared-identity'].textContent.includes('pera'));
  await view.click('hyper-voice-copy'); assert.equal(copied.at(-1),previous);
  view.click('hyper-voice-again'); assert.ok(n['hyper-voice-output'].value.includes('PERSONAGEM: pera'));
  assert.ok(n['hyper-voice-output'].value.includes('SEXO: Masculino'));
  assert.equal(n['hyper-identity-notice'].textContent,'');
});
test('body changes do not change personality; errors retain last sheet; copying has a manual fallback', async () => {
  const view=mount(undefined); const n=view.nodes;
  view.click('hyper-voice-generate'); const sheet=n['hyper-voice-output'].value;
  n['hyper-body'].value='Gordo'; view.change();view.submit();
  assert.ok(n['hyper-image-output'].value.includes('TIPO DE CORPO: Gordo'));
  assert.equal(n['hyper-voice-output'].value,sheet);
  await view.click('hyper-image-copy');assert.ok(n['hyper-image-output'].selected);
  await view.click('hyper-voice-copy');assert.ok(n['hyper-voice-output'].selected);
  n['hyper-fruit'].value='';view.change();view.click('hyper-voice-again');
  assert.equal(n['hyper-voice-output'].value,sheet);
  assert.ok(n['hyper-voice-feedback'].textContent.includes('fruta'));
  view.submit();assert.equal(n['hyper-image-copy'].disabled,true);
});
test('same-page category exposes exactly the required fields and no manual voice controls', () => {
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const area=html.split('<section class="hyper-area"')[1].split('<footer>')[0];
  assert.equal((area.match(/<input/g)||[]).length,1);assert.equal((area.match(/<select/g)||[]).length,2);
  assert.ok(area.includes('<option value="" selected>Não especificar</option>'));
  for(const id of ['hyper-voice-generate','hyper-voice-again','hyper-voice-copy']) assert.ok(area.includes(`id="${id}"`));
  for(const href of ['#criar-personagem','#adaptar-personagem','#personagem-hiper-realista'])assert.ok(html.includes(`href="${href}"`));
});
