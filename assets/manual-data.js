window.MANUAL_DATA = {
  "meta": {
    "title": "ReVanced Troubleshooting & Recovery Manual",
    "version": "3.0.1 Interactive",
    "baseline": "2.0 PDF",
    "reviewed": "2026-08-19 08:25 Europe/Lisbon",
    "language": "pt-PT",
    "disclaimer": "Edição técnica independente, não afiliada ao projeto ReVanced, Google ou YouTube.",
    "lastIssueCheck": "2026-08-19T08:25:00+01:00"
  },
  "chapters": [
    {
      "id": 0,
      "title": "Como usar este manual",
      "text": "Começa pelo triage rápido. Depois salta para o capítulo da fase onde a falha ocorre. O manual foi\ndesenhado como runbook, não como uma sequência obrigatória de leitura.\n\nSe o sintoma é...                                             Vai primeiro para...\n\nManager não instala / não abre                                4 - Instalação do Manager; 11 - crashes\n\nPatches não aparecem / não carregam                           7 - fontes e salvaguardas; 9 - dependências\n\nPatch falha durante build                                     8 - APK e compatibilidade; 10 - memória/build\n\nAPK patched não instala                                       12 - assinatura, package e versionCode\n\nLogin/GmsCore falha                                           14 - GmsCore e autenticação\n\nVídeo pausa, bufferiza ou dá erro                             16-18 - playback e Spoof video streams\n\nProblema começou após update                                  25 - atualização e rollback\n\nNada resulta                                                  26 - recuperação total; 27 - logs/ADB\n\n\n REGRA OPERACIONAL\n Muda uma variável de cada vez. Se alterares APK, seleção de patches, cliente spoof, rede e GmsCore\n simultaneamente, deixas de saber qual alteração resolveu ou introduziu o problema.\n\n\nNíveis de confiança usados\nEtiqueta                                                      Significado\n\nOFICIAL                                                       Comportamento ou procedimento documentado pelo projeto\n                                                              ReVanced/Android.\n\nWORKAROUND                                                    Solução plausível ou recorrente, mas dependente de\n                                                              versão/dispositivo.\n\nCASO VALIDADO                                                 Foi observado e testado no dispositivo usado para este\n                                                              manual; não é garantia universal.",
      "search": "como usar este manual\ncomeça pelo triage rápido. depois salta para o capítulo da fase onde a falha ocorre. o manual foi\ndesenhado como runbook, não como uma sequência obrigatória de leitura.\n\nse o sintoma é...                                             vai primeiro para...\n\nmanager não instala / não abre                                4 - instalação do manager; 11 - crashes\n\npatches não aparecem / não carregam                           7 - fontes e salvaguardas; 9 - dependências\n\npatch falha durante build                                     8 - apk e compatibilidade; 10 - memória/build\n\napk patched não instala                                       12 - assinatura, package e versioncode\n\nlogin/gmscore falha                                           14 - gmscore e autenticação\n\nvídeo pausa, bufferiza ou dá erro                             16-18 - playback e spoof video streams\n\nproblema começou após update                                  25 - atualização e rollback\n\nnada resulta                                                  26 - recuperação total; 27 - logs/adb\n\n\n regra operacional\n muda uma variável de cada vez. se alterares apk, seleção de patches, cliente spoof, rede e gmscore\n simultaneamente, deixas de saber qual alteração resolveu ou introduziu o problema.\n\n\nníveis de confiança usados\netiqueta                                                      significado\n\noficial                                                       comportamento ou procedimento documentado pelo projeto\n                                                              revanced/android.\n\nworkaround                                                    solução plausível ou recorrente, mas dependente de\n                                                              versão/dispositivo.\n\ncaso validado                                                 foi observado e testado no dispositivo usado para este\n                                                              manual; não é garantia universal."
    },
    {
      "id": 1,
      "title": "Diagnóstico em 5 minutos",
      "text": "O objetivo inicial não é corrigir: é localizar a fronteira da falha.\n1. Confirma que o ReVanced Manager veio de revanced.app/download ou do repositório oficial. [R1][R12]\n2. Confirma Android 8.0 (Oreo) ou superior, requisito oficial do Manager. [R2]\n3. Em Settings > Advanced, repõe as salvaguardas para defaults antes de diagnosticar. [R4][R5]\n4. Usa a versão sugerida da aplicação e um APK completo, não um bundle/split, salvo se souberes exatamente o formato\n   que estás a fornecer. [R3][R5]\n5. No seletor de patches, usa Reset/default. A documentação recomenda o conjunto predefinido. [R3]\n6. Se o erro acontece antes de \"Applying patches\", investiga fontes/seleção; GmsCore ainda não é a causa provável.\n7. Se o APK patched instala mas a app falha em login, investiga GmsCore/autenticação.\n8. Se a app abre e o problema é vídeo, investiga playback/Spoof video streams e só depois rede/bateria.\n9. Se o problema persiste, exporta logs antes de limpar dados ou reinstalar tudo. [R4][R7]\n\n Fase                                    Indicador                                        Primeira hipótese\n\n\nCarregar patches                         erro \"Patch ... does not exist\" / fonte          seleção, dependência, fonte ou API de\n                                         indisponível                                     patches\n\nPatching                                 erro durante transformação/compilação            versão incompatível, opção de patch,\n                                                                                          memória, bundle\n\nSigning                                  termina build mas update falha                   keystore/certificado diferente\n\nInstall                                  \"App not installed\" / downgrade                  assinatura, package, versionCode, perfil\n\nRuntime                                  crash ao abrir                                   patch/configuração/app/OS\n\nAuth                                     não entra na conta                               GmsCore, versão, conta/rede\n\nPlayback                                 buffer, 403, pausa ~1:00                         Spoof video streams/cliente, patches\n                                                                                          desatualizados",
      "search": "diagnóstico em 5 minutos\no objetivo inicial não é corrigir: é localizar a fronteira da falha.\n1. confirma que o revanced manager veio de revanced.app/download ou do repositório oficial. [r1][r12]\n2. confirma android 8.0 (oreo) ou superior, requisito oficial do manager. [r2]\n3. em settings > advanced, repõe as salvaguardas para defaults antes de diagnosticar. [r4][r5]\n4. usa a versão sugerida da aplicação e um apk completo, não um bundle/split, salvo se souberes exatamente o formato\n   que estás a fornecer. [r3][r5]\n5. no seletor de patches, usa reset/default. a documentação recomenda o conjunto predefinido. [r3]\n6. se o erro acontece antes de \"applying patches\", investiga fontes/seleção; gmscore ainda não é a causa provável.\n7. se o apk patched instala mas a app falha em login, investiga gmscore/autenticação.\n8. se a app abre e o problema é vídeo, investiga playback/spoof video streams e só depois rede/bateria.\n9. se o problema persiste, exporta logs antes de limpar dados ou reinstalar tudo. [r4][r7]\n\n fase                                    indicador                                        primeira hipótese\n\n\ncarregar patches                         erro \"patch ... does not exist\" / fonte          seleção, dependência, fonte ou api de\n                                         indisponível                                     patches\n\npatching                                 erro durante transformação/compilação            versão incompatível, opção de patch,\n                                                                                          memória, bundle\n\nsigning                                  termina build mas update falha                   keystore/certificado diferente\n\ninstall                                  \"app not installed\" / downgrade                  assinatura, package, versioncode, perfil\n\nruntime                                  crash ao abrir                                   patch/configuração/app/os\n\nauth                                     não entra na conta                               gmscore, versão, conta/rede\n\nplayback                                 buffer, 403, pausa ~1:00                         spoof video streams/cliente, patches\n                                                                                          desatualizados"
    },
    {
      "id": 2,
      "title": "Arquitetura mental do ReVanced",
      "text": "ReVanced Manager é a interface; o Patcher aplica transformações; o APK resultante é assinado e\ndepois instalado. Separar estes componentes evita diagnósticos errados.\n\nComponente                              Função                                        Quando suspeitar\n\n\nReVanced Manager                       UI, fontes, downloader, seleção, signing,      crash do Manager, patches não carregam,\n                                       instalação                                     import/export\n\nReVanced Patcher                       aplica patches ao APK                          exceção durante patching, incompatibilidades\n\nReVanced Patches                       regras de modificação por app/versão           feature ausente, patch incompatível, playback\n\nAPK de origem                          binário base a modificar                       bundle/split, versão errada, APK adulterado\n\nKeystore                               assina APK patched                             update recusado por assinatura diferente\n\nGmsCore                                compatibilidade Google em cenários non-root    login, conta, notificações/integração\n                                       que usam GmsCore support\n\nAndroid                                instalação, package manager, bateria, rede,    App not installed, background, PiP, vendor\n                                       permissões                                     restrictions\n\n\n PONTO CRÍTICO\n O mesmo sintoma final pode ter origem em fases diferentes. \"YouTube não funciona\" é informação insuficiente; \"patch\n terminou, APK instalou, app abre, vídeo pára a 0:55\" já localiza a falha no playback.",
      "search": "arquitetura mental do revanced\nrevanced manager é a interface; o patcher aplica transformações; o apk resultante é assinado e\ndepois instalado. separar estes componentes evita diagnósticos errados.\n\ncomponente                              função                                        quando suspeitar\n\n\nrevanced manager                       ui, fontes, downloader, seleção, signing,      crash do manager, patches não carregam,\n                                       instalação                                     import/export\n\nrevanced patcher                       aplica patches ao apk                          exceção durante patching, incompatibilidades\n\nrevanced patches                       regras de modificação por app/versão           feature ausente, patch incompatível, playback\n\napk de origem                          binário base a modificar                       bundle/split, versão errada, apk adulterado\n\nkeystore                               assina apk patched                             update recusado por assinatura diferente\n\ngmscore                                compatibilidade google em cenários non-root    login, conta, notificações/integração\n                                       que usam gmscore support\n\nandroid                                instalação, package manager, bateria, rede,    app not installed, background, pip, vendor\n                                       permissões                                     restrictions\n\n\n ponto crítico\n o mesmo sintoma final pode ter origem em fases diferentes. \"youtube não funciona\" é informação insuficiente; \"patch\n terminou, apk instalou, app abre, vídeo pára a 0:55\" já localiza a falha no playback."
    },
    {
      "id": 3,
      "title": "Segurança e cadeia de confiança",
      "text": "O risco maior não é o patch em si; é perder a rastreabilidade da origem do Manager, patches, APK\nbase, GmsCore e assinatura.\n\n3.1 Fontes oficiais\n • Manager: revanced.app/download ou releases do repositório oficial. [R1][R12]\n • Documentação: repositórios oficiais ReVanced e anúncios em revanced.app. [R6][R10]\n • GmsCore: quando o patch GmsCore support está presente, a aplicação pode redirecionar para o download apropriado.\n   [R7]\n • Patches externos: o Manager v2 permite múltiplas fontes, mas isso não transforma patches terceiros em suporte oficial.\n   [R8]\n\n  NÃO FAZER\n  Não desatives Play Protect, verificação de versões, 2FA ou outras proteções como primeira tentativa. Se uma ação\n  reduzir segurança, deve ser temporária, justificada e revertida.\n\n\n3.2 Keystore e atualizações\nO Android exige consistência de application ID, assinatura e versionCode para uma atualização normal. Uma build\nassinada com uma chave diferente pode ser recusada mesmo que o package seja idêntico. O Manager permite\nimportar/exportar o signing keystore; guarda-o de forma segura. [R4][R13]\n\n  BACKUP RECOMENDADO\n  Exporta o keystore e as configurações importantes antes de migrar de dispositivo, limpar dados do Manager ou\n  experimentar uma nova instalação. Perder a chave pode obrigar a desinstalar a app patched para instalar uma build\n  assinada com outra chave.",
      "search": "segurança e cadeia de confiança\no risco maior não é o patch em si; é perder a rastreabilidade da origem do manager, patches, apk\nbase, gmscore e assinatura.\n\n3.1 fontes oficiais\n • manager: revanced.app/download ou releases do repositório oficial. [r1][r12]\n • documentação: repositórios oficiais revanced e anúncios em revanced.app. [r6][r10]\n • gmscore: quando o patch gmscore support está presente, a aplicação pode redirecionar para o download apropriado.\n   [r7]\n • patches externos: o manager v2 permite múltiplas fontes, mas isso não transforma patches terceiros em suporte oficial.\n   [r8]\n\n  não fazer\n  não desatives play protect, verificação de versões, 2fa ou outras proteções como primeira tentativa. se uma ação\n  reduzir segurança, deve ser temporária, justificada e revertida.\n\n\n3.2 keystore e atualizações\no android exige consistência de application id, assinatura e versioncode para uma atualização normal. uma build\nassinada com uma chave diferente pode ser recusada mesmo que o package seja idêntico. o manager permite\nimportar/exportar o signing keystore; guarda-o de forma segura. [r4][r13]\n\n  backup recomendado\n  exporta o keystore e as configurações importantes antes de migrar de dispositivo, limpar dados do manager ou\n  experimentar uma nova instalação. perder a chave pode obrigar a desinstalar a app patched para instalar uma build\n  assinada com outra chave."
    },
    {
      "id": 4,
      "title": "Instalação limpa do ReVanced Manager",
      "text": "Procedimento seguro para começar de um estado conhecido.\n1. Confirma Android 8.0 ou superior. [R2]\n2. Obtém o Manager apenas no canal oficial. [R1]\n3. Instala o APK do Manager.\n4. Abre Settings > Updates e mantém o canal estável para uso diário, salvo necessidade explícita de pré-release. O\n   Manager verifica updates automaticamente por defeito. [R9]\n5. Em Settings > Advanced, mantém as salvaguardas nos valores padrão.\n6. Não adiciones fontes externas de patches durante a instalação base.\n7. Só depois testa o primeiro patch com defaults.\n\n PRÉ-RELEASE\n Uma pré-release pode conter correções novas mas também regressões. A página de releases oficial mostrava builds\n 2.7.0-dev.* em julho de 2026; para uso normal, segue o canal oficial estável apresentado pelo Manager/site, em vez de\n fixar manualmente uma dev build. [R12]",
      "search": "instalação limpa do revanced manager\nprocedimento seguro para começar de um estado conhecido.\n1. confirma android 8.0 ou superior. [r2]\n2. obtém o manager apenas no canal oficial. [r1]\n3. instala o apk do manager.\n4. abre settings > updates e mantém o canal estável para uso diário, salvo necessidade explícita de pré-release. o\n   manager verifica updates automaticamente por defeito. [r9]\n5. em settings > advanced, mantém as salvaguardas nos valores padrão.\n6. não adiciones fontes externas de patches durante a instalação base.\n7. só depois testa o primeiro patch com defaults.\n\n pré-release\n uma pré-release pode conter correções novas mas também regressões. a página de releases oficial mostrava builds\n 2.7.0-dev.* em julho de 2026; para uso normal, segue o canal oficial estável apresentado pelo manager/site, em vez de\n fixar manualmente uma dev build. [r12]"
    },
    {
      "id": 5,
      "title": "APK, split APK, APKM, XAPK e versão sugerida",
      "text": "Muitos erros de patching começam antes do patcher: o input não é o ficheiro que o utilizador pensa\nque é.\n\n5.1 APK completo vs bundles\nA documentação do Manager recomenda um full APK e lista bundles como causa comum de falha. No Android moderno, a\nPlay Store pode instalar múltiplos split APKs que funcionam como uma única app. Um ficheiro .apkm/.xapk/.apks é um\ncontentor/conjunto, não o mesmo que um APK completo patchável. [R5][R14]\n\n Formato                                Interpretação prática                         Uso no diagnóstico\n\n .apk                                   ficheiro instalável; pode ser full APK ou     preferir full APK compatível\n                                        uma parte split\n\n .apkm / .xapk                          contentor de vários APKs/recursos             não tratar como full APK direto\n\n .apks                                  APK set gerado por bundletool                 conjunto de splits; não é um APK único\n\n .aab                                   formato de publicação                         não é instalável diretamente no Android\n\n\n5.2 Versão sugerida\nPor defeito, o Manager pode impor a versão sugerida com base nos patches selecionados. Desativar essa salvaguarda\npermite versões não explicitamente compatíveis, mas a documentação avisa que patches podem falhar ou ser omitidos.\n[R4]\n\n  REGRA\n  Quando estás a resolver um erro, não combines \"APK não sugerido\" com \"patches personalizados\". Volta primeiro à\n  versão sugerida + seleção default. Depois introduz uma alteração de cada vez.",
      "search": "apk, split apk, apkm, xapk e versão sugerida\nmuitos erros de patching começam antes do patcher: o input não é o ficheiro que o utilizador pensa\nque é.\n\n5.1 apk completo vs bundles\na documentação do manager recomenda um full apk e lista bundles como causa comum de falha. no android moderno, a\nplay store pode instalar múltiplos split apks que funcionam como uma única app. um ficheiro .apkm/.xapk/.apks é um\ncontentor/conjunto, não o mesmo que um apk completo patchável. [r5][r14]\n\n formato                                interpretação prática                         uso no diagnóstico\n\n .apk                                   ficheiro instalável; pode ser full apk ou     preferir full apk compatível\n                                        uma parte split\n\n .apkm / .xapk                          contentor de vários apks/recursos             não tratar como full apk direto\n\n .apks                                  apk set gerado por bundletool                 conjunto de splits; não é um apk único\n\n .aab                                   formato de publicação                         não é instalável diretamente no android\n\n\n5.2 versão sugerida\npor defeito, o manager pode impor a versão sugerida com base nos patches selecionados. desativar essa salvaguarda\npermite versões não explicitamente compatíveis, mas a documentação avisa que patches podem falhar ou ser omitidos.\n[r4]\n\n  regra\n  quando estás a resolver um erro, não combines \"apk não sugerido\" com \"patches personalizados\". volta primeiro à\n  versão sugerida + seleção default. depois introduz uma alteração de cada vez."
    },
    {
      "id": 6,
      "title": "Fluxo de patching canónico",
      "text": "O fluxo oficial é curto. O valor deste capítulo está nos checkpoints entre etapas.\n1. Apps > seleciona a aplicação ou \"select from storage\". [R3]\n2. Confirma versão e origem do APK.\n3. Mantém patches default; o próprio manual do Manager recomenda Reset/default. [R3]\n4. Se necessário, escolhe downloader/fonte conhecida. [R3]\n5. Inicia Patch.\n6. Lê a primeira exceção relevante; não te prendas às últimas linhas genéricas de coroutines.\n7. No fim, instala ou exporta o APK com o botão de guardar. [R3]\n8. Depois da instalação, valida arranque, login e função principal antes de personalizar dezenas de opções.\n\n CHECKPOINT\n Guarda o APK patched que passou no teste, juntamente com versão do APK base, data, versão do Manager e seleção\n de patches. Isto cria uma baseline de rollback.",
      "search": "fluxo de patching canónico\no fluxo oficial é curto. o valor deste capítulo está nos checkpoints entre etapas.\n1. apps > seleciona a aplicação ou \"select from storage\". [r3]\n2. confirma versão e origem do apk.\n3. mantém patches default; o próprio manual do manager recomenda reset/default. [r3]\n4. se necessário, escolhe downloader/fonte conhecida. [r3]\n5. inicia patch.\n6. lê a primeira exceção relevante; não te prendas às últimas linhas genéricas de coroutines.\n7. no fim, instala ou exporta o apk com o botão de guardar. [r3]\n8. depois da instalação, valida arranque, login e função principal antes de personalizar dezenas de opções.\n\n checkpoint\n guarda o apk patched que passou no teste, juntamente com versão do apk base, data, versão do manager e seleção\n de patches. isto cria uma baseline de rollback."
    },
    {
      "id": 7,
      "title": "Salvaguardas, patch sources e downloaders",
      "text": "O Manager v2 dá mais flexibilidade. Em troubleshooting, flexibilidade não controlada aumenta o\nespaço de falha.\n\n7.1 Settings > Advanced\n Opção                                                             Padrão de troubleshooting\n\n Disable version compatibility check                               manter desativado; não forçar versões incompatíveis\n\n Require suggested app version                                     manter ativo\n\n Allow changing patch selection and options                        usar só quando necessário; voltar a defaults para isolar falhas\n\n Allow using universal patches                                     manter desativado salvo caso justificado\n\n Run patcher in another process                                    usar apenas para OOM/performance conforme documentação\n\n\nA documentação oficial avisa explicitamente que alterar compatibilidade, versão sugerida, seleção e universal patches\npode produzir problemas inesperados. [R4]\n\n7.2 Patch sources\nO Manager permite adicionar patches por URL ou storage; o ficheiro remoto/local deve usar o formato da ReVanced API.\nSe uma fonte não carregar, confirma URL, conectividade e formato. [R8][R5]\n\n  MODO DE ISOLAMENTO\n  Se usas várias fontes e aparece um erro de patch inexistente/dependência, desativa temporariamente fontes externas,\n  mantém apenas a oficial e usa Reset na seleção.",
      "search": "salvaguardas, patch sources e downloaders\no manager v2 dá mais flexibilidade. em troubleshooting, flexibilidade não controlada aumenta o\nespaço de falha.\n\n7.1 settings > advanced\n opção                                                             padrão de troubleshooting\n\n disable version compatibility check                               manter desativado; não forçar versões incompatíveis\n\n require suggested app version                                     manter ativo\n\n allow changing patch selection and options                        usar só quando necessário; voltar a defaults para isolar falhas\n\n allow using universal patches                                     manter desativado salvo caso justificado\n\n run patcher in another process                                    usar apenas para oom/performance conforme documentação\n\n\na documentação oficial avisa explicitamente que alterar compatibilidade, versão sugerida, seleção e universal patches\npode produzir problemas inesperados. [r4]\n\n7.2 patch sources\no manager permite adicionar patches por url ou storage; o ficheiro remoto/local deve usar o formato da revanced api.\nse uma fonte não carregar, confirma url, conectividade e formato. [r8][r5]\n\n  modo de isolamento\n  se usas várias fontes e aparece um erro de patch inexistente/dependência, desativa temporariamente fontes externas,\n  mantém apenas a oficial e usa reset na seleção."
    },
    {
      "id": 8,
      "title": "Compatibilidade e opções de patches",
      "text": "Dois tipos de alteração causam regressões com frequência: escolher um APK fora da\ncompatibilidade e alterar opções sem perceber dependências.\n\n8.1 Reset antes de depurar\nA documentação do Manager recomenda o conjunto default de patches e a documentação de troubleshooting pede reset\ndas opções dos patches quando há falha/crash. [R3][R5]\n\n8.2 Dependências implícitas\nAlguns patches podem depender de outros. Se um patch esperado for removido da seleção, o patcher pode falhar ao\nprocurar uma dependência pelo nome. Um issue oficial de 2026 documentou um caso em que desativar um patch\ndependente fazia o patcher falhar; a primeira ação segura é repor defaults. [R15]\n\n  NÃO INTERPRETAR MAL\n  \"Patch X does not exist\" não significa automaticamente que o APK está corrompido. O erro é de resolução de\n  patches/dependências até prova em contrário.",
      "search": "compatibilidade e opções de patches\ndois tipos de alteração causam regressões com frequência: escolher um apk fora da\ncompatibilidade e alterar opções sem perceber dependências.\n\n8.1 reset antes de depurar\na documentação do manager recomenda o conjunto default de patches e a documentação de troubleshooting pede reset\ndas opções dos patches quando há falha/crash. [r3][r5]\n\n8.2 dependências implícitas\nalguns patches podem depender de outros. se um patch esperado for removido da seleção, o patcher pode falhar ao\nprocurar uma dependência pelo nome. um issue oficial de 2026 documentou um caso em que desativar um patch\ndependente fazia o patcher falhar; a primeira ação segura é repor defaults. [r15]\n\n  não interpretar mal\n  \"patch x does not exist\" não significa automaticamente que o apk está corrompido. o erro é de resolução de\n  patches/dependências até prova em contrário."
    },
    {
      "id": 9,
      "title": "Erro \"Patch with name ... does not exist\" e Custom branding",
      "text": "Este é um erro de carga/resolução de patches. O foco é a seleção e as fontes, não GmsCore nem\nplayback.\n\n\n                Caso real: o patcher falhou em \"Carregar patches\" com \"Patch with name Custom branding does not exist\".\n\nProcedimento\n1. Não reinstales GmsCore: a falha ocorre antes do runtime.\n2. Patches > Reset/default.\n3. Confirma que Custom branding está presente se a feature/configuração em causa depende dele.\n4. Remove temporariamente patch sources externas.\n5. Atualiza Manager/paches pelo canal oficial e repatcha.\n6. Se a falha persistir com defaults, exporta logs do Manager e anexa versão, app, APK e patch selection ao bug report.\n\n LEITURA CORRETA DO STACK TRACE\n As linhas finais de kotlinx.coroutines apenas mostram onde a exceção propagou. A mensagem útil está no topo: \"Patch\n with name Custom branding does not exist\".",
      "search": "erro \"patch with name ... does not exist\" e custom branding\neste é um erro de carga/resolução de patches. o foco é a seleção e as fontes, não gmscore nem\nplayback.\n\n\n                caso real: o patcher falhou em \"carregar patches\" com \"patch with name custom branding does not exist\".\n\nprocedimento\n1. não reinstales gmscore: a falha ocorre antes do runtime.\n2. patches > reset/default.\n3. confirma que custom branding está presente se a feature/configuração em causa depende dele.\n4. remove temporariamente patch sources externas.\n5. atualiza manager/paches pelo canal oficial e repatcha.\n6. se a falha persistir com defaults, exporta logs do manager e anexa versão, app, apk e patch selection ao bug report.\n\n leitura correta do stack trace\n as linhas finais de kotlinx.coroutines apenas mostram onde a exceção propagou. a mensagem útil está no topo: \"patch\n with name custom branding does not exist\"."
    },
    {
      "id": 10,
      "title": "Out Of Memory, patching lento e falhas de build",
      "text": "Patching é intensivo em memória e armazenamento. O primeiro objetivo é distinguir insuficiência de\nrecursos de incompatibilidade lógica.\n\n10.1 OOM\n1. Fecha apps pesadas e confirma espaço livre suficiente.\n2. Reinicia o Manager e repete com APK/patches default.\n3. Se o log indicar Out Of Memory, a documentação sugere ativar \"Experimental: Run patcher in another process\". [R5]\n   [R4]\n4. Não uses a opção experimental preventivamente se o patching normal funciona.\n\n10.2 Falha de recursos/AAPT\nSe a exceção menciona resource compilation, Androlib, aapt ou manifest, volta à versão sugerida e defaults. Um erro de\nrecursos não é normalmente corrigido trocando o cliente Spoof video streams, porque esse ajuste é runtime.\n\n  EVIDÊNCIA MÍNIMA\n  Guarda a primeira exceção, versão do Manager, app/version, Android, arquitetura e patches. \"Deu erro\" não é\n  suficiente para uma reprodução técnica.",
      "search": "out of memory, patching lento e falhas de build\npatching é intensivo em memória e armazenamento. o primeiro objetivo é distinguir insuficiência de\nrecursos de incompatibilidade lógica.\n\n10.1 oom\n1. fecha apps pesadas e confirma espaço livre suficiente.\n2. reinicia o manager e repete com apk/patches default.\n3. se o log indicar out of memory, a documentação sugere ativar \"experimental: run patcher in another process\". [r5]\n   [r4]\n4. não uses a opção experimental preventivamente se o patching normal funciona.\n\n10.2 falha de recursos/aapt\nse a exceção menciona resource compilation, androlib, aapt ou manifest, volta à versão sugerida e defaults. um erro de\nrecursos não é normalmente corrigido trocando o cliente spoof video streams, porque esse ajuste é runtime.\n\n  evidência mínima\n  guarda a primeira exceção, versão do manager, app/version, android, arquitetura e patches. \"deu erro\" não é\n  suficiente para uma reprodução técnica."
    },
    {
      "id": 11,
      "title": "Manager fecha, bloqueia ou não termina downloads",
      "text": "Separar falha do Manager de falha da app patched é essencial.\n1. Confirma origem oficial e Android mínimo.\n2. Atualiza o Manager no canal oficial.\n3. Repõe Settings > Advanced para defaults. [R5]\n4. Se o problema é downloader, tenta selecionar um APK full conhecido ou outro downloader configurado no próprio\n   Manager, sem misturar patches de terceiros.\n5. Se o Manager fecha, exporta debug logs se conseguires entrar em Settings > Advanced. [R4]\n6. Só depois de recolher logs considera limpar dados/reinstalar.\n\n NÃO CONFUNDIR\n Um download que não termina não demonstra que os patches estão avariados. Valida primeiro a camada de aquisição\n do APK.",
      "search": "manager fecha, bloqueia ou não termina downloads\nseparar falha do manager de falha da app patched é essencial.\n1. confirma origem oficial e android mínimo.\n2. atualiza o manager no canal oficial.\n3. repõe settings > advanced para defaults. [r5]\n4. se o problema é downloader, tenta selecionar um apk full conhecido ou outro downloader configurado no próprio\n   manager, sem misturar patches de terceiros.\n5. se o manager fecha, exporta debug logs se conseguires entrar em settings > advanced. [r4]\n6. só depois de recolher logs considera limpar dados/reinstalar.\n\n não confundir\n um download que não termina não demonstra que os patches estão avariados. valida primeiro a camada de aquisição\n do apk."
    },
    {
      "id": 12,
      "title": "\"App not installed\": assinatura, package, downgrade e perfis",
      "text": "Depois de o patch terminar, o Android Package Manager passa a ser parte central do diagnóstico.\n\n12.1 Regras de update Android\nPara uma atualização normal, o Android requer o mesmo application ID, certificado de assinatura compatível e\nversionCode adequado. Se uma destas condições falhar, o update pode ser recusado. [R13]\n\n Sintoma                                  Causa provável                                    Teste seguro\n\n\n App not installed                        assinatura diferente / package conflict           comparar certs; verificar app instalada e\n                                                                                            package\n\n Update incompatible                      keystore diferente                                usar o mesmo keystore ou desinstalar apenas\n                                                                                            se aceitares perder dados locais\n\n Downgrade                                versionCode inferior                              usar versão compatível/sugerida; não forçar\n                                                                                            downgrade sem motivo\n\n Conflito invisível                       work profile / second space / utilizador          verificar todos os perfis/instâncias\n                                          secundário\n\n\n12.2 Verificar certificado com Android SDK\napksigner verify --print-certs app-patched.apk\n\nO apksigner é a ferramenta oficial Android para verificar assinaturas de APK. [R16]\n\n  KEYSTORE\n  Se uma build funcional já está instalada, exporta e preserva o signing keystore antes de limpar dados do Manager.\n  Trocar de keystore muda a identidade criptográfica da build.",
      "search": "\"app not installed\": assinatura, package, downgrade e perfis\ndepois de o patch terminar, o android package manager passa a ser parte central do diagnóstico.\n\n12.1 regras de update android\npara uma atualização normal, o android requer o mesmo application id, certificado de assinatura compatível e\nversioncode adequado. se uma destas condições falhar, o update pode ser recusado. [r13]\n\n sintoma                                  causa provável                                    teste seguro\n\n\n app not installed                        assinatura diferente / package conflict           comparar certs; verificar app instalada e\n                                                                                            package\n\n update incompatible                      keystore diferente                                usar o mesmo keystore ou desinstalar apenas\n                                                                                            se aceitares perder dados locais\n\n downgrade                                versioncode inferior                              usar versão compatível/sugerida; não forçar\n                                                                                            downgrade sem motivo\n\n conflito invisível                       work profile / second space / utilizador          verificar todos os perfis/instâncias\n                                          secundário\n\n\n12.2 verificar certificado com android sdk\napksigner verify --print-certs app-patched.apk\n\no apksigner é a ferramenta oficial android para verificar assinaturas de apk. [r16]\n\n  keystore\n  se uma build funcional já está instalada, exporta e preserva o signing keystore antes de limpar dados do manager.\n  trocar de keystore muda a identidade criptográfica da build."
    },
    {
      "id": 13,
      "title": "Root vs non-root: escolhe um modelo e mantém-no",
      "text": "Misturar instruções root e non-root é uma fonte recorrente de confusão.\n\nTema                                  Non-root                                         Root\n\n\nInstalação                            APK patched como app normal/alterada             pode envolver montagem/substituição da app\n                                      conforme patches                                 stock conforme suporte\n\nGoogle services                       GmsCore support é comum em                       pode usar serviços Google nativos\n                                      YouTube/YouTube Music                            dependendo do método\n\nRisco operacional                     baixo impacto sistémico                          maior impacto; SELinux/mount/módulos\n                                                                                       podem interferir\n\nRollback                              desinstalar/reinstalar build compatível          pode exigir desmontar/remover módulo e\n                                                                                       restaurar stock\n\n\n REGRA\n Se não tens root, não sigas soluções baseadas em Magisk/KSU/APatch. Se tens root, documenta o método e qualquer\n módulo que altere package mounting antes de abrir um bug report.",
      "search": "root vs non-root: escolhe um modelo e mantém-no\nmisturar instruções root e non-root é uma fonte recorrente de confusão.\n\ntema                                  non-root                                         root\n\n\ninstalação                            apk patched como app normal/alterada             pode envolver montagem/substituição da app\n                                      conforme patches                                 stock conforme suporte\n\ngoogle services                       gmscore support é comum em                       pode usar serviços google nativos\n                                      youtube/youtube music                            dependendo do método\n\nrisco operacional                     baixo impacto sistémico                          maior impacto; selinux/mount/módulos\n                                                                                       podem interferir\n\nrollback                              desinstalar/reinstalar build compatível          pode exigir desmontar/remover módulo e\n                                                                                       restaurar stock\n\n\n regra\n se não tens root, não sigas soluções baseadas em magisk/ksu/apatch. se tens root, documenta o método e qualquer\n módulo que altere package mounting antes de abrir um bug report."
    },
    {
      "id": 14,
      "title": "GmsCore, login e conta Google",
      "text": "GmsCore é uma camada separada da reprodução. Corrige autenticação antes de investigar codecs\nou Spoof client.\n\n14.1 Procedimento base\n1. Confirma que a app foi patchada com GmsCore support quando aplicável.\n2. Usa a versão atual do GmsCore indicada pelo fluxo oficial; o ReVanced anunciou em fevereiro de 2026 uma\n   atualização específica para problemas de login. [R11]\n3. Se o GmsCore já funciona, não o atualizes/limpes sem necessidade.\n4. Se login falha após mudanças do Google, repatcha com patches atuais e confirma o GmsCore atual. [R11]\n5. Testa sem VPN/DNS filtrante se o erro for de conectividade durante login.\n\n14.2 Sintomas que não apontam primeiro para GmsCore\n • Patch não carrega no Manager.\n • Erro de assinatura ao instalar.\n • Vídeo toca 55 segundos e depois bufferiza com conta já autenticada.\n\n PRIVACIDADE\n GmsCore não é motivo para introduzir credenciais numa página aleatória. Confirma sempre que estás no fluxo\n esperado da aplicação/GmsCore instalado a partir da origem indicada.",
      "search": "gmscore, login e conta google\ngmscore é uma camada separada da reprodução. corrige autenticação antes de investigar codecs\nou spoof client.\n\n14.1 procedimento base\n1. confirma que a app foi patchada com gmscore support quando aplicável.\n2. usa a versão atual do gmscore indicada pelo fluxo oficial; o revanced anunciou em fevereiro de 2026 uma\n   atualização específica para problemas de login. [r11]\n3. se o gmscore já funciona, não o atualizes/limpes sem necessidade.\n4. se login falha após mudanças do google, repatcha com patches atuais e confirma o gmscore atual. [r11]\n5. testa sem vpn/dns filtrante se o erro for de conectividade durante login.\n\n14.2 sintomas que não apontam primeiro para gmscore\n • patch não carrega no manager.\n • erro de assinatura ao instalar.\n • vídeo toca 55 segundos e depois bufferiza com conta já autenticada.\n\n privacidade\n gmscore não é motivo para introduzir credenciais numa página aleatória. confirma sempre que estás no fluxo\n esperado da aplicação/gmscore instalado a partir da origem indicada."
    },
    {
      "id": 15,
      "title": "YouTube abre e fecha, ecrã preto ou crash no arranque",
      "text": "Aqui o APK já foi instalado; a investigação passa para runtime.\n1. Força paragem da app e abre novamente.\n2. Confirma se o crash começou imediatamente após repatch/update.\n3. Repõe opções ReVanced alteradas recentemente.\n4. Se alteraste muitos patches, cria uma build de controlo com defaults e versão sugerida.\n5. Confirma GmsCore apenas se o log/autenticação apontar para essa camada.\n6. Ativa debug logging quando disponível e captura AndroidRuntime/revanced logs. [R7]\n\n PIP\n A documentação oficial refere um caso em que vídeos ficam instantaneamente pausados ao carregar em Play e\n recomenda desativar Picture in Picture devido a um problema OS/YouTube. [R6]",
      "search": "youtube abre e fecha, ecrã preto ou crash no arranque\naqui o apk já foi instalado; a investigação passa para runtime.\n1. força paragem da app e abre novamente.\n2. confirma se o crash começou imediatamente após repatch/update.\n3. repõe opções revanced alteradas recentemente.\n4. se alteraste muitos patches, cria uma build de controlo com defaults e versão sugerida.\n5. confirma gmscore apenas se o log/autenticação apontar para essa camada.\n6. ativa debug logging quando disponível e captura androidruntime/revanced logs. [r7]\n\n pip\n a documentação oficial refere um caso em que vídeos ficam instantaneamente pausados ao carregar em play e\n recomenda desativar picture in picture devido a um problema os/youtube. [r6]"
    },
    {
      "id": 16,
      "title": "Playback: buffering, pausa, 403, vídeo indisponível",
      "text": "Desde 2026, alterações do YouTube exigiram atualizações no Spoof video streams; manter patches\natuais é parte do diagnóstico oficial.\n\n16.1 Ordem de teste\n1. Confirma patches atuais. O ReVanced publicou em junho de 2026 uma correção de playback no Spoof video streams\n   para YouTube e YouTube Music. [R10]\n2. Confirma que Spoof video streams está presente/ativo na build onde é necessário.\n3. Testa o mesmo vídeo numa rede diferente para separar servidor/rota de configuração local.\n4. Se carrega lentamente ou bufferiza indefinidamente, a documentação recomenda testar outros clientes em ReVanced\n   Settings > Miscellaneous > Spoof video streams > Default Client. [R6]\n5. Muda um cliente de cada vez e reinicia totalmente o YouTube entre testes.\n6. Usa Stats for nerds para confirmar o cliente/codec quando disponível.\n\n NUNCA CONCLUIR CEDO\n Se mudar de Wi-Fi para dados móveis não altera o ponto exato da falha, a hipótese de rede perde força. Se a falha\n move com o cliente spoof, a hipótese de configuração ganha força.",
      "search": "playback: buffering, pausa, 403, vídeo indisponível\ndesde 2026, alterações do youtube exigiram atualizações no spoof video streams; manter patches\natuais é parte do diagnóstico oficial.\n\n16.1 ordem de teste\n1. confirma patches atuais. o revanced publicou em junho de 2026 uma correção de playback no spoof video streams\n   para youtube e youtube music. [r10]\n2. confirma que spoof video streams está presente/ativo na build onde é necessário.\n3. testa o mesmo vídeo numa rede diferente para separar servidor/rota de configuração local.\n4. se carrega lentamente ou bufferiza indefinidamente, a documentação recomenda testar outros clientes em revanced\n   settings > miscellaneous > spoof video streams > default client. [r6]\n5. muda um cliente de cada vez e reinicia totalmente o youtube entre testes.\n6. usa stats for nerds para confirmar o cliente/codec quando disponível.\n\n nunca concluir cedo\n se mudar de wi-fi para dados móveis não altera o ponto exato da falha, a hipótese de rede perde força. se a falha\n move com o cliente spoof, a hipótese de configuração ganha força."
    },
    {
      "id": 17,
      "title": "Spoof video streams: clientes e efeitos colaterais",
      "text": "Os nomes e opções disponíveis mudam entre versões de patches. Usa o menu da tua build como\nfonte de verdade.\n\n\n                      Entrada de configuração: ReVanced > Diversos > Falsificar fluxos de vídeo.\n\n\n                            A própria build testada avisava: o cliente atual podia fazer o vídeo parar em ~1:00.\n\n17.1 Como testar clientes\n1. Anota o cliente atual.\n2. Seleciona um cliente alternativo disponível na própria build.\n3. Fecha o YouTube totalmente e reabre.\n4. Reproduz o mesmo vídeo durante pelo menos 2-3 minutos.\n5. Regista: tempo da falha, duração, qualidade, codec, se retoma sozinho.\n6. Se piorar, volta ao baseline e testa o próximo cliente.\n\n\n      Exemplo de clientes disponíveis na build testada: Android Reel, Android Reel (no auth), Android Studio, Android VR e visionOS.\n\nIMPORTANTE\nNão existe uma ordem universal garantida entre estes clientes. A documentação oficial diz para testar clientes\nalternativos quando há buffering; a escolha ótima depende da versão, servidor, região e dispositivo. [R6]",
      "search": "spoof video streams: clientes e efeitos colaterais\nos nomes e opções disponíveis mudam entre versões de patches. usa o menu da tua build como\nfonte de verdade.\n\n\n                      entrada de configuração: revanced > diversos > falsificar fluxos de vídeo.\n\n\n                            a própria build testada avisava: o cliente atual podia fazer o vídeo parar em ~1:00.\n\n17.1 como testar clientes\n1. anota o cliente atual.\n2. seleciona um cliente alternativo disponível na própria build.\n3. fecha o youtube totalmente e reabre.\n4. reproduz o mesmo vídeo durante pelo menos 2-3 minutos.\n5. regista: tempo da falha, duração, qualidade, codec, se retoma sozinho.\n6. se piorar, volta ao baseline e testa o próximo cliente.\n\n\n      exemplo de clientes disponíveis na build testada: android reel, android reel (no auth), android studio, android vr e visionos.\n\nimportante\nnão existe uma ordem universal garantida entre estes clientes. a documentação oficial diz para testar clientes\nalternativos quando há buffering; a escolha ótima depende da versão, servidor, região e dispositivo. [r6]"
    },
    {
      "id": 18,
      "title": "Caso validado: vídeo parava a 0:55-1:00",
      "text": "Este caso real é útil porque mostra como um sintoma temporalmente estável reduz o espaço de\npesquisa.\n\nCampo                                                          Observação\n\nSintoma                                                        YouTube normal: música/vídeo reproduzia e parava por volta de\n                                                               0:55; depois retomava.\n\nInstalação                                                     ReVanced funcional; problema apenas durante playback.\n\nCliente inicial                                                Android Reel (no auth).\n\nIndício visual                                                 A própria página de Spoof indicava que o vídeo podia parar em\n                                                               1:00.\n\nAlteração única                                                Default Client -> visionOS.\n\nValidação                                                      O mesmo conteúdo ultrapassou o ponto de falha sem interrupção;\n                                                               problema considerado resolvido no dispositivo testado.\n\n\n CASO VALIDADO - NÃO REGRA UNIVERSAL\n visionOS resolveu este dispositivo/build. A conclusão generalizável não é \"visionOS é sempre melhor\"; é \"quando a\n falha está no primeiro minuto, testa clientes Spoof de forma controlada e valida no mesmo vídeo\".\n\n\n18.1 Critério de aprovação\n • Mesmo vídeo passa de 3 minutos sem pausa anómala.\n • Outro vídeo também reproduz sem a falha.\n • Qualidade e áudio continuam aceitáveis.\n • Reabrir a aplicação não faz regressar o problema.",
      "search": "caso validado: vídeo parava a 0:55-1:00\neste caso real é útil porque mostra como um sintoma temporalmente estável reduz o espaço de\npesquisa.\n\ncampo                                                          observação\n\nsintoma                                                        youtube normal: música/vídeo reproduzia e parava por volta de\n                                                               0:55; depois retomava.\n\ninstalação                                                     revanced funcional; problema apenas durante playback.\n\ncliente inicial                                                android reel (no auth).\n\nindício visual                                                 a própria página de spoof indicava que o vídeo podia parar em\n                                                               1:00.\n\nalteração única                                                default client -> visionos.\n\nvalidação                                                      o mesmo conteúdo ultrapassou o ponto de falha sem interrupção;\n                                                               problema considerado resolvido no dispositivo testado.\n\n\n caso validado - não regra universal\n visionos resolveu este dispositivo/build. a conclusão generalizável não é \"visionos é sempre melhor\"; é \"quando a\n falha está no primeiro minuto, testa clientes spoof de forma controlada e valida no mesmo vídeo\".\n\n\n18.1 critério de aprovação\n • mesmo vídeo passa de 3 minutos sem pausa anómala.\n • outro vídeo também reproduz sem a falha.\n • qualidade e áudio continuam aceitáveis.\n • reabrir a aplicação não faz regressar o problema."
    },
    {
      "id": 19,
      "title": "Áudio, codecs, qualidade e \"Stats for nerds\"",
      "text": "Nem todo problema de reprodução é falta de largura de banda.\n\n19.1 Sintomas\n Sintoma                                                        Hipóteses\n\n Áudio sem vídeo                                                codec/decoder, stream client, app/OS, aceleração\n\n Vídeo sem áudio                                                track/codec, volume/rota Bluetooth, patch/YouTube\n\n Qualidade presa baixa                                          cliente spoof, capacidade/rota, server response\n\n Quality selector ausente                                       efeito do cliente/patch/YouTube; confirmar com patch atual e outro\n                                                                client\n\n Velocidade/playback speed ausente                              regressão de patch/cliente; repatchar com patches atuais\n\n\n19.2 Stats for nerds\nUsa-o como instrumento de observação: client type (quando o patch o expõe), codec, resolução, buffer e network activity.\nNão alteres opções só porque um codec \"parece estranho\"; procura correlação com a falha.",
      "search": "áudio, codecs, qualidade e \"stats for nerds\"\nnem todo problema de reprodução é falta de largura de banda.\n\n19.1 sintomas\n sintoma                                                        hipóteses\n\n áudio sem vídeo                                                codec/decoder, stream client, app/os, aceleração\n\n vídeo sem áudio                                                track/codec, volume/rota bluetooth, patch/youtube\n\n qualidade presa baixa                                          cliente spoof, capacidade/rota, server response\n\n quality selector ausente                                       efeito do cliente/patch/youtube; confirmar com patch atual e outro\n                                                                client\n\n velocidade/playback speed ausente                              regressão de patch/cliente; repatchar com patches atuais\n\n\n19.2 stats for nerds\nusa-o como instrumento de observação: client type (quando o patch o expõe), codec, resolução, buffer e network activity.\nnão alteres opções só porque um codec \"parece estranho\"; procura correlação com a falha."
    },
    {
      "id": 20,
      "title": "Background, PiP e comportamento com ecrã desligado",
      "text": "Se o vídeo funciona em foreground mas para em background, o eixo de diagnóstico muda para\nAndroid/bateria/PiP.\n\nCondição                                                    Teste\n\nPara ao bloquear ecrã                                       verificar battery optimization/background restrictions para YouTube\n                                                            e GmsCore\n\nPausa instantaneamente ao Play                              testar PiP desligado conforme troubleshooting oficial [R6]\n\nBluetooth muda comportamento                                testar áudio local/altifalante e desativar controlos agressivos do\n                                                            vendor\n\nSó falha em economia de bateria                             desativar temporariamente modo economia para confirmar causa\n\n\n FABRICANTES\n Nomes de menus variam por Samsung, Xiaomi, OPPO/OnePlus, Huawei, etc. O objetivo é permitir execução em\n background sem transformar a app num serviço sem limites. Reverte exceções que se revelem desnecessárias.",
      "search": "background, pip e comportamento com ecrã desligado\nse o vídeo funciona em foreground mas para em background, o eixo de diagnóstico muda para\nandroid/bateria/pip.\n\ncondição                                                    teste\n\npara ao bloquear ecrã                                       verificar battery optimization/background restrictions para youtube\n                                                            e gmscore\n\npausa instantaneamente ao play                              testar pip desligado conforme troubleshooting oficial [r6]\n\nbluetooth muda comportamento                                testar áudio local/altifalante e desativar controlos agressivos do\n                                                            vendor\n\nsó falha em economia de bateria                             desativar temporariamente modo economia para confirmar causa\n\n\n fabricantes\n nomes de menus variam por samsung, xiaomi, oppo/oneplus, huawei, etc. o objetivo é permitir execução em\n background sem transformar a app num serviço sem limites. reverte exceções que se revelem desnecessárias."
    },
    {
      "id": 21,
      "title": "Histórico, links, Shorts, SponsorBlock e features que \"desaparecem\"",
      "text": "Quando uma funcionalidade some após repatch, não assumes logo que o patch foi removido do\nprojeto.\n\nChecklist\n1. Confirma se o patch correspondente foi realmente incluído.\n2. Confirma se a opção interna ReVanced ficou desativada após migração/reset.\n3. Verifica se o problema também ocorre com a seleção default.\n4. Repatcha com patches atuais quando a função depende de comportamento de servidor/YouTube.\n5. Se o problema for só um ícone/logo, a documentação indica que o patch Custom branding precisa estar incluído e a\n   opção App icon pode precisar de ativação. [R6]\n\n ESTADO VS PATCH\n Uma feature pode estar patchada mas desativada nas definições. Distingue \"patch não aplicado\" de \"feature aplicada\n mas configuração off\".",
      "search": "histórico, links, shorts, sponsorblock e features que \"desaparecem\"\nquando uma funcionalidade some após repatch, não assumes logo que o patch foi removido do\nprojeto.\n\nchecklist\n1. confirma se o patch correspondente foi realmente incluído.\n2. confirma se a opção interna revanced ficou desativada após migração/reset.\n3. verifica se o problema também ocorre com a seleção default.\n4. repatcha com patches atuais quando a função depende de comportamento de servidor/youtube.\n5. se o problema for só um ícone/logo, a documentação indica que o patch custom branding precisa estar incluído e a\n   opção app icon pode precisar de ativação. [r6]\n\n estado vs patch\n uma feature pode estar patchada mas desativada nas definições. distingue \"patch não aplicado\" de \"feature aplicada\n mas configuração off\"."
    },
    {
      "id": 22,
      "title": "YouTube Music",
      "text": "A lógica de troubleshooting é semelhante ao YouTube, mas trata os sintomas separadamente para\nevitar aplicar soluções específicas do player errado.\n1. Confirma app/version e patches atuais.\n2. Se non-root, confirma GmsCore support/GmsCore quando aplicável.\n3. Para playback, usa o troubleshooting específico da build; as correções de Spoof video streams publicadas pelo\n   ReVanced em 2026 abrangeram YouTube e YouTube Music. [R10]\n4. Não assumes que um bug do YouTube Music é automaticamente o mesmo do YouTube normal.\n5. Reproduz pelo menos duas faixas e regista o ponto exato da falha.",
      "search": "youtube music\na lógica de troubleshooting é semelhante ao youtube, mas trata os sintomas separadamente para\nevitar aplicar soluções específicas do player errado.\n1. confirma app/version e patches atuais.\n2. se non-root, confirma gmscore support/gmscore quando aplicável.\n3. para playback, usa o troubleshooting específico da build; as correções de spoof video streams publicadas pelo\n   revanced em 2026 abrangeram youtube e youtube music. [r10]\n4. não assumes que um bug do youtube music é automaticamente o mesmo do youtube normal.\n5. reproduz pelo menos duas faixas e regista o ponto exato da falha."
    },
    {
      "id": 23,
      "title": "Rede, DNS privado, VPN, ad blockers e filtragem",
      "text": "A rede é uma hipótese, não uma desculpa universal. Testa de forma binária.\n\nTeste A/B                                                    Interpretação\n\nWi-Fi -> dados móveis                                        se muda o sintoma, investigar rede/ISP/DNS/VPN\n\nVPN on -> off                                                se corrige, rota/VPN/DNS do túnel é relevante\n\nPrivate DNS custom -> automático                             se corrige, domínio necessário pode estar filtrado\n\nPi-hole/AdGuard local -> bypass                              se corrige, rever listas/regra bloqueada\n\nMesmo ponto ~0:55 em todas as redes                          rede perde força; cliente spoof/runtime ganha força\n\n\n SEGURANÇA\n Não deixes DNS/VPN desativados permanentemente só para \"fazer funcionar\". Usa o teste para localizar a\n regra/domínio ou incompatibilidade e depois restaura a postura de segurança.",
      "search": "rede, dns privado, vpn, ad blockers e filtragem\na rede é uma hipótese, não uma desculpa universal. testa de forma binária.\n\nteste a/b                                                    interpretação\n\nwi-fi -> dados móveis                                        se muda o sintoma, investigar rede/isp/dns/vpn\n\nvpn on -> off                                                se corrige, rota/vpn/dns do túnel é relevante\n\nprivate dns custom -> automático                             se corrige, domínio necessário pode estar filtrado\n\npi-hole/adguard local -> bypass                              se corrige, rever listas/regra bloqueada\n\nmesmo ponto ~0:55 em todas as redes                          rede perde força; cliente spoof/runtime ganha força\n\n\n segurança\n não deixes dns/vpn desativados permanentemente só para \"fazer funcionar\". usa o teste para localizar a\n regra/domínio ou incompatibilidade e depois restaura a postura de segurança."
    },
    {
      "id": 24,
      "title": "Bateria, background e restrições do fabricante",
      "text": "Problemas de reprodução contínua podem ser causados pelo sistema a suspender YouTube ou\nGmsCore.\n1. Testa com a app em foreground e ecrã ligado.\n2. Depois bloqueia o ecrã; se só falha em background, verifica otimização de bateria.\n3. Confirma que GmsCore não está em modo excessivamente restrito quando depende de background.\n4. Evita colocar tudo em \"Unrestricted\" sem teste; aplica a exceção mínima necessária.\n5. Após alteração, repete o mesmo cenário e mede se o comportamento mudou.",
      "search": "bateria, background e restrições do fabricante\nproblemas de reprodução contínua podem ser causados pelo sistema a suspender youtube ou\ngmscore.\n1. testa com a app em foreground e ecrã ligado.\n2. depois bloqueia o ecrã; se só falha em background, verifica otimização de bateria.\n3. confirma que gmscore não está em modo excessivamente restrito quando depende de background.\n4. evita colocar tudo em \"unrestricted\" sem teste; aplica a exceção mínima necessária.\n5. após alteração, repete o mesmo cenário e mede se o comportamento mudou."
    },
    {
      "id": 25,
      "title": "Atualização e rollback seguro",
      "text": "Uma atualização funcionalmente correta pode introduzir regressões por mudanças do YouTube,\npatches, Manager ou GmsCore.\n\n25.1 Antes de atualizar\n • Exporta keystore e, se necessário, patch selections/options. [R4]\n • Guarda o APK patched funcional e anota versão do APK base.\n • Lê anúncios oficiais se houver uma falha global recente. [R10][R11]\n\n25.2 Depois de atualizar\n1. Valida arranque.\n2. Valida login.\n3. Valida playback >3 min.\n4. Valida background/PiP se usas essas funções.\n5. Só depois elimina a baseline anterior.\n\n ROLLBACK\n Rollback seguro depende de assinatura/package/versionCode. Não forces downgrade às cegas. Se precisares\n desinstalar, considera previamente os dados locais e a possibilidade de voltar a assinar com o mesmo keystore.",
      "search": "atualização e rollback seguro\numa atualização funcionalmente correta pode introduzir regressões por mudanças do youtube,\npatches, manager ou gmscore.\n\n25.1 antes de atualizar\n • exporta keystore e, se necessário, patch selections/options. [r4]\n • guarda o apk patched funcional e anota versão do apk base.\n • lê anúncios oficiais se houver uma falha global recente. [r10][r11]\n\n25.2 depois de atualizar\n1. valida arranque.\n2. valida login.\n3. valida playback >3 min.\n4. valida background/pip se usas essas funções.\n5. só depois elimina a baseline anterior.\n\n rollback\n rollback seguro depende de assinatura/package/versioncode. não forces downgrade às cegas. se precisares\n desinstalar, considera previamente os dados locais e a possibilidade de voltar a assinar com o mesmo keystore."
    },
    {
      "id": 26,
      "title": "Runbook de recuperação total",
      "text": "Usa este procedimento quando a configuração está tão alterada que já não existe baseline fiável.\n1. Exporta logs, keystore e qualquer APK patched funcional ainda disponível.\n2. Anota versões: Manager, app alvo, Android e GmsCore.\n3. Remove fontes de patches externas temporariamente.\n4. Repõe Settings > Advanced e patch options para defaults.\n5. Obtém/seleciona a versão sugerida e um full APK.\n6. Patches -> Reset/default.\n7. Patch e exporta o APK antes de instalar.\n8. Instala. Se houver conflito de assinatura, decide conscientemente entre recuperar o keystore antigo ou desinstalar a\n    build existente.\n9. Abre sem personalizar. Valida arranque, login e playback.\n10. Reintroduz customizações uma a uma, com um teste rápido após cada lote pequeno.\n\n CRITÉRIO DE SAÍDA\n A recuperação só termina quando tens uma baseline reproduzível: APK base identificado, seleção conhecida, keystore\n preservado e testes de smoke passados.",
      "search": "runbook de recuperação total\nusa este procedimento quando a configuração está tão alterada que já não existe baseline fiável.\n1. exporta logs, keystore e qualquer apk patched funcional ainda disponível.\n2. anota versões: manager, app alvo, android e gmscore.\n3. remove fontes de patches externas temporariamente.\n4. repõe settings > advanced e patch options para defaults.\n5. obtém/seleciona a versão sugerida e um full apk.\n6. patches -> reset/default.\n7. patch e exporta o apk antes de instalar.\n8. instala. se houver conflito de assinatura, decide conscientemente entre recuperar o keystore antigo ou desinstalar a\n    build existente.\n9. abre sem personalizar. valida arranque, login e playback.\n10. reintroduz customizações uma a uma, com um teste rápido após cada lote pequeno.\n\n critério de saída\n a recuperação só termina quando tens uma baseline reproduzível: apk base identificado, seleção conhecida, keystore\n preservado e testes de smoke passados."
    },
    {
      "id": 27,
      "title": "Logs, ADB e diagnóstico avançado",
      "text": "Logs transformam \"não funciona\" numa causa observável.\n\n27.1 Logs do Manager\nSettings > Advanced inclui Export debug logs. Em apps patched, a documentação ReVanced também descreve debug\nlogging e recolha via ADB. [R4][R7]\n\n27.2 ADB - Linux/macOS\nadb logcat | grep -i \"revanced\"\nadb logcat | grep \"AndroidRuntime\"\nadb logcat | grep -i \"revanced\" > revanced.log\n\n\n27.3 ADB - Windows PowerShell/CMD\nadb logcat | findstr /I \"revanced AndroidRuntime\"\nadb logcat > logcat-completo.txt\n\n\n27.4 Package e versão\nadb shell pm list packages | findstr youtube\nadb shell dumpsys package com.google.android.youtube | findstr /I \"versionName versionCode\"\n\n\n27.5 Assinatura do APK exportado\n apksigner verify --print-certs app-patched.apk\n\n\n PRIVACIDADE\n Antes de partilhar logs publicamente, revê-os e remove tokens, endereços de email, IDs ou outros dados que não\n sejam necessários para reproduzir o problema.",
      "search": "logs, adb e diagnóstico avançado\nlogs transformam \"não funciona\" numa causa observável.\n\n27.1 logs do manager\nsettings > advanced inclui export debug logs. em apps patched, a documentação revanced também descreve debug\nlogging e recolha via adb. [r4][r7]\n\n27.2 adb - linux/macos\nadb logcat | grep -i \"revanced\"\nadb logcat | grep \"androidruntime\"\nadb logcat | grep -i \"revanced\" > revanced.log\n\n\n27.3 adb - windows powershell/cmd\nadb logcat | findstr /i \"revanced androidruntime\"\nadb logcat > logcat-completo.txt\n\n\n27.4 package e versão\nadb shell pm list packages | findstr youtube\nadb shell dumpsys package com.google.android.youtube | findstr /i \"versionname versioncode\"\n\n\n27.5 assinatura do apk exportado\n apksigner verify --print-certs app-patched.apk\n\n\n privacidade\n antes de partilhar logs publicamente, revê-os e remove tokens, endereços de email, ids ou outros dados que não\n sejam necessários para reproduzir o problema."
    },
    {
      "id": 28,
      "title": "Estratégia de testes: como provar que ficou resolvido",
      "text": "Uma correção sem teste de regressão é apenas uma hipótese.\n\nTeste                                   Procedimento                                  Passa se...\n\n\nT1 Arranque                             force-stop -> abrir 3x                        sem crash e UI carregada\n\nT2 Login                                abrir conta/perfil                            conta reconhecida sem loop\n\nT3 Playback curto                       mesmo vídeo problema >3 min                   sem pausa/buffer anómalo\n\nT4 Playback alternativo                 segundo vídeo/canal                           não é solução específica de um vídeo\n\nT5 Rede                                 Wi-Fi e dados móveis                          comportamento coerente ou diferença\n                                                                                      explicada\n\nT6 Background                           bloquear ecrã/PiP se usado                    continua conforme expectativa\n\nT7 Reboot                               reiniciar dispositivo                         configuração persiste\n\n\n BASELINE\n Regista o resultado de T1-T7 e a configuração. Se uma atualização futura falhar, tens comparação objetiva.",
      "search": "estratégia de testes: como provar que ficou resolvido\numa correção sem teste de regressão é apenas uma hipótese.\n\nteste                                   procedimento                                  passa se...\n\n\nt1 arranque                             force-stop -> abrir 3x                        sem crash e ui carregada\n\nt2 login                                abrir conta/perfil                            conta reconhecida sem loop\n\nt3 playback curto                       mesmo vídeo problema >3 min                   sem pausa/buffer anómalo\n\nt4 playback alternativo                 segundo vídeo/canal                           não é solução específica de um vídeo\n\nt5 rede                                 wi-fi e dados móveis                          comportamento coerente ou diferença\n                                                                                      explicada\n\nt6 background                           bloquear ecrã/pip se usado                    continua conforme expectativa\n\nt7 reboot                               reiniciar dispositivo                         configuração persiste\n\n\n baseline\n regista o resultado de t1-t7 e a configuração. se uma atualização futura falhar, tens comparação objetiva."
    },
    {
      "id": 29,
      "title": "Árvores de decisão rápidas",
      "text": "Usa estas árvores quando queres chegar ao capítulo certo em menos de um minuto.\n\n29.1 O patch não termina\nERRO ANTES DE APPLY PATCHES?\n  SIM -> fontes / seleção / dependências -> capítulos 7-9\n  NÃO -> erro durante patching?\n          -> versão sugerida + full APK + defaults -> capítulos 5, 8, 10\n          -> OOM? -> capítulo 10\n\n\n29.2 APK não instala\nPATCH TERMINOU E APK FOI GERADO?\n  NÃO -> voltar ao patching\n  SIM -> Android recusa instalação?\n         -> assinatura / application ID / versionCode / perfil -> capítulo 12\n\n\n29.3 Vídeo não reproduz\nAPP ABRE E LOGIN FUNCIONA?\n  NÃO -> capítulos 14-15\n  SIM -> vídeo pausa/bufferiza?\n         -> patches atuais + Spoof video streams -> capítulos 16-18\n         -> só background? -> capítulos 20, 24\n         -> só uma rede? -> capítulo 23",
      "search": "árvores de decisão rápidas\nusa estas árvores quando queres chegar ao capítulo certo em menos de um minuto.\n\n29.1 o patch não termina\nerro antes de apply patches?\n  sim -> fontes / seleção / dependências -> capítulos 7-9\n  não -> erro durante patching?\n          -> versão sugerida + full apk + defaults -> capítulos 5, 8, 10\n          -> oom? -> capítulo 10\n\n\n29.2 apk não instala\npatch terminou e apk foi gerado?\n  não -> voltar ao patching\n  sim -> android recusa instalação?\n         -> assinatura / application id / versioncode / perfil -> capítulo 12\n\n\n29.3 vídeo não reproduz\napp abre e login funciona?\n  não -> capítulos 14-15\n  sim -> vídeo pausa/bufferiza?\n         -> patches atuais + spoof video streams -> capítulos 16-18\n         -> só background? -> capítulos 20, 24\n         -> só uma rede? -> capítulo 23"
    },
    {
      "id": 30,
      "title": "Matriz sintoma -> causa -> ação",
      "text": "Tabela de referência para atendimento rápido.\n\nSintoma                            Causa provável                               Ação\n\n\nPatch with name X does not exist   seleção/dependência/fonte                    Reset/default; fonte oficial; logs\n\nPatches fail to load               URL/formato API/rede                         validar source e conectividade\n\nOut Of Memory                      memória/patcher                              fechar apps; another process experimental\n\nApp not installed                  assinatura/package/versionCode               cap. 12; apksigner\n\nLogin loop                         GmsCore/patch desatualizado                  repatch + GmsCore atual\n\nVídeo pausa instantaneamente       PiP/OS ou playback                           testar PiP off; patches atuais\n\nVídeo pára ~0:55-1:00              Spoof client/stream                          testar cliente alternativo controladamente\n\nBuffer infinito                    Spoof client/patch/rede                      patch atual; outro client; A/B rede\n\nQualidade baixa/selector ausente   client/stream response                       outro client; patches atuais\n\nSó para com ecrã desligado         bateria/background                           cap. 24\n\nFeature desapareceu                patch/opção ausente                          confirmar patch + setting; defaults\n\nProblema após update               regressão                                    cap. 25; rollback baseline",
      "search": "matriz sintoma -> causa -> ação\ntabela de referência para atendimento rápido.\n\nsintoma                            causa provável                               ação\n\n\npatch with name x does not exist   seleção/dependência/fonte                    reset/default; fonte oficial; logs\n\npatches fail to load               url/formato api/rede                         validar source e conectividade\n\nout of memory                      memória/patcher                              fechar apps; another process experimental\n\napp not installed                  assinatura/package/versioncode               cap. 12; apksigner\n\nlogin loop                         gmscore/patch desatualizado                  repatch + gmscore atual\n\nvídeo pausa instantaneamente       pip/os ou playback                           testar pip off; patches atuais\n\nvídeo pára ~0:55-1:00              spoof client/stream                          testar cliente alternativo controladamente\n\nbuffer infinito                    spoof client/patch/rede                      patch atual; outro client; a/b rede\n\nqualidade baixa/selector ausente   client/stream response                       outro client; patches atuais\n\nsó para com ecrã desligado         bateria/background                           cap. 24\n\nfeature desapareceu                patch/opção ausente                          confirmar patch + setting; defaults\n\nproblema após update               regressão                                    cap. 25; rollback baseline"
    },
    {
      "id": 31,
      "title": "Índice A-Z de resolução",
      "text": "Procura pela palavra que aparece no erro ou no sintoma.\n\nEntrada                                                Onde atuar\n\n\nA - APK bundle                                         Usa full APK para troubleshooting; bundles/splits são entrada diferente.\n                                                       Caps. 5, 10.\n\nA - Assinatura                                         Keystore/certificado diferente pode impedir update. Cap. 12.\n\nB - Background                                         Se só falha com ecrã desligado, bateria/restrições. Caps. 20, 24.\n\nB - Buffering                                          Patches atuais + Spoof clients + A/B de rede. Caps. 16-18, 23.\n\nC - Custom branding                                    Se o patch não existe, Reset/default e fonte oficial. Cap. 9.\n\nD - DNS                                                Private DNS e filtros podem interferir. Cap. 23.\n\nD - Downgrade                                          Evitar forçar; verificar versionCode/assinatura. Cap. 12.\n\nG - GmsCore                                            Login/Google services em non-root. Cap. 14.\n\nK - Keystore                                           Preservar para updates consistentes. Caps. 3, 12, 25.\n\nL - Logs                                               Export debug logs / ADB. Cap. 27.\n\nM - Manager                                            Origem oficial, update e safeguards. Caps. 4, 7, 11.\n\nO - OOM                                                Run patcher in another process apenas quando necessário. Cap. 10.\n\nP - Patches                                            Defaults primeiro; fontes e dependências depois. Caps. 6-9.\n\nP - PiP                                                Pausa instantânea pode estar ligada a PiP/OS. Caps. 15, 20.\n\nR - Root                                               Não misturar runbooks root/non-root. Cap. 13.\n\nS - Spoof video streams                                Central em playback; testar clientes. Caps. 16-18.\n\nV - versionCode                                        Update exige valor compatível. Cap. 12.\n\nV - visionOS                                           Cliente que resolveu o caso 0:55 no dispositivo testado; não universal.\n                                                       Cap. 18.\n\nX - XAPK                                               Contentor de splits; não confundir com full APK. Cap. 5.\n\nY - YouTube Music                                      Tratar separadamente do YouTube normal. Cap. 22.",
      "search": "índice a-z de resolução\nprocura pela palavra que aparece no erro ou no sintoma.\n\nentrada                                                onde atuar\n\n\na - apk bundle                                         usa full apk para troubleshooting; bundles/splits são entrada diferente.\n                                                       caps. 5, 10.\n\na - assinatura                                         keystore/certificado diferente pode impedir update. cap. 12.\n\nb - background                                         se só falha com ecrã desligado, bateria/restrições. caps. 20, 24.\n\nb - buffering                                          patches atuais + spoof clients + a/b de rede. caps. 16-18, 23.\n\nc - custom branding                                    se o patch não existe, reset/default e fonte oficial. cap. 9.\n\nd - dns                                                private dns e filtros podem interferir. cap. 23.\n\nd - downgrade                                          evitar forçar; verificar versioncode/assinatura. cap. 12.\n\ng - gmscore                                            login/google services em non-root. cap. 14.\n\nk - keystore                                           preservar para updates consistentes. caps. 3, 12, 25.\n\nl - logs                                               export debug logs / adb. cap. 27.\n\nm - manager                                            origem oficial, update e safeguards. caps. 4, 7, 11.\n\no - oom                                                run patcher in another process apenas quando necessário. cap. 10.\n\np - patches                                            defaults primeiro; fontes e dependências depois. caps. 6-9.\n\np - pip                                                pausa instantânea pode estar ligada a pip/os. caps. 15, 20.\n\nr - root                                               não misturar runbooks root/non-root. cap. 13.\n\ns - spoof video streams                                central em playback; testar clientes. caps. 16-18.\n\nv - versioncode                                        update exige valor compatível. cap. 12.\n\nv - visionos                                           cliente que resolveu o caso 0:55 no dispositivo testado; não universal.\n                                                       cap. 18.\n\nx - xapk                                               contentor de splits; não confundir com full apk. cap. 5.\n\ny - youtube music                                      tratar separadamente do youtube normal. cap. 22."
    },
    {
      "id": 32,
      "title": "Checklist para pedir ajuda ou abrir bug report",
      "text": "Um relatório reproduzível reduz drasticamente o tempo até uma resposta útil.\n☐ Descrição exata do sintoma e fase onde ocorre.\n☐ ReVanced Manager: versão e canal (stable/dev).\n☐ App alvo + versionName/versionCode.\n☐ Android + fabricante/modelo.\n☐ Tipo de instalação: non-root/root e método root se aplicável.\n☐ Origem do APK e se é full APK ou bundle/split.\n☐ Patch selection e opções alteradas.\n☐ Patch sources externas, se existirem.\n☐ GmsCore version, se relevante.\n☐ Passos mínimos para reproduzir.\n☐ Primeira exceção relevante + logs completos anexos.\n☐ O que já foi testado e resultado de cada teste.\n\n QUALIDADE DO RELATÓRIO\n Inclui imagens/vídeos/logs e informação de versão. A documentação ReVanced pede explicitamente estes dados ao\n solicitar ajuda. [R7]",
      "search": "checklist para pedir ajuda ou abrir bug report\num relatório reproduzível reduz drasticamente o tempo até uma resposta útil.\n☐ descrição exata do sintoma e fase onde ocorre.\n☐ revanced manager: versão e canal (stable/dev).\n☐ app alvo + versionname/versioncode.\n☐ android + fabricante/modelo.\n☐ tipo de instalação: non-root/root e método root se aplicável.\n☐ origem do apk e se é full apk ou bundle/split.\n☐ patch selection e opções alteradas.\n☐ patch sources externas, se existirem.\n☐ gmscore version, se relevante.\n☐ passos mínimos para reproduzir.\n☐ primeira exceção relevante + logs completos anexos.\n☐ o que já foi testado e resultado de cada teste.\n\n qualidade do relatório\n inclui imagens/vídeos/logs e informação de versão. a documentação revanced pede explicitamente estes dados ao\n solicitar ajuda. [r7]"
    },
    {
      "id": 33,
      "title": "Manutenção do manual e política de atualização",
      "text": "ReVanced e YouTube mudam do lado do cliente e do servidor. Este documento deve ser tratado\ncomo baseline versionada.\n\nGatilho                                                  Ação no manual\n\nNovo Manager major/minor estável                         revalidar menus, safeguards e fluxo de patching\n\nAnúncio de playback do ReVanced                          revalidar caps. 16-19 e caso 0:55\n\nNovo GmsCore/login fix                                   revalidar cap. 14\n\nMudança de nomes de patches                              atualizar A-Z e screenshots\n\nNovo Android major                                       revalidar install, background, PiP, developer verification\n\nNovo caso real reproduzível                              adicionar como CASE VALIDADO, sem o apresentar como regra\n                                                         universal\n\n\n33.1 Changelog\nVersão                             Data                                          Alterações\n\n1.0                                15/08/2026                                    manual A-Z inicial; 31 páginas\n\n2.0                                16/08/2026                                    arquitetura de diagnóstico, segurança,\n                                                                                 assinatura/keystore, runbooks, ADB, testes,\n                                                                                 árvores de decisão, caso 0:55\n                                                                                 documentado, referências revistas",
      "search": "manutenção do manual e política de atualização\nrevanced e youtube mudam do lado do cliente e do servidor. este documento deve ser tratado\ncomo baseline versionada.\n\ngatilho                                                  ação no manual\n\nnovo manager major/minor estável                         revalidar menus, safeguards e fluxo de patching\n\nanúncio de playback do revanced                          revalidar caps. 16-19 e caso 0:55\n\nnovo gmscore/login fix                                   revalidar cap. 14\n\nmudança de nomes de patches                              atualizar a-z e screenshots\n\nnovo android major                                       revalidar install, background, pip, developer verification\n\nnovo caso real reproduzível                              adicionar como case validado, sem o apresentar como regra\n                                                         universal\n\n\n33.1 changelog\nversão                             data                                          alterações\n\n1.0                                15/08/2026                                    manual a-z inicial; 31 páginas\n\n2.0                                16/08/2026                                    arquitetura de diagnóstico, segurança,\n                                                                                 assinatura/keystore, runbooks, adb, testes,\n                                                                                 árvores de decisão, caso 0:55\n                                                                                 documentado, referências revistas"
    },
    {
      "id": 34,
      "title": "Fontes e referências",
      "text": "Fontes primárias/official-first usadas nesta edição. O conteúdo transitório deve ser verificado\nnovamente antes de decisões críticas.\nR1 ReVanced - download oficial - https://revanced.app/download\nR2 ReVanced Manager - prerequisites -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/0_prerequisites.md\nR3 ReVanced Manager - patching apps -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_1_patching.md\nR4 ReVanced Manager - settings/advanced/import-export -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_6_settings.md\nR5 ReVanced Manager - troubleshooting -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/3_troubleshooting.md\nR6 ReVanced documentation - troubleshooting resources -\nhttps://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.md\nR7 ReVanced documentation - FAQ/questions/logs -\nhttps://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/questions.md\nR8 ReVanced Manager - managing patches/sources -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_3_managing_patches.md\nR9 ReVanced Manager - updating - https://github.com/ReVanced/revanced-manager/blob/main/docs/2_5_updating.md\nR10 ReVanced announcement - YouTube/YouTube Music playback issues fixed (02/06/2026) -\nhttps://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixed\nR11 ReVanced announcement - GmsCore updated and login fixed (15/02/2026) - https://revanced.app/announcements?\nid=19-gmscore-updated-and-login-fixed\nR12 ReVanced Manager repository/releases - https://github.com/ReVanced/revanced-manager\nR13 Android Developers - app update requirements/signing - https://developer.android.com/google/play/app-updates\nR14 Android Developers - Android App Bundle/split APK format - https://developer.android.com/guide/app-bundle/app-\nbundle-format\nR15 ReVanced Manager issue #3384 - dependency/disabled patch example - https://github.com/ReVanced/revanced-\nmanager/issues/3384\nR16 Android Developers - apksigner - https://developer.android.com/tools/apksigner\n\n  LIMITAÇÕES REAIS\n  Menus, nomes de patches, clientes Spoof e compatibilidades podem mudar sem alterar este PDF. Patches de\n  terceiros não são cobertos como equivalentes aos oficiais. Soluções root dependem do método. O caso visionOS é um\n  caso validado localmente, não uma promessa de compatibilidade universal.",
      "search": "fontes e referências\nfontes primárias/official-first usadas nesta edição. o conteúdo transitório deve ser verificado\nnovamente antes de decisões críticas.\nr1 revanced - download oficial - https://revanced.app/download\nr2 revanced manager - prerequisites -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/0_prerequisites.md\nr3 revanced manager - patching apps -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_1_patching.md\nr4 revanced manager - settings/advanced/import-export -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_6_settings.md\nr5 revanced manager - troubleshooting -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/3_troubleshooting.md\nr6 revanced documentation - troubleshooting resources -\nhttps://github.com/revanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.md\nr7 revanced documentation - faq/questions/logs -\nhttps://github.com/revanced/revanced-documentation/blob/main/docs/revanced-resources/questions.md\nr8 revanced manager - managing patches/sources -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_3_managing_patches.md\nr9 revanced manager - updating - https://github.com/revanced/revanced-manager/blob/main/docs/2_5_updating.md\nr10 revanced announcement - youtube/youtube music playback issues fixed (02/06/2026) -\nhttps://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixed\nr11 revanced announcement - gmscore updated and login fixed (15/02/2026) - https://revanced.app/announcements?\nid=19-gmscore-updated-and-login-fixed\nr12 revanced manager repository/releases - https://github.com/revanced/revanced-manager\nr13 android developers - app update requirements/signing - https://developer.android.com/google/play/app-updates\nr14 android developers - android app bundle/split apk format - https://developer.android.com/guide/app-bundle/app-\nbundle-format\nr15 revanced manager issue #3384 - dependency/disabled patch example - https://github.com/revanced/revanced-\nmanager/issues/3384\nr16 android developers - apksigner - https://developer.android.com/tools/apksigner\n\n  limitações reais\n  menus, nomes de patches, clientes spoof e compatibilidades podem mudar sem alterar este pdf. patches de\n  terceiros não são cobertos como equivalentes aos oficiais. soluções root dependem do método. o caso visionos é um\n  caso validado localmente, não uma promessa de compatibilidade universal."
    }
  ],
  "diagnostics": [
    {
      "id": "manager",
      "label": "Manager não instala ou não abre",
      "confidence": "OFICIAL",
      "chapters": [
        3,
        4,
        11
      ],
      "steps": [
        "Confirma que o Manager veio de revanced.app ou do repositório oficial.",
        "Confirma o requisito Android indicado pela documentação da versão atual.",
        "Atualiza para o canal estável e repõe Settings > Advanced para os valores recomendados.",
        "Recolhe logs antes de limpar dados ou reinstalar."
      ],
      "risk": "Baixo"
    },
    {
      "id": "patches",
      "label": "Patches não carregam / patch não existe",
      "confidence": "OFICIAL",
      "chapters": [
        7,
        8,
        9
      ],
      "steps": [
        "No seletor de patches usa Reset/default.",
        "Remove temporariamente fontes externas de patches.",
        "Confirma a versão da app e a compatibilidade.",
        "Se aparece “Patch with name … does not exist”, guarda o log completo e a primeira exceção relevante."
      ],
      "risk": "Baixo"
    },
    {
      "id": "build",
      "label": "Patching falha / OOM / build não termina",
      "confidence": "OFICIAL",
      "chapters": [
        5,
        6,
        8,
        10
      ],
      "steps": [
        "Usa a versão sugerida e um APK completo quando o fluxo exigir APK de armazenamento.",
        "Repete com a seleção de patches predefinida.",
        "Fecha aplicações pesadas e confirma espaço livre.",
        "Só se o log indicar memória insuficiente, testa a opção experimental de executar o patcher noutro processo."
      ],
      "risk": "Médio"
    },
    {
      "id": "install",
      "label": "APK patched não instala / update incompatível",
      "confidence": "OFICIAL",
      "chapters": [
        3,
        12,
        25
      ],
      "steps": [
        "Confirma package/application ID, assinatura e versionCode.",
        "Preserva o keystore da instalação funcional antes de limpar dados do Manager.",
        "Verifica se existe outra instância da app noutro perfil/Second Space.",
        "Usa apksigner para comparar certificados quando tens Android SDK disponível."
      ],
      "risk": "Médio"
    },
    {
      "id": "login",
      "label": "Login falha / GmsCore",
      "confidence": "OFICIAL",
      "chapters": [
        14,
        23
      ],
      "steps": [
        "Confirma que a build usa GmsCore support quando aplicável.",
        "Repatcha com os patches atuais se o problema surgiu após mudanças de autenticação.",
        "Atualiza GmsCore apenas quando necessário/indicado pelo fluxo oficial.",
        "Para separar rede de autenticação, testa temporariamente sem VPN/DNS filtrante."
      ],
      "risk": "Baixo"
    },
    {
      "id": "playback",
      "label": "Vídeo pausa, bufferiza, 403 ou não reproduz",
      "confidence": "OFICIAL",
      "chapters": [
        16,
        17,
        18,
        19,
        23
      ],
      "steps": [
        "Confirma que estás a usar patches atuais.",
        "Confirma Spoof video streams quando a build o usa.",
        "Testa o mesmo vídeo e muda apenas uma variável de cada vez.",
        "Se carrega lentamente ou bufferiza, testa outro cliente em ReVanced Settings > Miscellaneous > Spoof video streams > Default Client.",
        "Usa Stats for nerds para registar cliente, codec e comportamento."
      ],
      "risk": "Baixo"
    },
    {
      "id": "055",
      "label": "Vídeo pára perto de 0:55–1:00",
      "confidence": "CASO VALIDADO",
      "chapters": [
        17,
        18
      ],
      "steps": [
        "No caso documentado, o cliente era Android Reel (no auth) e o próprio ecrã avisava que o vídeo podia parar em 1:00.",
        "Foi testada uma única alteração: Default Client → visionOS.",
        "Após reiniciar totalmente o YouTube, o mesmo conteúdo passou do ponto de falha.",
        "Este resultado é local e não deve ser tratado como garantia universal."
      ],
      "risk": "Baixo"
    },
    {
      "id": "background",
      "label": "Só falha em background / ecrã desligado / PiP",
      "confidence": "OFICIAL",
      "chapters": [
        20,
        24
      ],
      "steps": [
        "Distingue playback normal de playback em background.",
        "Revê restrições de bateria e execução em segundo plano do fabricante.",
        "Se o vídeo pausa instantaneamente ao carregar Play, testa desativar PiP conforme o troubleshooting oficial.",
        "Retesta com o mesmo vídeo e mesmas condições."
      ],
      "risk": "Baixo"
    },
    {
      "id": "update",
      "label": "Problema começou depois de atualizar",
      "confidence": "WORKAROUND",
      "chapters": [
        25,
        28,
        33
      ],
      "steps": [
        "Regista a versão funcional anterior e a nova.",
        "Evita alterar simultaneamente APK, patches, GmsCore e cliente spoof.",
        "Cria uma build de controlo com defaults.",
        "Se necessário, faz rollback apenas para uma baseline conhecida e valida novamente."
      ],
      "risk": "Médio"
    },
    {
      "id": "report",
      "label": "Preciso de pedir ajuda / abrir bug report",
      "confidence": "OFICIAL",
      "chapters": [
        27,
        28,
        32
      ],
      "steps": [
        "Inclui versão do Manager, app/versionCode, Android e tipo root/non-root.",
        "Indica origem/formato do APK e seleção de patches.",
        "Anexa logs completos e a primeira exceção relevante.",
        "Descreve passos mínimos para reproduzir e todos os testes já executados."
      ],
      "risk": "Baixo"
    }
  ],
  "sources": [
    {
      "id": "R1",
      "name": "ReVanced - site/download oficial",
      "url": "https://revanced.app/download",
      "kind": "Oficial"
    },
    {
      "id": "R2",
      "name": "ReVanced Manager - prerequisites",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/0_prerequisites.md",
      "kind": "Oficial"
    },
    {
      "id": "R3",
      "name": "ReVanced Manager - patching apps",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_1_patching.md",
      "kind": "Oficial"
    },
    {
      "id": "R4",
      "name": "ReVanced Manager - settings",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_6_settings.md",
      "kind": "Oficial"
    },
    {
      "id": "R5",
      "name": "ReVanced Manager - troubleshooting",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/3_troubleshooting.md",
      "kind": "Oficial"
    },
    {
      "id": "R6",
      "name": "ReVanced documentation - troubleshooting",
      "url": "https://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.md",
      "kind": "Oficial"
    },
    {
      "id": "R7",
      "name": "ReVanced documentation - questions/logs",
      "url": "https://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/questions.md",
      "kind": "Oficial"
    },
    {
      "id": "R8",
      "name": "ReVanced Manager - managing patches",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_3_managing_patches.md",
      "kind": "Oficial"
    },
    {
      "id": "R9",
      "name": "ReVanced Manager - updating",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_5_updating.md",
      "kind": "Oficial"
    },
    {
      "id": "R10",
      "name": "ReVanced - playback issues fixed",
      "url": "https://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixed",
      "kind": "Oficial"
    },
    {
      "id": "R11",
      "name": "ReVanced - GmsCore/login fix",
      "url": "https://revanced.app/announcements?id=19-gmscore-updated-and-login-fixed",
      "kind": "Oficial"
    },
    {
      "id": "R12",
      "name": "ReVanced Manager - repository/releases",
      "url": "https://github.com/ReVanced/revanced-manager",
      "kind": "Oficial"
    },
    {
      "id": "R13",
      "name": "Android Developers - app updates/signing",
      "url": "https://developer.android.com/google/play/app-updates",
      "kind": "Primária"
    },
    {
      "id": "R14",
      "name": "Android Developers - App Bundle format",
      "url": "https://developer.android.com/guide/app-bundle/app-bundle-format",
      "kind": "Primária"
    },
    {
      "id": "R15",
      "name": "ReVanced Manager issue #3384",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3384",
      "kind": "Issue"
    },
    {
      "id": "R16",
      "name": "Android Developers - apksigner",
      "url": "https://developer.android.com/tools/apksigner",
      "kind": "Primária"
    },
    {
      "id": "R17",
      "name": "ReVanced - counterfeit notice",
      "url": "https://counterfeits.revanced.app/",
      "kind": "Oficial"
    }
  ],
  "currentReports": [
    {
      "issue": 3501,
      "title": "YouTube não carrega: vários clientes de streaming devolvem 400 e nenhum stream é obtido",
      "state": "OPEN",
      "reported": "2026-08-19",
      "classification": "RELATADO / MÚLTIPLOS RELATOS",
      "evidence": "Média",
      "scope": "YouTube / Spoof video streams / playback",
      "summary": "A issue oficial inclui logs com respostas 400 Bad Request em ANDROID_UNPLUGGED, ANDROID_CREATOR, IOS_UNPLUGGED e ANDROID_VR_AUTH, terminando em Could not fetch any client streams. Um segundo utilizador reportou sintoma semelhante. Ainda não existe confirmação upstream da causa nem fix oficial.",
      "action": "Confirmar versão do YouTube, patches e ReVanced Manager; guardar logs antes de alterar definições. Testar apenas um cliente de Spoof video streams de cada vez e reiniciar totalmente a app entre testes. Se todos os clientes devolverem 400, não limpar conta nem reinstalar GmsCore por defeito; aguardar confirmação upstream ou patches atualizados.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3501"
    },
    {
      "issue": 387,
      "title": "Após reset, adicionar conta no GmsCore falhou; reinstalar o YouTube patched resolveu o caso do autor",
      "state": "CLOSED",
      "reported": "2026-08-18",
      "classification": "RELATADO / WORKAROUND DO AUTOR",
      "evidence": "Baixa",
      "scope": "GmsCore / login após factory reset",
      "summary": "Após um factory reset, um utilizador reportou que o GmsCore devolvia uma mensagem genérica ao adicionar a conta. A issue foi encerrada depois de o próprio autor indicar que reinstalar o YouTube ReVanced resolveu o seu caso. Não há logs, confirmação upstream nem evidência suficiente para tratar isto como correção universal.",
      "action": "Se o sintoma coincidir, confirmar primeiro versões e instalação correta de GmsCore/YouTube. Uma reinstalação controlada do YouTube patched pode ser testada sem alterar identidade do dispositivo nem outras opções. Se resultar, tratar apenas como workaround local e registar versões/logs.",
      "url": "https://github.com/ReVanced/GmsCore/issues/387"
    },
    {
      "issue": 3500,
      "title": "YouTube Shorts: algumas pré-visualizações aparecem em ecrã inteiro",
      "state": "OPEN",
      "reported": "2026-08-16",
      "classification": "RELATADO / NÃO CONFIRMADO",
      "evidence": "Baixa",
      "scope": "YouTube Shorts",
      "summary": "Foi reportado que algumas pré-visualizações de Shorts aparecem como ecrã inteiro. O relatório não inclui patch log nem debug log.",
      "action": "Não alterar configuração com base apenas neste relato. Recolher versão do YouTube, patches e logs se o sintoma for reproduzido.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3500"
    },
    {
      "issue": 3499,
      "title": "Vídeo demora ~30 s a iniciar, baixa qualidade e seletor indisponível",
      "state": "CLOSED",
      "reported": "2026-08-15",
      "classification": "RELATADO + WORKAROUND COMUNITÁRIO",
      "evidence": "Média",
      "scope": "YouTube / Spoof video streams",
      "summary": "O autor reportou atraso antes do playback, qualidade baixa e opção de qualidade indisponível. Há debug logs anexados. O autor confirmou que uma alteração de cliente spoof resolveu o seu caso, mas outro utilizador reportou que a mesma abordagem não funcionou. A issue foi encerrada como completed em 2026-08-18; continua sem fix oficial documentado.",
      "action": "Se o padrão coincidir, testar um único cliente alternativo em Spoof video streams, reiniciar totalmente a app e repetir o mesmo vídeo. Registar o resultado. Não promover visionOS como solução universal.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3499"
    },
    {
      "issue": 3498,
      "title": "Avançar/seek no vídeo pode bloquear a reprodução",
      "state": "CLOSED",
      "reported": "2026-08-15",
      "classification": "WORKAROUND CONFIRMADO PELO AUTOR",
      "evidence": "Média",
      "scope": "YouTube / seeking / spoof client",
      "summary": "Ao avançar numa reprodução, o vídeo podia bloquear e não retomar. O autor confirmou que visionOS e Android VR funcionaram no seu dispositivo, enquanto Android Reel / Android Reel (no auth) não funcionaram. A issue foi encerrada como completed em 2026-08-16.",
      "action": "Usar a mesma metodologia controlada: mudar apenas o Default Client, reiniciar totalmente o YouTube e retestar o mesmo conteúdo. Tratar como workaround por dispositivo, não como fix oficial.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3498"
    },
    {
      "issue": 3496,
      "title": "Ecrã escurece ao entrar em fullscreen",
      "state": "CLOSED",
      "reported": "2026-08-14",
      "classification": "RELATADO / SEM FIX DOCUMENTADO",
      "evidence": "Média",
      "scope": "YouTube / fullscreen",
      "summary": "Foi reportado que o ecrã escurece ao entrar em fullscreen, com logcat anexado. A issue foi encerrada como completed no próprio dia, sem comentários ou procedimento de correção documentado.",
      "action": "Não inventar solução. Se reproduzido, guardar logs, comparar com YouTube oficial e testar uma baseline de patches predefinidos.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3496"
    },
    {
      "issue": 3494,
      "title": "Livestream pausa cerca de 1 minuto após entrar",
      "state": "OPEN",
      "reported": "2026-08-10",
      "classification": "RELATADO / NÃO CONFIRMADO",
      "evidence": "Média",
      "scope": "YouTube Live / playback",
      "summary": "Em transmissões em direto, o vídeo é reportado como pausando cerca de um minuto depois de entrar; fechar e reabrir a live só resolve temporariamente. Há debug log anexado.",
      "action": "Distinguir este caso do bug em vídeos normais. Recolher Stats for nerds e cliente spoof; alterar apenas uma variável por teste.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3494"
    },
    {
      "issue": 384,
      "title": "GmsCore: processo persistente pode terminar com AuthenticatorException timeout",
      "state": "OPEN",
      "reported": "2026-08-09",
      "classification": "RELATADO / EVIDÊNCIA TÉCNICA",
      "evidence": "Média",
      "scope": "GmsCore / Android 16 / autenticação",
      "summary": "Um relatório no repositório oficial do GmsCore inclui stack trace de um crash do processo :persistent causado por android.accounts.AuthenticatorException: timeout durante comunicação com AccountManager. O dispositivo estava sob carga elevada; ainda não existe confirmação de causa geral nem correção upstream documentada.",
      "action": "Se login ou sincronização falhar, guardar logcat e procurar AuthenticatorException: timeout. Repetir o teste com o dispositivo em carga normal e registar versão do GmsCore/Android antes de limpar contas ou reinstalar componentes.",
      "url": "https://github.com/ReVanced/GmsCore/issues/384"
    },
    {
      "issue": 3490,
      "title": "UI pode ficar sem responder durante a notificação Skip do SponsorBlock",
      "state": "OPEN",
      "reported": "2026-08-08",
      "classification": "RELATADO / NÃO CONFIRMADO",
      "evidence": "Média",
      "scope": "YouTube / SponsorBlock / UI",
      "summary": "O relatório descreve bloqueio temporário de gestos/toques, até cerca de 4 s, quando aparece a notificação Skip do SponsorBlock. Inclui logcat e vídeo.",
      "action": "Se reproduzido, registar dispositivo, versão, patches e duração do bloqueio. Não desativar componentes não relacionados sem teste A/B.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3490"
    },
    {
      "issue": 3488,
      "title": "Playback pode parar/retroceder ao sair da app ou desligar o ecrã",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "RELATADO / EVIDÊNCIA LIMITADA",
      "evidence": "Baixa",
      "scope": "YouTube / background",
      "summary": "Foi reportado que, ao sair da app ou desligar o ecrã, a reprodução para durante alguns segundos e por vezes recua alguns segundos. O relatório não fornece logs técnicos úteis.",
      "action": "Antes de atribuir ao ReVanced, excluir restrições de bateria/background do fabricante e comparar foreground vs background no mesmo vídeo.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3488"
    },
    {
      "issue": 3486,
      "title": "Shorts: ecrãs pretos e anúncios apesar dos patches",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "RELATADO / EVIDÊNCIA LIMITADA",
      "evidence": "Baixa",
      "scope": "YouTube Shorts / ads",
      "summary": "Foi reportado que, ao fazer swipe entre Shorts, surgem ecrãs pretos ou anúncios sem os controlos normais. O relatório inclui imagens mas não logs de diagnóstico úteis.",
      "action": "Tratar como relato aberto. Confirmar versão, patches e se o comportamento também existe com seleção predefinida antes de sugerir alterações.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3486"
    },
    {
      "issue": 3484,
      "title": "Instagram: patch Disable analytics pode falhar com Required value was null",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "RELATADO / EVIDÊNCIA TÉCNICA",
      "evidence": "Alta",
      "scope": "Instagram / patching",
      "summary": "O log publicado mostra PatchException no patch Disable analytics, causada por Required value was null durante matching de bytecode. Isto indica incompatibilidade concreta entre a versão da app e o patch, não um simples erro genérico do Manager.",
      "action": "Usar versão compatível/sugerida e patches atuais. Não insistir em várias versões aleatórias. Guardar o stack trace e verificar se a incompatibilidade foi corrigida upstream antes de repatchar.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3484"
    }
  ]
};
