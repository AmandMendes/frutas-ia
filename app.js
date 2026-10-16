import { PROMPT_MESTRE_V3 } from './prompt-mestre.js';
import { PROMPT_MESTRE_V31 } from './prompt-mestre-v31.js';
import { generate, MARKERS, BASE_MARKERS } from './generator.js';
const form = document.querySelector('#character');
const output = document.querySelector('#output');
const copy = document.querySelector('#copy');
const feedback = document.querySelector('#feedback');
const empty = document.querySelector('#empty');
const mode = document.querySelector('#mode');
const modes = {
  custom: { template: PROMPT_MESTRE_V3, markers: MARKERS, name: 'Mestre 3.0' },
  base: { template: PROMPT_MESTRE_V31, markers: BASE_MARKERS, name: 'Mestre 3.1' },
};
const selected = () => modes[mode.value];
function updateMode() {
  const current = selected();
  for (const key of MARKERS) {
    const field = form.elements.namedItem(key);
    const active = current.markers.includes(key);
    field.closest('label').hidden = !active;
    field.disabled = !active;
    field.required = active;
  }
  syncCustom();
  const configured = Boolean(current.template) && current.markers.every(key => current.template.includes(`[${key}]`));
  document.querySelector('#generate').disabled = !configured;
  document.querySelector('#notice').textContent = `${current.name}: preencha os ${current.markers.length === 4 ? 'quatro' : 'oito'} campos. ` + (mode.value === 'base' ? 'Roupa, cabelo, expressão, posição frontal e fundo branco são fixos no modelo.' : 'Personalize os detalhes do seu personagem.');
  document.querySelector('#original').textContent = current.template;
  invalidate();
}
mode.addEventListener('change', updateMode);
function invalidate() {
  output.value = ''; output.hidden = true; empty.hidden = false;
  copy.disabled = true; feedback.textContent = '';
}
function syncCustom() {
  for (const select of form.querySelectorAll('[data-custom]')) {
    const input = document.getElementById(select.dataset.custom);
    input.hidden = select.disabled || select.value !== 'custom'; input.disabled = input.hidden; input.required = !input.hidden;
  }
}
form.addEventListener('input', invalidate);
form.addEventListener('change', () => { syncCustom(); invalidate(); });
form.addEventListener('reset', () => { invalidate(); setTimeout(syncCustom, 0); });
function values() {
  return Object.fromEntries(selected().markers.map(key => {
    const field = form.elements.namedItem(key);
    return [key, field.value === 'custom' && field.dataset.custom ? document.getElementById(field.dataset.custom).value : field.value];
  }));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    output.value = generate(selected().template, values(), selected().markers);
    output.hidden = false; empty.hidden = true; copy.disabled = false;
    feedback.textContent = 'Prompt gerado. Confira os valores em inglês antes de copiar.';
  } catch (error) { invalidate(); feedback.textContent = error.message; }
});
copy.addEventListener('click', async () => {
  try {
    const validated = generate(selected().template, values(), selected().markers);
    if (output.value !== validated) throw new Error('Gere novamente o prompt antes de copiar.');
    await navigator.clipboard.writeText(validated);
    feedback.textContent = 'Prompt completo copiado!';
  } catch (error) {
    feedback.textContent = error.name === 'NotAllowedError' || !navigator.clipboard ? 'Selecione o texto completo abaixo e copie com Ctrl+C ou ⌘C.' : error.message;
    if (!output.hidden) { output.focus(); output.select(); }
  }
});

updateMode();
