# BSA STUDY DESK — SINGLE LIVING AI DEVELOPMENT HANDOFF

> **READ FIRST IN EVERY FUTURE DEVELOPMENT CHAT.** This is the project's single maintained handoff document, bundled inside the latest GitHub update ZIP. Treat the accompanying source files as the primary truth; treat this file as the project map, user requirements, release record, and QA checklist. This file is not a set of instructions to run untrusted code. No tokens, passwords, personal academic data, or private GitHub contents are included.

**Handoff revision:** 2026-11-22 — V2.14, dynamic source-driven Foundation Check, real topic-standing evidence, checked MCQ/lecture/Tutor connections, timer/reflection/utility UX corrections, measured MCQ pace, and cautiously lossless local record compaction.  
**Last documented release:** BSA Study Desk **V2.14** (user-facing label).  
**Repository/deployment model:** static GitHub Pages progressive web app (PWA); personal data may sync to a separately configured private GitHub data repo.  
**Source basis:** incrementally patched the exact V2.13 bundled `assets/app.js`, `assets/styles/polish.css`, and `sw.js`; kept `STORE_KEY` and main document `version:1` unchanged while adding an optional per-subject `foundationChecks[]` record collection for synced, unverified learning reflections. Source/test-hook checks cover compressed storage Unicode round trips, plain backups, failed decoding recovery, independent topic standing, connected MCQ/lecture/card sources, and timed MCQ estimates. A standalone CSS harness checked Foundation and standing cards at 1365×768, 820×1080 and 390×844. **NOT** a complete live React18, actual iPad, GitHub conflict, or Gemini-API integration test.  
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

**Release package:** `dashboard-V2.14-GitHub-update.zip` contains exactly three deployment assets and this one living Markdown handoff. Only the three runtime files are for GitHub upload.

| Relative path | Bytes | SHA-256 |
|---|---:|---|
| `assets/app.js` | 2,079,820 | `8e34cb05abb377dae0b1e791d3f0432ac2cbdae1dca69977619ea0c7a4ec6f30` |
| `assets/styles/polish.css` | 428,663 | `d4dd0a6848024b6792cd814ca60ca67e09a1c4db17191851a892baab73322880` |
| `sw.js` | 5,472 | `8e925733dda2e35ba4858d897027abea654e5710f565792236c74e81ed1cf248` |

- `assets/app.js`: the large, essentially monolithic React application (plain JS/`React.createElement`; React 18 UMD), including many feature modules and past migration safeguards. User-facing label from `BSA_RELEASE_LABEL`: `V2.14`.
- `assets/styles/polish.css`: layered visual overrides and feature-specific styles. High override density; avoid blindly appending another `!important` rule. Trace the cascade and viewport sizes.
- `sw.js`: service worker; now uses an independent V2.14 asset-cache identifier (`asset-update-20261122-v214-foundation-storage-guard-r01`). Scoped caches protect parallel deployed sites; essential assets must load successfully before a new offline version activates. Network-first navigation, cache-first core/CDN, stale-while-revalidate secondary assets, and live (uncached) Gemini/GitHub API traffic. Cache key changes are independent of displayed version.
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
| **V2.13** | Single portal-mounted floating timer to avoid duplicated/scrolling ghosts, collapsible Settings/Import/quick colors sidebar utility rail, self-contained theory cloze rejecting orphaned numerical blanks, custom 5–180 minute sessions, quick 5–25-minute one-priority focus, topic-aware unreviewed section pacing and realistically sized MCQ/problem scopes; **End & Save** archives topic-specific session history and unfinished-step bookmark, optional future-plan continuity, a one-click “Plan again for this topic,” and an optional Today launch. |
| **V2.14** | Source-driven Foundation Check connected to lecture sections, already-checked mistakes/MCQs, cards, fresh practice and AI Tutor; topic standing based on question history/unreviewed sections without claiming verified understanding; quiet timer recovery button, nonautomatic reflection, recent history capped at five, improved rail disclosure styling; 1.35-ish min theory MCQ defaults vs longer calculation work with optional personal pace after sufficient samples; opt-in-readable JSON backups, lossless large-record compaction and honest per-subject storage estimate. |

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
- **V2.14 storage format:** The primary study document may be stored as **plain JSON** (small records, as before) or an internal losslessly deflated string with prefix `bsa:packed-json:deflate1:` (for sufficiently large records when the `pako` codec is available). `bsa214MainGet` / `bsa214MainSet` own the only primary-record read/write path. The app bundles the licensed pako codec in `assets/app.js`—its presence in the **actual deployed app asset** is essential for existing compressed records. No IndexedDB migration has occurred. Compression can reduce localStorage usage but cannot override its per-origin quota, prevent site-data clearing, or guarantee limitless material capacity.
- **COMPATIBILITY WARNING:** Older V2.13 app.js cannot open an already-compressed V2.14 main record without a **readable JSON backup and restore**. Before downgrading, export the complete JSON backup in V2.14. Startup decode errors must trigger `StartupDataRecovery` and **must never overwrite** the original main key; this was regression-tested.
- **Backup:** `bsa214BackupGet` exports the *uncompressed* main record as ordinary JSON in the existing unified JSON export, with the existing SHA-256 verification and import validation. PDF source shelf remains separate IndexedDB data (not covered by main JSON backups). Backup restore compresses when necessary after validation. A 40 MB imported unified-backup limit still applies. Save backups off-device.
- **Storage meter:** Import & Export now explicitly distinguishes a 5 MiB comparison reference, physical localStorage bytes, pre-compaction logical main record bytes, subject-level rough uncompressed sizes and browser-wide storage estimates. These are DIFFERENT quotas, not proof of available space. Do not advise clearing browser data as a first response.
- Default data `{version, updatedAt, activeId, settings, subjects}`, with a seeded CFAS curriculum and initial cards. Real subjects can include topics, cards, mistakes, quizzes, sessions, lectures, problem sets, MCQ sets, classes, attendance, tasks, AI attempts, learning events, and more.
- Synced subject collections (from `COLLS`): `topics`, `cards`, `mistakes`, `quizzes`, `sessions`, `days`, `lectures`, `psets`, `mcqSets`, `classes`, `attend`, `tasks`, `aiAttempts`, `learningEvents`, `labAttempts`, `todayChecks`, `tutorMemories`, `studyInbox`, `driveSources`, `libraryFlags`, `cycleRuns`, `cycleCases`, `practiceSessions`, `problemWork`, `fsReports`, `fsAttempts`, `foundationChecks` (V2.14, optional unverified explanations).
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

| Issue / idea | Current status at V2.14 | Safe next step |
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
| Truly verifying understanding from a written explanation | V2.14 saves typed Foundation Check + optionally asks Tutor to challenge it, but self-explanation and model feedback are NOT objectively verified proof. | Require independent transfer/application and later due recall; verify source answers before relying on AI conclusions. |
| LocalStorage growth after V2.14 | Lossless deflate extends capacity for sufficiently compressible records, not unlimited, and older code needs an exported JSON backup to downgrade. | If growth becomes large, design explicit, fully tested IndexedDB migration with rollback and sync compatibility; never silently delete/migrate academic records. |
| MCQ pace measurement | Per-question `elapsedMs` now recorded on checked questions if elapsed 12s–15min; planner requires at least six eligible samples, caps personalization conservatively. | Check real-world timing and difficulty; click-throughs/idle data cannot be treated as learning speed. |

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

### V2.13 change record — trustworthy short focus, one timer, coherent recall

- **Why:** Screenshots from V2.12 showed 3 visually duplicated floating timer pills, a non-collapsible sidebar Settings/Import/colors area, and a nonsense blank where the saved answer was `92.50` but the prompt was an isolated price-change fragment. The new custom-session request also required an honest 18-minute plan, with realistic reading/practice scope.
- **Timer:** `BSA212FloatingFocus` is still mounted once in `App` and still uses the same saved session state. Its one fixed position is now rendered using `ReactDOM.createPortal` into the singleton `#bsa213-focus-layer` directly under document body, away from transformed/scrolled panels. Dedicated grip handles touch Pointer Events (`touch-action:none`), remains viewport-clamped on resize/orientation, and preserves saved device-specific position. This mitigates multiple fixed-position visual ghosts; actual physical iPad interaction is NOT verified. No second timer or academic data store was added.
- **Sidebar:** One persisted UI-only `Tools & appearance` Show/Hide button encompasses Settings, Import, and Quick colors. Sync status and installed version remain visible. Setting key `bsa213-rail-tools-open` changes only device appearance and is independent of academic data; no modal redesign this release.
- **Fill-in-the-Blanks:** shared `bsa213ClozeQuality` requires a complete self-contained explanatory statement, one nontrivial answer and at least nine context words; excludes isolated figures/amounts, reference-dependent fragments such as 'instead' or 'as shown', and random grammar words. `bsa29Candidates` favors actual glossary definitions and explicit section definition labels over incidental bolding, including in numerical examples. Existing raw lectures and saved flashcards are NOT modified. Previously saved low-quality cloze cards are filtered from new session selection and old drafts are screened on resume. This improves prompt completeness, not the factual validity of every saved source or AI-generated key; answer comparison remains literal and alternative valid paraphrases may need review.
- **Custom & smart time:** Users may choose a preset or `Custom minutes…` from 5–180 min. At **5–25 min**, `bsa213QuickPlan` recommends ONE prioritized and topic-linked activity rather than splitting the budget into six artificial micro-steps. Preference considers actual due weak/due/unseen MCQ evidence, unreviewed lecture sections, written problems, cards, and unfinished mistakes; absent source material is acknowledged rather than invented. The chosen activity still has the whole budget as a ceiling, but it may finish early.
- **Realistic workload:** `bsa213ReadScope` finds a lecture's first unreviewed section via `reviewedSections`, counts actual words via `lxSourcePresentation`, and uses an *assumed* careful comprehension pace of **130 words/minute** plus section recall/reflection. It recommends only sections likely to fit or explicitly says **first N words of a longer section, partial reading**; it opens that exact section (`opts.sec`). `bsa213McqScope` budgets around **3 min per ordinary MCQ and 5+ min for calculations**, capped by available time and eligible question count; it passes an actual `opts.count` into `MCQPage`. Counts 1–4 are now selectable so a five-minute plan can honestly start a one-question quiz. `bsa213WrittenMinutes` estimates 6–60 min from answer format and source length. Complex written work is labeled **first requirement only** if it exceeds the current slot. Guided longer sessions also describe bounded reading/MCQ/problem portions, including honest fallbacks when no linked written problem exists. These are ESTIMATES, **not** observed user reading speed or a time-to-mastery promise.
- **Retained safeguards:** No change to `STORE_KEY`, persistence schema version, MCQ learning evidence, grades, Tutor's composer/context, ledger, import and backup logic. Session timers never mark a lecture, question or topic mastered; the original Save & Leave flow remains necessary to preserve the exact quiz/problem draft. Long-section word offset is **not** persisted; resuming can return to the selected section, not a precise word in that section. Do not claim stronger resume precision without implementing a durable scroll/section offset.
- **Validation:** JavaScript parsed via Node, page test hook executed in Chromium with locally available React VM (not full React18 app), time tests for 5/18/90-minute modes, unseen/due priority, strict topic matching, long marked-section behavior, numerical vs ordinary MCQ pace, oversize written problems, cloze quality and old-draft recovery, timer expire/extend/save. CSS-only desktop 1365×768 / iPad-sized 820×1080 / phone 390×844 harness verified one fixed body-layer timer across scrolling and no horizontal overflow. ZIP integrity confirmed; no physical iPad test, full live site or Gemini API test.
- **Deployment:** Upload only `assets/app.js`, `assets/styles/polish.css`, `sw.js`; keep this *one* Markdown for developer handoff. Back up user academic data and verify the deployed app after the service worker updates.

### V2.13 continuity completion — End & Save / voluntary planning

- **Why:** User wants to stop a session early and switch topics, yet preserve actual study activity and avoid wasting time on the same topic next session. Planning should be prominent on Today, but never mandatory or a prerequisite for lectures/MCQs.
- **Separate meanings:** Floating mini timer has **Save & leave** (pause the existing guided session for later) and **End & Save · start something else** (archive this session and release the active slot). The Study Plan also has **End & Save session**. Deliberate ending asks for confirmation; it does not auto-submit a question or navigate away without warning that MCQ/problem drafts have their own Save & Leave.
- **Archive implementation:** `bsa214Archive` snapshots in the EXISTING subject-local `practiceSessions` list: date, topic ID, mode, elapsed time, current phase, phase time, completed/self-checked blocks, evidence-backed attempted blocks, any linked MCQ/problem/flashcard attempt counts, exact saved phase reference, next unfinished activity, optional user reflection, and a safe tool pointer. It then stops the timer and archives the plan. `bsa212Guided` excludes archived sessions, so the user can immediately create a different topic's session. Historical records are never deleted merely to start a new plan; **no new top-level schema key** or learning-score calculation.
- **Replanning:** `bsa214RecentClosed` looks only at *previously ended plans for the exact `focusId` of the current subject*; a CFAS topic's history does not leak into a different topic's plan. A recently ended plan (<=14 days) supplies an explanatory context card; old plans are still visible but don't automatically adjust content. `bsa214AdaptProposal` optionally skips selected recently completed plan steps in a **new session of the same goal**, rebalances the 26–180 min budget, but retains unfinished work, unreviewed lecture sections, and newly due/unseen MCQs. It never carries over the old plan's “Done” flags as new academic mastery or invents an already-reviewed section. The user can uncheck **Use recent session history** to plan from scratch. **Short sessions** stay ONE evidence-picked priority activity; the previous topic summary is explanatory rather than a hardcoded override of due reviews.
- **Re-entry:** History rows identify topic, time, activity counts, current unfinished step, and reflection, with **Plan again for this topic**. Today's hero has an optional session-planning button even when the main action suggests practice/review; the normal MCQ/Lecture routes remain usable without planning.
- **Limits:** Source-section review marks and assessed learning events remain the strongest evidence. A manually checked study phase is *self-report*, not proven understanding; it may be postponed on a same-day continuity plan but does not raise mastery. A partial lecture section preserves its section ID, not the exact word/scroll offset. Unsubmitted in-progress MCQ/problem answers require their separate Save & Leave mechanism. Topic ID `all` represents a mixed-subject session and cannot truthfully attribute all work to a single topic. Timing estimates are conservative, not a guaranteed finish time.
- **Tests:** Chromium source-hook state tests validated archive and elapsed timing, topic A/B isolation, pending phase and bookmarks, an old-record-safe path, no learning evidence mutation, opt-out and different-mode protections, budget preserved after adaptation, and a quick session remaining one activity. Existing V2.13 realistic reading/MCQ pace, cloze, expiry/extension and viewport tests passed again. CSS-only session builder no-overlap tests passed at desktop 1365×768, iPad-size 820×1080, and phone 390×844; **not** a physical device or complete production React18 app test.

### V2.14 change record — foundation-first study and safer local data

- **Learning goal:** User wants studying, not material hoarding. `bsa214TopicStanding` estimates same-topic unseen/weak/due/3+-spaced-correct MCQ states, unreviewed lecture sections, open mistakes, checked/independent-correct attempts, unfinished saved study work and unverified teach-backs. These categories must remain separate; a user clicking Done or writing an explanation is not evidence of mastery.
- **Connected Foundation Check:** `BSA214FoundationCheck` is reached from `BSA205Study`, checked MCQs and individual lecture sections. `bsa214FoundationSources` dynamically chooses materials within the current subject/topic: previously checked wrong questions first, then relevant (especially unreviewed) lecture sections, previously checked questions and Concept Vault cards. No fixed accounting concept list; other subjects work too. **Never include an unseen answer key** in the source. Learner answers (a) why/how and (b) a changed-scenario application without notes, optionally reveals the source, saves their reflection in a separately synced per-subject `foundationChecks[]` collection marked `self-explanation-unverified`, and can ask Tutor to challenge it. A separate button opens new MCQ retrieval for a confirmed topic; if topic association is absent, no silent unrelated quiz. No automatic grade or mastery promotion, no fabricated evaluation.
- **Study plan UX:** study screen prioritizes real topic standing over mere time/checklist percent. Reflection displays only after an explicit `Finish & reflect` click; marking a block Done does not summon a stale reflection. Recent archived plans list only the five newest, with the same-topic session carry-forward explanation retained. Global mini-timer keeps a viewport-level portal singleton and now has a direct Show floating timer recovery action; on use, expands and clears stale drag coordinates. A tidy minimal Settings/Import/Quick Colors toggle replaces bulky rail utility styling.
- **MCQ timing:** `bsa213McqEstimate` initial ordinary theory estimate ≈1.35 min/question (complex multi-step/numerical ≈3.8+ min, varying with length); `bsa213McqScope` uses capped trimmed independent per-question `elapsedMs` after >=6 valid recorded samples. Measured time is planning evidence, not speed-based mastery, and long idle measurements are excluded. Short focus plans still choose one feasible activity, with conservative question count/partial-lecture estimates and no false promise of completion.
- **Storage:** `bsa214Pack`, `bsa214Unpack`, `bsa214MainGet`, `bsa214MainSet`, `bsa214BackupGet` provide optically invisible **lossless deflate** for large main study records; app bundles pako MIT license. Primary `STORE_KEY` remains the same, no data schema version bump. Storage UI now displays actual main-record size, compressed/uncompressed comparison, subject breakdown and clearer limits. Existing backups remain human-readable JSON, the existing integrity checks remain, and read failure protects raw bytes rather than replacing data. Auto-compaction is not an indefinite capacity solution. **When downgrading from V2.14 to older versions, FIRST export a verified readable complete backup in V2.14 and restore it on the older version.**
- **QA:** Node app/service-worker syntax check; headless Chromium source hooks (React16 test runtime, not a full React18 app) covered plain/deflated Unicode round-trip, SHA-ready plain backup value, backup preview, corrupted compressed startup guard, separate topic standing and contextual sources, and MCQ timing with eligible samples; no JS page errors in these isolated tests. CSS harness passed 1365×768 desktop, 820×1080 iPad-sized and 390×844 phone-sized horizontal-overflow checks for source-driven study panels. Not physical device, live deployed PWA, real GitHub merge, or actual Gemini API QA.
- **Upload:** Only `assets/app.js`, `assets/styles/polish.css`, `sw.js`; retain this single up-to-date handoff Markdown separately. Back up personal academic records before deployment; verify service-worker update and recovery with a real device.

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

- New user-facing version `V2.14` only after actual application change (not merely repackaging docs); increment scoped SW cache ID independently as needed. Keep schema version unchanged unless deliberately migrating.
- ZIP must list changed site files with exact relative paths; user additionally requests `assets/styles/polish.css` in every deployment ZIP. **Include exactly this one updated Markdown file at ZIP root.**
- Do not include tests, old release notes, image assets or internal debugging scripts unless changed/needed. Only site files should be uploaded to GitHub; this handoff may remain local if user does not want docs published on the site.
- Update hashes, source version, feature list, known issues, QA results and release history **inside this file only**. Keep the filename stable so new chats find it easily.

## 10. High-value source anchors (updated for V2.14)

Line numbers in older anchor sections may describe their original release; prefer symbol-name searches in the bundled V2.14 `assets/app.js` and the regenerated function index below.

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

## 11. Complete named function index (V2.14)

1339 identified named function/callable declarations from the current V2.14 `assets/app.js` (regular-expression index; source remains authoritative). All line numbers are from this ZIP. Search the actual source by symbol name for complete dependencies.

- `S` (L30), `bsa214Pack` (L349), `bsa214Unpack` (L359), `bsa214MainGet` (L369), `bsa214MainSet` (L370)
- `bsa214BackupGet` (L371), `uid` (L373), `pad` (L374), `today` (L375), `norm` (L379)
- `clone` (L380), `buildCfas` (L408), `buildDefault` (L426), `loadLocal` (L429), `topicName` (L448)
- `studyTopics` (L453), `itemTopic` (L454), `stdTokens` (L461), `matchTopic` (L464), `pick` (L472)
- `first` (L476), `statusFrom` (L480), `normTopic` (L489), `normCard` (L511), `normMistake` (L518)
- `normQuiz` (L531), `parseQA` (L538), `psJSONCandidates` (L553), `bsaRuleText` (L574), `bsaRuleUrl` (L575)
- `bsaRuleNormalize` (L576), `bsaParseTypedMaterial` (L588), `bsaMergeRules` (L609), `identity` (L613), `titleKey` (L614)
- `bsaRuleCollection` (L625), `bsaRuleCollections` (L636), `bsaRuleHasSource` (L645), `bsaRuleSearch` (L646), `bsaPdfDatabase` (L653)
- `bsaPdfList` (L659), `bsaPdfRemove` (L660), `bsaPdfAdd` (L661), `bsaPdfOpenFile` (L677), `PdfSourceShelf` (L682)
- `load` (L684), `add` (L686), `remove` (L687), `RulesLibrary` (L700), `emptyRule` (L702)
- `selectionToggle` (L718), `selectionAll` (L719), `selectionReset` (L720), `selectedExport` (L721), `deleteSelectedRules` (L726)
- `undoDeletedRules` (L729), `saveRuleUpdate` (L742), `openGroup` (L743), `backToLibrary` (L744), `closeRule` (L745)
- `openRule` (L746), `startEdit` (L747), `save` (L748), `saveNotes` (L755), `toggleSave` (L756)
- `markReview` (L757), `exportCollection` (L758), `parseImport` (L887), `applyPartial` (L960), `bsaRecordText` (L1027)
- `bsaMistakeMatch` (L1030), `bsaUpsertMistake` (L1039), `bsaImportIdentity` (L1064), `previewPartial` (L1070), `Modal` (L1095)
- `onKey` (L1101), `Field` (L1134), `TopicSelect` (L1137), `copyText` (L1140), `readiness` (L1160)
- `ExamPostMortem` (L1175), `set` (L1180), `pmPending` (L1214), `TopicEditor` (L1218), `CardEditor` (L1258)
- `FlipCard` (L1277), `Drill` (L1290), `answer` (L1296), `k` (L1303), `MistakeEditor` (L1320)
- `QuizEditor` (L1340), `SubjectModal` (L1355), `lsGet` (L1394), `lsSet` (L1401), `bsa26SessionGet` (L1408)
- `bsa26SessionSet` (L1409), `ghConfig` (L1410), `deviceName` (L1415), `b64encode` (L1425), `b64decode` (L1431)
- `sigOf` (L1437), `docSig` (L1438), `bsa16LectureKey` (L1442), `bsa16ActionClock` (L1443), `bsa16SetLectureAction` (L1447)
- `bsa16MergeLectureActions` (L1455), `bsa16ApplyLectureActions` (L1466), `bsa16SameChapter` (L1475), `bsa16DeleteLectureRecords` (L1479), `bsa16UndoLectureRecords` (L1488)
- `normalizeDoc` (L1506), `stampChanges` (L1542), `latestOf` (L1599), `mergeOrder` (L1605), `pickNewer` (L1622)
- `mergeList` (L1628), `mergeDocs` (L1663), `saveMeta` (L1704), `syncSnapshot` (L1708), `emit` (L1709)
- `useSync` (L1714), `useTick` (L1725), `ghRepoUrl` (L1734), `ghFileUrl` (L1735), `ghFetch` (L1736)
- `ghError` (L1749), `ghGet` (L1756), `ghPut` (L1784), `markDirty` (L1796), `runSync` (L1805)
- `startSyncLoop` (L1883), `onOnline` (L1884), `onOffline` (L1885), `onVis` (L1886), `onFocus` (L1890)
- `ago` (L1967), `fmtStamp` (L1976), `syncView` (L1977), `SyncBadge` (L1984), `docSummary` (L1995)
- `n` (L1997), `GitHubPanel` (L2002), `formCfg` (L2015), `connect` (L2027), `choose` (L2038)
- `turnOff` (L2052), `forcePull` (L2059), `forcePush` (L2066), `opt` (L2073), `packJSON` (L2324)
- `StarterPacks` (L2332), `bsaResourceDownload` (L2384), `BsaResourceHub` (L2389), `bsaImportQuality` (L2409), `duplicate` (L2414)
- `bsaTopicConnections` (L2444), `isTopic` (L2449), `DataModal` (L2460), `check` (L2472), `doImport` (L2495)
- `backup` (L2534), `parseD` (L2661), `isoOf` (L2665), `addDays` (L2666), `daysUntil` (L2671)
- `fmtDay` (L2672), `fmtTime` (L2673), `fmtMins` (L2678), `plural` (L2684), `weekNum` (L2685)
- `dueState` (L2690), `dueRel` (L2697), `DueChip` (L2703), `sessTopic` (L2709), `byTime` (L2714)
- `defaultTopic` (L2715), `SessionEditor` (L2720), `addSub` (L2726), `UpNext` (L2749), `CalendarView` (L2757)
- `setDue` (L2781), `setSession` (L2785), `move` (L2789), `pickDay` (L2793), `evColor` (L2804)
- `evPill` (L2805), `dayItem` (L2814), `doFill` (L2829), `Icon` (L2966), `ThemeDots` (L2985)
- `pageRange` (L3001), `Track` (L3006), `Ring` (L3013), `learningCapture` (L3018), `bsa20TopicResolver` (L3052)
- `resolve` (L3067), `learningEvidence` (L3077), `learningNextAction` (L3083), `bsa22SelfRatedEvidence` (L3094), `bsa22IndependentCorrect` (L3097)
- `bsaAdaptiveSignals` (L3105), `weighted` (L3122), `smartTopicStats` (L3141), `AiPracticeLab` (L3180), `run` (L3212)
- `StudyEnhancements` (L3267), `StudyFlow` (L3311), `SmartStudyPanel` (L3349), `homePreferences` (L3364), `AcademicCommandCenter` (L3365)
- `apply` (L3367), `toCards` (L3380), `loadRoutineDate` (L3417), `saveRoutineDate` (L3427), `DailyStudyPath` (L3439)
- `commit` (L3448), `stepLink` (L3453), `taskAction` (L3460), `WorkflowRibbon` (L3474), `FeatureGuide` (L3498)
- `jump` (L3502), `NewHereCard` (L3511), `HomeView` (L3520), `RoadmapView` (L3644), `toggle` (L3661)
- `setTopic` (L3674), `VaultView` (L3766), `printVaultCards` (L3778), `normalizedPair` (L3790), `duplicateIds` (L3791)
- `toggleSelected` (L3800), `leaveSelection` (L3801), `deleteSelected` (L3802), `linkedId` (L3809), `match` (L3810)
- `rate` (L3812), `MistakesView` (L3848), `mName` (L3861), `toCard` (L3865), `QuickAdd` (L3907)
- `MoreSheet` (L3918), `fmtIvl` (L3944), `shuffle` (L3945), `localPref` (L3953), `setLocalPref` (L3957)
- `upcomingExams` (L3958), `focusExam` (L3962), `fuzzIvl` (L3974), `schedule` (L3981), `forecast` (L4029)
- `fcWorst` (L4044), `smoothDay` (L4053), `ForecastPanel` (L4069), `smooth` (L4077), `bumpDay` (L4106)
- `examForTopic` (L4121), `calBump` (L4139), `calStats` (L4146), `CalibrationPanel` (L4164), `gradeCardIn` (L4187)
- `mistakeDue` (L4196), `gradeMistakeIn` (L4197), `cardIsDue` (L4207), `buildReview` (L4208), `rank` (L4211)
- `probDue` (L4239), `findProb` (L4240), `probsDue` (L4247), `gradeProbIn` (L4255), `gapCheck` (L4277)
- `flat` (L4278), `stem` (L4279), `examPressure` (L4303), `buildAll` (L4308), `AllSubjectsPanel` (L4324)
- `interleave` (L4339), `cardStrength` (L4351), `examReadiness` (L4360), `examMix` (L4377), `studyDaySet` (L4396)
- `streakOf` (L4403), `weekMinutes` (L4413), `retentionPct` (L4418), `sayOK` (L4425), `sayStop` (L4426)
- `sayClean` (L4428), `say` (L4429), `budgetQueue` (L4442), `take` (L4445), `BudgetPanel` (L4461)
- `noteAllowed` (L4474), `askNotify` (L4477), `maybeRemind` (L4485), `StudySession` (L4508), `owner` (L4520)
- `clearHf` (L4544), `next` (L4573), `write` (L4594), `gradeCard` (L4601), `pickConf` (L4621)
- `gradeMistake` (L4622), `gradeProb` (L4628), `rnd` (L4777), `peso` (L4778), `parseAmount` (L4839)
- `ComputeSet` (L4843), `nextP` (L4873), `setTimerState` (L4933), `timerElapsed` (L4938), `startTimer` (L4939)
- `startBreak` (L4944), `useTimer` (L4948), `chime` (L4958), `FocusBar` (L4975), `showTimer` (L4980)
- `hideTimer` (L4981), `beginDrag` (L4986), `moveDrag` (L4987), `keyDrag` (L4988), `endDrag` (L4989)
- `finish` (L4998), `wake` (L5059), `LeechPanel` (L5085), `unpark` (L5088), `park` (L5097)
- `cutLimit` (L5129), `attendStats` (L5133), `classOn` (L5144), `attendOn` (L5145), `ClassLife` (L5146)
- `addClass` (L5151), `setClass` (L5155), `delClass` (L5159), `markAttend` (L5163), `addTask` (L5171)
- `setTask` (L5175), `delTask` (L5179), `RoiPanel` (L5248), `ActivityStrip` (L5281), `val` (L5286)
- `playStudyFeedbackSound` (L5315), `playQuizFeedbackSound` (L5319), `note` (L5346), `v` (L5360), `transpose` (L5361)
- `mcqAssignedTopic` (L5386), `known` (L5388), `mcqDedicatedPool` (L5413), `bsa197QuizKey` (L5438), `bsa197History` (L5448)
- `bsa197Recall` (L5457), `bsa197Pool` (L5478), `bsa197Pick` (L5483), `bsa197DraftKey` (L5501), `bsa197LoadDraft` (L5502)
- `bsa18PracticeChanged` (L5509), `bsa18SavedAt` (L5512), `bsa197SaveDraft` (L5516), `bsa197DeleteDraft` (L5527), `bsa18WrittenKey` (L5530)
- `bsa18LoadWritten` (L5531), `bsa18SaveWritten` (L5537), `bsa18DeleteWritten` (L5541), `bsa18LatestPractice` (L5542), `bsa28SourceHistory` (L5559)
- `bsa28NewTopicRequest` (L5565), `bsa28ReflectionKey` (L5570), `bsa28ReadReflections` (L5571), `bsa28WriteReflections` (L5575), `bsa18ReadTutorChat` (L5581)
- `MultipleChoiceQuiz` (L5592), `writeReflection` (L5601), `start` (L5624), `resume` (L5633), `recordCheckedIn` (L5655)
- `checkAnswer` (L5675), `record` (L5686), `onQuizKey` (L5717), `leave` (L5749), `discard` (L5754)
- `MCQBankExplorer` (L5892), `MCQPage` (L5950), `bsa39Requirements` (L5971), `bsa39Mode` (L5977), `bsa39DraftKey` (L5987)
- `bsa39Load` (L5988), `bsa39Save` (L5989), `bsa39Number` (L5990), `bsa39Rows` (L5991), `bsa39RowSummary` (L5992)
- `bsa22AccountKey` (L5993), `bsa22ParseMoney` (L6003), `bsa39KeyCheck` (L6010), `normRow` (L6024), `bsa39Text` (L6042)
- `BSA39AnswerEditor` (L6049), `change` (L6051), `setRow` (L6053), `PsWrittenDrill` (L6074), `restoredOrder` (L6078)
- `randomOrder` (L6082), `persist` (L6093), `labelFor` (L6097), `existingFor` (L6098), `num` (L6106)
- `toggleRandom` (L6111), `startMistakeEditor` (L6116), `saveMistake` (L6121), `markMiss` (L6134), `markGot` (L6142)
- `changeRating` (L6147), `bsaSmartQueue` (L6227), `priority` (L6238), `bsaWeeklyEvidence` (L6249), `timestamp` (L6251)
- `collect` (L6252), `BSA29ClozePractice` (L6266), `store` (L6279), `begin` (L6280), `skip` (L6296)
- `reviewUncertain` (L6311), `saveToVault` (L6315), `askWhy` (L6326), `exactCount` (L6336), `unsureCount` (L6337)
- `PracticeView` (L6378), `startSmart` (L6392), `startReview` (L6396), `mxKey` (L6537), `mxChoiceKey` (L6541)
- `mxPool` (L6542), `ok` (L6544), `MockExam` (L6568), `right` (L6602), `answered` (L6610)
- `printExam` (L6613), `byTopic` (L6722), `hexToRgb` (L6769), `rgbToHex` (L6776), `mixHex` (L6777)
- `relLum` (L6781), `contrastOf` (L6788), `rgba` (L6792), `isHex` (L6793), `customVars` (L6819)
- `applyTheme` (L6846), `CustomThemeEditor` (L6861), `setC` (L6863), `BSA41ThemesModal` (L6906), `AppearanceModal` (L6927)
- `tile` (L6929), `ExamReadyMini` (L7022), `gcId` (L7069), `gcNum` (L7070), `gcDefaultScale` (L7079)
- `gcPart` (L7089), `gcComp` (L7090), `gcDefault` (L7091), `cs` (L7092), `gcNorm` (L7108)
- `arr` (L7110), `w` (L7111), `gcWavg` (L7147), `gcTrans` (L7156), `gcPartRaw` (L7159)
- `gcCompute` (L7172), `tr` (L7173), `gcDec` (L7185), `gcRoundPct` (L7186), `gcSorted` (L7191)
- `gcLetter` (L7192), `gcRemaining` (L7198), `gcSummary` (L7216), `share` (L7220), `gcNeed` (L7240)
- `gcFmt` (L7251), `gcPctTxt` (L7252), `gcQpiTxt` (L7253), `gcSumWeights` (L7254), `gcSemester` (L7256)
- `gcFromJSON` (L7273), `list` (L7276), `name` (L7284), `wt` (L7285), `items` (L7286)
- `gcMergeStructure` (L7321), `key` (L7325), `GC_CRC` (L7351), `gcCrc32` (L7360), `gcZip` (L7366)
- `gcXml` (L7422), `gcCol` (L7423), `gcSheetXml` (L7437), `gcSheetName` (L7454), `gcXlsx` (L7462)
- `nlmGuessKind` (L7496), `nlmContext` (L7704), `label` (L7708), `bsaPromptIsJsonPrompt` (L7783), `bsaPromptFillBrackets` (L7784)
- `bsaBuildGuidedPrompt` (L7796), `NotebookLMPrompts` (L7871), `setExtra` (L7900), `setCount` (L7901), `setField` (L7913)
- `choosePrompt` (L7925), `chooseKind` (L7926), `fieldInput` (L7927), `GC_PROMPT` (L7988), `gcGoals` (L8016)
- `gcSameLetter` (L8017), `gcRetention` (L8020), `gcScholar` (L8031), `gcStateCls` (L8048), `gcSingular` (L8049)
- `gcPctItem` (L8050), `gcTier` (L8051), `GcLetter` (L8057), `gcNeedView` (L8058), `gcWarnings` (L8065)
- `off` (L8067), `gcBlank` (L8077), `NumInput` (L8093), `show` (L8094), `gcSnap` (L8131)
- `GcTrajectory` (L8144), `x` (L8152), `y` (L8153), `GcOverview` (L8173), `pos` (L8183)
- `gcQuizLabel` (L8240), `gcPullable` (L8241), `GcPullQuizzes` (L8245), `GcPullAttendance` (L8266), `GcEditor` (L8281)
- `del` (L8283), `addItem` (L8286), `pullQuiz` (L8296), `pullAttend` (L8300), `weight` (L8335)
- `pctOf` (L8336), `GcScale` (L8428), `upper` (L8431), `GcSettings` (L8467), `GcStart` (L8492)
- `GcImportBox` (L8508), `gcListFor` (L8552), `gcRoundLabel` (L8558), `gcNum2` (L8559), `gcWorkbook` (L8560)
- `H` (L8562), `N` (L8563), `B` (L8564), `BN` (L8565), `NOTE` (L8566)
- `gcEsc` (L8627), `gcReportHtml` (L8629), `q` (L8633), `its` (L8662), `gcTextSummary` (L8675)
- `gcPrint` (L8699), `done` (L8708), `gcSaveFile` (L8723), `GcExport` (L8758), `xlsx` (L8760)
- `html` (L8761), `GcGoals` (L8771), `GcAll` (L8812), `GcWhatIf` (L8855), `GradesView` (L8915)
- `setGoals` (L8917), `setTab` (L8919), `flush` (L8928), `out` (L8950), `vis` (L8951)
- `GradeMini` (L9037), `drRound` (L9062), `drPva` (L9066), `drFva` (L9067), `drLex` (L9083)
- `drCompile` (L9102), `isOp` (L9108), `startsOperand` (L9109), `bool` (L9110), `or` (L9111)
- `and` (L9112), `cmp` (L9113), `mul` (L9129), `unary` (L9141), `power` (L9147)
- `postfix` (L9152), `primary` (L9158), `drEval` (L9196), `drFmtOf` (L9200), `drDecimals` (L9201)
- `drNiceStep` (L9202), `drVar` (L9208), `range` (L9211), `drGivenRow` (L9245), `drStep` (L9253)
- `drNorm` (L9262), `drList` (L9306), `drIsRandom` (L9307), `drSplitPh` (L9309), `drCheck` (L9314)
- `need` (L9316), `holes` (L9333), `drFmt` (L9342), `drGivenFmt` (L9351), `drFill` (L9352)
- `drDraw` (L9367), `drMake` (L9376), `drParse` (L9410), `drPool` (L9416), `drPickSet` (L9430)
- `drShort` (L9450), `drSets` (L9451), `drFromJSON` (L9462), `drLooksLike` (L9482), `drApply` (L9483)
- `bkChapter` (L9496), `bkNorm` (L9519), `bkOf` (L9530), `bkIsPages` (L9538), `bkMerge` (L9541)
- `bkInScope` (L9560), `bkTopicLabel` (L9561), `bkParseJSON` (L9565), `bkFromJSON` (L9581), `drExampleFor` (L9644)
- `bkTopicLine` (L9652), `nlmPromptFor` (L9694), `bkHasPage` (L9700), `BkPanel` (L9701), `bkPageIn` (L9718)
- `BkEditor` (L9722), `setCh` (L9729), `merge` (L9730), `addBulk` (L9735), `applyJSON` (L9744)
- `restore` (L9771), `DrPanel` (L9820), `drNum` (L9833), `drToForm` (L9837), `drFromForm` (L9855)
- `lines` (L9856), `DrSample` (L9879), `DrForm` (L9889), `DrManager` (L9904), `openEdit` (L9933)
- `closeEdit` (L9937), `saveEdit` (L9941), `importJSON` (L9961), `psRepairJSON` (L10027), `psPick` (L10045)
- `psArr` (L10056), `psS` (L10058), `psPlain` (L10077), `psList` (L10078), `psDiff` (L10084)
- `psNormProblem` (L10091), `psNormSet` (L10122), `psNormLecture` (L10147), `psLooksSet` (L10196), `psLooksLecture` (L10197)
- `psFromJSON` (L10198), `psApply` (L10229), `psCells` (L10290), `psIsSep` (L10291), `psBlocks` (L10292)
- `psMathHtml` (L10347), `braced` (L10349), `convert` (L10359), `psMathSegments` (L10403), `psInline` (L10430)
- `psNumCell` (L10451), `PsMd` (L10452), `psEsc` (L10476), `psInlineHtml` (L10477), `psMdHtml` (L10478)
- `cell` (L10486), `loadPdfProfile` (L10493), `profileEscape` (L10494), `pdfProfileMarkup` (L10495), `PersonalizationCorner` (L10500)
- `edit` (L10502), `field` (L10504), `psPrint` (L10574), `psSetText` (L10594), `lxText` (L10609)
- `psSafeProblems` (L10620), `psGroupProblems` (L10638), `psByTopic` (L10648), `psTally` (L10662), `PsBar` (L10667)
- `psSampleFits` (L10673), `psSampleIn` (L10674), `PsSampleCard` (L10675), `bsa29Clean` (L10689), `bsa29Meaningful` (L10690)
- `bsa29HasAnswer` (L10695), `bsa213ClozeQuality` (L10702), `bsa213DefinitionQuestion` (L10720), `bsa29Candidates` (L10726), `push` (L10729)
- `lxCloze` (L10773), `bsa29Pool` (L10774), `bsa29Exact` (L10788), `clean` (L10789), `bsa29DraftKey` (L10792)
- `bsa29ReadDraft` (L10793), `bsa29SaveDraft` (L10799), `lxDue` (L10810), `lxIsDue` (L10811), `lxStudied` (L10812)
- `lxDueList` (L10816), `LxDueChip` (L10819), `xrefLecture` (L10830), `LecturePracticeGenerator` (L10854), `generate` (L10860)
- `SmartScheduleBuilder` (L10920), `build` (L10924), `LxView` (L10956), `deleteLecture` (L10970), `undoLectureDelete` (L10983)
- `lxOpenLecture` (L11017), `lxBackToList` (L11026), `lectureId` (L11037), `PsEmpty` (L11062), `lxSourcePresentation` (L11067)
- `bsa13LectureHeading` (L11091), `bsaRevisionExcerpt` (L11096), `bsa41LectureHighlights` (L11107), `bsa41UpdateHighlight` (L11108), `bsa41ExportNotes` (L11110)
- `bsa41ImportNotes` (L11118), `bsa41Locate` (L11136), `bsa41DecorateHtml` (L11146), `BSA41MarkedText` (L11191), `activate` (L11193)
- `LxReader` (L11197), `seek` (L11205), `openHighlight` (L11230), `jumpHighlight` (L11241), `createHighlightCard` (L11242)
- `addCards` (L11255), `addCloze` (L11268), `LxEditor` (L11406), `toMd` (L11407), `setv` (L11410)
- `BSA43ProblemSets` (L11446), `PsView` (L11480), `PsExportCustomizer` (L11506), `chooseRange` (L11511), `exportNow` (L11527)
- `PsSetView` (L11554), `printVisible` (L11567), `mark` (L11569), `logMistake` (L11593), `toggleAll` (L11601)
- `PsProblem` (L11619), `PsProblemEditor` (L11635), `PsSetEditor` (L11661), `reset` (L11672), `psProbHint` (L11709)
- `PS_SET_SHAPE` (L11710), `gemKey` (L11803), `gemModel` (L11804), `gemReady` (L11805), `gemErr` (L11807)
- `gemNetErr` (L11820), `gemListModels` (L11826), `score` (L11838), `gemProbe` (L11853), `gemSend` (L11872)
- `cancel` (L11900), `eat` (L11905), `gemContext` (L11944), `gemSystem` (L11993), `gemFindJSON` (L12010)
- `GemSetup` (L12029), `gemSourceSystem` (L12106), `bsa210TutorCore` (L12225), `gemGeneralSystem` (L12241), `bsa26TutorName` (L12247)
- `bsa26Words` (L12284), `bsa26TopicMatch` (L12285), `bsa26TutorCapabilityContext` (L12302), `bsa26SafeAction` (L12325), `bsa26Action` (L12349)
- `bsa26LocalStudyPlan` (L12350), `gemDashboardSystem` (L12419), `bsa4ContextKey` (L12424), `bsa4ReadContext` (L12425), `bsa4SaveContext` (L12426)
- `bsa4ProblemContext` (L12427), `bsa26SafeReturn` (L12440), `bsa26ReturnFor` (L12451), `bsa26FocusExcerpt` (L12482), `bsa4TutorDraft` (L12492)
- `bsa197TutorQuizBehavior` (L12518), `bsa197TutorContext` (L12521), `BSA197TutorMemory` (L12527), `AskView` (L12557), `changeMode` (L12577)
- `changeModel` (L12581), `returnHere` (L12587), `saveTeachingPrefs` (L12596), `renameTutor` (L12597), `detachQuestion` (L12598)
- `onChatScroll` (L12610), `ask` (L12612), `clear` (L12675), `setBadge` (L12786), `holdScreen` (L12795)
- `CurriculumView` (L12814), `enroll` (L12825), `hasStudyData` (L12834), `bulkRemove` (L12836), `InkPad` (L12870)
- `saveShapes` (L12888), `undoShape` (L12897), `redoShape` (L12898), `compositeInk` (L12899), `exportInkImage` (L12907)
- `renderInkPage` (L12908), `shapeBounds` (L12909), `vectorElement` (L12910), `snapshot` (L12920), `repaint` (L12921)
- `checkpoint` (L12925), `undo` (L12926), `redo` (L12927), `coords` (L12928), `clampZoom` (L12929)
- `zoomAt` (L12930), `point` (L12947), `distance` (L12948), `midpoint` (L12949), `moveTouch` (L12961)
- `end` (L12977), `zoomButton` (L12987), `drawShape` (L12989), `clearPreview` (L12990), `previewAt` (L12991)
- `pointSegmentDistance` (L12993), `vectorHit` (L12994), `selectAt` (L13004), `eraseVectorAt` (L13006), `eraseRasterAt` (L13038)
- `down` (L13040), `up` (L13075), `duplicatePage` (L13094), `movePage` (L13095), `downloadNotebookPdfTip` (L13096)
- `exportNotebook` (L13097), `importNotebook` (L13098), `exportPng` (L13099), `print` (L13100), `ClassmatePublisher` (L13134)
- `setPermission` (L13142), `esc` (L13196), `sections` (L13197), `dashboardHtml` (L13205), `sharedSnapshot` (L13207)
- `replaceOnce` (L13250), `safeSharedHtml` (L13300), `make` (L13305), `download` (L13323), `RetentionTools` (L13358)
- `review` (L13373), `addCardsToQueue` (L13375), `addProblemsToQueue` (L13376), `addLectureChecksToQueue` (L13378), `importAttemptsToQueue` (L13379)
- `addExamMistakes` (L13380), `normalizeExam` (L13394), `examCorrect` (L13395), `printStudySheet` (L13397), `addJournal` (L13407)
- `exportRows` (L13408), `bsaBackupKeys` (L13421), `bsaValidMainRecord` (L13429), `bsaBackupPreview` (L13442), `bsaBackupDigest` (L13450)
- `bsaDownloadUnifiedBackup` (L13456), `bsaInspectUnifiedBackup` (L13475), `bsaApplyInspectedBackup` (L13508), `ToolkitView` (L13534), `chooseRestore` (L13540)
- `confirmRestore` (L13549), `worksheetNumber` (L13574), `worksheetExport` (L13580), `txNumber` (L13588), `txTotals` (L13589)
- `txInvalidAmount` (L13591), `txTrialPrint` (L13597), `txSave` (L13598), `txEdit` (L13599), `txPrintOne` (L13600)
- `txCsv` (L13601), `txImport` (L13602), `txPrint` (L13603), `newNote` (L13607), `openNote` (L13608)
- `saveNote` (L13609), `exportText` (L13610), `printArea` (L13611), `addAttempt` (L13630), `evaluate` (L13631)
- `sum` (L13632), `HowToCorner` (L13684), `readProgress` (L13718), `progressTotal` (L13719), `progressRank` (L13720)
- `grantFocusXp` (L13721), `grantActivityXp` (L13735), `grantFlashcardReviewXp` (L13749), `bsaAchievementDetails` (L13755), `AcademicProgress` (L13776)
- `Game2048` (L13798), `fresh` (L13799), `SudokuGame` (L13816), `restart` (L13823), `verify` (L13824)
- `MinesweeperGame` (L13828), `around` (L13832), `reveal` (L13835), `joyDefault` (L13841), `readJoy` (L13842)
- `useJoy` (L13843), `joyDay` (L13848), `lifePetStatus` (L13864), `StudyLifeHomeWidget` (L13869), `lifeDefault` (L13897)
- `readLife` (L13898), `lifeEarned` (L13899), `PixelScholar` (L13907), `LifeTownMap` (L13932), `step` (L13936)
- `activeSeason` (L13950), `StudyLife` (L13952), `count` (L13958), `position` (L13963), `changeAvatar` (L13964)
- `JoyHub` (L13997), `SnakeGame` (L14030), `WordGuessGame` (L14049), `submit` (L14052), `NonogramGame` (L14062)
- `clues` (L14065), `BubblePopGame` (L14069), `click` (L14072), `BreakCorner` (L14083), `resetGame` (L14092)
- `turn` (L14096), `StudyTimeAudit` (L14111), `bsaReadinessReport` (L14131), `BsaReadinessCoach` (L14160), `bsaV164ReadExamPrefs` (L14207)
- `bsaV164ExamPriority` (L14211), `BsaExamPlanner` (L14223), `BsaMistakePatterns` (L14251), `BsaRecommendationCheck` (L14271), `BsaTopicMasteryPanel` (L14290)
- `StudyReport` (L14309), `roll` (L14314), `fmt` (L14330), `pct` (L14331), `reasons` (L14332)
- `action` (L14333), `doReset` (L14334), `metric` (L14340), `bsaBytes` (L14390), `bsaBase64` (L14391)
- `bsaVaultKey` (L14392), `bsaVaultEncrypt` (L14396), `bsaVaultDecrypt` (L14403), `bsaDeviceKeyGet` (L14415), `fetch` (L14423)
- `bsaDeviceVaultEncrypt` (L14441), `bsaDeviceVaultDecrypt` (L14447), `PrivateVault` (L14457), `copy` (L14498), `bsa181Empty` (L14546)
- `bsa181Read` (L14547), `bsa181Write` (L14548), `bsa181Text` (L14549), `bsa181Add` (L14550), `bsa181Remove` (L14551)
- `bsa181Restore` (L14552), `bsa181Recent` (L14553), `bsa181Links` (L14554), `BSA181Workspace` (L14555), `notify` (L14567)
- `saveCapture` (L14568), `saveScratch` (L14569), `shown` (L14572), `BSA181Spotlight` (L14587), `bsa27SelectionFocus` (L14596)
- `bsa27DefaultTutorQuestion` (L14612), `BSA181HighlightTool` (L14618), `dismissSelection` (L14623), `saveSelection` (L14624), `touchSchedule` (L14655)
- `onOutside` (L14659), `StartupDataRecovery` (L14703), `exportRaw` (L14705), `bsaNextKey` (L14735), `bsaNextRead` (L14736)
- `bsaNextSave` (L14737), `bsa185Default` (L14739), `bsa185Read` (L14740), `BSA185LayoutEditor` (L14744), `bsa25PracticeHealth` (L14756)
- `BSA193DeviceSafety` (L14792), `bsa187Blank` (L14860), `bsa187Account` (L14861), `bsa187Number` (L14873), `bsa187Verify` (L14874)
- `normalized` (L14877), `bsa198Text` (L14894), `bsa198Fingerprint` (L14895), `bsa198Near` (L14896), `amounts` (L14899)
- `bsa198Validate` (L14905), `bsa198StoredKeyValid` (L14929), `bsa198Catalog` (L14941), `bsa198PlanBatch` (L14954), `bsa198Parse` (L14980)
- `bsa198DeclaredSubject` (L14990), `bsa198StorePlan` (L14994), `bsa198AttemptKey` (L15011), `BSA187AccountingLab` (L15012), `legacy` (L15022)
- `stats` (L15026), `importLegacy` (L15046), `checkImport` (L15051), `applyImport` (L15053), `saveManual` (L15062)
- `duplicateCount` (L15073), `searchLists` (L15074), `bsa188Tasks` (L15170), `bsa196BudgetTasks` (L15189), `BSA188Today` (L15193)
- `checked` (L15200), `importOld` (L15209), `BSA189Companion` (L15230), `motionChange` (L15241), `BSA191WeeklyPlanner` (L15251)
- `changeSession` (L15261), `BSA344Schedule` (L15278), `bsa15Clean` (L15295), `bsa15Excerpt` (L15299), `bsa15LectureList` (L15304)
- `bsa15SectionList` (L15307), `bsa15Process` (L15310), `bsa15ComparisonTable` (L15320), `split` (L15325), `bsa15Timeline` (L15336)
- `bsa15ProblemBlocks` (L15367), `BSA15VisualStudio` (L15375), `onMapPointerDown` (L15405), `onMapPointerMove` (L15410), `onMapPointerEnd` (L15423)
- `onMapClickCapture` (L15430), `panMap` (L15435), `centerSelectedMap` (L15463), `openSection` (L15469), `BSA192KnowledgeMap` (L15550)
- `DashboardV2Home` (L15555), `layoutOrder` (L15559), `layoutVisible` (L15560), `updateLayout` (L15561), `card` (L15590)
- `bsa205Money` (L15638), `bsa205Date` (L15639), `bsa205Short` (L15640), `bsa205DriveId` (L15643), `bsa205LoadScript` (L15650)
- `BSA205Sources` (L15653), `addSource` (L15661), `mb` (L15668), `bsa205FamilyKey` (L15683), `bsa3TopicLabel` (L15686)
- `bsa205LibraryItems` (L15691), `safe` (L15692), `bsa3GroupRows` (L15702), `bsa38GroupOriginalSets` (L15706), `bsa205Duplicates` (L15714)
- `bsa205InboxKey` (L15720), `bsa205InboxPlan` (L15721), `bsa205FileBase64` (L15727), `bsa205ExtractPdfText` (L15728), `bsa205GemDraft` (L15739)
- `BSA205Importer` (L15754), `addInbox` (L15764), `importVerified` (L15768), `bsa44Key` (L15798), `bsa49TopicParts` (L15804)
- `normalize` (L15808), `bsa49ResolveTopic` (L15812), `bsa49CanonicalizePack` (L15838), `canonical` (L15840), `attach` (L15842)
- `bsa49UnmatchedLabels` (L15849), `BSA49TopicLinks` (L15858), `bsa49SubjectWords` (L15867), `bsa49MatchesSubject` (L15868), `strip` (L15875)
- `bsa49PackPrompt` (L15879), `bsa13CheckGeneratedJSON` (L15898), `required` (L15902), `bsa44Empty` (L15947), `bsa44ParseOne` (L15948)
- `bsa44Baseline` (L15981), `bsa210Tokens` (L16006), `bsa210Intent` (L16015), `bsa210Concept` (L16025), `bsa210Numbers` (L16037)
- `bsa210DuplicateSignal` (L16043), `polarity` (L16048), `bsa210AnswerMeaning` (L16069), `bsa210MaterialPair` (L16079), `bsa44Similar` (L16089)
- `bsa44Prepare` (L16090), `flag` (L16095), `acceptSets` (L16151), `bsa44Plan` (L16177), `bsa44ApplyPack` (L16190)
- `bsa47ExpectedMaterials` (L16222), `bsa47HasMaterial` (L16227), `bsa47TopicGapPrompt` (L16228), `BSA49SmartFlow` (L16251), `BSA45ImportCenter` (L16283)
- `copyGap` (L16293), `BSA44PackImporter` (L16312), `selectFiles` (L16315), `readPieces` (L16322), `bsa44TopicCounters` (L16367)
- `place` (L16371), `BSA44TopicHealth` (L16379), `expected` (L16383), `has` (L16384), `bsa45SafeLibrarySubject` (L16405)
- `a` (L16406), `sets` (L16407), `BSA205Library` (L16410), `updateProblemTopic` (L16442), `bulkMove` (L16449)
- `toggleHide` (L16462), `addNote` (L16463), `updateInbox` (L16467), `startImport` (L16468), `openPack` (L16469)
- `bsa205Diagnose` (L16543), `bsa43Text` (L16635), `bsa43Number` (L16636), `bsa43ParseReport` (L16644), `bsa43Money` (L16698)
- `bsa46Figure` (L16700), `bsa46ReportYear` (L16701), `bsa46StatementKind` (L16702), `bsa46CrossChecks` (L16708), `amount` (L16711)
- `BSA46Statement` (L16724), `BSA46Checks` (L16748), `bsa43Tasks` (L16754), `relevant` (L16757), `bsa26FsDraftKey` (L16785)
- `bsa26FsDraft` (L16788), `BSA43FinancialStatements` (L16795), `inspect` (L16807), `readFile` (L16808), `openPdf` (L16810)
- `learnStandard` (L16827), `saveAttempt` (L16830), `openTutor` (L16837), `bsa205CycleValidate` (L16939), `bsa205Ledger` (L16951)
- `bsa205CycleReports` (L16955), `BSA205Cycle` (L16968), `saveReports` (L16979), `changeLedger` (L16980), `checkLedger` (L16987)
- `checkStatements` (L16988), `newRun` (L16992), `draftSave` (L16997), `loadCase` (L16998), `select` (L17004)
- `bsa34FocusChoices` (L17047), `bsa34TopicMatch` (L17057), `bsa34TopicTitle` (L17063), `bsa34PlanBlocks` (L17064), `bsa211HasTimer` (L17096)
- `bsa211ElapsedMs` (L17097), `bsa211Clock` (L17103), `bsa212Allocate` (L17116), `bsa213Words` (L17130), `bsa213ReadScope` (L17135)
- `bsa213McqEstimate` (L17168), `bsa213McqScope` (L17174), `bsa213WrittenMinutes` (L17189), `bsa213ScopeExplanation` (L17195), `bsa213ScopeLongBlock` (L17202)
- `bsa213QuickPlan` (L17241), `bsa212ModePlan` (L17302), `find` (L17305), `bsa212ModeName` (L17333), `bsa212Guided` (L17334)
- `bsa212PhaseIndex` (L17335), `bsa212PhaseElapsed` (L17336), `bsa212PhaseGoal` (L17339), `bsa212Freeze` (L17340), `bsa212Action` (L17348)
- `bsa214RecentClosed` (L17385), `bsa214Archive` (L17395), `bsa214HistoryLabel` (L17432), `bsa214AdaptProposal` (L17445), `bsa205SessionBlocks` (L17477)
- `bsa34BlockEvidence` (L17480), `matches` (L17485), `bsa214TopicStanding` (L17499), `bsa214FoundationSources` (L17515), `BSA214FoundationCheck` (L17557)
- `BSA205Study` (L17597), `create` (L17610), `enableGuided` (L17618), `bsa211TimerAction` (L17631), `archive` (L17643)
- `saveReflection` (L17660), `BSA212FloatingFocus` (L17763), `constrain` (L17780), `keyboard` (L17784), `bsa34LearningSnapshot` (L17827)
- `BSA205Mastery` (L17847), `get` (L17854), `bsa38Calc` (L17894), `mult` (L17904), `bsa38ValidateTemplate` (L17908)
- `bsa38ParseImport` (L17924), `bsa38Generate` (L17925), `bsa38Work` (L17930), `bsa38SaveWork` (L17931), `bsa38Day` (L17932)
- `bsa38AddDays` (L17933), `BSA38Variations` (L17934), `preview` (L17943), `BSA38Oral` (L17965), `speak` (L17970)
- `BSA38MasteryCheckpoint` (L17979), `BSA38PracticeStudio` (L17986), `BSA38ExamCatchup` (L17992), `bsa38SuggestTopic` (L18016), `tokens` (L18019)
- `BSA38LibraryTriage` (L18023), `copyPrompt` (L18028), `previewAI` (L18031), `applyAI` (L18035), `BSA38ProgressCompare` (L18050)
- `stat` (L18053), `bsa33Journey` (L18067), `bsa33RouteName` (L18080), `BSA31StudyPath` (L18081), `bsa32ManilaDay` (L18137)
- `bsa32DailyLine` (L18146), `BSA3Today` (L18152), `tick` (L18156), `BSA3Practice` (L18213), `bsa46SuggestedProfile` (L18265)
- `bsa46ProfileId` (L18275), `bsa46Profile` (L18276), `bsa46ToolVisible` (L18277), `bsa46TutorGuidance` (L18286), `bsa46ImportGuidance` (L18291)
- `BSA45SidebarEditor` (L18292), `toolItem` (L18302), `BSA3StartGuide` (L18348), `DashboardV205Home` (L18362), `BSA4StudyDock` (L18401)
- `setDockHidden` (L18404), `bounds` (L18409), `startDock` (L18419), `moveDock` (L18426), `endDock` (L18429)
- `BSA43ThemeNavigation` (L18510), `bsa13IconName` (L18553), `BSA13IconPicker` (L18561), `bsa13MaterialCounts` (L18578), `BSA11SubjectSwitcher` (L18590)
- `labelOf` (L18597), `setPosition` (L18598), `resize` (L18609), `escape` (L18610), `BSA12Subjects` (L18648)
- `parseTerm` (L18660), `codes` (L18669), `sort` (L18670), `year` (L18672), `updateCourse` (L18684)
- `toggleLayout` (L18689), `removeCourse` (L18690), `archiveCourse` (L18702), `subjectCard` (L18708), `App` (L18756)
- `repair` (L18767), `onReturn` (L18776), `outside` (L18786), `touchNavStart` (L18793), `touchNavEnd` (L18794)
- `wheel` (L18814), `toggleRail` (L18828), `toggleUtilities` (L18836), `saveSidebar` (L18837), `toggleSidebarPin` (L18838)
- `toggleSidebarHide` (L18839), `shiftSidebarPin` (L18840), `doUndo` (L18867), `setSubjectProfile` (L18892), `setSubjectTool` (L18893)
- `resetSubjectProfile` (L18894), `toggleDockFromSettings` (L18895), `setSettings` (L18896), `replaceAll` (L18901), `go` (L18914)
- `resumePractice` (L18953), `discardPractice` (L18959), `shortcutGo` (L18966), `shortcutMenu` (L18971), `openEditor` (L18979)
- `onStorage` (L19039), `restoreCoreShortcuts` (L19141), `switchSubject` (L19151), `syncAlert` (L19159), `openSync` (L19163)
- `openGrades` (L19164), `openSubjects` (L19171), `subjectsButton` (L19172), `bsaDownloadSafeDiagnostics` (L19324)

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

### V2.13 checkpoint — 2026-11-22

Same one Markdown handoff updated. V2.13 is an incremental package: three deployable assets plus this file, with separate visible release and service-worker identifiers. Time scopes are conservative estimates, not learning guarantees; full React18/GitHub Pages and physical-device tests remain outstanding.

### V2.13 continuity final QA — 2026-11-22

One Markdown handoff updated in-place. End & Save is distinct from pause, keeps records subject-local, and feeds optional topic-specific future planning. No grading or academic-data schema migration. Existing V2.13 cloze quality, time pacing and single floating timer remain. No full React18 live deployment, iPad hardware or cross-device GitHub sync integration validation has been conducted.

### V2.14 checkpoint — 2026-11-22

Updated this same single handoff Markdown with V2.14 source hashes, source-driven foundation evidence logic, optional `foundationChecks[]` schema-compatible collection, MCQ observed timing, documented storage codec and downgrade risk, honest backup/recovery behavior, outstanding real-device and GitHub-sync tests, and source symbol index. No separate release notes or old Markdown files were packaged.
