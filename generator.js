export const MARKERS = Object.freeze(['FRUIT', 'GENDER', 'AGE', 'BODY TYPE', 'HAIRSTYLE', 'CLOTHING STYLE', 'PERSONALITY', 'EXPRESSION']);
export const BASE_MARKERS = Object.freeze(MARKERS.slice(0, 4));
const pattern = /\[(FRUIT|GENDER|AGE|BODY TYPE|HAIRSTYLE|CLOTHING STYLE|PERSONALITY|EXPRESSION)\]/g;
export function generate(template, values, markers = MARKERS) {
  if (!template) throw new Error('O modelo ainda não foi configurado.');
  for (const key of markers) {
    if (!template.includes(`[${key}]`)) throw new Error(`O modelo original não contém [${key}]. Confira a fonte.`);
    if (typeof values[key] !== 'string' || !values[key].trim()) throw new Error('Preencha todos os campos do modo selecionado.');
    if (/\[[^\]\r\n]+\]/.test(values[key])) throw new Error('Os valores não podem conter marcadores entre colchetes.');
  }
  // Uma única passagem: os valores nunca são interpretados como texto de substituição.
  const result = template.replace(pattern, (_, key) => values[key].trim());
  if (/\[[A-Z][A-Z _]*\]/.test(result)) throw new Error('Há marcadores pendentes no prompt. Confira o modelo original.');
  return result;
}
