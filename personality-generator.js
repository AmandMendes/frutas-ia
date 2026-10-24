import { validateIdentity } from './hiper-realista-generator.js';
import { PERSONALIDADES, SOTAQUES, TIMBRES, RITMOS } from './personality-data.js';

export const FICHA_PERSONALIDADE_MODELO = `IDENTIDADE DE PERSONALIDADE E VOZ

PERSONAGEM: [FRUTA]

SEXO: [SEXO]

PERSONALIDADE: [PERSONALIDADE]

SOTAQUE: [SOTAQUE]

TIMBRE: [TIMBRE]

RITMO E ESTILO DE FALA: [RITMO]

IDIOMA OBRIGATÓRIO: Português brasileiro (pt-BR).

DIREÇÃO DE INTERPRETAÇÃO:

O personagem deve expressar sua personalidade por meio de gestos, expressões faciais, postura e reações naturais.

Todos os diálogos devem ser falados exclusivamente em português brasileiro nativo, com o sotaque regional sorteado.

A voz deve apresentar o timbre especificado e manter o ritmo de fala selecionado.

A interpretação deve ser espontânea e realista, com pausas naturais, pequenas respirações e variações de entonação coerentes com a personalidade.

Preservar a consistência da identidade vocal em todas as cenas futuras.

Evitar português europeu, sotaques estrangeiros, vozes robóticas, interpretação teatral exagerada e caricaturas regionais.`;

function randomIndex(length, random) {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) throw new Error('Falha no sorteio. Tente novamente.');
  return Math.floor(value * length);
}

export function generatePersonality({fruta, sexo}, previous = null, random = Math.random) {
  const identity = validateIdentity(fruta, sexo);
  // Quatro sorteios independentes: não há associação entre região e traços.
  const indices = [
    randomIndex(PERSONALIDADES.length, random), randomIndex(SOTAQUES.length, random),
    randomIndex(TIMBRES[sexo].length, random), randomIndex(RITMOS.length, random)
  ];
  const selectedValues = () => [PERSONALIDADES[indices[0]][sexo === 'Feminino' ? 0 : 1], SOTAQUES[indices[1]], TIMBRES[sexo][indices[2]], RITMOS[indices[3]]];
  // Se os quatro atributos coincidirem com o último sorteio, sorteia outro ritmo.
  // O deslocamento não nulo garante término mesmo com uma fonte aleatória constante.
  if (JSON.stringify(selectedValues()) === previous?.combination) {
    indices[3] = (indices[3] + 1 + randomIndex(RITMOS.length - 1, random)) % RITMOS.length;
  }
  const [personalidade, sotaque, timbre, ritmo] = selectedValues();
  const values = {FRUTA:identity.fruta, SEXO:sexo, PERSONALIDADE:personalidade,
    SOTAQUE:`${sotaque} Sotaque brasileiro natural, sem caricaturas.`, TIMBRE:timbre, RITMO:ritmo};
  const text = FICHA_PERSONALIDADE_MODELO.replace(/\[(FRUTA|SEXO|PERSONALIDADE|SOTAQUE|TIMBRE|RITMO)\]/g, (_, key) => values[key]);
  return { ...identity, personalidade, sotaque, timbre, ritmo, text, combination:JSON.stringify(selectedValues()) };
}
