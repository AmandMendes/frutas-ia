import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { CHARACTER_PROFILES } from '../character-profiles.js';
import { generateCharacterProfile } from '../character-profile-generator.js';

test('ASMR appears only in voice mode, generates without image and preserves copy across mode changes', async()=>{
 const element=()=>({value:'',textContent:'',handlers:{},addEventListener(e,h){this.handlers[e]=h;}});
 const ids=['hyper-profile-form','hyper-trait','hyper-voice-output','hyper-voice-copy','hyper-voice-feedback','hyper-identity-notice','hyper-fruit','hyper-sex','hyper-form','hyper-shared-identity','hyper-voice-generate','hyper-profile-output-label','hyper-trait-label'];
 const nodes=Object.fromEntries(ids.map(id=>[id,element()]));
 const selectedMode={value:'personality'};const form=nodes['hyper-profile-form'];form.querySelector=()=>selectedMode;
 const select=nodes['hyper-trait'];select.options=[{value:''}];select.append=option=>select.options.push(option);
 Object.defineProperty(select,'selectedOptions',{get:()=>select.options.filter(option=>option.value===select.value)});
 let copied;
 vm.runInNewContext(readFileSync(new URL('../personality-panel.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{
  CHARACTER_PROFILES,generateCharacterProfile,navigator:{clipboard:{writeText:async text=>copied=text}},
  document:{querySelector:s=>nodes[s.slice(1)],createElement:element}
 });
 const asmr=select.options.find(option=>option.value==='asmr');
 assert.ok(asmr.hidden && asmr.disabled);
 selectedMode.value='voice';form.handlers.change();assert.ok(!asmr.hidden && !asmr.disabled);
 select.value='asmr';form.handlers.change();form.handlers.submit({preventDefault(){}});
 const text=nodes['hyper-voice-output'].value;assert.ok(text.includes('quase um sussurro'));
 assert.ok(!text.includes('\n'));await nodes['hyper-voice-copy'].handlers.click();assert.equal(copied,text);
 selectedMode.value='personality';form.handlers.change();assert.ok(asmr.hidden && asmr.disabled);assert.equal(select.value,'');
 selectedMode.value='voice';form.handlers.change();assert.equal(nodes['hyper-voice-output'].value,text);
});
