import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { PROMPT_LAPIDACAO_V31 } from '../prompt-lapidacao.js';

function mount(clipboard) {
  const output = {value:'',focus(){this.focused=true;},select(){this.selected=true;}};
  const feedback = {};
  const button = {addEventListener(event, handler){assert.equal(event,'click');this.click=handler;}};
  const nodes = {'#refinement-output':output,'#refinement-feedback':feedback,'#refinement-copy':button};
  // No form, translation layer or image service is provided to this module.
  vm.runInNewContext(readFileSync(new URL('../lapidacao.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),{
    PROMPT_LAPIDACAO_V31,navigator:{clipboard},document:{querySelector:selector=>nodes[selector]}
  });
  return {output,feedback,button};
}
test('lapidation displays and copies the exact full official text without form values', async () => {
  let copied;
  const view=mount({writeText:async text=>{copied=text;}});
  assert.equal(view.output.value,PROMPT_LAPIDACAO_V31);
  await view.button.click();
  assert.equal(copied,PROMPT_LAPIDACAO_V31);
  assert.ok(view.feedback.textContent.includes('Prompt copiado!'));
});
test('lapidation selects full prompt for manual copy when clipboard is unavailable or denied', async () => {
  for (const clipboard of [undefined,{writeText:async()=>{throw new Error('denied');}}]) {
    const view=mount(clipboard);
    await view.button.click();
    assert.equal(view.output.value,PROMPT_LAPIDACAO_V31);
    assert.ok(view.output.focused && view.output.selected);
    assert.ok(view.feedback.textContent.includes('Ctrl+C'));
  }
});
test('independent area has no characteristic inputs and both modules are included in Pages', () => {
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const area=html.split('id="adaptar-personagem"')[1].split('</section>')[0];
  assert.ok(area.includes('Lapidação Visual 3.1'));
  assert.ok(area.includes('manualmente'));
  assert.ok(!/<input|<select|<form/.test(area));
  assert.ok(html.includes('src="app.js"') && html.includes('src="lapidacao.js"'));
  assert.ok(html.includes('id="criar-personagem"'));
  const workflow=readFileSync(new URL('../.github/workflows/pages.yml',import.meta.url),'utf8');
  for (const module of ['lapidacao.js','prompt-lapidacao.js','app.js','translation.js','prompt-mestre.js','prompt-mestre-v31.js']) assert.ok(workflow.includes(module));
});
