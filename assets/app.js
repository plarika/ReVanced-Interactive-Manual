
(() => {
  const D = window.MANUAL_DATA;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  const themeKey = 'revanced-manual-theme';
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  $('#themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(themeKey, next);
  });

  const nav = $('#chapterNav');
  D.chapters.forEach(ch => {
    const b = document.createElement('button');
    b.className = 'navbtn';
    b.textContent = `${ch.id}. ${ch.title}`;
    b.dataset.chapter = ch.id;
    b.addEventListener('click', () => openChapter(ch.id));
    nav.appendChild(b);
  });

  const chaptersRoot = $('#chaptersRoot');
  function chapterHTML(ch) {
    return `<details class="chapter" id="chapter-${ch.id}" data-search="${esc(ch.search)}">
      <summary><span class="badge">${ch.id}</span><span>${esc(ch.title)}</span></summary>
      <div class="chapter-body">
        <div class="chapter-tools">
          <button class="btn copy-link" data-id="${ch.id}" type="button">Copiar ligação</button>
          <button class="btn mark-done" data-id="${ch.id}" type="button">Marcar revisto</button>
        </div>
        <div class="chapter-text">${esc(ch.text)}</div>
      </div>
    </details>`;
  }
  chaptersRoot.innerHTML = D.chapters.map(chapterHTML).join('');

  function openChapter(id) {
    setView('manual');
    const el = $(`#chapter-${id}`);
    if (!el) return;
    el.open = true;
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', `#chapter-${id}`);
    $$('.navbtn').forEach(b => b.classList.toggle('active', Number(b.dataset.chapter) === Number(id)));
  }

  $$('.copy-link').forEach(btn => btn.addEventListener('click', async () => {
    const url = `${location.href.split('#')[0]}#chapter-${btn.dataset.id}`;
    try { await navigator.clipboard.writeText(url); btn.textContent='Ligação copiada'; setTimeout(()=>btn.textContent='Copiar ligação',1200); }
    catch { prompt('Copia esta ligação:', url); }
  }));

  const doneKey = 'revanced-manual-reviewed';
  let reviewed = new Set(JSON.parse(localStorage.getItem(doneKey) || '[]'));
  function updateReviewButtons(){
    $$('.mark-done').forEach(btn => {
      const id = Number(btn.dataset.id);
      const yes = reviewed.has(id);
      btn.textContent = yes ? 'Revisto ✓' : 'Marcar revisto';
      btn.classList.toggle('primary', yes);
    });
    $('#reviewedCount').textContent = reviewed.size;
  }
  $$('.mark-done').forEach(btn => btn.addEventListener('click', () => {
    const id = Number(btn.dataset.id);
    reviewed.has(id) ? reviewed.delete(id) : reviewed.add(id);
    localStorage.setItem(doneKey, JSON.stringify([...reviewed]));
    updateReviewButtons();
  }));
  updateReviewButtons();


  const reportsRoot = $('#reportsRoot');
  if (reportsRoot && Array.isArray(D.currentReports)) {
    reportsRoot.innerHTML = D.currentReports.map(r => {
      const evClass = r.evidence === 'Alta' ? 'evidence-high' : r.evidence === 'Média' ? 'evidence-medium' : 'evidence-low';
      const stClass = r.state === 'OPEN' ? 'state-open' : 'state-closed';
      return `<article class="report-card">
        <div class="report-head">
          <span class="badge ${stClass}">#${r.issue} · ${esc(r.state)}</span>
          <span class="badge">${esc(r.classification)}</span>
          <span class="badge ${evClass}">Evidência ${esc(r.evidence)}</span>
        </div>
        <div class="report-title">${esc(r.title)}</div>
        <div class="report-meta">${esc(r.scope)} · reportado ${esc(r.reported)}</div>
        <p>${esc(r.summary)}</p>
        <div class="callout"><strong>Ação segura:</strong> ${esc(r.action)}</div>
        <div class="report-actions">
          <a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Abrir issue oficial</a>
        </div>
      </article>`;
    }).join('');
  }

  const diagRoot = $('#diagRoot');
  diagRoot.innerHTML = D.diagnostics.map(d => `<article class="diag-card">
      <button type="button" data-diag="${d.id}">
        <div>
          <span class="badge ${d.confidence === 'OFICIAL' ? 'official' : d.confidence === 'CASO VALIDADO' ? 'validated' : 'workaround'}">${esc(d.confidence)}</span>
          <span class="badge">Risco ${esc(d.risk)}</span>
        </div>
        <h3>${esc(d.label)}</h3>
        <p class="muted">Capítulos ${d.chapters.join(', ')}</p>
      </button>
    </article>`).join('');

  function showDiagnostic(id){
    const d = D.diagnostics.find(x => x.id === id);
    if (!d) return;
    $('#diagResult').innerHTML = `<div class="panel result" aria-live="polite">
      <div class="kicker">${esc(d.confidence)} · risco ${esc(d.risk)}</div>
      <h2>${esc(d.label)}</h2>
      <ol class="steps">${d.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      <div class="chapter-tools">
        ${d.chapters.map(c => `<button type="button" class="btn goto-chapter" data-id="${c}">Abrir capítulo ${c}</button>`).join('')}
      </div>
      <div class="callout warn">Regra: altera uma variável de cada vez e regista o resultado.</div>
    </div>`;
    $$('.goto-chapter', $('#diagResult')).forEach(b => b.addEventListener('click', () => openChapter(Number(b.dataset.id))));
    $('#diagResult').scrollIntoView({behavior:'smooth', block:'start'});
  }
  $$('[data-diag]').forEach(b => b.addEventListener('click', () => showDiagnostic(b.dataset.diag)));

  const search = $('#search');
  function runSearch(){
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    $$('.chapter').forEach(el => {
      const ok = !q || el.dataset.search.includes(q);
      el.classList.toggle('hidden', !ok);
      if (ok) {
        shown++;
        if (q) el.open = true;
      }
    });
    $('#searchCount').textContent = q ? `${shown} capítulo(s)` : 'Todos os capítulos';
    $('#emptySearch').classList.toggle('hidden', shown !== 0);
  }
  search.addEventListener('input', runSearch);
  $$('.quick-search').forEach(b => b.addEventListener('click', () => {
    search.value = b.dataset.q;
    setView('manual');
    runSearch();
    search.scrollIntoView({behavior:'smooth', block:'center'});
  }));

  function setView(name){
    $$('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`));
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  }
  $$('.tab').forEach(t => t.addEventListener('click', () => setView(t.dataset.view)));
  $$('.sidebar-view').forEach(b => b.addEventListener('click', () => setView(b.dataset.target)));

  // Case validated flow checklist
  const caseSteps = [
    'Confirmar que o sintoma ocorre perto de 0:55–1:00.',
    'Anotar o cliente Spoof atual.',
    'Alterar apenas Default Client.',
    'Fechar completamente o YouTube e reabrir.',
    'Reproduzir o mesmo conteúdo durante pelo menos 2–3 minutos.',
    'Registar se a falha desapareceu e manter a configuração como baseline apenas nesse dispositivo.'
  ];
  const caseKey = 'revanced-case055-checklist';
  let caseState = JSON.parse(localStorage.getItem(caseKey) || '[]');
  $('#caseChecklist').innerHTML = caseSteps.map((s,i)=>`<label class="checkrow"><input type="checkbox" data-case="${i}" ${caseState.includes(i)?'checked':''}><span>${esc(s)}</span></label>`).join('');
  function updateCaseProgress(){
    caseState = $$('[data-case]').filter(x=>x.checked).map(x=>Number(x.dataset.case));
    localStorage.setItem(caseKey, JSON.stringify(caseState));
    const pct = Math.round(caseState.length / caseSteps.length * 100);
    $('#caseProgressBar').style.width = pct + '%';
    $('#caseProgressText').textContent = pct + '%';
  }
  $$('[data-case]').forEach(x=>x.addEventListener('change', updateCaseProgress));
  updateCaseProgress();

  $('#resetProgress').addEventListener('click', () => {
    if (!confirm('Apagar o progresso local deste manual?')) return;
    localStorage.removeItem(doneKey);
    localStorage.removeItem(caseKey);
    reviewed = new Set();
    $$('[data-case]').forEach(x=>x.checked=false);
    updateReviewButtons();
    updateCaseProgress();
  });

  $('#printManual').addEventListener('click', () => window.print());

  const sourcesRoot = $('#sourcesRoot');
  sourcesRoot.innerHTML = D.sources.map(s => `<div class="source">
    <strong>${esc(s.id)}</strong>
    <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>
    <span class="badge">${esc(s.kind)}</span>
  </div>`).join('');

  const commands = {
    logcat: `adb logcat -c\nadb logcat -v time > revanced-log.txt`,
    certs: `apksigner verify --print-certs app-patched.apk`,
    packages: `adb shell pm list packages | grep -i youtube`
  };
  $$('[data-copy-command]').forEach(b => b.addEventListener('click', async () => {
    const txt = commands[b.dataset.copyCommand] || '';
    try { await navigator.clipboard.writeText(txt); b.textContent='Copiado ✓'; setTimeout(()=>b.textContent='Copiar comando',1200); }
    catch { prompt('Copia o comando:', txt); }
  }));

  // Deep links
  if (location.hash.startsWith('#chapter-')) {
    const id = Number(location.hash.replace('#chapter-',''));
    setTimeout(() => openChapter(id), 50);
  }
})();
