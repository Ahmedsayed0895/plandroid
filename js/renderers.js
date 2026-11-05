// js/renderers.js: All view render functions that return HTML strings.

function renderMainContent() {
  const container = document.getElementById('main-view-container');
  if (!container) return;

  if (userState.searchQuery && userState.searchQuery.trim().length > 1) {
    container.innerHTML = renderSearchResultsView(userState.searchQuery.trim());
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }


  switch (userState.activeSection) {
    case 'overview':
      container.innerHTML = renderOverviewView();
      break;
    case 'mindset':
      container.innerHTML = renderMindsetView();
      break;
    case 'phases':
      container.innerHTML = renderPhasesAndCapstonesView();
      break;
    case 'labs':
      container.innerHTML = renderLabsExplorerView();
      break;
    case 'domains':
      container.innerHTML = renderDomainTracksView();
      break;
    case 'scenarios':
      container.innerHTML = renderScenarioLibraryView();
      break;
    case 'coverage':
      container.innerHTML = renderCoverageMapView();
      break;
    case 'lab-detail':
      container.innerHTML = renderLabDetailView(userState.selectedLabId || 'LAB 01');
      break;
    case 'mastery':
      container.innerHTML = renderMasteryMatrixView();
      break;
    case 'interview':
      container.innerHTML = renderInterviewReadinessView();
      break;
    case 'resources':
      container.innerHTML = renderResourcesView();
      break;
    case 'flashcards':
      container.innerHTML = renderFlashcardsView();
      break;
    default:
      container.innerHTML = renderOverviewView();
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- 0. EXECUTIVE OVERVIEW DASHBOARD ---
function renderOverviewView() {
  const totalLabs = CURRICULUM_LABS.length;
  const doneCount = CURRICULUM_LABS.filter(lab => userState.completedLabs[lab.id]).length;
  const pct = Math.round((doneCount / totalLabs) * 100);
  const capDone = PHASE_CAPSTONES.filter(cap => userState.completedCapstones[cap.id]).length;
  const nextLab = CURRICULUM_LABS.find(lab => !userState.completedLabs[lab.id]);
  const activePhase = nextLab ? UNIFIED_PHASES.find(p => p.labsList.includes(nextLab.id)) : null;
  const remaining = totalLabs - doneCount;
  const completedPhaseCount = UNIFIED_PHASES.filter(p => p.labsList.every(id => userState.completedLabs[id])).length;
  const phaseCards = UNIFIED_PHASES.map((p, index) => {
    const doneInP = p.labsList.filter(id => userState.completedLabs[id]).length;
    const pPct = Math.round((doneInP / p.labsList.length) * 100);
    const phaseNext = p.labsList.find(id => !userState.completedLabs[id]);
    const phaseLab = phaseNext ? CURRICULUM_LABS.find(l => l.id === phaseNext) : null;
    return `
      <button type="button" onclick="userState.labPhaseFilter='${p.id}'; navigateSection('labs')" class="dash-phase-card ${pPct === 100 ? 'is-complete' : ''}">
        <span class="dash-phase-index">0${index + 1}</span>
        <span class="dash-phase-state">${pPct === 100 ? '<i data-lucide="check-circle-2"></i> Complete' : `${doneInP} / ${p.labsList.length} labs`}</span>
        <strong>${escapeHtml(p.title)}</strong>
        <span class="dash-phase-focus">${escapeHtml(p.focus)}</span>
        <span class="dash-phase-bottom"><span class="dash-phase-track"><i style="width:${pPct}%"></i></span><span>${pPct}%</span></span>
        <span class="dash-phase-link">${phaseLab ? `Next: ${escapeHtml(phaseLab.title)}` : 'Explore phase'} <i data-lucide="arrow-up-right"></i></span>
      </button>`;
  }).join('');

  return `
    <div class="dashboard-page">
      <section class="dash-welcome">
        <div class="dash-welcome-copy">
          <div class="dash-eyebrow"><span class="dash-live-dot"></span> YOUR ENGINEERING WORKSPACE <span class="dash-eyebrow-line"></span> ${CURRICULUM_LABS.length}-LAB CORE · DOMAIN PRACTICE</div>
          <h1>${doneCount === 0 ? 'Build the engineer.<br><em>One system at a time.</em>' : doneCount === totalLabs ? 'Curriculum complete.<br><em>Now prove your mastery.</em>' : 'Your next level<br><em>starts with the next lab.</em>'}</h1>
          <p>A hands-on path through Android internals, production architecture, performance, and Kotlin Multiplatform. Learn deeply. Build deliberately. Verify what you know.</p>
          <div class="dash-welcome-actions">
            ${nextLab ? `<button class="dash-primary-action" onclick="openLabDetail('${nextLab.id}')"><i data-lucide="play"></i><span><small>CONTINUE LEARNING</small><strong>${escapeHtml(nextLab.title)}</strong></span><i data-lucide="arrow-up-right" class="dash-action-arrow"></i></button>` : `<button class="dash-primary-action" onclick="navigateSection('mastery')"><i data-lucide="award"></i><span><small>NEXT CHALLENGE</small><strong>Verify your mastery</strong></span><i data-lucide="arrow-up-right" class="dash-action-arrow"></i></button>`}
            <button class="dash-quiet-action" onclick="navigateSection('labs')">Explore all labs <i data-lucide="arrow-right"></i></button>
          </div>
        </div>
        <div class="dash-progress-art" aria-label="${pct}% of labs completed">
          <div class="dash-progress-ring" style="--progress:${pct * 3.6}deg"><div class="dash-progress-ring-inner"><strong>${pct}<small>%</small></strong></div></div>
          <div class="dash-progress-summary">
            <strong class="dash-progress-title">CURRICULUM COMPLETE</strong>
            <div class="dash-ring-caption"><span><i></i><b>${doneCount}</b> completed</span><span><i></i><b>${remaining}</b> remaining</span></div>
          </div>
          <div class="dash-orbit dash-orbit-one"></div><div class="dash-orbit dash-orbit-two"></div>
          <span class="dash-art-cross dash-cross-one">+</span><span class="dash-art-cross dash-cross-two">+</span>
        </div>
        <div class="dash-welcome-foot"><span><i data-lucide="route"></i> 7 progressive phases</span><span><i data-lucide="flask-conical"></i> Production-minded labs</span><span><i data-lucide="brain-circuit"></i> Learn · Build · Explain</span></div>
      </section>

      <section class="dash-stat-grid" aria-label="Learning statistics">
        <article class="dash-stat dash-stat-green"><span class="dash-stat-icon"><i data-lucide="check-check"></i></span><div><small>LABS COMPLETED</small><strong>${doneCount}<em> / ${totalLabs}</em></strong><span>${pct === 0 ? 'Your journey starts here' : `${remaining} labs left to explore`}</span></div><b class="dash-stat-mark">01</b></article>
        <article class="dash-stat dash-stat-violet"><span class="dash-stat-icon"><i data-lucide="layers-3"></i></span><div><small>PHASES CLEARED</small><strong>${completedPhaseCount}<em> / ${UNIFIED_PHASES.length}</em></strong><span>Progress through the roadmap</span></div><b class="dash-stat-mark">02</b></article>
        <article class="dash-stat dash-stat-amber"><span class="dash-stat-icon"><i data-lucide="trophy"></i></span><div><small>CAPSTONES PASSED</small><strong>${capDone}<em> / ${PHASE_CAPSTONES.length}</em></strong><span>Integration milestones</span></div><b class="dash-stat-mark">03</b></article>
        <article class="dash-stat dash-stat-blue"><span class="dash-stat-icon"><i data-lucide="layers-2"></i></span><div><small>ACTIVE STUDY TOOLS</small><strong>${flashcardsDeck.length}<em> cards</em></strong><span>Practice with active recall</span></div><b class="dash-stat-mark">04</b></article>
      </section>

      <section class="domain-quick-entry">
        <div><span class="domain-eyebrow"><i data-lucide="blocks"></i> EXPAND YOUR ENGINEERING CONTEXT</span><h2>Take the core into real product domains.</h2><p>Apply your Android foundations to financial apps, retail POS, commerce, messaging, media, location, connected devices, and document workflows.</p></div>
        <div class="domain-quick-actions"><button onclick="navigateSection('domains')"><i data-lucide="layers-3"></i> Explore domain tracks</button><button onclick="navigateSection('scenarios')"><i data-lucide="siren"></i> Practice failure scenarios</button><button onclick="navigateSection('coverage')"><i data-lucide="scan-search"></i> Inspect skill coverage</button></div>
      </section>

      <section class="dash-main-grid">
        <div class="dash-section-block dash-roadmap-block">
          <div class="dash-section-heading"><div><span class="dash-kicker">THE ROADMAP</span><h2>Eight phases. One stronger engineer.</h2><p>Pick up where you left off, or jump into any domain.</p></div><button onclick="navigateSection('phases')" class="dash-text-link">Full roadmap <i data-lucide="arrow-up-right"></i></button></div>
          <div class="dash-phase-grid">${phaseCards}</div>
        </div>
        <aside class="dash-side-stack">
          <section class="dash-focus-card">
            <div class="dash-focus-top"><span class="dash-kicker">${nextLab ? 'UP NEXT' : 'MILESTONE'}</span><span class="dash-focus-spark"><i data-lucide="sparkles"></i></span></div>
            ${nextLab ? `<span class="dash-focus-phase">${activePhase ? activePhase.id.toUpperCase() : 'CURRICULUM'}</span><h3>${escapeHtml(nextLab.title)}</h3><p>${escapeHtml(nextLab.goal || nextLab.why || 'Continue your hands-on engineering progression.')}</p><div class="dash-focus-meta"><span><i data-lucide="book-open"></i> Lab ${String(nextLab.num || '').padStart(2,'0')}</span><span><i data-lucide="target"></i> ${activePhase ? escapeHtml(activePhase.duration) : 'Deep practice'}</span></div><button onclick="openLabDetail('${nextLab.id}')" class="dash-focus-button">Open next lab <i data-lucide="arrow-right"></i></button>` : `<h3>You made it through all ${CURRICULUM_LABS.length} labs.</h3><p>Move from implementation to proof. Review your weak areas and complete the ${PHASE_CAPSTONES.length} integration capstones.</p><button onclick="navigateSection('mastery')" class="dash-focus-button">Review mastery <i data-lucide="arrow-right"></i></button>`}
          </section>
          <section class="dash-tool-card"><div class="dash-tool-heading"><span class="dash-tool-icon"><i data-lucide="brain"></i></span><div><span class="dash-kicker">TRAIN YOUR RECALL</span><h3>Make knowledge stick.</h3></div></div><p>Test your understanding with focused questions instead of rereading passively.</p><div class="dash-tool-footer"><span>${flashcardsDeck.length} flashcards available</span><button onclick="navigateSection('flashcards')" aria-label="Open flashcards"><i data-lucide="arrow-up-right"></i></button></div></section>
          <section class="dash-tool-card dash-interview-card"><div class="dash-tool-heading"><span class="dash-tool-icon"><i data-lucide="scan-search"></i></span><div><span class="dash-kicker">CAREER READINESS</span><h3>Think like an engineer.</h3></div></div><p>Explore system-design blueprints and senior-level interview questions.</p><div class="dash-tool-footer"><span>Interview readiness map</span><button onclick="navigateSection('interview')" aria-label="Open interview map"><i data-lucide="arrow-up-right"></i></button></div></section>
        </aside>
      </section>

      <section class="dash-bottom-banner"><div class="dash-bottom-symbol"><i data-lucide="workflow"></i></div><div><span class="dash-kicker">THE ENGINEERING LOOP</span><h3>Don't just finish a lab. Own the concept.</h3><p>Understand the internals → implement from scratch → break edge cases → test → explain your decisions.</p></div><button onclick="navigateSection('mindset')">View study principles <i data-lucide="arrow-right"></i></button></section>
      <footer class="dash-footer"><span>PLANDROID <b>·</b> ANDROID + KMP ENGINEERING MASTERY</span><span>BUILT FOR DEPTH, NOT CHECKLISTS.</span></footer>
    </div>
  `;
}

// --- 1. MINDSET & LEARNING STRATEGY ---
function renderMindsetView() {
  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="app-surface markdown-body">
        <h1>1. Mindset & Learning Strategy</h1>
        <h2>The Core Rules</h2>
        <table class="data-table">
          <thead>
            <tr><th>Rule</th><th>Why It Matters</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>One domain per lab</strong></td><td>Prevents shallow breadth. Forces you to exhaust a topic before moving on.</td></tr>
            <tr><td><strong>No copy-paste</strong></td><td>Write every line intentionally. If you copy, you must be able to explain every character.</td></tr>
            <tr><td><strong>Break things on purpose</strong></td><td>After each lab works, deliberately break it. Understand failure modes.</td></tr>
            <tr><td><strong>Document decisions</strong></td><td>Every architectural choice in each lab must have a written ADR (Architecture Decision Record).</td></tr>
            <tr><td><strong>Red -> Green -> Refactor</strong></td><td>Write a failing test, make it pass, then refactor. Always.</td></tr>
            <tr><td><strong>Profile before you optimize</strong></td><td>Never guess about performance. Measure it.</td></tr>
            <tr><td><strong>Read the source</strong></td><td>For every Jetpack API you use, read its source code on AOSP or GitHub at least once.</td></tr>
          </tbody>
        </table>

        <h2>Anti-Patterns to Avoid</h2>
        <ul>
          <li><strong>Tutorial hell</strong>: Following a tutorial end-to-end without diverging and experimenting</li>
          <li><strong>Feature copying</strong>: Building something that already exists without understanding why it is designed that way</li>
          <li><strong>Skipping testing</strong>: A lab without tests taught you nothing about production engineering</li>
          <li><strong>Giant apps</strong>: Focused labs build depth; integrated projects prove you can apply it.</li>
          <li><strong>Ignoring edge cases</strong>: The edge cases ARE the engineering</li>
        </ul>

        <h2>Documentation & Retention Strategy</h2>
        <ul>
          <li>After each lab: write a 1-page "what I learned" summary in your own words using the built-in <strong>ADR & README Builder</strong> inside each Lab.</li>
          <li>At the end of each Phase: complete the <strong>Phase Capstone Integration Milestone</strong> to test how individual domains interact under production constraints.</li>
          <li>Teach back: explain each lab to another engineer or publish your ADR analysis.</li>
        </ul>
      </div>
      <div class="flex justify-end">
        <button onclick="navigateSection('phases')" class="btn btn-primary">
          Next: 2. Phases & ${PHASE_CAPSTONES.length} Capstones <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
}

// --- 2. PHASES OVERVIEW & INTEGRATION CAPSTONES ---
function renderPhasesAndCapstonesView() {
  const isVerified = cap => {
    const checks = userState.capstoneChecks?.[cap.id] || {};
    const evidence = (userState.capstoneEvidence?.[cap.id] || '').trim();
    return !!userState.completedCapstones[cap.id] && cap.checks.every((_, index) => !!checks[index]) && evidence.length >= 40;
  };
  const completed = PHASE_CAPSTONES.filter(isVerified).length;
  const firstOpen = PHASE_CAPSTONES.findIndex(cap => !isVerified(cap));
  const totalChecks = PHASE_CAPSTONES.reduce((sum, cap) => sum + cap.checks.length, 0);
  const doneChecks = PHASE_CAPSTONES.reduce((sum, cap) => {
    const checks = userState.capstoneChecks?.[cap.id] || {};
    return sum + cap.checks.filter((_, index) => !!checks[index]).length;
  }, 0);

  return `
    <div class="max-w-6xl mx-auto space-y-6 capstone-page">
      <section class="capstone-intro">
        <div class="capstone-intro-copy">
          <span class="capstone-eyebrow"><i data-lucide="workflow"></i> INTEGRATION STUDIO · ${PHASE_CAPSTONES.length} REAL-WORLD CHALLENGES</span>
          <h1>Turn isolated knowledge into <em>engineering judgment.</em></h1>
          <p>Each capstone gives you a product problem, a constrained build, observable acceptance criteria, and a recovery path when you get stuck. You are not expected to use every library—choose the smallest design that solves the problem.</p>
        </div>
        <div class="capstone-overview-stats">
          <div><strong>${completed}<small>/${PHASE_CAPSTONES.length}</small></strong><span>Challenges passed</span></div>
          <div><strong>${doneChecks}<small>/${totalChecks}</small></strong><span>Acceptance checks</span></div>
          <div><strong>${PHASE_CAPSTONES.length - completed}</strong><span>Still to build</span></div>
        </div>
      </section>

      <section class="capstone-howto">
        <div class="capstone-howto-title"><i data-lucide="route"></i><strong>How to work through a capstone</strong></div>
        <div class="capstone-howto-steps">
          <div><b>01</b><span><strong>Understand</strong><small>Read the scenario and explain the problem in your own words.</small></span></div>
          <div><b>02</b><span><strong>Design</strong><small>Sketch state, data flow, boundaries, and failure cases before coding.</small></span></div>
          <div><b>03</b><span><strong>Build & break</strong><small>Implement the core path, then test the acceptance criteria deliberately.</small></span></div>
          <div><b>04</b><span><strong>Prove & reflect</strong><small>Save evidence and write what you learned—not just “it works”.</small></span></div>
        </div>
        <p class="capstone-scope-note"><i data-lucide="lightbulb"></i> <strong>Scope rule:</strong> finish the core scenario before attempting the stretch goal. A focused, tested solution is better than a large demo full of disconnected technologies.</p>
      </section>

      <section class="capstone-list-section">
        <div class="capstone-section-heading">
          <div><span class="capstone-section-kicker">THE INTEGRATION CHALLENGES</span><h2>Build one integrated system per phase</h2><p>Open a challenge to see the exact work, expected result, and what to review if you get blocked.</p></div>
          <span class="capstone-total-pill">${completed} OF ${PHASE_CAPSTONES.length} VERIFIED</span>
        </div>

        <div class="capstone-list">
          ${PHASE_CAPSTONES.map((cap, index) => {
            const isDone = isVerified(cap);
            const checks = userState.capstoneChecks?.[cap.id] || {};
            const checkedCount = cap.checks.filter((_, i) => !!checks[i]).length;
            const evidence = userState.capstoneEvidence?.[cap.id] || '';
            const evidenceReady = evidence.trim().length >= 40;
            const canComplete = checkedCount === cap.checks.length && evidenceReady;
            const isOpen = !isDone && index === firstOpen;
            return `
              <article class="capstone-card ${isDone ? 'is-passed' : ''} ${isOpen ? 'is-current' : ''}">
                <details ${isOpen ? 'open' : ''}>
                  <summary class="capstone-card-summary">
                    <span class="capstone-index">0${index + 1}</span>
                    <span class="capstone-summary-main">
                      <span class="capstone-meta-line"><span>${cap.phase}</span><i></i><span>${escapeHtml(cap.estimate)}</span><i></i><span>${escapeHtml(cap.difficulty)}</span></span>
                      <strong>${escapeHtml(cap.title)}</strong>
                      <small>${escapeHtml(cap.subtitle)}</small>
                    </span>
                    <span class="capstone-summary-progress">
                      <span class="capstone-status ${isDone ? 'passed' : ''}">${isDone ? '<i data-lucide="check-circle-2"></i> Verified' : 'In progress'}</span>
                      <span class="capstone-mini-track"><i style="width:${Math.round((checkedCount / cap.checks.length) * 100)}%"></i></span>
                      <small>${checkedCount}/${cap.checks.length} checks</small>
                    </span>
                    <i class="capstone-chevron" data-lucide="chevron-down"></i>
                  </summary>
                  <div class="capstone-card-body">
                    <div class="capstone-scenario-grid">
                      <section class="capstone-scenario"><span class="capstone-label"><i data-lucide="briefcase-business"></i> THE PRODUCT PROBLEM</span><p>${escapeHtml(cap.scenario)}</p></section>
                      <section class="capstone-outcome"><span class="capstone-label"><i data-lucide="flag"></i> WHAT YOU WILL SHIP</span><p>${escapeHtml(cap.outcome)}</p></section>
                    </div>
                    <section class="capstone-why"><span class="capstone-label"><i data-lucide="brain-circuit"></i> WHY THIS MATTERS</span><p>${escapeHtml(cap.why)}</p></section>

                    <div class="capstone-work-grid">
                      <section class="capstone-work-block">
                        <div class="capstone-block-heading"><span>01</span><div><h3>What you need to build</h3><p>Work in this order. Keep the first version small.</p></div></div>
                        <ol class="capstone-build-list">${cap.build.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
                      </section>
                      <section class="capstone-work-block capstone-check-block">
                        <div class="capstone-block-heading"><span>02</span><div><h3>How to know it works</h3><p>These are observable acceptance criteria—not a feeling.</p></div></div>
                        <div class="capstone-check-list">
                          ${cap.checks.map((item, i) => `
                            <label class="capstone-check-item ${checks[i] ? 'is-checked' : ''}">
                              <input type="checkbox" ${checks[i] ? 'checked' : ''} onchange="toggleCapstoneCheck('${cap.id}', ${i})" />
                              <span>${escapeHtml(item)}</span>
                            </label>`).join('')}
                        </div>
                        <div class="capstone-check-footer"><span>${checkedCount} of ${cap.checks.length} verified by you</span><span>${Math.round((checkedCount / cap.checks.length) * 100)}%</span></div>
                        <div class="capstone-mini-track large"><i style="width:${Math.round((checkedCount / cap.checks.length) * 100)}%"></i></div>
                      </section>
                    </div>

                    <div class="capstone-lower-grid">
                      <section class="capstone-info-block"><span class="capstone-label"><i data-lucide="package-check"></i> PROOF TO KEEP</span><ul>${cap.deliverables.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
                      <section class="capstone-info-block capstone-learn-block"><span class="capstone-label"><i data-lucide="graduation-cap"></i> AFTER THIS, YOU SHOULD BE ABLE TO</span><ul>${cap.learn.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
                    </div>

                    <section class="capstone-review-block">
                      <div class="capstone-review-heading"><span class="capstone-label"><i data-lucide="life-buoy"></i> IF YOU GET STUCK: WHAT TO REVIEW</span><span>Return to the concept, not random tutorials</span></div>
                      <ul>${cap.revisit.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
                    </section>

                    <section class="capstone-stretch"><span><i data-lucide="telescope"></i> OPTIONAL STRETCH</span><p>${escapeHtml(cap.stretch)}</p></section>
                    ${CAPSTONE_AI_EXTENSIONS[cap.id] ? `<section class="capstone-ai-extension"><div><span class="capstone-label"><i data-lucide="brain-circuit"></i> OPTIONAL AI INTEGRATION · KEEP THE CORE DETERMINISTIC</span><h4>${escapeHtml(CAPSTONE_AI_EXTENSIONS[cap.id].title)}</h4><p>${escapeHtml(CAPSTONE_AI_EXTENSIONS[cap.id].body)}</p></div><div class="capstone-ai-links">${CAPSTONE_AI_EXTENSIONS[cap.id].labs.map(id=>`<button type="button" onclick="event.preventDefault();event.stopPropagation();openLabDetail('${id}')">${id}</button>`).join('')}</div></section>` : ''}

                    <section class="capstone-proof-entry">
                      <div><span class="capstone-label"><i data-lucide="notebook-pen"></i> YOUR ENGINEERING NOTES</span><p>What did you implement? What trade-off did you make? What failed, and how did you verify the fix? Write at least 40 characters to preserve a useful proof note.</p></div>
                      <textarea rows="3" maxlength="1200" placeholder="Example: I chose WorkManager because this backup is deferrable... I tested process death by..." oninput="setCapstoneEvidence('${cap.id}', this.value)">${escapeHtml(evidence)}</textarea>
                      <div class="capstone-proof-footer"><span>${evidence.trim().length}/40 minimum characters</span><span class="${evidenceReady ? 'is-ready' : ''}">${evidenceReady ? 'Proof note ready' : 'Add a little more detail'}</span></div>
                    </section>

                    <footer class="capstone-card-footer">
                      <div class="capstone-linked-labs"><span>RELATED LABS</span>${cap.labs.map(lid => `<button type="button" onclick="event.preventDefault();event.stopPropagation();openLabDetail('${lid}')" class="${userState.completedLabs[lid] ? 'lab-done' : ''}">${lid}${userState.completedLabs[lid] ? ' ✓' : ''}</button>`).join('')}</div>
                      <div class="capstone-complete-area">
                        <span>${isDone ? 'Your challenge is marked as verified.' : canComplete ? 'All criteria checked and proof recorded.' : `${cap.checks.length - checkedCount} checks + ${evidenceReady ? 'proof ready' : 'proof note'} remaining`}</span>
                        <button type="button" onclick="toggleCapstoneCompleted('${cap.id}')" class="capstone-complete-btn ${isDone ? 'is-done' : ''}" ${!isDone && !canComplete ? 'disabled' : ''}>
                          <i data-lucide="${isDone ? 'undo-2' : 'badge-check'}"></i>${isDone ? 'Reopen challenge' : 'Verify capstone'}
                        </button>
                      </div>
                    </footer>
                  </div>
                </details>
              </article>`;
          }).join('')}
        </div>
      </section>
    </div>
  `;
}

// --- 4. THE CORE + AI ENGINEERING LABS EXPLORER ---
function renderLabsExplorerView() {
  const phases = ['all', ...UNIFIED_PHASES.map(p => p.id)];
  const activeTrack = GOAL_TRACKS[userState.labTrackFilter] || GOAL_TRACKS['all'];

  const filtered = CURRICULUM_LABS.filter(lab => {
    const matchPhase = userState.labPhaseFilter === 'all' || lab.phase === userState.labPhaseFilter;
    const isDone = !!userState.completedLabs[lab.id];
    const matchStatus = userState.labStatusFilter === 'all' || (userState.labStatusFilter === 'completed' && isDone) || (userState.labStatusFilter === 'pending' && !isDone);
    const matchTrack = userState.labTrackFilter === 'all' || activeTrack.labs.includes(lab.id);
    return matchPhase && matchStatus && matchTrack;
  });

  return `
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="app-surface space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-main m-0">3. The ${CURRICULUM_LABS.length} Engineering Labs</h1>
            <p class="text-xs text-muted m-0 mt-1">Click any Lab to open its complete specification, official documentation links, deep interview questions, ADR builder, and Gradle starter kit.</p>
          </div>
          <div class="flex gap-1.5 app-subtle p-1">
            <button onclick="userState.labStatusFilter='all'; renderMainContent();" class="btn ${userState.labStatusFilter === 'all' ? 'btn-primary' : 'btn-secondary'} py-1 px-2.5 text-xs">All (${CURRICULUM_LABS.length})</button>
            <button onclick="userState.labStatusFilter='completed'; renderMainContent();" class="btn ${userState.labStatusFilter === 'completed' ? 'btn-primary' : 'btn-secondary'} py-1 px-2.5 text-xs">Completed</button>
            <button onclick="userState.labStatusFilter='pending'; renderMainContent();" class="btn ${userState.labStatusFilter === 'pending' ? 'btn-primary' : 'btn-secondary'} py-1 px-2.5 text-xs">Remaining</button>
          </div>
        </div>

        <!-- Smart Goal-Based Track Filters -->
        <div class="pt-3 border-t app-border">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-mono uppercase text-accent-sec font-bold">Goal-Based Engineering Tracks</span>
            <span class="text-xs text-muted">${escapeHtml(activeTrack.desc)}</span>
          </div>
          <div class="flex flex-wrap gap-2">
            ${Object.entries(GOAL_TRACKS).map(([k, t]) => `
              <button onclick="userState.labTrackFilter='${k}'; renderMainContent();" class="btn ${userState.labTrackFilter === k ? 'btn-primary' : 'btn-secondary'} py-1.5 px-3 text-xs">
                ${t.label} ${t.labs.length ? `(${t.labs.length})` : ''}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Phase Filter Pills -->
        <div class="flex flex-wrap gap-2 pt-2 border-t app-border">
          ${phases.map(p => `
            <button onclick="userState.labPhaseFilter='${p}'; renderMainContent();" class="btn ${userState.labPhaseFilter === p ? 'btn-primary' : 'btn-secondary'} py-1 px-3 text-xs font-mono">
              ${p === 'all' ? `All Phases (${CURRICULUM_LABS.length})` : p}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.map(lab => {
          const isDone = !!userState.completedLabs[lab.id];
          const ratings = userState.masteryRatings[lab.id] || {};
          const scores = Object.values(ratings).filter(Boolean);
          const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : null;
          return `
            <div class="lab-item-card ${isDone ? 'lab-completed' : ''} flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-md font-mono text-xs font-extrabold bg-emerald-500/15 text-accent border border-emerald-500/30">${lab.id}</span>
                    <span class="badge badge-secondary">${lab.phase}</span>
                  </div>
                  <button onclick="toggleLabCompleted('${lab.id}')" class="btn ${isDone ? 'btn-primary' : 'btn-secondary'} py-1 px-2.5 text-[11px] font-mono">
                    <i data-lucide="${isDone ? 'check' : 'circle'}" class="w-3 h-3"></i>
                    ${isDone ? 'Done' : 'Mark Done'}
                  </button>
                </div>
                <h3 onclick="openLabDetail('${lab.id}')" class="cursor-pointer text-base font-bold text-main hover:text-accent transition m-0 mb-2">
                  ${escapeHtml(lab.title)}
                </h3>
                <p class="text-xs text-secondary line-clamp-3 m-0 mb-4">${escapeHtml(lab.goal)}</p>
              </div>
              <div class="pt-3 border-t app-border flex items-center justify-between text-xs font-mono text-muted">
                <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-accent-sec"></i> ${lab.duration}</span>
                <div class="flex items-center gap-2">
                  ${avg ? `<span class="text-accent font-bold">Rating: ${avg}/5</span>` : ''}
                  <button onclick="openLabDetail('${lab.id}')" class="text-accent font-bold hover:underline flex items-center gap-1">
                    Open Lab <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- SINGLE LAB DEEP-DIVE VIEW (3 TABS: SPEC + OFFICIAL DOCS + INTERVIEW Qs, ADR BUILDER, STARTER KIT) ---
function getLabStarterKit(lab) {
  const slug = lab.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const text = (lab.title + ' ' + lab.constraints + ' ' + lab.concepts.join(' ')).toLowerCase();
  let plugins = `plugins {\n    id("com.android.application")\n    id("org.jetbrains.kotlin.android")\n}`;
  let extraConfig = '';
  const deps = [];

  if (lab.id === 'LAB 01' || text.includes('zero android dependencies') || text.includes('pure jvm')) {
    plugins = `plugins {\n    kotlin("jvm") version "2.0.20"\n}`;
    deps.push(`implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")`);
    deps.push(`testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")`);
    deps.push(`testImplementation(kotlin("test"))`);
  } else if (lab.id === 'LAB 49') {
    plugins = `plugins {\n    kotlin("multiplatform") version "2.0.20"\n    id("com.android.library")\n    id("co.touchlab.skie") version "0.9.3"\n}`;
    extraConfig = `\nandroid {\n    externalNativeBuild {\n        cmake {\n            path = file("src/androidMain/cpp/CMakeLists.txt")\n            // 16KB ELF Page Size Alignment for Android 15+\n            arguments("-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON")\n        }\n    }\n}\n`;
    deps.push(`// commonMain dependencies`);
    deps.push(`implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")`);
    deps.push(`testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")`);
  } else if (lab.phase === 'Phase 8') {
    deps.push(`// AI provider calls should normally go through your authenticated backend.`);
    deps.push(`// Add LiteRT or ML Kit only for the on-device task selected in this lab.`);
    deps.push(`implementation(\"org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0\")`);
  } else if (lab.phase === 'Phase 7') {
    plugins = `plugins {\n    kotlin("multiplatform") version "2.0.20"\n    kotlin("plugin.serialization") version "2.0.20"\n}`;
    deps.push(`// commonMain dependencies`);
    deps.push(`implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")`);
    deps.push(`implementation("androidx.lifecycle:lifecycle-viewmodel:2.8.4")`);
    deps.push(`implementation("io.ktor:ktor-client-core:2.3.12")`);
    deps.push(`implementation("androidx.room:room-runtime:2.7.0-alpha07")`);
    deps.push(`implementation("androidx.sqlite:sqlite-bundled:2.5.0-alpha07")`);
    deps.push(`implementation("io.insert-koin:koin-core:3.5.6")`);
  } else {
    deps.push(`implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")`);
    if (lab.id === 'LAB 46' || text.includes('compose')) {
      deps.push(`implementation(platform("androidx.compose:compose-bom:2024.09.00"))`);
      deps.push(`implementation("androidx.compose.ui:ui")`);
      deps.push(`implementation("androidx.compose.ui:ui-graphics")`);
      deps.push(`implementation("androidx.compose.material3:material3")`);
    }
    if (lab.id === 'LAB 47') {
      deps.push(`implementation("io.ktor:ktor-client-websockets:2.3.12")`);
      deps.push(`implementation("io.ktor:ktor-client-okhttp:2.3.12")`);
      deps.push(`implementation("io.grpc:grpc-okhttp:1.66.0")`);
      deps.push(`implementation("io.grpc:grpc-protobuf-lite:1.66.0")`);
      deps.push(`implementation("io.grpc:grpc-kotlin-stub:1.4.1")`);
      deps.push(`implementation("com.google.protobuf:protobuf-kotlin-lite:4.28.0")`);
    }
    if (lab.id === 'LAB 48') {
      deps.push(`// Firebase BaaS (Android)`);
      deps.push(`implementation(platform("com.google.firebase:firebase-bom:33.3.0"))`);
      deps.push(`implementation("com.google.firebase:firebase-firestore")`);
      deps.push(`implementation("com.google.firebase:firebase-auth")`);
      deps.push(`// Supabase Multiplatform (supabase-kt)`);
      deps.push(`implementation(platform("io.github.jan-tennert.supabase:bom:3.0.0"))`);
      deps.push(`implementation("io.github.jan-tennert.supabase:postgrest-kt")`);
      deps.push(`implementation("io.github.jan-tennert.supabase:auth-kt")`);
      deps.push(`implementation("io.github.jan-tennert.supabase:realtime-kt")`);
    }
    if (lab.id === 'LAB 50') {
      deps.push(`implementation("androidx.compose.material3.adaptive:adaptive:1.0.0")`);
      deps.push(`implementation("androidx.compose.material3.adaptive:adaptive-layout:1.0.0")`);
      deps.push(`implementation("androidx.compose.material3.adaptive:adaptive-navigation:1.0.0")`);
      deps.push(`implementation("androidx.compose.material3:material3-adaptive-navigation-suite:1.3.0")`);
      deps.push(`implementation("androidx.window:window:1.3.0")`);
    }
    if (text.includes('hilt')) {
      deps.push(`implementation("com.google.dagger:hilt-android:2.52")`);
      deps.push(`ksp("com.google.dagger:hilt-compiler:2.52")`);
    }
    if (text.includes('room')) {
      deps.push(`implementation("androidx.room:room-runtime:2.6.1")`);
      deps.push(`implementation("androidx.room:room-ktx:2.6.1")`);
      deps.push(`ksp("androidx.room:room-compiler:2.6.1")`);
    }
    if (text.includes('ktor') || text.includes('retrofit')) {
      deps.push(`implementation("io.ktor:ktor-client-okhttp:2.3.12")`);
      deps.push(`implementation("com.squareup.retrofit2:retrofit:2.11.0")`);
      deps.push(`testImplementation("com.squareup.okhttp3:mockwebserver:4.12.0")`);
    }
    if (text.includes('workmanager')) {
      deps.push(`implementation("androidx.work:work-runtime-ktx:2.9.1")`);
    }
    deps.push(`testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")`);
    deps.push(`testImplementation("app.cash.turbine:turbine:1.1.0")`);
  }

  const bashScript = `#!/usr/bin/env bash\n# Workspace Scaffold for ${lab.id}: ${lab.title}\nmkdir -p ${slug}/{src/main/kotlin,src/test/kotlin,docs/adr}\ncd ${slug}\necho "# ${lab.id}: ${lab.title}" > README.md\necho "# ADR-001: Architecture Decisions" > docs/adr/0001-architecture.md\ngit init\necho "Ready to build ${lab.id}!"`;
  const gradleSnippet = `// build.gradle.kts for ${lab.id}\n${plugins}${extraConfig}\ndependencies {\n    ${deps.join('\n    ')}\n}`;
  return { slug, bashScript, gradleSnippet };
}

function generateAdrMarkdown(lab) {
  const adr = userState.structuredAdrs[lab.id] || {};
  const ratings = userState.masteryRatings[lab.id] || {};
  return `# ${lab.id}: ${lab.title}
> **${lab.phase} · Estimated Duration: ${lab.duration}**
> **Repository**: ${adr.repoUrl || 'https://github.com/your-username/' + lab.id.toLowerCase().replace(/\s+/g, '-')}

## 1. Goal
${lab.goal}

## 2. Architecture Decision Record (ADR)
- **Title**: ${adr.title || 'ADR-001: Core Architecture for ' + lab.title}
- **Context & Problem**: ${adr.context || 'Document the constraints and real-world failure modes addressed.'}
- **Considered Alternatives**: ${adr.alternatives || 'Option A vs Option B'}
- **Decision & First-Principles Justification**: ${adr.decision || 'Explain why this design was chosen.'}
- **Trade-offs & Consequences**: ${adr.consequences || 'List positive outcomes and operational risks.'}

## 3. One-Page "What I Learned" Retention Summary
- **Key Engineering Takeaways**: ${adr.takeaways || '...'}
- **Failure Modes Discovered (Broken on Purpose)**: ${adr.failureModes || '...'}
- **Edge Cases Verified**: ${adr.edgeCases || '...'}

## 4. Mastery Self-Evaluation (1–5)
${MASTERY_DIMENSIONS.map(d => `- **${d}**: ${ratings[d] ? ratings[d] + '/5' : 'Unrated'}`).join('\n')}
`;
}

function updateAdrField(labId, field, val) {
  if (!userState.structuredAdrs[labId]) userState.structuredAdrs[labId] = {};
  userState.structuredAdrs[labId][field] = val;
  saveState();
  const pre = document.getElementById('adr-live-preview');
  const lab = CURRICULUM_LABS.find(l => l.id === labId);
  if (pre && lab) pre.textContent = generateAdrMarkdown(lab);
}

function downloadAdrReadme(labId) {
  const lab = CURRICULUM_LABS.find(l => l.id === labId);
  if (!lab) return;
  const blob = new Blob([generateAdrMarkdown(lab)], { type: 'text/markdown;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${lab.id.toLowerCase().replace(/\s+/g, '-')}-README.md`;
  a.click();
}


const CORE_TOPIC_LABS = [
  {terms:['coroutine','concurrency','mutex','structured cancellation'],ids:['LAB 01','LAB 02']},
  {terms:['flow'],ids:['LAB 02']},{terms:['lifecycle','process death','process recreation','saved state'],ids:['LAB 03','LAB 05']},
  {terms:['compose state','stateflow','ui state'],ids:['LAB 04']},{terms:['navigation'],ids:['LAB 06']},
  {terms:['room','sqlite','database','persistence','migration'],ids:['LAB 10']},{terms:['network','http','okhttp','ktor','retrofit'],ids:['LAB 11']},
  {terms:['offline','outbox','sync','reconciliation'],ids:['LAB 12']},{terms:['datastore'],ids:['LAB 13']},{terms:['permission'],ids:['LAB 14']},
  {terms:['workmanager','background work'],ids:['LAB 15']},{terms:['foreground service','media session','audio focus'],ids:['LAB 16']},
  {terms:['security','keystore','privacy','sensitive data'],ids:['LAB 17']},{terms:['authentication','token','session','biometric'],ids:['LAB 18']},
  {terms:['compose performance','jank'],ids:['LAB 20']},{terms:['startup'],ids:['LAB 21']},{terms:['memory','leak'],ids:['LAB 22']},
  {terms:['profiling','perfetto','anr'],ids:['LAB 23']},{terms:['testing','mockwebserver','test harness'],ids:['LAB 24','LAB 25']},
  {terms:['modularization'],ids:['LAB 26']},{terms:['deep link'],ids:['LAB 27']},{terms:['push','fcm','notification'],ids:['LAB 28']},
  {terms:['location','gps','geofence'],ids:['LAB 29']},{terms:['camera','barcode'],ids:['LAB 30']},{terms:['file','storage','saf'],ids:['LAB 31']},
  {terms:['accessibility','rtl','font scaling'],ids:['LAB 32']},{terms:['ci','pipeline'],ids:['LAB 33']},{terms:['pagination','paging'],ids:['LAB 36']},
  {terms:['kmp','multiplatform'],ids:['LAB 38','LAB 39']},{terms:['payment','billing'],ids:['LAB 44']},{terms:['debug'],ids:['LAB 45']},
  {terms:['websocket','realtime','real-time'],ids:['LAB 47']},{terms:['adaptive','foldable'],ids:['LAB 50']},
  {terms:['artificial intelligence','llm','on-device ml','machine learning','rag','embeddings','structured output','function calling','prompt injection'],ids:['LAB 51','LAB 52','LAB 53','LAB 54','LAB 55','LAB 56','LAB 57']}
];
function findCoreLabsForTopics(topics) {
  const text=(topics||[]).join(' ').toLowerCase();
  const ids=new Set();
  CORE_TOPIC_LABS.forEach(rule=>{if(rule.terms.some(term=>text.includes(term)))rule.ids.forEach(id=>ids.add(id));});
  (text.match(/lab\s*0?\d{1,2}/g)||[]).forEach(token=>{const normalized=token.toUpperCase().replace(/\s+/g,' ');if(CURRICULUM_LABS.some(l=>l.id===normalized))ids.add(normalized);});
  return [...ids].map(id=>CURRICULUM_LABS.find(l=>l.id===id)).filter(Boolean);
}

// --- DOMAIN TRACKS: product-shaped learning paths ---
function renderDomainTracksView() {
  const allLabs = DOMAIN_TRACKS.flatMap(t => t.modules.flatMap(m => m.labs));
  const done = allLabs.filter(l => !!userState.domainLabProgress?.[l.id]).length;
  const selected = userState.selectedDomainTrack || 'fintech';
  const track = DOMAIN_TRACKS.find(t => t.id === selected) || DOMAIN_TRACKS[0];
  const trackLabs = track.modules.flatMap(m => m.labs);
  const trackDone = trackLabs.filter(l => !!userState.domainLabProgress?.[l.id]).length;
  const total = DOMAIN_TRACKS.reduce((n,t)=>n+t.modules.reduce((m,x)=>m+x.labs.length,0),0);
  return `
    <div class="max-w-7xl mx-auto space-y-6 domain-page">
      <section class="domain-hero">
        <div class="domain-hero-copy"><span class="domain-eyebrow"><i data-lucide="blocks"></i> PRODUCT-SHAPED LEARNING</span>
          <h1>Learn the engineering <em>behind real products.</em></h1>
          <p>Choose a product domain, solve small engineering problems in sequence, then integrate them into a realistic client. Domain tracks reuse the Core Labs instead of repeating them.</p>
          <div class="domain-hero-stats"><span><b>${DOMAIN_TRACKS.length}</b> domain paths</span><span><b>${total}</b> guided domain labs</span><span><b>${done}/${total}</b> completed</span></div>
        </div>
        <div class="domain-hero-side"><span class="domain-ring-label">ALL TRACKS</span><strong>${Math.round(done/Math.max(1,total)*100)}%</strong><div class="domain-progress"><i style="width:${done/Math.max(1,total)*100}%"></i></div><small>Progress is based on labs you mark complete—not pages opened.</small></div>
      </section>
      <div class="domain-track-grid">
        ${DOMAIN_TRACKS.map(t=>{const ls=t.modules.flatMap(m=>m.labs);const d=ls.filter(l=>userState.domainLabProgress?.[l.id]).length;return `<button class="domain-track-tile ${t.id===track.id?'active':''}" onclick="selectDomainTrack('${t.id}')"><span class="domain-track-icon"><i data-lucide="${t.icon}"></i></span><span class="domain-track-tile-copy"><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.summary)}</small><em>${d}/${ls.length} labs · ${escapeHtml(t.level||'Intermediate')} · ${escapeHtml(t.estimate)}</em></span><span class="domain-tile-arrow"><i data-lucide="arrow-up-right"></i></span></button>`}).join('')}
      </div>
      <section class="domain-detail-shell">
        <header class="domain-detail-head"><div><span class="domain-eyebrow">SELECTED DOMAIN · ${escapeHtml(track.level||'INTERMEDIATE')}</span><h2>${escapeHtml(track.title)}</h2><p>${escapeHtml(track.summary)}</p></div><div class="domain-track-completion"><strong>${trackDone}<small>/${trackLabs.length}</small></strong><span>Labs complete</span><div class="domain-progress"><i style="width:${trackDone/Math.max(1,trackLabs.length)*100}%"></i></div></div></header>
        ${track.product?`<div class="domain-product-brief"><span><i data-lucide="package"></i> THE PRODUCT YOU ARE BUILDING</span><p>${escapeHtml(track.product)}</p></div>`:''}
        <div class="domain-outcomes"><span class="domain-section-kicker">WHAT YOU SHOULD BE ABLE TO DO</span><div>${(track.outcomes||[]).map(x=>`<span><i data-lucide="check"></i>${escapeHtml(x)}</span>`).join('')}</div></div>
        <div class="domain-modules">${track.modules.map((m,mi)=>{const md=m.labs.filter(l=>userState.domainLabProgress?.[l.id]).length;return `<section class="domain-module"><header><div class="domain-module-number">0${mi+1}</div><div class="domain-module-title"><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.goal)}</p></div><span class="domain-module-count">${md}/${m.labs.length}</span></header><div class="domain-lab-list">${m.labs.map(l=>{const isDone=!!userState.domainLabProgress?.[l.id];return `<article id="domain-lab-${l.id}" class="domain-lab ${isDone?'is-done':''}"><div class="domain-lab-top"><div><span class="domain-lab-meta">${escapeHtml(l.id)} · ${escapeHtml(l.type)} · ${escapeHtml(l.estimate)}</span><h4>${escapeHtml(l.title)}</h4></div><label class="domain-done-toggle"><input type="checkbox" ${isDone?'checked':''} onchange="toggleDomainLab('${l.id}')"><span>${isDone?'Done':'Mark done'}</span></label></div><div class="domain-lab-problem"><b>THE PROBLEM</b><p>${escapeHtml(l.problem)}</p></div><div class="domain-lab-importance"><b>WHY IT MATTERS</b><p>${escapeHtml(l.importance)}</p></div><div class="domain-lab-columns"><div><b>BUILD IN THIS ORDER</b><ol>${l.steps.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol></div><div><b>ACCEPTANCE CRITERIA</b><ul class="domain-checks">${l.checks.map(x=>`<li><i data-lucide="circle-check"></i>${escapeHtml(x)}</li>`).join('')}</ul></div></div><div class="domain-lab-columns learning"><div><b>AFTER THIS, UNDERSTAND</b><ul>${l.learn.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div><div><b>IF STUCK, REVIEW</b><ul>${l.revisit.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>${findCoreLabsForTopics(l.revisit).length?`<div class="core-review-links">${findCoreLabsForTopics(l.revisit).map(ref=>`<button type="button" onclick="openLabDetail('${ref.id}')">${ref.id} · ${escapeHtml(ref.title)} <i data-lucide="arrow-up-right"></i></button>`).join('')}</div>`:''}</div></div><div class="domain-lab-resources"><b><i data-lucide="book-open"></i> LEARNING SOURCES</b>${l.resources.map(r=>`<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.label)} <i data-lucide="external-link"></i></a>`).join('')}</div></article>`}).join('')}</div></section>`}).join('')}</div>
        ${track.capstone?`<section class="domain-capstone"><span><i data-lucide="flag"></i> DOMAIN INTEGRATION CHALLENGE</span><p>${escapeHtml(track.capstone)}</p>${track.guardrail?`<small><b>Scope & safety boundary:</b> ${escapeHtml(track.guardrail)}</small>`:''}</section>`:''}
      </section>
    </div>`;
}

function renderScenarioLibraryView() {
  const groups=[...new Set(MOBILE_SCENARIOS.map(s=>s.group))];
  const done=MOBILE_SCENARIOS.filter(s=>userState.scenarioProgress?.[s.id]).length;
  const filter=userState.scenarioFilter||'All';
  const visible=MOBILE_SCENARIOS.filter(s=>filter==='All'||s.group===filter);
  return `<div class="max-w-7xl mx-auto space-y-6 scenario-page"><section class="scenario-hero"><div><span class="domain-eyebrow"><i data-lucide="siren"></i> CROSS-DOMAIN FAILURE PRACTICE</span><h1>Train for what <em>goes wrong.</em></h1><p>Real mobile engineering is mostly about preserving correct behavior when the OS, network, device, backend, or user does something unexpected. Pick a failure, reproduce it, then prove your recovery.</p></div><div class="scenario-score"><strong>${done}<small>/${MOBILE_SCENARIOS.length}</small></strong><span>scenarios completed</span><div class="domain-progress"><i style="width:${done/MOBILE_SCENARIOS.length*100}%"></i></div></div></section>
    <div class="scenario-principle"><i data-lucide="lightbulb"></i><p><b>How to use this library:</b> do not just read the scenario. Reproduce it with a mock, emulator control, test fake, or deliberately broken implementation. Save the test or recording that proves your fix.</p></div>
    <div class="scenario-filter-row"><button class="scenario-filter ${filter==='All'?'active':''}" onclick="filterScenarios('All')">All <span>${MOBILE_SCENARIOS.length}</span></button>${groups.map(g=>`<button class="scenario-filter ${filter===g?'active':''}" onclick="filterScenarios('${escapeHtml(g)}')">${escapeHtml(g)} <span>${MOBILE_SCENARIOS.filter(s=>s.group===g).length}</span></button>`).join('')}</div>
    <div class="scenario-grid">${visible.map(s=>{const isDone=!!userState.scenarioProgress?.[s.id];return `<article class="scenario-card ${isDone?'is-done':''}"><div class="scenario-card-top"><span class="scenario-id">${escapeHtml(s.id)}</span><span class="scenario-severity ${s.severity.toLowerCase()}">${escapeHtml(s.severity)}</span></div><h3>${escapeHtml(s.title)}</h3><p class="scenario-prompt">${escapeHtml(s.prompt)}</p><div class="scenario-task"><b>REPRODUCE & SOLVE</b><p>${escapeHtml(s.task)}</p></div><div class="scenario-two-col"><div><b>PROVE THE FIX</b><ul>${s.checks.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div><div><b>WHAT YOU LEARN</b><ul>${s.learn.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div></div><div class="scenario-review"><b>REVIEW</b><span>${s.review.map(escapeHtml).join(' · ')}</span></div>${findCoreLabsForTopics(s.review).length?`<div class="core-review-links scenario-core-links">${findCoreLabsForTopics(s.review).map(ref=>`<button type="button" onclick="openLabDetail('${ref.id}')">${ref.id} · ${escapeHtml(ref.title)} <i data-lucide="arrow-up-right"></i></button>`).join('')}</div>`:''}<div class="scenario-card-footer"><span>${escapeHtml(s.group)} · ${escapeHtml(s.time)}</span><label><input type="checkbox" ${isDone?'checked':''} onchange="toggleScenario('${s.id}')"><span>${isDone?'Completed':'Mark practiced'}</span></label></div><div class="scenario-domains">${s.domains.map(d=>`<span>${escapeHtml(d)}</span>`).join('')}</div></article>`}).join('')}</div>
  </div>`;
}

function renderCoverageMapView() {
  const dimensions=[
    {name:'Kotlin & concurrency',core:['LAB 01','LAB 02'],domains:['Messaging','IoT']},
    {name:'Lifecycle & state recovery',core:['LAB 03','LAB 05'],domains:['FinTech','POS','Media','Productivity']},
    {name:'Architecture & modularity',core:['LAB 06','LAB 07','LAB 08','LAB 09','LAB 26'],domains:['All domains']},
    {name:'Persistence & offline-first',core:['LAB 10','LAB 12','LAB 13'],domains:['FinTech','POS','E-commerce','Messaging','Productivity']},
    {name:'Networking & distributed state',core:['LAB 11','LAB 12','LAB 47'],domains:['FinTech','POS','Messaging','Delivery']},
    {name:'Security & privacy',core:['LAB 17','LAB 18'],domains:['FinTech','Healthcare','E-commerce']},
    {name:'Testing & verification',core:['LAB 24','LAB 25','LAB 45'],domains:['All domains']},
    {name:'Performance & observability',core:['LAB 20','LAB 21','LAB 22','LAB 23','LAB 35'],domains:['Media','Social','All domains']},
    {name:'Hardware & platform integration',core:['LAB 14','LAB 15','LAB 16','LAB 29','LAB 30','LAB 31','LAB 43'],domains:['POS','IoT','Delivery']},
    {name:'UI, accessibility & adaptive design',core:['LAB 04','LAB 19','LAB 32','LAB 46','LAB 50'],domains:['All domains']},
    {name:'AI integration, grounding & evaluation',core:['LAB 51','LAB 52','LAB 53','LAB 54','LAB 55','LAB 56','LAB 57'],domains:['AI Mobile']}
  ];
  const domainDone=id=>{const t=DOMAIN_TRACKS.find(x=>x.short===id||x.title.includes(id));return t?t.modules.flatMap(m=>m.labs).some(l=>userState.domainLabProgress?.[l.id]):false};
  const rows=dimensions.map(d=>{const coreDone=d.core.filter(id=>!!userState.completedLabs[id]).length;const relevant=DOMAIN_TRACKS.filter(t=>d.domains.includes('All domains')||d.domains.includes(t.short)||d.domains.includes(t.title.split(' ')[0]));const applied=relevant.filter(t=>t.modules.flatMap(m=>m.labs).some(l=>userState.domainLabProgress?.[l.id])).length;const total=relevant.length;const status=coreDone===d.core.length&&(!total||applied>0)?'Applied':coreDone>0||applied>0?'In progress':'Not started';return { ...d,coreDone,applied,total,status};});
  const covered=rows.filter(r=>r.status==='Applied').length;
  return `<div class="max-w-6xl mx-auto space-y-6 coverage-page"><section class="coverage-hero"><span class="domain-eyebrow"><i data-lucide="scan-search"></i> KNOWLEDGE COVERAGE & EVIDENCE</span><h1>See the gaps, not just the <em>completion percentage.</em></h1><p>Finishing a lab is not the same as being able to use a skill. This map links Core foundations to the domains where you apply them. It is a planning aid—not an automatic proof of competence.</p><div class="coverage-metrics"><div><strong>${covered}<small>/${rows.length}</small></strong><span>dimensions applied</span></div><div><strong>${Object.values(userState.completedLabs).filter(Boolean).length}</strong><span>core labs completed</span></div><div><strong>${Object.values(userState.domainLabProgress||{}).filter(Boolean).length}</strong><span>domain labs completed</span></div><div><strong>${Object.values(userState.scenarioProgress||{}).filter(Boolean).length}</strong><span>scenarios practiced</span></div></div></section>
    <div class="coverage-legend"><span><i class="covered"></i> Applied (core + domain practice)</span><span><i class="partial"></i> In progress</span><span><i class="empty"></i> Not started</span></div>
    <div class="coverage-table-wrap"><table class="coverage-table"><thead><tr><th>Engineering capability</th><th>Core foundations</th><th>Domain application</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${escapeHtml(r.name)}</b><small>Practice across relevant product contexts</small></td><td><span class="coverage-count">${r.coreDone}/${r.core.length}</span><small>${r.core.join(', ')}</small></td><td><span class="coverage-count">${r.applied}/${r.total||0}</span><small>${r.domains.join(', ')}</small></td><td><span class="coverage-status ${r.status.toLowerCase().replace(' ','-')}">${r.status}</span></td></tr>`).join('')}</tbody></table></div>
    <section class="coverage-next"><h3><i data-lucide="target"></i> How to use this map</h3><ol><li>Complete the relevant Core Lab and understand its underlying mechanism.</li><li>Apply it in at least one Domain Lab with different product constraints.</li><li>Practice a related failure scenario and keep a test or debugging note.</li><li>Explain the trade-off without reading the solution. Then mark your mastery in the Verification section.</li></ol><small>Coverage is currently an indicative mapping. As the curriculum grows, each capability will be linked to exact lab IDs and evidence criteria.</small></section>
  </div>`;
}

function renderLabDetailView(labId) {
  const idx = CURRICULUM_LABS.findIndex(l => l.id === labId);
  const lab = CURRICULUM_LABS[idx] || CURRICULUM_LABS[0];
  const prevLab = idx > 0 ? CURRICULUM_LABS[idx - 1] : null;
  const nextLab = idx < CURRICULUM_LABS.length - 1 ? CURRICULUM_LABS[idx + 1] : null;
  const isDone = !!userState.completedLabs[lab.id];
  const tab = userState.activeLabTab || 'spec';
  const ratings = userState.masteryRatings[lab.id] || {};
  const adr = userState.structuredAdrs[lab.id] || {};
  const starter = getLabStarterKit(lab);

  return `
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Top Bar -->
      <div class="app-surface p-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-xs">
          <button onclick="navigateSection('labs')" class="btn btn-secondary py-1 px-2.5">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> All ${CURRICULUM_LABS.length} Labs
          </button>
          <span class="font-mono font-bold text-accent text-sm">${lab.id}</span>
          <span class="badge badge-primary">${lab.phase}</span>
          <span class="font-mono text-muted">· Est. ${lab.duration}</span>
        </div>
        <button onclick="toggleLabCompleted('${lab.id}')" class="btn ${isDone ? 'btn-primary' : 'btn-secondary'}">
          <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}" class="w-4 h-4"></i>
          ${isDone ? 'Lab Completed' : 'Mark Lab as Completed'}
        </button>
      </div>

      <!-- 3 Mode Tabs -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 app-subtle p-1.5">
        <button onclick="userState.activeLabTab='spec'; renderMainContent();" class="btn ${tab === 'spec' ? 'btn-primary' : 'btn-secondary'}">
          <i data-lucide="file-text" class="w-4 h-4"></i> 1. Full Lab Specification
        </button>
        <button onclick="userState.activeLabTab='adr'; renderMainContent();" class="btn ${tab === 'adr' ? 'btn-primary' : 'btn-secondary'}">
          <i data-lucide="file-code" class="w-4 h-4"></i> 2. ADR & 1-Page README Builder
        </button>
        <button onclick="userState.activeLabTab='starter'; renderMainContent();" class="btn ${tab === 'starter' ? 'btn-primary' : 'btn-secondary'}">
          <i data-lucide="terminal" class="w-4 h-4"></i> 3. Starter Kit & Gradle Setup
        </button>
      </div>

      ${tab === 'spec' ? `
        <div class="lab-reading markdown-body">
          <header class="lab-reading-hero">
            <div class="lab-reading-kicker"><span class="lab-reading-index">${lab.id}</span><span>${escapeHtml(lab.phase)}</span><span class="lab-kicker-dot"></span><span>${lab.duration} read & build</span></div>
            <h1>${escapeHtml(lab.title)}</h1>
            <p class="lab-reading-lede">${escapeHtml(lab.goal)}</p>
            <div class="lab-reading-meta"><span><i data-lucide="book-open" class="w-3.5 h-3.5"></i> Project brief</span><span><i data-lucide="layers-3" class="w-3.5 h-3.5"></i> ${lab.concepts.length} core concepts</span><span><i data-lucide="target" class="w-3.5 h-3.5"></i> Production-focused</span></div>
          </header>

          <nav class="lab-section-nav" aria-label="Jump to lab section">
            <span class="lab-nav-label">ON THIS PAGE</span>
            <a href="#lab-context">Context</a><a href="#lab-concepts">Concepts</a><a href="#lab-problems">Problems</a><a href="#lab-edge-cases">Edge cases</a><a href="#lab-constraints">Engineering</a><a href="#lab-resources">Resources</a><a href="#lab-interview">Interview</a><a href="#lab-self-check">Self-check</a>
          </nav>

          <div class="lab-reading-body">
            <section id="lab-context" class="lab-section lab-section-why">
              <div class="lab-section-heading"><span class="lab-section-number">01</span><div><span class="lab-eyebrow">THE CONTEXT</span><h2>Why this project exists</h2></div><i data-lucide="compass" class="lab-section-icon"></i></div>
              <p>${escapeHtml(lab.why)}</p>
            </section>

            <section id="lab-concepts" class="lab-section lab-section-concepts">
              <div class="lab-section-heading"><span class="lab-section-number">02</span><div><span class="lab-eyebrow">WHAT YOU WILL LEARN</span><h2>Concepts mastered</h2></div><i data-lucide="brain-circuit" class="lab-section-icon"></i></div>
              <div class="lab-concept-grid">${(lab.concepts || []).map((c, i) => `<div class="lab-concept-item"><span class="lab-concept-index">${String(i + 1).padStart(2, '0')}</span><span>${escapeHtml(c)}</span></div>`).join('')}</div>
            </section>

            <section id="lab-problems" class="lab-section lab-section-problems">
              <div class="lab-section-heading"><span class="lab-section-number">03</span><div><span class="lab-eyebrow">REAL-WORLD ENGINEERING</span><h2>Production problems</h2></div><i data-lucide="workflow" class="lab-section-icon"></i></div>
              <div class="lab-scenario-list">${(lab.problems || []).map((item, i) => `<article class="lab-scenario"><span class="lab-scenario-marker">${String(i + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></article>`).join('')}</div>
            </section>

            <section id="lab-edge-cases" class="lab-section lab-section-edge">
              <div class="lab-section-heading"><span class="lab-section-number">04</span><div><span class="lab-eyebrow">THINK BEYOND THE HAPPY PATH</span><h2>Edge cases to implement</h2></div><i data-lucide="shield-alert" class="lab-section-icon"></i></div>
              <ul class="lab-edge-list">${(lab.edgeCases || []).map(e => `<li><span class="lab-edge-check"><i data-lucide="check" class="w-3 h-3"></i></span><span>${escapeHtml(e)}</span></li>`).join('')}</ul>
            </section>

            <section id="lab-constraints" class="lab-section lab-section-constraints">
              <div class="lab-section-heading"><span class="lab-section-number">05</span><div><span class="lab-eyebrow">ENGINEERING BAR</span><h2>Architecture, testing & performance</h2></div><i data-lucide="gauge" class="lab-section-icon"></i></div>
              <div class="lab-constraint-panel"><p>${escapeHtml(lab.constraints)}</p></div>
            </section>

            ${lab.repoTree ? `
              <section class="lab-section lab-section-code">
                <div class="lab-section-heading"><span class="lab-section-number">06</span><div><span class="lab-eyebrow">PROJECT BLUEPRINT</span><h2>Repository & module structure</h2></div><i data-lucide="folder-tree" class="lab-section-icon"></i></div>
                <div class="lab-code-window"><div class="lab-code-toolbar"><span class="lab-code-dots"><i></i><i></i><i></i></span><span>project-structure</span><span class="lab-code-language">TREE</span></div><pre><code>${escapeHtml(lab.repoTree)}</code></pre></div>
              </section>
            ` : ''}

            <section id="lab-resources" class="lab-section lab-section-resources">
              <div class="lab-section-heading"><span class="lab-section-number">07</span><div><span class="lab-eyebrow">GO DEEPER</span><h2>Official documentation & resources</h2></div><i data-lucide="library" class="lab-section-icon"></i></div>
              <div class="lab-resource-grid">${(lab.resources || []).map((r, i) => `
                <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer" class="lab-resource-card no-underline">
                  <span class="lab-resource-icon"><i data-lucide="book-open" class="w-4 h-4"></i></span>
                  <span class="lab-resource-copy"><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.url)}</small></span>
                  <span class="lab-resource-type">${escapeHtml(r.type)}</span><i data-lucide="arrow-up-right" class="lab-resource-arrow w-4 h-4"></i>
                </a>`).join('')}
              </div>
            </section>

            <section id="lab-interview" class="lab-section lab-section-interview">
              <div class="lab-section-heading"><span class="lab-section-number">08</span><div><span class="lab-eyebrow">PROVE YOUR UNDERSTANDING</span><h2>Senior / Staff interview questions</h2></div><i data-lucide="messages-square" class="lab-section-icon"></i></div>
              <ol class="lab-question-list">${(lab.deepQuestions || []).map(q => `<li>${escapeHtml(q)}</li>`).join('')}</ol>
              <div class="lab-faq-block"><div class="lab-faq-title"><i data-lucide="zap" class="w-4 h-4"></i> Core interview FAQs</div><ol>${(lab.commonFaqs || []).map(q => `<li>${escapeHtml(q)}</li>`).join('')}</ol></div>
            </section>

            <section id="lab-self-check" class="lab-section lab-section-checklist">
              <div class="lab-section-heading"><span class="lab-section-number">09</span><div><span class="lab-eyebrow">BE HONEST WITH YOURSELF</span><h2>Self-evaluation checklist</h2></div><i data-lucide="list-checks" class="lab-section-icon"></i></div>
              <p class="lab-section-intro">Check an item only when you can demonstrate it without following a tutorial.</p>
              <div class="lab-checklist">${(lab.checklist || []).map((item, cIdx) => {
                const key = `${lab.id}_chk_${cIdx}`;
                const checked = !!userState.checklistState[key];
                return `
                  <label onclick="toggleChecklistItem('${key}')" class="lab-check-item ${checked ? 'is-checked' : ''}">
                    <input type="checkbox" ${checked ? 'checked' : ''} />
                    <span>${escapeHtml(item)}</span>
                  </label>
                `;
              }).join('')}</div>
            </section>
          </div>
        </div>
      ` : ''}

      ${tab === 'adr' ? `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="app-surface space-y-3">
            <h3 class="text-base font-bold text-main m-0">Structured ADR & 1-Page Summary Builder</h3>
            <p class="text-xs text-muted m-0">Every architectural decision in each lab must have a written ADR and a 1-page summary.</p>
            <input type="text" value="${escapeHtml(adr.repoUrl || '')}" oninput="updateAdrField('${lab.id}','repoUrl',this.value)" placeholder="GitHub Repo URL" class="app-input w-full" />
            <input type="text" value="${escapeHtml(adr.title || '')}" oninput="updateAdrField('${lab.id}','title',this.value)" placeholder="ADR Title (e.g., ADR-001: Dispatcher Strategy)" class="app-input w-full" />
            <textarea rows="2" oninput="updateAdrField('${lab.id}','context',this.value)" placeholder="Context & Problem Statement..." class="app-input w-full">${escapeHtml(adr.context || '')}</textarea>
            <textarea rows="2" oninput="updateAdrField('${lab.id}','alternatives',this.value)" placeholder="Considered Alternatives..." class="app-input w-full">${escapeHtml(adr.alternatives || '')}</textarea>
            <textarea rows="2" oninput="updateAdrField('${lab.id}','decision',this.value)" placeholder="Chosen Decision & First-Principles Justification..." class="app-input w-full">${escapeHtml(adr.decision || '')}</textarea>
            <textarea rows="2" oninput="updateAdrField('${lab.id}','takeaways',this.value)" placeholder="1-Page Summary: What I Learned in My Own Words..." class="app-input w-full">${escapeHtml(adr.takeaways || '')}</textarea>
            <textarea rows="2" oninput="updateAdrField('${lab.id}','failureModes',this.value)" placeholder="What I Broke on Purpose & Failure Modes Observed..." class="app-input w-full">${escapeHtml(adr.failureModes || '')}</textarea>
          </div>
          <div class="app-surface flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-mono font-bold text-accent">Live README.md Output</span>
                <button onclick="downloadAdrReadme('${lab.id}')" class="btn btn-primary py-1.5 px-3 text-xs">
                  <i data-lucide="download" class="w-3.5 h-3.5"></i> Download README.md
                </button>
              </div>
              <pre id="adr-live-preview" class="app-subtle p-4 text-xs font-mono text-main whitespace-pre-wrap overflow-y-auto" style="max-height: 460px;">${escapeHtml(generateAdrMarkdown(lab))}</pre>
            </div>
          </div>
        </div>
      ` : ''}

      ${tab === 'starter' ? `
        <div class="app-surface markdown-body space-y-4">
          <h3>Starter Kit & Gradle Setup for ${lab.id}</h3>
          <h4>1. Workspace Scaffold Script (Bash / Zsh)</h4>
          <pre><code>${escapeHtml(starter.bashScript)}</code></pre>
          <h4>2. Tailored build.gradle.kts</h4>
          <pre><code>${escapeHtml(starter.gradleSnippet)}</code></pre>
        </div>
      ` : ''}

      <!-- 6-Dimension Mastery Scorer & Quick Scratchpad -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="app-surface space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-main m-0">Mastery Verification Rating (${lab.id})</h3>
            <span class="text-[11px] font-mono text-muted">3+ all · 4+ implementation</span>
          </div>
          <div class="space-y-2">
            ${MASTERY_DIMENSIONS.map(dim => {
              const cur = ratings[dim] || 0;
              return `
                <div class="flex items-center justify-between app-subtle px-3 py-2">
                  <span class="text-xs font-medium text-main">${dim}</span>
                  <div class="flex gap-1">
                    ${[1, 2, 3, 4, 5].map(s => `
                      <button onclick="setMasteryRating('${lab.id}','${dim}',${s})" class="w-7 h-7 rounded font-mono text-xs font-bold ${cur >= s ? 'btn-primary' : 'btn-secondary'}">${s}</button>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          <label class="mastery-proof-input"><span>PROOF NOTE <small>Required for verification · 20 characters minimum</small></span><textarea rows="3" oninput="setMasteryEvidence('${lab.id}',this.value)" placeholder="What did you implement, test, profile or debug? Add a repo/commit or a measurable result…">${escapeHtml(userState.masteryEvidence?.[lab.id] || '')}</textarea></label>
        </div>

        <div class="app-surface flex flex-col justify-between">
          <div>
            <h3 class="text-sm font-bold text-main m-0 mb-2">Quick Lab Scratchpad & Repo Link</h3>
            <textarea rows="7" oninput="userState.labNotes['${lab.id}']=this.value; saveState();" placeholder="Save your GitHub repo link, benchmark numbers, and notes for ${lab.id}..." class="app-input w-full font-mono text-xs">${escapeHtml(userState.labNotes[lab.id] || '')}</textarea>
          </div>
        </div>
      </div>

      <!-- Prev / Next Lab Navigation -->
      <div class="flex justify-between gap-4">
        ${prevLab ? `<button onclick="openLabDetail('${prevLab.id}')" class="btn btn-secondary"><i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ${prevLab.id}: ${escapeHtml(prevLab.title)}</button>` : '<div></div>'}
        ${nextLab ? `<button onclick="openLabDetail('${nextLab.id}')" class="btn btn-primary">${nextLab.id}: ${escapeHtml(nextLab.title)} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button>` : '<div></div>'}
      </div>
    </div>
  `;
}

// --- 4. MASTERY VERIFICATION FRAMEWORK ---
function renderMasteryMatrixView() {
  const ratedLabs = CURRICULUM_LABS.filter(l => MASTERY_DIMENSIONS.some(d => (userState.masteryRatings[l.id] || {})[d]));
  const readyLabs = CURRICULUM_LABS.filter(l => {
    const r=userState.masteryRatings[l.id] || {};
    return MASTERY_DIMENSIONS.every(d => (r[d] || 0) >= 3) && (r.Implementation || 0) >= 4 && (userState.masteryEvidence?.[l.id] || '').trim().length >= 20;
  });
  const evidenceCount = CURRICULUM_LABS.filter(l => (userState.masteryEvidence?.[l.id] || '').trim().length >= 20).length;
  const rubrics = [
    ['Conceptual','Explain the mechanism, lifecycle and trade-offs without reading notes.','Teach it from first principles.'],
    ['Implementation','Build the lab independently with clear boundaries and production-minded code.','A maintainable implementation with deliberate trade-offs.'],
    ['Edge Cases','Identify failure paths, cancellation, process death, concurrency and invalid input.','A systematic edge-case matrix with verified behavior.'],
    ['Testing','Choose meaningful unit, integration and UI tests; verify failure paths.','Reliable tests that protect behavior and regressions.'],
    ['Performance','Measure before optimizing; use the right profiler and representative workload.','Repeatable measurements and justified improvements.'],
    ['Debugging','Reproduce, isolate, inspect evidence and identify the root cause.','A repeatable diagnosis backed by traces/logs/tests.']
  ];
  return `
    <div class="mastery-hub max-w-6xl mx-auto space-y-6">
      <header class="mastery-hero"><div><span class="mastery-kicker"><i data-lucide="badge-check"></i> ENGINEERING PROOF SYSTEM</span><h1>4. Mastery Verification <em>Framework</em></h1><p>Progress says you completed the lab. Mastery says you can reproduce the result, explain the decisions and defend the implementation.</p></div><div class="mastery-hero-mark"><strong>${readyLabs.length}<small>/${CURRICULUM_LABS.length}</small></strong><span>VERIFIED LABS</span></div></header>
      <section class="mastery-stats"><div><span>LABS RATED</span><strong>${ratedLabs.length}<small> / ${CURRICULUM_LABS.length}</small></strong></div><div><span>PROOF NOTES</span><strong>${evidenceCount}<small> / ${CURRICULUM_LABS.length}</small></strong></div><div><span>READY TO ADVANCE</span><strong>${readyLabs.length}<small> / ${CURRICULUM_LABS.length}</small></strong></div></section>
      <section class="mastery-gate"><div class="mastery-gate-icon"><i data-lucide="lock-keyhole"></i></div><div><span class="mastery-kicker">THE ADVANCEMENT GATE</span><h2>What counts as verified?</h2><p>A lab is marked <b>Ready to Advance</b> only when all six dimensions are rated at least 3/5, Implementation is at least 4/5, and you record a concrete proof note (20+ characters) describing what you built, tested or measured.</p></div><div class="mastery-gate-rule"><b>3+</b><span>ALL DIMENSIONS</span><b>4+</b><span>IMPLEMENTATION</span><b>20+</b><span>PROOF CHARACTERS</span></div></section>
      <section class="mastery-rubric-section"><div class="mastery-section-heading"><div><span class="mastery-kicker">CALIBRATION GUIDE</span><h2>Score the evidence, not the effort.</h2></div><p>Use these anchors consistently. A score of 5 is exceptional—not the default target.</p></div><div class="mastery-rubric-grid">${rubrics.map((r,i)=>`<article class="mastery-rubric-card"><div class="mastery-rubric-top"><span>0${i+1}</span><i data-lucide="${['brain','code-2','git-branch','test-tube-2','activity','search-check'][i]}"></i></div><h3>${r[0]}</h3><div class="mastery-level"><b>3 · Competent</b><p>${r[1]}</p></div><div class="mastery-level mastery-level-high"><b>5 · Mastery</b><p>${r[2]}</p></div></article>`).join('')}</div></section>
      <section class="mastery-matrix-section"><div class="mastery-section-heading"><div><span class="mastery-kicker">YOUR CURRICULUM</span><h2>Verification matrix</h2></div><span class="mastery-matrix-hint">Select a lab to add ratings and evidence.</span></div><div class="mastery-table-wrap"><table class="mastery-table"><thead><tr><th>LAB</th>${MASTERY_DIMENSIONS.map(d=>`<th>${d}</th>`).join('')}<th>PROOF</th><th>GATE</th></tr></thead><tbody>${CURRICULUM_LABS.map(lab=>{const r=userState.masteryRatings[lab.id]||{};const evidence=(userState.masteryEvidence?.[lab.id]||'').trim();const pass=MASTERY_DIMENSIONS.every(d=>(r[d]||0)>=3)&&(r.Implementation||0)>=4&&evidence.length>=20;return `<tr onclick="openLabDetail('${lab.id}')"><td><b>${lab.id}</b><span>${escapeHtml(lab.title)}</span></td>${MASTERY_DIMENSIONS.map(d=>`<td><span class="mastery-score ${r[d]>=4?'is-strong':r[d]>=3?'is-pass':''}">${r[d]?r[d]+'/5':'—'}</span></td>`).join('')}<td><span class="mastery-proof-state ${evidence.length>=20?'has-proof':''}">${evidence.length>=20?'Recorded':'Missing'}</span></td><td>${pass?'<span class="mastery-gate-state is-ready">Verified</span>':'<span class="mastery-gate-state">In progress</span>'}</td></tr>`}).join('')}</tbody></table></div></section>
      <aside class="mastery-reminder"><i data-lucide="clipboard-check"></i><div><b>Make verification reproducible.</b><p>For a strong proof note, include the repository or commit, the scenario you tested, the result you observed, and one trade-off you chose. “I understand it” is not evidence.</p></div></aside>
    </div>`;
}

// --- 5. INTERVIEW READINESS MAP (SYSTEM DESIGN + DEEP INTERNALS + HIGH-FREQUENCY FAQ MATRIX) ---
function renderInterviewReadinessView() {
  const query = (userState.interviewQuery || '').trim().toLowerCase();
  const category = userState.interviewCategory || 'all';
  const level = userState.interviewLevel || 'all';
  const status = userState.interviewStatus || 'all';
  const practicedState = userState.interviewPractice || {};
  const questions = INTERVIEW_QUESTION_BANK.filter(q => {
    const haystack = [q.id,q.category,q.level,q.prompt,q.answer.join(' '),q.follow,q.signals,q.traps].join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (category === 'all' || q.category === category) && (level === 'all' || q.level === level) && (status === 'all' || (status === 'practiced' ? !!practicedState[q.id] : !practicedState[q.id]));
  });
  const practiced = userState.interviewPractice || {};
  const practicedCount = INTERVIEW_QUESTION_BANK.filter(q => practiced[q.id]).length;
  const categories = [...new Set(INTERVIEW_QUESTION_BANK.map(q => q.category))];
  const designs = [...DEEP_INTERVIEW_BLUEPRINTS];
  const totalQuestions = INTERVIEW_QUESTION_BANK.length;
  return `
    <div class="interview-hub max-w-6xl mx-auto space-y-6">
      <header class="interview-hero">
        <div><span class="interview-kicker"><i data-lucide="briefcase-business"></i> ENGINEERING INTERVIEW WORKBENCH</span>
          <h1>Interview readiness is <em>demonstrated, not memorized.</em></h1>
          <p>A practical bank of Android/Kotlin questions, production scenarios and system-design exercises. Practice explaining trade-offs, debugging unfamiliar behavior and defending decisions—not reciting definitions.</p>
          <div class="interview-hero-stats"><span><b>${totalQuestions}</b> structured questions</span><span><b>${designs.length}</b> deep design prompts</span><span><b>${practicedCount}/${totalQuestions}</b> practiced</span></div>
        </div>
        <button onclick="navigateSection('flashcards')" class="btn btn-primary"><i data-lucide="layers-3"></i> Active recall deck (${flashcardsDeck.length})</button>
      </header>

      <section class="interview-principle-grid">
        <article><span>01 · CLARIFY</span><b>Ask before designing</b><p>Users, scale, latency, offline needs, data sensitivity and failure expectations.</p></article>
        <article><span>02 · REASON</span><b>Explain the mechanism</b><p>Walk through lifecycle, ownership, concurrency, consistency and platform constraints.</p></article>
        <article><span>03 · TRADE OFF</span><b>Compare alternatives</b><p>State why your choice fits, what it costs, and when you would choose differently.</p></article>
        <article><span>04 · VERIFY</span><b>Prove the behavior</b><p>Describe tests, traces, metrics and failure cases that would validate the design.</p></article>
      </section>


      <section class="interview-design-section">
        <div class="interview-section-heading"><div><span class="interview-kicker">SYSTEM DESIGN & DEEP TECHNICAL ROUNDS</span><h2>Design prompts from real mobile product constraints</h2><p>Use a whiteboard or a README. State assumptions, sketch components and data flow, then walk through failures and trade-offs.</p></div><span class="interview-count">${designs.length} prompts</span></div>
        <div class="interview-design-grid">
          ${designs.map((item,index)=>`<details class="interview-design-card"><summary><span class="interview-design-number">${String(index+1).padStart(2,'0')}</span><span class="interview-design-copy"><small>${escapeHtml(item.type)} · ${escapeHtml(item.phase)}</small><b>${escapeHtml(item.question)}</b><em>${escapeHtml(item.labTitle)}</em></span><i data-lucide="chevron-down"></i></summary><div class="interview-design-answer"><span>ANSWER FRAMEWORK</span><pre>${escapeHtml(item.hint)}</pre><button class="btn btn-secondary" onclick="event.preventDefault();openLabDetail('${item.labId}')">Review ${item.labId} <i data-lucide="arrow-up-right"></i></button></div></details>`).join('')}
        </div>
      </section>

      <section class="interview-bank-section">
        <div class="interview-section-heading"><div><span class="interview-kicker">TECHNICAL SCREEN & ONSITE QUESTION BANK</span><h2>Practice the questions behind the job</h2><p>Each prompt includes the answer signals an interviewer is looking for, follow-up pressure tests, common traps and the curriculum topics to revisit.</p></div><span class="interview-count">${questions.length} / ${totalQuestions} shown</span></div>
        <div class="interview-filter-bar">
          <label class="interview-search"><i data-lucide="search"></i><input type="search" value="${escapeHtml(userState.interviewQuery || '')}" placeholder="Search question, concept or follow-up…" oninput="updateInterviewQuery(this.value)"></label>
          <select aria-label="Filter by category" onchange="userState.interviewCategory=this.value;renderMainContent()"><option value="all">All categories</option>${categories.map(c=>`<option value="${escapeHtml(c)}" ${category===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}</select>
          <select aria-label="Filter by level" onchange="userState.interviewLevel=this.value;renderMainContent()"><option value="all">All levels</option>${['Core','Intermediate','Advanced'].map(l=>`<option value="${l}" ${level===l?'selected':''}>${l}</option>`).join('')}</select>
          <select aria-label="Filter by practice status" onchange="userState.interviewStatus=this.value;renderMainContent()"><option value="all" ${status==='all'?'selected':''}>All practice states</option><option value="unpracticed" ${status==='unpracticed'?'selected':''}>Not practiced</option><option value="practiced" ${status==='practiced'?'selected':''}>Practiced</option></select>
          <button class="btn btn-secondary" onclick="userState.interviewQuery='';userState.interviewCategory='all';userState.interviewLevel='all';userState.interviewStatus='all';renderMainContent()">Reset</button>
        </div>
        <div class="interview-bank-grid">
          ${questions.map(q=>`<article class="interview-question-card ${practiced[q.id]?'is-practiced':''}">
            <div class="interview-question-meta"><span>${escapeHtml(q.category)}</span><span class="interview-level level-${q.level.toLowerCase()}">${escapeHtml(q.level)}</span><span>${q.id}</span></div>
            <h3>${escapeHtml(q.prompt)}</h3>
            <details class="interview-answer-details"><summary><i data-lucide="book-open-check"></i> Reveal answer framework <i data-lucide="chevron-down"></i></summary><ul>${q.answer.map(a=>`<li>${escapeHtml(a)}</li>`).join('')}</ul>
              <div class="interview-followup"><b>FOLLOW-UP PRESSURE TEST</b><p>${escapeHtml(q.follow)}</p></div>
              <div class="interview-signals"><b>WHAT A STRONG ANSWER DEMONSTRATES</b><p>${escapeHtml(q.signals)}</p></div>
              <div class="interview-traps"><b>COMMON WEAK ANSWER</b><p>${escapeHtml(q.traps)}</p></div>
              <div class="interview-related"><b>REVISIT</b>${q.labs.map(id=>`<button onclick="openLearningReference('${id}')">${id}</button>`).join('')}</div>
            </details>
            <button class="interview-practice-toggle" onclick="toggleInterviewPracticed('${q.id}')"><i data-lucide="${practiced[q.id]?'check-circle-2':'circle'}"></i>${practiced[q.id]?'Practiced':'Mark practiced'}</button>
          </article>`).join('') || '<div class="app-surface p-6 text-secondary">No questions match these filters. Try a broader search.</div>'}
        </div>
      </section>
      <aside class="interview-method-note"><i data-lucide="notebook-pen"></i><div><b>How to use this bank</b><p>Answer out loud in 2–4 minutes, draw the flow where useful, then open the answer framework and identify what you missed. Mark a question practiced only after you can answer without reading. For senior rounds, add constraints and defend trade-offs rather than aiming for one “correct” architecture.</p></div></aside>
    </div>`;
}

// --- 6. RESOURCE LIBRARY & FINAL WORD ---
function renderResourcesView() {
  const groups = [
    { id:'android', title:'Android platform & Jetpack', subtitle:'Start with Google’s source of truth for platform APIs and Android app development.', tone:'green', icon:'smartphone', items:[
      ['Android Developers','Official platform documentation, guides, API references and release guidance.','Official','https://developer.android.com/'],
      ['Android training: fundamentals','Structured guides for app fundamentals, activities, background work and data.','Official guide','https://developer.android.com/courses'],
      ['Android Jetpack','Official library catalog covering Lifecycle, Room, WorkManager, Navigation and more.','Official','https://developer.android.com/jetpack'],
      ['Android Architecture recommendations','Practical guidance for UI/data layers, state, repositories, testing and performance.','Architecture','https://developer.android.com/topic/architecture/recommendations'],
      ['Android Developers samples','Production-oriented samples, including Now in Android.','Source code','https://github.com/android']
    ]},
    { id:'kotlin', title:'Kotlin language & concurrency', subtitle:'Language semantics first; then concurrency, cancellation, Flow and testing.', tone:'violet', icon:'code-2', items:[
      ['Kotlin documentation','Official language tour, language reference, standard library and tooling docs.','Official','https://kotlinlang.org/docs/'],
      ['Kotlin coding conventions','Official style and source-organization guidance for maintainable Kotlin code.','Style guide','https://kotlinlang.org/docs/coding-conventions.html'],
      ['Kotlin Coroutines guide','JetBrains guide to structured concurrency, dispatchers, cancellation, Flow and channels.','Official','https://kotlinlang.org/docs/coroutines-guide.html'],
      ['kotlinx.coroutines','The coroutine library source, issue tracker and implementation details.','Source code','https://github.com/Kotlin/kotlinx.coroutines'],
      ['Kotlin API reference','Reference for Kotlin standard-library APIs.','API reference','https://kotlinlang.org/api/latest/jvm/stdlib/']
    ]},
    { id:'compose', title:'Compose, UI architecture & quality', subtitle:'Learn the declarative model, state, recomposition, accessibility and adaptive UI.', tone:'blue', icon:'layers-3', items:[
      ['Jetpack Compose documentation','Official setup, concepts, APIs, architecture and migration material.','Official','https://developer.android.com/jetpack/compose/documentation'],
      ['Compose pathways','Guided learning paths and hands-on codelabs from Android Developers.','Codelabs','https://developer.android.com/courses/pathways/compose'],
      ['Compose performance','Official advice for stability, recomposition, tracing and rendering performance.','Performance','https://developer.android.com/develop/ui/compose/performance'],
      ['Now in Android','Google’s open-source sample app demonstrating modern Android practices in a real project.','Reference app','https://github.com/android/nowinandroid'],
      ['Material 3 for Compose','Design system components, theming and adaptive UI guidance.','Design system','https://developer.android.com/develop/ui/compose/designsystems/material3']
    ]},
    { id:'testing', title:'Testing, performance & debugging', subtitle:'Move from “it works” to repeatable evidence that it works under realistic conditions.', tone:'amber', icon:'gauge', items:[
      ['Test your app on Android','Official testing strategy, local and instrumented tests, UI tests and test doubles.','Official','https://developer.android.com/training/testing'],
      ['Macrobenchmark','Measure startup, scrolling and user journeys on target devices.','Benchmarking','https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview'],
      ['Baseline Profiles','Understand profile-guided optimization and verify improvements with benchmarks.','Performance','https://developer.android.com/topic/performance/baselineprofiles/overview'],
      ['Perfetto','System-wide tracing to investigate scheduling, rendering and performance issues.','Diagnostic tool','https://perfetto.dev/'],
      ['LeakCanary','Well-known open-source memory leak detection library for Android.','Open source','https://github.com/square/leakcanary'],
      ['Turbine','Cash App’s testing library for kotlinx.coroutines Flow.','Open source','https://github.com/cashapp/turbine']
    ]},
    { id:'kmp', title:'Kotlin Multiplatform', subtitle:'Official guidance for shared logic, platform boundaries and Compose Multiplatform.', tone:'teal', icon:'workflow', items:[
      ['Kotlin Multiplatform docs','Official KMP concepts, project setup, source sets and platform integration.','Official','https://kotlinlang.org/docs/multiplatform.html'],
      ['KMP project structure','Understand source sets, targets and dependency sharing.','Architecture','https://kotlinlang.org/docs/multiplatform/multiplatform-discover-project.html'],
      ['Compose Multiplatform','JetBrains documentation for sharing UI across supported platforms.','Official','https://www.jetbrains.com/compose-multiplatform/'],
      ['Kotlin Multiplatform samples','Example projects maintained by JetBrains and the community.','Examples','https://github.com/Kotlin/kmp-samples']
    ]},
    { id:'engineering', title:'Engineering depth & security', subtitle:'Broaden beyond APIs: architecture trade-offs, secure storage and system design.', tone:'rose', icon:'shield-check', items:[
      ['OWASP MASVS','Industry reference for mobile application security verification requirements.','Security standard','https://mas.owasp.org/MASVS/'],
      ['Android security best practices','Official guidance for permissions, data, networking and secure app design.','Official','https://developer.android.com/privacy-and-security/security-best-practices'],
      ['Gradle user manual','Build lifecycle, dependency management, plugins and performance.','Official','https://docs.gradle.org/current/userguide/userguide.html'],
      ['Designing Data-Intensive Applications','Martin Kleppmann’s reference for storage, replication, partitioning and distributed systems.','Book','https://dataintensive.net/'],
      ['Kotlin in Action, 2nd Edition','A deeper treatment of Kotlin language design and idiomatic usage.','Book','https://www.manning.com/books/kotlin-in-action-second-edition']
    ]}
  ];
  groups.push({ id:'ai', title:'AI & on-device machine learning', subtitle:'Choose the right model, integrate safely, ground outputs and measure quality before release.', tone:'violet', icon:'brain-circuit', items:[
    ['Android AI & ML','Android platform guidance for AI features and on-device ML.','Official','https://developer.android.com/ai'],
    ['LiteRT','Google runtime for deploying on-device machine-learning models.','Official','https://ai.google.dev/edge/litert'],
    ['ML Kit','Ready-to-use mobile ML capabilities including text recognition and image labeling.','Official','https://developers.google.com/ml-kit'],
    ['Gemini API documentation','Model capabilities, generation, streaming and API integration.','API docs','https://ai.google.dev/gemini-api/docs'],
    ['Structured output','Constrain model responses to schemas, then validate domain rules independently.','API docs','https://ai.google.dev/gemini-api/docs/structured-output'],
    ['Function calling','Connect model proposals to allowlisted application tools with explicit authorization.','API docs','https://ai.google.dev/gemini-api/docs/function-calling'],
    ['OWASP Top 10 for LLM Applications','Threat categories and mitigations for prompt injection, data leakage and unsafe tool use.','Security','https://genai.owasp.org/llm-top-10/'],
    ['Vertex AI RAG overview','Reference architecture for retrieval-augmented generation.','Architecture','https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview']
  ]});
  const total = groups.reduce((n,g)=>n+g.items.length,0);
  return `
    <div class="resource-hub max-w-6xl mx-auto space-y-6">
      <header class="resource-hero">
        <div class="resource-hero-copy"><span class="resource-kicker"><i data-lucide="library"></i> THE ENGINEERING LIBRARY</span>
          <h1>Learn from <em>the source.</em></h1>
          <p>A curated map of official documentation, implementation references, diagnostic tools and books. Follow the links when a lab needs more depth—not as a checklist to read all at once.</p>
          <div class="resource-hero-meta"><span><b>${total}</b> curated references</span><span><b>${groups.length}</b> knowledge domains</span><span>Official-first selection</span></div>
        </div>
        <div class="resource-hero-art"><div class="resource-orbit orbit-one"></div><div class="resource-orbit orbit-two"></div><div class="resource-book-stack"><i data-lucide="book-open"></i><span>FIELD<br>GUIDE</span></div><b>01 — 06</b></div>
      </header>
      <div class="resource-toolbar"><div><span class="resource-kicker">EXPLORE THE LIBRARY</span><h2>Choose your next rabbit hole.</h2></div><label class="resource-search"><i data-lucide="search"></i><input id="resource-search-input" type="search" placeholder="Search docs, tools, topics…" oninput="filterResourceCards(this.value)"></label></div>
      <nav class="resource-category-nav">${groups.map(g=>`<a href="#resource-${g.id}" class="resource-category-chip"><i data-lucide="${g.icon}"></i>${g.title}</a>`).join('')}</nav>
      ${groups.map((g,i)=>`
        <section id="resource-${g.id}" class="resource-group resource-tone-${g.tone}">
          <div class="resource-group-heading"><div class="resource-group-icon"><i data-lucide="${g.icon}"></i></div><div><span class="resource-kicker">DOMAIN 0${i+1} · ${String(g.items.length).padStart(2,'0')} REFERENCES</span><h2>${g.title}</h2><p>${g.subtitle}</p></div><span class="resource-group-index">0${i+1}</span></div>
          <div class="resource-card-grid">${g.items.map((it,j)=>`<a class="resource-card" href="${it[3]}" target="_blank" rel="noopener noreferrer" data-resource-search="${escapeHtml((it[0]+' '+it[1]+' '+it[2]+' '+g.title).toLowerCase())}"><span class="resource-card-top"><span class="resource-card-index">${String(j+1).padStart(2,'0')}</span><span class="resource-type">${it[2]}</span><i data-lucide="arrow-up-right"></i></span><strong>${it[0]}</strong><p>${it[1]}</p><span class="resource-domain">${it[3].replace(/^https?:\/\//,'').replace(/\/$/,'')}</span></a>`).join('')}</div>
        </section>`).join('')}
      <aside class="resource-reading-note"><i data-lucide="lightbulb"></i><div><strong>How to use this library</strong><p>Start with the official guide linked from your current Lab. Use source repositories to inspect real implementation decisions, and use books for the underlying engineering concepts. Prefer a small number of deeply studied references over collecting links.</p></div></aside>
    </div>`;
}

function filterResourceCards(query) {
  const q = (query || '').trim().toLowerCase();
  document.querySelectorAll('.resource-card').forEach(card => {
    card.hidden = !!q && !card.dataset.resourceSearch.includes(q);
  });
  document.querySelectorAll('.resource-group').forEach(group => {
    group.hidden = !!q && !group.querySelector('.resource-card:not([hidden])');
  });
}

// --- 3D INTERVIEW & INTERNALS FLASHCARDS VIEW ---
function renderFlashcardsView() {
  const deck = getFilteredFlashcards();
  const idx = Math.min(userState.fcCurrentIndex, Math.max(0, deck.length - 1));
  const card = deck[idx];
  const masteredCount = flashcardsDeck.filter(c => userState.flashcardState[c.id]?.confidence === 'mastered').length;
  const reviewCount = flashcardsDeck.filter(c => userState.flashcardState[c.id]?.confidence === 'review').length;
  const unseenCount = flashcardsDeck.length - masteredCount - reviewCount;
  const progress = deck.length ? Math.round(((idx + 1) / deck.length) * 100) : 0;
  return `
    <div class="flashcard-hub max-w-5xl mx-auto space-y-6">
      <header class="flashcard-hero"><div><span class="flashcard-kicker"><i data-lucide="brain-circuit"></i> ACTIVE RECALL STUDIO</span><h1>Make knowledge <em>retrievable.</em></h1><p>Don't reread the answer. Try to explain the mechanism, predict the failure, and defend your design before you reveal the reference.</p><div class="flashcard-hero-meta"><span><b>${flashcardsDeck.length}</b> prompts</span><span><b>${UNIFIED_PHASES.length}</b> learning phases</span><span>Spaced practice by confidence</span></div></div><div class="flashcard-hero-symbol"><i data-lucide="layers-3"></i><span>RECALL<br>→ REASON<br>→ REPEAT</span></div></header>
      <section class="flashcard-stats"><div class="fc-stat fc-stat-total"><span>IN THIS DECK</span><strong>${flashcardsDeck.length}</strong><small>Questions to challenge your understanding</small></div><div class="fc-stat fc-stat-mastered"><span>MASTERED</span><strong>${masteredCount}</strong><small>Can explain without help</small></div><div class="fc-stat fc-stat-review"><span>NEEDS REVIEW</span><strong>${reviewCount}</strong><small>Revisit and strengthen</small></div><div class="fc-stat fc-stat-new"><span>NOT RATED</span><strong>${unseenCount}</strong><small>Still to assess</small></div></section>
      <section class="flashcard-workspace">
        <aside class="flashcard-controls"><div class="flashcard-panel-heading"><span class="flashcard-kicker">BUILD A SESSION</span><h2>Choose your focus.</h2></div>
          <label>PHASE<select onchange="userState.fcPhaseFilter=this.value; userState.fcCurrentIndex=0; userState.fcIsFlipped=false; renderMainContent();"><option value="all" ${userState.fcPhaseFilter==='all'?'selected':''}>All phases</option><option value="Domain Tracks" ${userState.fcPhaseFilter==='Domain Tracks'?'selected':''}>Domain track questions</option>${UNIFIED_PHASES.map(p=>`<option value="${p.id}" ${userState.fcPhaseFilter===p.id?'selected':''}>${p.id}: ${p.title}</option>`).join('')}</select></label>
          <label>QUESTION TYPE<select onchange="userState.fcTypeFilter=this.value; userState.fcCurrentIndex=0; userState.fcIsFlipped=false; renderMainContent();"><option value="all" ${userState.fcTypeFilter==='all'?'selected':''}>All categories</option><option value="Deep Senior/Staff Internals" ${userState.fcTypeFilter==='Deep Senior/Staff Internals'?'selected':''}>Deep internals</option><option value="High-Frequency Core FAQ" ${userState.fcTypeFilter==='High-Frequency Core FAQ'?'selected':''}>Core FAQs</option><option value="System Design" ${userState.fcTypeFilter==='System Design'?'selected':''}>System design</option></select></label>
          <div class="flashcard-filter-label">CONFIDENCE FILTER</div><div class="flashcard-filter-stack">${[['all','Everything'],['unrated','Not rated'],['review','Needs review'],['mastered','Mastered']].map(([v,l])=>`<button class="${userState.fcConfidenceFilter===v?'active':''}" onclick="userState.fcConfidenceFilter='${v}';userState.fcCurrentIndex=0;userState.fcIsFlipped=false;renderMainContent();">${l}<i data-lucide="${userState.fcConfidenceFilter===v?'check-circle-2':'circle'}"></i></button>`).join('')}</div>
          <button class="flashcard-shuffle" onclick="flashcardsDeck.sort(()=>Math.random()-.5);userState.fcCurrentIndex=0;userState.fcIsFlipped=false;renderMainContent();"><i data-lucide="shuffle"></i> Shuffle this deck</button>
          <div class="flashcard-session-tip"><i data-lucide="lightbulb"></i><p><b>Retrieval rule</b><br>Spend 30–90 seconds thinking before revealing. Rate honestly—not based on familiarity.</p></div>
        </aside>
        <main class="flashcard-stage">
          ${!card?`<div class="flashcard-empty"><i data-lucide="filter-x"></i><h2>No cards in this session</h2><p>Try a different phase or confidence filter.</p><button class="btn btn-primary" onclick="userState.fcPhaseFilter='all';userState.fcTypeFilter='all';userState.fcConfidenceFilter='all';userState.fcCurrentIndex=0;renderMainContent();">Reset filters</button></div>`:`
            <div class="flashcard-stage-top"><div><span class="flashcard-kicker">${escapeHtml(card.phase)} · ${escapeHtml(card.type)}</span><strong>${escapeHtml(card.labId)} <span>/</span> ${escapeHtml(card.labTitle)}</strong></div><span class="flashcard-counter">${String(idx+1).padStart(2,'0')} <i>/</i> ${String(deck.length).padStart(2,'0')}</span></div>
            <div class="flashcard-progress-track"><span style="width:${progress}%"></span></div>
            <button type="button" aria-label="Flip flashcard" onclick="userState.fcIsFlipped=!userState.fcIsFlipped;renderMainContent();" class="flashcard-card ${userState.fcIsFlipped?'is-flipped':''}">
              <span class="flashcard-card-decoration">${userState.fcIsFlipped?'REFERENCE NOTES':'THINK IT THROUGH'}</span><span class="flashcard-card-label"><i data-lucide="${userState.fcIsFlipped?'book-open-check':'message-circle-question'}"></i> ${userState.fcIsFlipped?'REFERENCE':'CHALLENGE'}</span>
              <span class="flashcard-card-content">${userState.fcIsFlipped?escapeHtml(card.hint):escapeHtml(card.question)}</span><span class="flashcard-card-foot">${userState.fcIsFlipped?'Review the reasoning, then rate your recall':'Think first, then reveal the reference'} <i data-lucide="${userState.fcIsFlipped?'rotate-ccw':'mouse-pointer-click'}"></i></span>
            </button>
            <div class="flashcard-actions"><button class="flashcard-nav-button" onclick="stepFlashcard(-1)" ${deck.length<=1?'disabled':''}><i data-lucide="arrow-left"></i> Previous</button><button class="flashcard-reveal-button" onclick="userState.fcIsFlipped=!userState.fcIsFlipped;renderMainContent();"><i data-lucide="${userState.fcIsFlipped?'rotate-ccw':'eye'}"></i>${userState.fcIsFlipped?'Back to question':'Reveal reference'}</button><button class="flashcard-nav-button" onclick="stepFlashcard(1)" ${deck.length<=1?'disabled':''}>Next <i data-lucide="arrow-right"></i></button></div>
            ${userState.fcIsFlipped?`<div class="flashcard-rating"><span>How well could you retrieve it?</span><button class="fc-rate-review" onclick="rateFlashcard('${card.id}','review')"><i data-lucide="refresh-cw"></i><span><b>Not yet</b><small>Needs another pass</small></span></button><button class="fc-rate-mastered" onclick="rateFlashcard('${card.id}','mastered')"><i data-lucide="check-circle-2"></i><span><b>Got it</b><small>Could explain unaided</small></span></button></div>`:`<div class="flashcard-before-reveal"><i data-lucide="corner-down-right"></i> Try to explain it out loud before revealing the reference answer.</div>`}
          `}
        </main>
      </section>
    </div>`;
}

// --- GLOBAL SEARCH & MODAL UTILITIES ---
function renderSearchResultsView(query) {
  const q = query.toLowerCase();
  const matches = CURRICULUM_LABS.filter(l => l.id.toLowerCase().includes(q) || l.title.toLowerCase().includes(q) || l.goal.toLowerCase().includes(q) || l.concepts.some(c=>c.toLowerCase().includes(q)) || (l.deepQuestions||[]).some(x=>x.toLowerCase().includes(q)) || (l.commonFaqs||[]).some(x=>x.toLowerCase().includes(q)));
  const domainMatches = DOMAIN_TRACKS.flatMap(t=>t.modules.flatMap(m=>m.labs.map(l=>({...l,track:t, module:m.title})))).filter(l=>[l.id,l.title,l.problem,l.importance,l.learn.join(' '),l.revisit.join(' '),l.track.title].join(' ').toLowerCase().includes(q));
  const scenarioMatches = MOBILE_SCENARIOS.filter(s=>[s.id,s.title,s.group,s.prompt,s.task,s.learn.join(' '),s.review.join(' '),s.domains.join(' ')].join(' ').toLowerCase().includes(q));
  const interviewMatches = INTERVIEW_QUESTION_BANK.filter(item=>[item.id,item.category,item.prompt,item.answer.join(' '),item.follow].join(' ').toLowerCase().includes(q));
  return `
    <div class="max-w-6xl mx-auto space-y-5">
      <div class="app-surface p-4 flex items-center justify-between"><span class="text-sm font-bold text-main">Found ${matches.length+domainMatches.length+scenarioMatches.length+interviewMatches.length} results for “${escapeHtml(query)}”</span><button onclick="clearGlobalSearch()" class="btn btn-secondary py-1 px-2.5 text-xs">Clear Search</button></div>
      ${matches.length?`<section><h2 class="text-base font-bold mb-3">Core Engineering Labs <span class="text-xs text-muted">${matches.length}</span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${matches.map(l=>`<div onclick="clearGlobalSearch();openLabDetail('${l.id}')" class="app-surface app-surface-interactive cursor-pointer p-4"><span class="badge badge-primary font-mono">${l.id} · ${l.phase}</span><div class="text-sm font-bold text-main mt-2">${escapeHtml(l.title)}</div><p class="text-xs text-secondary mt-1">${escapeHtml(l.goal)}</p></div>`).join('')}</div></section>`:''}
      ${domainMatches.length?`<section><h2 class="text-base font-bold mb-3">Domain Labs <span class="text-xs text-muted">${domainMatches.length}</span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${domainMatches.map(l=>`<button onclick="clearGlobalSearch();openLearningReference('${l.id}')" class="app-surface app-surface-interactive text-left p-4"><span class="badge">${escapeHtml(l.track.short||l.track.title)} · ${escapeHtml(l.id)}</span><div class="text-sm font-bold text-main mt-2">${escapeHtml(l.title)}</div><p class="text-xs text-secondary mt-1">${escapeHtml(l.problem)}</p></button>`).join('')}</div></section>`:''}
      ${scenarioMatches.length?`<section><h2 class="text-base font-bold mb-3">Failure Scenarios <span class="text-xs text-muted">${scenarioMatches.length}</span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${scenarioMatches.map(s=>`<button onclick="userState.scenarioFilter='All';clearGlobalSearch();navigateSection('scenarios')" class="app-surface app-surface-interactive text-left p-4"><span class="badge">${escapeHtml(s.id)} · ${escapeHtml(s.group)}</span><div class="text-sm font-bold text-main mt-2">${escapeHtml(s.title)}</div><p class="text-xs text-secondary mt-1">${escapeHtml(s.prompt)}</p></button>`).join('')}</div></section>`:''}
      ${interviewMatches.length?`<section><h2 class="text-base font-bold mb-3">Interview Questions <span class="text-xs text-muted">${interviewMatches.length}</span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${interviewMatches.slice(0,12).map(item=>`<button onclick="userState.interviewQuery='';userState.interviewCategory='all';clearGlobalSearch();navigateSection('interview')" class="app-surface app-surface-interactive text-left p-4"><span class="badge">${escapeHtml(item.category)} · ${item.id}</span><div class="text-sm font-bold text-main mt-2">${escapeHtml(item.prompt)}</div></button>`).join('')}</div></section>`:''}
      ${!matches.length&&!domainMatches.length&&!scenarioMatches.length&&!interviewMatches.length?'<div class="app-surface p-8 text-center text-secondary">No matching curriculum items. Try a broader term.</div>':''}
    </div>`;
}
