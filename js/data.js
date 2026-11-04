// js/data.js: Pure data constants. No DOM access, no functions.

const STORAGE_KEY = 'android_kmp_mastery_portal_v2_1';
const MASTERY_DIMENSIONS = ['Conceptual', 'Implementation', 'Edge Cases', 'Testing', 'Performance', 'Debugging'];

// Core curriculum: 7 foundational phases and 50 Android/KMP labs. Phase 8 AI is appended by ai-data.js.
const UNIFIED_PHASES = [
  { id: 'Phase 1', title: 'Android Internals & Kotlin Mastery', focus: 'Coroutines CPS, Flow, Looper/Handler/MessageQueue, Lifecycle, Compose State, Process Death & Kotlin DSLs', labsList: ['LAB 01', 'LAB 02', 'LAB 03', 'LAB 04', 'LAB 05', 'LAB 37'], duration: '8–10 weeks', baseWeeks: 9 },
  { id: 'Phase 2', title: 'Architecture & Jetpack', focus: 'Type-Safe Navigation, Multi-Module Hilt DI, Clean Architecture, MVI State Reducers, 60fps Animations & Custom Layouts/Canvas/Modifier.Node', labsList: ['LAB 06', 'LAB 07', 'LAB 08', 'LAB 09', 'LAB 19', 'LAB 46'], duration: '9–10.5 weeks', baseWeeks: 10 },
  { id: 'Phase 3', title: 'Data, Networking & Storage', focus: 'Raw SQLite to Room FTS4/WAL, Ktor/Retrofit Token Mutex, Offline-First Sync, DataStore, Paging 3, WebSockets/SSE/gRPC & Firebase/Supabase BaaS', labsList: ['LAB 10', 'LAB 11', 'LAB 12', 'LAB 13', 'LAB 36', 'LAB 47', 'LAB 48'], duration: '11–12.5 weeks', baseWeeks: 12 },
  { id: 'Phase 4', title: 'Advanced Android Systems', focus: 'Permissions, WorkManager, Media3, Keystore/Biometric/SSL Security, OAuth, App Links, FCM, Location, CameraX, SAF, Accessibility, Glance, Binder IPC & Billing', labsList: ['LAB 14', 'LAB 15', 'LAB 16', 'LAB 17', 'LAB 18', 'LAB 27', 'LAB 28', 'LAB 29', 'LAB 30', 'LAB 31', 'LAB 32', 'LAB 42', 'LAB 43', 'LAB 44'], duration: '10–12 weeks', baseWeeks: 11 },
  { id: 'Phase 5', title: 'Performance, Testing & Quality', focus: 'Compose Macrobenchmark, Startup Baseline Profiles, LeakCanary, ANR/Perfetto, Testing Pyramid, Paparazzi, CI/CD, Analytics, Crashlytics & ADB Debugging', labsList: ['LAB 20', 'LAB 21', 'LAB 22', 'LAB 23', 'LAB 24', 'LAB 25', 'LAB 33', 'LAB 34', 'LAB 35', 'LAB 45'], duration: '8–10 weeks', baseWeeks: 9 },
  { id: 'Phase 6', title: 'Modularization & Scalability', focus: 'Multi-Module Architecture (:api vs :impl), Gradle build-logic Convention Plugins, Custom Design Systems & Adaptive Foldable UI', labsList: ['LAB 26', 'LAB 50'], duration: '4.5–5.5 weeks', baseWeeks: 5 },
  { id: 'Phase 7', title: 'Kotlin Multiplatform (KMP & CMP)', focus: 'Shared Logic (expect/actual), Ktor + SQLDelight vs Room KMP + DataStore KMP, Koin + Shared ViewModel, Compose Multiplatform & Swift/SKIE/CInterop/NDK', labsList: ['LAB 38', 'LAB 39', 'LAB 40', 'LAB 41', 'LAB 49'], duration: '9–11 weeks', baseWeeks: 10 }
];

// Seven applied integration challenges. Each one combines only the skills that solve its scenario.
const PHASE_CAPSTONES = [
  {
    id: 'CAPSTONE 1', phase: 'Phase 1', title: 'A Session Tracker That Survives Real Android Lifecycle Events', labs: ['LAB 01', 'LAB 02', 'LAB 03', 'LAB 04', 'LAB 05', 'LAB 37'],
    subtitle: 'State, concurrency & process recreation', estimate: '4–6 focused days', difficulty: 'Foundation integration',
    scenario: 'Build a small focus-session tracker. A user starts a 25-minute session, switches apps, rotates the device, receives a system interruption, or returns after Android kills the process. The timer and session state must remain understandable and recoverable.',
    outcome: 'A working session tracker with a stable timer, lifecycle-aware UI collection, and deliberate recovery after recreation or process death.',
    why: 'This is where Kotlin concurrency, Android lifecycle, Compose state, and saved state meet. It exposes the difference between UI state, in-memory work, and data that must survive process death.',
    build: [
      'Create Start, Pause, Resume, and Finish actions with one clear session state model.',
      'Run timer work without blocking the Main thread; expose updates as a Flow or StateFlow.',
      'Collect state with lifecycle awareness and make the UI a rendering of state, not the owner of the timer.',
      'Persist only the data needed to reconstruct the session (for example start time, duration, and status); do not try to persist a running coroutine.',
      'Restore the screen after rotation and after force-stop/relaunch. Explain which events Android does and does not guarantee.'
    ],
    checks: [
      'The timer does not create duplicate jobs after rotation or returning to the screen.',
      'Pause, resume, finish, and invalid transitions behave predictably.',
      'After process death and relaunch, the app reconstructs a sensible state from persisted data.',
      'UI collection stops/restarts with the lifecycle without losing the underlying session truth.'
    ],
    deliverables: ['A short screen recording showing rotation + background/return + relaunch recovery.', 'A state-transition diagram and a brief note explaining what is stored and why.', 'Tests for the state reducer / timer logic, including at least one edge case.'],
    learn: ['Choose between StateFlow, Flow, and persisted state based on ownership and lifetime.', 'Explain why a coroutine is not a persistence mechanism.', 'Separate lifecycle-aware collection from the lifetime of business work.', 'Reason about configuration change versus process death.'],
    revisit: ['LAB 01 — Coroutine scopes, cancellation, dispatchers, structured concurrency.', 'LAB 02 — Flow / StateFlow, cold vs hot streams, sharing and collection.', 'LAB 03–04 — Lifecycle, Compose state and recomposition.', 'LAB 05 — SavedStateHandle, persistence boundaries and process recreation.', 'LAB 37 — Kotlin DSL only if it is genuinely useful; do not add DSL complexity to this app.'],
    stretch: 'Add a notification showing the active session. Keep it optional: first understand whether this use case actually needs a foreground service.'
  },
  {
    id: 'CAPSTONE 2', phase: 'Phase 2', title: 'A Small Feature-Rich App With Predictable Navigation and State', labs: ['LAB 06', 'LAB 07', 'LAB 08', 'LAB 09', 'LAB 19', 'LAB 46'],
    subtitle: 'Architecture, dependency boundaries & UI state', estimate: '5–7 focused days', difficulty: 'Architecture integration',
    scenario: 'Build a compact reading-list app with a list, item details, add/edit flow, and settings. Users can navigate between screens, edit an item, press Back, and see consistent state. The app should remain easy to change when a new feature is added.',
    outcome: 'A multi-screen Compose app with explicit UI state/events, testable business rules, injected dependencies, and navigation that handles back stack and arguments correctly.',
    why: 'Architecture is not the number of layers or libraries. It is the ability to keep responsibilities clear while behavior changes. This project makes you practice boundaries and trace a user action from UI to data and back.',
    build: [
      'Define the core model and use cases without Android UI dependencies.',
      'Create a repository contract and a simple in-memory or Room-backed implementation; keep the choice small and explain it.',
      'Model each screen with UiState and user events. Make loading, empty, success, and error states explicit where relevant.',
      'Use a ViewModel and dependency injection to assemble the feature; avoid injecting everything just because you can.',
      'Implement type-safe navigation arguments, back behavior, and a simple edit flow that returns the updated result.',
      'Add one custom visual component only if it communicates useful information (for example a reading-progress chart).'
    ],
    checks: [
      'Business rules can be unit-tested without launching Compose or an Activity.',
      'The ViewModel exposes observable state and does not expose mutable state to the UI.',
      'Navigation handles detail arguments, Back, and returning from edit without stale or duplicated screens.',
      'A new data source or screen can be added without moving business rules into composables.'
    ],
    deliverables: ['A package/module diagram showing dependencies and ownership.', 'A short demo of list → detail → edit → Back.', 'Unit tests for at least two business rules and one ViewModel state transition.', 'One ADR explaining a real architecture choice and its trade-off.'],
    learn: ['Draw a dependency direction and explain why it points that way.', 'Distinguish UI state, domain behavior, and navigation state.', 'Know when an abstraction is useful and when it is ceremony.', 'Debug a user action across UI, ViewModel, use case, and repository.'],
    revisit: ['LAB 06 — Navigation graph, arguments, back stack and deep links.', 'LAB 07 — DI scopes, bindings and dependency ownership.', 'LAB 08 — Domain modeling, repository boundaries and use cases.', 'LAB 09 — MVI reducers, events, effects and one-way data flow.', 'LAB 19 / LAB 46 — Animation or custom layout only if the product needs it.'],
    stretch: 'Split the app into a core module and a feature module only after you can explain what boundary the split protects.'
  },
  {
    id: 'CAPSTONE 3', phase: 'Phase 3', title: 'An Offline-First Catalog With Reliable Sync', labs: ['LAB 10', 'LAB 11', 'LAB 12', 'LAB 13', 'LAB 36', 'LAB 47', 'LAB 48'],
    subtitle: 'Database, API, pagination & conflict handling', estimate: '7–10 focused days', difficulty: 'Data systems integration',
    scenario: 'Build a catalog or saved-articles app. A user can browse remote items, search locally, save an item, and continue using saved content with no connection. When connectivity returns, local changes synchronize without silently losing user data.',
    outcome: 'A local-source-of-truth app with paginated remote data, observable local reads, a small pending-write queue, and a documented conflict policy.',
    why: 'Offline-first is not “cache the response.” You must decide which layer owns truth, what happens when writes fail, how retries behave, and how the UI communicates pending or conflicting changes.',
    build: [
      'Create a Room database and make the UI observe local data; remote responses update the database.',
      'Add paginated loading with clear refresh/append states and stable item identity.',
      'Support one offline mutation, such as saving an item or editing a note, and persist it locally first.',
      'Track pending sync operations with status, retry count, and enough information to retry safely.',
      'Choose and implement one conflict policy (server wins, client wins, or field-level rule); document why it fits this product.',
      'Handle authentication expiry without sending multiple simultaneous refresh requests. Keep WebSocket or BaaS integration out unless the core flow is already reliable.'
    ],
    checks: [
      'The app can cold-start offline and display previously stored data.',
      'A local mutation appears immediately and survives app restart.',
      'A failed sync is visible, retryable, and does not create duplicate records.',
      'Refreshing and appending pages do not duplicate or reorder items unexpectedly.',
      'The conflict policy is demonstrated with a reproducible two-version example.'
    ],
    deliverables: ['A sequence diagram for read, local write, and sync retry.', 'A short offline → reconnect demo.', 'Tests for repository mapping, pending operation retry, and the chosen conflict rule.', 'A short note describing what happens if the app is killed during sync.'],
    learn: ['Explain local source of truth and single direction of data flow.', 'Distinguish cache, database, and durable sync queue.', 'Design idempotent retries and reason about duplicate requests.', 'Choose a conflict policy based on product semantics rather than fashion.'],
    revisit: ['LAB 10 — SQLite/Room schema, transactions, indexes and migrations.', 'LAB 11 — HTTP errors, serialization, cancellation and token refresh.', 'LAB 12 — Offline-first repository and synchronization.', 'LAB 13 — DataStore for preferences/session metadata, not relational records.', 'LAB 36 — Paging source and RemoteMediator concepts.', 'LAB 47–48 — Revisit only if live updates or a BaaS backend is a real requirement.'],
    stretch: 'Add server-pushed updates with WebSocket or SSE and define how they merge with local pending edits. Pick one protocol, not all of them.'
  },
  {
    id: 'CAPSTONE 4', phase: 'Phase 4', title: 'A Private Document Vault With Resumable Background Work', labs: ['LAB 14', 'LAB 15', 'LAB 17', 'LAB 18', 'LAB 43'],
    subtitle: 'Permissions, files, security & background execution', estimate: '6–9 focused days', difficulty: 'Android platform integration',
    scenario: 'Build a personal document vault. A user imports or captures a document, stores it privately, locks access behind device authentication, and queues an optional backup. The app must behave correctly when permissions are denied, the process is killed, or the device restarts.',
    outcome: 'A secure local document flow with deliberate file ownership, protected key material, and reliable deferred work with visible status.',
    why: 'Android platform APIs are full of lifecycle, permission, and OS policy constraints. This challenge teaches you to design around those constraints instead of assuming your app controls the device.',
    build: [
      'Import a file using the Storage Access Framework; do not request broad storage access when a document picker is enough.',
      'Store app-owned metadata separately from the file bytes and define what happens when the original URI permission is unavailable.',
      'Encrypt document content with a key protected by Android Keystore; never hardcode keys or store raw key bytes in preferences.',
      'Gate viewing or export behind biometric/device credential authentication where appropriate.',
      'Queue a mock backup or upload with WorkManager, constraints, retry/backoff, and observable status.',
      'Offer a deliberate share/export path using a content URI and temporary URI permission.'
    ],
    checks: [
      'Import works without broad storage permission and handles cancellation/denial.',
      'Encrypted files cannot be read as plaintext by simply opening the stored file.',
      'Key loss or authentication failure has a defined recovery/error path; the app does not pretend data is recoverable when it is not.',
      'Background work survives process death and reports success/failure without duplicate uploads.',
      'Sharing grants access only to the selected file and only through the intended URI permission.'
    ],
    deliverables: ['A threat sketch: what data is protected, from whom, and what is out of scope.', 'A demo of import → lock → unlock → queue backup → share.', 'A WorkManager state screenshot/log and one retry test.', 'A note explaining why you chose SAF, Keystore, and WorkManager.'],
    learn: ['Distinguish app-private storage, shared storage, and URI-granted access.', 'Understand why Keystore protects key material rather than magically encrypting every file.', 'Choose WorkManager versus a foreground service based on user-visible execution needs.', 'Handle runtime permissions as a stateful user journey.'],
    revisit: ['LAB 14 — Runtime permission states, rationale, denial and settings return.', 'LAB 15 — WorkManager constraints, retries, unique work and cancellation.', 'LAB 17 — Keystore, encryption, threat model and secure storage.', 'LAB 18 — Authentication/session boundaries.', 'LAB 43 — ContentProvider/URI sharing and Binder only if cross-process IPC is actually required.'],
    stretch: 'Add CameraX capture as another input source. Keep imported-file support working independently.'
  },
  {
    id: 'CAPSTONE 5', phase: 'Phase 5', title: 'A Release Pipeline That Catches Regressions Before Users Do', labs: ['LAB 20', 'LAB 21', 'LAB 22', 'LAB 24', 'LAB 25', 'LAB 33', 'LAB 45'],
    subtitle: 'Testing strategy, CI, performance & debugging', estimate: '5–7 focused days', difficulty: 'Quality engineering',
    scenario: 'Take one of your earlier apps and make it safer to change. A pull request should run meaningful checks, produce a build artifact, and reveal whether a change caused a functional or performance regression.',
    outcome: 'A reproducible CI pipeline plus a small quality report containing test evidence and a before/after performance baseline.',
    why: 'Quality is not “add many tests.” It is choosing the cheapest reliable signal for each risk, making checks repeatable, and using measurements rather than arbitrary performance targets.',
    build: [
      'Select one critical user journey and identify its failure risks.',
      'Add unit tests for business logic, integration tests for data boundaries, and UI tests for the most important user journey.',
      'Configure CI to run formatting/static checks, tests, and a debug or release build on every pull request.',
      'Publish test results and an installable artifact so failures are diagnosable.',
      'Measure startup or a key scrolling interaction before optimization; capture the device, build type, and method.',
      'Make one evidence-based optimization and measure again. Add a Baseline Profile or Macrobenchmark only where it helps.'
    ],
    checks: [
      'A deliberately failing test makes the CI job fail and is visible in the report.',
      'A clean checkout can build and run the configured checks without local machine state.',
      'The critical user journey has a test at the appropriate layer.',
      'Performance claims include a repeatable measurement method and comparable before/after runs.',
      'The pipeline stores an artifact and useful failure logs.'
    ],
    deliverables: ['A CI workflow file and one successful run link/screenshot.', 'A test map explaining why each test belongs at its layer.', 'A before/after performance note with environment and measurements.', 'A short bug report for one issue found during testing or profiling.'],
    learn: ['Choose test boundaries based on risk and feedback speed.', 'Debug a failing CI job from logs rather than guessing.', 'Distinguish measurement from optimization and avoid universal millisecond promises.', 'Use profiling evidence to prioritize work.'],
    revisit: ['LAB 20–22 — Compose performance, startup, memory and leak investigation.', 'LAB 24–25 — Unit, integration, UI and screenshot testing.', 'LAB 33 — CI/CD pipeline and artifact handling.', 'LAB 45 — ADB, logs, debugger and systematic fault isolation.'],
    stretch: 'Add screenshot regression checks or a Baseline Profile after the core pipeline is stable; do not make flaky visual tests a release blocker without understanding their failure modes.'
  },
  {
    id: 'CAPSTONE 6', phase: 'Phase 6', title: 'Modularize a Growing App Without Creating a Build Maze', labs: ['LAB 26', 'LAB 50', 'LAB 06', 'LAB 07', 'LAB 08'],
    subtitle: 'Module boundaries, dependency graph & build logic', estimate: '5–7 focused days', difficulty: 'Scalability & architecture',
    scenario: 'Start with a working app that has at least two features. As the codebase grows, changes in one feature should not force unrelated features to depend on its implementation. Your task is to introduce boundaries that make ownership and build impact clearer.',
    outcome: 'A small but justified multi-module structure with explicit public APIs, controlled dependencies, and a documented migration path.',
    why: 'Modularization has a cost: more Gradle configuration, visibility decisions, and navigation between code. The skill is knowing where a boundary pays for itself—not maximizing module count.',
    build: [
      'Draw the current dependency graph and identify one real change-coupling problem.',
      'Extract only the modules justified by the problem: for example :core:model, :core:database, :feature:library:api, and :feature:library:impl.',
      'Expose contracts through an API module and keep implementation details internal.',
      'Define dependency rules so feature implementations do not depend on each other directly.',
      'Move repeated Gradle configuration into a convention plugin only after you have at least two genuine consumers.',
      'Record build time before and after using the same machine and task; do not claim improvement without measurement.'
    ],
    checks: [
      'The dependency graph is acyclic and matches the intended ownership.',
      'A feature can be replaced or tested through its public contract without importing its implementation details.',
      'A change in one feature does not require unrelated features to reference its internal classes.',
      'Convention plugins remove real duplication and do not hide important configuration.',
      'The final module count is justified by team ownership, reuse, isolation, or build impact.'
    ],
    deliverables: ['Before/after module and dependency diagrams.', 'A short ADR for each major boundary (at least one).', 'A demo or build log showing the app still builds after extraction.', 'A measured build comparison or an explicit note explaining why no speed claim is justified.'],
    learn: ['Recognize feature cohesion and dependency coupling.', 'Distinguish API from implementation and enforce dependency direction.', 'Explain the trade-off between modularity and Gradle/build complexity.', 'Use convention plugins as a consistency tool, not an abstraction goal.'],
    revisit: ['LAB 26 — Module types, API/implementation boundaries and dependency graph.', 'LAB 50 — Design-system ownership and adaptive UI boundaries.', 'LAB 06–08 — Navigation, DI, and domain boundaries when deciding cross-module contracts.'],
    stretch: 'Test an ABI-changing edit and inspect which modules recompile. Treat “zero sibling recompilation” as a measured observation for your graph, not a universal guarantee.'
  },
  {
    id: 'CAPSTONE 7', phase: 'Phase 7', title: 'A Shared Product Core With Native Platform Experiences', labs: ['LAB 38', 'LAB 39', 'LAB 40', 'LAB 41', 'LAB 49'],
    subtitle: 'KMP boundaries, persistence, networking & platform interop', estimate: '7–10 focused days', difficulty: 'Cross-platform integration',
    scenario: 'Build a compact notes or reading-list product for Android and one additional target (iOS or Desktop). Users should get the same core rules and data behavior, while platform-specific capabilities feel native rather than being forced into common code.',
    outcome: 'A working KMP app with a deliberate shared-code boundary, platform implementations for one capability, and a clear explanation of what remains native.',
    why: 'KMP is an architectural boundary decision, not a requirement to share every line. You will learn to balance reuse, platform APIs, developer experience, and interop costs.',
    build: [
      'Put domain models, use cases, repository contracts, and portable business rules in commonMain.',
      'Implement networking and persistence in shared code using one compatible stack; choose SQLDelight or Room KMP based on the targets and constraints.',
      'Use expect/actual only for a capability that truly differs by platform (for example secure storage or file access).',
      'Build platform UI entry points and keep platform-specific permission, lifecycle, and navigation behavior where it belongs.',
      'Expose shared state to the second target and handle cancellation/lifecycle correctly.',
      'Add one small native interop bridge only if your product needs it; do not add SKIE, CInterop, and JNI just to tick boxes.'
    ],
    checks: [
      'The shared module compiles for both selected targets.',
      'A business rule test runs in commonTest and produces the same result across targets.',
      'Both platforms can read and update the same logical data model.',
      'Platform-specific behavior is isolated behind a small interface with a real implementation on each target.',
      'The app documents one thing intentionally not shared and explains why.'
    ],
    deliverables: ['A diagram of commonMain and platform source-set responsibilities.', 'A short demo on Android and the second target.', 'Common tests plus at least one platform-specific test or verification.', 'An ADR comparing the selected persistence/UI/interoperability choices.'],
    learn: ['Choose sharing boundaries based on business logic and platform differences.', 'Understand source sets, expect/actual, and dependency compatibility.', 'Reason about Kotlin/Swift or desktop interop and lifecycle ownership.', 'Explain the maintenance cost of sharing versus native implementation.'],
    revisit: ['LAB 38 — Shared business logic and source-set boundaries.', 'LAB 39 — KMP networking and persistence trade-offs.', 'LAB 40 — Dependency injection across targets.', 'LAB 41 — Compose Multiplatform UI and platform integration.', 'LAB 49 — Swift/Objective-C, SKIE, CInterop or JNI only for a concrete interop need.'],
    stretch: 'Add a second platform-specific capability and write down whether sharing it reduced complexity or merely moved complexity across the boundary.'
  }
];

// Goal-Based Smart Track Filters
const GOAL_TRACKS = {
  'all': { label: 'All 57 Labs', labs: [], desc: 'Complete 57-lab Mobile Engineering progression' },
  'system-design-msg': { label: 'System Design: Offline & Real-Time Messaging', labs: ['LAB 10', 'LAB 12', 'LAB 15', 'LAB 28', 'LAB 47', 'LAB 48'], desc: 'Room WAL/FTS4, Offline-First Sync Engine, WebSockets/gRPC, Firebase/Supabase BaaS, WorkManager & FCM Push' },
  'team-arch-20': { label: '20-Engineer Team Architecture', labs: ['LAB 07', 'LAB 08', 'LAB 09', 'LAB 26', 'LAB 33', 'LAB 50'], desc: 'Clean Arch, MVI, Multi-Module Hilt, Modularization, Custom Design System/Foldables & CI/CD' },
  'kmp-crossplatform': { label: 'Cross-Platform KMP & CMP', labs: ['LAB 38', 'LAB 39', 'LAB 40', 'LAB 41', 'LAB 48', 'LAB 49'], desc: 'Shared Logic, Ktor, Room KMP/SQLDelight, Supabase KMP, Koin, Compose MP & SKIE/CInterop/JNI' },
  'compose-perf': { label: 'Compose Internals & 60fps UI', labs: ['LAB 01', 'LAB 02', 'LAB 04', 'LAB 19', 'LAB 20', 'LAB 25', 'LAB 46', 'LAB 50'], desc: 'Coroutines, Flow, Compose Stability, Custom Layouts/Canvas/Modifier.Node, Adaptive Foldables, Macrobenchmark & Paparazzi' },
  'security-auth': { label: 'Security, Keystore & Auth', labs: ['LAB 11', 'LAB 13', 'LAB 14', 'LAB 17', 'LAB 18', 'LAB 48'], desc: 'Keystore AES/RSA, Biometrics, SSL Pinning, OAuth Refresh, Firestore/Supabase RLS & Encrypted DataStore' },
  'reliability-perf': { label: 'Profiling, Memory, Startup & ANR', labs: ['LAB 03', 'LAB 05', 'LAB 21', 'LAB 22', 'LAB 23', 'LAB 45'], desc: 'Process Death, Baseline Profiles, LeakCanary, Perfetto/Systrace & ADB Forensics' }
};

// Deep Senior/Staff System Design & Architecture Interview Bank
const DEEP_INTERVIEW_BLUEPRINTS = [
  {
    id: 'SD_01', labId: 'LAB 12', labTitle: 'System Design · Offline-First Messaging', phase: 'Phase 3', type: 'System Design',
    question: 'Design a WhatsApp-grade offline-first messaging client on Android: local schema, optimistic message sending, ordering guarantees, media upload resumption, and push sync.',
    hint: '1. SSOT: Room WAL database with Messages(localId, serverId, status=PENDING|SENT|DELIVERED|FAILED, createdAt, sequenceId).\n2. Optimistic UI: Insert PENDING message into Room immediately; UI observes Room Flow.\n3. Outbox Sync: Expedited CoroutineWorker drains PENDING queue sequentially per conversation using a Mutex.\n4. Wakeup: High-priority data-only FCM message triggers WorkManager delta sync when backgrounded.'
  },
  {
    id: 'SD_02', labId: 'LAB 26', labTitle: 'System Design · 20+ Engineer Modularization', phase: 'Phase 6', type: 'System Design',
    question: 'How do you architect a 50-screen Android codebase for 25 engineers so build times stay under 30s and feature teams never block each other?',
    hint: '1. Strict :feature:x-api (interfaces, route contracts, domain models) vs :feature:x-impl (UI, ViewModels, Hilt bindings) split.\n2. Feature :impl modules depend ONLY on :api modules using Gradle implementation (never api) to preserve ABI compilation avoidance.\n3. Centralize Gradle configuration in build-logic Composite Build Convention Plugins.\n4. Wire cross-feature navigation via Hilt @IntoMap multibindings in :app.'
  },
  {
    id: 'SD_03', labId: 'LAB 11', labTitle: 'Deep Internals · Concurrent Token Refresh Stampede', phase: 'Phase 3', type: 'Deep Senior/Staff Internals',
    question: '5 concurrent API calls fail with HTTP 401 at the exact same millisecond. Walk through the exact concurrency primitive and state check needed so only ONE refresh call hits the server.',
    hint: '1. Inside Ktor Auth plugin or OkHttp Authenticator, acquire a Coroutine Mutex (or synchronized lock).\n2. Re-read the currently stored access token inside the lock and compare it against the failed request Authorization header.\n3. If they differ, another thread already refreshed it: immediately retry with the new token.\n4. If they match, execute the refresh call, persist the new token pair atomically in Encrypted DataStore, release the lock, and retry.'
  },
  {
    id: 'SD_04', labId: 'LAB 04', labTitle: 'Deep Internals · Compose Snapshot & Stability', phase: 'Phase 1', type: 'Deep Senior/Staff Internals',
    question: 'How does Jetpack Compose track state reads under the hood, and what happens at the bytecode level when the Compose Compiler infers a class as unstable?',
    hint: '1. Snapshot System: MutableState registers read observers in a thread-local Snapshot during Composition/Layout/Draw phases. Writing to State marks recorded RecomposeScopes as invalid.\n2. Bytecode: Stable classes allow the compiler to emit $changed bitmask comparisons and skip the composable body if inputs are equal.\n3. Unstable classes (e.g. var properties, java.util.List) force the compiler to mark parameters as uncertain, preventing skippability unless wrapped in @Immutable/@Stable or ImmutableList.'
  },
  {
    id: 'SD_05', labId: 'LAB 43', labTitle: 'Deep Internals · Binder IPC & TransactionTooLargeException', phase: 'Phase 4', type: 'Deep Senior/Staff Internals',
    question: 'Explain why TransactionTooLargeException occurs during onSaveInstanceState or IPC calls even when an individual Bundle is only 300KB, and how to architect around it.',
    hint: '1. Process-Wide Buffer: The Linux /dev/binder driver maps a single 1MB (1016KB) memory-mapped buffer shared across ALL concurrent in-flight Binder transactions for the entire process.\n2. If multiple async IPC calls, Broadcasts, or SavedState bundles are in flight simultaneously, their combined size exhausts the 1MB pool.\n3. Fix: Persist only lightweight entity IDs/cursors in SavedStateHandle (<10KB), keep heavy payloads in Room/disk, and pass large cross-process blobs via ParcelFileDescriptor / ashmem.'
  },
  {
    id: 'SD_06', labId: 'LAB 38', labTitle: 'System Design · Kotlin Multiplatform Boundaries', phase: 'Phase 7', type: 'System Design',
    question: 'You are migrating a flagship Android app to KMP for iOS. Where do you draw the sharing boundary, how do iOS SwiftUI views consume Kotlin StateFlows without memory leaks, and how do you handle SQLite threading?',
    hint: '1. Share Domain, Repositories, Ktor, Room KMP / SQLDelight, and Jetpack commonMain ViewModels.\n2. Use SKIE or KMP-NativeCoroutines to bridge Kotlin StateFlow to Swift AsyncSequence tied to SwiftUI .task {} lifecycle (auto-cancels on view disappear).\n3. Use BundledSQLiteDriver with WAL mode enabled and Dispatchers.IO for deterministic cross-platform database concurrency.'
  }
];

// High-Frequency Android & Kotlin Interview FAQ Reference Matrix (Section 6)
const HIGH_FREQUENCY_FAQ_MATRIX = [
  { topic: 'Coroutines: launch vs async', labId: 'LAB 01', question: 'What is the difference between launch and async regarding return values and uncaught exceptions?', answer: 'launch returns a Job and immediately propagates uncaught exceptions to the parent scope/UncaughtExceptionHandler. async returns a Deferred<T> and holds the exception until .await() is called, while still cancelling its parent if inside a regular coroutineScope.' },
  { topic: 'Flow: StateFlow vs SharedFlow', labId: 'LAB 02', question: 'When should you use StateFlow vs SharedFlow in a ViewModel?', answer: 'StateFlow requires an initial value, caches the latest item (replay=1), and skips duplicate emissions using Any.equals(): ideal for persistent UI state. SharedFlow has no initial value, configurable replay/buffer, and emits every event: ideal for one-off events or multi-subscriber broadcasts.' },
  { topic: 'Lifecycle: repeatOnLifecycle', labId: 'LAB 03', question: 'Why is repeatOnLifecycle(Lifecycle.State.STARTED) preferred over launchWhenStarted?', answer: 'launchWhenStarted only suspends the coroutine when the Activity stops, keeping upstream cold/callback Flows active in the background. repeatOnLifecycle cancels the coroutine on onStop() and restarts it on onStart(), releasing upstream resources.' },
  { topic: 'Compose: remember vs rememberSaveable', labId: 'LAB 04', question: 'How does remember differ from rememberSaveable?', answer: 'remember caches a value in the Compose SlotTable across recompositions but loses it on configuration changes and process death. rememberSaveable serializes the value into the Android SavedStateRegistry Bundle (or via a custom Saver), surviving both rotation and OS process death.' },
  { topic: 'State: ViewModel vs SavedStateHandle', labId: 'LAB 05', question: 'Why do you need SavedStateHandle if ViewModel already survives screen rotation?', answer: 'ViewModel lives in heap memory (NonConfigurationInstances) and survives rotation, but is completely destroyed when the OS kills the backgrounded app process under low memory. SavedStateHandle is backed by the system Bundle and survives OS process death.' },
  { topic: 'Hilt DI: @Binds vs @Provides', labId: 'LAB 07', question: 'Why prefer @Binds over @Provides when mapping an interface to its implementation?', answer: '@Binds is an abstract method declaration that requires no module instance allocation at runtime, generating significantly less Dagger/Hilt factory bytecode than @Provides.' },
  { topic: 'Room: @Transaction on @Relation', labId: 'LAB 10', question: 'Why must a Room query returning a @Relation POJO be annotated with @Transaction?', answer: 'Room resolves @Relation by running a primary SELECT query followed by separate child SELECT queries. @Transaction ensures all queries run inside a single atomic SQLite transaction so data cannot mutate between queries.' },
  { topic: 'Modularization: api vs implementation', labId: 'LAB 26', question: 'What is the difference between api() and implementation() in Gradle?', answer: 'api() leaks transitive dependencies onto consumers compile classpath, forcing all upstream modules to recompile whenever the dependency ABI changes. implementation() hides internal dependencies, enabling Gradle ABI compilation avoidance.' }
];

// Core Engineering Labs Dataset (LAB 01–LAB 50)
const CURRICULUM_LABS = [
  {
    id: 'LAB 01', num: 1, title: 'Kotlin Coroutines Internals Lab', phase: 'Phase 1', duration: '2 weeks',
    goal: 'Build a concurrent task execution engine from scratch using only Kotlin coroutines primitives: no libraries except coroutines-core. Understand what coroutines are at the machine and continuation state-machine level.',
    why: 'Most Android engineers use viewModelScope.launch without understanding suspending functions, continuation-passing style (CPS), coroutine context, dispatchers, or how Dispatchers.Main interacts with Android’s Main Looper.',
    concepts: ['Suspending functions and continuation-passing style (CPS) state machine compilation', 'CoroutineScope, CoroutineContext, Job, SupervisorJob', 'Dispatchers.IO, Dispatchers.Default, Dispatchers.Main vs Dispatchers.Main.immediate (Handler/Looper message queue dispatch vs immediate execution)', 'Structured concurrency & cooperative cancellation (isActive, ensureActive(), yield(), NonCancellable)', 'Exception handling: try/catch, CoroutineExceptionHandler, SupervisorScope', 'async/await vs launch, withContext, runBlocking, select {} racing, and custom CoroutineDispatcher'],
    problems: ['Task cancellation when user navigates away', 'Parallel API calls with aggregated results', 'Timeout handling with withTimeout', 'Preventing main-thread deadlocks'],
    edgeCases: ['1. Cancel parent scope: verify all children are cancelled', '2. Cancel child in SupervisorJob: verify siblings and parent survive', '3. Unhandled exception in launch vs async (.await())', '4. Coroutine holding a lock gets cancelled: cleanup in finally with NonCancellable', '5. Racing two coroutines with select {}: take whichever finishes first', '6. Deliberate deadlock demonstration using runBlocking on Main thread'],
    constraints: 'Zero Android dependencies (pure JVM/Kotlin module); all logic testable with runTest and TestCoroutineScheduler; 100% branch coverage; benchmark 1000 coroutines vs 1000 threads.',
    repoTree: 'coroutines-internals-lab/\n├── core/ (TaskEngine.kt, CancellationDemo.kt, ExceptionHandlingDemo.kt, ParallelExecutionDemo.kt, SelectDemo.kt)\n├── benchmark/ (CoroutineVsThreadBenchmark.kt)\n├── test/ (TaskEngineTest.kt, CancellationTest.kt, ExceptionTest.kt)\n└── README.md (with ADRs)',
    deepQuestions: [
      'Walk through the exact Java bytecode state machine (label switch, ContinuationImpl, COROUTINE_SUSPENDED token) generated for a suspend function with 3 suspension points.',
      'Why does catching Exception(e) inside a loop break structured cancellation, and how do you safely run a suspending cleanup call inside a finally {} block?',
      'How does Dispatchers.Main.immediate avoid posting a Runnable to the Android Handler MessageQueue compared to Dispatchers.Main, and when can it cause subtle UI re-entrancy bugs?',
      'What happens internally in JobSupport when a child coroutine launched via async throws an uncaught exception inside a standard coroutineScope vs a supervisorScope?'
    ],
    commonFaqs: [
      'What is the difference between launch and async/await in Kotlin Coroutines?',
      'What is the difference between Dispatchers.IO, Dispatchers.Default, and Dispatchers.Main?',
      'Why is GlobalScope discouraged in production Android apps?',
      'What is the difference between SupervisorJob and a regular Job?',
      'How does withContext() differ from launching a new coroutine?'
    ],
    resources: [
      { title: 'Kotlin Official Coroutines Guide', url: 'https://kotlinlang.org/docs/coroutines-guide.html', type: 'Official Docs' },
      { title: 'Android Coroutines Best Practices', url: 'https://developer.android.com/kotlin/coroutines/coroutines-best-practices', type: 'Android Docs' },
      { title: 'KEEP Coroutines Design Specification (CPS Internals)', url: 'https://github.com/Kotlin/KEEP/blob/master/proposals/coroutines.md', type: 'Specification' },
      { title: 'kotlinx.coroutines Source (JobSupport.kt)', url: 'https://github.com/Kotlin/kotlinx.coroutines', type: 'Source Code' }
    ],
    checklist: ['Can explain continuation-passing style without referencing a tutorial', 'Can implement withTimeout behavior manually using select', 'Can debug a coroutine deadlock by reading the coroutine dump', 'Can write a custom CoroutineDispatcher from scratch', 'All tests pass using virtual time without Thread.sleep()']
  },
  {
    id: 'LAB 02', num: 2, title: 'Kotlin Flow Mastery Lab', phase: 'Phase 1', duration: '2 weeks',
    goal: 'Build a real-time data pipeline system: like a stock ticker or sensor aggregator: that exercises every major Flow operator and the full hot/cold stream distinction.',
    why: 'Flow is the backbone of reactive Android apps. Most engineers use collect and map and think they know Flow. This lab forces you into flatMapLatest, combine, merge, zip, conflate, buffer, backpressure, and StateFlow/SharedFlow contracts.',
    concepts: ['Cold vs Hot streams (conceptually and mechanically)', 'Flow builders: flow {}, flowOf(), channelFlow {}, callbackFlow {}', 'Intermediate operators: map, filter, transform, flatMapLatest, flatMapMerge, flatMapConcat, zip, combine, merge', 'StateFlow (conflated state holder) vs SharedFlow (configurable replay/buffer for events)', 'Backpressure: buffer(), conflate(), collectLatest()', 'distinctUntilChanged(), debounce(), custom throttleFirst(), flowOn upstream context switching, catch & onCompletion'],
    problems: ['Search bar debounce cancelling previous in-flight search', 'Combining user data + preferences + network stream into a single UI state', 'Wrapping callback APIs safely with callbackFlow and awaitClose'],
    edgeCases: ['1. StateFlow with slow collector dropping intermediate values', '2. SharedFlow with replay buffering events for late subscribers', '3. flatMapLatest cancelling in-flight coroutine on new emission', '4. Upstream exception recovery with catch', '5. callbackFlow awaitClose cleanup verification on scope cancellation'],
    constraints: 'All pipeline stages are pure functions returning Flow; tested deterministically with CashApp Turbine.',
    deepQuestions: [
      'Why does StateFlow use equality-based conflation (Any.equals) while SharedFlow does not, and what bug occurs if you mutate a list in-place inside a StateFlow value?',
      'How does flowOn() change the upstream execution context using a Channel fuse (ChannelFlowOperator) without leaking threads downstream?',
      'Explain the exact difference between stateIn(SharingStarted.WhileSubscribed(5000)) and Lazily during an Android configuration change vs home-button backgrounding.',
      'What happens inside callbackFlow if the callback fires faster than the downstream collector can process, and how do trySend vs send + buffer() behave?'
    ],
    commonFaqs: [
      'What is the difference between a Cold Flow and a Hot Flow (StateFlow / SharedFlow)?',
      'When should you use StateFlow vs SharedFlow in an Android ViewModel?',
      'What is the difference between flatMapLatest, flatMapMerge, and flatMapConcat?',
      'What is the difference between combine() and zip() in Kotlin Flow?',
      'Why is awaitClose {} mandatory at the end of a callbackFlow builder?'
    ],
    resources: [
      { title: 'Kotlin Official Asynchronous Flow Guide', url: 'https://kotlinlang.org/docs/flow.html', type: 'Official Docs' },
      { title: 'StateFlow and SharedFlow on Android', url: 'https://developer.android.com/kotlin/flow/stateflow-and-sharedflow', type: 'Android Docs' },
      { title: 'CashApp Turbine Flow Testing Library', url: 'https://github.com/cashapp/turbine', type: 'Testing Library' }
    ],
    checklist: ['Tested every operator independently with Turbine', 'Built a custom throttleFirst Flow operator', 'Verified callbackFlow awaitClose unregisters listeners on cancellation', 'Combined 3+ flows into a single sealed UI state']
  },
  {
    id: 'LAB 03', num: 3, title: 'Android Lifecycle & State Mastery Lab', phase: 'Phase 1', duration: '1.5 weeks',
    goal: 'Build a "Lifecycle & Looper Observatory": an app that visually logs every lifecycle event across Process, Activity, Fragment, ViewModel, Compose, and the main thread Looper/MessageQueue.',
    why: 'Lifecycle bugs are the #1 source of Android crashes and data loss. Engineers who cannot explain onSaveInstanceState vs rememberSaveable vs ViewModel or how ActivityThread schedules lifecycle messages on the Main Looper will ship broken apps.',
    concepts: ['Activity full lifecycle: onCreate -> onStart -> onResume -> onPause -> onStop -> onDestroy', 'Fragment lifecycle vs Fragment.viewLifecycleOwner', 'Main Thread Loop Internals: ActivityThread, Looper.getMainLooper(), MessageQueue, Handler, and Choreographer frame callbacks', 'ViewModel lifecycle vs Process death survival (SavedStateHandle)', 'repeatOnLifecycle(Lifecycle.State.STARTED) vs launchWhenStarted', 'Back stack behavior: addToBackStack, popBackStack, launchSingleTop'],
    problems: ['ViewModel survives rotation but UI state is lost on process death: fix with SavedStateHandle', 'Fragment observer registered multiple times on rotation: fix with viewLifecycleOwner', 'Preventing duplicate network calls in onResume'],
    edgeCases: ['1. Rotate while a dialog is showing', '2. Background app and simulate process kill via Developer Options / ADB', '3. Navigate back and forward between fragments verifying callback order', '4. lifecycleScope.launch in onStart behavior on stop/re-start'],
    constraints: 'Tested with ActivityScenario and FragmentScenario across rotation and recreation.',
    deepQuestions: [
      'How does ComponentActivity retain ViewModelStore across a configuration change via NonConfigurationInstances without serializing it to a Bundle?',
      'Why did launchWhenStarted waste background resources with suspended producers, and how does repeatOnLifecycle(Lifecycle.State.STARTED) solve it by cancelling and restarting collection?',
      'How does Android’s Choreographer use VSYNC pulse callbacks on the Main Looper MessageQueue to coordinate input, animation, and traversal phases?'
    ],
    commonFaqs: [
      'Walk through the Activity lifecycle callbacks when rotating the screen vs pressing the Home button.',
      'Why does a Fragment have two lifecycles (Fragment vs viewLifecycleOwner), and which one should observe Flows?',
      'How does a ViewModel survive configuration changes, and when is onCleared() called?',
      'When is onSaveInstanceState() called vs not called?'
    ],
    resources: [
      { title: 'Android Activity Lifecycle Guide', url: 'https://developer.android.com/guide/components/activities/activity-lifecycle', type: 'Android Docs' },
      { title: 'ViewModel Overview & Lifecycle Scope', url: 'https://developer.android.com/topic/libraries/architecture/viewmodel', type: 'Android Docs' },
      { title: 'UI State Production & Saving State', url: 'https://developer.android.com/topic/libraries/architecture/saving-states', type: 'Android Docs' }
    ],
    checklist: ['Visualized Activity, Fragment, ViewModel, and Compose lifecycle callbacks', 'Traced Main Looper message ordering during lifecycle transitions', 'Verified zero duplicate Flow collectors across 10 rotations']
  },
  {
    id: 'LAB 04', num: 4, title: 'Jetpack Compose State Deep Dive Lab', phase: 'Phase 1', duration: '2 weeks',
    goal: 'Build a complex 10+ field form and real-time data dashboard in Compose with meticulous attention to recomposition, stability, state hoisting, phase deferral, and side effects.',
    why: 'Compose performance issues almost always come from poor state design, unstable parameters, reading state in the wrong phase, or misused side effects.',
    concepts: ['Recomposition fundamentals & Compose Stability system (@Stable, @Immutable)', 'remember vs rememberSaveable (with custom Saver) vs derivedStateOf', 'State hoisting pattern to lowest common ancestor', 'Side effects: LaunchedEffect, DisposableEffect, SideEffect, produceState, snapshotFlow', 'Compose 3 Phases: Composition -> Layout -> Drawing (deferring state reads via lambda modifiers)', 'CompositionLocal scoped parameters & AndroidView interop'],
    problems: ['Form with 10+ fields recomposing every field on each keystroke: fix with derivedStateOf and state hoisting', 'List with unstable items causing full list recomposition: fix with @Immutable/@Stable models'],
    edgeCases: ['1. remember inside a loop when list size changes', '2. DisposableEffect key changes: verify cleanup before re-run', '3. rememberSaveable with custom Saver for sealed classes', '4. Counting recompositions using a SideEffect counter in tests'],
    constraints: 'Verify with Layout Inspector and ComposeTestRule that unrelated composables do NOT recompose; include Paparazzi screenshot tests.',
    deepQuestions: [
      'What is the exact difference between derivedStateOf {} and remember(key) {}, and why does combining them or misusing derivedStateOf on synchronous key changes degrade performance?',
      'How does reading a scroll offset inside Modifier.offset(y = ...) vs Modifier.offset { IntOffset(0, scroll) } skip the Composition phase entirely and jump straight to Layout?',
      'How does staticCompositionLocalOf differ from compositionLocalOf when the provided value changes?'
    ],
    commonFaqs: [
      'What is the difference between remember and rememberSaveable in Jetpack Compose?',
      'What is State Hoisting and why does it make Composables reusable and testable?',
      'What is the difference between LaunchedEffect, DisposableEffect, and SideEffect?',
      'What are the three rendering phases of a Jetpack Compose frame?',
      'What makes a class @Stable or @Immutable in Compose?'
    ],
    resources: [
      { title: 'State and Jetpack Compose Official Docs', url: 'https://developer.android.com/develop/ui/compose/state', type: 'Android Docs' },
      { title: 'Side-Effects in Compose', url: 'https://developer.android.com/develop/ui/compose/side-effects', type: 'Android Docs' },
      { title: 'Jetpack Compose Phases & Stability', url: 'https://developer.android.com/develop/ui/compose/phases', type: 'Android Docs' }
    ],
    checklist: ['Eliminated all unstable classes in Compose Compiler metrics report', 'Used derivedStateOf to prevent unnecessary form/scroll recompositions', 'Implemented custom Saver with rememberSaveable']
  },
  {
    id: 'LAB 05', num: 5, title: 'Process Death & Saved State Lab', phase: 'Phase 1', duration: '1 week',
    goal: 'Build an app that perfectly survives arbitrary OS process death in all UI scenarios: multi-step forms, lists, navigation back stack, bottom sheets, and dialogs.',
    why: 'Process death happens constantly on low-memory devices when backgrounded. ViewModels and singletons are wiped; only SavedStateHandle / Bundle survives.',
    concepts: ['What survives process death (Bundle/SavedStateHandle) vs what dies (ViewModel memory, singletons)', 'Simulating process death via adb shell am kill', 'Bundle capacity limits (~1MB shared Binder buffer / TransactionTooLargeException)', 'Best practice: persist minimal IDs/inputs in SavedStateHandle and re-hydrate data from Room', 'StateRestorationTester in Compose UI tests'],
    problems: ['User fills a 5-step wizard, backgrounds app, OS kills process, user returns -> all 5 steps intact', 'Restoring screen 3 of a 4-screen navigation flow after process death'],
    edgeCases: ['1. 5-step form restoration after adb shell am kill', '2. Deliberately exceeding Bundle limit with a Bitmap to observe TransactionTooLargeException and fixing it', '3. Process death during a background WorkManager job'],
    constraints: 'Every screen verified via automated StateRestorationTester utility and adb shell am kill.',
    deepQuestions: [
      'How does SavedStateRegistry wire together ComponentActivity, NavBackStackEntry, rememberSaveable, and ViewModel SavedStateHandle into a single hierarchical Bundle during onSaveInstanceState?',
      'Why does SavedStateHandle.getStateFlow(key, initialValue) automatically persist mutations to the Bundle without requiring manual onSaveInstanceState overrides?'
    ],
    commonFaqs: [
      'What is Process Death in Android, and how can you simulate it during development?',
      'What survives Process Death and what gets wiped from memory?',
      'Why shouldn’t you store large lists or Bitmaps inside a Bundle or SavedStateHandle?'
    ],
    resources: [
      { title: 'SavedStateHandle Module for ViewModel', url: 'https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate', type: 'Android Docs' },
      { title: 'Save UI State in Compose & View Systems', url: 'https://developer.android.com/topic/libraries/architecture/saving-states', type: 'Android Docs' }
    ],
    checklist: ['All screens pass StateRestorationTester checks', 'Tested full multi-screen flow survival with adb shell am kill', 'Persisted minimal state in SavedStateHandle paired with Room cache']
  },
  {
    id: 'LAB 06', num: 6, title: 'Navigation Architecture Lab', phase: 'Phase 2', duration: '2 weeks',
    goal: 'Build a multi-screen, multi-flow app using Navigation Compose with Kotlin @Serializable type-safe routes, deep links, auth guards, shared element transitions, and multi-backstack bottom tabs.',
    why: 'Production navigation requires type-safe arguments, conditional auth redirection, returning results to previous screens, and isolated tab back stacks.',
    concepts: ['Navigation Compose type-safe routes (@Serializable data classes/objects)', 'Nested navigation graphs (Auth flow, Main flow, Settings flow)', 'NavOptions: popUpTo, inclusive = true, launchSingleTop, saveState, restoreState', 'Conditional navigation (Auth Guard redirecting to login and resuming original destination)', 'Returning results via previousBackStackEntry.savedStateHandle', 'SharedTransitionLayout with Navigation Compose'],
    problems: ['Bottom nav tabs maintaining separate back stacks', 'Auth guard intercepting protected deep links and redirecting back after login', 'Clearing entire back stack on logout'],
    edgeCases: ['1. Deep link to screen requiring authentication', '2. Rapid double-tap navigation prevented via launchSingleTop', '3. Back press behavior across nested navigation graphs', '4. Navigation state survival across process death'],
    constraints: 'Zero hardcoded route strings; navigation calls abstracted out of Composable functions via a Navigator contract.',
    deepQuestions: [
      'What is the lifecycle of a NavBackStackEntry, and how does scoping a ViewModel to a parent nested navigation graph share state across a multi-screen checkout flow without leaking it globally?',
      'How do saveState = true and restoreState = true in NavOptions serialize and swap separate back stacks when switching Bottom Navigation tabs?'
    ],
    commonFaqs: [
      'Why should you pass only item IDs through Navigation arguments instead of full data objects?',
      'What does popUpTo(route) { inclusive = true } do when navigating after login or logout?',
      'What does launchSingleTop = true prevent in Navigation Compose?',
      'How do you return a result from Screen B back to Screen A in Navigation Compose?'
    ],
    resources: [
      { title: 'Navigation with Compose (Type-Safe Kotlin DSL)', url: 'https://developer.android.com/develop/ui/compose/navigation', type: 'Android Docs' },
      { title: 'Design Navigation Graphs & Nested Flows', url: 'https://developer.android.com/guide/navigation/design', type: 'Android Docs' }
    ],
    checklist: ['All routes use Kotlin @Serializable type-safe definitions', 'Bottom navigation maintains separate back stacks across tabs', 'Auth guard tested with TestNavHostController']
  },
  {
    id: 'LAB 07', num: 7, title: 'Dependency Injection Mastery Lab (Hilt)', phase: 'Phase 2', duration: '1.5 weeks',
    goal: 'Build a multi-module application where Hilt wires 10+ modules using custom scopes, @AssistedInject runtime factories, @Multibinds plugin maps, and @TestInstallIn replacements.',
    why: 'Production DI requires understanding Hilt’s generated component hierarchy, scoping memory lifecycle, and wiring across module boundaries.',
    concepts: ['Hilt Component hierarchy: SingletonComponent -> ActivityRetainedComponent -> ActivityComponent -> ViewModelComponent', 'Scopes: @Singleton, @ActivityRetainedScoped, @ViewModelScoped', '@Binds vs @Provides & @Qualifier / @Named disambiguation', 'Assisted injection (@AssistedInject, @AssistedFactory) with @HiltViewModel', '@Multibinds (@IntoSet, @IntoMap) for decoupled plugin registries', '@EntryPoint for non-Hilt classes & @TestInstallIn / @UninstallModules for testing'],
    problems: ['Injecting a runtime userId parameter into a ViewModel via @AssistedInject', 'Feature modules registering themselves into a central plugin Map without app module knowing their internals'],
    edgeCases: ['1. Scoping bug: preventing Singleton from holding Activity-scoped references', '2. Breaking circular dependencies using Lazy<T> or Provider<T>', '3. Replacing real network client with a Fake across all modules in @HiltAndroidTest'],
    constraints: 'Every dependency bound via interface; zero manual object construction inside ViewModels.',
    deepQuestions: [
      'Why does @Binds generate less bytecode than @Provides in Dagger/Hilt, and how does Hilt aggregate @InstallIn modules across separate Gradle subprojects at compile time?',
      'What happens to memory if you scope a heavy repository as @Singleton vs @ActivityRetainedScoped vs @ViewModelScoped?'
    ],
    commonFaqs: [
      'What is the difference between @Binds and @Provides in Hilt?',
      'When do you use @Qualifier or @Named annotations in Dependency Injection?',
      'What is @AssistedInject and when do you need it with a ViewModel?',
      'What is the difference between injecting Lazy<T> vs Provider<T>?'
    ],
    resources: [
      { title: 'Dependency Injection with Hilt Official Guide', url: 'https://developer.android.com/training/dependency-injection/hilt-android', type: 'Android Docs' },
      { title: 'Dagger & Hilt Component Hierarchy & Scopes', url: 'https://dagger.dev/hilt/components.html', type: 'Official Docs' }
    ],
    checklist: ['Implemented @Multibinds feature plugin map', 'Used @AssistedInject inside a @HiltViewModel', 'Replaced production modules with Fakes using @TestInstallIn']
  },
  {
    id: 'LAB 08', num: 8, title: 'Clean Architecture + Domain Modeling Lab', phase: 'Phase 2', duration: '2 weeks',
    goal: 'Build the business logic core of a Budget Tracker app with strict Clean Architecture: domain entities, use cases, repository contracts, and typed error modeling: with zero Android dependencies in :domain.',
    why: 'Clean Architecture is often cargo-culted. Enforcing the Dependency Rule with a pure Kotlin :domain module guarantees fast JVM unit tests and clear boundaries.',
    concepts: ['The Dependency Rule: dependencies point strictly inward toward :domain', 'Domain layer: entities, value classes, use cases, repository interfaces (ZERO Android imports)', 'Three distinct model layers: Network DTO <-> Room Entity <-> Domain Entity <-> UI Model', 'Typed error modeling: Result<T> / Either<DomainError, T> sealed hierarchies instead of throwing generic Exceptions', 'Contract testing repository interfaces with in-memory Fakes'],
    problems: ['Enforcing business rule: "Free tier max 10 budget categories; amount must be positive and < 1B" inside pure domain logic', 'Clean mapping across Data, Domain, and Presentation boundaries'],
    edgeCases: ['1. Domain validation failure returning typed DomainError without throwing exceptions', '2. Aggregating partial failures from two repositories inside a Use Case'],
    constraints: ':domain is a pure Kotlin JVM module; Use Cases expose operator fun invoke(); 100% unit test coverage in :domain with zero mocks.',
    deepQuestions: [
      'When does adding a Use Case layer provide genuine architectural value vs becoming redundant pass-through boilerplate, and how does Google’s official Domain Layer guidance address this?',
      'Why should expected domain/network errors be modeled as sealed Result types rather than throwing Exceptions across suspend boundaries?'
    ],
    commonFaqs: [
      'What are the three layers of Clean Architecture on Android and what belongs in each?',
      'What is the Dependency Rule in Clean Architecture?',
      'Why do we separate Network DTOs, Database Entities, and Domain Models instead of using one class with @SerializedName and @Entity?'
    ],
    resources: [
      { title: 'Guide to Android App Architecture', url: 'https://developer.android.com/topic/architecture', type: 'Android Docs' },
      { title: 'Domain Layer Architecture Guidance', url: 'https://developer.android.com/topic/architecture/domain-layer', type: 'Android Docs' }
    ],
    checklist: [':domain module compiles as pure Kotlin JVM with zero Android dependencies', '100% unit test coverage on all Use Cases without mocking libraries', 'Repository contracts tested against in-memory Fake implementations']
  },
  {
    id: 'LAB 09', num: 9, title: 'MVI Architecture Lab', phase: 'Phase 2', duration: '1.5 weeks',
    goal: 'Implement an MVI (Model-View-Intent) architecture from scratch: no third-party MVI libraries: for an offline-capable news reader with pull-to-refresh, pagination, and optimistic updates.',
    why: 'Understanding UDF and state reduction from first principles lets you debug any state race condition and reason about every valid state transition.',
    concepts: ['Unidirectional Data Flow (UDF): single source of truth, immutable state', 'MVI contract: State, Intent/Event, SideEffect', 'Pure state reduction: reduce(currentState, result) -> newState', 'StateFlow for persistent UI state, Channel/SharedFlow for one-time Effects', 'Optimistic updates with automatic rollback on network error'],
    problems: ['Showing cached stale data with a non-intrusive error banner when refresh fails', 'Optimistic bookmark toggle that reverts cleanly if server returns 500'],
    edgeCases: ['1. Two rapid concurrent intents processed sequentially without state race conditions', '2. One-time navigation effect emitted before UI is STARTED (no lost events)', '3. Screen rotation during in-flight loading preserving exact state'],
    constraints: 'Zero external MVI libraries; reducer functions must be 100% pure and unit-tested.',
    deepQuestions: [
      'If two asynchronous coroutines inside a ViewModel call _state.value = _state.value.copy(...) concurrently, how can a state update be lost, and how does MutableStateFlow.update {} (CAS loop) or a serialized intent channel prevent it?',
      'Compare modeling one-time UI events as a Channel(BUFFERED) vs incorporating them into UI State with an eventId + onEventConsumed() callback.'
    ],
    commonFaqs: [
      'What is Unidirectional Data Flow (UDF) in Android architecture?',
      'What is the difference between MVVM and MVI on Android?',
      'What are State, Intent, and SideEffect in MVI?'
    ],
    resources: [
      { title: 'UI Layer & Unidirectional Data Flow', url: 'https://developer.android.com/topic/architecture/ui-layer', type: 'Android Docs' },
      { title: 'UI Events & State Holders Best Practices', url: 'https://developer.android.com/topic/architecture/ui-layer/events', type: 'Android Docs' }
    ],
    checklist: ['Built custom MVI engine with pure reducer functions', '100% unit test coverage on all Intent -> State transitions', 'Verified one-time Effects survive rotation without re-firing']
  },
  {
    id: 'LAB 10', num: 10, title: 'Raw SQLite to Room Database Deep Dive Lab', phase: 'Phase 3', duration: '2 weeks',
    goal: 'Build a complete local data layer for a task manager: first implementing a raw SQLiteOpenHelper + Cursor + ContentValues engine from first principles, then migrating to Room with FTS4, relations, migrations, and EXPLAIN QUERY PLAN profiling.',
    why: 'Understanding raw SQLite cursors, transactions, CursorWindow limits, and Write-Ahead Logging (WAL) makes Room’s KSP-generated code and query optimization completely transparent.',
    concepts: ['First-Principles SQLite Layer: SQLiteOpenHelper, beginTransactionNonExclusive(), Cursor (2MB CursorWindow limit), ContentValues', 'Room @Database, @Entity, @Dao, @TypeConverter & inspecting KSP-generated _Impl classes', 'Relations: @Embedded, @Relation (one-to-many, many-to-many) with @Transaction', 'Migrations: manual Migration(1, 2), @AutoMigration, and MigrationTestHelper', 'Full-Text Search (@Fts4), composite @Index, WAL mode concurrency, and EXPLAIN QUERY PLAN'],
    problems: ['Benchmarking 5,000 bulk inserts: individual inserts vs manual transaction vs Room @Transaction', 'Full-text search across 50,000 notes in <10ms using @Fts4', 'Migrating schema v1 -> v4 adding a non-null column without data loss'],
    edgeCases: ['1. Sequential migration v1 -> v2 -> v3 -> v4 verified with MigrationTestHelper', '2. Concurrent reads and writes under WAL mode', '3. Escaping special Unicode characters in FTS4 queries', '4. Why @Relation queries require @Transaction to prevent inconsistent snapshots'],
    constraints: 'All DAO tests use in-memory Room DB; migrations verified with MigrationTestHelper; all queries analyzed with EXPLAIN QUERY PLAN.',
    deepQuestions: [
      'How does Room’s InvalidationTracker detect table modifications using SQLite triggers/temp tables and emit new values to downstream Flow collectors?',
      'Why does inserting 5,000 rows individually take seconds while wrapping them in a single SQLite transaction takes milliseconds at the disk fsync / WAL journal level?',
      'Why must a Room DAO method returning a @Relation POJO be annotated with @Transaction?'
    ],
    commonFaqs: [
      'How do you perform a database schema migration in Room without losing user data?',
      'What is a @TypeConverter in Room and when is it used?',
      'How do you model One-to-Many and Many-to-Many relationships in Room?',
      'How do database indices (@Index) speed up SELECT queries, and what is their cost on INSERT/UPDATE?'
    ],
    resources: [
      { title: 'Save Data in a Local Database Using Room', url: 'https://developer.android.com/training/data-storage/room', type: 'Android Docs' },
      { title: 'Migrate Your Room Database & MigrationTestHelper', url: 'https://developer.android.com/training/data-storage/room/migrating-db-versions', type: 'Android Docs' },
      { title: 'SQLite Write-Ahead Logging (WAL) Internals', url: 'https://www.sqlite.org/wal.html', type: 'SQLite Docs' }
    ],
    checklist: ['Built raw SQLiteOpenHelper CRUD + transaction benchmark first', 'Implemented Room @Fts4 search and composite indices', 'Verified sequential v1->v4 migrations with MigrationTestHelper', 'Documented EXPLAIN QUERY PLAN results in README']
  },
  {
    id: 'LAB 11', num: 11, title: 'Networking & API Client Lab (Ktor + Retrofit)', phase: 'Phase 3', duration: '2 weeks',
    goal: 'Build parallel production-grade API clients with Ktor and Retrofit/OkHttp covering Mutex-synchronized token refresh, exponential backoff retry, SSL pinning, caching, and multipart upload progress.',
    why: 'Production networking requires handling simultaneous 401 token expirations without refresh stampedes, resilient retries, and strict certificate pinning.',
    concepts: ['Ktor Client plugins & engines vs Retrofit + OkHttp Interceptors/Authenticator', 'Atomic Token Refresh using a Coroutine Mutex so parallel 401 calls wait for a single refresh request', 'Exponential backoff with jitter retry on 5xx / IOException', 'SSL/TLS Certificate & Public Key (SPKI SHA-256) Pinning', 'Multipart file upload with byte-progress Flow'],
    problems: ['Two or more parallel requests receive 401 simultaneously -> only ONE token refresh executes while others wait and retry transparently', 'Failing securely when a MITM proxy intercepts traffic'],
    edgeCases: ['1. Parallel 401 requests synchronized via Mutex', '2. Refresh token itself is expired (401 on refresh endpoint) -> trigger clean logout', '3. Server returns HTTP 200 OK containing an application-level error payload', '4. Network switch (WiFi -> Cellular) mid-upload'],
    constraints: 'Tested deterministically with OkHttp MockWebServer simulating 401 stampedes, slow networks, and invalid SSL certs.',
    deepQuestions: [
      'What is the exact architectural difference between an OkHttp Application Interceptor (addInterceptor) and a Network Interceptor (addNetworkInterceptor) regarding redirects, retries, and caching?',
      'Why should you add random jitter to exponential backoff retry intervals in mobile clients?'
    ],
    commonFaqs: [
      'How do you attach an Authorization Bearer token to every request and refresh it automatically on HTTP 401?',
      'How does OkHttp HTTP response caching work with Cache-Control headers?',
      'How do you upload a file using Multipart in Retrofit or Ktor?'
    ],
    resources: [
      { title: 'Ktor Client Official Documentation', url: 'https://ktor.io/docs/client-create-new-application.html', type: 'Official Docs' },
      { title: 'OkHttp Interceptors & Authenticators Architecture', url: 'https://square.github.io/okhttp/features/interceptors/', type: 'Library Docs' },
      { title: 'Android Network Security Configuration & Pinning', url: 'https://developer.android.com/privacy-and-security/security-config', type: 'Android Docs' }
    ],
    checklist: ['Verified single-flight 401 token refresh under parallel load with MockWebServer', 'Implemented exponential backoff retry interceptor/plugin', 'Configured SHA-256 public key pinning with backup pin']
  },
  {
    id: 'LAB 12', num: 12, title: 'Offline-First Architecture Lab', phase: 'Phase 3', duration: '2.5 weeks',
    goal: 'Build a Notes app that works 100% offline with Room as the Single Source of Truth (SSOT), optimistic local updates, dirty-flag/tombstone tracking, background WorkManager sync, and conflict resolution.',
    why: 'Offline-first is the gold standard for mobile UX. The UI never awaits network calls directly; it observes local persistence while a sync engine reconciles remote state.',
    concepts: ['Single Source of Truth (SSOT): UI reads exclusively from Room Flow', 'Dirty flag pattern (isSynced = false) & Tombstoning (isDeleted = true soft deletes)', 'Pull-then-Push delta sync engine orchestrated by WorkManager', 'Conflict resolution strategies: Last-Write-Wins, Server-Wins, Client-Wins, and user Merge UI', 'Sync markers: updatedAt timestamps / version numbers'],
    problems: ['User creates/edits/deletes notes offline, comes online -> synced automatically in background', 'User edits the same note on two devices -> version conflict detected and resolved'],
    edgeCases: ['1. First sync with 500 records handled in batched transactions', '2. Sync fails mid-way -> database remains consistent (atomic batch)', '3. User logs out while sync is running -> cancel worker and wipe local tables', '4. Server returns newer version of a locally dirty record (conflict detection)'],
    constraints: 'UI layer never reads from network directly; full offline-edit-to-online-sync flow covered by integration tests.',
    deepQuestions: [
      'Why must a delta sync engine execute Pull (fetching remote changes since last changeListVersion) BEFORE Push (uploading locally dirty rows), and how do you avoid overwriting unsynced local edits during the Pull phase?',
      'Why are wall-clock device timestamps dangerous for Last-Write-Wins conflict resolution, and how do server sequence numbers or version vectors solve clock skew?'
    ],
    commonFaqs: [
      'What does Single Source of Truth (SSOT) mean in an offline-first Android app?',
      'Why do we use a soft-delete Tombstone flag instead of deleting rows immediately when the user is offline?',
      'What is an optimistic UI update and how do you handle rollback if the server rejects it?'
    ],
    resources: [
      { title: 'Build an Offline-First App (Official Android Architecture)', url: 'https://developer.android.com/topic/architecture/data-layer/offline-first', type: 'Android Docs' },
      { title: 'Now in Android Sync Engine Reference Implementation', url: 'https://github.com/android/nowinandroid/tree/main/sync/work', type: 'Source Code' }
    ],
    checklist: ['UI observes Room Flow exclusively (strict SSOT)', 'Implemented dirty flags and tombstone soft deletes', 'Built and tested conflict resolution for concurrent edits']
  },
  {
    id: 'LAB 13', num: 13, title: 'DataStore & Preferences Lab', phase: 'Phase 3', duration: '1 week',
    goal: 'Replace all SharedPreferences usage with Preferences DataStore and Proto DataStore, migrating legacy data seamlessly and encrypting sensitive preferences.',
    why: 'SharedPreferences blocks the main thread on apply() during Activity.onStop() (causing ANRs), lacks type/schema safety, and has no transactional guarantees.',
    concepts: ['Why SharedPreferences is unsafe (main-thread fsync ANRs, no schema safety)', 'Preferences DataStore vs Proto DataStore (Protocol Buffers schema)', 'SharedPreferencesMigration for zero-data-loss migration', 'Encrypting Proto DataStore Serializer with Android Keystore / Tink', 'ReplaceFileCorruptionHandler for corrupted disk files'],
    problems: ['Migrating legacy SharedPreferences keys into DataStore on first launch', 'Storing structured user session and feature flags with type safety'],
    edgeCases: ['1. Legacy SharedPreferences migration preserving all existing values', '2. Concurrent edit {} writes guaranteeing FIFO transactional consistency', '3. Proto schema evolution adding a new field with default value'],
    constraints: 'Zero SharedPreferences remaining; 100% coroutine test coverage.',
    deepQuestions: [
      'Explain the exact mechanism by which SharedPreferences.apply() causes main-thread ANRs inside ActivityThread.handleStopActivity() (QueuedWork.waitToFinish()), and how Jetpack DataStore avoids it.',
      'Why does creating two DataStore instances pointing to the same file in the same process throw an IllegalStateException, and how does DataStore enforce single-actor file consistency?'
    ],
    commonFaqs: [
      'What are the main advantages of Jetpack DataStore over SharedPreferences?',
      'What is the difference between Preferences DataStore and Proto DataStore?',
      'How do you migrate existing SharedPreferences data into DataStore?'
    ],
    resources: [
      { title: 'Jetpack DataStore Official Guide', url: 'https://developer.android.com/topic/libraries/architecture/datastore', type: 'Android Docs' },
      { title: 'Protocol Buffers Language Guide (Proto3)', url: 'https://protobuf.dev/programming-guides/proto3/', type: 'Official Docs' }
    ],
    checklist: ['Migrated legacy SharedPreferences using SharedPreferencesMigration', 'Implemented typed Proto DataStore schema', 'Added encryption and corruption handler tests']
  },
  {
    id: 'LAB 14', num: 14, title: 'Android Permissions System Lab', phase: 'Phase 4', duration: '1.5 weeks',
    goal: 'Build a unified permissions framework handling location (coarse/fine/background), camera, microphone, media (Photo Picker vs granular permissions), Bluetooth (Android 12+), and notifications (Android 13+).',
    why: 'Android’s permission model evolves every API level. Mishandling rationale dialogs, permanent denial, or incremental location escalation leads to broken UX and Play Store rejections.',
    concepts: ['ActivityResultContracts.RequestPermission & RequestMultiplePermissions', 'shouldShowRequestPermissionRationale lifecycle', 'Detecting permanent denial & deep-linking to Settings.ACTION_APPLICATION_DETAILS_SETTINGS', 'Incremental location: requesting foreground location first, then ACCESS_BACKGROUND_LOCATION separately', 'Android 12+ BLUETOOTH_SCAN / CONNECT & Approximate Location', 'Android 13+ POST_NOTIFICATIONS & READ_MEDIA_IMAGES'],
    problems: ['Requesting camera permission -> denied -> rationale -> permanently denied -> Settings deep link', 'Handling Approximate Location gracefully when user declines Fine Location'],
    edgeCases: ['1. User revokes permission in OS Settings while app is in background', '2. Device lacks camera hardware (FEATURE_CAMERA check)', '3. Process death while system permission dialog is displayed'],
    constraints: 'Clean permission state holder decoupled from UI screens.',
    deepQuestions: [
      'Why does Android kill and recreate your app process when the user revokes a runtime permission in OS Settings while your app is backgrounded, and how must your startup code handle it?',
      'Why must ActivityResultLauncher registration happen unconditionally before onStart() (or via rememberLauncherForActivityResult in Compose)?'
    ],
    commonFaqs: [
      'How do you distinguish between a first-time permission request, showing a rationale, and permanent denial ("Don’t ask again")?',
      'Why must foreground location and background location be requested separately on Android 11+?',
      'How do one-time permissions and auto-reset permissions for unused apps work in modern Android?'
    ],
    resources: [
      { title: 'Request App Permissions Best Practices', url: 'https://developer.android.com/training/permissions/requesting', type: 'Android Docs' },
      { title: 'Request Location Permissions (Foreground & Background)', url: 'https://developer.android.com/develop/sensors-and-location/location/permissions', type: 'Android Docs' }
    ],
    checklist: ['Handled rationale, permanent denial, and Settings deep link', 'Implemented two-step foreground-then-background location flow', 'Handled permission revocation while app is backgrounded']
  },
  {
    id: 'LAB 15', num: 15, title: 'Background Work & WorkManager Lab', phase: 'Phase 4', duration: '2 weeks',
    goal: 'Build a robust background task orchestration system using WorkManager: periodic sync, parallel/sequential work chains, expedited workers, constraints, and live progress reporting.',
    why: 'WorkManager is Android’s primary engine for deferrable guaranteed background work across process death and device reboots.',
    concepts: ['WorkManager vs Foreground Service vs AlarmManager decision matrix', 'CoroutineWorker, OneTimeWorkRequest, PeriodicWorkRequest', 'Constraints (NetworkType, BatteryNotLow, Charging, StorageNotLow)', 'Work chaining: beginUniqueWork().then() & InputData/OutputData mergers', 'ExistingWorkPolicy (KEEP, REPLACE, APPEND_OR_REPLACE)', 'Expedited work (setExpedited) & foreground promotion (setForeground)'],
    problems: ['Parallel download/compression of 10 files followed by a single final aggregation upload worker', 'Daily log upload scheduled only when on WiFi + Charging'],
    edgeCases: ['1. Device reboots while work is queued: verify work resumes', '2. Periodic work deduplication with KEEP policy', '3. Worker hits network error -> Result.retry() with exponential backoff', '4. Worker exceeds 10-minute execution limit watchdog'],
    constraints: 'Unit and integration tested with TestListenableWorkerBuilder and WorkManagerTestInitHelper.',
    deepQuestions: [
      'How does WorkManager persist work graphs and constraints inside its internal Room database (androidx.work.workdb) and delegate scheduling to JobScheduler on API 23+?',
      'What happens when you call setExpedited() on Android 12+ vs Android 11 and below, and how do App Standby Buckets affect execution quotas?'
    ],
    commonFaqs: [
      'When should you use WorkManager vs a Foreground Service vs AlarmManager?',
      'What is the minimum interval for a PeriodicWorkRequest in WorkManager?',
      'What is the difference between ExistingWorkPolicy.KEEP, REPLACE, and APPEND_OR_REPLACE?',
      'What is the maximum size limit for WorkManager InputData / OutputData (10KB) and how do you pass larger data?'
    ],
    resources: [
      { title: 'Schedule Tasks with WorkManager Official Guide', url: 'https://developer.android.com/develop/background-work/background-tasks/persistent', type: 'Android Docs' },
      { title: 'Testing Worker Implementations (WorkManager Testing)', url: 'https://developer.android.com/develop/background-work/background-tasks/persistent/testing-worker-impl', type: 'Android Docs' }
    ],
    checklist: ['Implemented chained and parallel workers with InputData/OutputData', 'Tested worker constraints and retries using WorkManagerTestInitHelper', 'Used setProgress() to stream worker progress to Compose UI']
  },
  {
    id: 'LAB 16', num: 16, title: 'Foreground Services & Media Playback Lab', phase: 'Phase 4', duration: '2 weeks',
    goal: 'Build a background music/podcast player running as a Media3 MediaSessionService that handles audio focus, lock-screen/notification controls, and headphone disconnect.',
    why: 'Media playback requires strict compliance with Android 14 Foreground Service types, audio focus ducking/pausing, and system MediaSession integration.',
    concepts: ['Android 14 Foreground Service types (mediaPlayback, location, dataSync, etc.)', 'MediaSessionService with Jetpack Media3 / ExoPlayer', 'AudioFocusRequest (handling transient loss/ducking vs permanent loss)', 'ACTION_AUDIO_BECOMING_NOISY BroadcastReceiver for headset unplug', 'MediaController asynchronous UI binding & lock-screen notification controls'],
    problems: ['Phone call arrives during music playback -> pause immediately and resume when call ends', 'User unplugs headphones -> pause immediately without blasting speaker'],
    edgeCases: ['1. App UI process killed while MediaSessionService continues playing', '2. Another app requests transient audio focus (navigation voice prompt) -> duck volume', '3. Android 13+ notification permission behavior for media notifications'],
    constraints: 'Built with Jetpack Media3; zero memory leaks between Activity and Service.',
    deepQuestions: [
      'Why does Android 12+ throw ForegroundServiceStartNotAllowedException when starting a Foreground Service from the background, and what specific exemptions exist for MediaSessionService?',
      'How does Jetpack Media3 decouple the UI MediaController from the background Player instance over Binder IPC?'
    ],
    commonFaqs: [
      'What is the difference between a Started Service, a Bound Service, and a Foreground Service?',
      'What is the 5-second rule after calling Context.startForegroundService()?',
      'How does AudioFocus work when a phone call or navigation voice prompt interrupts media playback?'
    ],
    resources: [
      { title: 'Jetpack Media3 & MediaSessionService Official Guide', url: 'https://developer.android.com/media/media3/session/background-playback', type: 'Android Docs' },
      { title: 'Foreground Services & Android 14 Service Types', url: 'https://developer.android.com/develop/background-work/services/fg-service-types', type: 'Android Docs' }
    ],
    checklist: ['Implemented Media3 MediaSessionService with ExoPlayer', 'Handled AudioFocus ducking, pause, and resume', 'Paused playback immediately on headphone disconnect']
  },
  {
    id: 'LAB 17', num: 17, title: 'Android Security Lab', phase: 'Phase 4', duration: '2.5 weeks',
    goal: 'Build a security-hardened authentication and secret storage vault using Android Keystore (AES-GCM & RSA), CryptoObject-bound BiometricPrompt, SSL Pinning, and R8 obfuscation: then attack/decompile it to verify.',
    why: 'Senior engineers must think like attackers: protecting sensitive data at rest, in transit, and at runtime against reverse engineering and MITM proxies.',
    concepts: ['Android Keystore System (TEE / StrongBox hardware-backed keys & key attestation)', 'Symmetric AES-GCM encryption with Keystore-backed keys', 'BiometricPrompt bound to Keystore Cipher via CryptoObject (setUserAuthenticationRequired(true))', 'SSL/TLS Certificate & Public Key Pinning (CertificatePinner)', 'Play Integrity API / root detection heuristics, FLAG_SECURE, filterTouchesWhenObscured (tapjacking), and R8/ProGuard rules'],
    problems: ['Storing JWT/refresh tokens encrypted with hardware Keystore keys rather than plaintext', 'Requiring hardware cryptographic biometric authentication before decrypting financial records'],
    edgeCases: ['1. User enrolls a new fingerprint -> KeyPermanentlyInvalidatedException handling', '2. Server rotates TLS certificate -> backup pin prevents app outage', '3. Decompiling APK with apktool/jadx to verify R8 obfuscation and fix broken reflection rules'],
    constraints: 'Verify obfuscation with apktool/jadx and verify SSL pinning blocks a MITM proxy.',
    deepQuestions: [
      'What is the cryptographic difference between calling BiometricPrompt.authenticate(promptInfo) WITHOUT a CryptoObject vs WITH a Keystore Cipher CryptoObject, and why can the former be bypassed via Frida runtime hooking?',
      'What causes KeyPermanentlyInvalidatedException when setInvalidatedByBiometricEnrollment(true) is enabled, and how should your app recover without crashing?'
    ],
    commonFaqs: [
      'How does the Android Keystore System protect cryptographic keys from being extracted even on a rooted device?',
      'Why should you pin the SubjectPublicKeyInfo (SPKI) SHA-256 hash instead of the leaf certificate in SSL Pinning?',
      'What is the difference between R8 shrinking, obfuscation, and optimization?'
    ],
    resources: [
      { title: 'Android Keystore System Official Documentation', url: 'https://developer.android.com/privacy-and-security/keystore', type: 'Android Docs' },
      { title: 'Biometric Authentication & Cryptographic Operations', url: 'https://developer.android.com/Identity/biometric', type: 'Android Docs' },
      { title: 'Shrink, Obfuscate, and Optimize Your App with R8', url: 'https://developer.android.com/build/shrink-code', type: 'Android Docs' }
    ],
    checklist: ['Implemented AES-GCM encryption using Android Keystore', 'Bound Keystore Cipher to BiometricPrompt.CryptoObject', 'Verified SSL pinning and inspected R8-obfuscated APK in jadx']
  },
  {
    id: 'LAB 18', num: 18, title: 'Authentication System Lab', phase: 'Phase 4', duration: '2 weeks',
    goal: 'Build a complete production authentication system: Email/Password, Google OAuth / Credential Manager, biometric re-auth, silent JWT refresh, and atomic session lifecycle.',
    why: 'Authentication state governs navigation, network interceptors, local storage encryption, and background workers across the entire app.',
    concepts: ['Singleton AuthManager exposing reactive Flow<AuthState>', 'JWT access token + refresh token rotation & atomic Mutex refresh interceptor', 'Google Sign-In / Android Credential Manager API', 'Biometric re-authentication for sensitive actions', 'Atomic Logout: wiping Room tables, clearing DataStore, cancelling WorkManager jobs, and resetting NavGraph'],
    problems: ['Access token expires mid-session -> refresh transparently and retry original request', 'Password changed on another device -> invalidate session and redirect to login'],
    edgeCases: ['1. Parallel requests hitting 401 during silent refresh', '2. Race condition between manual logout and an in-flight network response', '3. Multi-account switching without cross-contaminating local cache'],
    constraints: 'Navigation graph reacts automatically to Flow<AuthState> changes.',
    deepQuestions: [
      'How do you prevent an in-flight coroutine launched by User A from writing stale network data into Room milliseconds after User A clicks Logout and User B logs in?',
      'How does refresh token rotation with server-side reuse detection protect against stolen refresh tokens?'
    ],
    commonFaqs: [
      'What is the difference between an Access Token and a Refresh Token in JWT authentication?',
      'How does the modern Android Credential Manager API unify Passkeys, Passwords, and Google Sign-In?',
      'What local state must be cleared when a user logs out of an Android app?'
    ],
    resources: [
      { title: 'Sign In Your User with Credential Manager', url: 'https://developer.android.com/training/sign-in/passkeys', type: 'Android Docs' },
      { title: 'OAuth 2.0 for Native Mobile Apps (RFC 8252 / PKCE)', url: 'https://datatracker.ietf.org/doc/html/rfc8252', type: 'IETF Spec' }
    ],
    checklist: ['Built reactive Flow<AuthState> driving root Navigation', 'Implemented atomic logout clearing DB, DataStore, and WorkManager', 'Handled silent token refresh and forced session revocation']
  },
  {
    id: 'LAB 19', num: 19, title: 'Compose Animation & UI Polish Lab', phase: 'Phase 2', duration: '1.5 weeks',
    goal: 'Build a highly polished UI demonstrating every major Compose animation API: physics springs, Animatable, updateTransition, SharedTransitionLayout, and gesture-driven animations: at a locked 60fps.',
    why: 'Great mobile UX feels physical and responsive. Achieving 60/120fps animations requires choosing the right animation API and performing transforms in the Draw/RenderNode phase.',
    concepts: ['animate*AsState vs Animatable (coroutine control & snapTo)', 'AnimatedVisibility, AnimatedContent, and updateTransition', 'Physics-based spring() vs tween() vs keyframes()', 'Gesture-driven animations with pointerInput, VelocityTracker, and AnchoredDraggable', 'Modifier.graphicsLayer for hardware-accelerated GPU layer transforms', 'Shared element transitions with SharedTransitionLayout'],
    problems: ['Interactive swipeable card with velocity-aware spring-back or dismiss', 'Coordinated multi-property transition between collapsed and expanded player sheet'],
    edgeCases: ['1. Interrupting an animation mid-flight with a new touch gesture (preserving velocity)', '2. Animating scale/translation via graphicsLayer instead of Modifier.size to avoid layout thrashing'],
    constraints: 'All animations must run at 60fps profiled via System Trace and Layout Inspector Animation Preview.',
    deepQuestions: [
      'Why does Modifier.graphicsLayer { translationY = ...; alpha = ... } execute on the RenderThread / GPU RenderNode without triggering Compose Composition or Layout phases?',
      'Why are spring() animations superior to duration-based tween() animations when a user interrupts a gesture mid-flight?'
    ],
    commonFaqs: [
      'When should you use animateFloatAsState vs updateTransition vs Animatable in Compose?',
      'How do you implement Shared Element Transitions between screens in Jetpack Compose?',
      'What is the difference between AnimatedVisibility and alpha = 0f?'
    ],
    resources: [
      { title: 'Animations in Jetpack Compose Official Guide', url: 'https://developer.android.com/develop/ui/compose/animation/introduction', type: 'Android Docs' },
      { title: 'Shared Element Transitions in Compose', url: 'https://developer.android.com/develop/ui/compose/animation/shared-elements', type: 'Android Docs' }
    ],
    checklist: ['Built physics-based gesture animation with Animatable', 'Implemented SharedTransitionLayout between list and detail screens', 'Verified 60fps frame timing in System Trace']
  },
  {
    id: 'LAB 20', num: 20, title: 'Compose Performance Optimization Lab', phase: 'Phase 5', duration: '2 weeks',
    goal: 'Take a deliberately slow Compose app running at 20fps and optimize it to 60fps by diagnosing and fixing stability, recomposition, phase reads, and LazyColumn keys: verified with Macrobenchmark.',
    why: 'Performance engineering turns working code into production-grade software. You must measure with Compose Compiler Metrics, Layout Inspector, and Macrobenchmark.',
    concepts: ['Compose Compiler Metrics (restartable, skippable, unstable classes/lambdas)', '@Stable and @Immutable annotations & kotlinx.collections.immutable', 'LazyColumn optimization: key = { it.id }, contentType, remember(key), derivedStateOf', 'Phase deferral: lambda modifiers (Modifier.offset { }, drawBehind { })', 'Macrobenchmark FrameTimingMetric & BaselineProfileRule'],
    problems: ['Optimizing a 1,000-item LazyColumn with complex items to scroll at 60fps with <5 recompositions per interaction'],
    edgeCases: ['1. Unstable lambda capturing an unstable ViewModel or collection', '2. Reading scroll offset directly in Composition vs deferring via derivedStateOf or graphicsLayer'],
    constraints: 'Document before/after Macrobenchmark FrameTimingMetric results in a Performance Report.',
    deepQuestions: [
      'How does Strong Skipping Mode in the modern Kotlin 2.0+ Compose Compiler change skippability for unstable parameters (instance reference === equality) and lambda memoization?',
      'What is a Donut-Hole Skipping scope in Compose’s SlotTable, and why does reading a rapidly changing State inside a top-level Box vs a leaf Composable expand the invalidation scope?'
    ],
    commonFaqs: [
      'Why is providing key = { item.id } and contentType critical for LazyColumn performance?',
      'How do you generate and read Compose Compiler Stability Metrics?',
      'How do you use Layout Inspector to diagnose excessive recompositions?'
    ],
    resources: [
      { title: 'Jetpack Compose Performance Best Practices', url: 'https://developer.android.com/develop/ui/compose/performance', type: 'Android Docs' },
      { title: 'Stability in Jetpack Compose & Strong Skipping Mode', url: 'https://developer.android.com/develop/ui/compose/performance/stability', type: 'Android Docs' },
      { title: 'Macrobenchmark Overview & FrameTimingMetric', url: 'https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview', type: 'Android Docs' }
    ],
    checklist: ['Analyzed Compose Compiler Metrics and fixed all unstable parameters', 'Optimized 1,000-item LazyColumn to 60fps', 'Published before/after Macrobenchmark report']
  },
  {
    id: 'LAB 21', num: 21, title: 'Android Startup Optimization Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Take an app with a slow 1.5s cold start and reduce cold start time by 50%+ using Jetpack App Startup, lazy initialization, SplashScreen API, Perfetto tracing, and Baseline Profiles.',
    why: 'Cold start is the user’s first impression. Hidden ContentProvider initializers, main-thread disk reads, and uncompiled bytecode slow down startup.',
    concepts: ['Cold start vs Warm start vs Hot start internals', 'ContentProvider initialization anti-pattern & Jetpack App Startup replacement', 'Lazy initialization, background pre-warming, and AndroidX SplashScreen API', 'StrictMode for detecting main-thread disk/network reads during startup', 'Systrace / Perfetto startup trace analysis & Baseline Profiles (BaselineProfileRule)'],
    problems: ['Moving heavy SDK initializations and disk reads off Application.onCreate() main thread', 'Generating a Baseline Profile bundled with the APK for AOT compilation'],
    edgeCases: ['1. Cold start via Deep Link vs Launcher icon', '2. Calling reportFullyDrawn() accurately when async initial data renders'],
    constraints: 'Achieve >= 40% cold start improvement measured via Macrobenchmark StartupTimingMetric.',
    deepQuestions: [
      'Why does Android instantiate all manifest ContentProviders BEFORE Application.onCreate(), and how does Jetpack App Startup merge dozens of library initializers into a single InitializationProvider?',
      'How do Baseline Profiles and Cloud Profiles guide ART dex2oat AOT compilation during Play Store installation to avoid JIT interpretation stalls on first launch?'
    ],
    commonFaqs: [
      'What is the difference between a Cold Start, a Warm Start, and a Hot Start?',
      'What is the difference between Time to Initial Display (TTID) and Time to Full Display (TTFD / reportFullyDrawn)?',
      'How do you use StrictMode to catch accidental disk or network reads on the Main thread?'
    ],
    resources: [
      { title: 'App Startup Time Optimization Guide', url: 'https://developer.android.com/topic/performance/vitals/launch-time', type: 'Android Docs' },
      { title: 'Baseline Profiles Overview & Generation', url: 'https://developer.android.com/topic/performance/baselineprofiles/overview', type: 'Android Docs' },
      { title: 'Jetpack App Startup Library', url: 'https://developer.android.com/topic/libraries/app-startup', type: 'Android Docs' }
    ],
    checklist: ['Traced cold start in Perfetto and removed main-thread I/O', 'Consolidated initializers with Jetpack App Startup', 'Generated Baseline Profile and verified >= 40% speedup with Macrobenchmark']
  },
  {
    id: 'LAB 22', num: 22, title: 'Memory Management & Leak Detection Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Introduce 8 classic memory leaks into an app, detect them with LeakCanary and Android Studio Memory Profiler (.hprof heap dumps), fix every single one, and verify a flat heap graph.',
    why: 'Memory leaks cause GC thrashing, jank, and OutOfMemoryError crashes. Understanding ART GC roots and reference chains makes leak prevention second nature.',
    concepts: ['ART Heap management & Garbage Collection roots', 'LeakCanary automated leak detection & shortest path to GC root analysis', 'Android Studio Memory Profiler: heap dumps, Shallow vs Retained size, allocation tracking', 'Bitmap memory management (inSampleSize, Coil/Glide pooling)', '8 leak types: static Activity reference, inner class/anonymous Runnable, Handler postDelayed, unregistered BroadcastReceiver, static Bitmap, ViewModel holding Context/View, ViewTreeObserver listener, uncancelled CoroutineScope / callbackFlow'],
    problems: ['Diagnosing and fixing all 8 deliberate memory leak patterns until LeakCanary reports 0 leaks'],
    edgeCases: ['1. Fragment View leak when Fragment is on the back stack', '2. callbackFlow missing awaitClose leaking platform listener'],
    constraints: 'Zero leaks in LeakCanary and flat memory heap over a 30-minute stress test.',
    deepQuestions: [
      'How does LeakCanary use WeakReference + ReferenceQueue attached to ActivityDestroyWatcher / FragmentAndViewModelWatcher to detect retained instances and compute the shortest strong reference path to a GC Root?',
      'Why does a non-static inner class or anonymous lambda in Kotlin/Java implicitly hold a strong reference to its outer Activity/Fragment instance?'
    ],
    commonFaqs: [
      'What are the most common causes of Memory Leaks in Android applications?',
      'What is the difference between Application Context and Activity Context, and when should you use each?',
      'What is the difference between Shallow Size and Retained Size in the Memory Profiler?'
    ],
    resources: [
      { title: 'Inspect Your App Memory with Memory Profiler', url: 'https://developer.android.com/studio/profile/memory-profiler', type: 'Android Docs' },
      { title: 'LeakCanary Fundamentals & How It Works', url: 'https://square.github.io/leakcanary/fundamentals/', type: 'Library Docs' }
    ],
    checklist: ['Reproduced and fixed all 8 deliberate leak scenarios', 'Inspected .hprof heap dump dominator tree in Android Studio', 'Verified zero leaks in LeakCanary']
  },
  {
    id: 'LAB 23', num: 23, title: 'Android Profiling & ANR Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Deliberately trigger and fix ANRs, frame jank, lock contention, and 4x GPU overdraw using Android Studio CPU Profiler, Systrace/Perfetto, custom Trace sections, and StrictMode.',
    why: 'ANRs freeze the user experience and tank Play Store rankings. You must be able to read ANR stack dumps, flame charts, and Perfetto timelines.',
    concepts: ['ANR thresholds: >5s input dispatch, >10s broadcast receiver, >20s foreground service', 'StrictMode ThreadPolicy and VmPolicy violation detection', 'CPU Profiler: Call Chart vs Flame Chart vs System Trace', 'Custom trace markers: Trace.beginSection() / trace("name") {} in Perfetto', 'Fixing main-thread JSON parsing, synchronous DB reads, lock contention, and bitmap allocation inside onDraw'],
    problems: ['Reproducing a main-thread lock contention ANR and pinpointing the background thread holding the lock', 'Eliminating 4x overdraw and slow onDraw allocations'],
    edgeCases: ['1. Background thread holding a synchronized lock needed by Main thread', '2. Heavy JSON parsing moved from Main to Dispatchers.Default'],
    constraints: 'All deliberate ANRs and jank bottlenecks profiled before and after in Perfetto.',
    deepQuestions: [
      'When analyzing a Perfetto trace or ANR dump where the Main thread is in BLOCKED or NATIVE state (e.g., waiting on a Binder call or SQLite connection lock), how do you trace which background thread holds the lock?',
      'Why does a 120Hz display cut your per-frame rendering budget from 16.6ms down to 8.3ms across UI Thread and RenderThread?'
    ],
    commonFaqs: [
      'What causes an Application Not Responding (ANR) dialog on Android, and what are the timeout thresholds?',
      'What is GPU Overdraw and how do you reduce it?',
      'What is the difference between a Sampled Trace and an Instrumented Trace in the CPU Profiler?'
    ],
    resources: [
      { title: 'ANRs & How to Diagnose Them (Android Vitals)', url: 'https://developer.android.com/topic/performance/vitals/anr', type: 'Android Docs' },
      { title: 'Overview of System Tracing & Perfetto', url: 'https://developer.android.com/topic/performance/tracing', type: 'Android Docs' }
    ],
    checklist: ['Captured and diagnosed an ANR trace file', 'Added custom Trace sections and inspected them in Perfetto', 'Fixed main-thread CPU, I/O, and overdraw bottlenecks']
  },
  {
    id: 'LAB 24', num: 24, title: 'Unit & Integration Testing Mastery Lab', phase: 'Phase 5', duration: '2.5 weeks',
    goal: 'Build a comprehensive test suite achieving 80%+ unit test coverage across Domain Use Cases, Repositories (with Fakes), ViewModels, Flows (Turbine), and in-memory Room DAOs.',
    why: 'Testing shapes architecture. Engineers who understand Fakes vs Mocks, virtual coroutine time, and the Testing Pyramid write maintainable, decoupled systems.',
    concepts: ['The Testing Pyramid: Unit -> Integration -> E2E proportions', 'JUnit 5 parameterized tests, MockK (coEvery, coVerify, slot), and Truth assertions', 'Test Doubles taxonomy: Dummy, Stub, Fake, Spy, Mock (why Fakes beat Mocks at repository boundaries)', 'kotlinx-coroutines-test: runTest, TestCoroutineScheduler, StandardTestDispatcher vs UnconfinedTestDispatcher, advanceTimeBy', 'CashApp Turbine for Flow testing (awaitItem, awaitComplete, awaitError)', 'Room.inMemoryDatabaseBuilder for DAO integration testing'],
    problems: ['Testing every ViewModel state transition (Loading -> Success -> Error -> Retry) with virtual time', 'Testing repository offline sync logic using FakeRemoteDataSource and FakeLocalDataSource'],
    edgeCases: ['1. Testing debounced search Flow using advanceTimeBy()', '2. Testing Flow cancellation and upstream exception propagation with Turbine'],
    constraints: 'Prefer Fakes over mocks for repositories; zero Thread.sleep() calls anywhere.',
    deepQuestions: [
      'Why does testing a ViewModel that collects a StateFlow with SharingStarted.WhileSubscribed(5000) require a backgroundScope collector inside runTest, and how does StandardTestDispatcher differ from UnconfinedTestDispatcher when asserting initial Loading states?',
      'Why do over-mocked tests become brittle during refactoring compared to stateful in-memory Fakes?'
    ],
    commonFaqs: [
      'What is the difference between a Fake, a Stub, and a Mock in unit testing?',
      'How do you replace Dispatchers.Main in local JVM unit tests for Android ViewModels (Dispatchers.setMain)?',
      'How does runTest skip delay() calls using virtual time?'
    ],
    resources: [
      { title: 'Fundamentals of Testing Android Apps', url: 'https://developer.android.com/training/testing/fundamentals', type: 'Android Docs' },
      { title: 'Testing Kotlin Coroutines on Android', url: 'https://developer.android.com/kotlin/coroutines/test', type: 'Android Docs' },
      { title: 'Use Test Doubles in Android (Fakes vs Mocks)', url: 'https://developer.android.com/training/testing/fundamentals/test-doubles', type: 'Android Docs' }
    ],
    checklist: ['80%+ unit test coverage across Domain, Data, and Presentation', 'All Flows tested with Turbine and TestCoroutineScheduler', 'In-memory Room integration tests for all DAO queries']
  },
  {
    id: 'LAB 25', num: 25, title: 'Compose UI Testing & Screenshot Testing Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Build a complete UI test suite for 5 screens using ComposeTestRule, implement JVM screenshot regression testing with Paparazzi/Roborazzi, and enforce automated accessibility checks.',
    why: 'Compose semantic testing and JVM screenshot tests verify visual and interactive behavior across Light/Dark themes and screen sizes in seconds without flaky emulators.',
    concepts: ['createComposeRule() vs createAndroidComposeRule()', 'Semantic Finders (onNodeWithText, onNodeWithContentDescription, onNodeWithTag), Actions, and Assertions', 'Compose synchronization & mainClock.autoAdvance = false for animation/shimmer testing', 'Paparazzi & Roborazzi JVM-based golden screenshot testing (Light/Dark/Font scales)', 'AccessibilityValidator integration in Compose tests'],
    problems: ['Verifying form validation, loading shimmer, and 50-item list scrolling in ComposeTestRule', 'Generating golden screenshots for all 5 screens in Light and Dark themes on JVM'],
    edgeCases: ['1. Inspecting merged vs unmerged semantics tree (useUnmergedTree = true)', '2. Using waitUntil for asynchronous state updates'],
    constraints: 'Every screen covered by behavioral ComposeTestRule tests, Paparazzi screenshots, and zero accessibility violations.',
    deepQuestions: [
      'When a Button merges the semantics of its child Icon and Text nodes, why does onNodeWithTag on a child fail unless you pass useUnmergedTree = true?',
      'How does CashApp Paparazzi render Android Views and Compose nodes onto a standard JVM BufferedImage using layoutlib (the Android Studio Preview engine) without starting an emulator?'
    ],
    commonFaqs: [
      'How do you test a Jetpack Compose screen using ComposeTestRule?',
      'Why does an infinite shimmer animation cause Compose UI tests to hang or time out, and how do you control mainClock?',
      'What is Screenshot Testing (Golden Testing) and what regressions does it catch?'
    ],
    resources: [
      { title: 'Testing Your Compose Layout Official Guide', url: 'https://developer.android.com/develop/ui/compose/testing', type: 'Android Docs' },
      { title: 'Compose Testing Cheat Sheet', url: 'https://developer.android.com/develop/ui/compose/testing-cheatsheet', type: 'Android Docs' },
      { title: 'CashApp Paparazzi JVM Screenshot Testing', url: 'https://github.com/cashapp/paparazzi', type: 'Library Docs' }
    ],
    checklist: ['Wrote ComposeTestRule behavioral tests for 5 screens', 'Set up Paparazzi/Roborazzi golden screenshot tests for Light & Dark modes', 'Verified zero accessibility violations across all tested screens']
  },
  {
    id: 'LAB 26', num: 26, title: 'Modularization Architecture Lab', phase: 'Phase 6', duration: '3 weeks',
    goal: 'Refactor a monolithic single-module app into a scalable 12-module project (:app, :core:*, :feature:*-api, :feature:*-impl) governed by Gradle build-logic Convention Plugins.',
    why: 'Modularization is the #1 architectural lever for growing engineering teams: enforcing strict boundaries, enabling parallel work, and maximizing incremental Gradle build cache hits.',
    concepts: ['Module taxonomy: :app, :core:ui, :core:network, :core:data, :core:domain, :core:testing, :feature:x-api, :feature:x-impl', 'Dependency direction: feature :impl modules depend only on :core and other feature :api modules (NEVER :impl -> :impl)', 'Gradle implementation vs api configurations & compilation avoidance', 'build-logic Composite Builds & Convention Plugins + Version Catalogs (libs.versions.toml)', 'Multi-module Hilt @InstallIn aggregation & decoupled navigation routes'],
    problems: ['Proving that modifying code inside :feature:settings-impl does not recompile :feature:home-impl', 'Eliminating duplicate build.gradle.kts boilerplate across 12 modules using Convention Plugins'],
    edgeCases: ['1. Resolving circular dependency between two features by extracting contracts into -api modules', '2. Sharing test fakes via a dedicated :core:testing module'],
    constraints: 'Measure and document clean and incremental build times before and after modularization.',
    repoTree: ':app\n:build-logic (Convention Plugins)\n:core:ui, :core:network, :core:data, :core:domain, :core:testing\n:feature:auth-api, :feature:auth-impl\n:feature:home-api, :feature:home-impl\n:feature:settings-api, :feature:settings-impl',
    deepQuestions: [
      'Explain Gradle ABI (Application Binary Interface) compilation avoidance: why does changing a method body in Module B recompile dependent Module A if exposed via api() or if return types leak, vs skipping Module A compilation when encapsulated behind implementation()?',
      'Why does modifying a class in buildSrc invalidate the entire Gradle build cache across every module, whereas an included composite build (includeBuild("build-logic")) only invalidates modules applying the modified Convention Plugin?'
    ],
    commonFaqs: [
      'What is the difference between implementation and api in Gradle dependencies?',
      'How do two feature modules navigate to each other without depending on each other directly?',
      'What are the benefits of modularizing an Android project?'
    ],
    resources: [
      { title: 'Guide to Android App Modularization', url: 'https://developer.android.com/topic/modularization', type: 'Android Docs' },
      { title: 'Common Modularization Patterns (:api vs :impl)', url: 'https://developer.android.com/topic/modularization/patterns', type: 'Android Docs' },
      { title: 'Now in Android build-logic Convention Plugins', url: 'https://github.com/android/nowinandroid/tree/main/build-logic', type: 'Source Code' }
    ],
    checklist: ['Refactored project into 12 modules with :api and :impl split', 'Created reusable Gradle Convention Plugins in build-logic', 'Verified that changing one feature :impl does not recompile sibling features']
  },
  {
    id: 'LAB 27', num: 27, title: 'Deep Linking & App Links Lab', phase: 'Phase 4', duration: '1 week',
    goal: 'Implement complete deep link handling: custom URI schemes, domain-verified HTTPS App Links (assetlinks.json), push notification deep links, and synthetic back stacks.',
    why: 'Deep links must route users from web URLs or notifications directly to the right screen, construct a natural back stack, and respect authentication guards.',
    concepts: ['Custom scheme deep links vs verified HTTPS Android App Links (autoVerify="true")', 'Digital Asset Links (/.well-known/assetlinks.json) domain verification', 'Navigation Compose navDeepLink {} & query parameter parsing', 'Deferred deep links & auth-guarded deep link redirection', 'Constructing a proper parent back stack when launching directly into a detail screen'],
    problems: ['User clicks an HTTPS link -> app opens directly to Product Detail -> pressing Back navigates to Home rather than exiting the app', 'Unauthenticated user clicks a protected deep link -> Login -> automatically routed to original deep link target'],
    edgeCases: ['1. Deep link arrives while app is already running in foreground (onNewIntent)', '2. Deep link with complex query parameters (?userId=123&tab=photos)', '3. Verifying domain association via adb shell pm get-app-links'],
    constraints: 'Centralized deep link handler; tested via adb shell am start -a android.intent.action.VIEW.',
    deepQuestions: [
      'What happens differently when a deep link Intent arrives while your singleTop/singleTask Activity is already running in memory (onNewIntent) vs cold-starting the Activity, and how do you forward onNewIntent to NavController?',
      'Why can any malicious app hijack a custom scheme (myapp://checkout) whereas an autoVerified HTTPS Android App Link cannot be hijacked?'
    ],
    commonFaqs: [
      'What is the difference between a Deep Link, a Web Link, and an Android App Link?',
      'What is assetlinks.json and where must it be hosted for Android App Links verification?',
      'How do you test deep links from the command line using ADB?'
    ],
    resources: [
      { title: 'Handling Android App Links Official Guide', url: 'https://developer.android.com/training/app-links', type: 'Android Docs' },
      { title: 'Verify Android Applinks & Digital Asset Links', url: 'https://developer.android.com/training/app-links/verify-android-applinks', type: 'Android Docs' }
    ],
    checklist: ['Configured both custom URI scheme and HTTPS App Links with assetlinks.json', 'Implemented auth-guard redirection preserving original deep link target', 'Verified proper back stack behavior from cold and warm deep links']
  },
  {
    id: 'LAB 28', num: 28, title: 'Push Notifications Lab', phase: 'Phase 4', duration: '1.5 weeks',
    goal: 'Build a complete push notification system: Firebase Cloud Messaging (FCM), NotificationChannels, expandable styles, notification grouping, inline reply actions, and foreground/background routing.',
    why: 'Production notifications require mastering FCM data vs notification message delivery rules, Android 8+ channels, Android 12+ PendingIntent mutability flags, and Android 13+ permissions.',
    concepts: ['FCM token registration, rotation (onNewToken), and onMessageReceived', 'FCM Notification messages vs Data-only messages (foreground vs background/killed behavior)', 'NotificationChannel importance levels & user channel settings', 'Styles: BigTextStyle, BigPictureStyle, InboxStyle, MessagingStyle', 'Notification groups, summary notifications, inline Direct Reply (RemoteInput), and PendingIntent mutability flags'],
    problems: ['Showing an in-app banner instead of a system notification when the user is already inside the active conversation screen', 'Grouping 3+ notifications into an expandable summary stack'],
    edgeCases: ['1. App killed: data vs notification payload routing into target deep link screen', '2. Downloading BigPictureStyle image asynchronously within execution limits', '3. Using FLAG_MUTABLE strictly for RemoteInput inline reply and FLAG_IMMUTABLE everywhere else'],
    constraints: 'Tested across foreground, background, and process-killed states.',
    deepQuestions: [
      'Explain the exact OS delivery difference between an FCM Notification message, a Data-only message (normal vs high priority), and a combined message when the app is in the foreground vs backgrounded/killed under Doze Mode.',
      'Why did Android 12 mandated explicit PendingIntent.FLAG_IMMUTABLE or FLAG_MUTABLE, and how can a malicious app exploit an unprotected mutable PendingIntent?'
    ],
    commonFaqs: [
      'What are Notification Channels (Android 8.0+) and can you programmatically re-enable a channel after the user disables it?',
      'When is FirebaseMessagingService.onNewToken() called and how should your app handle it?',
      'How do you group multiple notifications into a single expandable summary notification?'
    ],
    resources: [
      { title: 'Notifications Overview & Channels Guide', url: 'https://developer.android.com/develop/ui/views/notifications', type: 'Android Docs' },
      { title: 'Firebase Cloud Messaging Message Types', url: 'https://firebase.google.com/docs/cloud-messaging/concept-options', type: 'Firebase Docs' }
    ],
    checklist: ['Configured NotificationChannels, styles, and summary grouping', 'Implemented inline reply action using RemoteInput', 'Handled foreground in-app banner vs background system notification']
  },
  {
    id: 'LAB 29', num: 29, title: 'Location & Maps Lab', phase: 'Phase 4', duration: '1.5 weeks',
    goal: 'Build a location-aware app with foreground and background location tracking, Geofencing, and reverse geocoding: balancing accuracy priorities and battery impact.',
    why: 'Location tracking is one of the most battery-sensitive and permission-restricted APIs on Android.',
    concepts: ['FusedLocationProviderClient priority levels (HIGH_ACCURACY, BALANCED_POWER, LOW_POWER)', 'Foreground location service vs background location permission tiers', 'Android 12+ Approximate vs Precise location handling', 'GeofencingClient (enter, exit, dwell events via BroadcastReceiver)', 'Coroutine-wrapped Geocoder & LocationSettingsRequest check'],
    problems: ['Streaming live location updates via callbackFlow inside a Foreground Service', 'Triggering Geofence enter/exit alerts even when the app is not open'],
    edgeCases: ['1. User grants Approximate Location only: gracefully adapt UI', '2. User disables GPS mid-session: prompt LocationSettingsRequest resolution', '3. Re-registering Geofences after device reboot'],
    constraints: 'Zero leaked LocationCallbacks; battery-conscious interval configuration.',
    deepQuestions: [
      'How does Android’s background location throttling limit location updates for backgrounded apps unless running a Foreground Service with foregroundServiceType="location", and how does batching (setMaxUpdateDelayMillis) save battery?',
      'Why do Geofences get cleared on device reboot or Google Play Services data clear, and how do you re-register them reliably?'
    ],
    commonFaqs: [
      'Why should you use FusedLocationProviderClient instead of the raw Android LocationManager?',
      'How do you handle Android 12+ users who grant Approximate Location (ACCESS_COARSE_LOCATION) instead of Precise Location?',
      'How do you wrap FusedLocationProviderClient into a Kotlin Flow using callbackFlow?'
    ],
    resources: [
      { title: 'Build Location-Aware Apps Official Guide', url: 'https://developer.android.com/develop/sensors-and-location/location', type: 'Android Docs' },
      { title: 'Create and Monitor Geofences', url: 'https://developer.android.com/develop/sensors-and-location/location/geofencing', type: 'Android Docs' }
    ],
    checklist: ['Wrapped FusedLocationProviderClient in callbackFlow', 'Implemented GeofencingClient with BroadcastReceiver', 'Handled Approximate Location and disabled GPS edge cases']
  },
  {
    id: 'LAB 30', num: 30, title: 'Camera & Media Capture Lab', phase: 'Phase 4', duration: '2 weeks',
    goal: 'Build a camera app using CameraX: live Preview, high-res Photo Capture with EXIF handling, Video Recording, real-time ImageAnalysis (QR code scanner), and Android Photo Picker.',
    why: 'CameraX abstracts device-specific Camera2 quirks into lifecycle-aware UseCases while requiring careful frame buffer (ImageProxy) and Scoped Storage management.',
    concepts: ['CameraX ProcessCameraProvider bound to LifecycleOwner', 'UseCases: Preview, ImageCapture, ImageAnalysis (real-time QR scanning), VideoCapture', 'Tap-to-focus, pinch-to-zoom, flash modes, and front/back CameraSelector', 'Saving captured media to MediaStore (Scoped Storage) & sharing via FileProvider', 'Android 13+ System Photo Picker (PickVisualMedia: zero permissions needed)'],
    problems: ['Scanning QR codes at 60fps via ImageAnalysis without stalling the preview pipeline', 'Recording video smoothly across device orientation changes'],
    edgeCases: ['1. Always calling imageProxy.close() inside ImageAnalysis to prevent pipeline freeze', '2. Storage full during video recording: handle VideoRecordEvent.Finalize error', '3. Downsampling high-res photos with BitmapFactory.Options.inSampleSize'],
    constraints: 'Zero ImageProxy leaks; uses modern Photo Picker and MediaStore APIs.',
    deepQuestions: [
      'In CameraX ImageAnalysis, what happens to the underlying Camera2 ImageReader ring buffer if you use STRATEGY_KEEP_ONLY_LATEST and forget to call imageProxy.close() on an exception path?',
      'Why do JPEG images captured on Samsung and Pixel devices often appear rotated 90 degrees if you ignore EXIF orientation metadata?'
    ],
    commonFaqs: [
      'What are the four main UseCases in Jetpack CameraX and how do they bind to LifecycleOwner?',
      'Why is the Android Photo Picker preferred over requesting READ_MEDIA_IMAGES?',
      'How do you downsample a large image using BitmapFactory.Options.inSampleSize to prevent OutOfMemoryError?'
    ],
    resources: [
      { title: 'CameraX Overview & Architecture', url: 'https://developer.android.com/media/camera/camerax', type: 'Android Docs' },
      { title: 'Android Photo Picker Official Guide', url: 'https://developer.android.com/training/data-storage/shared/photopicker', type: 'Android Docs' }
    ],
    checklist: ['Bound Preview, ImageCapture, and ImageAnalysis UseCases to lifecycle', 'Built real-time QR code analyzer closing every ImageProxy', 'Integrated system Photo Picker and MediaStore saving']
  },
  {
    id: 'LAB 31', num: 31, title: 'File Handling & Scoped Storage Lab', phase: 'Phase 4', duration: '1.5 weeks',
    goal: 'Build a file manager mastering Android storage evolution: Internal storage, Scoped Storage, MediaStore, Storage Access Framework (SAF), DocumentFile, and FileProvider.',
    why: 'Android 10+ Scoped Storage fundamentally changed how apps read, write, and share files using content:// URIs instead of raw file paths.',
    concepts: ['Internal storage (filesDir, cacheDir) vs Scoped External storage', 'MediaStore API (reading/writing photos, videos, audio, downloads with IS_PENDING)', 'Storage Access Framework (SAF): ACTION_OPEN_DOCUMENT, ACTION_CREATE_DOCUMENT, ACTION_OPEN_DOCUMENT_TREE', 'Persisting URI permissions across reboots via takePersistableUriPermission', 'FileProvider for secure cross-app content:// URI sharing'],
    problems: ['Copying a large 500MB file via ContentResolver streams with live progress and cancellation', 'Persisting read/write access to a user-selected directory via SAF'],
    edgeCases: ['1. User revokes persisted SAF URI permission externally', '2. File deleted externally while app holds its URI', '3. Sharing a file via FileProvider with correct authorities and temporary grant flags'],
    constraints: 'All shared file operations use ContentResolver streams and content:// URIs.',
    deepQuestions: [
      'How does setting MediaStore.MediaColumns.IS_PENDING = 1 while writing a large video file to MediaStore prevent gallery apps from indexing a half-written corrupted file?',
      'Why did Android 7.0+ introduce FileUriExposedException when passing file:// URIs across app boundaries, and how does FileProvider grant temporary per-URI access?'
    ],
    commonFaqs: [
      'What is Scoped Storage (Android 10+) and what problem did it solve?',
      'When do you use Internal Storage vs MediaStore vs the Storage Access Framework (SAF)?',
      'How do you persist access to a SAF Document URI across device reboots (takePersistableUriPermission)?'
    ],
    resources: [
      { title: 'Data and File Storage Overview (Scoped Storage)', url: 'https://developer.android.com/training/data-storage', type: 'Android Docs' },
      { title: 'Access Media Files from Shared Storage (MediaStore)', url: 'https://developer.android.com/training/data-storage/shared/media', type: 'Android Docs' },
      { title: 'Open Files Using Storage Access Framework (SAF)', url: 'https://developer.android.com/training/data-storage/shared/documents-files', type: 'Android Docs' }
    ],
    checklist: ['Implemented MediaStore reads/writes and SAF document pickers', 'Persisted SAF URI permissions with takePersistableUriPermission', 'Shared app-private files securely with other apps via FileProvider']
  },
  {
    id: 'LAB 32', num: 32, title: 'Accessibility Lab', phase: 'Phase 4', duration: '1 week',
    goal: 'Audit and remediate an app for complete accessibility compliance: TalkBack screen reader navigation, semantic roles, custom actions, focus traversal order, live regions, and color contrast.',
    why: 'Accessible engineering ensures everyone can use your product and directly improves semantic UI testability.',
    concepts: ['TalkBack gestures & screen reader tree inspection', 'Compose semantics {}: contentDescription, Role (Switch, Checkbox, Tab), stateDescription, heading()', 'semantics(mergeDescendants = true) & clearAndSetSemantics', 'Minimum touch target size (48x48dp) & color contrast ratios (4.5:1 / 3:1)', 'Focus order (FocusRequester, focusProperties) & liveRegion announcements'],
    problems: ['Fixing unlabelled icon buttons, custom toggles missing Role.Switch, and dynamic search counts missing liveRegion announcements'],
    edgeCases: ['1. Merging composite card elements into a single TalkBack focus node', '2. Supporting 200% system font scale without clipping or overlapping text'],
    constraints: 'Zero issues reported by Google Accessibility Scanner.',
    deepQuestions: [
      'When building a complex list item with a primary click action and 3 secondary icon buttons (Share, Bookmark, Delete), how do CustomAccessibilityAction semantics reduce TalkBack swipe fatigue by 4x?',
      'How does Compose build a parallel SemanticsNode tree alongside the LayoutNode tree for AccessibilityService and UI testing?'
    ],
    commonFaqs: [
      'What is the minimum recommended touch target size on Android (48x48dp)?',
      'When should an Image contentDescription be null vs a descriptive string?',
      'How do you group a custom Row containing a label and a Switch so TalkBack treats the entire row as a single toggleable item?'
    ],
    resources: [
      { title: 'Accessibility in Jetpack Compose Official Guide', url: 'https://developer.android.com/develop/ui/compose/accessibility', type: 'Android Docs' },
      { title: 'Semantics in Jetpack Compose', url: 'https://developer.android.com/develop/ui/compose/semantics', type: 'Android Docs' }
    ],
    checklist: ['Audited and fixed all screens using TalkBack and Accessibility Scanner', 'Added semantic roles, stateDescriptions, and liveRegions', 'Verified layout resilience at 200% font scale']
  },
  {
    id: 'LAB 33', num: 33, title: 'CI/CD & Build Pipeline Lab', phase: 'Phase 5', duration: '2 weeks',
    goal: 'Build a complete GitHub Actions CI/CD pipeline: ktlint, Detekt, Android Lint, unit tests, instrumented tests (Firebase Test Lab), environment-variable keystore signing, Firebase App Distribution, and Play Store release automation.',
    why: 'Automated CI/CD pipelines enforce code quality on every PR and eliminate manual release errors.',
    concepts: ['GitHub Actions workflows: PR Check Pipeline, Main Branch Pipeline, Release Pipeline', 'Gradle tasks: assembleDebug, bundleRelease, lintDebug, testDebugUnitTest', 'Secure signingConfigs using Base64-decoded keystore & GitHub Secrets', 'Automated versionCode (CI build number / git tag count) & semantic versionName', 'Gradle dependency & build cache in CI, Detekt, ktlint, and Fastlane / Play Publisher'],
    problems: ['Automating PR verification (ktlint -> detekt -> lint -> unit tests -> debug APK)', 'Automating signed release AAB upload and R8 mapping file archiving'],
    edgeCases: ['1. Injecting signing keys strictly from CI environment variables with fallback for local dev builds', '2. Caching Gradle wrapper and build caches to cut CI run time by 50%'],
    constraints: 'Complete .github/workflows/*.yml files included in repository.',
    deepQuestions: [
      'How do you configure Gradle Remote/CI Build Caching and Configuration Cache in GitHub Actions so unchanged modules are restored in seconds without cache poisoning on PR branches?',
      'Why must you archive and upload R8 mapping.txt and native debug symbols for every release build in CI?'
    ],
    commonFaqs: [
      'How do you store and inject Android Keystore signing credentials securely in GitHub Actions?',
      'What is the difference between an APK (assembleRelease) and an Android App Bundle / AAB (bundleRelease)?',
      'What is the difference between buildTypes (debug/release) and productFlavors (staging/prod)?'
    ],
    resources: [
      { title: 'Configure Your Build with Gradle on Android', url: 'https://developer.android.com/build', type: 'Android Docs' },
      { title: 'Sign Your App from the Command Line / CI', url: 'https://developer.android.com/studio/publish/app-signing', type: 'Android Docs' }
    ],
    checklist: ['Implemented PR Check, Main, and Release GitHub Actions workflows', 'Configured secure environment-variable release signing', 'Integrated Detekt, ktlint, and automated test reporting']
  },
  {
    id: 'LAB 34', num: 34, title: 'Analytics & Feature Flags Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Build a provider-agnostic Analytics abstraction layer and Remote Feature Flag system with gradual rollouts, A/B variant assignment, and an in-app QA override menu.',
    why: 'Decoupling analytics and feature flags from vendor SDKs keeps business logic clean and allows instant kill-switches in production.',
    concepts: ['interface AnalyticsTracker decoupled from Firebase/Amplitude via DI multibindings', 'Structured snake_case event taxonomy & typed event models', 'FeatureFlag provider combining compile-time defaults, Firebase Remote Config, and local QA overrides', 'In-app QA Debug screen to toggle any feature flag at runtime', 'Overriding feature flags deterministically in unit/UI tests'],
    problems: ['Fanning out analytics events to both Firebase and an in-app debug logger without changing ViewModel code', 'Guarding a risky new feature behind a remote kill-switch flag'],
    edgeCases: ['1. App launched offline on first install before Remote Config fetches -> safe default fallback', '2. Local QA override taking precedence over Remote Config in debug/staging builds'],
    constraints: 'Zero direct Firebase imports in :feature modules.',
    deepQuestions: [
      'If a feature flag controls navigation graph structure or DI bindings, why can activating newly fetched Remote Config flags mid-session cause state inconsistency, and why should activation be staged to next cold/session start?',
      'How do you design a priority chain for Feature Flags (1. Test Override -> 2. Local QA Debug Menu -> 3. Remote Config -> 4. Compile-time Default)?'
    ],
    commonFaqs: [
      'Why should you wrap third-party Analytics SDKs behind your own domain interface?',
      'What is the difference between a release toggle, an operational kill-switch, and an A/B experiment flag?'
    ],
    resources: [
      { title: 'Now in Android Analytics Module Architecture', url: 'https://github.com/android/nowinandroid/tree/main/core/analytics', type: 'Source Code' },
      { title: 'Firebase Remote Config Loading Strategies', url: 'https://firebase.google.com/docs/remote-config/loading', type: 'Firebase Docs' }
    ],
    checklist: ['Built provider-agnostic AnalyticsTracker and FeatureFlagManager', 'Created an in-app QA Debug Menu for runtime flag toggling', 'Wrote unit tests covering both flag-on and flag-off branches']
  },
  {
    id: 'LAB 35', num: 35, title: 'Crash Monitoring & Error Recovery Lab', phase: 'Phase 5', duration: '1 week',
    goal: 'Integrate Crashlytics concepts, non-fatal exception reporting, custom breadcrumb ring-buffers, Thread.setDefaultUncaughtExceptionHandler, and automated crash-loop Safe Mode recovery.',
    why: 'Production resilience means having rich diagnostic context (breadcrumbs + custom keys) when crashes happen and automatically recovering from corrupted local state.',
    concepts: ['Crash reporting architecture: fatal crashes vs non-fatal recordException()', 'Custom crash metadata (setCustomKey, user state) & 50-event Breadcrumb ring buffer', 'Thread.setDefaultUncaughtExceptionHandler for pre-crash diagnostics', 'ProGuard/R8 mapping.txt deobfuscation', 'Startup crash-loop detector: booting into Safe Mode / clearing corrupted cache if app crashes 3x on launch'],
    problems: ['Gracefully degrading when a bad server payload causes serialization errors', 'Recovering automatically when a corrupted cache causes a startup crash loop'],
    edgeCases: ['1. UncaughtExceptionHandler must never block or swallow the crash without delegating to the default system handler', '2. Remotely disabling a crashing feature via feature flag on restart'],
    constraints: 'Include Breadcrumb logger and automated crash-loop recovery state machine.',
    deepQuestions: [
      'When implementing a custom Thread.UncaughtExceptionHandler, why must you save the previous default handler and delegate to it at the end, and why must disk writes inside uncaughtException() be synchronous and bounded?',
      'How do you architect a startup crash-loop detector that detects 3 crashes within 10 seconds of launch and boots into a self-healing Safe Mode?'
    ],
    commonFaqs: [
      'What are Breadcrumbs and Custom Keys in Crashlytics and how do they help reproduce bugs?',
      'When should you report a non-fatal exception vs ignore it (e.g., normal network IOException)?',
      'How does Crashlytics deobfuscate R8 stack traces?'
    ],
    resources: [
      { title: 'Customize Firebase Crashlytics Crash Reports', url: 'https://firebase.google.com/docs/crashlytics/customize-crash-reports', type: 'Firebase Docs' },
      { title: 'ApplicationExitInfo API (Detecting Native/OOM/ANR Exits)', url: 'https://developer.android.com/reference/android/app/ApplicationExitInfo', type: 'Android Docs' }
    ],
    checklist: ['Implemented Breadcrumb ring-buffer attached to crash reports', 'Built custom UncaughtExceptionHandler with crash-loop Safe Mode detection', 'Implemented graceful fallback UI for recoverable errors']
  },
  {
    id: 'LAB 36', num: 36, title: 'Pagination & Large Datasets Lab', phase: 'Phase 3', duration: '1.5 weeks',
    goal: 'Build an offline-first paginated feed over 10,000+ items using Paging 3, Room as the local source of truth, and RemoteMediator with a RemoteKeys table.',
    why: 'Paging 3 with RemoteMediator is the standard architecture for infinite-scrolling lists backed by a local database cache.',
    concepts: ['Paging 3 pipeline: PagingSource, RemoteMediator, Pager, PagingData', 'RemoteKeys entity storing next/prev page tokens inside Room transactions', 'LoadState (Loading, NotLoading, Error) for REFRESH, APPEND, and PREPEND', 'cachedIn(viewModelScope), insertSeparators headers, and LoadState footer retry UI', 'Testing Paging 3 pipelines with paging-testing (TestPager / asSnapshot)'],
    problems: ['Seamless infinite scroll that works offline from Room and fetches next pages from REST API when online', 'Pull-to-refresh clearing stale cache atomically inside a Room @Transaction'],
    edgeCases: ['1. End of pagination reached: show footer indicator', '2. Network error mid-scroll on page 3: keep pages 1–2 visible and show inline Retry button', '3. Local item mutation (bookmark/delete) triggering PagingSource invalidation without scroll jump'],
    constraints: 'Built with RemoteMediator + Room; tested with Paging 3 TestPager / asSnapshot.',
    deepQuestions: [
      'Inside RemoteMediator.load(LoadType.REFRESH), why must clearing old Room items + RemoteKeys and inserting page 1 items execute inside a single database.withTransaction {} block?',
      'How does PagingSource.getRefreshKey(state: PagingState) compute the anchor position so invalidating the database doesn’t jump the user back to the top of the list?'
    ],
    commonFaqs: [
      'What is the difference between PagingSource-only pagination and RemoteMediator pagination in Paging 3?',
      'Why must you call .cachedIn(viewModelScope) on a Flow<PagingData>?',
      'How do you display loading spinners and retry buttons at the bottom of a paginated LazyColumn?'
    ],
    resources: [
      { title: 'Paging 3 Library Overview & Architecture', url: 'https://developer.android.com/topic/libraries/architecture/paging/v3-overview', type: 'Android Docs' },
      { title: 'Page from Network and Database (RemoteMediator)', url: 'https://developer.android.com/topic/libraries/architecture/paging/v3-network-db', type: 'Android Docs' }
    ],
    checklist: ['Implemented Paging 3 RemoteMediator with Room and RemoteKeys', 'Handled header/footer LoadStates and inline retry', 'Tested pagination scenarios using paging-testing']
  },
  {
    id: 'LAB 37', num: 37, title: 'Kotlin DSL & Advanced Kotlin Lab', phase: 'Phase 1', duration: '2 weeks',
    goal: 'Build type-safe Kotlin DSLs (for a UI form validator, report builder, and network pipeline) exercising @DslMarker, inline/reified generics, value classes, delegation, variance, and Kotlin Contracts.',
    why: 'Mastering advanced Kotlin features lets you design expressive internal APIs and understand how Compose, Coroutines, and Gradle Kotlin DSL work under the hood.',
    concepts: ['DSL builders: @DslMarker, lambdas with receiver (T.() -> Unit)', 'inline, noinline, crossinline, and reified type parameters', 'Generics variance: out T (covariant), in T (contravariant), star projections', '@JvmInline value classes for zero-cost type safety', 'Property Delegation (by lazy, custom ReadWriteProperty) & Kotlin Contracts (callsInPlace)'],
    problems: ['Building a declarative validation DSL: validate { field("email") { notEmpty(); isEmail() } }', 'Writing zero-overhead typed IDs and Result monad operators (map, flatMap, recover)'],
    edgeCases: ['1. Preventing outer scope receiver leakage in nested DSL blocks with @DslMarker', '2. Understanding when @JvmInline value classes get boxed (nullable or generic usage)'],
    constraints: 'Inspect decompiled Java bytecode for inline functions and value classes and document in README.',
    deepQuestions: [
      'Under what exact bytecode scenarios does a @JvmInline value class lose its unboxed primitive optimization and allocate a heap wrapper object?',
      'What is the exact difference between noinline and crossinline in an inline higher-order function regarding non-local returns?'
    ],
    commonFaqs: [
      'Why does Kotlin require a function to be marked inline in order to use a reified type parameter?',
      'What is the difference between out T (covariance) and in T (contravariance) in Kotlin Generics?',
      'What problem does @DslMarker solve when building nested Kotlin DSLs?'
    ],
    resources: [
      { title: 'Type-Safe Builders (Kotlin DSLs)', url: 'https://kotlinlang.org/docs/type-safe-builders.html', type: 'Kotlin Docs' },
      { title: 'Inline Functions & Reified Type Parameters', url: 'https://kotlinlang.org/docs/inline-functions.html', type: 'Kotlin Docs' },
      { title: 'Inline Value Classes in Kotlin', url: 'https://kotlinlang.org/docs/inline-classes.html', type: 'Kotlin Docs' }
    ],
    checklist: ['Built a multi-level Kotlin DSL using @DslMarker', 'Implemented reified generic extensions and @JvmInline value classes', 'Used Kotlin Contracts (callsInPlace) in a custom builder']
  },
  {
    id: 'LAB 38', num: 38, title: 'KMP Shared Business Logic Lab', phase: 'Phase 7', duration: '3 weeks',
    goal: 'Extract the Domain and Data layers of an Android app into a shared Kotlin Multiplatform (:shared) module targeting Android and iOS (XCFramework): using official Jetpack KMP ViewModel and coroutines.',
    why: 'KMP is about sharing platform-agnostic business logic, networking, and state machines while respecting native platform boundaries.',
    concepts: ['KMP source sets: commonMain, commonTest, androidMain, iosMain, desktopMain', 'expect/actual mechanism vs interface-based platform abstractions', 'Official Jetpack KMP libraries in commonMain: androidx.lifecycle:lifecycle-viewmodel, Room KMP, DataStore KMP', 'Exporting KMP to iOS: XCFramework, Swift Package Manager, and SKIE (Swift-friendly Flow & sealed classes)', 'kotlinx.serialization, kotlinx.datetime, and kotlinx.coroutines across JVM and Kotlin/Native'],
    problems: ['Sharing 100% of domain entities, use cases, and ViewModels in commonMain across Android and iOS'],
    edgeCases: ['1. Cancelling commonMain viewModelScope when iOS UIViewController / SwiftUI view is dismissed', '2. Polymorphic sealed class serialization without JVM reflection', '3. Bridging Kotlin exceptions across Objective-C/Swift boundaries with @Throws'],
    constraints: 'Zero android.* or java.* imports inside commonMain; 100% of shared logic tested in commonTest.',
    deepQuestions: [
      'Why do uncaught Kotlin exceptions crossing into Swift/Objective-C terminate the iOS process unless annotated with @Throws, and how do sealed Result returns avoid this?',
      'How do tools like Touchlab SKIE transform Kotlin sealed hierarchies and StateFlows into exhaustive Swift enums and AsyncSequences?'
    ],
    commonFaqs: [
      'When should you use expect/actual vs a standard Kotlin interface injected via DI in KMP?',
      'How does the modern Kotlin/Native memory manager handle multithreading compared to the legacy freezing model?',
      'What official Android Jetpack libraries now work inside commonMain for KMP?'
    ],
    resources: [
      { title: 'Kotlin Multiplatform Official Documentation', url: 'https://kotlinlang.org/docs/multiplatform.html', type: 'Kotlin Docs' },
      { title: 'Kotlin Multiplatform for Android Developers (Jetpack KMP)', url: 'https://developer.android.com/kotlin/multiplatform', type: 'Android Docs' },
      { title: 'Touchlab SKIE (Swift-Kotlin Interface Enhancer)', url: 'https://skie.touchlab.co/', type: 'Library Docs' }
    ],
    checklist: ['Zero android.* or java.* imports exist inside commonMain', 'Shared ViewModel and domain use cases are 100% unit-tested in commonTest', 'Can explain how Kotlin/Native compiles commonMain to an iOS .xcframework', 'Can articulate when to use interface injection vs expect/actual']
  },
  {
    id: 'LAB 39', num: 39, title: 'KMP Networking & Persistence Lab', phase: 'Phase 7', duration: '2 weeks',
    goal: 'Build a complete multiplatform data layer in commonMain: Ktor Client (OkHttp + Darwin engines), comparing SQLDelight (.sq) and Room Multiplatform (Room KMP) for persistence, plus DataStore KMP.',
    why: 'Data persistence and networking are the highest-ROI layers to share in KMP. Knowing both SQLDelight and official Room KMP makes you versatile on any KMP team.',
    concepts: ['Ktor Client in commonMain with platform engines (OkHttp for Android, Darwin for iOS)', 'Ktor plugins: ContentNegotiation, Auth (atomic token refresh), Logging, HttpCache', 'SQLDelight (.sq SQL-first codegen) vs Room KMP (@Entity/@Dao KSP multiplatform with BundledSQLiteDriver)', 'Reactive database Flows in commonMain & schema migrations (.sqm / AutoMigration)', 'Multiplatform Preferences/Proto DataStore using Okio Path'],
    problems: ['Executing identical offline-first caching, reactive queries, and atomic token refresh across Android and iOS'],
    edgeCases: ['1. Simultaneous 401 token refresh across OkHttp and Darwin engines synchronized via commonMain Mutex', '2. Concurrent SQLite read/write behavior with BundledSQLiteDriver on iOS and Android', '3. Database migration verification in commonTest'],
    constraints: 'Entire Repository, NetworkClient, and Database queries live in commonMain.',
    repoTree: 'commonMain/\n  NetworkClient.kt (Ktor, expect engine)\n  UserRepository.kt\n  Database.sq (SQLDelight) / AppDatabase.kt (Room KMP)\nandroidMain/\n  NetworkClientAndroid.kt (OkHttp engine)\n  DatabaseDriverAndroid.kt\niosMain/\n  NetworkClientIos.kt (Darwin engine)\n  DatabaseDriverIos.kt',
    deepQuestions: [
      'Compare SQLDelight (SQL-first .sq files) vs Room KMP (Kotlin @Entity/@Dao KSP): what are the architectural trade-offs regarding complex SQL joins, migration verification, and compile-time dialect checking?',
      'Why is BundledSQLiteDriver recommended in Room KMP across Android and iOS instead of relying on each OS’s built-in system SQLite version?'
    ],
    commonFaqs: [
      'Which HTTP engines does Ktor use on Android vs iOS in a KMP project?',
      'Why can’t you use Gson or standard Moshi reflection in KMP commonMain, and how does kotlinx.serialization work instead?',
      'How do you create a DataStore file path on Android vs iOS in KMP?'
    ],
    resources: [
      { title: 'Room Kotlin Multiplatform (Room KMP) Setup Guide', url: 'https://developer.android.com/kotlin/multiplatform/room', type: 'Android Docs' },
      { title: 'SQLDelight Multiplatform Documentation', url: 'https://sqldelight.github.io/sqldelight/', type: 'Library Docs' },
      { title: 'Ktor Multiplatform Client Engines', url: 'https://ktor.io/docs/client-engines.html', type: 'Ktor Docs' }
    ],
    checklist: ['Both Android and iOS targets execute offline-first reads/writes against the shared persistence layer', 'Ktor client handles token refresh atomically in commonMain tested with MockEngine', 'Database migrations are verified with automated tests in commonTest']
  },
  {
    id: 'LAB 40', num: 40, title: 'KMP Dependency Injection Lab', phase: 'Phase 7', duration: '1 week',
    goal: 'Implement multiplatform dependency injection in KMP using Koin (and compare with compile-time kotlin-inject), wiring shared ViewModels, repositories, and platform-specific drivers.',
    why: 'Hilt/Dagger is Android/JVM-only. Multiplatform apps require KMP-native DI that cleanly bridges commonMain modules with Android Context and iOS native dependencies.',
    concepts: ['Koin Multiplatform: koin-core, koin-android, koin-compose-viewmodel', 'Shared module {} blocks + expect val platformModule: Module', 'single {}, factory {}, scoped {}, and viewModelOf() in commonMain', 'Initializing Koin from Android Application and iOS MainViewController / Swift @main', 'Compile-time DI awareness (Koin Annotations KSP / kotlin-inject) & checkModules() testing'],
    problems: ['Providing Android Context to AndroidSqliteDriver and iOS paths to NativeSqliteDriver without leaking platform types into commonMain'],
    edgeCases: ['1. Scoped dependency disposal when screen ViewModel clears on Android and iOS', '2. Overriding production modules with Fakes inside commonTest'],
    constraints: 'All ViewModels and repositories wired in commonMain.',
    deepQuestions: [
      'Compare runtime DSL dependency resolution (Koin) with compile-time KSP code generation (kotlin-inject / Metro) in a 30-module KMP project: how do startup overhead and graph validation differ?',
      'How do you bridge Swift-implemented iOS dependencies (e.g., Apple CoreBluetooth wrapper) into your shared Koin graph at iOS app startup?'
    ],
    commonFaqs: [
      'Why doesn’t Dagger/Hilt work inside a KMP commonMain module?',
      'How do you provide Android Application Context to platform-specific dependencies in Koin Multiplatform?'
    ],
    resources: [
      { title: 'Koin Kotlin Multiplatform Official Reference', url: 'https://insert-koin.io/docs/reference/koin-mp/kmp/', type: 'Library Docs' },
      { title: 'kotlin-inject Compile-Time DI for KMP', url: 'https://github.com/evant/kotlin-inject', type: 'Library Docs' }
    ],
    checklist: ['platformModule cleanly provides platform drivers on Android, iOS, and Desktop', 'Shared ViewModel instances are injected with scoped dependencies and survive Android config changes', 'All DI modules pass automated graph verification tests']
  },
  {
    id: 'LAB 41', num: 41, title: 'Compose Multiplatform Lab', phase: 'Phase 7', duration: '3 weeks',
    goal: 'Build a production UI running across Android, iOS, and Desktop using Compose Multiplatform (CMP): featuring shared screens, multiplatform resources, adaptive layouts, and native UIKitView interop.',
    why: 'Compose Multiplatform lets teams share UI across Android, iOS (Skia/Metal), and Desktop while dropping down to native UIKit/AndroidViews whenever platform-specific views are needed.',
    concepts: ['CMP project structure: composeApp/ (commonMain, androidMain, iosMain, desktopMain)', 'Multiplatform compose-resources (Res.string, Res.drawable, custom fonts)', 'Multiplatform type-safe Navigation Compose / Decompose', 'Adaptive layouts using material3-adaptive WindowSizeClass across phone, tablet, and desktop', 'Native UI Interop: UIKitView on iOS, AndroidView on Android, SwingPanel on Desktop'],
    problems: ['Embedding a native iOS MKMapView (UIKitView) and Android MapView (AndroidView) inside a shared Compose screen', 'Adapting navigation from bottom bar on mobile to NavigationRail on desktop'],
    edgeCases: ['1. Handling gesture conflicts when embedding UIKitView inside a scrollable Compose container', '2. iOS keyboard IME insets and predictive back gesture handling', '3. Window resize state preservation on Desktop'],
    constraints: 'Single shared Compose UI codebase running at 60fps on Android, iOS, and Desktop.',
    deepQuestions: [
      'How does Compose Multiplatform render frames on iOS via Skiko (Skia + Metal) inside a ComposeUIViewController, and how does it synchronize native UIKitView overlays during scrolling?',
      'How do you handle platform-specific predictive back gestures and iOS swipe-to-go-back in a shared Compose Multiplatform navigation graph?'
    ],
    commonFaqs: [
      'How do you share strings, vector drawables, and fonts across Android and iOS in Compose Multiplatform?',
      'How do you embed a native iOS UIView or SwiftUI view inside a Compose Multiplatform screen (UIKitView)?'
    ],
    resources: [
      { title: 'Compose Multiplatform Official Documentation', url: 'https://www.jetbrains.com/lp/compose-multiplatform/', type: 'JetBrains Docs' },
      { title: 'UIKit and SwiftUI Integration in Compose Multiplatform', url: 'https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-ios-ui-integration.html', type: 'JetBrains Docs' }
    ],
    checklist: ['App runs at 60fps on Android, iOS Simulator/Device, and Desktop JVM from a single shared UI module', 'Uses type-safe multiplatform Navigation Compose with deep link support', 'Includes bidirectional UIKitView / AndroidView native component integration']
  },
  {
    id: 'LAB 42', num: 42, title: 'App Widget Lab (Jetpack Glance)', phase: 'Phase 4', duration: '1 week',
    goal: 'Build an interactive home-screen App Widget using Jetpack Glance that displays live data from the app, adapts to multiple widget grid sizes, and handles user tap actions.',
    why: 'Glance provides a declarative Compose-style syntax for widgets, but compiles down to RemoteViews across IPC boundaries with unique state and sizing rules.',
    concepts: ['GlanceAppWidget & GlanceAppWidgetReceiver lifecycle', 'How Glance translates composables to RemoteViews (and why GlanceModifier is distinct from Compose UI Modifier)', 'Responsive widget layouts using SizeMode.Exact and SizeMode.Responsive', 'GlanceStateDefinition backed by DataStore', 'Interactive tap actions: actionStartActivity and actionRunCallback (ActionCallback)'],
    problems: ['Toggling a task checkbox directly on the home-screen widget and syncing immediately with Room + main app UI'],
    edgeCases: ['1. User places 3 separate widget instances on the home screen configured with different GlanceIds', '2. ActionCallback executed while main app process is dead', '3. Respecting RemoteViews bitmap memory limits'],
    constraints: 'Built with Jetpack Glance (androidx.glance:glance-appwidget).',
    deepQuestions: [
      'Why does Jetpack Glance use its own Applier and Emittable tree to translate @Composable functions into Android RemoteViews XML layouts instead of rendering with a Compose Canvas?',
      'How does SizeMode.Responsive pre-render multiple RemoteViews trees into a single parcel so the System Launcher can resize the widget smoothly without waking up your app process?'
    ],
    commonFaqs: [
      'Why can’t you use standard androidx.compose.material3 components inside a Jetpack Glance widget?',
      'How do you push an immediate data update from your app’s Repository to all active home-screen widgets?'
    ],
    resources: [
      { title: 'Build App Widgets with Jetpack Glance', url: 'https://developer.android.com/develop/ui/compose/glance', type: 'Android Docs' },
      { title: 'Manage and Update GlanceAppWidget State', url: 'https://developer.android.com/develop/ui/compose/glance/create-app-widget', type: 'Android Docs' }
    ],
    checklist: ['Widget adapts cleanly across small, medium, and large grid sizes using SizeMode.Responsive', 'Interactive button on widget executes an ActionCallback and updates state without opening the Activity', 'Multiple instances of the widget maintain independent state']
  },
  {
    id: 'LAB 43', num: 43, title: 'IPC, ContentProvider, AIDL & Binder Lab', phase: 'Phase 4', duration: '1.5 weeks',
    goal: 'Build a multi-process system: a Host App exposing data via a custom ContentProvider and an AIDL service, and a Client App querying it across process boundaries: mastering Android’s Binder IPC.',
    why: 'Every Android OS interaction crosses processes over the Linux Binder driver. Understanding the 1MB shared Binder transaction buffer, CursorWindow, and AIDL threading is Staff-level mastery.',
    concepts: ['ContentProvider: query, insert, update, delete, getType, UriMatcher, and custom read/write permissions', 'Binder IPC Architecture: /dev/binder, the 1MB shared transaction buffer limit, and TransactionTooLargeException', 'CursorWindow (2MB shared memory window for cross-process SQLite Cursors)', 'Hand-writing an AIDL (.aidl) interface with in/out/inout tags, oneway calls, and IBinder.DeathRecipient', 'ContentResolver.registerContentObserver reactive updates & Android 11+ <queries> package visibility'],
    problems: ['Streaming large payloads (>1MB) across processes using ParcelFileDescriptor / shared memory without triggering TransactionTooLargeException', 'Securing cross-app ContentProvider access with custom permissions and parameterized SQL queries'],
    edgeCases: ['1. Host process crashes mid-request: handle DeadObjectException / RemoteException and DeathRecipient', '2. Deliberately exceeding 1MB over AIDL to reproduce TransactionTooLargeException and fixing it', '3. Blocking SQL injection attempts in ContentProvider.query()', '4. Thread-safety of ContentProvider/AIDL methods executing on the 15-thread Binder pool'],
    constraints: 'Two separate apps (Host APK + Client APK) communicating via ContentProvider and AIDL.',
    deepQuestions: [
      'How does the Linux /dev/binder kernel driver achieve single-copy IPC using mmap() into the target process’s user space compared to traditional two-copy socket/pipe IPC?',
      'In an AIDL interface, what does the oneway keyword do to call semantics, threading on the remote Binder pool, and exception propagation?'
    ],
    commonFaqs: [
      'On which thread do ContentProvider.query() and AIDL Stub methods execute by default?',
      'What is the difference between Messenger and AIDL for Inter-Process Communication (IPC)?',
      'Why did Android 11 introduce Package Visibility (<queries> in AndroidManifest.xml)?'
    ],
    resources: [
      { title: 'Android Interface Definition Language (AIDL) Guide', url: 'https://developer.android.com/develop/background-work/services/aidl', type: 'Android Docs' },
      { title: 'Content Providers Overview & Security', url: 'https://developer.android.com/guide/topics/providers/content-providers', type: 'Android Docs' }
    ],
    checklist: ['Two separate APKs communicate via both ContentProvider and a custom .aidl interface', 'ContentProvider enforces custom read/write permissions and blocks SQL injection', 'Client app registers a ContentObserver and reacts live when the provider app modifies its database']
  },
  {
    id: 'LAB 44', num: 44, title: 'Payments & Play Billing Lab', phase: 'Phase 4', duration: '2 weeks',
    goal: 'Integrate Google Play Billing Library for one-time in-app purchases and subscriptions with server-side purchase token verification, acknowledgement, proration upgrades/downgrades, and offline entitlement caching.',
    why: 'Monetization flows require ironclad state handling: unacknowledged purchases auto-refund after 72 hours, and pending/interrupted purchases must recover cleanly.',
    concepts: ['BillingClient connection lifecycle & exponential backoff reconnection', 'queryProductDetailsAsync (ProductType.INAPP vs SUBS)', 'launchBillingFlow & PurchasesUpdatedListener', 'Server-side purchase verification & acknowledgePurchase / consumeAsync (3-day refund rule)', 'Handling PurchaseState.PENDING (delayed cash/bank payments) & subscription ReplacementMode proration'],
    problems: ['User completes purchase, app is killed before acknowledgement -> recover and acknowledge via queryPurchasesAsync on next startup', 'User cancels subscription mid-month -> retain premium entitlement until billing period expiry'],
    edgeCases: ['1. PurchaseState.PENDING where entitlement must wait until backend RTDN confirmation', '2. BILLING_UNAVAILABLE or network loss mid-checkout', '3. Multi-device entitlement sync via backend'],
    constraints: 'Never grant entitlements before simulated server-side verification.',
    deepQuestions: [
      'Walk through the end-to-end architecture between the Android BillingClient, your backend server, the Google Play Developer API, and Real-Time Developer Notifications (RTDN / Cloud Pub/Sub) for subscription renewals and cancellations.',
      'Why must obfuscatedAccountId be set on BillingFlowParams to prevent account-switching entitlement theft?'
    ],
    commonFaqs: [
      'What happens if you do not acknowledge a Google Play purchase within 3 days?',
      'What is the difference between acknowledgePurchase() and consumeAsync() in Play Billing?',
      'Why must purchase verification happen on your backend server rather than trusting the client?'
    ],
    resources: [
      { title: 'Google Play Billing Library Overview', url: 'https://developer.android.com/google/play/billing', type: 'Android Docs' },
      { title: 'Integrate the Google Play Billing Library into Your App', url: 'https://developer.android.com/google/play/billing/integrate', type: 'Android Docs' }
    ],
    checklist: ['BillingClient automatically reconnects with exponential backoff on disconnect', 'queryPurchasesAsync() runs on every app launch/resume to recover interrupted purchases', 'Pending, canceled, and acknowledged states are covered by unit tests using a fake billing wrapper']
  },
  {
    id: 'LAB 45', num: 45, title: 'Debugging Mastery Lab', phase: 'Phase 5', duration: '1.5 weeks',
    goal: 'Master the full Staff-level Android diagnostic toolkit: conditional/non-suspending breakpoints, ADB dumpsys forensics, ApplicationExitInfo, ANR trace decoding, Heap dominator trees, and Perfetto.',
    why: 'Senior engineers debug 10x faster because they follow a systematic hypothesis-driven process using ADB dumpsys, Perfetto, and heap forensics instead of guessing.',
    concepts: ['Android Studio Debugger: conditional breakpoints, non-suspending logging breakpoints, Evaluate Expression, Coroutine Debugger', 'ADB Forensics: adb shell dumpsys activity activities, dumpsys meminfo, dumpsys battery, dumpsys window, dumpsys activity exit-info (ApplicationExitInfo)', 'Simulating edge cases via ADB: adb shell am kill, adb shell input, wireless debugging', 'Reading /data/anr/ traces (RUNNABLE, BLOCKED, lock owner thread IDs)', 'Memory Profiler .hprof analysis: Shallow Size vs Retained Size & Dominator Tree'],
    problems: ['Diagnosing a silent background process kill using dumpsys activity exit-info', 'Pinpointing a two-thread lock inversion deadlock from a raw ANR trace dump'],
    edgeCases: ['1. Silent native/OOM exit with no Java stack trace', '2. Debugging a timing-sensitive race condition using non-suspending tracepoints so thread timing is not altered'],
    constraints: 'Document root-cause forensic reports for 5 complex debugging scenarios.',
    deepQuestions: [
      'How do you use ActivityManager.getHistoricalProcessExitReasons() (ApplicationExitInfo on Android 11+) to programmatically detect whether the previous session died from an ANR, Native Crash (SIGSEGV), Low Memory Killer (REASON_LOW_MEMORY), or Excessive Resource Usage?',
      'When debugging a race condition between two coroutines, why does a standard suspending breakpoint hide the bug ("Heisenbug"), and how do non-suspending evaluate-and-log tracepoints solve it?'
    ],
    commonFaqs: [
      'Which ADB commands do you use to inspect the current Activity back stack, memory usage, and simulate process death?',
      'How do you read a thread dump to identify a Classic Deadlock between two threads?',
      'How do you inspect live Room databases and network requests in Android Studio?'
    ],
    resources: [
      { title: 'Android Debug Bridge (ADB) Complete Reference', url: 'https://developer.android.com/tools/adb', type: 'Android Docs' },
      { title: 'dumpsys System Diagnostics Command-Line Tool', url: 'https://developer.android.com/tools/dumpsys', type: 'Android Docs' },
      { title: 'Debug Your App in Android Studio', url: 'https://developer.android.com/studio/debug', type: 'Android Docs' }
    ],
    checklist: ['Can capture and read a Perfetto trace to identify why a frame took >16.6ms', 'Can use adb shell am kill and dumpsys activity activities to verify process death restoration', 'Can locate the exact GC root of a leaked object in an .hprof dump without LeakCanary', 'Can diagnose a thread deadlock from raw thread dump stack traces']
  },
  {
    id: 'LAB 46', num: 46, title: 'Custom Compose Layouts, Canvas & Modifier.Node Lab', phase: 'Phase 2', duration: '1.5 weeks',
    goal: 'Build a high-frequency financial candlestick chart and a custom staggered masonry grid from scratch using Layout, MeasurePolicy, Canvas/DrawScope, and the low-allocation Modifier.Node API: achieving 60fps pan/zoom gesture handling without unnecessary recompositions.',
    why: 'Standard Row, Column, and Box layouts are not enough for complex data visualizations, custom masonry grids, or ultra-low-allocation modifiers. Mastering MeasurePolicy, DrawScope, and Modifier.Node separates UI assembly from true UI engine engineering.',
    concepts: [
      'Compose 3-phase pipeline deep dive: Composition -> Layout (Measure & Place) -> Drawing',
      'Custom Layout & MeasurePolicy: intrinsic measurements (minIntrinsicWidth, maxIntrinsicHeight), constraints propagation, and single-pass measurement enforcement',
      'SubcomposeLayout internals: slot subcomposition lifecycle, when it is required (e.g., BoxWithConstraints, LazyColumn), and why it is expensive compared to standard Layout',
      'Modifier.Node & ModifierNodeElement vs legacy Modifier.composed: stateless allocation-free modifier updates, DrawModifierNode, LayoutModifierNode, PointerInputModifierNode',
      'Canvas & DrawScope: hardware-accelerated drawWithCache, Path pooling, offscreen compositing layers (CompositingStrategy.Offscreen), blend modes, and multi-touch detectTransformGestures'
    ],
    problems: [
      'Rendering and panning/zooming 10,000 candlestick data points at 60/120fps without allocating objects inside onDraw',
      'Building a custom ModifierNodeElement that animates and draws custom borders/overlays with zero per-frame heap allocations'
    ],
    edgeCases: [
      '1. Infinite maximum constraints passed when nesting custom Layout inside a scrollable container: detect and throw descriptive exception or clamp gracefully',
      '2. drawWithCache invalidation only when size or theme token changes, avoiding Path object allocation inside onDraw at 120Hz',
      '3. Multi-touch pinch-to-zoom combined with fling decay inside a parent HorizontalPager without gesture arena starvation',
      '4. Retaining Modifier.Node coroutine state across modifier chain updates while properly detaching on onDetach()'
    ],
    constraints: 'Zero object allocations inside DrawScope onDraw; custom Modifier implemented strictly with Modifier.Node & ModifierNodeElement.',
    deepQuestions: [
      'Why did the Compose team deprecate Modifier.composed in favor of Modifier.Node and ModifierNodeElement, and how does Modifier.Node impact GC pressure during animations?',
      'Explain how SubcomposeLayout works under the hood. Why does it break the standard single-pass Composition-then-Layout contract, and when should you avoid it?',
      'Why does Compose enforce single-pass measurement in MeasurePolicy, and how do Intrinsic Measurements (IntrinsicSize.Min / Max) work around this without exponential layout passes?'
    ],
    commonFaqs: [
      'What is the difference between drawBehind, drawWithContent, and drawWithCache in Jetpack Compose?',
      'How do you implement a custom layout in Compose when Row, Column, or FlowRow aren\'t sufficient?',
      'How do you resolve touch gesture conflicts between a child custom Canvas and a parent scrollable container?'
    ],
    resources: [
      { title: 'Custom Layouts in Compose', url: 'https://developer.android.com/develop/ui/compose/layouts/custom', type: 'Android Docs' },
      { title: 'Custom Modifiers & Modifier.Node', url: 'https://developer.android.com/develop/ui/compose/custom-modifiers', type: 'Android Docs' },
      { title: 'Graphics & Canvas in Compose', url: 'https://developer.android.com/develop/ui/compose/graphics/draw/overview', type: 'Android Docs' }
    ],
    checklist: [
      'Custom ModifierNodeElement passes inspectable properties and updates node state with zero object allocations per frame',
      'Custom Canvas chart pans and zooms 10,000 data points at 60fps using drawWithCache and viewport culling',
      'Can explain the exact difference between Layout and SubcomposeLayout'
    ]
  },
  {
    id: 'LAB 47', num: 47, title: 'Real-Time Protocols: WebSockets, SSE & gRPC/Protobuf Lab', phase: 'Phase 3', duration: '1.5 weeks',
    goal: 'Build a real-time collaborative order-book and live event stream client supporting full-duplex WebSockets (Ktor/OkHttp), Server-Sent Events (SSE), and binary gRPC/Protobuf streams: complete with connection state machines, heartbeat ping/pong, exponential backoff with jitter, and missed-event sequence reconciliation.',
    why: 'Production apps for chat, ride-sharing, live sports, and financial trading rely on persistent streaming connections. Handling half-open sockets, sequence gaps during handoffs, and binary Protobuf framing is critical for reliability and battery life.',
    concepts: [
      'Full-duplex WebSockets (OkHttp WebSocketListener & Ktor webSocketSession) vs half-duplex SSE (Server-Sent Events) vs gRPC bidirectional streaming',
      'Protocol Buffers (Protobuf / Wire): binary wire format encoding, field tags, varints, backward/forward schema compatibility vs JSON overhead',
      'Connection Lifecycle State Machine: DISCONNECTED -> CONNECTING -> CONNECTED -> RECONNECTING exposed as a hot StateFlow',
      'Resilience & Reconnection: Exponential backoff with full jitter (random(0, min(cap, base * 2^attempt))) to prevent thundering herd on server recovery',
      'Heartbeat & Half-Open Socket Detection: Ping/Pong intervals, detecting silent NAT/cellular drops, and resetting sockets on NetworkCallback.onAvailable',
      'Sequence Gap Detection & Catch-up: Tracking last_event_id / monotonic sequence numbers, buffering incoming frames during delta REST catch-up, and deduplicating events',
      'Battery & Lifecycle Awareness: Closing or throttling real-time sockets when app moves to background (ProcessLifecycleOwner) and falling back to FCM high-priority data push'
    ],
    problems: [
      'Reconciling missed live events seamlessly when switching from WiFi to cellular without dropping or duplicating messages',
      'Coalescing high-frequency 500 msg/sec order-book updates before writing to Room and rendering in Compose'
    ],
    edgeCases: [
      '1. Silent cellular-to-WiFi network switch (half-open TCP socket where client thinks it is connected): detect via missed Pong timeout and force reconnect',
      '2. Sequence gap detected (seq=105 arrives after seq=101): buffer live WebSocket frames while fetching 102..104 over HTTP/gRPC, then merge in strict order',
      '3. Server drops connection and 50,000 clients reconnect simultaneously: verify full jitter spreads reconnection timestamps',
      '4. Backpressure when server emits 500 messages/sec: coalesce updates using conflate() or batched windowing before updating Room/UI'
    ],
    constraints: 'Deterministic virtual-time unit tests for reconnection backoff and sequence gap recovery; includes both WebSocket and Protobuf/gRPC streams.',
    deepQuestions: [
      'How do you design a WebSocket client on Android that guarantees zero missed messages across temporary network drops and silent cellular handoffs?',
      'Why is exponential backoff alone insufficient when a backend service recovers from an outage, and how does Full Jitter solve the thundering herd problem?',
      'Compare gRPC with Protobuf against REST with JSON on mobile: how do HTTP/2 multiplexing, binary serialization, and persistent connections impact battery and radio wake-locks?'
    ],
    commonFaqs: [
      'When should you choose WebSockets vs Server-Sent Events (SSE) vs HTTP Polling in a mobile app?',
      'How do you manage a WebSocket connection when the user backgrounds the Android app?',
      'How is backward and forward compatibility maintained when evolving a .proto schema?'
    ],
    resources: [
      { title: 'gRPC Kotlin / Android Guide', url: 'https://grpc.io/docs/platforms/android/kotlin/', type: 'Official Docs' },
      { title: 'Protocol Buffers Language Guide (proto3)', url: 'https://protobuf.dev/programming-guides/proto3/', type: 'Official Docs' },
      { title: 'Ktor Client WebSockets', url: 'https://ktor.io/docs/client-websockets.html', type: 'Ktor Docs' }
    ],
    checklist: [
      'Connection manager handles airplane-mode toggles and WiFi/cellular switches without leaking sockets or coroutines',
      'Sequence gap recovery replays missed messages in exact causal order with zero duplicates',
      'Protobuf/gRPC client and WebSocket pipeline are fully unit-tested with deterministic virtual time'
    ]
  },
  {
    id: 'LAB 48', num: 48, title: 'Cloud BaaS Architecture: Firebase & Supabase (KMP) Lab', phase: 'Phase 3', duration: '2 weeks',
    goal: 'Architect a vendor-agnostic real-time collaborative workspace that can switch between Firebase (Firestore, Auth, Storage) and Supabase (supabase-kt in KMP: PostgREST, GoTrue Auth, Postgres Changes Realtime, Storage) via clean domain interfaces: enforcing strict security rules, Row-Level Security (RLS), and offline-first sync without leaking BaaS SDK types into the domain or UI layers.',
    why: 'Firebase and Supabase are ubiquitious in modern Android and KMP teams, yet most developers tightly couple their UI and ViewModels directly to Firestore DocumentSnapshots or Supabase DTOs. Mastering clean BaaS abstraction, Security Rules, and Postgres RLS is essential for production architecture.',
    concepts: [
      'Anti-Corruption Layer (ACL) for BaaS: Wrapping FirebaseFirestore / SupabaseClient behind pure domain Repository interfaces so zero Firebase or Supabase imports exist in :domain or :presentation',
      'Firebase Cloud Firestore Internals: Document/Collection data modeling, composite indexes, real-time snapshot listeners (callbackFlow), built-in offline persistence cache, optimistic transactions, and batched writes',
      'Supabase Multiplatform (supabase-kt): Ktor-based KMP modules (postgrest-kt, auth-kt, realtime-kt, storage-kt) running in commonMain across Android and iOS',
      'Security Model Comparison: Firebase Declarative Security Rules (request.auth.uid == resource.data.ownerId) vs Supabase PostgreSQL Row-Level Security (RLS) policies (auth.uid() = user_id) and JWT custom claims',
      'Real-time & Presence: Firestore Snapshot Listeners vs Supabase Realtime (Postgres CDC postgres_changes, Broadcast, and Presence channels)',
      'Cost & Performance Traps: Preventing Firestore N+1 document read explosion, pagination with query cursors (startAfterDocument), and hybrid local Room/SQLDelight caching'
    ],
    problems: [
      'Swapping the underlying cloud backend between Firebase and Supabase via DI qualifiers without touching a single line of Domain or Compose UI code',
      'Enforcing tenant isolation at the database layer using Firestore Security Rules and Supabase PostgreSQL RLS policies'
    ],
    edgeCases: [
      '1. Firestore snapshot listener emits cached isFromCache = true data with hasPendingWrites = true while offline: surface accurate sync status badge in UI',
      '2. Supabase JWT access token expires while a Realtime Postgres Changes channel is subscribed: automatically refresh token via auth-kt and re-authenticate the socket without dropping events',
      '3. Unauthorized client attempts to read/mutate another tenant\'s rows: verify both Firestore Security Rules and Supabase Postgres RLS reject the operation',
      '4. Swapping the DI binding from @FirebaseBacked to @SupabaseBacked: verify 100% of domain and ViewModel tests pass unchanged'
    ],
    constraints: 'Zero com.google.firebase.* or io.github.jan.supabase.* imports outside :data implementation modules; include tested Firestore rules and Postgres RLS SQL migration files.',
    deepQuestions: [
      'How do you prevent vendor lock-in when building an app on top of Firebase or Supabase, especially regarding real-time listeners, pagination cursors, and authentication tokens?',
      'Compare Firebase Firestore\'s NoSQL document model and Security Rules with Supabase\'s PostgreSQL relational model and Row-Level Security (RLS): what are the architectural trade-offs for complex filtering, joins, and read billing?',
      'How does Firestore\'s local offline cache work under the hood, and when should you still maintain your own Room/SQLDelight database instead of relying on Firestore\'s built-in cache?'
    ],
    commonFaqs: [
      'How do you convert a Firebase SnapshotListener into a Kotlin Flow safely without leaking the listener?',
      'What is Row-Level Security (RLS) in Supabase, and why is it mandatory when querying PostgREST directly from a mobile client?',
      'How do you use supabase-kt inside a Kotlin Multiplatform (commonMain) shared module?'
    ],
    resources: [
      { title: 'Firebase Android Documentation', url: 'https://firebase.google.com/docs/android/setup', type: 'Firebase Docs' },
      { title: 'Cloud Firestore Security Rules & Offline Data', url: 'https://firebase.google.com/docs/firestore/security/get-started', type: 'Firebase Docs' },
      { title: 'Supabase Kotlin Multiplatform SDK (supabase-kt)', url: 'https://supabase.com/docs/reference/kotlin/installing', type: 'Supabase Docs' }
    ],
    checklist: [
      'Zero com.google.firebase.* or io.github.jan.supabase.* imports exist outside the :data implementation modules',
      'Both Firestore Security Rules and Supabase RLS policies are written, version-controlled, and tested against unauthorized access',
      'Real-time streams properly unregister/unsubscribe in awaitClose when the UI lifecycle stops'
    ]
  },
  {
    id: 'LAB 49', num: 49, title: 'Advanced KMP Interop: Swift/Obj-C (SKIE), CInterop & JNI/NDK Lab', phase: 'Phase 7', duration: '2 weeks',
    goal: 'Bridge Kotlin Multiplatform with native C/C++ libraries and idiomatic Swift: build a shared cryptography/DSP module using Android NDK (JNI + CMake) on Android and Kotlin/Native cinterop on iOS, and expose idiomatic Swift APIs (converting Kotlin Flow to AsyncSequence, exhaustive sealed enums, and default arguments) using Touchlab SKIE.',
    why: 'Real-world KMP adoption in mixed Android/iOS organizations succeeds or fails on Swift ergonomics and native C/C++ library integration. Understanding the Objective-C header bottleneck, SKIE, cinterop, JNI, and Android 15+ 16KB page alignment is Staff-level multiplatform engineering.',
    concepts: [
      'Objective-C Bottleneck in KMP: Why Kotlin/Native compiles to an Objective-C header (.h) before Swift imports it, causing loss of generics on interfaces, suspend cancellation, exhaustive sealed classes, and Flow',
      'Touchlab SKIE & KMP-NativeCoroutines: Generating Swift-friendly wrappers so Kotlin Flow<T> becomes Swift AsyncSequence, suspend functions support Swift Task cancellation, and sealed interface maps to exhaustive Swift enum',
      'Kotlin/Native cinterop: Writing .def definition files, mapping C structs/pointers (CPointer, memScoped, alloc, Pinned), and linking static/dynamic .a/.framework C libraries on iOS',
      'Android NDK & JNI: CMakeLists.txt configuration, external fun declarations, JNIEnv*, converting between jstring/jbyteArray and C++ buffers, and avoiding JNI local reference table overflow',
      '16KB Page Size Compatibility (Android 15+): Compiling native .so shared libraries with 16KB ELF alignment (-Wl,-z,max-page-size=16384)',
      'Memory Management Across Native Boundaries: Kotlin/Native GC pinning vs C heap (nativeHeap.alloc), avoiding memory leaks across JNI and cinterop'
    ],
    problems: [
      'Exposing Kotlin StateFlow and sealed interfaces to iOS SwiftUI engineers with 100% native Swift ergonomics (for await & exhaustive switch)',
      'Calling a shared C/C++ library from commonMain using JNI on Android and cinterop on iOS with zero memory leaks'
    ],
    edgeCases: [
      '1. Swift Task calling a KMP suspend function is cancelled by the iOS view lifecycle: verify cancellation propagates immediately into the Kotlin CoroutineScope',
      '2. Passing a 4MB byte array across JNI / cinterop: use direct ByteBuffer / pinned memory to avoid expensive heap copies',
      '3. Native C++ exception or segmentation fault (SIGSEGV): catch C++ exceptions at the JNI boundary before they crash the JVM, and symbolicate native tombstones using ndk-stack',
      '4. Verifying 16KB ELF segment alignment on generated .so binaries for Android 15+ compliance'
    ],
    constraints: 'Zero native memory leaks across 10,000 JNI/cinterop calls; Android .so libraries compiled with 16KB page alignment.',
    deepQuestions: [
      'Why do Kotlin sealed classes, Flow, and generic interfaces lose their ergonomics when consumed from Swift in standard KMP, and how does SKIE solve this at the compiler/framework level?',
      'How does memory management work when passing buffers between Kotlin and C/C++ via JNI on Android vs cinterop (memScoped / usePinned) on Kotlin/Native?',
      'What is the Android 15+ 16KB page size requirement, and how does it affect apps that bundle NDK .so libraries?'
    ],
    commonFaqs: [
      'How do iOS developers consume a Kotlin StateFlow or Flow in SwiftUI?',
      'What is the role of the .def file in Kotlin/Native cinterop?',
      'What is the difference between a local reference and a global reference (NewGlobalRef) in JNI?'
    ],
    resources: [
      { title: 'Kotlin/Native Objective-C & Swift Interop', url: 'https://kotlinlang.org/docs/native-objc-interop.html', type: 'Kotlin Docs' },
      { title: 'Kotlin/Native C Interop', url: 'https://kotlinlang.org/docs/native-c-interop.html', type: 'Kotlin Docs' },
      { title: 'Android NDK & JNI Guides', url: 'https://developer.android.com/ndk/guides', type: 'Android Docs' },
      { title: 'Touchlab SKIE Documentation', url: 'https://skie.touchlab.co/', type: 'Library Docs' }
    ],
    checklist: [
      'iOS SwiftUI view consumes a shared KMP StateFlow via for await (AsyncSequence) with automatic Task cancellation',
      'Shared C library executes identically via JNI on Android and cinterop on iOS with zero native memory leaks',
      'Android .so build is verified for 16KB page size alignment'
    ]
  },
  {
    id: 'LAB 50', num: 50, title: 'Adaptive UI, Foldables & Custom Design System Lab', phase: 'Phase 6', duration: '1.5 weeks',
    goal: 'Architect a custom multi-brand Design System module (:core:designsystem) using CompositionLocal semantic tokens (colors, typography, spacing, elevation) and build an adaptive multi-pane layout (ListDetailPaneScaffold & NavigationSuiteScaffold) that dynamically responds to Foldable postures (Tabletop, Book mode, Hinge occlusion) across phones, foldables, tablets, and desktop.',
    why: 'Modern Android spans phones, foldables, tablets, ChromeOS, and desktop windows. Senior engineers build token-driven Design Systems and adaptive multi-pane layouts that transition seamlessly across live posture and window size changes.',
    concepts: [
      'Custom Design Systems in Compose: Building a custom AppTheme object with staticCompositionLocalOf vs compositionLocalOf, semantic vs primitive color/spacing tokens, and dynamic brand switching without full tree recomposition',
      'Window Size Classes (WindowWidthSizeClass, WindowHeightSizeClass): Compact, Medium, Expanded breakpoints and why hardcoded Configuration.screenWidthDp checks are an anti-pattern',
      'Material 3 Adaptive Layouts: NavigationSuiteScaffold (auto-switching BottomBar -> NavigationRail -> PermanentDrawer) and ListDetailPaneScaffold / SupportingPaneScaffold with ThreePaneScaffoldNavigator',
      'Jetpack WindowManager & Foldables: Observing WindowInfoTracker.windowLayoutInfo(activity), extracting FoldingFeature, detecting FoldingFeature.State.HALF_OPENED vs FLAT, Orientation, and isSeparating',
      'Hinge & Occlusion Avoidance: Splitting two-pane UI across the physical hinge bounds (foldingFeature.bounds) for Book posture and Tabletop posture (video player on top half, controls on bottom half)',
      'Configuration Changes on Resize: Continuity of state during live foldable unfolding, multi-window split-screen, and desktop freeform window dragging'
    ],
    problems: [
      'Transitioning a master-detail flow from single-pane on a foldable cover screen to a hinge-aware two-pane layout when unfolded without losing scroll or playback state',
      'Providing a reusable :core:designsystem module with semantic tokens verified across light, dark, and high-contrast themes'
    ],
    edgeCases: [
      '1. User unfolds a foldable device from Compact cover screen to Expanded inner screen mid-video playback: transition from single-pane to two-pane ListDetailPaneScaffold without losing playback position or re-fetching network data',
      '2. Foldable hinge is OcclusionType.FULL: calculate hinge Rect in Compose coordinates and split panes cleanly on either side',
      '3. Predictive back gesture inside a two-pane ListDetailPaneScaffold: navigating back closes the detail pane in Compact mode or pops the master flow in Expanded mode',
      '4. Toggling dark/light or high-contrast brand tokens at runtime: verify compositionLocalOf only recomposes consumers of changed tokens'
    ],
    constraints: 'Encapsulated inside :core:designsystem; tested across phone, foldable (tabletop/book), and tablet configurations with ComposeTestRule and Paparazzi.',
    deepQuestions: [
      'When building a custom Design System in Compose, when should you use compositionLocalOf vs staticCompositionLocalOf for theme tokens, and what is the recomposition trade-off of each?',
      'How do you architect a single-Activity Compose navigation graph where a master-detail flow is two separate destinations on a phone but a side-by-side two-pane layout on a foldable or tablet: and survives live folding/unfolding?',
      'How does Jetpack WindowInfoTracker expose physical foldable postures, and how do you translate FoldingFeature.bounds into Compose layout coordinates?'
    ],
    commonFaqs: [
      'What are WindowSizeClass breakpoints, and why should you use them instead of checking device orientation?',
      'How does NavigationSuiteScaffold adapt navigation UI across phones, tablets, and desktop?',
      'What is the difference between Tabletop posture and Book posture on a foldable device?'
    ],
    resources: [
      { title: 'Custom Design Systems in Compose', url: 'https://developer.android.com/develop/ui/compose/designsystems/custom', type: 'Android Docs' },
      { title: 'Build Adaptive Apps (Window Size Classes & Scaffolds)', url: 'https://developer.android.com/develop/ui/compose/layouts/adaptive', type: 'Android Docs' },
      { title: 'Make Your App Fold Aware (Jetpack WindowManager)', url: 'https://developer.android.com/guide/topics/large-screens/make-apps-fold-aware', type: 'Android Docs' }
    ],
    checklist: [
      'Custom :core:designsystem module exposes semantic tokens via AppTheme and renders light/dark/brand variants in Paparazzi screenshot tests',
      'UI dynamically transitions between single-pane, tabletop, and book postures in the Android Studio Foldable Emulator without state loss',
      'ListDetailPaneScaffold properly handles predictive back navigation across both Compact and Expanded window sizes'
    ]
  }
];
