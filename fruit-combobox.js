// Combobox local e editável: a lista sugere nomes, mas nunca restringe o valor.
export const FRUTAS = Object.freeze([
  'Laranja', 'Manga', 'Banana', 'Maçã', 'Morango', 'Melancia', 'Abacaxi',
  'Limão', 'Pera', 'Kiwi', 'Pitaya', 'Carambola', 'Maracujá', 'Coco',
  'Mamão', 'Goiaba', 'Acerola', 'Caju', 'Jabuticaba', 'Cereja', 'Pêssego',
  'Ameixa', 'Melão', 'Mirtilo', 'Abacate'
]);
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim();
export const filterFruits = query => FRUTAS.filter(fruit => normalize(fruit).includes(normalize(query)));

const input = typeof document === 'undefined' ? null : document.querySelector('#hyper-fruit');
if (input) {
  const wrapper = document.querySelector('#hyper-fruit-combobox');
  const list = document.querySelector('#hyper-fruit-list');
  const status = document.querySelector('#hyper-fruit-status');
  let matches = [], active = -1;
  const isOpen = () => input.getAttribute('aria-expanded') === 'true';
  function close() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  }
  function highlight(index) {
    active = index;
    for (const [i, option] of [...list.children].entries()) option.setAttribute('aria-selected', String(i === active));
    if (active < 0) input.removeAttribute('aria-activedescendant');
    else {
      const option = list.children[active];
      input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({block:'nearest'});
    }
  }
  function open() {
    matches = filterFruits(input.value); active = -1;
    list.replaceChildren();
    for (const fruit of matches) {
      const option = document.createElement('div');
      option.id = `hyper-fruit-option-${FRUTAS.indexOf(fruit)}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.textContent = fruit;
      option.addEventListener('click', () => {
        input.value = fruit;
        // Usa os mesmos eventos do campo anterior para atualizar os geradores.
        input.dispatchEvent(new Event('input', {bubbles:true}));
        input.dispatchEvent(new Event('change', {bubbles:true}));
        close(); input.focus({preventScroll:true}); close();
      });
      list.append(option);
    }
    list.hidden = matches.length === 0;
    input.setAttribute('aria-expanded', String(matches.length > 0));
    input.removeAttribute('aria-activedescendant');
    status.textContent = matches.length ? `${matches.length} sugestões disponíveis. Use as setas para navegar e Enter para selecionar.` : 'Nenhuma sugestão. Você pode usar o nome digitado normalmente.';
  }
  input.addEventListener('focus', open);
  input.addEventListener('click', open);
  input.addEventListener('input', open);
  input.addEventListener('keydown', event => {
    if (event.isComposing) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen()) open();
      if (!matches.length) return;
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      highlight(active < 0 ? (direction > 0 ? 0 : matches.length - 1) : (active + direction + matches.length) % matches.length);
    } else if (event.key === 'Enter') {
      if (isOpen() && active >= 0) { event.preventDefault(); list.children[active].click(); }
      else close(); // Sem opção ativa, mantém a submissão normal com texto livre.
    } else if (event.key === 'Escape') {
      if (isOpen()) event.preventDefault();
      close();
    } else if (event.key === 'Tab') close();
  });
  // Mantém o foco do textbox no mouse; no toque, permite rolar a lista.
  list.addEventListener('mousedown', event => event.preventDefault());
  document.addEventListener('pointerdown', event => { if (!wrapper.contains(event.target)) close(); });
  wrapper.addEventListener('focusout', event => { if (event.relatedTarget && !wrapper.contains(event.relatedTarget)) close(); });
}
