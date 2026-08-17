# ReVanced Troubleshooting & Recovery Manual — v3.1.0 Interactive

Manual técnico **não oficial e web-only** para diagnóstico de ReVanced Manager, APKs patched, patches, GmsCore e problemas de reprodução.

## Funcionalidades

- diagnóstico guiado por sintoma com deep-links;
- pesquisa por relevância, multi-palavra e tolerante a acentos;
- 35 capítulos expansíveis e navegação móvel por drawer;
- progresso global, “Continuar onde fiquei” e capítulos revistos;
- exportação/importação segura do progresso local em JSON;
- caso validado 0:55–1:00 com screenshots;
- comandos ADB/apksigner adaptados a PowerShell, CMD e Linux/macOS;
- modo claro/escuro e suporte a `prefers-reduced-motion`;
- tabs acessíveis por teclado e foco visível;
- impressão pelo navegador;
- PWA instalável com ícones, shortcuts e atualização controlada;
- funcionamento offline com Service Worker versionado.

## Publicar no GitHub Pages

1. Coloca estes ficheiros na raiz do repositório.
2. Faz commit/push.
3. Em **Settings → Pages**, escolhe **Deploy from a branch**.
4. Seleciona a branch principal e a pasta **/(root)**.
5. Guarda.

O site é uma aplicação web estática. Pode abrir localmente via `index.html`, mas Service Worker/PWA exigem HTTP/HTTPS.

## Desenvolvimento seguro

A v3.1.0 mantém `assets/manual-data.js` como fonte de conteúdo e separa comportamento/UI do conteúdo. Conteúdo dinâmico é escapado antes de entrar no DOM e links externos são restringidos a HTTPS/origem local.

Para validação antes de publicar:

```powershell
git diff --check
node --check .\assets\app.js
node --check .\sw.js
```

O pacote de atualização inclui `TESTAR_V3_1_0.ps1` para automatizar checks estáticos.

## Segurança

Usa apenas fontes ReVanced oficiais. O projeto ReVanced indica `revanced.app` como site oficial e publica avisos sobre sites falsos. Este repositório não deve distribuir APKs YouTube pré-patched.

Nunca sacrifiques Play Protect, 2FA, verificação de assinatura/versão ou outras proteções como “primeira correção”. Preserva logs e keystore antes de ações destrutivas.

## Licença e atribuição

Esta edição técnica é independente e inclui referências para documentação oficial do ReVanced e Android. Se adaptares conteúdo diretamente de projetos GPL, preserva a licença e a atribuição aplicáveis.

ReVanced, YouTube, Android e restantes marcas pertencem aos respetivos titulares.

## Formato do projeto

Este repositório é uma aplicação web estática. **Não inclui PDF** e não depende de PDF para funcionar.

## v3.1.0 — UX, PWA, acessibilidade e manutenção

- menu móvel real;
- pesquisa avançada;
- progresso global + export/import;
- comandos por terminal;
- PWA instalável e atualização offline controlada;
- acessibilidade de tabs/foco/reduced-motion;
- hardening de links dinâmicos e storage;
- correção do comando de pesquisa de packages para PowerShell/CMD.
