(() => {
  'use strict';

  const D = window.MANUAL_DATA;
  if (!D || !Array.isArray(D.chapters) || !Array.isArray(D.diagnostics) || !Array.isArray(D.sources)) {
    console.error('MANUAL_DATA is missing or invalid.');
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
    .toLocaleLowerCase('en')
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
    announce(`${next === 'light' ? 'Light' : 'Dark'} theme active.`);
  });

  // Language
  const languageKey = 'revanced-manual-language';
  const currentLanguage = document.documentElement.lang === 'pt-PT' ? 'pt-PT' : 'en';
  storage.set(languageKey, currentLanguage);
  $('#langEn')?.classList.toggle('active', currentLanguage === 'en');
  $('#langPt')?.classList.toggle('active', currentLanguage === 'pt-PT');

  function switchLanguage(language) {
    if (!['en', 'pt-PT'].includes(language) || language === currentLanguage) return;
    storage.set(languageKey, language);
    const target = language === 'pt-PT' ? 'index.pt.html' : 'index.html';
    location.href = `${target}${location.hash || '#view-home'}`;
  }

  $('#langEn')?.addEventListener('click', () => switchLanguage('en'));
  $('#langPt')?.addEventListener('click', () => switchLanguage('pt-PT'));

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
  const validViews = new Set(['home', 'wizard', 'reports', 'manual', 'case', 'sources']);

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
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    setView(tab.dataset.view, { updateHash: true });
    if (tab.dataset.view === 'manual') openManualStart({ updateHash: true, scroll: false });
  }));
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
    if (next.dataset.view === 'manual') openManualStart({ updateHash: true, scroll: false });
    next.focus();
  }));
  $$('.sidebar-view').forEach((button) => button.addEventListener('click', () => {
    setView(button.dataset.target, { updateHash: true });
    if (button.dataset.target === 'manual') openManualStart({ updateHash: true, scroll: false });
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

  const manualIndex = $('#manualIndex');
  const readerRoot = $('#readerRoot');
  const printManualRoot = $('#printManualRoot');

  function manualColumns(rawLine) {
    const clean = String(rawLine || '').trim();
    return clean ? clean.split(/\s{2,}/).map((part) => part.trim()).filter(Boolean) : [];
  }

  function manualColumnLayout(rawLine) {
    const raw = String(rawLine || '').replace(/\s+$/, '');
    const cells = manualColumns(raw);
    const starts = [];
    let cursor = 0;
    cells.forEach((cell, index) => {
      const found = raw.indexOf(cell, cursor);
      starts.push(index === 0 ? 0 : Math.max(0, found));
      cursor = Math.max(0, found) + cell.length;
    });
    return { cells, starts };
  }

  function manualTableCells(blockLines, starts) {
    const values = starts.map(() => []);
    blockLines.forEach((line) => {
      starts.forEach((start, index) => {
        const end = index + 1 < starts.length ? starts[index + 1] : line.length;
        const piece = line.slice(start, end).trim();
        if (piece) values[index].push(piece);
      });
    });
    return values.map((parts) => parts.join(' ').trim());
  }

  function renderManualDataRow(cells, isHeader = false) {
    const normalized = cells.length > 3 ? [...cells.slice(0, 2), cells.slice(2).join(' ')] : cells;
    const count = Math.min(normalized.length, 3);
    return `<div class="manual-data-row manual-cols-${count}${isHeader ? ' is-header' : ''}">${normalized.map((cell) => `<span>${esc(cell)}</span>`).join('')}</div>`;
  }

  function renderChapterText(text) {
    const lines = String(text ?? '').replace(/\r/g, '').split('\n');
    const output = [];
    let paragraph = [];
    let tableStarts = null;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${esc(paragraph.join(' '))}</p>`);
      paragraph = [];
    };
    const nonEmptyLine = (start, step) => {
      for (let i = start; i >= 0 && i < lines.length; i += step) {
        if (lines[i].trim()) return lines[i];
      }
      return '';
    };

    for (let i = 0; i < lines.length; i += 1) {
      const raw = lines[i].replace(/\s+$/, '');
      const trimmed = raw.trim();
      if (!trimmed) {
        flushParagraph();
        continue;
      }

      const earlySubsection = trimmed.match(/^\d+\.\d+\s+.+/);
      const earlyLetters = trimmed.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
      const earlyCallout = earlyLetters.length >= 4 && trimmed.length <= 60 && trimmed === trimmed.toUpperCase();
      if (earlySubsection || earlyCallout) {
        tableStarts = null;
        flushParagraph();
        if (earlySubsection) output.push(`<h4 class="manual-subhead">${esc(trimmed)}</h4>`);
        else output.push(`<div class="manual-callout-title">${esc(trimmed)}</div>`);
        continue;
      }

      if (tableStarts) {
        let end = i;
        while (end + 1 < lines.length && lines[end + 1].trim()) end += 1;
        const cells = manualTableCells(lines.slice(i, end + 1), tableStarts);
        if (cells.filter(Boolean).length >= 2) {
          flushParagraph();
          output.push(renderManualDataRow(cells));
          i = end;
          continue;
        }
        tableStarts = null;
      }

      const subsection = trimmed.match(/^\d+\.\d+\s+.+/);
      if (subsection) {
        flushParagraph();
        output.push(`<h4 class="manual-subhead">${esc(trimmed)}</h4>`);
        continue;
      }

      const numbered = trimmed.match(/^(\d+)\.\s+(.+)$/);
      if (numbered) {
        flushParagraph();
        let body = numbered[2];
        while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1]) && manualColumns(lines[i + 1]).length <= 1) {
          body += ` ${lines[i + 1].trim()}`;
          i += 1;
        }
        output.push(`<div class="manual-step"><span class="manual-step-number">${esc(numbered[1])}</span><span>${esc(body)}</span></div>`);
        continue;
      }

      const bullet = trimmed.match(/^[•*-]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        output.push(`<div class="manual-bullet"><span aria-hidden="true">•</span><span>${esc(bullet[1])}</span></div>`);
        continue;
      }

      const columns = manualColumns(raw);
      if (columns.length >= 2) {
        flushParagraph();
        const prevColumns = manualColumns(nonEmptyLine(i - 1, -1));
        const nextColumns = manualColumns(nonEmptyLine(i + 1, 1));
        const isHeader = prevColumns.length < 2 && nextColumns.length >= 2;
        if (isHeader) {
          const layout = manualColumnLayout(raw);
          tableStarts = layout.starts;
          output.push(renderManualDataRow(layout.cells, true));
        } else {
          output.push(renderManualDataRow(columns));
        }
        continue;
      }

      const letters = trimmed.replace(/[^A-Za-zÀ-ÿ]/g, '');
      const isCalloutTitle = letters.length >= 4 && trimmed.length <= 60 && trimmed === trimmed.toUpperCase();
      if (isCalloutTitle) {
        flushParagraph();
        output.push(`<div class="manual-callout-title">${esc(trimmed)}</div>`);
        continue;
      }

      const next = nonEmptyLine(i + 1, 1);
      if (trimmed.length <= 60 && !/[.!?:;]$/.test(trimmed) && manualColumns(next).length >= 2) {
        flushParagraph();
        output.push(`<h4 class="manual-subhead">${esc(trimmed)}</h4>`);
        continue;
      }

      paragraph.push(trimmed);
    }
    flushParagraph();
    return `<div class="chapter-text">${output.join('')}</div>`;
  }

  if (printManualRoot) {
    printManualRoot.innerHTML = D.chapters.map((ch) => `<article class="print-chapter">
      <div class="eyebrow">Chapter ${esc(ch.id)}</div>
      <h2>${esc(ch.title)}</h2>
      ${renderChapterText(ch.text)}
    </article>`).join('');
  }

  function updateProgress() {
    const activeReaderId = Number(readerRoot?.dataset.chapter);
    const readerMark = readerRoot ? $('[data-reader-action="mark"]', readerRoot) : null;
    if (readerMark && Number.isFinite(activeReaderId)) {
      const yes = reviewed.has(activeReaderId);
      readerMark.textContent = yes ? 'Reviewed ✓' : 'Mark as reviewed';
      readerMark.classList.toggle('primary', yes);
    }

    const count = [...reviewed].filter((id) => D.chapters.some((ch) => Number(ch.id) === id)).length;
    const pct = D.chapters.length ? Math.round((count / D.chapters.length) * 100) : 0;
    $('#reviewedCount').textContent = String(count);
    $('#globalProgressText').textContent = `${pct}%`;
    $('#globalProgressBar').style.width = `${pct}%`;
    $('#progressResume')?.classList.toggle('hidden', count === 0);

    const rawLast = storage.get(lastChapterKey, '');
    const last = rawLast === '' ? Number.NaN : Number(rawLast);
    const continueButton = $('#continueReading');
    const exists = count > 0 && Number.isFinite(last) && D.chapters.some((ch) => Number(ch.id) === last);
    continueButton?.classList.toggle('hidden', !exists);
    if (exists) continueButton.dataset.chapter = String(last);
    else if (continueButton) delete continueButton.dataset.chapter;
  }

  function openManualStart({ updateHash = true, scroll = true } = {}) {
    const rawLast = storage.get(lastChapterKey, '');
    const last = rawLast === '' ? Number.NaN : Number(rawLast);
    const fallback = Number(D.chapters[0]?.id);
    const chapterId = Number.isFinite(last) && D.chapters.some((ch) => Number(ch.id) === last)
      ? last
      : fallback;
    if (Number.isFinite(chapterId)) openChapter(chapterId, { updateHash, scroll });
  }

  function readerNavButton(chapter, direction) {
    if (!chapter) return '<span class="reader-nav-spacer" aria-hidden="true"></span>';
    const label = direction === 'prev' ? '← Previous' : 'Next →';
    return `<button class="reader-nav-button ${direction}" type="button" data-reader-action="${direction}" data-chapter="${esc(chapter.id)}">
      <span class="reader-nav-label">${label}</span>
      <strong>${esc(chapter.title)}</strong>
    </button>`;
  }

  function renderReader(chapter, { scroll = true } = {}) {
    if (!readerRoot || !manualIndex) return;
    const position = D.chapters.findIndex((ch) => Number(ch.id) === Number(chapter.id));
    if (position < 0) return;
    const previous = D.chapters[position - 1] || null;
    const next = D.chapters[position + 1] || null;
    const progressPct = Math.round(((position + 1) / D.chapters.length) * 100);

    readerRoot.dataset.chapter = String(chapter.id);
    readerRoot.innerHTML = `<div class="reader-toolbar">
      <span class="reader-toolbar-title">Reading</span>
      <div class="reader-toolbar-actions">
        <button class="btn" type="button" data-reader-action="copy">Copy link</button>
        <button class="btn" type="button" data-reader-action="mark">Mark as reviewed</button>
      </div>
    </div>
    <article class="reader-page">
      <header class="reader-page-header">
        <div class="reader-meta">
          <span class="eyebrow">Chapter ${esc(chapter.id)}</span>
          <span class="reader-position">${position + 1} / ${D.chapters.length}</span>
        </div>
        <h2>${esc(chapter.title)}</h2>
        <div class="reader-progress" aria-label="Position in manual"><div style="width:${progressPct}%"></div></div>
      </header>
      <div class="reader-content">${renderChapterText(chapter.text)}</div>
      <nav class="reader-nav" aria-label="Chapter navigation">
        ${readerNavButton(previous, 'prev')}
        ${readerNavButton(next, 'next')}
      </nav>
    </article>`;

    manualIndex.hidden = false;
    readerRoot.hidden = false;
    updateProgress();
    if (scroll) requestAnimationFrame(() => {
      readerRoot.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      readerRoot.focus({ preventScroll: true });
    });
  }

  function openChapter(id, { updateHash = true, scroll = true } = {}) {
    const numericId = Number(id);
    const chapter = D.chapters.find((ch) => Number(ch.id) === numericId);
    if (!chapter) return;
    setView('manual');
    renderReader(chapter, { scroll });
    storage.set(lastChapterKey, String(numericId));
    if (updateHash) history.replaceState(null, '', `#chapter-${numericId}`);
    $$('.navbtn[data-chapter]').forEach((button) => {
      button.classList.toggle('active', Number(button.dataset.chapter) === numericId);
    });
    setMobileMenu(false);
  }
  readerRoot?.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-reader-action]');
    if (!button) return;
    const action = button.dataset.readerAction;
    if (action === 'prev' || action === 'next') {
      openChapter(button.dataset.chapter);
      return;
    }
    const id = Number(readerRoot.dataset.chapter);
    if (!Number.isFinite(id)) return;
    if (action === 'mark') {
      reviewed.has(id) ? reviewed.delete(id) : reviewed.add(id);
      storage.set(doneKey, JSON.stringify([...reviewed].sort((a, b) => a - b)));
      updateProgress();
      announce(reviewed.has(id) ? `Chapter ${id} marked as reviewed.` : `Chapter ${id} marked as pending.`);
      return;
    }
    if (action === 'copy') {
      const url = `${location.href.split('#')[0]}#chapter-${id}`;
      const original = button.textContent;
      const copied = await copyText(url);
      button.textContent = copied ? 'Link copied ✓' : 'Copy manually';
      setTimeout(() => { button.textContent = original; }, 1400);
    }
  });

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

  function searchResults() {
    if (!searchInput) return [];
    const raw = searchInput.value.trim();
    const query = normalize(raw);
    const tokens = query.split(' ').filter(Boolean);
    return searchIndex
      .map((entry) => ({ ...entry, score: scoreEntry(entry, query, tokens) }))
      .filter((entry) => !query || tokens.every((token) => entry.title.includes(token) || entry.body.includes(token)))
      .sort((a, b) => query ? (b.score - a.score || a.position - b.position) : a.position - b.position);
  }

  function runSearch({ openBest = false } = {}) {
    const raw = searchInput?.value.trim() || '';
    const results = searchResults();
    const status = $('#searchCount');
    if (!raw) {
      if (status) status.textContent = `${D.chapters.length} chapters in the manual`;
      if (openBest) openManualStart({ updateHash: true, scroll: true });
      return results;
    }
    if (!results.length) {
      if (status) status.textContent = 'No chapter found';
      announce('No chapter matches the search.');
      return results;
    }
    if (status) status.textContent = openBest
      ? `${results.length} match(es) · most relevant opened`
      : `${results.length} match(es) · press Search to open`;
    if (openBest) openChapter(results[0].id, { updateHash: true, scroll: true });
    return results;
  }

  const manualSearchForm = $('#manualSearchForm');
  searchInput?.addEventListener('input', () => runSearch());
  manualSearchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch({ openBest: true });
  });

  $$('.quick-search').forEach((button) => button.addEventListener('click', () => {
    if (!searchInput) return;
    searchInput.value = button.dataset.q || '';
    setView('manual', { updateHash: false });
    runSearch({ openBest: true });
  }));

  // Public home search
  const homeSearchForm = $('#homeSearchForm');
  const homeSearch = $('#homeSearch');

  homeSearchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = homeSearch?.value?.trim() || '';
    if (searchInput) searchInput.value = query;
    setView('manual', { updateHash: false });
    if (query) runSearch({ openBest: true });
    else openManualStart({ updateHash: true, scroll: false });
  });
  // Current reports
  const reportsRoot = $('#reportsRoot');
  if (reportsRoot && Array.isArray(D.currentReports)) {
    reportsRoot.innerHTML = D.currentReports.map((r) => {
      const evClass = r.evidence === 'High' ? 'evidence-high' : r.evidence === 'Medium' ? 'evidence-medium' : 'evidence-low';
      const stClass = r.state === 'OPEN' ? 'state-open' : 'state-closed';
      const url = safeUrl(r.url);
      return `<article class="report-card">
        <div class="report-head">
          <span class="badge ${stClass}">#${esc(r.issue)} · ${esc(r.state)}</span>
          <span class="badge">${esc(r.classification)}</span>
          <span class="badge ${evClass}">Evidence ${esc(r.evidence)}</span>
        </div>
        <div class="report-title">${esc(r.title)}</div>
        <div class="report-meta">${esc(r.scope)} · reported ${esc(r.reported)}</div>
        <p>${esc(r.summary)}</p>
        <div class="callout"><strong>Safe action:</strong> ${esc(r.action)}</div>
        <div class="report-actions">
          <a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open official issue</a>
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
          <span class="badge ${d.confidence === 'OFFICIAL' ? 'official' : d.confidence === 'VALIDATED CASE' ? 'validated' : 'workaround'}">${esc(d.confidence)}</span>
          <span class="badge">Risk ${esc(d.risk)}</span>
        </div>
        <h3>${esc(d.label)}</h3>
        <span class="diag-card-cta">View diagnosis <span aria-hidden="true">→</span></span>
      </button>
    </article>`).join('');
  }

  function showDiagnostic(id, { updateHash = true } = {}) {
    const d = D.diagnostics.find((x) => String(x.id) === String(id));
    if (!d) return;
    const related = d.chapters
      .map((chapterId) => D.chapters.find((chapter) => Number(chapter.id) === Number(chapterId)))
      .filter(Boolean);
    setView('wizard');
    $('#diagResult').innerHTML = `<article class="diag-result-card" aria-live="polite">
      <div class="kicker">${esc(d.confidence)} · risk ${esc(d.risk)}</div>
      <h2>${esc(d.label)}</h2>
      <ol class="diag-steps">${d.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      ${related.length ? `<section class="diag-reading" aria-label="Recommended reading in the manual">
        <span class="eyebrow">Open in the manual</span>
        <div class="diag-chapter-links">${related.map((chapter) => `<button type="button" class="diag-chapter-link goto-chapter" data-id="${esc(chapter.id)}"><span>Chapter ${esc(chapter.id)}</span><strong>${esc(chapter.title)}</strong><span aria-hidden="true">→</span></button>`).join('')}</div>
      </section>` : ''}
      <div class="callout warn">Rule: change one variable at a time and record the result.</div>
    </article>`;
    $$('.goto-chapter', $('#diagResult')).forEach((button) => button.addEventListener('click', () => openChapter(button.dataset.id)));
    if (updateHash) history.replaceState(null, '', `#diag-${encodeURIComponent(d.id)}`);
    $('#diagResult').scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  }

  $$('[data-diag]').forEach((button) => button.addEventListener('click', () => showDiagnostic(button.dataset.diag)));

  // Validated case checklist
  const caseSteps = [
    'Confirm that the symptom occurs around 0:55–1:00.',
    'Note the current Spoof client.',
    'Change only Default Client.',
    'Close YouTube completely and reopen it.',
    'Play the same content for at least 2–3 minutes.',
    'Record whether the failure disappeared and keep the configuration as a baseline only on that device.'
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

  async function copyText(text) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

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
    announce('Progress exported.');
  });

  $('#importProgress')?.addEventListener('click', () => $('#importProgressFile')?.click());
  $('#importProgressFile')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 64 * 1024) {
      alert('The progress file is too large.');
      return;
    }
    try {
      const imported = JSON.parse(await file.text());
      if (!imported || imported.schema !== 1 || !Array.isArray(imported.reviewed) || !Array.isArray(imported.caseState)) {
        throw new Error('Invalid format');
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
      $$('[data-case]').forEach((x) => { x.checked = caseState.includes(Number(x.dataset.case)); });
      updateCaseProgress();
      updateProgress();
      announce('Progress imported successfully.');
    } catch {
      alert('The file could not be imported. Confirm that it was exported by this version of the manual.');
    }
  });

  $('#resetProgress')?.addEventListener('click', () => {
    if (!confirm('Delete this manual’s local progress?')) return;
    storage.remove(doneKey);
    storage.remove(caseKey);
    storage.remove(lastChapterKey);
    reviewed = new Set();
    caseState = [];
    $$('[data-case]').forEach((x) => { x.checked = false; });
    updateProgress();
    updateCaseProgress();
    announce('Local progress deleted.');
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
    announce('Manual installed as an app.');
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' });
        await registration.update();
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
        console.warn('Service Worker not registered:', error);
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
      const resolvedView = view === 'advanced' ? 'reports' : view;
      if (!validViews.has(resolvedView)) return;
      if (resolvedView === 'manual') openManualStart({ updateHash: false, scroll: false });
      else setView(resolvedView);
      if (view === 'advanced') history.replaceState(null, '', '#view-reports');
    }
  }

  window.addEventListener('hashchange', applyDeepLink);
  applyDeepLink();
})();
