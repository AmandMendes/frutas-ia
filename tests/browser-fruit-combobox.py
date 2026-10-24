"""Teste opcional de navegador: requer Playwright para Python e Chromium."""
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect
import mimetypes, json, os
root = Path(__file__).resolve().parents[1]
results = []
with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.environ.get('BROWSER_EXECUTABLE_PATH') or None, headless=True, args=['--no-sandbox'])
    for width in [1280, 390, 320]:
        context = browser.new_context(viewport={'width': width, 'height': 900}, is_mobile=width < 500, has_touch=width < 500)
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        def serve(route):
            path = root / (urlparse(route.request.url).path.lstrip('/') or 'index.html')
            if path.is_file():
                route.fulfill(body=path.read_bytes(), content_type=mimetypes.guess_type(path.name)[0] or 'text/plain')
            else:
                route.fulfill(status=404, body='Not found')
        page.route('https://frutas-ia.test/**', serve)
        page.add_init_script("Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.__copied=text;}}});")
        page.goto('https://frutas-ia.test/')
        page.locator('a[href="#personagem-hiper-realista"]').click()
        field = page.locator('#hyper-fruit')
        field.click()
        expect(field).to_have_attribute('role', 'combobox')
        expect(field).to_have_attribute('aria-expanded', 'true')
        expect(page.locator('#hyper-fruit-list').get_by_role('option')).to_have_count(25)
        # Ponteiros: mouse no desktop, toque nos dois tamanhos móveis.
        option = page.locator('#hyper-fruit-list').get_by_role('option', name='Morango', exact=True)
        option.tap() if width < 500 else option.click()
        expect(field).to_have_value('Morango')
        expect(field).to_have_attribute('aria-expanded', 'false')
        expect(page.locator('#hyper-shared-identity')).to_contain_text('Morango')
        page.locator('#hyper-sex').select_option('Feminino')
        page.locator('#hyper-form button[type="submit"]').click()
        assert 'FRUTA ESCOLHIDA: Morango' in page.locator('#hyper-image-output').input_value()
        page.locator('#hyper-voice-generate').click()
        assert 'PERSONAGEM: Morango' in page.locator('#hyper-voice-output').input_value()
        # Filtragem e seleção com teclado não submetem o formulário.
        field.fill('mora')
        expect(page.locator('#hyper-fruit-list').get_by_role('option')).to_have_count(1)
        expect(page.locator('#hyper-fruit-list').get_by_role('option')).to_have_text('Morango')
        field.press('ArrowDown')
        active_id = field.get_attribute('aria-activedescendant')
        expect(page.locator('#' + active_id)).to_have_attribute('aria-selected', 'true')
        field.press('Enter')
        expect(field).to_have_value('Morango')
        expect(page.locator('#hyper-image-copy')).to_be_disabled()
        field.fill('MACA')
        expect(page.locator('#hyper-fruit-list').get_by_role('option')).to_have_text('Maçã')
        field.press('ArrowDown'); field.press('Enter')
        expect(field).to_have_value('Maçã')
        field.fill('limao')
        expect(page.locator('#hyper-fruit-list').get_by_role('option')).to_have_text('Limão')
        field.press('Escape')
        expect(field).to_have_value('limao')
        expect(field).to_have_attribute('aria-expanded', 'false')
        field.fill(''); field.press('ArrowUp'); field.press('Enter')
        expect(field).to_have_value('Abacate')
        # Texto livre não precisa pertencer à lista; Enter continua gerando o prompt.
        field.fill('Rambutã')
        expect(field).to_have_attribute('aria-expanded', 'false')
        expect(page.locator('#hyper-fruit-status')).to_contain_text('Nenhuma sugestão')
        field.press('Enter')
        assert 'FRUTA ESCOLHIDA: Rambutã' in page.locator('#hyper-image-output').input_value()
        page.locator('#hyper-voice-again').click()
        assert 'PERSONAGEM: Rambutã' in page.locator('#hyper-voice-output').input_value()
        page.locator('#hyper-image-copy').click()
        assert page.evaluate('window.__copied') == page.locator('#hyper-image-output').input_value()
        page.locator('#hyper-voice-copy').click()
        assert page.evaluate('window.__copied') == page.locator('#hyper-voice-output').input_value()
        field.fill('mora'); field.press('Tab')
        expect(field).to_have_attribute('aria-expanded', 'false')
        expect(page.locator('#hyper-sex')).to_be_focused()
        field.click()
        page.locator('#hyper-image-title').click()
        expect(field).to_have_attribute('aria-expanded', 'false')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert not errors, errors
        results.append({'viewport': width, 'passed': True, 'javascriptErrors': errors})
        context.close()
    browser.close()
print(json.dumps(results))
