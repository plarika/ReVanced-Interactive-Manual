# ReVanced Troubleshooting & Recovery Manual — v3.0.1 Interactive

Manual técnico **não oficial e web-only** para diagnóstico de ReVanced Manager, APKs patched, patches, GmsCore e problemas de reprodução.

## Funcionalidades

- diagnóstico guiado por sintoma;
- pesquisa instantânea nos 35 capítulos;
- capítulos expansíveis e deep-links;
- checklists com progresso guardado localmente;
- caso validado 0:55–1:00 com screenshots;
- comandos ADB/apksigner copiáveis;
- modo claro/escuro;
- impressão pelo navegador, se o utilizador quiser;
- PWA/offline quando publicado por HTTPS;

## Publicar no GitHub Pages

1. Cria um repositório e coloca estes ficheiros na raiz.
2. Faz commit/push.
3. Em **Settings → Pages**, escolhe **Deploy from a branch**.
4. Seleciona a branch principal e a pasta **/(root)**.
5. Guarda. O site passa a ser servido pelo GitHub Pages.

Também pode ser aberto localmente através de `index.html`. O Service Worker/PWA só funciona quando servido por HTTP/HTTPS.

## Segurança

Usa apenas fontes ReVanced oficiais. O projeto ReVanced indica `revanced.app` como site oficial e publica um aviso específico sobre sites falsos. Este repositório não deve distribuir APKs YouTube pré-patched.

## Licença e atribuição

Esta edição técnica é independente e inclui referências para documentação oficial do ReVanced e Android. Se adaptares conteúdo diretamente de projetos GPL, preserva a licença e a atribuição aplicáveis.

ReVanced, YouTube, Android e restantes marcas pertencem aos respetivos titulares.


## Formato do projeto

Este repositório é uma aplicação web estática. **Não inclui PDF** e não depende de PDF para funcionar.
O conteúdo é servido diretamente por `index.html`, JavaScript, CSS e dados locais.


## v3.0.1 — atualização de dados (16/08/2026)

Foi adicionada a área **Relatórios atuais**, com triagem de issues recentes do repositório oficial ReVanced Manager.  
Os relatos são classificados por estado, força da evidência e nível de confirmação. Workarounds comunitários não são tratados como fixes oficiais.
