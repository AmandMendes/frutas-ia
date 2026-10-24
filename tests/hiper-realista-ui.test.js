import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { generateHyperRealistic } from '../hiper-realista-generator.js';
import { PROMPT_HIPER_REALISTA_ORIGINAL } from '../prompt-hiper-realista.js';
function mount(clipboard) {
 const ids=['hyper-form','hyper-fruit','hyper-sex','hyper-body','hyper-image-output','hyper-image-copy','hyper-image-feedback','hyper-original'];
 const nodes=Object.fromEntries(ids.map(id=>[id,{value:'',disabled:id==='hyper-image-copy',handlers:{},addEventListener(e,h){this.handlers[e]=h;},focus(){this.focused=true;},select(){this.selected=true;}}]));
 nodes['hyper-fruit'].value='morango';nodes['hyper-sex'].value='Feminino';
 vm.runInNewContext(readFileSync(new URL('../hiper-realista.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{generateHyperRealistic,PROMPT_HIPER_REALISTA_ORIGINAL,navigator:{clipboard},document:{querySelector:s=>nodes[s.slice(1)]}});
 return {nodes,submit:()=>nodes['hyper-form'].handlers.submit({preventDefault(){}}),copy:()=>nodes['hyper-image-copy'].handlers.click(),change:()=>nodes['hyper-form'].handlers.input()};
}
test('image generation and clipboard stay independent of personality/voice controls', async()=>{
 let copied;const view=mount({writeText:async text=>copied=text});view.submit();
 assert.equal(view.nodes['hyper-image-output'].value,generateHyperRealistic({fruta:'morango',sexo:'Feminino'}));
 await view.copy();assert.equal(copied,view.nodes['hyper-image-output'].value);
 view.nodes['hyper-body'].value='Gordo';view.change();assert.equal(view.nodes['hyper-image-copy'].disabled,true);
 view.submit();assert.ok(view.nodes['hyper-image-output'].value.includes('TIPO DE CORPO: Gordo'));
});
test('image manual copy and invalid identity behavior remain intact',async()=>{
 const view=mount(undefined);view.submit();await view.copy();assert.ok(view.nodes['hyper-image-output'].selected);
 view.nodes['hyper-fruit'].value='';view.change();view.submit();assert.equal(view.nodes['hyper-image-copy'].disabled,true);
});
test('same-page panel has selectable generation modes and profiles, preserving image fields',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const image=html.split('aria-labelledby="hyper-image-title"')[1].split('aria-labelledby="hyper-voice-title"')[0];
 assert.equal((image.match(/<select/g)||[]).length,2);
 assert.ok(image.includes('<option value="" selected>Não especificar</option>'));
 for(const value of ['personality','voice'])assert.ok(html.includes(`name="hyper-profile-mode" value="${value}"`));
 assert.ok(html.includes('id="hyper-trait"'));assert.ok(!html.includes('id="hyper-voice-again"'));
});
