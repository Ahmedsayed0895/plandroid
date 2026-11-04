// js/app.js: Application bootstrap, navigation, event handlers, and global utilities.

function navigateSection(sec) {
  userState.activeSection = sec;
  userState.searchQuery = '';
  const sInput = document.getElementById('global-search');
  if (sInput) sInput.value = '';
  updateSidebarActiveHighlight();
  renderMainContent();
  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function selectDomainTrack(trackId) {
  userState.selectedDomainTrack = trackId;
  saveState();
  renderMainContent();
}
function toggleDomainLab(labId) {
  if (!userState.domainLabProgress) userState.domainLabProgress = {};
  userState.domainLabProgress[labId] = !userState.domainLabProgress[labId];
  saveState();
  renderMainContent();
}
function toggleScenario(scenarioId) {
  if (!userState.scenarioProgress) userState.scenarioProgress = {};
  userState.scenarioProgress[scenarioId] = !userState.scenarioProgress[scenarioId];
  saveState();
  renderMainContent();
}
function filterScenarios(group) {
  userState.scenarioFilter = group;
  renderMainContent();
}

function openLabDetail(labId) {
  userState.activeSection = 'lab-detail';
  userState.selectedLabId = labId;
  updateSidebarActiveHighlight();
  renderMainContent();
  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function toggleLabCompleted(labId) {
  const next = !userState.completedLabs[labId];
  userState.completedLabs[labId] = next;
  if (next) {
    userState.completedDates[labId] = userState.completedDates[labId] || new Date().toISOString().split('T')[0];
  }
  saveState();
  renderMainContent();
}

function toggleCapstoneCheck(capId, checkIndex) {
  if (!userState.capstoneChecks) userState.capstoneChecks = {};
  if (!userState.capstoneChecks[capId]) userState.capstoneChecks[capId] = {};
  userState.capstoneChecks[capId][checkIndex] = !userState.capstoneChecks[capId][checkIndex];
  if (userState.completedCapstones[capId]) userState.completedCapstones[capId] = false;
  saveState();
  renderMainContent();
}

function setCapstoneEvidence(capId, value) {
  if (!userState.capstoneEvidence) userState.capstoneEvidence = {};
  userState.capstoneEvidence[capId] = value;
  saveState();
}

function toggleCapstoneCompleted(capId) {
  const cap = PHASE_CAPSTONES.find(item => item.id === capId);
  if (!cap) return;
  const checks = userState.capstoneChecks?.[capId] || {};
  const allChecksDone = cap.checks.every((_, index) => !!checks[index]);
  const evidence = (userState.capstoneEvidence?.[capId] || '').trim();
  const isAlreadyVerified = !!userState.completedCapstones[capId] && allChecksDone && evidence.length >= 40;
  if (!isAlreadyVerified && (!allChecksDone || evidence.length < 40)) return;
  userState.completedCapstones[capId] = !isAlreadyVerified;
  saveState();
  renderMainContent();
}




function openLearningReference(referenceId) {
  if (CURRICULUM_LABS.some(lab => lab.id === referenceId)) {
    openLabDetail(referenceId);
    return;
  }
  const track = DOMAIN_TRACKS.find(item => item.modules.some(module => module.labs.some(lab => lab.id === referenceId)));
  if (!track) return;
  userState.selectedDomainTrack = track.id;
  navigateSection('domains');
  const target = document.getElementById(`domain-lab-${referenceId}`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateInterviewQuery(value) {
  userState.interviewQuery = value;
  const input = document.querySelector('.interview-search input');
  const cursor = input ? input.selectionStart : value.length;
  renderMainContent();
  const next = document.querySelector('.interview-search input');
  if (next) { next.focus(); next.setSelectionRange(cursor, cursor); }
}

function toggleInterviewPracticed(questionId) {
  if (!userState.interviewPractice) userState.interviewPractice = {};
  userState.interviewPractice[questionId] = !userState.interviewPractice[questionId];
  saveState();
  renderMainContent();
}

function toggleChecklistItem(key) {
  userState.checklistState[key] = !userState.checklistState[key];
  saveState();
  renderMainContent();
}

function setMasteryRating(labId, dim, score) {
  if (!userState.masteryRatings[labId]) userState.masteryRatings[labId] = {};
  userState.masteryRatings[labId][dim] = score;
  saveState();
  renderMainContent();
}

function setMasteryEvidence(labId, value) {
  if (!userState.masteryEvidence) userState.masteryEvidence = {};
  userState.masteryEvidence[labId] = value;
  saveState();
}

function handleGlobalSearch(val) {
  userState.searchQuery = val;
  const btn = document.getElementById('clear-search-btn');
  if (btn) btn.classList.toggle('hidden', !val);
  renderMainContent();
}

function clearGlobalSearch() {
  userState.searchQuery = '';
  const inp = document.getElementById('global-search');
  if (inp) inp.value = '';
  const btn = document.getElementById('clear-search-btn');
  if (btn) btn.classList.add('hidden');
  renderMainContent();
}

function toggleMobileSidebar() {
  const sb = document.getElementById('app-sidebar');
  if (sb) sb.classList.toggle('open');
}

function closeMobileSidebar() {
  const sb = document.getElementById('app-sidebar');
  if (sb) sb.classList.remove('open');
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function openDataModal() {
  const m = document.getElementById('data-modal');
  const box = document.getElementById('progress-json-box');
  if (box) box.value = localStorage.getItem(STORAGE_KEY) || '{}';
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
}

function closeDataModal() {
  const m = document.getElementById('data-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function showModalStatus(msg) {
  const el = document.getElementById('modal-status-msg');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => { el.classList.add('hidden'); }, 2500);
}

function copyProgressJson() {
  const box = document.getElementById('progress-json-box');
  if (!box) return;
  box.select();
  document.execCommand('copy');
  showModalStatus('Copied JSON backup to clipboard.');
}

function importProgressJson() {
  const box = document.getElementById('progress-json-box');
  if (!box) return;
  try {
    const parsed = JSON.parse(box.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    loadState();
    updateGlobalProgressUI();
    renderMainContent();
    showModalStatus('Progress restored successfully.');
  } catch (e) {
    showModalStatus('Invalid JSON format.');
  }
}

function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  userState.completedLabs = {};
  userState.completedCapstones = {};
  userState.capstoneChecks = {};
  userState.capstoneEvidence = {};
  userState.completedDates = {};
  userState.checklistState = {};
  userState.masteryRatings = {};
  userState.masteryEvidence = {};
  userState.labNotes = {};
  userState.structuredAdrs = {};
  userState.flashcardState = {};
  userState.domainLabProgress = {};
  userState.scenarioProgress = {};
  updateGlobalProgressUI();
  renderMainContent();
  closeDataModal();
}

// --- BOOTSTRAP ON DOM READY ---
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  buildFlashcardsDeck();
  updateGlobalProgressUI();
  updateSidebarActiveHighlight();
  renderMainContent();
});
