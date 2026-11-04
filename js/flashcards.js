// js/flashcards.js: Flashcard deck builder and navigation logic.

function buildFlashcardsDeck() {
  const cards = [...DEEP_INTERVIEW_BLUEPRINTS];
  CURRICULUM_LABS.forEach(lab => {
    (lab.deepQuestions || []).forEach((q, idx) => {
      cards.push({
        id: `${lab.id}_DEEP_${idx}`,
        labId: lab.id,
        labTitle: lab.title,
        phase: lab.phase,
        type: 'Deep Senior/Staff Internals',
        question: q,
        hint: `First-Principles Concepts (${lab.id}: ${lab.title}):\n- ` + (lab.concepts || []).join('\n- ')
      });
    });
    (lab.commonFaqs || []).forEach((q, idx) => {
      cards.push({
        id: `${lab.id}_FAQ_${idx}`,
        labId: lab.id,
        labTitle: lab.title,
        phase: lab.phase,
        type: 'High-Frequency Core FAQ',
        question: q,
        hint: `Core Concepts (${lab.id}: ${lab.title}):\n- ` + (lab.concepts || []).join('\n- ')
      });
    });
  });
  INTERVIEW_QUESTION_BANK.forEach(item => {
    const related = CURRICULUM_LABS.find(l => item.labs.includes(l.id));
    cards.push({
      id: `INTERVIEW_${item.id}`,
      labId: related ? related.id : 'LAB 51',
      labTitle: `${item.category} · ${item.level}`,
      phase: related ? related.phase : 'Domain Tracks',
      type: 'Interview Practice',
      question: item.prompt,
      hint: `ANSWER FRAMEWORK\n- ${item.answer.join('\n- ')}\n\nFOLLOW-UP\n${item.follow}\n\nCOMMON TRAP\n${item.traps}`
    });
  });
  flashcardsDeck = cards;
  const badge = document.getElementById('nav-flashcards-count');
  if (badge) badge.textContent = `${cards.length} Qs`;
}

function getFilteredFlashcards() {
  return flashcardsDeck.filter(c => {
    const matchPhase = userState.fcPhaseFilter === 'all' || c.phase === userState.fcPhaseFilter;
    const matchType = userState.fcTypeFilter === 'all' || c.type === userState.fcTypeFilter;
    const conf = userState.flashcardState[c.id]?.confidence || 'unrated';
    const matchConf = userState.fcConfidenceFilter === 'all' || conf === userState.fcConfidenceFilter;
    return matchPhase && matchType && matchConf;
  });
}

function stepFlashcard(delta) {
  const deck = getFilteredFlashcards();
  if (!deck.length) return;
  userState.fcCurrentIndex = (userState.fcCurrentIndex + delta + deck.length) % deck.length;
  userState.fcIsFlipped = false;
  renderMainContent();
}

function rateFlashcard(cardId, confidence) {
  if (!userState.flashcardState[cardId]) userState.flashcardState[cardId] = {};
  userState.flashcardState[cardId].confidence = confidence;
  saveState();
  stepFlashcard(1);
}
