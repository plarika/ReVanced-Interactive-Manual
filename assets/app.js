(() => {
  'use strict';

  const D = window.MANUAL_DATA;
  if (!D || !Array.isArray(D.chapters) || !Array.isArray(D.diagnostics) || !Array.isArray(D.sources)) {
    console.error('MANUAL_DATA ausente ou inválido.');
    return;
  }

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[c]);

  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch {}
    }
  };

  const announce = (message) => {
    const live = $('#statusLive');
    if (!live) return;
    live.textContent = '';
    setTimeout(() => { live.textContent = message; }, 10);
  };

  const normalize = (value) => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-PT')
    .replace(/\s+/g, ' ')
    .trim();

  const safeUrl = (value) => {
    try {
      const url = new URL(String(value), location.href);
      if (url.protocol === 'https:' || url.origin === location.origin) return url.href;
    } catch {}
    return '#';
  };

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  // Theme
  const themeKey = 'revanced-manual-theme';
  const savedTheme = storage.get(themeKey, '');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.dataset.theme = savedTheme;
  }

  $('#themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    storage.set(themeKey, next);
    announce(`Tema ${next === 'light' ? 'claro' : 'escuro'} ativo.`);
  });

  // Mobile navigation
  const menuToggle = $('#mobileMenuToggle');
  const menuClose = $('#mobileMenuClose');
  const navBackdrop = $('#navBackdrop');
  const sidebar = $('#sidebar');
  let menuReturnFocus = null;

  function setMobileMenu(open) {
    const mobile = matchMedia('(max-width: 900px)').matches;
    if (!mobile) open = false;
    document.body.classList.toggle('nav-open', open);
    navBackdrop?.classList.toggle('hidden', !open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    if (sidebar) {
      if (mobile) sidebar.setAttribute('aria-hidden', String(!open));
      else sidebar.removeAttribute('aria-hidden');
    }
    if (open) {
      menuReturnFocus = document.activeElement;
      setTimeout(() => $('#mobileMenuClose')?.focus(), 20);
    } else if (menuReturnFocus instanceof HTMLElement && mobile) {
      menuReturnFocus.focus();
      menuReturnFocus = null;
    }
  }

  menuToggle?.addEventListener('click', () => setMobileMenu(true));
  menuClose?.addEventListener('click', () => setMobileMenu(false));
  navBackdrop?.addEventListener('click', () => setMobileMenu(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) setMobileMenu(false);
  });
  matchMedia('(max-width: 900px)').addEventListener('change', () => setMobileMenu(false));
  setMobileMenu(false);

  // Tabs
  const validViews = new Set(['wizard', 'reports', 'manual', 'case', 'advanced', 'sources']);

  function setView(name, { updateHash = false, focus = false } = {}) {
    if (!validViews.has(name)) return;
    $$('.view').forEach((view) => {
      const active = view.id === `view-${name}`;
      view.classList.toggle('active', active);
      view.hidden = !active;
    });
    $$('.tab').forEach((tab) => {
      const active = tab.dataset.view === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    if (updateHash) history.replaceState(null, '', `#view-${name}`);
    if (focus) $(`#view-${name}`)?.focus?.({ preventScroll: true });
    setMobileMenu(false);
  }

  const tabs = $$('.tab');
  tabs.forEach((tab) => tab.addEventListener('click', () => setView(tab.dataset.view, { updateHash: true })));
  tabs.forEach((tab, index) => tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    const next = tabs[nextIndex];
    setView(next.dataset.view);
    next.focus();
  }));
  $$('.sidebar-view').forEach((button) => button.addEventListener('click', () => {
    setView(button.dataset.target, { updateHash: true });
  }));

  // Chapters + progress
  const doneKey = 'revanced-manual-reviewed';
  const lastChapterKey = 'revanced-manual-last-chapter';
  let reviewed;
  try {
    reviewed = new Set(JSON.parse(storage.get(doneKey, '[]')).map(Number).filter(Number.isFinite));
  } catch {
    reviewed = new Set();
  }

  $('#chapterCount').textContent = String(D.chapters.length);
  $('#runbookCount').textContent = String(D.diagnostics.length);

  const nav = $('#chapterNav');
  const chaptersRoot = $('#chaptersRoot');

  function chapterHTML(ch) {
    return `<details class="chapter" id="chapter-${ch.id}" data-id="${ch.id}" data-order="${ch.id}">
      <summary><span class="badge">${ch.id}</span><span class="chapter-title">${esc(ch.title)}</span></summary>
      <div class="chapter-body">
        <div class="chapter-tools">
          <button class="btn copy-link" data-id="${ch.id}" type="button">Copiar ligação</button>
          <button class="btn mark-done" data-id="${ch.id}" type="button">Marcar revisto</button>
        </div>
        <div class="chapter-text">${esc(ch.text)}</div>
      </div>
    </details>`;
  }

  D.chapters.forEach((ch) => {
    const button = document.createElement('button');
    button.className = 'navbtn';
    button.type = 'button';
    button.textContent = `${ch.id}. ${ch.title}`;
    button.dataset.chapter = ch.id;
    button.addEventListener('click', () => openChapter(ch.id));
    nav?.appendChild(button);
  });

  if (chaptersRoot) chaptersRoot.innerHTML = D.chapters.map(chapterHTML).join('');

  function updateProgress() {
    $$('.mark-done').forEach((button) => {
      const id = Number(button.dataset.id);
      const yes = reviewed.has(id);
      button.textContent = yes ? 'Revisto ✓' : 'Marcar revisto';
      button.classList.toggle('primary', yes);
      $(`#chapter-${id}`)?.classList.toggle('is-reviewed', yes);
    });

    const count = [...reviewed].filter((id) => D.chapters.some((ch) => Number(ch.id) === id)).length;
    const pct = D.chapters.length ? Math.round((count / D.chapters.length) * 100) : 0;
    $('#reviewedCount').textContent = String(count);
    $('#globalProgressText').textContent = `${pct}%`;
    $('#globalProgressBar').style.width = `${pct}%`;

    const last = Number(storage.get(lastChapterKey, ''));
    const continueButton = $('#continueReading');
    const exists = D.chapters.some((ch) => Number(ch.id) === last);
    continueButton?.classList.toggle('hidden', !exists);
    if (exists) continueButton.dataset.chapter = String(last);
  }

  function openChapter(id) {
    const numericId = Number(id);
    const el = $(`#chapter-${numericId}`);
    if (!el) return;
    setView('manual');
    el.open = true;
    storage.set(lastChapterKey, String(numericId));
    updateProgress();
    history.replaceState(null, '', `#chapter-${numericId}`);
    $$('.navbtn[data-chapter]').forEach((button) => {
      button.classList.toggle('active', Number(button.dataset.chapter) === numericId);
    });
    el.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    setMobileMenu(false);
  }

  $$('.mark-done').forEach((button) => button.addEventListener('click', () => {
    const id = Number(button.dataset.id);
    reviewed.has(id) ? reviewed.delete(id) : reviewed.add(id);
    storage.set(doneKey, JSON.stringify([...reviewed].sort((a, b) => a - b)));
    updateProgress();
    announce(reviewed.has(id) ? `Capítulo ${id} marcado como revisto.` : `Capítulo ${id} marcado como pendente.`);
  }));

  $$('.copy-link').forEach((button) => button.addEventListener('click', async () => {
    const url = `${location.href.split('#')[0]}#chapter-${button.dataset.id}`;
    const original = button.textContent;
    const copied = await copyText(url);
    button.textContent = copied ? 'Ligação copiada ✓' : 'Copia manualmente';
    setTimeout(() => { button.textContent = original; }, 1400);
  }));

  $('#continueReading')?.addEventListener('click', (event) => openChapter(event.currentTarget.dataset.chapter));
  updateProgress();

  // Search: multi-token, accent-insensitive, relevance sorted.
  const searchInput = $('#search');

  const searchIndex = D.chapters.map((ch, position) => ({
    id: Number(ch.id),
    position,
    title: normalize(ch.title),
    body: normalize(ch.search || `${ch.title} ${ch.text}`)
  }));

  function scoreEntry(entry, query, tokens) {
    if (!query) return 0;
    let score = 0;
    if (entry.title === query) score += 120;
    if (entry.title.includes(query)) score += 60;
    if (entry.body.includes(query)) score += 25;
    for (const token of tokens) {
      if (entry.title.includes(token)) score += 20;
      if (entry.body.includes(token)) score += 5;
    }
    return score;
  }

  function highlightTitle(el, rawQuery) {
    const id = Number(el.dataset.id);
    const chapter = D.chapters.find((ch) => Number(ch.id) === id);
    const target = $('.chapter-title', el);
    if (!target || !chapter) return;
    const rawTokens = rawQuery.trim().split(/\s+/).filter(Boolean).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!rawTokens.length) {
      target.textContent = chapter.title;
      return;
    }
    const regex = new RegExp(`(${rawTokens.join('|')})`, 'gi');
    const parts = chapter.title.split(regex);
    target.replaceChildren(...parts.map((part) => {
      if (regex.test(part)) {
        regex.lastIndex = 0;
        const mark = document.createElement('mark');
        mark.textContent = part;
        return mark;
      }
      regex.lastIndex = 0;
      return document.createTextNode(part);
    }));
  }

  function runSearch() {
    if (!searchInput || !chaptersRoot) return;
    const raw = searchInput.value.trim();
    const query = normalize(raw);
    const tokens = query.split(' ').filter(Boolean);
    const results = searchIndex
      .map((entry) => ({ ...entry, score: scoreEntry(entry, query, tokens) }))
      .filter((entry) => !query || tokens.every((token) => entry.title.includes(token) || entry.body.includes(token)))
      .sort((a, b) => query ? (b.score - a.score || a.position - b.position) : a.position - b.position);

    const visibleIds = new Set(results.map((x) => x.id));
    const fragment = document.createDocumentFragment();

    results.forEach((result) => {
      const el = $(`#chapter-${result.id}`);
      if (!el) return;
      el.classList.remove('hidden');
      if (query) el.open = true;
      highlightTitle(el, raw);
      fragment.appendChild(el);
    });

    D.chapters.forEach((ch) => {
      const el = $(`#chapter-${ch.id}`);
      if (!el || visibleIds.has(Number(ch.id))) return;
      el.classList.add('hidden');
      highlightTitle(el, '');
      fragment.appendChild(el);
    });

    chaptersRoot.appendChild(fragment);
    $('#searchCount').textContent = query
      ? `${results.length} capítulo(s) · ordenados por relevância`
      : 'Todos os capítulos';
    $('#emptySearch').classList.toggle('hidden', results.length !== 0);
  }

  searchInput?.addEventListener('input', runSearch);
  $$('.quick-search').forEach((button) => button.addEventListener('click', () => {
    searchInput.value = button.dataset.q || '';
    setView('manual', { updateHash: true });
    runSearch();
    searchInput.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
    searchInput.focus({ preventScroll: true });
  }));

  // Current reports
  const reportsRoot = $('#reportsRoot');
  if (reportsRoot && Array.isArray(D.currentReports)) {
    reportsRoot.innerHTML = D.currentReports.map((r) => {
      const evClass = r.evidence === 'Alta' ? 'evidence-high' : r.evidence === 'Média' ? 'evidence-medium' : 'evidence-low';
      const stClass = r.state === 'OPEN' ? 'state-open' : 'state-closed';
      const url = safeUrl(r.url);
      return `<article class="report-card">
        <div class="report-head">
          <span class="badge ${stClass}">#${esc(r.issue)} · ${esc(r.state)}</span>
          <span class="badge">${esc(r.classification)}</span>
          <span class="badge ${evClass}">Evidência ${esc(r.evidence)}</span>
        </div>
        <div class="report-title">${esc(r.title)}</div>
        <div class="report-meta">${esc(r.scope)} · reportado ${esc(r.reported)}</div>
        <p>${esc(r.summary)}</p>
        <div class="callout"><strong>Ação segura:</strong> ${esc(r.action)}</div>
        <div class="report-actions">
          <a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Abrir issue oficial</a>
        </div>
      </article>`;
    }).join('');
  }

  // Guided diagnostics
  const diagRoot = $('#diagRoot');
  if (diagRoot) {
    diagRoot.innerHTML = D.diagnostics.map((d) => `<article class="diag-card">
      <button type="button" data-diag="${esc(d.id)}">
        <div>
          <span class="badge ${d.confidence === 'OFICIAL' ? 'official' : d.confidence === 'CASO VALIDADO' ? 'validated' : 'workaround'}">${esc(d.confidence)}</span>
          <span class="badge">Risco ${esc(d.risk)}</span>
        </div>
        <h3>${esc(d.label)}</h3>
        <p class="muted">Capítulos ${d.chapters.map(esc).join(', ')}</p>
      </button>
    </article>`).join('');
  }

  function showDiagnostic(id, { updateHash = true } = {}) {
    const d = D.diagnostics.find((x) => String(x.id) === String(id));
    if (!d) return;
    setView('wizard');
    $('#diagResult').innerHTML = `<div class="panel result" aria-live="polite">
      <div class="kicker">${esc(d.confidence)} · risco ${esc(d.risk)}</div>
      <h2>${esc(d.label)}</h2>
      <ol class="steps">${d.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <div class="chapter-tools">
        ${d.chapters.map((c) => `<button type="button" class="btn goto-chapter" data-id="${esc(c)}">Abrir capítulo ${esc(c)}</button>`).join('')}
      </div>
      <div class="callout warn">Regra: altera uma variável de cada vez e regista o resultado.</div>
    </div>`;
    $$('.goto-chapter', $('#diagResult')).forEach((button) => button.addEventListener('click', () => openChapter(button.dataset.id)));
    if (updateHash) history.replaceState(null, '', `#diag-${encodeURIComponent(d.id)}`);
    $('#diagResult').scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  }

  $$('[data-diag]').forEach((button) => button.addEventListener('click', () => showDiagnostic(button.dataset.diag)));

  // Validated case checklist
  const caseSteps = [
    'Confirmar que o sintoma ocorre perto de 0:55–1:00.',
    'Anotar o cliente Spoof atual.',
    'Alterar apenas Default Client.',
    'Fechar completamente o YouTube e reabrir.',
    'Reproduzir o mesmo conteúdo durante pelo menos 2–3 minutos.',
    'Registar se a falha desapareceu e manter a configuração como baseline apenas nesse dispositivo.'
  ];
  const caseKey = 'revanced-case055-checklist';
  let caseState;
  try {
    caseState = JSON.parse(storage.get(caseKey, '[]')).map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n < caseSteps.length);
  } catch {
    caseState = [];
  }

  $('#caseChecklist').innerHTML = caseSteps.map((s, i) =>
    `<label class="checkrow"><input type="checkbox" data-case="${i}" ${caseState.includes(i) ? 'checked' : ''}><span>${esc(s)}</span></label>`
  ).join('');

  function updateCaseProgress() {
    caseState = $$('[data-case]').filter((x) => x.checked).map((x) => Number(x.dataset.case));
    storage.set(caseKey, JSON.stringify(caseState));
    const pct = Math.round((caseState.length / caseSteps.length) * 100);
    $('#caseProgressBar').style.width = `${pct}%`;
    $('#caseProgressText').textContent = `${pct}%`;
  }

  $$('[data-case]').forEach((checkbox) => checkbox.addEventListener('change', updateCaseProgress));
  updateCaseProgress();

  // OS-aware commands
  const osKey = 'revanced-manual-terminal';
  const allowedOs = new Set(['powershell', 'cmd', 'unix']);
  const commands = {
    powershell: {
      logcat: 'adb logcat -c\nadb logcat -v time > revanced-log.txt',
      certs: 'apksigner verify --print-certs app-patched.apk',
      packages: 'adb shell pm list packages | Select-String -Pattern "youtube"'
    },
    cmd: {
      logcat: 'adb logcat -c\nadb logcat -v time > revanced-log.txt',
      certs: 'apksigner verify --print-certs app-patched.apk',
      packages: 'adb shell pm list packages | findstr /I youtube'
    },
    unix: {
      logcat: 'adb logcat -c\nadb logcat -v time > revanced-log.txt',
      certs: 'apksigner verify --print-certs app-patched.apk',
      packages: 'adb shell pm list packages | grep -i youtube'
    }
  };

  const osSelect = $('#osSelect');
  let currentOs = storage.get(osKey, 'powershell');
  if (!allowedOs.has(currentOs)) currentOs = 'powershell';
  if (osSelect) osSelect.value = currentOs;

  function renderCommands() {
    currentOs = allowedOs.has(osSelect?.value) ? osSelect.value : 'powershell';
    storage.set(osKey, currentOs);
    Object.entries(commands[currentOs]).forEach(([key, value]) => {
      const el = $(`#command-${key}`);
      if (el) el.textContent = value;
    });
  }

  osSelect?.addEventListener('change', renderCommands);
  renderCommands();

  async function copyText(text) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API indisponível');
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  $$('[data-copy-command]').forEach((button) => button.addEventListener('click', async () => {
    const key = button.dataset.copyCommand;
    const text = commands[currentOs]?.[key] || '';
    const original = button.textContent;
    const ok = await copyText(text);
    if (ok) {
      button.textContent = 'Copiado ✓';
      announce('Comando copiado.');
    } else {
      window.prompt('Copia o comando:', text);
    }
    setTimeout(() => { button.textContent = original; }, 1400);
  }));

  // Sources
  const sourcesRoot = $('#sourcesRoot');
  if (sourcesRoot) {
    sourcesRoot.innerHTML = D.sources.map((s) => `<div class="source">
      <strong>${esc(s.id)}</strong>
      <a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>
      <span class="badge">${esc(s.kind)}</span>
    </div>`).join('');
  }

  // Progress import/export
  $('#exportProgress')?.addEventListener('click', () => {
    const payload = {
      schema: 1,
      app: 'ReVanced Interactive Manual',
      version: '3.1.0',
      exportedAt: new Date().toISOString(),
      reviewed: [...reviewed].sort((a, b) => a - b),
      caseState: [...caseState].sort((a, b) => a - b),
      lastChapter: Number(storage.get(lastChapterKey, '')) || null,
      theme: document.documentElement.dataset.theme || 'dark',
      terminal: currentOs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'revanced-manual-progress.json';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    announce('Progresso exportado.');
  });

  $('#importProgress')?.addEventListener('click', () => $('#importProgressFile')?.click());
  $('#importProgressFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 64 * 1024) {
      alert('O ficheiro de progresso é demasiado grande.');
      return;
    }
    try {
      const imported = JSON.parse(await file.text());
      if (!imported || imported.schema !== 1 || !Array.isArray(imported.reviewed) || !Array.isArray(imported.caseState)) {
        throw new Error('Formato inválido');
      }
      const validChapterIds = new Set(D.chapters.map((ch) => Number(ch.id)));
      reviewed = new Set(imported.reviewed.map(Number).filter((id) => validChapterIds.has(id)));
      caseState = imported.caseState.map(Number).filter((i) => Number.isInteger(i) && i >= 0 && i < caseSteps.length);

      storage.set(doneKey, JSON.stringify([...reviewed]));
      storage.set(caseKey, JSON.stringify(caseState));
      if (Number.isFinite(Number(imported.lastChapter)) && validChapterIds.has(Number(imported.lastChapter))) {
        storage.set(lastChapterKey, String(Number(imported.lastChapter)));
      }
      if (imported.theme === 'light' || imported.theme === 'dark') {
        document.documentElement.dataset.theme = imported.theme;
        storage.set(themeKey, imported.theme);
      }
      if (allowedOs.has(imported.terminal)) {
        osSelect.value = imported.terminal;
        renderCommands();
      }

      $$('[data-case]').forEach((x) => { x.checked = caseState.includes(Number(x.dataset.case)); });
      updateCaseProgress();
      updateProgress();
      announce('Progresso importado com sucesso.');
    } catch {
      alert('Não foi possível importar o ficheiro. Confirma que foi exportado por esta versão do manual.');
    }
  });

  $('#resetProgress')?.addEventListener('click', () => {
    if (!confirm('Apagar o progresso local deste manual?')) return;
    storage.remove(doneKey);
    storage.remove(caseKey);
    storage.remove(lastChapterKey);
    reviewed = new Set();
    caseState = [];
    $$('[data-case]').forEach((x) => { x.checked = false; });
    updateProgress();
    updateCaseProgress();
    announce('Progresso local apagado.');
  });

  $('#printManual')?.addEventListener('click', () => window.print());

  // PWA install + safe update flow
  let deferredInstallPrompt = null;
  const installButton = $('#installApp');

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton?.classList.remove('hidden');
  });

  installButton?.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.classList.add('hidden');
  });

  window.addEventListener('appinstalled', () => {
    installButton?.classList.add('hidden');
    deferredInstallPrompt = null;
    announce('Manual instalado como aplicação.');
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js', { scope: './' });
        const showUpdate = (worker) => {
          if (!navigator.serviceWorker.controller || !worker) return;
          $('#updateToast')?.classList.remove('hidden');
          $('#reloadForUpdate').onclick = () => worker.postMessage({ type: 'SKIP_WAITING' });
        };

        if (registration.waiting) showUpdate(registration.waiting);
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed') showUpdate(worker);
          });
        });

        let reloading = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (reloading) return;
          reloading = true;
          location.reload();
        });
      } catch (error) {
        console.warn('Service Worker não registado:', error);
      }
    });
  }

  // Deep links
  function applyDeepLink() {
    const hash = location.hash;
    if (hash.startsWith('#chapter-')) {
      const id = Number(hash.slice('#chapter-'.length));
      if (Number.isFinite(id)) setTimeout(() => openChapter(id), 30);
      return;
    }
    if (hash.startsWith('#diag-')) {
      const id = decodeURIComponent(hash.slice('#diag-'.length));
      setTimeout(() => showDiagnostic(id, { updateHash: false }), 30);
      return;
    }
    if (hash.startsWith('#view-')) {
      const view = hash.slice('#view-'.length);
      if (validViews.has(view)) setView(view);
    }
  }

  window.addEventListener('hashchange', applyDeepLink);
  applyDeepLink();
})();
