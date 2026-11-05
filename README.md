# PlanDroid — Mobile Engineering Mastery System

> A structured, hands-on learning system for mastering Android Engineering, Kotlin, and Kotlin Multiplatform — from platform fundamentals to production-grade mobile engineering.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Philosophy](#2-project-philosophy)
3. [Learning Objectives](#3-learning-objectives)
4. [Curriculum at a Glance](#4-curriculum-at-a-glance)
5. [Curriculum Architecture](#5-curriculum-architecture)
6. [Core Learning Phases](#6-core-learning-phases)
7. [Core Labs](#7-core-labs)
8. [Capstone Projects](#8-capstone-projects)
9. [Domain Engineering Tracks](#9-domain-engineering-tracks)
10. [Failure Scenario Library](#10-failure-scenario-library)
11. [Interview Readiness Map](#11-interview-readiness-map)
12. [AI-Powered Mobile Engineering](#12-ai-powered-mobile-engineering)
13. [Mastery Verification Framework](#13-mastery-verification-framework)
14. [Flashcards & Active Recall](#14-flashcards--active-recall)
15. [Resource Library](#15-resource-library)
16. [Coverage Map](#16-coverage-map)
17. [Progress Tracking](#17-progress-tracking)
18. [Application Architecture](#18-application-architecture)
19. [Project Structure](#19-project-structure)
20. [Data Model & Content Structure](#20-data-model--content-structure)
21. [State Persistence](#21-state-persistence)
22. [Search & Navigation](#22-search--navigation)
23. [Design System](#23-design-system)
24. [How to Run](#24-how-to-run)
25. [How to Add a New Lab](#25-how-to-add-a-new-lab)
26. [How to Add a New Domain Track](#26-how-to-add-a-new-domain-track)
27. [How to Add a Failure Scenario](#27-how-to-add-a-failure-scenario)
28. [How to Add Interview Questions](#28-how-to-add-interview-questions)
29. [How to Add Flashcards](#29-how-to-add-flashcards)
30. [Testing & Validation](#30-testing--validation)
31. [Learning Workflow](#31-learning-workflow)
32. [Recommended Study Strategy](#32-recommended-study-strategy)
33. [Engineering Principles](#33-engineering-principles)
34. [Limitations & Future Improvements](#34-limitations--future-improvements)

---

# 1. Project Overview

PlanDroid is a personal mobile engineering learning environment designed to develop practical engineering skills rather than simply collect tutorials or documentation.

It provides a connected curriculum covering:

- Android platform engineering.
- Kotlin language mastery.
- Jetpack Compose.
- Android architecture and system design.
- Networking and local persistence.
- Concurrency and asynchronous programming.
- Testing and quality engineering.
- Performance optimization.
- Security and privacy.
- Kotlin Multiplatform.
- AI-powered mobile applications.
- Real-world product and domain engineering.
- Technical interviews and engineering communication.

The system is designed around one central objective:

**Develop the ability to design, implement, debug, test, and maintain production-quality mobile applications.**

PlanDroid is not an Android documentation replacement. It is a structured environment that organizes the learning process, provides implementation exercises, connects concepts to realistic situations, and verifies whether the learner can apply what they have studied.

---

# 2. Project Philosophy

PlanDroid follows several engineering and learning principles.

## 2.1 Learn by Building

Every important concept should eventually lead to implementation.

Reading about a Service, for example, is not enough. The learner should understand:

- Why the component exists.
- What problem it solves.
- How Android manages its lifecycle.
- What restrictions apply.
- What happens when the process is killed.
- How to test its behavior.
- When another solution would be more appropriate.

## 2.2 Understand Before Abstracting

Start with the underlying platform behavior before relying on higher-level libraries.

Examples:

- Understand SQLite before relying entirely on Room.
- Understand threads and executors before relying entirely on Coroutines.
- Understand Android lifecycle behavior before relying entirely on lifecycle-aware APIs.
- Understand HTTP and caching before relying entirely on Retrofit or networking abstractions.
- Understand state and recomposition before relying entirely on Compose architecture patterns.

The objective is not to avoid modern libraries. It is to understand what they abstract.

## 2.3 Engineering Is More Than Happy Paths

A production application must handle:

- Network failures.
- Process death.
- Lifecycle changes.
- Invalid user input.
- Slow devices.
- Limited memory.
- Storage limitations.
- Permission denial.
- Duplicate requests.
- Data inconsistency.
- Security threats.
- API changes.
- Unexpected backend responses.
- Application upgrades.

PlanDroid includes dedicated failure scenarios and domain exercises to develop this mindset.

## 2.4 Connect Knowledge Across the System

A concept should not exist in isolation.

For example, Coroutines are connected to:

- Kotlin fundamentals.
- Android lifecycle.
- Repository design.
- Networking.
- Database operations.
- UI state management.
- Testing.
- Performance.
- System design.
- Interview preparation.

This connected approach helps the learner understand how individual concepts interact inside a real application.

---

# 3. Learning Objectives

By completing the curriculum, the learner should be able to:

### Kotlin Engineering
- Write idiomatic Kotlin.
- Understand the type system and null safety.
- Use generics, variance, delegation, and higher-order functions.
- Understand JVM behavior and Java interoperability.
- Design appropriate abstractions.
- Use Coroutines and Flow correctly.

### Android Engineering
- Understand the Android application lifecycle.
- Work with Activities, Services, BroadcastReceivers, and ContentProviders.
- Handle background execution restrictions.
- Build applications using modern Android APIs.
- Manage permissions and system integrations.
- Diagnose lifecycle and process-related bugs.

### UI Engineering
- Build interfaces using Jetpack Compose.
- Understand recomposition and state management.
- Design reusable UI components.
- Handle navigation and adaptive layouts.
- Improve UI performance and accessibility.

### Architecture
- Design maintainable application structures.
- Separate presentation, domain, and data responsibilities.
- Apply dependency inversion.
- Manage application state.
- Design repository and use-case boundaries.
- Make architecture decisions based on actual requirements.

### Quality Engineering
- Write unit and integration tests.
- Test ViewModels and Flows.
- Test database and networking behavior.
- Diagnose performance problems.
- Understand release quality and CI/CD.

### Multiplatform Engineering
- Understand Kotlin Multiplatform architecture.
- Separate shared and platform-specific responsibilities.
- Use `expect` and `actual` appropriately.
- Handle platform-specific APIs.
- Build shared business logic across supported targets.

### AI Mobile Engineering
- Integrate hosted AI models.
- Understand on-device ML.
- Implement streaming and cancellation.
- Validate structured model outputs.
- Build retrieval-augmented experiences.
- Evaluate quality, latency, cost, privacy, and safety.

---

# 4. Curriculum at a Glance

The curriculum is organized into multiple interconnected learning systems.

| Area | Current scope |
|---|---:|
| Learning phases | 8 |
| Core labs | 57 |
| Integration capstones | 8 |
| Domain tracks | 10 |
| Domain labs | 60 |
| Failure scenarios | 29 |
| Interview questions | 92 |
| Interview categories | 15 |
| System design prompts | 9 |
| AI-specific labs | 7 |
| Flashcards | 413 |
| Market references | 5 |

These are content counts, not a promise that every topic in the Android ecosystem is covered. The curriculum should evolve as platform APIs, engineering practices, and market requirements change.

---

# 5. Curriculum Architecture

PlanDroid consists of several connected learning layers.

```text
PlanDroid
│
├── Learning Curriculum
│   ├── Phases
│   ├── Core Labs
│   └── Capstone Projects
│
├── Practical Engineering
│   ├── Domain Tracks
│   ├── Failure Scenarios
│   └── AI Mobile Engineering
│
├── Knowledge Verification
│   ├── Mastery Verification
│   ├── Coverage Map
│   └── Flashcards
│
├── Career Preparation
│   ├── Interview Readiness
│   ├── System Design
│   └── Market References
│
└── Learning Support
    ├── Resource Library
    ├── Search
    └── Progress Tracking
```

The sections are intended to complement each other.

A Core Lab introduces and develops a technical capability. A Domain Lab applies that capability to a business problem. A Failure Scenario tests how the learner reacts when the implementation breaks. An Interview Question checks whether the learner can explain the underlying decisions.

---

# 6. Core Learning Phases

The curriculum is divided into eight progressive phases.

The phase structure represents a learning progression, not a strict requirement to finish every lab before exploring another section.

Each phase should build on previous knowledge while introducing more complex engineering responsibilities.

The phases collectively cover:

1. Programming and Kotlin foundations.
2. Android platform fundamentals.
3. UI engineering and Jetpack Compose.
4. Application architecture and state management.
5. Data, networking, and persistence.
6. Quality, performance, security, and production engineering.
7. Kotlin Multiplatform.
8. AI-Powered Mobile Engineering.

The exact labs and their implementation details are maintained in the curriculum data files.

---

# 7. Core Labs

Core Labs are the main hands-on learning units.

There are currently 57 labs.

Each lab is intended to provide a focused learning experience containing some or all of the following:

- Learning objective.
- Why the topic matters.
- Concepts to understand.
- Implementation problems.
- Practical constraints.
- Edge cases.
- Deep technical questions.
- Frequently asked questions.
- Learning resources.
- Completion checklist.

## How to Approach a Lab

For each lab:

1. Read the problem and identify the expected outcome.
2. Explain the concept in your own words.
3. Identify the Android or Kotlin behavior involved.
4. Design the implementation before coding.
5. Implement the solution manually.
6. Test the happy path.
7. Test failure and edge cases.
8. Review the implementation against the checklist.
9. Explain why your solution is appropriate.
10. Revisit the lab later without relying on the original solution.

A lab should not be considered mastered merely because its checklist was completed.

The learner should be able to reproduce the important behavior and explain the trade-offs independently.

---

# 8. Capstone Projects

Capstones are integration projects that combine multiple engineering capabilities.

There are currently eight capstones.

They are designed to move beyond isolated exercises and simulate larger application requirements.

Each capstone may include:

- Product scenario.
- Technical requirements.
- Expected architecture.
- Implementation milestones.
- Validation criteria.
- Engineering deliverables.
- Learning outcomes.
- Revisit guidance.
- Optional stretch requirements.

## Capstone Completion Standard

A completed capstone should demonstrate:

- A working implementation.
- Clear architecture decisions.
- Appropriate data ownership.
- Correct lifecycle handling.
- Error handling.
- Testing.
- Performance considerations.
- Security considerations.
- Documentation.
- The ability to explain important trade-offs.

## AI Extensions

Existing capstones can be extended with optional AI capabilities.

These extensions should not replace deterministic application behavior.

For example:

- AI may summarize information.
- AI may classify or extract content.
- AI may help users search documents.
- AI may provide contextual assistance.

However, critical business rules must remain under application control.

---

# 9. Domain Engineering Tracks

Domain Tracks apply engineering concepts to realistic business environments.

There are currently 10 tracks and 60 domain labs.

The tracks are intended to demonstrate how engineering requirements change depending on the product.

Examples of domain concerns include:

### FinTech
- Sensitive information.
- Transaction integrity.
- Idempotency.
- Authentication.
- Authorization.
- Auditability.
- Security and privacy.

### Point of Sale
- Offline transactions.
- Inventory synchronization.
- Duplicate order prevention.
- Receipt generation.
- Background synchronization.
- Device integrations.

### AI Mobile
- Model integration.
- Streaming.
- Retrieval.
- Structured output.
- Evaluation.
- Privacy and cost controls.

The domain track structure allows the learner to practice applying general engineering knowledge under different business constraints.

---

# 10. Failure Scenario Library

The Failure Scenario Library contains 29 scenarios.

Its purpose is to train debugging and production problem-solving.

A failure scenario should encourage the learner to answer:

1. What is the observed behavior?
2. What are the possible root causes?
3. Which evidence would distinguish between them?
4. How would the problem be reproduced?
5. How would it be diagnosed?
6. What is the safest fix?
7. What regression tests should be added?
8. How can the same issue be prevented?

The goal is to develop systematic debugging rather than guessing.

Typical failure categories include:

- Lifecycle bugs.
- Concurrency problems.
- UI state inconsistencies.
- Database issues.
- Network failures.
- Background execution restrictions.
- Performance degradation.
- Memory problems.
- Security mistakes.
- AI output and integration failures.

A strong debugging process should be evidence-driven.

---

# 11. Interview Readiness Map

The Interview Readiness Map is a structured technical interview preparation system.

It currently contains:

- 92 questions.
- 15 technical and professional categories.
- 9 system-design and deep-technical prompts.
- Market reference links.

## Interview Categories

The question bank covers:

1. Kotlin and concurrency.
2. Android platform and lifecycle.
3. Jetpack Compose.
4. Architecture and design.
5. Data and networking.
6. Testing and quality.
7. Performance and debugging.
8. Security and privacy.
9. Kotlin Multiplatform.
10. AI and mobile ML.
11. System design and product cases.
12. Android components and legacy platform.
13. JVM, Java, and build tooling.
14. Coding and problem solving.
15. Behavioral and ownership.

## Question Structure

Each question may include:

- Question statement.
- Answer framework.
- Follow-up pressure test.
- What a strong answer demonstrates.
- Common weak answers and traps.
- Related Core Lab references.
- Related Domain Lab references.

The objective is to prepare the learner for follow-up questions and practical discussion, not memorize short definitions.

## Interview Practice Workflow

1. Select a question.
2. Answer without reading the framework.
3. Explain the implementation details.
4. Discuss alternatives.
5. Identify trade-offs.
6. Answer the follow-up questions.
7. Compare your answer with the strong-answer signals.
8. Mark the question as practiced only after completing the exercise.

## Market Alignment

The included market references provide examples of real job descriptions and interview preparation material.

They should be treated as reference snapshots, not permanent market requirements.

Job requirements change over time. Before preparing for a specific role, review its current description and identify the actual expectations.

---

# 12. AI-Powered Mobile Engineering

Phase 8 introduces AI as a mobile engineering specialization.

It contains seven dedicated labs.

| Lab | Topic |
|---|---|
| LAB 51 | AI Product Foundations & Model Integration |
| LAB 52 | On-Device ML Inference & Model Lifecycle |
| LAB 53 | LLM Streaming, Cancellation & Conversation State |
| LAB 54 | Structured Output & Tool Calling |
| LAB 55 | Mobile RAG & Grounded Answers |
| LAB 56 | Multimodal AI, Camera & Audio Workflow |
| LAB 57 | AI Evaluation, Safety, Privacy & Cost |

## Core AI Engineering Topics

### Hosted Models
- API integration.
- Request and response modeling.
- Authentication.
- Streaming.
- Cancellation.
- Retry policies.
- Rate limits.
- Error handling.

### On-Device ML
- Model loading.
- Inference.
- Model lifecycle.
- Device constraints.
- Memory and performance.
- Model updates.

### LLM Interaction
- Conversation state.
- Context management.
- Structured output.
- Tool calling.
- Output validation.

### Retrieval-Augmented Generation
- Document ingestion.
- Chunking.
- Embeddings.
- Retrieval.
- Grounding.
- Citation and source handling.
- Access control.

### Multimodal Experiences
- Image input.
- Camera workflows.
- Audio processing.
- Text and media interactions.

### Evaluation and Safety
- Quality evaluation.
- Hallucination handling.
- Latency measurement.
- Cost measurement.
- Privacy.
- User consent.
- Safety constraints.

## AI Architecture Guardrails

AI features must follow several important rules:

1. Never ship provider secrets directly inside an APK.
2. Treat model outputs as untrusted input.
3. Validate structured outputs before using them.
4. Keep critical business rules outside the model.
5. Require explicit user confirmation before consequential actions.
6. Enforce retrieval authorization outside the model.
7. Measure latency, cost, quality, and privacy.
8. Distinguish hosted LLM integration from on-device ML.
9. Provide fallback behavior when AI services are unavailable.
10. Avoid presenting generated answers as verified facts without appropriate grounding.

---

# 13. Mastery Verification Framework

Mastery Verification evaluates actual engineering capability.

Its central principle is:

**Score the evidence, not the effort.**

Time spent studying is not proof of mastery.

A learner should be evaluated through observable evidence.

## Evidence Categories

### Conceptual Understanding
Can the learner explain the concept and its underlying behavior?

### Implementation
Can the learner build the functionality without copying a finished solution?

### Debugging
Can the learner identify and fix unexpected behavior?

### Trade-off Analysis
Can the learner explain why one solution is better than another under specific constraints?

### Testing
Can the learner verify expected behavior and edge cases?

### Communication
Can the learner explain decisions clearly and defend them during technical discussion?

## Suggested Mastery Levels

A practical interpretation of mastery should distinguish between:

- Familiarity: Recognizes the concept and understands its purpose.
- Working Knowledge: Can implement a straightforward solution with limited guidance.
- Independent Application: Can implement and debug the solution independently.
- Engineering Judgment: Can compare alternatives and reason about constraints.
- Mastery: Can design, implement, test, debug, and explain the solution in unfamiliar situations.

Mastery is demonstrated through repeatable performance, not a single successful attempt.

---

# 14. Flashcards & Active Recall

The Flashcards system currently contains 413 cards.

It supports active recall across the learning curriculum.

Flashcards are useful for:

- Kotlin concepts.
- Android internals.
- Compose.
- Architecture.
- Networking.
- Persistence.
- Coroutines.
- Testing.
- Performance.
- Security.
- Multiplatform.
- AI engineering.
- Interview preparation.

## Recommended Usage

Do not simply read the answer and mark it as known.

Instead:

1. Read the question.
2. Recall the answer without looking.
3. Explain it in your own words.
4. Reveal the answer.
5. Identify missing details.
6. Revisit difficult cards later.

For implementation-heavy subjects, flashcards should supplement practical work rather than replace it.

---

# 15. Resource Library

The Resource Library collects learning references related to the curriculum.

Resources should ideally include:

- Official Android documentation.
- Official Kotlin documentation.
- Jetpack Compose documentation.
- Kotlin Multiplatform documentation.
- Android architecture guidance.
- Testing documentation.
- Performance and profiling documentation.
- Security guidance.
- AI and ML documentation.
- Relevant technical articles and talks.

## Resource Selection Principle

Prefer resources in this order:

1. Official documentation.
2. Primary technical sources.
3. Well-maintained educational material.
4. High-quality practical articles.
5. Community discussions when they provide useful real-world context.

A resource should have a clear purpose in the learning journey.

---

# 16. Coverage Map

The Coverage Map provides a broader view of the engineering subjects represented in the curriculum.

Its purpose is to help identify:

- Covered engineering areas.
- Related labs.
- Domain applications.
- Failure scenarios.
- Interview questions.
- Areas that need more practical work.

Coverage does not automatically imply mastery.

A subject may appear in several sections while still requiring additional implementation practice.

---

# 17. Progress Tracking

PlanDroid stores learning progress locally in the browser.

Depending on the feature, tracked information may include:

- Completed labs.
- Capstone progress.
- Practiced interview questions.
- Flashcard state.
- Learning preferences.
- Other supported progress indicators.

The interface uses this information to calculate and display learning progress.

## Important Notes

- Progress is browser-specific.
- Clearing browser data may remove locally stored progress.
- Different browsers do not automatically share the same progress.
- Private browsing sessions may not retain progress.
- Export and backup capabilities should be used when available.
- Progress data should not be interpreted as proof of technical mastery.

---

# 18. Application Architecture

PlanDroid is a client-side static web application.

It does not require a backend server to run its core learning experience.

The application is built using:

- HTML for document structure.
- CSS for layout and styling.
- Vanilla JavaScript for application logic.
- Browser localStorage for local progress persistence.

The project intentionally avoids requiring a frontend framework or build pipeline for normal local usage.

## High-Level Runtime Flow

```text
index.html
    |
    ├── Loads CSS
    |
    ├── Loads curriculum data
    |
    ├── Loads domain and scenario data
    |
    ├── Loads AI and interview data
    |
    └── Initializes JavaScript application
              |
              ├── Reads persisted state
              ├── Initializes navigation
              ├── Registers event handlers
              ├── Renders the active section
              └── Updates progress
```

## Architectural Responsibilities

### HTML
Provides the main application structure and section containers.

### CSS
Defines the visual system, responsive behavior, component styling, and theme behavior.

### Data Files
Hold the curriculum and learning content separately from rendering logic.

### State Management
Handles persisted progress and user interaction state.

### Renderers
Transform application data and state into visible interface components.

### Application Controller
Coordinates navigation, rendering, event handling, and application initialization.

---

# 19. Project Structure

The current project is organized into separate content, logic, and presentation files.

```text
PlanDroid/
│
├── index.html
├── plandroid.html
├── README.md
│
├── css/
│   └── styles.css
│
└── js/
    ├── data.js
    ├── domain-data.js
    ├── scenario-data.js
    ├── ai-data.js
    ├── interview-data.js
    ├── state.js
    ├── flashcards.js
    ├── renderers.js
    └── app.js
```

## File Responsibilities

### `index.html`
The main application entry point.

Responsibilities:

- Defines the page structure.
- Loads stylesheets.
- Loads JavaScript files in the correct order.
- Provides the main navigation and content containers.
- Initializes the application through the loaded scripts.

### `plandroid.html`
An alternate HTML entry point synchronized with the main application entry point.

When changing the main HTML structure, ensure that both entry points remain consistent if both are intended to be distributed.

### `css/styles.css`
Contains the application's visual system.

Responsibilities:

- Global styles.
- Color tokens.
- Typography.
- Layout.
- Navigation.
- Learning cards.
- Lab content.
- Dashboard components.
- Interview workbench.
- Mastery verification.
- Responsive behavior.
- Light and dark theme styling.

### `js/data.js`
Contains the main learning curriculum data.

Responsibilities include:

- Learning phases.
- Core labs.
- Capstone definitions.
- Core curriculum metadata.
- Shared curriculum structures.

### `js/domain-data.js`
Contains domain-specific learning tracks and practical exercises.

### `js/scenario-data.js`
Contains failure scenarios used in the Scenario Library.

### `js/ai-data.js`
Contains AI-specific curriculum content and integrations.

Responsibilities include:

- Phase 8.
- AI Labs 51–57.
- AI domain track.
- AI failure scenarios.
- AI interview prompts.
- AI capstone.
- AI extensions for previous capstones.
- Cross-curriculum AI connections.

### `js/interview-data.js`
Contains the interview question bank, categories, answer frameworks, follow-up questions, and deep technical prompts.

### `js/state.js`
Contains application state and persistence-related logic.

### `js/flashcards.js`
Contains flashcard content and flashcard-related behavior.

### `js/renderers.js`
Contains the functions responsible for rendering application sections.

Examples include:

- Overview.
- Labs.
- Phases.
- Capstones.
- Domain Tracks.
- Failure Scenarios.
- Interview Readiness.
- Resources.
- Coverage Map.
- Mastery Verification.
- Flashcards.

### `js/app.js`
Coordinates application behavior.

Responsibilities include:

- Application initialization.
- Navigation.
- Event listeners.
- Search.
- State updates.
- Rendering coordination.
- User interaction handlers.

---

# 20. Data Model & Content Structure

The application uses JavaScript objects and arrays to represent learning content.

This allows curriculum data to remain separate from the UI implementation.

## Conceptual Lab Structure

A lab may contain:

```js
{
  id: "LAB-XX",
  title: "Example Lab",
  phase: 1,
  goal: "What the learner should achieve",
  why: "Why this capability matters",
  concepts: [],
  problems: [],
  edgeCases: [],
  deepQuestions: [],
  faqs: [],
  resources: [],
  checklist: []
}
```

This is a conceptual example. Always follow the actual property names and structure used by the existing lab data before adding new entries.

## Conceptual Domain Track Structure

A domain track groups exercises around a product or engineering domain.

```js
{
  id: "example-domain",
  title: "Example Domain",
  description: "Domain description",
  labs: []
}
```

## Conceptual Failure Scenario Structure

A failure scenario describes an unexpected system behavior and the engineering investigation required to solve it.

```js
{
  id: "SCENARIO-XX",
  title: "Example Failure",
  category: "Performance",
  symptom: "Observed behavior",
  investigation: [],
  rootCauses: [],
  resolution: [],
  prevention: []
}
```

The actual schema in `scenario-data.js` is authoritative.

---

# 21. State Persistence

The application uses browser localStorage to retain supported learning progress.

The state layer should remain the single source of truth for persisted progress.

## Important Development Rule

When modifying state structures:

- Preserve the existing storage key.
- Preserve existing user progress.
- Add migration logic when changing stored data formats.
- Avoid resetting state during application initialization.
- Validate imported backup data before accepting it.
- Handle missing or malformed stored values safely.

A state migration should be backward-compatible whenever practical.

---

# 22. Search & Navigation

The application provides navigation across the learning sections and a global search experience.

Search should help the learner discover relevant material across the curriculum.

Depending on the indexed data, results may include:

- Core Labs.
- Domain Labs.
- Interview Questions.
- Failure Scenarios.
- Capstones.
- Other learning resources.

## Navigation Principles

- Keep the main navigation understandable.
- Use clear section labels.
- Avoid overcrowding the sidebar.
- Keep related content discoverable.
- Preserve useful navigation context when switching sections.
- Ensure interactive controls remain accessible on smaller screens.

---

# 23. Design System

PlanDroid uses a dark-first engineering-oriented visual identity with light and dark theme support.

## Design Goals

- High text contrast.
- Clear visual hierarchy.
- Readable technical content.
- Consistent spacing.
- Predictable component behavior.
- Responsive navigation.
- Minimal unnecessary decoration.

## Typography

Typography should prioritize long-form technical reading.

Important rules:

- Body text must remain comfortable to read.
- Secondary text must remain distinguishable from the background.
- Small metadata should not become essential content.
- Code and technical identifiers should remain legible.
- Line-height should support reading long explanations.

## Color and Contrast

The dark theme uses lighter secondary and muted text colors to improve readability.

The light theme uses sufficiently dark text for readable content.

When introducing new colors, verify contrast rather than relying only on visual appearance.

## Responsive Behavior

The interface should support:

- Desktop navigation.
- Narrow laptop screens.
- Tablet layouts.
- Mobile navigation.
- Responsive content cards.
- Readable technical tables and long-form sections.

---

# 24. How to Run

PlanDroid is a static website.

No package installation is required for normal use.

## Option 1: Open Directly

1. Extract the project archive.
2. Open the project directory.
3. Open `index.html` in a modern browser.

## Option 2: Run a Local Development Server

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Using Node.js with a suitable static server:

```bash
npx serve .
```

A local development server is recommended during development because it provides a more consistent browser environment.

---

# 25. How to Add a New Lab

Before adding a lab:

1. Identify the phase it belongs to.
2. Define the exact learning outcome.
3. Check whether an existing lab already covers the topic.
4. Decide what implementation exercise proves the capability.
5. Identify edge cases.
6. Identify related labs and domain applications.
7. Add appropriate resources.

Then:

1. Add the lab to the appropriate curriculum data structure.
2. Ensure its ID is unique.
3. Add it to any required phase or track references.
4. Check whether dashboard counts are derived dynamically or require an update.
5. Add related flashcards when useful.
6. Add relevant interview questions when appropriate.
7. Add failure scenarios for important production risks.
8. Verify that the lab appears in navigation and search.
9. Test progress tracking.
10. Validate its rendering.

Do not duplicate lab content across multiple files unless the application architecture explicitly requires it.

Prefer shared references and reusable data structures.

---

# 26. How to Add a New Domain Track

A new domain track should represent a meaningful engineering environment.

It should not be a simple collection of unrelated Android topics.

Define:

- Domain objective.
- Product context.
- Main technical constraints.
- Important business rules.
- Offline and synchronization requirements.
- Security and privacy concerns.
- Failure conditions.
- Relevant Core Labs.

Then add the track and its labs to the appropriate domain data structure.

Ensure that the new track is discoverable through:

- Domain navigation.
- Global search.
- Coverage Map, where applicable.
- Related Core Lab references.
- Failure Scenarios.
- Interview questions, where applicable.

---

# 27. How to Add a Failure Scenario

A useful failure scenario must describe a realistic problem.

Recommended process:

1. Define the symptom.
2. Describe the application context.
3. List plausible causes.
4. Identify evidence that distinguishes those causes.
5. Describe a reproducible investigation.
6. Define the correct resolution.
7. Identify regression tests.
8. Explain how to prevent recurrence.

Avoid scenarios that reveal the solution immediately without requiring investigation.

The learner should have to reason about the problem.

---

# 28. How to Add Interview Questions

Interview questions should reflect real engineering expectations.

A strong question should evaluate more than terminology.

For each question, consider adding:

- Main question.
- Answer framework.
- Follow-up pressure test.
- Strong-answer signals.
- Common weak answers.
- Related labs.
- Related domain scenarios.

Questions should test different levels:

- Fundamental knowledge.
- Practical implementation.
- Debugging.
- Architecture.
- Trade-off reasoning.
- System design.
- Communication and ownership.

Avoid questions that only reward memorization.

---

# 29. How to Add Flashcards

A good flashcard should test one important idea.

Recommended structure:

- Clear question.
- Focused answer.
- Optional context or explanation.
- Related learning topic.

Avoid turning a flashcard into a full tutorial.

For complex engineering concepts, use multiple cards that test different aspects:

- Definition.
- Mechanism.
- Practical use.
- Trade-offs.
- Failure behavior.

---

# 30. Testing & Validation

Because PlanDroid is a static JavaScript application, validation should include both code-level and runtime checks
