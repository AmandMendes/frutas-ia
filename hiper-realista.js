import { generateHyperRealistic } from './hiper-realista-generator.js';
import { generatePersonality } from './personality-generator.js';
import { PROMPT_HIPER_REALISTA_ORIGINAL } from './prompt-hiper-realista.js';

const form = document.querySelector('#hyper-form');
const fruta = document.querySelector('#hyper-fruit');
const sexo = document.querySelector('#hyper-sex');
const biotipo = document.querySelector('#hyper-body');
const imageOutput = document.querySelector('#hyper-image-output');
const imageCopy = document.querySelector('#hyper-image-copy');
const imageFeedback = document.querySelector('#hyper-image-feedback');
const voiceOutput = document.querySelector('#hyper-voice-output');
const voiceCopy = document.querySelector('#hyper-voice-copy');
const voiceFeedback = document.querySelector('#hyper-voice-feedback');
const identityNotice = document.querySelector('#hyper-identity-notice');
const reroll = document.querySelector('#hyper-voice-again');
let lastPersonality = null;
const identity = () => ({fruta:fruta.value, sexo:sexo.value});
const imageValues = () => ({...identity(), biotipo:biotipo.value});
document.querySelector('#hyper-original').textContent = PROMPT_HIPER_REALISTA_ORIGINAL;

function updateIdentity() {
  document.querySelector('#hyper-shared-identity').textContent = `Fruta: ${fruta.value.trim() || 'não informada'} · Sexo: ${sexo.value || 'não informado'}`;
  identityNotice.textContent = lastPersonality && (lastPersonality.fruta !== fruta.value.trim() || lastPersonality.sexo !== sexo.value)
    ? 'Fruta ou sexo foram alterados. A ficha abaixo mantém os dados do último sorteio. Gere novamente para usar os dados atuais.' : '';
}
function invalidateImage() {
  imageOutput.value = ''; imageOutput.hidden = true; imageCopy.disabled = true;
  imageFeedback.textContent = '';
  updateIdentity();
}
// A ficha permanece visível: somente um novo sorteio substitui seu conteúdo.
form.addEventListener('input', invalidateImage);
form.addEventListener('change', invalidateImage);
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    imageOutput.value = generateHyperRealistic(imageValues());
    imageOutput.hidden = false; imageCopy.disabled = false;
    imageFeedback.textContent = 'Prompt pronto. Anexe manualmente uma fotografia humana ao Google Flow.';
  } catch (error) { invalidateImage(); imageFeedback.textContent = error.message; }
});

async function copyText(text, output, feedback) {
  try {
    await navigator.clipboard.writeText(text);
    feedback.textContent = 'Texto completo copiado!';
  } catch {
    output.focus(); output.select();
    feedback.textContent = 'O texto foi selecionado. Copie com Ctrl+C, ⌘C ou a opção Copiar do dispositivo.';
  }
}
imageCopy.addEventListener('click', async () => {
  try {
    const text = generateHyperRealistic(imageValues());
    if (imageCopy.disabled || imageOutput.value !== text) throw new Error('Gere novamente o prompt antes de copiar.');
    await copyText(text, imageOutput, imageFeedback);
  } catch (error) { imageFeedback.textContent = error.message; }
});
function drawPersonality() {
  try {
    const next = generatePersonality(identity(), lastPersonality);
    lastPersonality = next;
    voiceOutput.value = next.text; voiceOutput.hidden = false;
    voiceCopy.disabled = false; reroll.disabled = false;
    voiceFeedback.textContent = 'Ficha pronta para usar no Google Flow. Novos sorteios não alteram o prompt visual.';
    updateIdentity();
  } catch (error) { voiceFeedback.textContent = error.message; }
}
document.querySelector('#hyper-voice-generate').addEventListener('click', drawPersonality);
reroll.addEventListener('click', drawPersonality);
voiceCopy.addEventListener('click', async () => {
  if (!lastPersonality || voiceCopy.disabled) return;
  // Copia a ficha visível do último sorteio, mesmo se os campos tiverem mudado.
  await copyText(lastPersonality.text, voiceOutput, voiceFeedback);
});
updateIdentity();
