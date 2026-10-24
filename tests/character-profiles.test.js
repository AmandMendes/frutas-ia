import test from 'node:test';
import assert from 'node:assert/strict';
import { CHARACTER_PROFILES } from '../character-profiles.js';
import { generateCharacterProfile } from '../character-profile-generator.js';
import { SOTAQUES } from '../personality-data.js';

test('all requested traits have developed personalities and matching concise voice directions', () => {
  assert.deepEqual(CHARACTER_PROFILES.map(p=>p.id),['alegre','fofoqueiro','invejoso','machao','metido','esnobe','gentil','timido','extrovertido','rabugento','barraqueiro','lunatico','antissocial','misterioso','espirito-de-porco','pick-me-girl','afeminado','asmr']);
  for(const profile of CHARACTER_PROFILES.filter(profile=>!profile.voiceOnly)) {
    const personality=generateCharacterProfile({mode:'personality',profileId:profile.id});
    assert.ok(personality.text.includes(profile.story));
    assert.ok(profile.story.length>450);
    assert.ok(personality.text.includes(profile.acting));
    const voice=generateCharacterProfile({mode:'voice',profileId:profile.id},null,()=>0);
    assert.ok(!/[\r\n]/.test(voice.text));assert.ok(voice.text.length<850);
    assert.ok(!/sem caricaturas|sem exagero teatral|sem exagero caricatural|interpretação realista/i.test(voice.text));
    for(const phrase of [profile.timbre,profile.intonation,profile.rhythm,'pt-BR','Interpretação caricata e cômica'])assert.ok(voice.text.includes(phrase));
  }
});
test('both options work independently without fruit, sex, visual prompt or other output', () => {
  const voice=generateCharacterProfile({mode:'voice',profileId:'gentil'},null,()=>0.9);
  const personality=generateCharacterProfile({mode:'personality',profileId:'gentil'},null,()=>{throw Error('Personality must not draw voice');});
  assert.ok(voice.text.startsWith('Perfil gentil.'));
  assert.ok(personality.text.includes('PERSONAGEM: Livre'));
  assert.equal(personality.accent,null);
});
test('accent is independent from trait and immediate repeated accent is avoided', () => {
  for(const profile of CHARACTER_PROFILES) {
    const first=generateCharacterProfile({mode:'voice',profileId:profile.id},null,()=>0);
    assert.equal(first.accent,SOTAQUES[0]);
    const next=generateCharacterProfile({mode:'voice',profileId:profile.id},first,()=>0);
    assert.notEqual(next.accent,first.accent);
  }
});
test('optional identity, gender flexion, validation and continuous custom names', () => {
  const p=generateCharacterProfile({mode:'personality',profileId:'metido',fruta:'Rambutã',sexo:'Feminino'});
  assert.ok(p.text.includes('PERFIL: Metida'));assert.ok(p.text.includes('PERSONAGEM: Rambutã'));
  const voice=generateCharacterProfile({mode:'voice',profileId:'fofoqueiro',fruta:'pera\nvermelha',sexo:'Masculino'},null,()=>0);
  assert.ok(!voice.text.includes('\n'));assert.ok(voice.text.includes('Voz masculina.'));
  assert.throws(()=>generateCharacterProfile({mode:'voice',profileId:''}));
  assert.throws(()=>generateCharacterProfile({mode:'invalid',profileId:'gentil'}));
});

test('ASMR is voice-only, quiet and continuous, overriding caricature instructions', () => {
  const voice=generateCharacterProfile({mode:'voice',profileId:'asmr'},null,()=>0);
  assert.ok(!/[\r\n]/.test(voice.text));
  for(const phrase of ['volume muito baixo','quase um sussurro','lento, calmo e pausado','relaxante','pt-BR']) assert.ok(voice.text.includes(phrase));
  assert.ok(!/caricata|cômica|exagero vocal|bem marcado/.test(voice.text));
  assert.ok(voice.text.length<850);
  assert.throws(()=>generateCharacterProfile({mode:'personality',profileId:'asmr'}), /apenas em Gerar estilo de voz/);
});
