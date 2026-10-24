import { CHARACTER_PROFILES } from './character-profiles.js';
import { SOTAQUES } from './personality-data.js';

const compact = text => String(text || '').replace(/\s+/g, ' ').trim();
export function generateCharacterProfile({mode, profileId, fruta = '', sexo = ''}, previous = null, random = Math.random) {
  const profile = CHARACTER_PROFILES.find(item => item.id === profileId);
  if (!profile) throw new Error('Selecione uma personalidade predefinida.');
  if (!['personality','voice'].includes(mode)) throw new Error('Selecione o tipo de geração.');
  const identity = {fruta:compact(fruta), sexo:['Feminino','Masculino'].includes(sexo) ? sexo : ''};
  const label = profile.labels[identity.sexo === 'Feminino' ? 1 : 0];
  const context = identity.fruta ? `PERSONAGEM: ${identity.fruta}` : 'PERSONAGEM: Livre';
  const gender = identity.sexo ? `\nSEXO: ${identity.sexo}` : '';
  let text, accent = null;
  if (mode === 'personality') {
    // Perfil narrativo predefinido; não depende de sorteio vocal ou imagem.
    text = `${context}${gender}\n\nPERFIL: ${label}\n\nPERSONALIDADE E COMPORTAMENTO\n\n${profile.story}\n\nDIREÇÃO DE INTERPRETAÇÃO\n\n${profile.acting} Preserve a aparência do personagem; expresse estes traços por meio de atitudes, escolhas e reações naturais.`;
  } else {
    // Região e personalidade não são associadas. Somente o sotaque varia.
    const value = random();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new Error('Falha ao gerar o sotaque. Tente novamente.');
    let index = Math.floor(value * SOTAQUES.length);
    if (previous?.accent === SOTAQUES[index]) index = (index + 1) % SOTAQUES.length;
    accent = SOTAQUES[index];
    text = compact(`${identity.fruta ? `Personagem: ${identity.fruta}. ` : ''}${identity.sexo ? `Voz ${identity.sexo === 'Feminino' ? 'feminina' : 'masculina'}. ` : ''}Perfil ${label.toLowerCase()}. Falar exclusivamente em português brasileiro nativo (pt-BR), com sotaque ${accent.replace(/\.$/,'')}, bem marcado e reconhecível. Timbre ${profile.timbre}; entonação ${profile.intonation}; ritmo ${profile.rhythm}. Interpretação caricata e cômica, com exagero vocal ligado ao perfil, contrastes de entonação e pausas expressivas. Manter voz consistente e fala compreensível.`);
  }
  return {...identity, mode, profileId, label, text, accent};
}
