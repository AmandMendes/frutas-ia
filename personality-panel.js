import { CHARACTER_PROFILES } from './character-profiles.js';
import { generateCharacterProfile } from './character-profile-generator.js';

const form = document.querySelector('#hyper-profile-form');
const select = document.querySelector('#hyper-trait');
const output = document.querySelector('#hyper-voice-output');
const copy = document.querySelector('#hyper-voice-copy');
const feedback = document.querySelector('#hyper-voice-feedback');
const notice = document.querySelector('#hyper-identity-notice');
const fruta = document.querySelector('#hyper-fruit');
const sexo = document.querySelector('#hyper-sex');
const imageForm = document.querySelector('#hyper-form');
const results = {personality:null, voice:null};
const mode = () => form.querySelector('[name="hyper-profile-mode"]:checked').value;
const identity = () => ({fruta:fruta.value.replace(/\s+/g, ' ').trim(), sexo:sexo.value});
function updateNotice() {
  const current = results[mode()];
  notice.textContent = current && (current.profileId !== select.value || current.fruta !== identity().fruta || current.sexo !== identity().sexo)
    ? 'As opções foram alteradas. O resultado visível mantém os dados da última geração. Clique em Gerar para atualizar.' : '';
}
function refresh() {
  const isVoice = mode() === 'voice';
  document.querySelector('#hyper-voice-generate').textContent = isVoice ? 'Gerar estilo de voz' : 'Gerar personalidade';
  document.querySelector('#hyper-profile-output-label').textContent = isVoice ? 'Estilo de voz — texto contínuo para o Flow' : 'Personalidade — descrição do personagem';
  copy.textContent = isVoice ? 'Copiar estilo de voz' : 'Copiar personalidade';
  const current = results[mode()];
  output.value = current?.text || ''; output.hidden = !current;
  copy.disabled = !current;
  feedback.textContent = '';
  updateNotice();
}
function updateContext() {
  const context = identity();
  document.querySelector('#hyper-shared-identity').textContent = `Contexto opcional · Fruta: ${context.fruta || 'não informada'} · Sexo: ${context.sexo || 'não informado'}`;
  for (const option of [...select.options].slice(1)) {
    const profile = CHARACTER_PROFILES.find(item => item.id === option.value);
    option.textContent = context.sexo ? profile.labels[context.sexo === 'Feminino' ? 1 : 0] : [...new Set(profile.labels)].join(' / ');
  }
  updateNotice();
}
for (const profile of CHARACTER_PROFILES) {
  const option = document.createElement('option'); option.value = profile.id;
  option.textContent = profile.labels[0]; select.append(option);
}
form.addEventListener('change', refresh);
imageForm.addEventListener('input', updateContext);
imageForm.addEventListener('change', updateContext);
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const currentMode = mode();
    results[currentMode] = generateCharacterProfile({mode:currentMode, profileId:select.value, ...identity()}, results[currentMode]);
    refresh();
    feedback.textContent = currentMode === 'voice' ? 'Estilo de voz pronto em um único parágrafo.' : 'Personalidade detalhada pronta. Você pode gerar o estilo de voz separadamente.';
  } catch (error) { feedback.textContent = error.message; }
});
copy.addEventListener('click', async () => {
  const current = results[mode()];
  if (!current || copy.disabled) return;
  try {
    await navigator.clipboard.writeText(current.text);
    feedback.textContent = 'Texto completo copiado!';
  } catch {
    output.focus(); output.select();
    feedback.textContent = 'O texto foi selecionado. Copie com Ctrl+C, ⌘C ou a opção Copiar do dispositivo.';
  }
});
updateContext(); refresh();
