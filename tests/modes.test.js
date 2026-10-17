import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { translateValues } from '../translation.js';
import { MARKERS, BASE_MARKERS, generate } from '../generator.js';
import { PROMPT_MESTRE_V3 } from '../prompt-mestre.js';
import { PROMPT_MESTRE_V31 } from '../prompt-mestre-v31.js';

// Exercise application events with a minimal DOM adapter, without a server.
test('mode switch shows 8 or 4 fields, invalidates copy and restores custom inputs', async () => {
 const element = (value = '') => ({value, hidden:false, disabled:false, required:false, dataset:{}, handlers:{}, addEventListener(event, cb){this.handlers[event] = cb;}});
 const fields = Object.fromEntries(MARKERS.map(key => {
  const label = element();
  const field = element(key.toLowerCase());
  field.closest = () => label;
  return [key, field];
 }));
 const ids = Object.fromEntries(['output','copy','feedback','empty','mode','generate','notice','original','hair-custom','clothes-custom','translation-warning','translated-details','translated-values'].map(id => [id,element()]));
 ids.mode.value = 'custom';
 fields.HAIRSTYLE.dataset.custom = 'hair-custom';
 fields['CLOTHING STYLE'].dataset.custom = 'clothes-custom';
 fields.FRUIT.value = 'morango'; fields.GENDER.value = 'feminino'; fields.AGE.value = 'adulta'; fields['BODY TYPE'].value = 'curvilínea';
 fields['CLOTHING STYLE'].value = 'elegante'; fields.PERSONALITY.value = 'vaidosa e fofoqueira'; fields.EXPRESSION.value = 'sorriso irônico';
 fields.HAIRSTYLE.value = 'custom'; ids['hair-custom'].value = 'cacheado';
 const custom = [fields.HAIRSTYLE, fields['CLOTHING STYLE']];
 const form = element(); form.elements = {namedItem:key => fields[key]}; form.querySelectorAll = () => custom;
 const copied = [];
 vm.runInNewContext(readFileSync(new URL('../app.js', import.meta.url),'utf8').replace(/^import .*;\n/gm,''), {
  document:{querySelector:selector => selector === '#character' ? form : ids[selector.slice(1)], getElementById:id => ids[id]},
  navigator:{clipboard:{writeText:async text => copied.push(text)}},
  PROMPT_MESTRE_V3, PROMPT_MESTRE_V31, MARKERS, BASE_MARKERS, generate, translateValues, setTimeout:fn => fn(),
 });
 const submit = () => form.handlers.submit({preventDefault(){}});
 assert.equal(MARKERS.filter(key => !fields[key].disabled).length,8);
 submit(); assert.equal(ids.copy.disabled,false);
 assert.ok(ids.output.value.includes('strawberry'));
 assert.equal(ids['translated-details'].hidden,false);
 await ids.copy.handlers.click(); assert.equal(copied.length,1);
 assert.equal(copied[0],ids.output.value);
 assert.ok(copied[0].includes('vain and gossipy'));
 assert.ok(copied[0].includes('ironic smile'));
 assert.equal(ids['translation-warning'].textContent,'');
 fields.PERSONALITY.value = 'vaidosa e inventadíssima'; form.handlers.input(); submit();
 assert.ok(ids['translation-warning'].textContent.includes('ajuste manual'));
 await ids.copy.handlers.click(); assert.ok(ids['translation-warning'].textContent.includes('ajuste manual'));
 ids.mode.value = 'base'; ids.mode.handlers.change();
 assert.equal(MARKERS.filter(key => !fields[key].disabled).length,4);
 assert.equal(ids.original.textContent,PROMPT_MESTRE_V31);
 assert.equal(ids.copy.disabled,true); assert.equal(ids.output.value,'');
 assert.equal(ids['translated-details'].hidden,true);
 assert.equal(ids['translation-warning'].textContent,'');
 for (const key of MARKERS.slice(4)) {
  assert.equal(fields[key].closest().hidden,true);
  assert.equal(fields[key].required,false);
 }
 assert.equal(ids['hair-custom'].disabled,true);
 submit(); assert.equal(ids.copy.disabled,false);
 assert.equal(ids.output.value,generate(PROMPT_MESTRE_V31,translateValues(Object.fromEntries(BASE_MARKERS.map(key => [key,fields[key].value]))).values,BASE_MARKERS));
 fields.FRUIT.value = ''; form.handlers.input(); submit();
 assert.equal(ids.copy.disabled,true);
 ids.mode.value = 'custom'; ids.mode.handlers.change();
 assert.equal(ids.original.textContent,PROMPT_MESTRE_V3);
 assert.equal(ids['hair-custom'].disabled,false);
 assert.equal(ids['hair-custom'].required,true);
 assert.equal(ids['hair-custom'].value,'cacheado');
 assert.equal(MARKERS.filter(key => !fields[key].disabled).length,8);
});
