import { PROMPT_LAPIDACAO_V31 } from './prompt-lapidacao.js';

// Recurso independente: não lê o formulário nem passa pela camada de tradução.
const output = document.querySelector('#refinement-output');
const feedback = document.querySelector('#refinement-feedback');
output.value = PROMPT_LAPIDACAO_V31;
document.querySelector('#refinement-copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PROMPT_LAPIDACAO_V31);
    feedback.textContent = 'Prompt copiado! Adicione sua imagem de referência manualmente ao Google Flow e cole o texto.';
  } catch {
    output.focus();
    output.select();
    feedback.textContent = 'O texto completo foi selecionado. Copie com Ctrl+C, ⌘C ou a opção Copiar do dispositivo e use com sua imagem no Google Flow.';
  }
});
