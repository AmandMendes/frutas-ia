import { generateHyperRealistic } from './hiper-realista-generator.js';
import { PROMPT_HIPER_REALISTA_ORIGINAL } from './prompt-hiper-realista.js';

const form = document.querySelector('#hyper-form');
const fruta = document.querySelector('#hyper-fruit');
const sexo = document.querySelector('#hyper-sex');
const biotipo = document.querySelector('#hyper-body');
const output = document.querySelector('#hyper-image-output');
const copy = document.querySelector('#hyper-image-copy');
const feedback = document.querySelector('#hyper-image-feedback');
const values = () => ({fruta:fruta.value, sexo:sexo.value, biotipo:biotipo.value});
document.querySelector('#hyper-original').textContent = PROMPT_HIPER_REALISTA_ORIGINAL;
function invalidate() {
  output.value = ''; output.hidden = true; copy.disabled = true; feedback.textContent = '';
}
form.addEventListener('input', invalidate);
form.addEventListener('change', invalidate);
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    output.value = generateHyperRealistic(values()); output.hidden = false; copy.disabled = false;
    feedback.textContent = 'Prompt pronto. Anexe manualmente uma fotografia humana ao Google Flow.';
  } catch (error) { invalidate(); feedback.textContent = error.message; }
});
copy.addEventListener('click', async () => {
  try {
    const text = generateHyperRealistic(values());
    if (copy.disabled || output.value !== text) throw new Error('Gere novamente o prompt antes de copiar.');
    try {
      await navigator.clipboard.writeText(text); feedback.textContent = 'Texto completo copiado!';
    } catch {
      output.focus(); output.select();
      feedback.textContent = 'O texto foi selecionado. Copie com Ctrl+C, ⌘C ou a opção Copiar do dispositivo.';
    }
  } catch (error) { feedback.textContent = error.message; }
});
