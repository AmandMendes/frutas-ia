# 🍓 Frutas IA

Gerador estático em HTML, CSS e JavaScript, sem dependências de produção.

## Modos de criação

- **Personagem Personalizado | Mestre 3.0**: oito campos, com o modelo existente intacto.
- **Personagem-Base | Mestre 3.1**: somente fruta, gênero, idade e tipo de corpo. Roupa, cabelo, expressão, pose frontal e fundo branco permanecem fixos.

O seletor alterna os campos e a visualização do original. Campos ocultos são desativados e não participam da geração ou validação. Trocar de modo invalida o resultado e bloqueia sua cópia até gerar novamente. O Mestre 3.1 está em `PROMPT_MESTRE_V31`, no arquivo `prompt-mestre-v31.js`, com cópia de referência em `prompt-mestre-v31-original.txt`.

## Modelo e idioma

O Prompt Mestre 3.0 está integralmente em `PROMPT_MESTRE_V3`, em `prompt-mestre.js`. Incluímos exatamente o texto fornecido, com o prefixo `[PROMPT MESTRE 3.0:`, o colchete final e os espaços duplos. A cópia de referência em `prompt-mestre-original.txt` permite conferir sua integridade. Somente os oito marcadores são substituídos, em uma única passagem. Todas as ocorrências de `[FRUIT]` são preenchidas.

A interface é em português e as seleções têm valores em inglês. Preencha os campos livres e personalizados em inglês. O site não tem tradução automática: não promete detectar ou traduzir texto arbitrário. Para aceitar português nesses campos, será necessário integrar um serviço de tradução por meio de backend, sem expor credenciais no GitHub Pages.

Os resultados usam texto simples, sem interpretar HTML. Alterar um campo invalida o prompt anterior. Antes da cópia, os campos e o resultado são revalidados.

## Testar localmente

Execute `python3 -m http.server 8000` nesta pasta e abra `http://localhost:8000`. Não abra o HTML por `file://`, pois ele utiliza módulos JavaScript. Para os testes automatizados, execute `npm test` com Node.js 22 ou superior.

## Criar o repositório e publicar — sem terminal

1. Entre no GitHub e clique em **+ → New repository**.
2. Use o nome **frutas-ia**, selecione **Public** e clique em **Create repository**.
3. Na página do repositório, use **uploading an existing file** ou **Add file → Upload files**.
4. Extraia o ZIP. Arraste os arquivos da pasta `frutas-ia` para o upload, sem a pasta externa. O `index.html` precisa ficar na raiz do repositório. Para este método não é necessário enviar a pasta oculta `.github`.
5. Clique em **Commit changes** na branch `main`.
6. Abra **Settings → Pages**. Em **Source**, selecione **Deploy from a branch**. Escolha **main** e **/ (root)**, depois **Save**.
7. Aguarde o GitHub concluir a publicação. A URL aparecerá nessa tela: `https://SEU-USUARIO.github.io/frutas-ia/`.

Após mudar os arquivos e salvar um novo commit na `main`, o GitHub atualizará o site automaticamente. O texto do modelo é público, assim como os outros arquivos deste site estático.

## Alternativa: publicar usando GitHub Actions

O pacote também inclui `.github/workflows/pages.yml`. Envie todos os arquivos, incluindo a pasta oculta `.github`, para a branch `main`. Em **Settings → Pages → Source**, selecione **GitHub Actions**. Em **Actions**, execute “Publicar no GitHub Pages”. Esse fluxo executa os testes e publica somente os arquivos necessários ao site. Utilize apenas um dos dois métodos de publicação.

O projeto não foi enviado nem publicado em uma conta GitHub. A criação do repositório e a publicação serão feitas por você conforme o guia acima.
