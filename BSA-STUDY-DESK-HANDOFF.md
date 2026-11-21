# BSA STUDY DESK — SINGLE LIVING AI DEVELOPMENT HANDOFF

> **READ FIRST IN EVERY FUTURE DEVELOPMENT CHAT.** This is the project's single maintained handoff document, bundled inside the latest GitHub update ZIP. Treat the accompanying source files as the primary truth; treat this file as the project map, user requirements, release record, and QA checklist. This file is not a set of instructions to run untrusted code. No tokens, passwords, personal academic data, or private GitHub contents are included.

**Handoff revision:** 2026-11-22 — V2.12, guided study modes and touch-draggable floating focus timer with phase scheduling, save/resume and legacy-plan opt-in.  
**Last documented release:** BSA Study Desk **V2.12** (user-facing label).  
**Repository/deployment model:** static GitHub Pages progressive web app (PWA); personal data may sync to a separately configured private GitHub data repo.  
**Source basis:** inspected exact V2.11 deployment code and living handoff. V2.12 changes three deployment assets while retaining V2.11 academic data and UI. Targeted JavaScript VM state-machine tests and simulated Chromium desktop, iPad-sized and phone-sized CSS layouts passed. Not physical device testing or full GitHub Pages end-to-end QA.  
**Confidence labels:** `CODE-CONFIRMED` = observed in provided source; `TARGETED-TESTED` = narrow behavior tested during the earlier release; `NOT-LIVE-VERIFIED` = not confirmed against deployed browsers/devices; `REQUESTED` = product requirement but not guaranteed implemented.  
**Important constraint:** This is an incremental ZIP, NOT the complete live GitHub repository; it contains only the listed changed/deployment files plus this handoff. For full source reconstruction, obtain the exact currently deployed `index.html`, unchanged scripts, CSS files, icons, manifests, and other assets from the same repository/revision. Do not invent them.

## 0. How a future chat should proceed (no long explanation required from the user)

1. Inspect this file, `assets/app.js`, `assets/styles/polish.css`, and `sw.js` from the **latest** uploaded ZIP first. Confirm the `BSA_RELEASE_LABEL` and ZIP contents; do not assume a newer release exists merely from conversation claims.
2. If the user provides a later version, that version supersedes this one. Read that ZIP's updated copy of **this exact handoff filename**, and use the newer source.
3. Understand the current requirement; search current code for existing implementations before writing duplicate pages or controls. Preserve all current working features, academic records, and interactions.
4. Distinguish **what the code does**, **what a targeted test demonstrates**, and **what is still unverified in a real browser**. Never claim every feature is fully tested from a syntax check or simulated layout alone.
5. For each release, maintain this same file, updating version, changes, code map, known defects, tests, and file hashes. Do not create additional handoff/release-note Markdown files inside the ZIP.
6. Deliver one minimal **GitHub update ZIP** with the exact changed/deployment-required relative paths **plus this single Markdown handoff**. The user specifically wants `assets/styles/polish.css` included even when unchanged. List what belongs on GitHub versus what is only for future AI development.
7. Prefer concrete completed work over speculative claims. Do not change the visible release number for documentation-only repacks.

A future chat still needs the user to attach the latest ZIP or make it accessible in the Project; a Markdown document cannot force ChatGPT to receive files or guarantee the model will see earlier chats automatically. It eliminates the need for the user to re-explain the project once the file is available.

## 1. Product definition and non-negotiable design rules

- Product: **BSA Study Desk**, a personal first-year Accountancy study companion with offline-capable PWA behavior, academics and practice tools, data backup/sync, a Gemini-based AI Tutor, personalized study planning, and optional Study Room/gamification.
- User preference: natural conversational English / Taglish / simple Bislish if appropriate; avoid deep/formal Bisaya. Explain accounting in plain language before formal/PFRS terminology. Be clear, not artificially flattering.
- **Understanding and application before rote memorization**, especially in CFAS/FAR: explain why/when/how, journalize/calculate, handle changed facts, correct misconceptions, teach back, and demonstrate delayed retention. Keep factual recall, standards, definitions, formulas, and spaced flashcards—memorization is useful, just not sufficient proof of mastery.
- Learning-science flow: initial retrieval before answer revelation → corrective feedback → application → short teach-back/reflection → spaced future retrieval. **Checklist completion is self-report; mastery requires actual evidence.** Never inflate objective mastery using guesses, Tutor-assisted work, or self-rated cards/problem solves.
- Navigation should remain straightforward, single clear workflow, descriptive controls, minimal competing entry points and duplicate banners. The dashboard has already struggled with duplicate Resume strips, overloaded Ask layouts, and nested scroll areas.
- **Preserve existing AI Tutor interface** (layout, composer, conversation area). User explicitly fears breaking it after repeated desktop/iPad issues. Add only minimal unobtrusive controls required by new behavior; do not casually redesign Tutor.
- Themes = distinct layout/card/animation presentations; Appearance = color/palette changes. Avoid marketing names for existing ordinary settings. Modern, visually rich, animated app aesthetic is desired, but accessibility, spacing, and reliability win over decorative UI.
- Preserve all existing study records, older imports, topic relations, quiz history, grades, mistakes, progress, timed sessions, user customizations, and offline behavior. Explicitly back up before potentially destructive work.
- The user uses a Windows desktop, iPad, and Android; test mouse/keyboard, touch, short viewports, large text and small screens when feasible. A simulated viewport is **not** a physical device test.
- Deployment preference: minimal GitHub ZIP; maintain exact relative paths; include `polish.css` by explicit request; no unchanged images, old version logs, example rulebooks, dev/test fixtures unless actually required. **Exactly one Markdown file in the update ZIP: this handoff.**
- User-facing version numbers restarted at V1.0 after V4.6.9; releases currently use V2.x. Keep user-facing version, service-worker cache key, and persistent data schema version **independent**.
- Never use the user's surname as a fictional practice company/owner name.

## 2. Release state and source provenance

**Verified package:** `dashboard-V2.12-GitHub-update.zip` contains the three changed deployment files and this single living Markdown handoff.

| Relative path | Bytes | SHA-256 |
|---|---:|---|
| `assets/app.js` | 1,982,584 | `2650775bc36c81d5f0918e75ff2bb093aba9cbd66fdb526ff9bfc2ee5a454ede` |
| `assets/styles/polish.css` | 414,459 | `f848c3683e0fe90d039fa6ca1f0933feb3eba51c11ffcbe610c75181ff0ed43f` |
| `sw.js` | 5,469 | `3d21118b97fe472fc8b2243380633e9cff2a8b8ca4125cb8a3d9d64dda9c2e75` |

- `assets/app.js`: the large, essentially monolithic React application (plain JS/`React.createElement`; React 18 UMD), including many feature modules and past migration safeguards. User-facing label near line 3: `V2.12`.
- `assets/styles/polish.css`: layered visual overrides and feature-specific styles. High override density; avoid blindly appending another `!important` rule. Trace the cascade and viewport sizes.
- `sw.js`: service worker; now uses an independent V2.12 asset-cache identifier (`asset-update-20261122-v212-guided-floating-focus-r01`). Scoped caches protect parallel deployed sites; essential assets must load successfully before a new offline version activates. Network-first navigation, cache-first core/CDN, stale-while-revalidate secondary assets, and live (uncached) Gemini/GitHub API traffic. Cache key changes are independent of displayed version.
- **Not in incremental ZIP:** `index.html`, `assets/owner-auth.js`, `assets/updater.js`, `assets/styles/foundation.css`, `assets/styles/components.css`, `assets/styles/features.css`, manifest, icons, avatars, auxiliary AI rules and examples. They may be required in the deployed repository. Do NOT pretend this ZIP alone is a full new installation.
- `sw.js` still lists external/auxiliary AI files in optional offline shell caching. They are not embedded in this update; do not delete them from the deployed repo simply because this handoff is the only Markdown file in the update ZIP.

### History carried forward from project discussion (release-summary level, not independent regression proof)

| Release | Development theme / notable requests |
|---|---|
| V1.8 | Latest user-uploaded baseline after version reset; smart MCQ practice, adaptive stats, and Tutor/Practice ecosystem already existed. |
| V1.9 | Quiz score reporting fix; distinct checked answers vs unsubmitted selections; resume shortcut visibility. |
| V2.0 | Topic attribution for historical MCQ evidence; independent recall reporting; conservative ambiguous matching; performance cache. |
| V2.1 | Practice homepage should not automatically resume saved quiz; Save & Leave vs Resume; Ask Tutor layout safeguards. |
| V2.2 | Post-wrong-answer Tutor prompt with selected/correct answer; written and mistake tutoring; journal account-name equivalence review; self-rated evidence separated. |
| V2.3 | Desktop AI Tutor height/scrolling corrections to keep composer visible. |
| V2.4 | Interactive Visual Studio concept-map pan (mouse/touch), selection centering, filtered-selection safety. |
| V2.5 | De-duplicate paused-quiz banners and MCQ back buttons; practice-history diagnostics; responsive/performance refinements. |
| V2.6 | Feature-aware Tutor (32 major routes), study-action shortcuts, renaming, contextual Ask handoffs and returns, temporary FS draft, optional session-only API token storage. |
| V2.7 | Highlighted text → one-use Tutor source, section-specific Ask/return, floating lecture top/bottom controls, dismiss highlight toolbar on outside click. |
| V2.8 | Fresh Tutor thread on new question/source, protection from stale MCQ history, 12,000-char selected context threshold, optional explain/apply checkpoint, safer math/currency rendering and model-truncation warning. |
| V2.9 | Source-selected fill-in-the-blanks, optional Gemini lecture generation preview, safe typed recall and spaced-review cards; desktop MCQ hotkeys and collapsible practice/memory setup. |
| V2.10 | Strict Unseen-only MCQs with exhausted-pool guidance; conservative paraphrase/concept overlap detection in bulk/single imports, rules, cards, lectures, written/MCQs, Lab and Inbox; always-on Tutor teaching style separate from attached source; optional user-editable general preferences. |
| V2.11 | Study plan distinguishes completed tasks from elapsed wall-clock time, persisted start/pause/resume, full time allocation. Fixed sidebar modal portal CSS and grouped shortcut controls. |
| **V2.12** | Four guided session modes, adaptive shorter plans, allocated step countdowns, movable/minimizable floating timer across dashboard, pause/add 5 or 10 minutes/next/save, phase-expiry protection, return-to-tool bookmark, optional upgrade of active legacy sessions, and independent completion vs time tracking. |

Each row is a feature history, **not** a claim that all workflows passed end-to-end or on real devices.

## 3. Architecture and storage (critical for safety)

### App runtime

- Single-page application invoked in an IIFE. Major root function: `App()` in `assets/app.js`; verify line numbers in the V2.11 function index below.
- React hooks: `useState`, `useMemo`, `useEffect`, `useRef`; no JSX/build step assumed. React and ReactDOM 18.3.1 CDN UMD paths are listed in `sw.js`.
- Route/navigation state: `nav = {tab, opts, key}`. `go(tab, opts)` mediates navigation and manages Ask Tutor origin/return, Practice home, MCQ drafts, etc. Do not add independent router implementations.
- Most academic data is updated through the shared application update pathway. Avoid bypassing it when creating persistent academic records; doing so can defeat change stamps, sync, learning capture, and merge safety.
- `App` checks for interrupted modal scroll lock and handles compact rail, Today, subject switching, smartphone gestures and feature navigation.

### Persistent data model

- Core `localStorage` key: **`bsa-study-dashboard:v1`** (`STORE_KEY`, around L317), document `version: 1` (schema, not release). Do not rename this for a release bump.
- Default data `{version, updatedAt, activeId, settings, subjects}`, with a seeded CFAS curriculum and initial cards. Real subjects can include topics, cards, mistakes, quizzes, sessions, lectures, problem sets, MCQ sets, classes, attendance, tasks, AI attempts, learning events, and more.
- Synced subject collections (from `COLLS`): `topics`, `cards`, `mistakes`, `quizzes`, `sessions`, `days`, `lectures`, `psets`, `mcqSets`, `classes`, `attend`, `tasks`, `aiAttempts`, `learningEvents`, `labAttempts`, `todayChecks`, `tutorMemories`, `studyInbox`, `driveSources`, `libraryFlags`, `cycleRuns`, `cycleCases`, `practiceSessions`, `problemWork`, `fsReports`, `fsAttempts`.
- `normalizeDoc`, `stampChanges`, `mergeDocs`, and tombstone rules manage compatibility/merging. Tombstone window in code: 120 days. Do not change merge identity, delete handling, or timestamp logic without backup-and-merge tests.
- Some preferences, saved drafts, Tutor chats and recreational data use additional **device-local** `localStorage` or `sessionStorage` keys. A sync of the main academic document is not a guarantee that every draft or private setting is on another device.
- Noteworthy separate keys: `bsa_chat_<subject id>_<mode>`, `bsa28_mcq_reflections_<subject id>`, `bsa_gem_key`, `bsa_gem_model`, GitHub keys `bsa_gh_user`, `bsa_gh_repo`, `bsa_gh_key`, `bsa_gh_path`, sync metadata `bsa_sync_meta`, personalized sidebar `bsa45-sidebar-prefs`. Never serialize passwords, access tokens, or secret vault payload into the handoff.
- V2.8 MCQ explain/apply reflections use per-subject local storage and are capped to the most recent 80 saved nonempty responses; these are *not* new objectively verified achievements.

### GitHub private-data sync

- GitHub sync uses a user-configured **private** data repository, which must be different from the public Pages hosting repo; otherwise uploaded academic data could be exposed publicly.
- Core actions under `useSync`, `GitHubPanel`, `ghGet`, `ghPut`, `runSync`, `mergeDocs`. Approximate checking cadence: `POLL_MS=30000` (30 seconds) while active; edits queue for upload, with offline retry and conflict management. Cross-device behavior must be tested with two independent browser sessions and conflicts.
- Token currently read from `sessionStorage` when session-only mode enabled, otherwise falls back to `localStorage`; browser storage remains vulnerable to same-origin script compromise. Optional session storage is not a replacement for a secure backend.
- `sw.js` deliberately does not intercept live GitHub and Gemini requests. When updating, verify new cache key and offline install without poisoning existing caches.
- Export full academic backup, retain browser site data, and test recovery before destructive migration. Never advise clearing localStorage/service-worker site data as a first troubleshooting step.

### Backup, security, offline

- Device & Data Safety, unified backup preview/restore, import validation, corrupt-data startup recovery, private vault, device-only vault and recovery flows exist in source. Distinguish user academic backup from source-code backup.
- Service worker caches current app shell, assets and CDN where possible but does not store all user records. Gemini Tutor requires network; most native study UI can operate offline subject to installed cache and source availability.
- An incremental deployment archive is not enough to recover a missing full repository. Keep a complete deployed source snapshot elsewhere if possible; this handoff describes how to identify dependencies rather than pretending to contain them.

## 4. Source-confirmed major feature inventory (32 routes)

The table below is derived from the `BSA26_COPILOT_FEATURES` catalog (catalog carried forward into V2.11); it describes exposed major route categories, not every dynamic button or custom user record. **Search the source** before asserting that a feature is absent.

| Route | User-facing feature | Code catalog description |
|---|---|---|
| `home` | Today | Daily focus, study routine, recommended next step, subject overview |
| `subjects` | My Subjects | Switch courses, add and organize subjects |
| `study` | Learn & plan | Plan study sessions, topic priorities, suggested learning activities |
| `library` | Study Library | Find materials, topic gaps, source imports and question collections |
| `lectures` | Lectures | Read saved lessons, chapters, sections and explanations |
| `mcq` | Multiple-choice questions | Native checked MCQ quizzes: Smart mix, Unseen, Weak spots, Due reviews, All questions; Save & leave, Resume, Ask Tutor after mistakes |
| `practice` | Practice | Daily retrieval, active recall, adaptive practice, mixed practice, mock exams and AI Practice Lab |
| `psets` | Problem Sets | Written solutions, journal entries, calculations, T-accounts, financial statements, comparison with model solutions |
| `vault` | Flashcards | Concept vault, due reviews, self-rating and spaced retrieval |
| `mistakes` | Mistake Log | Saved wrong answers, explanations, trap analysis and Mistake Replay |
| `insights` | Learning Insights | Mastery, strong and weak topics, observed recall evidence, trends and readiness |
| `knowledge` | Visual Studio | Concept maps, draggable canvas, selected concepts and related topics |
| `roadmap` | Roadmap | Topic hierarchy, coursework, due dates and syllabus progress |
| `calendar` | Study Schedule | Calendar, study sessions, tasks, exams and weekly planner |
| `class` | Class & Deadlines | Classwork, attendance, task tracking and submissions |
| `grades` | Grades | Grade tracking and target calculations |
| `accounting-lab` | Accounting Lab | Accounting practice workspace, case-based applications and answer checking |
| `accounting-cycle` | Accounting Cycle | Journalizing, adjusting entries, posting, worksheet, closing and reversing entries |
| `fs-lab` | Financial Statements | Import structured financial reports, analyze statements and cited evidence |
| `rules` | Rules & References | Saved accounting rules and source-backed standards |
| `workspace` | Study Workspace | Scratchpad, notebook, handwritten notes and working space |
| `toolkit` | Study Toolkit | Focus timer, T-account ledger, journal, trial balance, 10-column worksheet, handwriting and calculators |
| `safety` | Device & Data Safety | Backup, restore, sync diagnostics, local study data checks and device safety |
| `curriculum` | Curriculum | Four-year curriculum map, courses and prerequisites |
| `stats-clean` | Study Report | Reflect on actual learning progress and next actions |
| `guide` | Start Here | Guided walkthrough and feature tour |
| `howto` | How-To Corner | Detailed instructions for features and troubleshooting |
| `achievements` | Study Achievements | Academic achievements and learning milestones |
| `life` | Study Room | Avatar, rewards, pets and room customization |
| `personalize` | Personalization Corner | Themes, appearance, accessible preferences and workspace adjustments |
| `break` | Break Corner | Rest and relaxation activities |
| `ask` | Ask Tutor | Source-grounded Gemini tutor, dashboard guidance, wrong-answer explanations and study shortcuts |

### Additional tools/components not all expressed as separate top-level routes

- `BSA205Cycle`: accounting cycle exercises including journalizing, adjustment, posting, worksheet, closing/reversing.
- `BSA187AccountingLab`: saved accounting cases, answer checks, and guided practice.
- `BSA43FinancialStatements`: financial-statement/report importing, mapped standards, audit checks, questions, practice attempts.
- `BSA38PracticeStudio`, `BSA38MasteryCheckpoint`, `BSA38Oral`, `BSA38Variations`, `BSA38ExamCatchup`: multiple kinds of application practice.
- `BSA15VisualStudio`/`BSA192KnowledgeMap`: visual mapping, selected concepts, comparison/timeline/process displays, draggable overall map.
- `LxReader`, `BSA181HighlightTool`, `bsa27SelectionFocus`: lecture reader, highlights, selection → Tutor, source-aware return.
- `MCQPage`, `MCQBankExplorer`, `MultipleChoiceQuiz`, `bsa197Pick`, `bsa197Recall`: MCQ bank, queue selection, recall, pause/save/resume.
- `PsWrittenDrill`, `bsa39KeyCheck`: written/journal/calculation keyed checking and safer review for alternatives.
- `AiPracticeLab`, `MockExam`, `BsaMistakePatterns`: AI-assisted practice, timed exams, mistake analysis.
- `GradesView`, `AcademicCommandCenter`, `BSA205Mastery`, `BsaReadinessCoach`, `BSA3Today`: grades, priorities, learning insights, readiness, daily study.
- `BSA4StudyDock`: study-navigation/activity recovery tools.
- `PersonalizationCorner`, `BSA43ThemeNavigation`, `BSA185LayoutEditor`: themes, colors, layout preferences; **avoid duplicate new navigation**.
- Study Room, avatar, pets, games, rewards and Break Corner are supporting motivation features, not direct proof of learning mastery.

## 5. MCQ, spaced review, weak queue and evidence integrity

### Actual recall logic (CODE-CONFIRMED, V2.10)

- MCQ history keys and aggregation: `bsa197QuizKey`, `bsa197History`, `bsa197Recall`, `bsa197Pool`, `bsa197Pick` near L5378.
- The recall streak increments for a correct **checked**, unguessed, unassisted answer only when its successful recall occurs on a **different calendar day** from the prior counted success; wrong/guessed/assisted answers reset the streak in current logic.
- Scheduled intervals array (days): **1, 3, 7, 14, 30, 60, 120, 240, 365**. A recent wrong/guessed/assisted attempt is scheduled at 1 day. Durability is approximated, not independently proven.
- `weak` remains true when the question has prior incorrect/guessed/assisted evidence and qualifying streak is below 3. `mastered` uses `streak>=3`. **Weak and Due are different filters.** A newly correct weak question can remain visible in Weak mode until streak criteria met, even when not due.
- User explicitly found it confusing that a correctly answered Weak question remains in the Weak practice list. **Potential future improvement (not yet shipped):** distinguish Weak / Improving / Scheduled review / Mastered; optionally keep immediate Weak *practice queue* limited to due weak items while retaining weak analytics. Do not accidentally remove history or claim this exists already.
- Current streak counts different days, not necessarily successful recall after waiting for every scheduled interval. Upgrading interval requirements is a proposed refinement only.
- `Unseen` counts question-bank identity and checked attempts, not selections made without checking. A 30-question set with 10 distinct *checked* questions should ordinarily report 20 unseen, subject to topic/set filter and identity matching. **V2.10 strict Unseen-only** chooses only records without any checked attempt and returns an empty selection at zero; Smart mix may repeat for retention. The setup Start button disables at zero unseen and offers review or new imports.
- Save & Leave keeps the unfinished draft and returns to Practice. Resume explicitly restores it; Discard removes it. A **single compact Resume prompt** can remain visible afterward: intentional state, not a command to discard. Do not auto-resume when navigating normally to Practice.
- `Ask Tutor after wrong answer` hands over the selected answer, saved correct answer, and explanation **only after an answer has been checked**; before checking, don't leak the key.

### Evidence levels and mastery principles

- `learningCapture` records academic events; `learningEvidence` and `bsa20TopicResolver` connect them to topics; `smartTopicStats`/`bsaAdaptiveSignals` derive performance and next steps.
- `bsa22SelfRatedEvidence` distinguishes self-rated flashcards and problems. `bsa22IndependentCorrect` requires independently checked correct results; it excludes guessed and assisted answers. A self-written explanation is useful reflection but should **not** be automatically promoted to objective mastery.
- V2.8 MCQ optional **Explain & apply** checkpoint appears after checked answers; writes separate per-subject reflection and can ask Tutor to critique the reasoning. It is not a verified new grade.
- The user explicitly wants accounting understanding: why rule, when applies, how to prepare entry/calculate, how alternate facts change treatment, then retention by spaced independent practice. Never turn the dashboard into only a memorization machine; never abolish useful flashcard/definition recall.
- Future tests should cover: wrong→correct→weak status, guessed/assisted flags, same-day repeats, midnight/time-zone edge, past-attempt topic reassignment, duplicate events, self-rated vs verified results, and delayed recalls.

## 6. AI Tutor: behavior and failure modes

### AI setup

- Gemini AI via `generativelanguage.googleapis.com` with user API key/model; keys stored locally or optionally session-only. `gemSend` performs network calls; `gemSourceSystem` and `gemGeneralSystem` build prompt guidance; `AskView` handles chat and navigation.
- Modes include Sources, General, and Dashboard Guide; renaming supported through `bsa26TutorName` and existing Modes & Sources setting; name changes label, not actual model. V2.10 adds an optional collapsed **General teaching preferences** textarea (`bsa210_tutor_style`, device preference, max 1,200 chars) to the same panel; this controls HOW Tutor explains, while a fresh attached question/passage controls WHAT it answers. The existing one-use source and thread isolation remain separate.
- Tutor can suggest **validated local action shortcuts** for existing native tools: MCQs with subject/topic/count, review weak/due/unseen, Resume, study tools, etc. It cannot autonomously modify marks/import data, click around by itself, invent native bank content, or claim to have started a graded quiz.
- Feature routing is based on a 32-route static catalog plus active subject data. It does **not** automatically enumerate every future custom control; keep catalog current when new routes appear.

### Contextual Ask handoff (V2.6–V2.8)

- Entry points: MCQ/checked mistake, written drill, problem set, lecture, highlighted excerpt, lecture section, Visual Studio selected concept, financial-statement practice, topic/study dock, saved mistakes, accounting exercises where wired.
- User requirement: Ask Tutor must carry **the exact source and learner question**, not simply switch to chat and lose place. A visible **Back to [origin]** route restores relevant section/item/scroll position where supported. MCQ drafts and temporary financial statement typed answers should persist.
- Source focus is a **one-message attachment** to Tutor, with clear source label and dismiss option. The input composer remains free for the learner's question; don't force giant context strings into text box. After first send, the attachment is consumed, but the relevant conversation thread can continue naturally.
- **V2.7 regression observed in screenshot:** on switching from MCQ mistake to an unrelated lecture excerpt, a vague follow-up such as “Explain it in Bisaya” triggered a response to the *old* MCQ question. Root cause: old chat messages were still included in new model requests.
- **V2.8 code fix:** messages carry `threadId`; a fresh attached focus or explicit `New topic:`/`/new` starts a new Tutor thread; `bsa28SourceHistory(messages,scope,newAttachment)` filters context to current thread, with max 18 usable turns, excluding failed replies. Older messages stay visible and locally stored, but are not always transmitted to the model. **Targeted tests** covered separation, not all possible Gemini behaviors.
- `bsa18ReadTutorChat` loads up to the most recent 60 saved visible messages in a given subject/mode. Conversation messages may carry `threadId` and `contextLabel` for one-time attachment indicator.
- Highlighted selection Tutor limit in V2.8: **12,000 characters** (`BSA28_SELECTION_MAX`), with overlong focus rejected/warned instead of silently clipping. Separately, saved highlight note excerpt limit remains **1,800 chars** (`BSA28_HIGHLIGHT_SAVE_MAX`). Don't confuse these.
- Section-specific Ask should send selected passage or bounded section excerpt, not unrelated entire chapter; returning from section 9/32 should return to section 9. Floating lecture top/bottom reader controls and outside-click highlight toolbar dismissal were added in V2.7.
- Avoid sticking one source attachment onto every future unrelated query. Don't use hidden state that makes Tutor answer a previous question. Don't remove chat history without user authorization.
- V2.8 improves math/currency rendering and warns on model output cutoff. It **cannot** reconstruct invalid numbers already present in imported lectures or make malformed model-generated arithmetic inherently trustworthy. Preserve raw unsupported notation instead of inventing corrected values silently.

### Tutor UX non-negotiables

- **Do not redesign the Ask layout.** Desktop previously had a blank/shortened conversation region and composer below the fold, fixed incrementally by V2.3; repeat actual viewport/scroll/keyboard tests before touching CSS.
- Context label should be small and one-use; message input should remain normally editable; Send must be reachable at short viewport heights; chat scroll inside intended pane.
- On switching topic, recent visible conversation stays, but request context must not include unrelated prior Tutor threads.

## 7. Additional relevant flows

### Lectures

- Lecture sections and reader components support source text, highlighted excerpts, section anchors, notes, Ask Tutor and return. Need preserve raw source figures, markdown formatting, cash amounts, math, interactive navigation and Up/Down controls.
- Previously seen issue: some numbers appeared incomplete in lectures, due to currency/math delimiter conflict or malformed source notation. The renderer was revised in V2.8; verify actual imported passages against originals before claiming the data is wrong/correct.

### Accounting / financial statements

- Keyed journal checks should normalize common account names/abbreviations but not automatically mark a valid alternative as wrong solely because it differs from expected key. Balanced but nonmatching entries may require review. Respect accounting standards and user-supplied solutions; AI judgment is not deterministic grading.
- Financial-statement typed draft uses session-local `bsa26FsDraft`; Tutor return should restore the source report/standard/question and draft. Do not imply all draft kinds sync cross-device.

### Concept map

- V2.4 introduced drag-to-pan whole map (both axes), touch panning, selection centering, normal click behavior. **Dragging a whole map is not the same as independently rearranging and saving nodes.** Minimap/fullscreen/branch collapse were suggestions, not confirmed features.

### Home, reporting and sync

- Today/Home prioritizes learning choices, quick actions, progress, class tasks and study routine. Improve coherence, not duplicates. Device & Data Safety has a read-only Practice History Consistency check; it must not delete detected records.
- Design includes offline service worker; GitHub may sync personal academic records; records outside primary store can be device-only. Always distinguish **confirmed saved locally**, **pending upload**, **successfully synced** and **unverified**.

## 8. Known issues, gaps, risks, and deliberately NOT completed work

| Issue / idea | Current status at V2.12 | Safe next step |
|---|---|---|
| Weak questions stay in Weak mode after one correct | CODE-CONFIRMED behavior | Introduce transparent Improving vs Due states after designing migration-free queue logic. |
| Mathematical rendering in arbitrary imported lecture | Partial renderer fixes; source corruption may remain | Validate raw source vs display and API-generated output; no invented numbers. |
| Tutor cross-topic contamination | V2.8 code fixes and targeted test coverage | Reproduce full UI flow with Gemini and current loaded histories; ensure no stale responses or model-history leakage. |
| AI Tutor layout on desktop/iPad/Android | Previous fixes and simulations | Physical-device / full browser test needed, especially short viewport and keyboard. |
| Full feature-by-feature End-to-End QA | NOT-LIVE-VERIFIED | Develop automated browser regression suite and compare with real deployed app. |
| GitHub sync conflicts, data drift across devices | Logic and diagnostics exist | Test offline edits + two-device conflict + restore from backup; no guessing. |
| Accountancy written solution equivalence | Normalization and review exist | Improve valid alternative handling with transparent rubric; no AI-only 'verified' grade. |
| App JS/CSS monolith and many layered overrides | Source architecture concern | Incremental modularization with same behavior and rigorous cross-feature regression, NOT a wholesale untested rewrite. |
| AI feature awareness for every dynamically added function | Static 32-route catalog, sub-feature descriptions | Update catalog and user action paths when features evolve, with no claims of omniscience. |
| API credentials in browser | Session-only option, no backend | Document browser threat model; secure backend optional future architecture. |
| Natural-language full Tutor-controlled in-chat native quiz | Tutor offers safe native launch shortcuts; may answer educational questions | Don't claim autonomous in-chat scored quiz engine unless tested and implemented. |
| Separate one-click Start Quiz from new MCQ without bank | Saved bank required | Show honest no-matching-bank message and import/generate valid questions workflow. |
| Automatically reconstructing an entire repo from incremental ZIP | Impossible | Require exact other unchanged deployment assets or repo snapshot. |
| Detecting every semantic duplicate | V2.10 has better local synonym, intent, concept, amount and paraphrase heuristics, not a full AI semantic equivalence engine | Review flagged ambiguous overlaps; verify missed paraphrases and material variations against original sources. False positives and false negatives remain possible. |

**Known release behavior != exhaustive QA.** Preserve all prior functionality and regression-test it when adding features; avoid declaring “fixed everything” without evidence.

### V2.9 change record and learning design

- **Fill-in-the-Blanks is an additional Practice activity, not a new sidebar tab or replacement for MCQs.** It draws from a selected lecture's `terms` and eligible **meaningful** bold technical phrases/rules, plus saved cloze flashcards; common grammar words (e.g. `and`, `the`) are rejected. `bsa29Candidates` is conservative: ordinary unstructured prose may yield no reliable blanks until the lecture has source-verified key terms or the user generates and checks a set.
- **AI generation is opt-in only:** existing `LecturePracticeGenerator` can generate up to 5/10/15 fill-in-the-blank candidates based on the saved lecture. It validates a single `_____` blank, non-trivial saved answer and answer text appearing in the lecture, then offers an answer/explanation preview. A student must review before saving to the existing Concept Vault; AI-generated output is not guaranteed correct by syntactic validation alone.
- **Source answer checking is literal normalized text matching**, not a semantic equivalence classifier. Unmatched paraphrases may be valid and are explicitly marked for manual comparison. No cloze result changes verified MCQ learning events, independent recall, grades, or topic mastery automatically. Saving a cloze card to the existing Vault permits later spaced retrieval.
- **Draft continuity:** `bsa29_cloze_draft_<subjectId>` is a separate local, versioned draft. It can be resumed or discarded without touching MCQ drafts or academic schema. Opening Tutor preserves this draft and provides a return action.
- **MCQ keyboard shortcuts:** while the quiz is running and no editor/textarea/dialog is active, A/B/C/D selects the corresponding answer. Enter checks a selected answer and Enter again advances (or finishes at the last question). The shared `checkAnswer`/`finish` paths still perform evidence recording, so a shortcut doesn't count an unchecked answer. Modifier and repeated keys are ignored; focused non-choice controls retain normal Enter behavior.
- **MCQ compact setup:** `Practice style` and `Question memory` are collapsible native `<details>` panels. The selected practice style, available/weak/due counts, topic and Start action remain accessible without expanding. Tutor-specific help note is similarly collapsible; no Tutor interface changes.
- **Release scope:** UI changes limited to the MCQ Practice layout and new Fill-in-the-Blanks Practice. Existing Tutor layout and academic data schema unchanged.
- **Testing:** JS syntax, source-key selection rejecting filler words, exact-answer limitations, draft persistence, shortcut selection/Enter flow, and ZIP integrity were targeted-tested. Real browser execution of the complete deployed app and physical Windows/iPad/Android interactions are **NOT LIVE VERIFIED**. Users should export backup before replacing files.

### V2.10 change record — conservative duplicate intelligence and Tutor context

- **Strict Unseen-only:** `bsa197Pick` no longer fills an Unseen-only quiz with due/old/recent questions. `available` uses the filtered unseen count; Start is disabled when zero, with suggestions for Smart mix and import/generation. **Smart mix still intentionally recycles previously checked questions** for spaced recall. No saved MCQ histories, attempts or mastery logic were changed.
- **Semantically informed local import screening:** `bsa210Tokens`, `bsa210Intent`, `bsa210Concept`, `bsa210Numbers`, `bsa210DuplicateSignal`, `bsa210MaterialPair`, and `bsa210AnswerMeaning` supplement exact/fingerprint checks with domain-aware synonym cues, type of task (definition/why/journal entry/numerical/effect), contrast/negation guards, comparison of number conditions, and normalization of shuffled MCQ answer choices. These are **conservative heuristics, not guaranteed true semantic understanding or mathematical correctness verification**.
- **Source-preserving categories:** exact repeats are skipped; conflicting keys are held; potential paraphrases/concept overlaps and numerical variants are flagged and held by default. Users can deliberately opt to import some similar items in Topic Pack preview after review. Different task types (e.g., define versus journalize) should remain separately available, even when about the same accounting concept. No destructive dedup migration or deletion was applied to existing materials.
- **Covered import paths:** `bsa44Prepare` in Topic Packs covers MCQs, written questions, flashcards, rules, lecture sections/terms/checks and near-identical lectures; `DataModal` older single-import path now uses the same conservative preflight for study materials while preserving quiz scores, mistakes, grade structures and other non-study arrays. Accounting Lab `bsa198PlanBatch` and Study Inbox similarity alerts gain the new local overlap checks. Financial Statements retain their separate report-identity/period/scope conflict guard (not a semantic-equivalence claim). Other niche importers may still use their own specialized comparators—do not claim complete global dedup coverage without checking each route.
- **No answer key leakage:** the Tutor teaching core `bsa210TutorCore` is always-on but is explicitly **not course/source evidence**. User-editable teaching preferences are injected only as style guidance, separate from the per-request selected question/lecture and scoped chat history. Existing pre-check MCQ key protection remains. A user may clear teaching preferences without deleting chat or academic records.
- **Storage:** no academic-record schema change. Tutor style lives in existing local preference storage and can differ by device unless the app's preferences sync separately. User-uploaded source files and saved academic records are not rewritten by this release.
- **Targeted regression:** parse/source checks, local paraphrase/concept/numeric/negation cases, MCQ shuffled-answer equivalence, safe Topic Pack acceptance/hold counts, strict unseen/Smart mix picks from actual browser-exposed hooks, Fill-in-the-Blanks candidate/draft preservation, MCQ A–D/Enter keyboard behavior, ZIP CRC and cache string. **Not verified:** full live Gemini sessions, complete importing across every uncommon JSON format, actual iPad/Android physical device UI, or cross-device GitHub conflict behavior.

### V2.11 change record — study plan clock and sidebar settings recovery

- **Why 90 minutes previously appeared meaningless:** V2.10's plan `budget` was a *ceiling* used by `bsa34PlanBlocks`, not a live timer. The completion ring measured checked/attempted tasks (`bsa33Journey`), not minutes or proven understanding. A 90-minute selection could allocate only ~48 suggested minutes for 4 tasks. `bsa34PlanBlocks` now scales up or down to allocate the entire chosen 20/40/60/90 minute budget across the selected blocks. This is a *suggestion*, not an enforced duration or demonstrated mastery.
- **Visible clock, separate from task status:** `BSA205Study` now shows Time goal, Elapsed, Remaining/Over goal, a separate time progress bar, a running/paused indicator, a Pause/Resume button, and each activity's suggested minutes. The task completion % remains its own progress bar, explicitly labeled and unchanged in meaning. Timer starts upon creating a **new** plan; clicking Pause freezes the count, Resume continues, and filing the plan freezes elapsed time. Clock counts wall-clock time even when the user navigates away; it does **not** prove focus or independently update scores/XP/learning events.
- **Backward-compatible session fields:** Stored in each existing `practiceSessions` entry as *optional additive properties* `timerStartedAt` (timestamp, null when paused), `timerElapsedMs` (accumulated duration), and `timerPaused`. `bsa211HasTimer`, `bsa211ElapsedMs`, `bsa211Clock` are pure helpers; elapsed time on resume is computed from timestamps, avoiding periodic save writes. Older active plans have no timer fields and display **Not tracked** with a `Start tracking now` action; never invent elapsed minutes from old `createdAt`. Existing completed/archived scores and records are unchanged. No academic-data schema migration.
- **Remaining caveat:** Wall-clock periods include time while another page/tab is open unless manually paused; browser/system clock tampering and un-synced device clocks may affect totals. There is no cross-device concurrent-timer arbitration. It is a planning aid, not a verified study-attendance record. The existing FocusBar Pomodoro is independent and intentionally not modified.
- **Root cause of sidebar customization bug:** `Modal` creates a React portal under `document.body`, whereas V2.10's polished `.bsa46-settings` styles began with `#root ...`, which **never matched** the portal's children. Therefore the settings modal looked like unstyled native controls, often wrapping or overlapping badly. V2.11 adds appropriately scoped `body>.backdrop` CSS selectors and styles specifically for `.bsa45-sidebar-modal`, leaving AI Tutor/modal scroll/touch behavior untouched.
- **Sidebar layout cleanup:** Subject profile has one clear teaching-approach control and a collapsed Advanced · specialized tools section. Sidebar shortcuts has a pinned count, search, a default-open collapsible Pinned list, and a collapsed Other tools list; pin/unpin, order arrows, visibility, reset defaults, quick colors, Themes, Appearance, Tools & Data and Done actions are preserved. No redundant navigation or new data keys.
- **Testing performed:** `node --check` app and service worker; targeted Node VM tests for all budget sizes, old-plan compatibility, pause/resume arithmetic, duration formatting, release/cache separation; Chromium style/layout harness at 1440x900, 820x1080 and 390x844 for both Subject and Shortcut panels, confirming portal-specific CSS is active and no horizontal overflow. This was **NOT** a complete real deployed React 18 render, Gemini network test, iPad/Android physical-device test, or end-to-end GitHub sync/backup verification.
- **Files to deploy:** `assets/app.js`, `assets/styles/polish.css`, `sw.js`. Keep this one Markdown in the ZIP for future development handoffs, not on GitHub. Back up academic data before deploying.

### V2.12 change record — Smart Focus Sessions

- **User request:** One coherent study-session workflow rather than an isolated timer, with a **quiet floating timer** that is draggable on desktop and iPad, optional expanded controls, distinct session goals, exact time per phase, and time-up choices. Do not disrupt MCQ questions or confuse time with mastery.
- **Modes:** `BSA212_MODES` + `bsa212ModePlan(subject,budget,settings,focus,mode)` reuse the subject's existing lectures, MCQ bank, written problems, flashcards and mistake log; no fake items or new duplicated learning bank. Modes: Learn + Practice (default), Learn a topic, Recall + Review, Exam preparation. The mode reorders activities and weight allocations, not the Tutor interface or grading engine. Budget choices 20/30/40/60/90/120 minutes; plans of at most 30 minutes shorten to 3–4 steps so setup doesn't displace studying. `bsa212Allocate` distributes the full selected duration across activities. If source-specific practice does not exist, a generic Study/Library activity may be suggested, not a fabricated question.
- **Timer and state:** `BSA212FloatingFocus` lives beside the existing global `FocusBar` in `App`, follows normal navigation, shows the *current phase time remaining* and current step, and defaults to a small unobtrusive pill. Expanded panel shows steps, remaining total goal, Pause/Resume, Open step, Next, +5/+10, Save & leave, Finish & file. Drag with a grip only; iPad touch uses Pointer Events/capture and `touch-action:none` on the grip, leaving normal page scrolling intact. Keyboard arrows move grip; Home resets; Reset position button works. Relative position is separately persisted in localStorage `bsa212-floating-pos` (device UI preference, **not academic records**), and clamped on resize/orientation. Modals remain on their higher overlay z-index. No audible alarm, forced navigation, automatic submission or automatic mastery when time expires.
- **Phase time-up:** `bsa212Action(s,action,at,arg)` handles pause, start, expire, extend, next, save and finish. Expiry freezes the countdown and shows nonblocking choices upon expanding the pill. Long asleep/offscreen time beyond the allocated phase is capped; it does not silently inflate elapsed time by hours. An explicit +5/+10 **adds to the phase AND the overall session time goal**, not a hidden reallocation. Next advances the time block but does **not** mark its checklist or answer correct. Finish files the plan only on the user's explicit action; answers and mastery scores remain in original engines.
- **Persistence:** Additional OPTIONAL properties on each existing `practiceSessions[]` record (`focusMode`, `focusPhaseIndex`, `focusPhaseStartedAt`, `focusPhaseElapsedMs`, `focusWaiting`, `focusSaved`, `focusEnded`, `focusLastTool`), plus optional `extraMins` and `spentMs` per block. Uses existing `timerStartedAt`, `timerElapsedMs`, `timerPaused`. The whole focus plan saves through the existing `update`/clone/stamp/sync pipeline; NO global schema/data-version bump. Save freezes clocks and retains current phase. The last navigated tool route and bounded opts are bookmarked. **Exact quiz question state depends on the existing independent MCQ/written draft Save & Leave mechanism; arbitrary lecture scroll positions are NOT guaranteed by the floating timer.** When saving focus while inside active quiz/problem practice, stay on that screen and explicitly instruct the learner to use its own Save & Leave, preventing accidental draft loss. Older plans remain usable without invented new phase times; the Study Plan screen offers **Enable guided focus** opt-in, preserving earlier elapsed time/checklist marks. New sessions start guided by default.
- **Separate timers:** The pre-existing independent Pomodoro `FocusBar` is not replaced and can be invoked separately. Creating a guided plan while that Pomodoro is already running is blocked with a friendly toast to reduce double clocks; no change to Pomodoro data/XP behavior. This does NOT fully arbitrate timers started later elsewhere; avoid claiming comprehensive inter-timer conflict protection.
- **Evidence and UX:** `bsa34BlockEvidence` now recognizes guided block routes for genuine MCQ/written/card/accounting-lab attempts, while labels and self-reported completion remain distinct. The next-task header follows the current guided phase rather than jumping back to an incomplete earlier stage; the teach-back reflection becomes accessible in warm-up and teach-back stages, not only at 100% completion. The Study Plan shows time goal, elapsed time, current phase and stage time separately; history keeps elapsed time. No scheduled background reminders, artificial focus grade or automation.
- **Testing:** `node --check` app/service worker, Node VM tests for 4 modes × 6 budgets, exact allocation, unique phase keys, phase/pause/time-up/sleep cap/extension/next/save/resume/finish, compatibility with V2.11 old sessions, and source assertions for actual global mounting/keyboard/touch and answer-evidence routing. Chromium **CSS harness** at 1365×768, 820×1080, and 390×844 confirmed expanded/collapsed widget fits screen and drag grip `touch-action:none`. This is NOT a full deployed React18 application render or physical iPad/Android test; verify actual touch dragging and quiz navigation on devices before treating as fully QA'd.
- **Deployment:** Only `assets/app.js`, `assets/styles/polish.css`, `sw.js` upload to GitHub; this one living Markdown stays in ZIP for future AI handoff. Back up academic data before deploying. Keep source edits minimal, avoid changing AI Tutor layout, and preserve V2.10 Tutor context/duplicate checking and V2.11 modal fix.

## 9. Engineering / validation contract for the next AI

**Before editing:**

- Unzip safely; list file names, preserve relative paths; verify the displayed version, service-worker identifier and current asset organization.
- Read this handoff and current code. Locate source of requested behavior and its dependents. Avoid constructing a second independent UI/state/store for already-existing functions.
- Determine whether the change touches `STORE_KEY`, global learning evidence, sync merge, draft storage, routing, caching or the Tutor composer; these areas need disproportionate testing.
- Back up existing code and ask user to export academic data before deployment. Do not remove data or trigger destructive sync actions as part of a code audit.

**Testing (as applicable):**

- JS and service-worker parse; CSS basic validity; ZIP CRC/integrity; app's referenced runtime files match current deployment.
- Fresh installation vs existing academic data; old backups/imports; empty and large libraries; malformed source/JSON; missing keys.
- Multiple Choice: Unseen/Weak/Due/Smart, wrong→correct tracking, question identity, duplicate answers, Save & Leave, Resume, discard confirmation, Tutor handoff, back to exact question.
- Tutor: source selection, one-use context, two distinct unrelated mistakes, new lecture after MCQ, short vague follow-up, new topic command, older history visible but out of model request, answer key protection pre-check, math output, API failure, collapsed messages, renamed Tutor, returning to source.
- Lectures: 32-section scroll return to exact section; highlight selection toolbar dismisses on outside tap; PDF/text formatting, currency math, touch and mouse navigation, Up/Down actions.
- Practice and Insights: verified vs self-rated, assisted/guessed, same-day streak, due intervals, score/count consistency and recovery after reload.
- GitHub: offline cache update and `sw.js` activation, data merges between devices, local fallback on no internet, private vs public repo guard, backup-and-restore and conflict UX.
- UI: desktop at short and tall heights, iPad landscape/portrait and real touch, Android narrow viewport with soft keyboard, zoomed text, reduced motion, no horizontal overflow, no invisible composer/buttons.
- If browser/headless test is unavailable, clearly mark unverified instead of inventing PASS results.

**Packaging rule:**

- New user-facing version `V2.9` only after actual application change (not merely repackaging docs); increment scoped SW cache ID independently as needed. Keep schema version unchanged unless deliberately migrating.
- ZIP must list changed site files with exact relative paths; user additionally requests `assets/styles/polish.css` in every deployment ZIP. **Include exactly this one updated Markdown file at ZIP root.**
- Do not include tests, old release notes, image assets or internal debugging scripts unless changed/needed. Only site files should be uploaded to GitHub; this handoff may remain local if user does not want docs published on the site.
- Update hashes, source version, feature list, known issues, QA results and release history **inside this file only**. Keep the filename stable so new chats find it easily.

## 10. High-value source anchors (updated for V2.12)

Line numbers in older anchor sections may describe their original release; prefer symbol-name searches in the bundled V2.11 `assets/app.js` and the regenerated function index below.

- `buildDefault` — `assets/app.js:371`
- `loadLocal` — `assets/app.js:374`
- `normalizeDoc` — `assets/app.js:1447`
- `mergeDocs` — `assets/app.js:1604`
- `useSync` — `assets/app.js:1655`
- `GitHubPanel` — `assets/app.js:1943`
- `bsaBackupKeys` — `assets/app.js:13041`
- `bsaApplyInspectedBackup` — `assets/app.js:13128`
- `learningCapture` — `assets/app.js:2939`
- `learningEvidence` — `assets/app.js:2998`
- `bsa22SelfRatedEvidence` — `assets/app.js:3015`
- `bsa22IndependentCorrect` — `assets/app.js:3018`
- `bsaAdaptiveSignals` — `assets/app.js:3026`
- `smartTopicStats` — `assets/app.js:3062`
- `bsa197QuizKey` — `assets/app.js:5359`
- `bsa197History` — `assets/app.js:5369`
- `bsa197Recall` — `assets/app.js:5378`
- `bsa197Pool` — `assets/app.js:5399`
- `bsa197Pick` — `assets/app.js:5404`
- `bsa197SaveDraft` — `assets/app.js:5437`
- `bsa197LoadDraft` — `assets/app.js:5423`
- `bsa197DeleteDraft` — `assets/app.js:5448`
- `MultipleChoiceQuiz` — `assets/app.js:5513`
- `MCQPage` — `assets/app.js:5819`
- `MCQBankExplorer` — `assets/app.js:5761`
- `PracticeView` — `assets/app.js:6132`
- `BSA3Practice` — `assets/app.js:17047`
- `AiPracticeLab` — `assets/app.js:3101`
- `MockExam` — `assets/app.js:6322`
- `PsWrittenDrill` — `assets/app.js:5943`
- `bsa39KeyCheck` — `assets/app.js:5879`
- `bsa22ParseMoney` — `assets/app.js:5872`
- `bsa28ReflectionKey` — `assets/app.js:5491`
- `bsa28ReadReflections` — `assets/app.js:5492`
- `bsa28WriteReflections` — `assets/app.js:5496`
- `bsa25PracticeHealth` — `assets/app.js:14375`
- `BSA193DeviceSafety` — `assets/app.js:14411`
- `BSA205Mastery` — `assets/app.js:16682`
- `BsaMistakePatterns` — `assets/app.js:13871`
- `BSA38PracticeStudio` — `assets/app.js:16821`
- `LxReader` — `assets/app.js:10848`
- `LxView` — `assets/app.js:10607`
- `BSA15VisualStudio` — `assets/app.js:14994`
- `BSA192KnowledgeMap` — `assets/app.js:15169`
- `BSA181HighlightTool` — `assets/app.js:14238`
- `bsa27SelectionFocus` — `assets/app.js:14216`
- `bsa28SourceHistory` — `assets/app.js:5480`
- `bsa28NewTopicRequest` — `assets/app.js:5486`
- `bsa18ReadTutorChat` — `assets/app.js:5502`
- `AskView` — `assets/app.js:12185`
- `gemSourceSystem` — `assets/app.js:11756`
- `bsa26TutorCapabilityContext` — `assets/app.js:11934`
- `bsa26SafeAction` — `assets/app.js:11957`
- `bsa26TopicMatch` — `assets/app.js:11917`
- `bsa26FsDraft` — `assets/app.js:16271`
- `bsa26ReturnFor` — `assets/app.js:12079`
- `bsa26SafeReturn` — `assets/app.js:12068`
- `BSA205Library` — `assets/app.js:15893`
- `BSA45ImportCenter` — `assets/app.js:15766`
- `BSA44PackImporter` — `assets/app.js:15795`
- `BSA43FinancialStatements` — `assets/app.js:16278`
- `BSA205Cycle` — `assets/app.js:16451`
- `BSA187AccountingLab` — `assets/app.js:14631`
- `BSA4StudyDock` — `assets/app.js:17224`
- `BSA43ThemeNavigation` — `assets/app.js:17333`
- `DashboardV205Home` — `assets/app.js:17185`
- `App` — `assets/app.js:17579`

## 11. Complete named function index (V2.12)

633 named function declarations extracted from the exact V2.12 app.js. Nested declarations and repeated names may appear. These line numbers change each release.

`buildCfas (L353)`, `buildDefault (L371)`, `loadLocal (L374)`, `stdTokens (L402)`, `matchTopic (L405)`, `normTopic (L430)`, `normCard (L452)`, `normMistake (L459)`

`normQuiz (L472)`, `parseQA (L479)`, `psJSONCandidates (L494)`, `bsaRuleText (L515)`, `bsaRuleUrl (L516)`, `bsaRuleNormalize (L517)`, `bsaParseTypedMaterial (L529)`, `bsaMergeRules (L550)`

`bsaRuleCollection (L566)`, `bsaRuleCollections (L577)`, `bsaRuleHasSource (L586)`, `bsaRuleSearch (L587)`, `bsaPdfDatabase (L594)`, `bsaPdfOpenFile (L618)`, `PdfSourceShelf (L623)`, `RulesLibrary (L640)`

`selectionToggle (L659)`, `selectionAll (L660)`, `selectionReset (L661)`, `selectedExport (L662)`, `deleteSelectedRules (L667)`, `undoDeletedRules (L670)`, `openGroup (L684)`, `backToLibrary (L685)`

`closeRule (L686)`, `openRule (L687)`, `startEdit (L688)`, `save (L689)`, `saveNotes (L696)`, `toggleSave (L697)`, `markReview (L698)`, `exportCollection (L699)`

`parseImport (L827)`, `applyPartial (L901)`, `bsaRecordText (L968)`, `bsaMistakeMatch (L971)`, `bsaUpsertMistake (L980)`, `bsaImportIdentity (L1005)`, `previewPartial (L1010)`, `Modal (L1036)`

`Field (L1075)`, `TopicSelect (L1078)`, `readiness (L1101)`, `ExamPostMortem (L1116)`, `pmPending (L1155)`, `TopicEditor (L1158)`, `CardEditor (L1199)`, `FlipCard (L1218)`

`Drill (L1231)`, `MistakeEditor (L1261)`, `QuizEditor (L1281)`, `SubjectModal (L1296)`, `bsa26SessionGet (L1349)`, `bsa26SessionSet (L1350)`, `ghConfig (L1351)`, `deviceName (L1356)`

`b64encode (L1366)`, `b64decode (L1372)`, `bsa16LectureKey (L1383)`, `bsa16ActionClock (L1384)`, `bsa16SetLectureAction (L1388)`, `bsa16MergeLectureActions (L1396)`, `bsa16ApplyLectureActions (L1407)`, `bsa16SameChapter (L1416)`

`bsa16DeleteLectureRecords (L1420)`, `bsa16UndoLectureRecords (L1429)`, `normalizeDoc (L1447)`, `stampChanges (L1483)`, `latestOf (L1540)`, `mergeOrder (L1546)`, `pickNewer (L1563)`, `mergeList (L1569)`

`mergeDocs (L1604)`, `emit (L1650)`, `useSync (L1655)`, `useTick (L1666)`, `markDirty (L1737)`, `startSyncLoop (L1824)`, `syncView (L1918)`, `SyncBadge (L1925)`

`docSummary (L1936)`, `GitHubPanel (L1943)`, `packJSON (L2265)`, `StarterPacks (L2273)`, `bsaResourceDownload (L2324)`, `BsaResourceHub (L2329)`, `bsaImportQuality (L2349)`, `duplicate (L2354)`

`bsaTopicConnections (L2384)`, `DataModal (L2399)`, `dueState (L2620)`, `dueRel (L2627)`, `DueChip (L2633)`, `SessionEditor (L2649)`, `UpNext (L2678)`, `CalendarView (L2686)`

`Icon (L2896)`, `ThemeDots (L2915)`, `Track (L2936)`, `Ring (L2943)`, `learningCapture (L2948)`, `bsa20TopicResolver (L2982)`, `learningEvidence (L3007)`, `learningNextAction (L3013)`

`bsa22SelfRatedEvidence (L3024)`, `bsa22IndependentCorrect (L3027)`, `bsaAdaptiveSignals (L3035)`, `smartTopicStats (L3071)`, `AiPracticeLab (L3110)`, `StudyEnhancements (L3197)`, `StudyFlow (L3241)`, `SmartStudyPanel (L3279)`

`homePreferences (L3294)`, `AcademicCommandCenter (L3295)`, `loadRoutineDate (L3347)`, `saveRoutineDate (L3357)`, `DailyStudyPath (L3369)`, `WorkflowRibbon (L3404)`, `FeatureGuide (L3428)`, `NewHereCard (L3441)`

`HomeView (L3449)`, `RoadmapView (L3574)`, `VaultView (L3696)`, `MistakesView (L3778)`, `QuickAdd (L3837)`, `MoreSheet (L3848)`, `upcomingExams (L3888)`, `focusExam (L3892)`

`fuzzIvl (L3904)`, `schedule (L3911)`, `forecast (L3959)`, `fcWorst (L3974)`, `smoothDay (L3983)`, `ForecastPanel (L3999)`, `bumpDay (L4035)`, `examForTopic (L4051)`

`calBump (L4069)`, `calStats (L4076)`, `CalibrationPanel (L4094)`, `gradeCardIn (L4116)`, `gradeMistakeIn (L4127)`, `buildReview (L4138)`, `findProb (L4170)`, `probsDue (L4177)`

`gradeProbIn (L4185)`, `gapCheck (L4207)`, `examPressure (L4233)`, `buildAll (L4238)`, `AllSubjectsPanel (L4254)`, `interleave (L4268)`, `cardStrength (L4281)`, `examReadiness (L4290)`

`examMix (L4307)`, `studyDaySet (L4326)`, `streakOf (L4333)`, `weekMinutes (L4343)`, `retentionPct (L4348)`, `say (L4359)`, `budgetQueue (L4372)`, `BudgetPanel (L4391)`

`noteAllowed (L4404)`, `maybeRemind (L4415)`, `StudySession (L4438)`, `ComputeSet (L4773)`, `startTimer (L4869)`, `startBreak (L4874)`, `useTimer (L4878)`, `chime (L4888)`

`FocusBar (L4905)`, `LeechPanel (L5015)`, `attendStats (L5063)`, `ClassLife (L5076)`, `RoiPanel (L5178)`, `ActivityStrip (L5211)`, `playStudyFeedbackSound (L5245)`, `playQuizFeedbackSound (L5249)`

`note (L5276)`, `mcqAssignedTopic (L5316)`, `mcqDedicatedPool (L5343)`, `bsa197QuizKey (L5368)`, `bsa197History (L5378)`, `bsa197Recall (L5387)`, `bsa197Pool (L5408)`, `bsa197Pick (L5413)`

`bsa197DraftKey (L5431)`, `bsa197LoadDraft (L5432)`, `bsa18PracticeChanged (L5439)`, `bsa18SavedAt (L5442)`, `bsa197SaveDraft (L5446)`, `bsa197DeleteDraft (L5457)`, `bsa18WrittenKey (L5460)`, `bsa18LoadWritten (L5461)`

`bsa18SaveWritten (L5467)`, `bsa18DeleteWritten (L5471)`, `bsa18LatestPractice (L5472)`, `bsa28SourceHistory (L5489)`, `bsa28NewTopicRequest (L5495)`, `bsa28ReflectionKey (L5500)`, `bsa28ReadReflections (L5501)`, `bsa28WriteReflections (L5505)`

`bsa18ReadTutorChat (L5511)`, `MultipleChoiceQuiz (L5522)`, `MCQBankExplorer (L5814)`, `MCQPage (L5872)`, `bsa39Requirements (L5893)`, `bsa39Mode (L5899)`, `bsa39DraftKey (L5909)`, `bsa39Load (L5910)`

`bsa39Save (L5911)`, `bsa39Number (L5912)`, `bsa39Rows (L5913)`, `bsa39RowSummary (L5914)`, `bsa22AccountKey (L5915)`, `bsa22ParseMoney (L5925)`, `bsa39KeyCheck (L5932)`, `bsa39Text (L5964)`

`BSA39AnswerEditor (L5971)`, `PsWrittenDrill (L5996)`, `bsaSmartQueue (L6149)`, `add (L6159)`, `bsaWeeklyEvidence (L6171)`, `timestamp (L6173)`, `BSA29ClozePractice (L6188)`, `PracticeView (L6292)`

`mxPool (L6457)`, `MockExam (L6483)`, `customVars (L6734)`, `applyTheme (L6761)`, `CustomThemeEditor (L6776)`, `BSA41ThemesModal (L6821)`, `AppearanceModal (L6842)`, `ExamReadyMini (L6937)`

`gcDefaultScale (L6994)`, `gcDefault (L7006)`, `gcNorm (L7023)`, `gcPartRaw (L7074)`, `gcCompute (L7087)`, `gcLetter (L7107)`, `gcRemaining (L7113)`, `gcSummary (L7131)`

`gcNeed (L7155)`, `gcSemester (L7171)`, `gcFromJSON (L7188)`, `gcMergeStructure (L7236)`, `gcCrc32 (L7275)`, `gcZip (L7281)`, `gcSheetXml (L7352)`, `gcSheetName (L7369)`

`gcXlsx (L7377)`, `nlmGuessKind (L7411)`, `nlmContext (L7619)`, `bsaPromptIsJsonPrompt (L7698)`, `bsaPromptFillBrackets (L7699)`, `bsaBuildGuidedPrompt (L7711)`, `NotebookLMPrompts (L7785)`, `setExtra (L7815)`

`setCount (L7816)`, `setField (L7828)`, `gcRetention (L7935)`, `gcScholar (L7946)`, `gcTier (L7966)`, `gcNeedView (L7973)`, `gcWarnings (L7980)`, `gcBlank (L7992)`

`NumInput (L8008)`, `gcSnap (L8046)`, `GcTrajectory (L8059)`, `GcOverview (L8087)`, `gcPullable (L8156)`, `GcPullQuizzes (L8160)`, `GcPullAttendance (L8181)`, `GcEditor (L8195)`

`GcScale (L8343)`, `GcSettings (L8382)`, `GcStart (L8407)`, `GcImportBox (L8423)`, `gcListFor (L8467)`, `gcWorkbook (L8475)`, `gcReportHtml (L8544)`, `gcTextSummary (L8590)`

`gcPrint (L8614)`, `GcExport (L8673)`, `GcGoals (L8686)`, `GcAll (L8727)`, `GcWhatIf (L8770)`, `GradesView (L8830)`, `GradeMini (L8952)`, `drLex (L8998)`

`drCompile (L9017)`, `or (L9026)`, `and (L9027)`, `cmp (L9028)`, `add (L9039)`, `mul (L9044)`, `unary (L9056)`, `power (L9062)`

`postfix (L9067)`, `primary (L9073)`, `drNiceStep (L9117)`, `drVar (L9123)`, `drGivenRow (L9160)`, `drStep (L9168)`, `drNorm (L9177)`, `drCheck (L9229)`

`drFmt (L9257)`, `drFill (L9267)`, `drDraw (L9282)`, `drMake (L9291)`, `drPool (L9331)`, `drPickSet (L9345)`, `drSets (L9366)`, `drFromJSON (L9377)`

`drApply (L9398)`, `bkChapter (L9411)`, `bkNorm (L9434)`, `bkOf (L9445)`, `bkMerge (L9456)`, `bkFromJSON (L9496)`, `drExampleFor (L9559)`, `BkPanel (L9616)`

`BkEditor (L9637)`, `DrPanel (L9735)`, `drToForm (L9752)`, `drFromForm (L9770)`, `DrSample (L9794)`, `DrForm (L9804)`, `DrManager (L9819)`, `psRepairJSON (L9942)`

`psS (L9973)`, `psNormProblem (L10006)`, `psNormSet (L10037)`, `psNormLecture (L10062)`, `psFromJSON (L10113)`, `psApply (L10144)`, `psBlocks (L10207)`, `psMathHtml (L10262)`

`psMathSegments (L10318)`, `psInline (L10345)`, `PsMd (L10367)`, `psMdHtml (L10393)`, `PersonalizationCorner (L10415)`, `psPrint (L10489)`, `psSetText (L10509)`, `lxText (L10524)`

`psSafeProblems (L10535)`, `psGroupProblems (L10553)`, `psByTopic (L10563)`, `PsBar (L10582)`, `PsSampleCard (L10590)`, `bsa29Clean (L10604)`, `bsa29Meaningful (L10605)`, `bsa29HasAnswer (L10610)`

`bsa29Candidates (L10614)`, `lxCloze (L10657)`, `bsa29Pool (L10658)`, `bsa29Exact (L10672)`, `bsa29DraftKey (L10676)`, `bsa29ReadDraft (L10677)`, `bsa29SaveDraft (L10683)`, `lxStudied (L10696)`

`lxDueList (L10700)`, `LxDueChip (L10703)`, `xrefLecture (L10714)`, `LecturePracticeGenerator (L10738)`, `save (L10777)`, `SmartScheduleBuilder (L10805)`, `build (L10809)`, `save (L10828)`

`LxView (L10840)`, `PsEmpty (L10947)`, `lxSourcePresentation (L10952)`, `bsa13LectureHeading (L10976)`, `bsaRevisionExcerpt (L10981)`, `bsa41LectureHighlights (L10992)`, `bsa41UpdateHighlight (L10993)`, `bsa41ExportNotes (L10994)`

`bsa41Locate (L11021)`, `bsa41DecorateHtml (L11031)`, `BSA41MarkedText (L11076)`, `LxReader (L11082)`, `LxEditor (L11290)`, `BSA43ProblemSets (L11330)`, `PsView (L11364)`, `PsExportCustomizer (L11390)`

`PsSetView (L11438)`, `PsProblem (L11503)`, `PsProblemEditor (L11519)`, `PsSetEditor (L11545)`, `gemNetErr (L11704)`, `gemContext (L11828)`, `gemSystem (L11877)`, `gemFindJSON (L11894)`

`GemSetup (L11912)`, `gemSourceSystem (L11990)`, `bsa210TutorCore (L12109)`, `gemGeneralSystem (L12125)`, `bsa26TutorName (L12131)`, `bsa26Words (L12168)`, `bsa26TopicMatch (L12169)`, `bsa26TutorCapabilityContext (L12186)`

`bsa26SafeAction (L12209)`, `bsa26Action (L12233)`, `bsa26LocalStudyPlan (L12234)`, `gemDashboardSystem (L12302)`, `bsa4ContextKey (L12308)`, `bsa4ReadContext (L12309)`, `bsa4SaveContext (L12310)`, `bsa4ProblemContext (L12311)`

`bsa26SafeReturn (L12324)`, `bsa26ReturnFor (L12335)`, `bsa26FocusExcerpt (L12366)`, `bsa4TutorDraft (L12376)`, `bsa197TutorQuizBehavior (L12402)`, `bsa197TutorContext (L12405)`, `BSA197TutorMemory (L12411)`, `AskView (L12441)`

`setBadge (L12670)`, `CurriculumView (L12698)`, `InkPad (L12754)`, `ClassmatePublisher (L13018)`, `RetentionTools (L13242)`, `bsaBackupKeys (L13305)`, `bsaValidMainRecord (L13313)`, `bsaBackupPreview (L13326)`

`bsaApplyInspectedBackup (L13392)`, `ToolkitView (L13418)`, `HowToCorner (L13567)`, `grantFocusXp (L13605)`, `grantActivityXp (L13619)`, `grantFlashcardReviewXp (L13633)`, `bsaAchievementDetails (L13639)`, `AcademicProgress (L13660)`

`Game2048 (L13682)`, `SudokuGame (L13700)`, `MinesweeperGame (L13712)`, `useJoy (L13727)`, `lifePetStatus (L13748)`, `StudyLifeHomeWidget (L13753)`, `readLife (L13782)`, `lifeEarned (L13783)`

`PixelScholar (L13791)`, `LifeTownMap (L13816)`, `activeSeason (L13834)`, `StudyLife (L13835)`, `JoyHub (L13879)`, `SnakeGame (L13914)`, `WordGuessGame (L13933)`, `NonogramGame (L13946)`

`BubblePopGame (L13953)`, `BreakCorner (L13966)`, `StudyTimeAudit (L13995)`, `bsaReadinessReport (L14015)`, `BsaReadinessCoach (L14044)`, `bsaV164ReadExamPrefs (L14091)`, `bsaV164ExamPriority (L14095)`, `BsaExamPlanner (L14107)`

`BsaMistakePatterns (L14135)`, `BsaRecommendationCheck (L14155)`, `BsaTopicMasteryPanel (L14174)`, `StudyReport (L14193)`, `bsaDeviceKeyGet (L14299)`, `PrivateVault (L14341)`, `bsa181Read (L14431)`, `bsa181Write (L14432)`

`bsa181Text (L14433)`, `bsa181Add (L14434)`, `bsa181Remove (L14435)`, `bsa181Restore (L14436)`, `bsa181Recent (L14437)`, `bsa181Links (L14438)`, `BSA181Workspace (L14439)`, `BSA181Spotlight (L14471)`

`bsa27SelectionFocus (L14480)`, `bsa27DefaultTutorQuestion (L14496)`, `BSA181HighlightTool (L14502)`, `StartupDataRecovery (L14587)`, `BSA185LayoutEditor (L14627)`, `bsa25PracticeHealth (L14639)`, `BSA193DeviceSafety (L14675)`, `bsa187Verify (L14757)`

`bsa198Validate (L14788)`, `bsa198StoredKeyValid (L14812)`, `bsa198Catalog (L14824)`, `bsa198PlanBatch (L14837)`, `bsa198Parse (L14863)`, `bsa198DeclaredSubject (L14873)`, `bsa198StorePlan (L14877)`, `BSA187AccountingLab (L14895)`

`bsa188Tasks (L15053)`, `bsa196BudgetTasks (L15072)`, `BSA188Today (L15076)`, `BSA189Companion (L15113)`, `BSA191WeeklyPlanner (L15134)`, `BSA344Schedule (L15161)`, `bsa15Clean (L15178)`, `bsa15Excerpt (L15182)`

`bsa15LectureList (L15187)`, `bsa15SectionList (L15190)`, `bsa15Process (L15193)`, `bsa15ComparisonTable (L15203)`, `bsa15Timeline (L15219)`, `bsa15ProblemBlocks (L15250)`, `BSA15VisualStudio (L15258)`, `BSA192KnowledgeMap (L15433)`

`DashboardV2Home (L15438)`, `bsa205LoadScript (L15533)`, `BSA205Sources (L15536)`, `addSource (L15544)`, `bsa3TopicLabel (L15569)`, `bsa205LibraryItems (L15574)`, `bsa3GroupRows (L15585)`, `bsa38GroupOriginalSets (L15589)`

`bsa205Duplicates (L15597)`, `bsa205InboxPlan (L15604)`, `bsa205FileBase64 (L15610)`, `BSA205Importer (L15637)`, `bsa49TopicParts (L15687)`, `bsa49ResolveTopic (L15695)`, `bsa49CanonicalizePack (L15721)`, `bsa49UnmatchedLabels (L15732)`

`BSA49TopicLinks (L15741)`, `bsa49MatchesSubject (L15751)`, `bsa49PackPrompt (L15762)`, `bsa13CheckGeneratedJSON (L15781)`, `bsa44Empty (L15830)`, `bsa44ParseOne (L15831)`, `bsa44Baseline (L15864)`, `bsa210Tokens (L15889)`

`bsa210Intent (L15898)`, `bsa210Concept (L15908)`, `bsa210Numbers (L15920)`, `bsa210DuplicateSignal (L15926)`, `bsa210AnswerMeaning (L15952)`, `bsa210MaterialPair (L15962)`, `bsa44Similar (L15972)`, `bsa44Prepare (L15973)`

`acceptSets (L16034)`, `bsa44Plan (L16060)`, `bsa44ApplyPack (L16073)`, `bsa47ExpectedMaterials (L16105)`, `bsa47HasMaterial (L16110)`, `bsa47TopicGapPrompt (L16111)`, `BSA49SmartFlow (L16134)`, `BSA45ImportCenter (L16166)`

`BSA44PackImporter (L16194)`, `bsa44TopicCounters (L16250)`, `BSA44TopicHealth (L16262)`, `bsa45SafeLibrarySubject (L16288)`, `BSA205Library (L16293)`, `bsa205Diagnose (L16426)`, `bsa43ParseReport (L16527)`, `bsa46CrossChecks (L16591)`

`BSA46Statement (L16607)`, `BSA46Checks (L16631)`, `bsa43Tasks (L16637)`, `bsa26FsDraftKey (L16668)`, `bsa26FsDraft (L16671)`, `BSA43FinancialStatements (L16678)`, `bsa205CycleValidate (L16822)`, `bsa205Ledger (L16834)`

`bsa205CycleReports (L16838)`, `BSA205Cycle (L16851)`, `bsa34FocusChoices (L16930)`, `bsa34TopicMatch (L16940)`, `bsa34TopicTitle (L16946)`, `bsa34PlanBlocks (L16947)`, `bsa211HasTimer (L16979)`, `bsa211ElapsedMs (L16980)`

`bsa211Clock (L16986)`, `bsa212Allocate (L16999)`, `bsa212ModePlan (L17010)`, `bsa212ModeName (L17040)`, `bsa212Guided (L17041)`, `bsa212PhaseIndex (L17042)`, `bsa212PhaseElapsed (L17043)`, `bsa212PhaseGoal (L17046)`

`bsa212Freeze (L17047)`, `bsa212Action (L17055)`, `bsa205SessionBlocks (L17089)`, `bsa34BlockEvidence (L17092)`, `BSA205Study (L17108)`, `BSA212FloatingFocus (L17232)`, `bsa34LearningSnapshot (L17289)`, `BSA205Mastery (L17309)`

`bsa38Calc (L17356)`, `bsa38ValidateTemplate (L17370)`, `bsa38ParseImport (L17386)`, `bsa38Generate (L17387)`, `bsa38Work (L17392)`, `bsa38SaveWork (L17393)`, `bsa38Day (L17394)`, `bsa38AddDays (L17395)`

`BSA38Variations (L17396)`, `BSA38Oral (L17427)`, `BSA38MasteryCheckpoint (L17441)`, `BSA38PracticeStudio (L17448)`, `BSA38ExamCatchup (L17454)`, `bsa38SuggestTopic (L17478)`, `BSA38LibraryTriage (L17485)`, `BSA38ProgressCompare (L17512)`

`bsa33Journey (L17529)`, `bsa33RouteName (L17542)`, `BSA31StudyPath (L17543)`, `bsa32ManilaDay (L17599)`, `bsa32DailyLine (L17608)`, `BSA3Today (L17614)`, `BSA3Practice (L17674)`, `bsa46SuggestedProfile (L17726)`

`bsa46ProfileId (L17736)`, `bsa46Profile (L17737)`, `bsa46ToolVisible (L17738)`, `bsa46TutorGuidance (L17747)`, `bsa46ImportGuidance (L17752)`, `BSA45SidebarEditor (L17753)`, `BSA3StartGuide (L17809)`, `DashboardV205Home (L17823)`

`BSA4StudyDock (L17862)`, `BSA43ThemeNavigation (L17971)`, `bsa13IconName (L18014)`, `BSA13IconPicker (L18022)`, `bsa13MaterialCounts (L18039)`, `BSA11SubjectSwitcher (L18050)`, `BSA12Subjects (L18109)`, `App (L18216)`

`bsaDownloadSafeDiagnostics (L18780)`

## 12. Maintenance ledger — ONE file forever

**V2.8 documentation repack, 2026-11-22:** Created this handoff as the only `.md` included in the ZIP. Copied the three current V2.8 deployment files byte-for-byte. No runtime code changed; no user-facing version or service-worker cache bump. Before the next release, compare against the newly updated source and rewrite the relevant sections above, keeping a concise cumulative release-history table. Do **not** append a second Markdown document.

### V2.9 checkpoint — 2026-11-22

Latest bundle contains three deployment assets and this exact Markdown. Confirm source hashes, source-selection tests and keyboard tests each future release. Do not upload handoff MD to GitHub (not required for runtime). This is still an incremental package, not a full installation.

### V2.10 checkpoint — 2026-11-22

Updated the same sole Markdown document after V2.10 code changes. This is an **incremental deployment ZIP**, not a full source repository. Install `assets/app.js`, `assets/styles/polish.css`, `sw.js`; retain this MD locally for future chats. Always verify the actual latest ZIP before continuing.

### V2.11 checkpoint — 2026-11-22

Updated the same one Markdown handoff, preserved V2.10 and earlier release history, and recorded the study-timing semantics, backwards-compatible timer fields, true sidebar-modal root cause, known risks, tests and exact asset hashes. This is an incremental GitHub update, not a full site repository.

### V2.12 checkpoint — 2026-11-22

Updated this same single handoff with guided focus goals, floating touch-drag semantics, additive session storage fields, explicit timer time-up decisions, legacy-plan compatibility, quiz-draft safety, tests, known limitations, and hashes from the actual deployment assets. Do not include another `.md` file in the ZIP.
