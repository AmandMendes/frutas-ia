// Listas oficiais: sotaque não determina personalidade, timbre ou ritmo.
export const PERSONALIDADES = Object.freeze([
  ['Confiante, vaidosa e dramática.', 'Confiante, vaidoso e dramático.'],
  ['Tímida, sensível e romântica.', 'Tímido, sensível e romântico.'],
  ['Debochada, provocadora e inteligente.', 'Debochado, provocador e inteligente.'],
  ['Extrovertida, engraçada e impulsiva.', 'Extrovertido, engraçado e impulsivo.'],
  ['Misteriosa, sofisticada e reservada.', 'Misterioso, sofisticado e reservado.'],
  ['Elegante, controladora e perfeccionista.', 'Elegante, controlador e perfeccionista.'],
  ['Tranquila, observadora e sarcástica.', 'Tranquilo, observador e sarcástico.'],
  ['Carismática, exagerada e brincalhona.', 'Carismático, exagerado e brincalhão.'],
  ['Curiosa, imprevisível e espirituosa.', 'Curioso, imprevisível e espirituoso.'],
  ['Determinada, protetora e intensa.', 'Determinado, protetor e intenso.'],
  ['Ingênua, distraída e muito simpática.', 'Ingênuo, distraído e muito simpático.'],
  ['Competitiva, ambiciosa e impaciente.', 'Competitivo, ambicioso e impaciente.'],
  ['Introvertida, analítica e desconfiada.', 'Introvertido, analítico e desconfiado.'],
  ['Espontânea, ousada e aventureira.', 'Espontâneo, ousado e aventureiro.'],
  ['Calma, gentil e diplomática.', 'Calmo, gentil e diplomático.'],
  ['Orgulhosa, teimosa e independente.', 'Orgulhoso, teimoso e independente.'],
  ['Ansiosa, falante e atrapalhada.', 'Ansioso, falante e atrapalhado.'],
  ['Fria, calculista e extremamente objetiva.', 'Frio, calculista e extremamente objetivo.'],
  ['Sedutora, charmosa e bem-humorada.', 'Sedutor, charmoso e bem-humorado.'],
  ['Irônica, irreverente e imprevisível.', 'Irônico, irreverente e imprevisível.']
].map(pair => Object.freeze(pair)));
export const SOTAQUES = Object.freeze([
  'Paulista, São Paulo capital.', 'Paulista, interior de São Paulo.',
  'Carioca, Rio de Janeiro.', 'Mineiro, Belo Horizonte.', 'Mineiro, interior de Minas Gerais.',
  'Baiano, Salvador.', 'Pernambucano, Recife.', 'Cearense, Fortaleza.', 'Paraibano, João Pessoa.',
  'Potiguar, Natal.', 'Alagoano, Maceió.', 'Sergipano, Aracaju.', 'Maranhense, São Luís.',
  'Paraense, Belém.', 'Amazonense, Manaus.', 'Goiano, Goiânia.', 'Brasiliense, Distrito Federal.',
  'Mato-grossense, Cuiabá.', 'Sul-mato-grossense, Campo Grande.', 'Gaúcho, Porto Alegre.',
  'Gaúcho, interior do Rio Grande do Sul.', 'Curitibano, Curitiba.', 'Catarinense, Florianópolis.',
  'Capixaba, Vitória.', 'Acreano, Rio Branco.'
]);
export const TIMBRES = Object.freeze({
  Feminino: Object.freeze([
    'Médio-grave, aveludada e suave.', 'Médio-aguda, clara e expressiva.',
    'Grave, encorpada e levemente rouca.', 'Média, delicada e cristalina.',
    'Média, firme e articulada.', 'Médio-grave, quente e envolvente.',
    'Médio-aguda, energética e vibrante.', 'Média, levemente rouca e descontraída.',
    'Grave, calma e sofisticada.', 'Média, macia e acolhedora.'
  ]),
  Masculino: Object.freeze([
    'Grave, encorpada e firme.', 'Médio-grave, aveludada e tranquila.',
    'Média, clara e expressiva.', 'Médio-aguda, ágil e energética.',
    'Grave, levemente rouca e marcante.', 'Média, suave e descontraída.',
    'Médio-grave, quente e envolvente.', 'Média, firme e articulada.',
    'Grave, profunda e pausada.', 'Médio-aguda, vibrante e espontânea.'
  ])
});
export const RITMOS = Object.freeze([
  'Lento, calmo e pausado.', 'Moderado, natural e conversacional.',
  'Rápido, espontâneo e expressivo.', 'Acelerado, com pequenas pausas.',
  'Suave, delicado e contemplativo.', 'Firme, direto e objetivo.',
  'Descontraído, com ironia sutil.', 'Melodioso, fluido e envolvente.',
  'Enérgico, com mudanças de entonação.', 'Contido, reservado e discreto.',
  'Dramático, mas sem exageros teatrais.', 'Bem-humorado, com pausas cômicas naturais.',
  'Elegante, articulado e seguro.', 'Hesitante, tímido e espontâneo.',
  'Provocador, sarcástico e confiante.'
]);
