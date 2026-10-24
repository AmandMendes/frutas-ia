from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect
import mimetypes,json,os
root=Path(__file__).resolve().parents[1]
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=os.environ.get('BROWSER_EXECUTABLE_PATH') or None,headless=True,args=['--no-sandbox'])
 for width in [1280,390,320]:
  context=browser.new_context(viewport={'width':width,'height':900},is_mobile=width<500,has_touch=width<500)
  page=context.new_page();errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
  def serve(route):
   relative=urlparse(route.request.url).path.lstrip('/') or 'index.html'
   path=root/relative
   if path.is_file():route.fulfill(body=path.read_bytes(),content_type=mimetypes.guess_type(path.name)[0] or 'text/plain')
   else:route.fulfill(status=404,body='Not found')
  page.route('https://frutas-ia.test/**',serve)
  page.add_init_script("Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async text=>{window.__copied=text;}}});")
  page.goto('https://frutas-ia.test/');expect(page.locator('#generate')).to_be_enabled()
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),f'Overflow at {width}'
  # Both old creation modes still work, including translation and copy.
  for name,value in [('FRUIT','morango'),('PERSONALITY','vaidosa e fofoqueira'),('EXPRESSION','sorriso irônico')]:page.locator(f'[name="{name}"]').fill(value)
  for name,value in [('GENDER','female'),('AGE','adult'),('BODY TYPE','curvy'),('HAIRSTYLE','curly'),('CLOTHING STYLE','casual')]:page.locator(f'[name="{name}"]').select_option(value)
  page.locator('#generate').click()
  old=page.locator('#output').input_value();assert 'strawberry' in old and 'vain and gossipy' in old
  page.locator('#copy').click();assert page.evaluate('window.__copied')==old
  page.locator('#mode').select_option('base');page.locator('#generate').click();assert 'pure white background' in page.locator('#output').input_value()
  page.locator('#refinement-copy').click();assert page.evaluate('window.__copied').startswith('Use the attached image as the identity reference')
  # Each profile mode can generate before the image, with no required identity.
  page.locator('a[href="#personagem-hiper-realista"]').click()
  expect(page.locator('#hyper-title')).to_be_visible()
  assert page.locator('#hyper-body').input_value()==''
  page.locator('[name="hyper-profile-mode"][value="voice"]').check()
  page.locator('#hyper-trait').select_option('gentil')
  page.locator('#hyper-voice-generate').click()
  independent_voice=page.locator('#hyper-voice-output').input_value()
  assert independent_voice.startswith('Perfil gentil.') and '\n' not in independent_voice and len(independent_voice)<850
  page.locator('[name="hyper-profile-mode"][value="personality"]').check()
  page.locator('#hyper-trait').select_option('fofoqueiro')
  page.locator('#hyper-voice-generate').click()
  independent_personality=page.locator('#hyper-voice-output').input_value()
  assert 'PERSONAGEM: Livre' in independent_personality and 'confidência' in independent_personality
  page.locator('[name="hyper-profile-mode"][value="voice"]').check()
  assert page.locator('#hyper-voice-output').input_value()==independent_voice
  page.locator('#hyper-voice-copy').click();assert page.evaluate('window.__copied')==independent_voice
  page.locator('[name="hyper-profile-mode"][value="personality"]').check()
  assert page.locator('#hyper-voice-output').input_value()==independent_personality
  page.locator('#hyper-fruit').fill('morango');page.locator('#hyper-sex').select_option('Feminino')
  page.locator('#hyper-voice-generate').click();first=page.locator('#hyper-voice-output').input_value()
  assert 'SEXO: Feminino' in first and 'PERFIL: Fofoqueira' in first
  page.locator('#hyper-form button[type="submit"]').click();image=page.locator('#hyper-image-output').input_value()
  assert 'SEXO DO PERSONAGEM: Feminino' in image and 'TIPO DE CORPO:' not in image
  page.locator('#hyper-image-copy').click();assert page.evaluate('window.__copied')==image
  page.locator('#hyper-trait').select_option('barraqueiro')
  assert page.locator('#hyper-voice-output').input_value()==first
  assert 'última geração' in page.locator('#hyper-identity-notice').inner_text()
  page.locator('#hyper-voice-generate').click();second=page.locator('#hyper-voice-output').input_value();assert second!=first
  assert page.locator('#hyper-image-output').input_value()==image
  page.locator('[name="hyper-profile-mode"][value="voice"]').check()
  page.locator('#hyper-voice-generate').click();voice=page.locator('#hyper-voice-output').input_value()
  assert 'perfil barraqueira' in voice.lower() and '\n' not in voice
  assert page.locator('#hyper-image-output').input_value()==image
  page.locator('[name="hyper-profile-mode"][value="personality"]').check()
  assert page.locator('#hyper-voice-output').input_value()==second
  for body in ['Magro','Médio','Gordo','Musculoso']:
   page.locator('#hyper-body').select_option(body);expect(page.locator('#hyper-image-copy')).to_be_disabled()
   assert page.locator('#hyper-voice-output').input_value()==second
   page.locator('#hyper-form button[type="submit"]').click();assert f'TIPO DE CORPO: {body}' in page.locator('#hyper-image-output').input_value()
  page.locator('#hyper-body').select_option('');page.locator('#hyper-form button[type="submit"]').click();assert 'TIPO DE CORPO:' not in page.locator('#hyper-image-output').input_value()
  page.locator('#hyper-fruit').fill('pera');page.locator('#hyper-sex').select_option('Masculino')
  assert page.locator('#hyper-voice-output').input_value()==second
  assert 'última geração' in page.locator('#hyper-identity-notice').inner_text()
  page.locator('#hyper-voice-copy').click();assert page.evaluate('window.__copied')==second
  page.locator('#hyper-voice-generate').click();assert 'PERSONAGEM: pera' in page.locator('#hyper-voice-output').input_value() and 'SEXO: Masculino' in page.locator('#hyper-voice-output').input_value()
  # Manual-copy fallback selects the entire visible sheet.
  page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined})")
  page.locator('#hyper-voice-copy').click()
  assert page.locator('#hyper-voice-output').evaluate('(el)=>el.selectionStart===0 && el.selectionEnd===el.value.length')
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),f'Overflow after output at {width}'
  assert not errors,errors
  results.append({'viewport':width,'passed':True,'jsErrors':errors})
  context.close()
 browser.close()
print(json.dumps(results))
