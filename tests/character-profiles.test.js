import test from 'node:test';
import assert from 'node:assert/strict';
import { CHARACTER_PROFILES } from '../character-profiles.js';
import { generateCharacterProfile } from '../character-profile-generator.js';
import { SOTAQUES } from '../personality-data.js';

test('all requested traits have developed personalities and matching concise voice directions', () => {
  assert.deepEqual(CHARACTER_PROFILES.map(p=>p.id),['alegre','fofoqueiro','invejoso','machao','metido','esnobe','gentil','timido','extrovertido','rabugento','barraqueiro']);
  for(const profile of CHARACTER_PROFILES) {
    const personality=generateCharacterProfile({mode:'personality',profileId:profile.id});
    assert.ok(personality.text.includes(profile.story));
    assert.ok(profile.story.length>450);
    assert.ok(personality.text.includes(profile.acting));
    const voice=generateCharacterProfile({mode:'voice',profileId:profile.id},null,()=>0);
    assert.ok(!/[\r\n]/.test(voice.text));assert.ok(voice.text.length<850);
    for(const phrase of [profile.timbre,profile.intonation,profile.rhythm,'pt-BR','sem caricaturas'])assert.ok(voice.text.includes(phrase));
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
