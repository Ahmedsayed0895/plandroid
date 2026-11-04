// js/state.js: User state, localStorage persistence, and UI update functions.

let userState = {
  completedLabs: {},
  completedCapstones: {},
  capstoneChecks: {},
  capstoneEvidence: {},
  completedDates: {},
  checklistState: {},
  masteryRatings: {},
  masteryEvidence: {},
  domainLabProgress: {},
  scenarioProgress: {},
  labNotes: {},
  structuredAdrs: {},
  flashcardState: {},
  interviewPractice: {},
  interviewQuery: '',
  interviewCategory: 'all',
  interviewLevel: 'all',
  interviewStatus: 'all',
  activeSection: 'overview',
  selectedLabId: 'LAB 01',
  activeLabTab: 'spec',
  labPhaseFilter: 'all',
  labStatusFilter: 'all',
  labTrackFilter: 'all',
  fcPhaseFilter: 'all',
  fcTypeFilter: 'all',
  fcConfidenceFilter: 'all',
  fcCurrentIndex: 0,
  fcIsFlipped: false,
  searchQuery: ''
};

let flashcardsDeck = [];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('android_kmp_mastery_portal_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      userState = {
        ...userState,
        ...parsed
      };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedLabs: userState.completedLabs,
      completedCapstones: userState.completedCapstones,
      capstoneChecks: userState.capstoneChecks,
      capstoneEvidence: userState.capstoneEvidence,
      completedDates: userState.completedDates,
      checklistState: userState.checklistState,
      masteryRatings: userState.masteryRatings,
      masteryEvidence: userState.masteryEvidence,
      domainLabProgress: userState.domainLabProgress,
      scenarioProgress: userState.scenarioProgress,
      labNotes: userState.labNotes,
      structuredAdrs: userState.structuredAdrs,
      flashcardState: userState.flashcardState,
      interviewPractice: userState.interviewPractice
    }));
    updateGlobalProgressUI();
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateGlobalProgressUI() {
  const totalLabs = CURRICULUM_LABS.length;
  const done = Object.values(userState.completedLabs).filter(Boolean).length;
  const pct = Math.round((done / totalLabs) * 100);
  const txt = document.getElementById('header-progress-text');
  const bar = document.getElementById('header-progress-bar');
  if (txt) txt.textContent = `${done} / ${totalLabs} (${pct}%)`;
  if (bar) bar.style.width = `${pct}%`;
  renderSidebarLabsIndex();
}

function renderSidebarLabsIndex() {
  const container = document.getElementById('sidebar-labs-list');
  const filterEl = document.getElementById('sidebar-phase-filter');
  if (!container) return;
  const pf = filterEl ? filterEl.value : 'all';
  const list = CURRICULUM_LABS.filter(l => pf === 'all' || l.phase === pf);

  container.innerHTML = list.map(lab => {
    const isDone = !!userState.completedLabs[lab.id];
    const isSel = userState.activeSection === 'lab-detail' && userState.selectedLabId === lab.id;
    return `
      <button onclick="openLabDetail('${lab.id}')" class="sec-nav-btn ${isSel ? 'active' : ''}">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0 ${isDone ? 'badge-primary' : 'app-subtle text-muted'}">
            ${isDone ? '<i data-lucide="check" class="w-3 h-3"></i>' : lab.num}
          </span>
          <span class="truncate">${escapeHtml(lab.title)}</span>
        </div>
        <span class="text-[10px] font-mono text-muted shrink-0">${lab.phase.replace('Phase ', 'P')}</span>
      </button>
    `;
  }).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateSidebarActiveHighlight() {
  document.querySelectorAll('.sec-nav-btn[data-sec]').forEach(btn => {
    const sec = btn.getAttribute('data-sec');
    const active = (userState.activeSection === sec) || (userState.activeSection === 'lab-detail' && sec === 'labs');
    btn.classList.toggle('active', active);
  });
  renderSidebarLabsIndex();
}
