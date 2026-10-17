// Tradução local: somente os valores passam por esta camada, nunca os prompts.
// Acrescente expressões completas para melhorar traduções sem um serviço externo.
const normalize = text => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
const entries = rows => Object.fromEntries(rows.map(([pt, en]) => [normalize(pt), en]));
const COMMON = entries([
  ['morango','strawberry'],['uva','grape'],['pera','pear'],['maçã','apple'],['banana','banana'],['laranja','orange'],['limão','lemon'],['lima','lime'],['abacaxi','pineapple'],['melancia','watermelon'],['melão','melon'],['pêssego','peach'],['ameixa','plum'],['cereja','cherry'],['manga','mango'],['mamão','papaya'],['maracujá','passion fruit'],['kiwi','kiwi'],['coco','coconut'],['abacate','avocado'],['framboesa','raspberry'],['amora','blackberry'],['mirtilo','blueberry'],['goiaba','guava'],['figo','fig'],['romã','pomegranate'],['tangerina','tangerine'],['jabuticaba','jabuticaba'],['pitaya','dragon fruit'],['carambola','star fruit'],['lichia','lychee'],['caqui','persimmon'],['damasco','apricot'],
  ['feminino','female'],['feminina','female'],['mulher','female'],['masculino','male'],['masculina','male'],['homem','male'],
  ['criança','child'],['adolescente','teenager'],['jovem adulto','young adult'],['jovem adulta','young adult'],['adulto','adult'],['adulta','adult'],['idoso','elderly'],['idosa','elderly'],
  ['magro','slim'],['magra','slim'],['atlético','athletic'],['atlética','athletic'],['médio','average build'],['média','average build'],['curvilíneo','curvy'],['curvilínea','curvy'],['musculoso','muscular'],['musculosa','muscular'],['plus size','plus-size'],
  ['vaidosa','vain'],['vaidoso','vain'],['fofoqueira','gossipy'],['fofoqueiro','gossipy'],['brava','angry'],['bravo','angry'],['desconfiada','suspicious'],['desconfiado','suspicious'],['alegre','cheerful'],['curiosa','curious'],['curioso','curious'],['aventureira','adventurous'],['aventureiro','adventurous'],['tímida','shy'],['tímido','shy'],['confiante','confident'],['engraçada','funny'],['engraçado','funny'],['gentil','kind'],['arrogante','arrogant'],['elegante','elegant'],['sarcástica','sarcastic'],['sarcástico','sarcastic'],['dramática','dramatic'],['dramático','dramatic'],['teimosa','stubborn'],['teimoso','stubborn'],['romântica','romantic'],['romântico','romantic'],['calma','calm'],['calmo','calm'],['séria','serious'],['sério','serious'],['inteligente','intelligent'],['carismática','charismatic'],['carismático','charismatic'],['divertida','playful'],['divertido','playful'],
  ['sorriso irônico','ironic smile'],['sorriso irónico','ironic smile'],['sorriso confiante','confident smile'],['sorriso caloroso','warm smile'],['sorriso discreto','subtle smile'],['sorriso malicioso','mischievous smile'],['expressão neutra','neutral expression'],['olhar desconfiado','suspicious look'],['olhar desconfiada','suspicious look'],['sobrancelha levantada','raised eyebrow'],['sobrancelhas levantadas','raised eyebrows'],['olhos arregalados','wide eyes'],['sorrindo','smiling'],['sorriso','smile'],['irônico','ironic'],['irônica','ironic'],['feliz','happy'],['triste','sad'],['surpresa','surprised'],['surpreso','surprised'],['neutra','neutral'],['neutro','neutral'],
  ['curto','short'],['curta','short'],['longo','long'],['longa','long'],['liso','straight'],['lisa','straight'],['cacheado','curly'],['cacheada','curly'],['crespo','coily'],['crespa','coily'],['ondulado','wavy'],['ondulada','wavy'],['tranças','braided'],['rabo de cavalo','ponytail'],['coque','bun'],['sem cabelo','no'],['loiro','blond'],['loira','blond'],['preto','black'],['preta','black'],['castanho','brown'],['castanha','brown'],['ruivo','red'],['ruiva','red'],['branco','white'],['branca','white'],['cinza','gray'],['vermelho','red'],['vermelha','red'],['azul','blue'],['verde','green'],['rosa','pink'],['amarelo','yellow'],['amarela','yellow'],['roxo','purple'],['roxa','purple'],
  ['casual','casual'],['esportivo','sportswear'],['esportiva','sportswear'],['fantasia','fantasy'],['roupa casual','casual'],['roupa elegante','elegant'],['roupa esportiva','sportswear'],['vestido','dress'],['terno','suit'],['camiseta','t-shirt'],['camisa','shirt'],['calça','pants'],['calças','pants'],['saia','skirt'],['jaqueta','jacket'],['tênis','sneakers'],['sapatos','shoes'],['botas','boots'],['jeans','jeans'],['de couro','leather'],['de seda','silk'],['de algodão','cotton'],
  ['e','and'],['ou','or'],['com','with'],['sem','without'],['muito','very'],['muita','very'],['um','a'],['uma','a'],['de','of'],['anos','years old']
]);
const CONTEXT = {
  HAIRSTYLE: entries([
    ['cabelo curto e cacheado','short curly'],['longo e liso','long straight'],['curto e cacheado','short curly'],['cabelo curto','short'],['cabelo longo','long'],['cabelo cacheado','curly'],['cabelo crespo','coily'],['cabelo liso','straight'],['cabelo ondulado','wavy'],['cabelo loiro','blond'],['cabelo preto','black'],['cabelo castanho','brown'],['cabelo ruivo','red'],['cabelo','hair'],['cabelos','hair']
  ]),
  'CLOTHING STYLE': entries([['estilo de rua','streetwear'],['roupas casuais','casual'],['roupas elegantes','elegant'],['roupas esportivas','sportswear'],['roupa','clothing'],['roupas','clothing']])
};
const tokenPattern = /[\p{L}\p{M}\p{N}]+(?:[-’'][\p{L}\p{M}\p{N}]+)*/gu;
const tokens = text => [...text.matchAll(tokenPattern)];

export function translateValue(value, field) {
  const dictionary = Object.assign(Object.create(null), COMMON, CONTEXT[field]);
  const input = value.trim();
  const exact = dictionary[normalize(input)];
  if (exact !== undefined) return {value:exact, unknown:[]};
  // Preserve existing English values and punctuation. Match longest phrases first;
  // unmatched pieces retain their exact original spelling (including accents).
  const english = new Set(Object.values({...COMMON, ...Object.assign({}, ...Object.values(CONTEXT))}).flatMap(text => tokens(text).map(token => normalize(token[0]))));
  const words = tokens(input);
  const maxWords = Math.max(...Object.keys(dictionary).map(key => key.split(' ').length));
  const unknown = [];
  let result = '', cursor = 0;
  for (let i = 0; i < words.length;) {
    const start = words[i].index;
    let count = 1, end = start + words[i][0].length, replacement;
    for (let length = Math.min(maxWords, words.length - i); length >= 1; length--) {
      const last = words[i + length - 1];
      const candidateEnd = last.index + last[0].length;
      const candidate = input.slice(start, candidateEnd);
      // Phrase matches cannot jump across punctuation.
      if (length > 1 && words.slice(i, i + length - 1).some((word, n) => !/^\s+$/.test(input.slice(word.index + word[0].length, words[i + n + 1].index)))) continue;
      const match = dictionary[normalize(candidate)];
      if (match !== undefined) {replacement = match; count = length; end = candidateEnd; break;}
    }
    if (replacement === undefined) {
      replacement = words[i][0];
      if (!english.has(normalize(replacement)) && !/^\d+$/.test(replacement)) unknown.push(replacement);
    }
    result += input.slice(cursor, start) + replacement;
    cursor = end; i += count;
  }
  return {value:result + input.slice(cursor), unknown};
}

export function translateValues(values) {
  const translated = {}, unknown = {};
  for (const [field, value] of Object.entries(values)) {
    const result = translateValue(value, field);
    translated[field] = result.value;
    if (result.unknown.length) unknown[field] = result.unknown;
  }
  return {values:translated, unknown};
}
