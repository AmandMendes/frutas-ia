import { PROMPT_HIPER_REALISTA_ORIGINAL } from './prompt-hiper-realista.js';

export const SEXOS = Object.freeze(['Feminino', 'Masculino']);
export const BIOTIPOS = Object.freeze(['Magro', 'Médio', 'Gordo', 'Musculoso']);
export const INSTRUCAO_BIOTIPO = 'O personagem deve apresentar o biotipo selecionado, respeitando proporções anatômicas humanas adultas e realistas.';

export function validateIdentity(fruta, sexo) {
  if (typeof fruta !== 'string' || !fruta.trim()) throw new Error('Preencha a fruta para continuar.');
  if (/[\r\n\[\]]/.test(fruta)) throw new Error('Informe a fruta em uma única linha, sem marcadores entre colchetes.');
  if (!SEXOS.includes(sexo)) throw new Error('Selecione o sexo do personagem.');
  return {fruta:fruta.trim(), sexo};
}

export function generateHyperRealistic({fruta, sexo, biotipo = ''}) {
  const identity = validateIdentity(fruta, sexo);
  if (biotipo !== '' && !BIOTIPOS.includes(biotipo)) throw new Error('Selecione um tipo de corpo válido.');
  // Acrescenta somente a linha de sexo e, opcionalmente, as duas instruções
  // de biotipo aprovadas. O original permanece armazenado sem alterações.
  let prompt = PROMPT_HIPER_REALISTA_ORIGINAL.replace(
    'FRUTA ESCOLHIDA: [FRUTA]',
    `FRUTA ESCOLHIDA: [FRUTA]\nSEXO DO PERSONAGEM: ${identity.sexo}`
  );
  if (biotipo) {
    prompt = prompt.replace('3. CORPO ANTROPOMÓRFICO\n\n',
      `3. CORPO ANTROPOMÓRFICO\n\nTIPO DE CORPO: ${biotipo}\n\n${INSTRUCAO_BIOTIPO}\n\n`);
  }
  // Função de substituição mantém valores como "$&" literais.
  return prompt.replaceAll('[FRUTA]', () => identity.fruta);
}
