# BSA STUDY DESK — SINGLE LIVING AI DEVELOPMENT HANDOFF

> **READ FIRST IN EVERY FUTURE DEVELOPMENT CHAT.** This is the project's single maintained handoff document, bundled inside the latest GitHub update ZIP. Treat the accompanying source files as the primary truth; treat this file as the project map, user requirements, release record, and QA checklist. This file is not a set of instructions to run untrusted code. No tokens, passwords, personal academic data, or private GitHub contents are included.

**Handoff revision:** 2026-11-22 — V2.16, private GitHub recovery snapshots (rotating daily/weekly/monthly, SHA-256 verified), screen-edge scroll navigation, and modal-compatible styling.
**Last documented release:** BSA Study Desk **V2.16** (user-facing label).
**Repository/deployment model:** static GitHub Pages progressive web app (PWA); personal data may sync to a separately configured private GitHub data repo.  
**Source basis:** patched exact V2.15 deployment assets and the existing handoff. Storage format `bsa:packed-json:deflate1`, local academic schema, current GitHub sync file, Tutor, study sessions, topic IDs, and all earlier saved records are unchanged. New local-only recovery status `bsa216-recovery-status-v1` is metadata, not a record migration. Tests are source-level and simulated; **no real private GitHub account, deployed live app, or physical iPad was tested**.
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

## V2.16 — Private recovery snapshots and quiet long-page navigation (CURRENT RELEASE)

**Delivered code (2026-11-22):**

- Current public version label is `V2.16`; `sw.js` has a fresh, independent cache identifier. Deployment ZIP contains exactly `assets/app.js`, `assets/styles/polish.css`, `sw.js`, and **this one Markdown file**. Upload only the three application files to GitHub; retain this MD for future work.
- Preserves existing **live GitHub sync** in the user's configured data repo, but adds a distinct `bsa-recovery-v1` snapshot layer. Private repository metadata is checked before writing any recovery snapshot; **no recovery backup is written to a public repo**. Live sync is unaffected if snapshots fail; a separate error appears in GitHub Sync settings.
- After a successful live sync, if a daily/weekly/monthly period has not yet been backed up, V2.16 creates **bounded rotating recovery files** in a `recovery/` subfolder beside the configured `data.json`: `daily-0..6.json`, `weekly-0..4.json`, `monthly-0..11.json`. Each period slot is reused, and normal Git commits preserve prior revisions while history remains available. Snapshots are verified by reading back their contents and checking the SHA-256 digest. Automatic period detection uses UTC to remain stable across devices. A one-hour retry backoff applies on backup errors; manual creation overrides the backoff.
- Recovery format wraps the already existing `bsa-unified-study-backup` bundle. It includes the validated main academic data plus eligible local study keys (e.g. XP and drafts) from the device that wrote the snapshot. The existing backup whitelist excludes **API keys, GitHub tokens, credentials, private vault entries and restricted keys**. Main document settings are omitted from recovery bundles using the same privacy boundary as the preexisting Complete Backup. **PDF file blobs are not included.** Device-specific extras may differ between devices, and the archive is not a live merge of their local-only records.
- GitHub Sync panel (Import / Export → GitHub Sync) now provides **Automatic recovery snapshots**, last verified status / error, `View recovery points`, and `Create verified backup now`. Recovery downloads use a validated **complete-backup JSON** compatible with the existing Unified Backup restore mechanism; there is deliberately **no silent/automatic overwrite from recovery**. A SHA mismatch appears as a damaged snapshot and cannot be downloaded by that control.
- **Do not claim GitHub has actually backed up user records** unless the user opens the new panel and sees a verified successful timestamp for their own private repo. Backups depend on an already configured private GitHub data repo, internet, token permissions, GitHub quotas and available space. A public repository prevents new recovery snapshots; the existing sync may still function (with the previous public-repo warning).
- Removed the Lecture reader's old `.bsa27-lecture-quicknav` buttons near the footer. A single `BSA216ScrollRail` overlays the **right screen edge around mid-viewport**, not the lecture bottom; it appears only on long scrollers, works in Lectures and other lengthy dashboard screens (including nested Tutor history where applicable), supports top/bottom jumps and reduced-motion, and avoids the default floating focus timer. Position adjusts to the timer after a drag release; rail is suppressed under dialogs and print. CSS applies to the body-level portal `#bsa216-scroll-layer` to avoid transformed-parent positioning bugs.
- This release intentionally **does not migrate from compressed localStorage to IndexedDB**. Current storage remains finite and browser/site data can still be cleared. Automatic recovery plus Git history helps with long-term continuity, but a future tested storage migration is still desirable for very large collections. Do not claim backup restores PDF shelf, encrypted keys, or all device-local state automatically.

**Verification performed:** `node --check` both JS files; isolated simulated private GitHub REST operations checked initial 3 snapshots, no extra writes during the same period, manual overwrite, Unicode/XP preservation, SHA-256 verification, public-repo refusal, unexpected-file protection and tamper detection; existing V2.15 importer/topic linking, V2.14 foundation/source isolation/codec tests passed; static browser layout checks of right-edge controls and backup UI at desktop/iPad/phone viewport sizes. **No physical iPad, actual GitHub write, full React18 page mount, service-worker live update, or integrated cross-device restore.** Present that limitation clearly.

**Files and storage:** New code is in `assets/app.js` around `bsa216MaybeSnapshot`, `bsa216CollectBackup`, `bsa216VerifySnapshot`, `bsa216ListSnapshots`, `GitHubPanel`, and `BSA216ScrollRail`; CSS at end of `assets/styles/polish.css`; `sw.js` cache ID updated independently. New metadata key `bsa216-recovery-status-v1` stores only local backup status and schedule, never academic source records.

---

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

**Release package:** `dashboard-V2.15-GitHub-update.zip` contains exactly three deployment assets and this one living Markdown handoff. Only the three runtime files are for GitHub upload.

| Relative path | Bytes | SHA-256 |
|---|---:|---|
| `assets/app.js` | 2,090,128 | `6e6e606b724fe7a0e70358a67ef1f732029836d851546b823d4a6bf4260dab69` |
| `assets/styles/polish.css` | 431,598 | `2920afa2d42b9e9798f6204b0ef5eeb13429e1c557b9b7f7cb0686d24733d5a4` |
| `sw.js` | 5,465 | `8ab3f400057c47e2f4fdf4582ebfb3ea7a49c45425a9a04224990bce73186c24` |

- `assets/app.js`: the large, essentially monolithic React application (plain JS/`React.createElement`; React 18 UMD), including many feature modules and past migration safeguards. User-facing label from `BSA_RELEASE_LABEL`: `V2.15`.
- `assets/styles/polish.css`: layered visual overrides and feature-specific styles. High override density; avoid blindly appending another `!important` rule. Trace the cascade and viewport sizes.
- `sw.js`: service worker; now uses an independent V2.15 asset-cache identifier (`asset-update-20261122-v215-topic-alias-batch-r01`). Scoped caches protect parallel deployed sites; essential assets must load successfully before a new offline version activates. Network-first navigation, cache-first core/CDN, stale-while-revalidate secondary assets, and live (uncached) Gemini/GitHub API traffic. Cache key changes are independent of displayed version.
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
| **V2.15** | Existing Chapter 16 links clarified as saved aliases, not missing materials; importer no longer truncates `Chapter 16` to `Chapter `; source-driven unique-chapter matching only when the roadmap provides an unambiguous compatible chapter; batch-link unmatched labels and batch-move/unlink saved ones with confirmation and chapter-conflict guard; importer preview warns about new unresolved topic labels, while keeping original content/IDs intact; prompt supplies exact existing roadmap titles/codes to reduce future splits. |

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

| Issue / idea | Current status at V2.15 | Safe next step |
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
| Matching every chapter alias without a human | V2.15 now respects unique numbered chapters, confirmed aliases, and safe title overlap; descriptive variants from different editions and overlapping chapter numbers may still be unresolved. Existing saved aliases shown with an arrow are already connected. | User reviews flagged new labels under Study Library → Topic coverage, bulk-links only labels with verified same-chapter identity, and does not guess across editions. |
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

### V2.15 change record — safer topic linking and reconciliation

- **Why this update was requested:** Screenshot of Study Library → topic coverage displayed `Chapter 16 → Foreign Exchange Derivative Markets` alongside other alternate labels. Those were **already-linked subject-local aliases**, not unlinked materials. Inventory `1 / 4` is the number of roadmap topics with every selected material type present, **not** a linked-topic percentage. AI files can name the same chapter `Chapter 16`, `Ch. 16`, or a descriptive title/page variant; the application cannot infer different-source edition equivalence without evidence.
- **Root cause repaired:** `normTopic` previously truncated the topic `code` field to eight characters. Example `Chapter 16` became `Chapter `, losing the number. It now preserves up to 64 characters. This protects **new imports**; old truncated codes are not silently rewritten because the missing number cannot be reliably inferred. IDs, attempts and source records are never migrated or renamed by this change.
- **Safe automatic matching:** `bsa49ResolveTopic` retains exact ID/code, confirmed subject-local aliases and exact title matches. New `bsa215UniqueChapterMatch` recognizes a bare Chapter 16 / Ch.16 **only when exactly one saved roadmap topic explicitly declares chapter 16**. Descriptive variants also require at least two meaningful matching title words; chapter-number collisions and contradictory descriptions remain unresolved. An explicitly user-confirmed alias may resolve a duplicated chapter number as selected by the user. Page numbers and textbook title similarity alone are insufficient evidence. `bsa215LinkSafety` blocks manual batch links from a declared Chapter 16 to a declared Chapter 15. No hidden automatic merges.
- **Bulk alias manager:** `BSA49TopicLinks` now has searchable/paged unmatched labels, checkbox Select shown / Clear, one bulk destination dropdown / Link selected, optional per-row target selection, and a separately collapsible **Already connected** list with checkbox Select shown / Move selected / Unlink selected. Multiple changes require confirmation; unlink also requires confirmation and never deletes materials. Subject-scoped mapping remains `topicAliases[]` (same schema and normalization). Saved links appear collapsed by default instead of monopolizing the page. A batch destination without chapter metadata requires deliberate user selection; ambiguity is not silently resolved.
- **Future imports:** `bsa49CanonicalizePack` reuses newly recognizable matching titles/codes; `bsa49PackPrompt` includes the current roadmap's exact saved titles/codes. The bulk topic-pack **Preview** reports newly unmatched material labels after simulating the import, before saving. It does NOT claim to guarantee perfect identity across textbooks/editions, so unresolvable labels remain for review and do not automatically merge unrelated chapters.
- **No academic-data migration:** localStorage key, schema `version:1`, older manually confirmed aliases, imported objects, IDs, recorded attempts, grades, lecture texts, foundation checks, timers and compressed storage bytes unchanged by installing the app. User must back up a readable JSON export before deployment. Old V2.14 app code may not recognize new long chapter codes correctly when reading newer imported material; normal backup is reversible.
- **Tests:** `node --check` app and SW; Chromium source functions showed Chapter 16, Ch.16, and compatible descriptive headings correctly matching one roadmap topic; contradictory Chapter 16 title, wrong chapter and duplicate chapter candidates stay unresolved; confirmed alias still resolves. Batch Link and Unlink controls passed isolated UI interaction tests using local React16 hook shim; topic-pack import simulation preserved full `Chapter 16` code and canonicalized known chapter, while flagging unknown Chapter 24. Browser-simulated screens at 1365, 820 and 390 pixels showed no horizontal overflow. V2.14 regression scripts for Foundation Checks/standing, session continuity, short pacing, backup codec and startup guards passed again. **NOT** a complete live React18 app, physical device, deployed PWA, or GitHub sync test.
- **Packaging:** three deployment files (`assets/app.js`, `assets/styles/polish.css`, `sw.js`) plus this sole Markdown handoff. New independent SW cache identifier `asset-update-20261122-v215-topic-alias-batch-r01`, displayed release `V2.15`, persistent data version unchanged.

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

- New user-facing version `V2.15` only after actual application change (not merely repackaging docs); increment scoped SW cache ID independently as needed. Keep schema version unchanged unless deliberately migrating.
- ZIP must list changed site files with exact relative paths; user additionally requests `assets/styles/polish.css` in every deployment ZIP. **Include exactly this one updated Markdown file at ZIP root.**
- Do not include tests, old release notes, image assets or internal debugging scripts unless changed/needed. Only site files should be uploaded to GitHub; this handoff may remain local if user does not want docs published on the site.
- Update hashes, source version, feature list, known issues, QA results and release history **inside this file only**. Keep the filename stable so new chats find it easily.

## 10. High-value source anchors (updated for V2.15)

Line numbers in older anchor sections may describe their original release; prefer symbol-name searches in the bundled V2.15 `assets/app.js` and the regenerated function index below.

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

## 11. Complete named function index (V2.15)

1348 named function/callable declarations identified in the current V2.15 `assets/app.js` (regular-expression index; actual code authoritative). These line numbers come from the current ZIP, not an older release.

- `S` (L30), `bsa214Pack` (L349), `bsa214Unpack` (L359), `bsa214MainGet` (L369), `bsa214MainSet` (L370)
- `bsa214BackupGet` (L371), `uid` (L373), `pad` (L374), `today` (L375), `norm` (L379)
- `clone` (L380), `buildCfas` (L408), `buildDefault` (L426), `loadLocal` (L429), `topicName` (L448)
- `studyTopics` (L453), `itemTopic` (L454), `stdTokens` (L461), `matchTopic` (L464), `pick` (L472)
- `first` (L476), `statusFrom` (L480), `normTopic` (L489), `normCard` (L512), `normMistake` (L519)
- `normQuiz` (L532), `parseQA` (L539), `psJSONCandidates` (L554), `bsaRuleText` (L575), `bsaRuleUrl` (L576)
- `bsaRuleNormalize` (L577), `bsaParseTypedMaterial` (L589), `bsaMergeRules` (L610), `identity` (L614), `titleKey` (L615)
- `bsaRuleCollection` (L626), `bsaRuleCollections` (L637), `bsaRuleHasSource` (L646), `bsaRuleSearch` (L647), `bsaPdfDatabase` (L654)
- `bsaPdfList` (L660), `bsaPdfRemove` (L661), `bsaPdfAdd` (L662), `bsaPdfOpenFile` (L678), `PdfSourceShelf` (L683)
- `load` (L685), `add` (L687), `remove` (L688), `RulesLibrary` (L701), `emptyRule` (L703)
- `selectionToggle` (L719), `selectionAll` (L720), `selectionReset` (L721), `selectedExport` (L722), `deleteSelectedRules` (L727)
- `undoDeletedRules` (L730), `saveRuleUpdate` (L743), `openGroup` (L744), `backToLibrary` (L745), `closeRule` (L746)
- `openRule` (L747), `startEdit` (L748), `save` (L749), `saveNotes` (L756), `toggleSave` (L757)
- `markReview` (L758), `exportCollection` (L759), `parseImport` (L888), `applyPartial` (L961), `bsaRecordText` (L1028)
- `bsaMistakeMatch` (L1031), `bsaUpsertMistake` (L1040), `bsaImportIdentity` (L1065), `previewPartial` (L1071), `Modal` (L1096)
- `onKey` (L1102), `Field` (L1135), `TopicSelect` (L1138), `copyText` (L1141), `readiness` (L1161)
- `ExamPostMortem` (L1176), `set` (L1181), `pmPending` (L1215), `TopicEditor` (L1219), `CardEditor` (L1259)
- `FlipCard` (L1278), `Drill` (L1291), `answer` (L1297), `k` (L1304), `MistakeEditor` (L1321)
- `QuizEditor` (L1341), `SubjectModal` (L1356), `lsGet` (L1395), `lsSet` (L1402), `bsa26SessionGet` (L1409)
- `bsa26SessionSet` (L1410), `ghConfig` (L1411), `deviceName` (L1416), `b64encode` (L1426), `b64decode` (L1432)
- `sigOf` (L1438), `docSig` (L1439), `bsa16LectureKey` (L1443), `bsa16ActionClock` (L1444), `bsa16SetLectureAction` (L1448)
- `bsa16MergeLectureActions` (L1456), `bsa16ApplyLectureActions` (L1467), `bsa16SameChapter` (L1476), `bsa16DeleteLectureRecords` (L1480), `bsa16UndoLectureRecords` (L1489)
- `normalizeDoc` (L1507), `stampChanges` (L1543), `latestOf` (L1600), `mergeOrder` (L1606), `pickNewer` (L1623)
- `mergeList` (L1629), `mergeDocs` (L1664), `saveMeta` (L1705), `syncSnapshot` (L1709), `emit` (L1710)
- `useSync` (L1715), `useTick` (L1726), `ghRepoUrl` (L1735), `ghFileUrl` (L1736), `ghFetch` (L1737)
- `ghError` (L1750), `ghGet` (L1757), `ghPut` (L1785), `markDirty` (L1797), `runSync` (L1806)
- `startSyncLoop` (L1884), `onOnline` (L1885), `onOffline` (L1886), `onVis` (L1887), `onFocus` (L1891)
- `ago` (L1968), `fmtStamp` (L1977), `syncView` (L1978), `SyncBadge` (L1985), `docSummary` (L1996)
- `n` (L1998), `GitHubPanel` (L2003), `formCfg` (L2016), `connect` (L2028), `choose` (L2039)
- `turnOff` (L2053), `forcePull` (L2060), `forcePush` (L2067), `opt` (L2074), `packJSON` (L2325)
- `StarterPacks` (L2333), `bsaResourceDownload` (L2385), `BsaResourceHub` (L2390), `bsaImportQuality` (L2410), `duplicate` (L2415)
- `bsaTopicConnections` (L2445), `isTopic` (L2450), `DataModal` (L2461), `check` (L2473), `doImport` (L2496)
- `backup` (L2535), `parseD` (L2662), `isoOf` (L2666), `addDays` (L2667), `daysUntil` (L2672)
- `fmtDay` (L2673), `fmtTime` (L2674), `fmtMins` (L2679), `plural` (L2685), `weekNum` (L2686)
- `dueState` (L2691), `dueRel` (L2698), `DueChip` (L2704), `sessTopic` (L2710), `byTime` (L2715)
- `defaultTopic` (L2716), `SessionEditor` (L2721), `addSub` (L2727), `UpNext` (L2750), `CalendarView` (L2758)
- `setDue` (L2782), `setSession` (L2786), `move` (L2790), `pickDay` (L2794), `evColor` (L2805)
- `evPill` (L2806), `dayItem` (L2815), `doFill` (L2830), `Icon` (L2967), `ThemeDots` (L2986)
- `pageRange` (L3002), `Track` (L3007), `Ring` (L3014), `learningCapture` (L3019), `bsa20TopicResolver` (L3053)
- `resolve` (L3068), `learningEvidence` (L3078), `learningNextAction` (L3084), `bsa22SelfRatedEvidence` (L3095), `bsa22IndependentCorrect` (L3098)
- `bsaAdaptiveSignals` (L3106), `weighted` (L3123), `smartTopicStats` (L3142), `AiPracticeLab` (L3181), `run` (L3213)
- `StudyEnhancements` (L3268), `StudyFlow` (L3312), `SmartStudyPanel` (L3350), `homePreferences` (L3365), `AcademicCommandCenter` (L3366)
- `apply` (L3368), `toCards` (L3381), `loadRoutineDate` (L3418), `saveRoutineDate` (L3428), `DailyStudyPath` (L3440)
- `commit` (L3449), `stepLink` (L3454), `taskAction` (L3461), `WorkflowRibbon` (L3475), `FeatureGuide` (L3499)
- `jump` (L3503), `NewHereCard` (L3512), `HomeView` (L3521), `RoadmapView` (L3645), `toggle` (L3662)
- `setTopic` (L3675), `VaultView` (L3767), `printVaultCards` (L3779), `normalizedPair` (L3791), `duplicateIds` (L3792)
- `toggleSelected` (L3801), `leaveSelection` (L3802), `deleteSelected` (L3803), `linkedId` (L3810), `match` (L3811)
- `rate` (L3813), `MistakesView` (L3849), `mName` (L3862), `toCard` (L3866), `QuickAdd` (L3908)
- `MoreSheet` (L3919), `fmtIvl` (L3945), `shuffle` (L3946), `localPref` (L3954), `setLocalPref` (L3958)
- `upcomingExams` (L3959), `focusExam` (L3963), `fuzzIvl` (L3975), `schedule` (L3982), `forecast` (L4030)
- `fcWorst` (L4045), `smoothDay` (L4054), `ForecastPanel` (L4070), `smooth` (L4078), `bumpDay` (L4107)
- `examForTopic` (L4122), `calBump` (L4140), `calStats` (L4147), `CalibrationPanel` (L4165), `gradeCardIn` (L4188)
- `mistakeDue` (L4197), `gradeMistakeIn` (L4198), `cardIsDue` (L4208), `buildReview` (L4209), `rank` (L4212)
- `probDue` (L4240), `findProb` (L4241), `probsDue` (L4248), `gradeProbIn` (L4256), `gapCheck` (L4278)
- `flat` (L4279), `stem` (L4280), `examPressure` (L4304), `buildAll` (L4309), `AllSubjectsPanel` (L4325)
- `interleave` (L4340), `cardStrength` (L4352), `examReadiness` (L4361), `examMix` (L4378), `studyDaySet` (L4397)
- `streakOf` (L4404), `weekMinutes` (L4414), `retentionPct` (L4419), `sayOK` (L4426), `sayStop` (L4427)
- `sayClean` (L4429), `say` (L4430), `budgetQueue` (L4443), `take` (L4446), `BudgetPanel` (L4462)
- `noteAllowed` (L4475), `askNotify` (L4478), `maybeRemind` (L4486), `StudySession` (L4509), `owner` (L4521)
- `clearHf` (L4545), `next` (L4574), `write` (L4595), `gradeCard` (L4602), `pickConf` (L4622)
- `gradeMistake` (L4623), `gradeProb` (L4629), `rnd` (L4778), `peso` (L4779), `parseAmount` (L4840)
- `ComputeSet` (L4844), `nextP` (L4874), `setTimerState` (L4934), `timerElapsed` (L4939), `startTimer` (L4940)
- `startBreak` (L4945), `useTimer` (L4949), `chime` (L4959), `FocusBar` (L4976), `showTimer` (L4981)
- `hideTimer` (L4982), `beginDrag` (L4987), `moveDrag` (L4988), `keyDrag` (L4989), `endDrag` (L4990)
- `finish` (L4999), `wake` (L5060), `LeechPanel` (L5086), `unpark` (L5089), `park` (L5098)
- `cutLimit` (L5130), `attendStats` (L5134), `classOn` (L5145), `attendOn` (L5146), `ClassLife` (L5147)
- `addClass` (L5152), `setClass` (L5156), `delClass` (L5160), `markAttend` (L5164), `addTask` (L5172)
- `setTask` (L5176), `delTask` (L5180), `RoiPanel` (L5249), `ActivityStrip` (L5282), `val` (L5287)
- `playStudyFeedbackSound` (L5316), `playQuizFeedbackSound` (L5320), `note` (L5347), `v` (L5361), `transpose` (L5362)
- `mcqAssignedTopic` (L5387), `known` (L5389), `mcqDedicatedPool` (L5414), `bsa197QuizKey` (L5439), `bsa197History` (L5449)
- `bsa197Recall` (L5458), `bsa197Pool` (L5479), `bsa197Pick` (L5484), `bsa197DraftKey` (L5502), `bsa197LoadDraft` (L5503)
- `bsa18PracticeChanged` (L5510), `bsa18SavedAt` (L5513), `bsa197SaveDraft` (L5517), `bsa197DeleteDraft` (L5528), `bsa18WrittenKey` (L5531)
- `bsa18LoadWritten` (L5532), `bsa18SaveWritten` (L5538), `bsa18DeleteWritten` (L5542), `bsa18LatestPractice` (L5543), `bsa28SourceHistory` (L5560)
- `bsa28NewTopicRequest` (L5566), `bsa28ReflectionKey` (L5571), `bsa28ReadReflections` (L5572), `bsa28WriteReflections` (L5576), `bsa18ReadTutorChat` (L5582)
- `MultipleChoiceQuiz` (L5593), `writeReflection` (L5602), `start` (L5625), `resume` (L5634), `recordCheckedIn` (L5656)
- `checkAnswer` (L5676), `record` (L5687), `onQuizKey` (L5718), `leave` (L5750), `discard` (L5755)
- `MCQBankExplorer` (L5893), `MCQPage` (L5951), `bsa39Requirements` (L5972), `bsa39Mode` (L5978), `bsa39DraftKey` (L5988)
- `bsa39Load` (L5989), `bsa39Save` (L5990), `bsa39Number` (L5991), `bsa39Rows` (L5992), `bsa39RowSummary` (L5993)
- `bsa22AccountKey` (L5994), `bsa22ParseMoney` (L6004), `bsa39KeyCheck` (L6011), `normRow` (L6025), `bsa39Text` (L6043)
- `BSA39AnswerEditor` (L6050), `change` (L6052), `setRow` (L6054), `PsWrittenDrill` (L6075), `restoredOrder` (L6079)
- `randomOrder` (L6083), `persist` (L6094), `labelFor` (L6098), `existingFor` (L6099), `num` (L6107)
- `toggleRandom` (L6112), `startMistakeEditor` (L6117), `saveMistake` (L6122), `markMiss` (L6135), `markGot` (L6143)
- `changeRating` (L6148), `bsaSmartQueue` (L6228), `priority` (L6239), `bsaWeeklyEvidence` (L6250), `timestamp` (L6252)
- `collect` (L6253), `BSA29ClozePractice` (L6267), `store` (L6280), `begin` (L6281), `skip` (L6297)
- `reviewUncertain` (L6312), `saveToVault` (L6316), `askWhy` (L6327), `exactCount` (L6337), `unsureCount` (L6338)
- `PracticeView` (L6379), `startSmart` (L6393), `startReview` (L6397), `mxKey` (L6538), `mxChoiceKey` (L6542)
- `mxPool` (L6543), `ok` (L6545), `MockExam` (L6569), `right` (L6603), `answered` (L6611)
- `printExam` (L6614), `byTopic` (L6723), `hexToRgb` (L6770), `rgbToHex` (L6777), `mixHex` (L6778)
- `relLum` (L6782), `contrastOf` (L6789), `rgba` (L6793), `isHex` (L6794), `customVars` (L6820)
- `applyTheme` (L6847), `CustomThemeEditor` (L6862), `setC` (L6864), `BSA41ThemesModal` (L6907), `AppearanceModal` (L6928)
- `tile` (L6930), `ExamReadyMini` (L7023), `gcId` (L7070), `gcNum` (L7071), `gcDefaultScale` (L7080)
- `gcPart` (L7090), `gcComp` (L7091), `gcDefault` (L7092), `cs` (L7093), `gcNorm` (L7109)
- `arr` (L7111), `w` (L7112), `gcWavg` (L7148), `gcTrans` (L7157), `gcPartRaw` (L7160)
- `gcCompute` (L7173), `tr` (L7174), `gcDec` (L7186), `gcRoundPct` (L7187), `gcSorted` (L7192)
- `gcLetter` (L7193), `gcRemaining` (L7199), `gcSummary` (L7217), `share` (L7221), `gcNeed` (L7241)
- `gcFmt` (L7252), `gcPctTxt` (L7253), `gcQpiTxt` (L7254), `gcSumWeights` (L7255), `gcSemester` (L7257)
- `gcFromJSON` (L7274), `list` (L7277), `name` (L7285), `wt` (L7286), `items` (L7287)
- `gcMergeStructure` (L7322), `key` (L7326), `GC_CRC` (L7352), `gcCrc32` (L7361), `gcZip` (L7367)
- `gcXml` (L7423), `gcCol` (L7424), `gcSheetXml` (L7438), `gcSheetName` (L7455), `gcXlsx` (L7463)
- `nlmGuessKind` (L7497), `nlmContext` (L7705), `label` (L7709), `bsaPromptIsJsonPrompt` (L7784), `bsaPromptFillBrackets` (L7785)
- `bsaBuildGuidedPrompt` (L7797), `NotebookLMPrompts` (L7872), `setExtra` (L7901), `setCount` (L7902), `setField` (L7914)
- `choosePrompt` (L7926), `chooseKind` (L7927), `fieldInput` (L7928), `GC_PROMPT` (L7989), `gcGoals` (L8017)
- `gcSameLetter` (L8018), `gcRetention` (L8021), `gcScholar` (L8032), `gcStateCls` (L8049), `gcSingular` (L8050)
- `gcPctItem` (L8051), `gcTier` (L8052), `GcLetter` (L8058), `gcNeedView` (L8059), `gcWarnings` (L8066)
- `off` (L8068), `gcBlank` (L8078), `NumInput` (L8094), `show` (L8095), `gcSnap` (L8132)
- `GcTrajectory` (L8145), `x` (L8153), `y` (L8154), `GcOverview` (L8174), `pos` (L8184)
- `gcQuizLabel` (L8241), `gcPullable` (L8242), `GcPullQuizzes` (L8246), `GcPullAttendance` (L8267), `GcEditor` (L8282)
- `del` (L8284), `addItem` (L8287), `pullQuiz` (L8297), `pullAttend` (L8301), `weight` (L8336)
- `pctOf` (L8337), `GcScale` (L8429), `upper` (L8432), `GcSettings` (L8468), `GcStart` (L8493)
- `GcImportBox` (L8509), `gcListFor` (L8553), `gcRoundLabel` (L8559), `gcNum2` (L8560), `gcWorkbook` (L8561)
- `H` (L8563), `N` (L8564), `B` (L8565), `BN` (L8566), `NOTE` (L8567)
- `gcEsc` (L8628), `gcReportHtml` (L8630), `q` (L8634), `its` (L8663), `gcTextSummary` (L8676)
- `gcPrint` (L8700), `done` (L8709), `gcSaveFile` (L8724), `GcExport` (L8759), `xlsx` (L8761)
- `html` (L8762), `GcGoals` (L8772), `GcAll` (L8813), `GcWhatIf` (L8856), `GradesView` (L8916)
- `setGoals` (L8918), `setTab` (L8920), `flush` (L8929), `out` (L8951), `vis` (L8952)
- `GradeMini` (L9038), `drRound` (L9063), `drPva` (L9067), `drFva` (L9068), `drLex` (L9084)
- `drCompile` (L9103), `isOp` (L9109), `startsOperand` (L9110), `bool` (L9111), `or` (L9112)
- `and` (L9113), `cmp` (L9114), `mul` (L9130), `unary` (L9142), `power` (L9148)
- `postfix` (L9153), `primary` (L9159), `drEval` (L9197), `drFmtOf` (L9201), `drDecimals` (L9202)
- `drNiceStep` (L9203), `drVar` (L9209), `range` (L9212), `drGivenRow` (L9246), `drStep` (L9254)
- `drNorm` (L9263), `drList` (L9307), `drIsRandom` (L9308), `drSplitPh` (L9310), `drCheck` (L9315)
- `need` (L9317), `holes` (L9334), `drFmt` (L9343), `drGivenFmt` (L9352), `drFill` (L9353)
- `drDraw` (L9368), `drMake` (L9377), `drParse` (L9411), `drPool` (L9417), `drPickSet` (L9431)
- `drShort` (L9451), `drSets` (L9452), `drFromJSON` (L9463), `drLooksLike` (L9483), `drApply` (L9484)
- `bkChapter` (L9497), `bkNorm` (L9520), `bkOf` (L9531), `bkIsPages` (L9539), `bkMerge` (L9542)
- `bkInScope` (L9561), `bkTopicLabel` (L9562), `bkParseJSON` (L9566), `bkFromJSON` (L9582), `drExampleFor` (L9645)
- `bkTopicLine` (L9653), `nlmPromptFor` (L9695), `bkHasPage` (L9701), `BkPanel` (L9702), `bkPageIn` (L9719)
- `BkEditor` (L9723), `setCh` (L9730), `merge` (L9731), `addBulk` (L9736), `applyJSON` (L9745)
- `restore` (L9772), `DrPanel` (L9821), `drNum` (L9834), `drToForm` (L9838), `drFromForm` (L9856)
- `lines` (L9857), `DrSample` (L9880), `DrForm` (L9890), `DrManager` (L9905), `openEdit` (L9934)
- `closeEdit` (L9938), `saveEdit` (L9942), `importJSON` (L9962), `psRepairJSON` (L10028), `psPick` (L10046)
- `psArr` (L10057), `psS` (L10059), `psPlain` (L10078), `psList` (L10079), `psDiff` (L10085)
- `psNormProblem` (L10092), `psNormSet` (L10123), `psNormLecture` (L10148), `psLooksSet` (L10197), `psLooksLecture` (L10198)
- `psFromJSON` (L10199), `psApply` (L10230), `psCells` (L10291), `psIsSep` (L10292), `psBlocks` (L10293)
- `psMathHtml` (L10348), `braced` (L10350), `convert` (L10360), `psMathSegments` (L10404), `psInline` (L10431)
- `psNumCell` (L10452), `PsMd` (L10453), `psEsc` (L10477), `psInlineHtml` (L10478), `psMdHtml` (L10479)
- `cell` (L10487), `loadPdfProfile` (L10494), `profileEscape` (L10495), `pdfProfileMarkup` (L10496), `PersonalizationCorner` (L10501)
- `edit` (L10503), `field` (L10505), `psPrint` (L10575), `psSetText` (L10595), `lxText` (L10610)
- `psSafeProblems` (L10621), `psGroupProblems` (L10639), `psByTopic` (L10649), `psTally` (L10663), `PsBar` (L10668)
- `psSampleFits` (L10674), `psSampleIn` (L10675), `PsSampleCard` (L10676), `bsa29Clean` (L10690), `bsa29Meaningful` (L10691)
- `bsa29HasAnswer` (L10696), `bsa213ClozeQuality` (L10703), `bsa213DefinitionQuestion` (L10721), `bsa29Candidates` (L10727), `push` (L10730)
- `lxCloze` (L10774), `bsa29Pool` (L10775), `bsa29Exact` (L10789), `clean` (L10790), `bsa29DraftKey` (L10793)
- `bsa29ReadDraft` (L10794), `bsa29SaveDraft` (L10800), `lxDue` (L10811), `lxIsDue` (L10812), `lxStudied` (L10813)
- `lxDueList` (L10817), `LxDueChip` (L10820), `xrefLecture` (L10831), `LecturePracticeGenerator` (L10855), `generate` (L10861)
- `SmartScheduleBuilder` (L10921), `build` (L10925), `LxView` (L10957), `deleteLecture` (L10971), `undoLectureDelete` (L10984)
- `lxOpenLecture` (L11018), `lxBackToList` (L11027), `lectureId` (L11038), `PsEmpty` (L11063), `lxSourcePresentation` (L11068)
- `bsa13LectureHeading` (L11092), `bsaRevisionExcerpt` (L11097), `bsa41LectureHighlights` (L11108), `bsa41UpdateHighlight` (L11109), `bsa41ExportNotes` (L11111)
- `bsa41ImportNotes` (L11119), `bsa41Locate` (L11137), `bsa41DecorateHtml` (L11147), `BSA41MarkedText` (L11192), `activate` (L11194)
- `LxReader` (L11198), `seek` (L11206), `openHighlight` (L11231), `jumpHighlight` (L11242), `createHighlightCard` (L11243)
- `addCards` (L11256), `addCloze` (L11269), `LxEditor` (L11407), `toMd` (L11408), `setv` (L11411)
- `BSA43ProblemSets` (L11447), `PsView` (L11481), `PsExportCustomizer` (L11507), `chooseRange` (L11512), `exportNow` (L11528)
- `PsSetView` (L11555), `printVisible` (L11568), `mark` (L11570), `logMistake` (L11594), `toggleAll` (L11602)
- `PsProblem` (L11620), `PsProblemEditor` (L11636), `PsSetEditor` (L11662), `reset` (L11673), `psProbHint` (L11710)
- `PS_SET_SHAPE` (L11711), `gemKey` (L11804), `gemModel` (L11805), `gemReady` (L11806), `gemErr` (L11808)
- `gemNetErr` (L11821), `gemListModels` (L11827), `score` (L11839), `gemProbe` (L11854), `gemSend` (L11873)
- `cancel` (L11901), `eat` (L11906), `gemContext` (L11945), `gemSystem` (L11994), `gemFindJSON` (L12011)
- `GemSetup` (L12030), `gemSourceSystem` (L12107), `bsa210TutorCore` (L12226), `gemGeneralSystem` (L12242), `bsa26TutorName` (L12248)
- `bsa26Words` (L12285), `bsa26TopicMatch` (L12286), `bsa26TutorCapabilityContext` (L12303), `bsa26SafeAction` (L12326), `bsa26Action` (L12350)
- `bsa26LocalStudyPlan` (L12351), `gemDashboardSystem` (L12420), `bsa4ContextKey` (L12425), `bsa4ReadContext` (L12426), `bsa4SaveContext` (L12427)
- `bsa4ProblemContext` (L12428), `bsa26SafeReturn` (L12441), `bsa26ReturnFor` (L12452), `bsa26FocusExcerpt` (L12483), `bsa4TutorDraft` (L12493)
- `bsa197TutorQuizBehavior` (L12519), `bsa197TutorContext` (L12522), `BSA197TutorMemory` (L12528), `AskView` (L12558), `changeMode` (L12578)
- `changeModel` (L12582), `returnHere` (L12588), `saveTeachingPrefs` (L12597), `renameTutor` (L12598), `detachQuestion` (L12599)
- `onChatScroll` (L12611), `ask` (L12613), `clear` (L12676), `setBadge` (L12787), `holdScreen` (L12796)
- `CurriculumView` (L12815), `enroll` (L12826), `hasStudyData` (L12835), `bulkRemove` (L12837), `InkPad` (L12871)
- `saveShapes` (L12889), `undoShape` (L12898), `redoShape` (L12899), `compositeInk` (L12900), `exportInkImage` (L12908)
- `renderInkPage` (L12909), `shapeBounds` (L12910), `vectorElement` (L12911), `snapshot` (L12921), `repaint` (L12922)
- `checkpoint` (L12926), `undo` (L12927), `redo` (L12928), `coords` (L12929), `clampZoom` (L12930)
- `zoomAt` (L12931), `point` (L12948), `distance` (L12949), `midpoint` (L12950), `moveTouch` (L12962)
- `end` (L12978), `zoomButton` (L12988), `drawShape` (L12990), `clearPreview` (L12991), `previewAt` (L12992)
- `pointSegmentDistance` (L12994), `vectorHit` (L12995), `selectAt` (L13005), `eraseVectorAt` (L13007), `eraseRasterAt` (L13039)
- `down` (L13041), `up` (L13076), `duplicatePage` (L13095), `movePage` (L13096), `downloadNotebookPdfTip` (L13097)
- `exportNotebook` (L13098), `importNotebook` (L13099), `exportPng` (L13100), `print` (L13101), `ClassmatePublisher` (L13135)
- `setPermission` (L13143), `esc` (L13197), `sections` (L13198), `dashboardHtml` (L13206), `sharedSnapshot` (L13208)
- `replaceOnce` (L13251), `safeSharedHtml` (L13301), `make` (L13306), `download` (L13324), `RetentionTools` (L13359)
- `review` (L13374), `addCardsToQueue` (L13376), `addProblemsToQueue` (L13377), `addLectureChecksToQueue` (L13379), `importAttemptsToQueue` (L13380)
- `addExamMistakes` (L13381), `normalizeExam` (L13395), `examCorrect` (L13396), `printStudySheet` (L13398), `addJournal` (L13408)
- `exportRows` (L13409), `bsaBackupKeys` (L13422), `bsaValidMainRecord` (L13430), `bsaBackupPreview` (L13443), `bsaBackupDigest` (L13451)
- `bsaDownloadUnifiedBackup` (L13457), `bsaInspectUnifiedBackup` (L13476), `bsaApplyInspectedBackup` (L13509), `ToolkitView` (L13535), `chooseRestore` (L13541)
- `confirmRestore` (L13550), `worksheetNumber` (L13575), `worksheetExport` (L13581), `txNumber` (L13589), `txTotals` (L13590)
- `txInvalidAmount` (L13592), `txTrialPrint` (L13598), `txSave` (L13599), `txEdit` (L13600), `txPrintOne` (L13601)
- `txCsv` (L13602), `txImport` (L13603), `txPrint` (L13604), `newNote` (L13608), `openNote` (L13609)
- `saveNote` (L13610), `exportText` (L13611), `printArea` (L13612), `addAttempt` (L13631), `evaluate` (L13632)
- `sum` (L13633), `HowToCorner` (L13685), `readProgress` (L13719), `progressTotal` (L13720), `progressRank` (L13721)
- `grantFocusXp` (L13722), `grantActivityXp` (L13736), `grantFlashcardReviewXp` (L13750), `bsaAchievementDetails` (L13756), `AcademicProgress` (L13777)
- `Game2048` (L13799), `fresh` (L13800), `SudokuGame` (L13817), `restart` (L13824), `verify` (L13825)
- `MinesweeperGame` (L13829), `around` (L13833), `reveal` (L13836), `joyDefault` (L13842), `readJoy` (L13843)
- `useJoy` (L13844), `joyDay` (L13849), `lifePetStatus` (L13865), `StudyLifeHomeWidget` (L13870), `lifeDefault` (L13898)
- `readLife` (L13899), `lifeEarned` (L13900), `PixelScholar` (L13908), `LifeTownMap` (L13933), `step` (L13937)
- `activeSeason` (L13951), `StudyLife` (L13953), `count` (L13959), `position` (L13964), `changeAvatar` (L13965)
- `JoyHub` (L13998), `SnakeGame` (L14031), `WordGuessGame` (L14050), `submit` (L14053), `NonogramGame` (L14063)
- `clues` (L14066), `BubblePopGame` (L14070), `click` (L14073), `BreakCorner` (L14084), `resetGame` (L14093)
- `turn` (L14097), `StudyTimeAudit` (L14112), `bsaReadinessReport` (L14132), `BsaReadinessCoach` (L14161), `bsaV164ReadExamPrefs` (L14208)
- `bsaV164ExamPriority` (L14212), `BsaExamPlanner` (L14224), `BsaMistakePatterns` (L14252), `BsaRecommendationCheck` (L14272), `BsaTopicMasteryPanel` (L14291)
- `StudyReport` (L14310), `roll` (L14315), `fmt` (L14331), `pct` (L14332), `reasons` (L14333)
- `action` (L14334), `doReset` (L14335), `metric` (L14341), `bsaBytes` (L14391), `bsaBase64` (L14392)
- `bsaVaultKey` (L14393), `bsaVaultEncrypt` (L14397), `bsaVaultDecrypt` (L14404), `bsaDeviceKeyGet` (L14416), `fetch` (L14424)
- `bsaDeviceVaultEncrypt` (L14442), `bsaDeviceVaultDecrypt` (L14448), `PrivateVault` (L14458), `copy` (L14499), `bsa181Empty` (L14547)
- `bsa181Read` (L14548), `bsa181Write` (L14549), `bsa181Text` (L14550), `bsa181Add` (L14551), `bsa181Remove` (L14552)
- `bsa181Restore` (L14553), `bsa181Recent` (L14554), `bsa181Links` (L14555), `BSA181Workspace` (L14556), `notify` (L14568)
- `saveCapture` (L14569), `saveScratch` (L14570), `shown` (L14573), `BSA181Spotlight` (L14588), `bsa27SelectionFocus` (L14597)
- `bsa27DefaultTutorQuestion` (L14613), `BSA181HighlightTool` (L14619), `dismissSelection` (L14624), `saveSelection` (L14625), `touchSchedule` (L14656)
- `onOutside` (L14660), `StartupDataRecovery` (L14704), `exportRaw` (L14706), `bsaNextKey` (L14736), `bsaNextRead` (L14737)
- `bsaNextSave` (L14738), `bsa185Default` (L14740), `bsa185Read` (L14741), `BSA185LayoutEditor` (L14745), `bsa25PracticeHealth` (L14757)
- `BSA193DeviceSafety` (L14793), `bsa187Blank` (L14861), `bsa187Account` (L14862), `bsa187Number` (L14874), `bsa187Verify` (L14875)
- `normalized` (L14878), `bsa198Text` (L14895), `bsa198Fingerprint` (L14896), `bsa198Near` (L14897), `amounts` (L14900)
- `bsa198Validate` (L14906), `bsa198StoredKeyValid` (L14930), `bsa198Catalog` (L14942), `bsa198PlanBatch` (L14955), `bsa198Parse` (L14981)
- `bsa198DeclaredSubject` (L14991), `bsa198StorePlan` (L14995), `bsa198AttemptKey` (L15012), `BSA187AccountingLab` (L15013), `legacy` (L15023)
- `stats` (L15027), `importLegacy` (L15047), `checkImport` (L15052), `applyImport` (L15054), `saveManual` (L15063)
- `duplicateCount` (L15074), `searchLists` (L15075), `bsa188Tasks` (L15171), `bsa196BudgetTasks` (L15190), `BSA188Today` (L15194)
- `checked` (L15201), `importOld` (L15210), `BSA189Companion` (L15231), `motionChange` (L15242), `BSA191WeeklyPlanner` (L15252)
- `changeSession` (L15262), `BSA344Schedule` (L15279), `bsa15Clean` (L15296), `bsa15Excerpt` (L15300), `bsa15LectureList` (L15305)
- `bsa15SectionList` (L15308), `bsa15Process` (L15311), `bsa15ComparisonTable` (L15321), `split` (L15326), `bsa15Timeline` (L15337)
- `bsa15ProblemBlocks` (L15368), `BSA15VisualStudio` (L15376), `onMapPointerDown` (L15406), `onMapPointerMove` (L15411), `onMapPointerEnd` (L15424)
- `onMapClickCapture` (L15431), `panMap` (L15436), `centerSelectedMap` (L15464), `openSection` (L15470), `BSA192KnowledgeMap` (L15551)
- `DashboardV2Home` (L15556), `layoutOrder` (L15560), `layoutVisible` (L15561), `updateLayout` (L15562), `card` (L15591)
- `bsa205Money` (L15639), `bsa205Date` (L15640), `bsa205Short` (L15641), `bsa205DriveId` (L15644), `bsa205LoadScript` (L15651)
- `BSA205Sources` (L15654), `addSource` (L15662), `mb` (L15669), `bsa205FamilyKey` (L15684), `bsa3TopicLabel` (L15687)
- `bsa205LibraryItems` (L15692), `safe` (L15693), `bsa3GroupRows` (L15703), `bsa38GroupOriginalSets` (L15707), `bsa205Duplicates` (L15715)
- `bsa205InboxKey` (L15721), `bsa205InboxPlan` (L15722), `bsa205FileBase64` (L15728), `bsa205ExtractPdfText` (L15729), `bsa205GemDraft` (L15740)
- `BSA205Importer` (L15755), `addInbox` (L15765), `importVerified` (L15769), `bsa44Key` (L15799), `bsa49TopicParts` (L15805)
- `normalize` (L15809), `bsa49ResolveTopic` (L15813), `bsa215TopicChapter` (L15849), `bsa215MeaningTokens` (L15857), `bsa215UniqueChapterMatch` (L15861)
- `bsa215LinkSafety` (L15874), `bsa49CanonicalizePack` (L15882), `canonical` (L15884), `attach` (L15886), `bsa49UnmatchedLabels` (L15893)
- `BSA49TopicLinks` (L15903), `topicTitle` (L15913), `topicSelect` (L15914), `linkPairs` (L15916), `reassignSaved` (L15929)
- `unlinkSaved` (L15933), `bsa49SubjectWords` (L15974), `bsa49MatchesSubject` (L15975), `strip` (L15982), `bsa49PackPrompt` (L15986)
- `bsa13CheckGeneratedJSON` (L16006), `required` (L16010), `bsa44Empty` (L16055), `bsa44ParseOne` (L16056), `bsa44Baseline` (L16089)
- `bsa210Tokens` (L16114), `bsa210Intent` (L16123), `bsa210Concept` (L16133), `bsa210Numbers` (L16145), `bsa210DuplicateSignal` (L16151)
- `polarity` (L16156), `bsa210AnswerMeaning` (L16177), `bsa210MaterialPair` (L16187), `bsa44Similar` (L16197), `bsa44Prepare` (L16198)
- `flag` (L16203), `acceptSets` (L16259), `bsa44Plan` (L16285), `bsa44ApplyPack` (L16300), `bsa47ExpectedMaterials` (L16332)
- `bsa47HasMaterial` (L16337), `bsa47TopicGapPrompt` (L16338), `BSA49SmartFlow` (L16361), `BSA45ImportCenter` (L16393), `copyGap` (L16403)
- `BSA44PackImporter` (L16422), `selectFiles` (L16425), `readPieces` (L16432), `bsa44TopicCounters` (L16478), `place` (L16482)
- `BSA44TopicHealth` (L16490), `expected` (L16494), `has` (L16495), `bsa45SafeLibrarySubject` (L16516), `a` (L16517)
- `sets` (L16518), `BSA205Library` (L16521), `updateProblemTopic` (L16553), `bulkMove` (L16560), `toggleHide` (L16573)
- `addNote` (L16574), `updateInbox` (L16578), `startImport` (L16579), `openPack` (L16580), `bsa205Diagnose` (L16654)
- `bsa43Text` (L16746), `bsa43Number` (L16747), `bsa43ParseReport` (L16755), `bsa43Money` (L16809), `bsa46Figure` (L16811)
- `bsa46ReportYear` (L16812), `bsa46StatementKind` (L16813), `bsa46CrossChecks` (L16819), `amount` (L16822), `BSA46Statement` (L16835)
- `BSA46Checks` (L16859), `bsa43Tasks` (L16865), `relevant` (L16868), `bsa26FsDraftKey` (L16896), `bsa26FsDraft` (L16899)
- `BSA43FinancialStatements` (L16906), `inspect` (L16918), `readFile` (L16919), `openPdf` (L16921), `learnStandard` (L16938)
- `saveAttempt` (L16941), `openTutor` (L16948), `bsa205CycleValidate` (L17050), `bsa205Ledger` (L17062), `bsa205CycleReports` (L17066)
- `BSA205Cycle` (L17079), `saveReports` (L17090), `changeLedger` (L17091), `checkLedger` (L17098), `checkStatements` (L17099)
- `newRun` (L17103), `draftSave` (L17108), `loadCase` (L17109), `select` (L17115), `bsa34FocusChoices` (L17158)
- `bsa34TopicMatch` (L17168), `bsa34TopicTitle` (L17174), `bsa34PlanBlocks` (L17175), `bsa211HasTimer` (L17207), `bsa211ElapsedMs` (L17208)
- `bsa211Clock` (L17214), `bsa212Allocate` (L17227), `bsa213Words` (L17241), `bsa213ReadScope` (L17246), `bsa213McqEstimate` (L17279)
- `bsa213McqScope` (L17285), `bsa213WrittenMinutes` (L17300), `bsa213ScopeExplanation` (L17306), `bsa213ScopeLongBlock` (L17313), `bsa213QuickPlan` (L17352)
- `bsa212ModePlan` (L17413), `find` (L17416), `bsa212ModeName` (L17444), `bsa212Guided` (L17445), `bsa212PhaseIndex` (L17446)
- `bsa212PhaseElapsed` (L17447), `bsa212PhaseGoal` (L17450), `bsa212Freeze` (L17451), `bsa212Action` (L17459), `bsa214RecentClosed` (L17496)
- `bsa214Archive` (L17506), `bsa214HistoryLabel` (L17543), `bsa214AdaptProposal` (L17556), `bsa205SessionBlocks` (L17588), `bsa34BlockEvidence` (L17591)
- `matches` (L17596), `bsa214TopicStanding` (L17610), `bsa214FoundationSources` (L17626), `BSA214FoundationCheck` (L17668), `BSA205Study` (L17708)
- `create` (L17721), `enableGuided` (L17729), `bsa211TimerAction` (L17742), `archive` (L17754), `saveReflection` (L17771)
- `BSA212FloatingFocus` (L17874), `constrain` (L17891), `keyboard` (L17895), `bsa34LearningSnapshot` (L17938), `BSA205Mastery` (L17958)
- `get` (L17965), `bsa38Calc` (L18005), `mult` (L18015), `bsa38ValidateTemplate` (L18019), `bsa38ParseImport` (L18035)
- `bsa38Generate` (L18036), `bsa38Work` (L18041), `bsa38SaveWork` (L18042), `bsa38Day` (L18043), `bsa38AddDays` (L18044)
- `BSA38Variations` (L18045), `preview` (L18054), `BSA38Oral` (L18076), `speak` (L18081), `BSA38MasteryCheckpoint` (L18090)
- `BSA38PracticeStudio` (L18097), `BSA38ExamCatchup` (L18103), `bsa38SuggestTopic` (L18127), `tokens` (L18130), `BSA38LibraryTriage` (L18134)
- `copyPrompt` (L18139), `previewAI` (L18142), `applyAI` (L18146), `BSA38ProgressCompare` (L18161), `stat` (L18164)
- `bsa33Journey` (L18178), `bsa33RouteName` (L18191), `BSA31StudyPath` (L18192), `bsa32ManilaDay` (L18248), `bsa32DailyLine` (L18257)
- `BSA3Today` (L18263), `tick` (L18267), `BSA3Practice` (L18324), `bsa46SuggestedProfile` (L18376), `bsa46ProfileId` (L18386)
- `bsa46Profile` (L18387), `bsa46ToolVisible` (L18388), `bsa46TutorGuidance` (L18397), `bsa46ImportGuidance` (L18402), `BSA45SidebarEditor` (L18403)
- `toolItem` (L18413), `BSA3StartGuide` (L18459), `DashboardV205Home` (L18473), `BSA4StudyDock` (L18512), `setDockHidden` (L18515)
- `bounds` (L18520), `startDock` (L18530), `moveDock` (L18537), `endDock` (L18540), `BSA43ThemeNavigation` (L18621)
- `bsa13IconName` (L18664), `BSA13IconPicker` (L18672), `bsa13MaterialCounts` (L18689), `BSA11SubjectSwitcher` (L18701), `labelOf` (L18708)
- `setPosition` (L18709), `resize` (L18720), `escape` (L18721), `BSA12Subjects` (L18759), `parseTerm` (L18771)
- `codes` (L18780), `sort` (L18781), `year` (L18783), `updateCourse` (L18795), `toggleLayout` (L18800)
- `removeCourse` (L18801), `archiveCourse` (L18813), `subjectCard` (L18819), `App` (L18867), `repair` (L18878)
- `onReturn` (L18887), `outside` (L18897), `touchNavStart` (L18904), `touchNavEnd` (L18905), `wheel` (L18925)
- `toggleRail` (L18939), `toggleUtilities` (L18947), `saveSidebar` (L18948), `toggleSidebarPin` (L18949), `toggleSidebarHide` (L18950)
- `shiftSidebarPin` (L18951), `doUndo` (L18978), `setSubjectProfile` (L19003), `setSubjectTool` (L19004), `resetSubjectProfile` (L19005)
- `toggleDockFromSettings` (L19006), `setSettings` (L19007), `replaceAll` (L19012), `go` (L19025), `resumePractice` (L19064)
- `discardPractice` (L19070), `shortcutGo` (L19077), `shortcutMenu` (L19082), `openEditor` (L19090), `onStorage` (L19150)
- `restoreCoreShortcuts` (L19252), `switchSubject` (L19262), `syncAlert` (L19270), `openSync` (L19274), `openGrades` (L19275)
- `openSubjects` (L19282), `subjectsButton` (L19283), `bsaDownloadSafeDiagnostics` (L19435)

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

### V2.15 checkpoint — 2026-11-22

Updated **this same single handoff** for exact Chapter 16 identity diagnosis, preservation of long imported codes, safe unique-chapter matcher, selected batch aliases, import-preview unresolved labels, unchanged academic data and limitations. Updated current source hashes, V2.15 release/cache identifiers, source symbol index, regression outcomes and unverified live/device status. Do not create another Markdown file or silently merge unreviewed source edition chapters.

## V2.16 deployment asset hashes (SHA-256)

- `assets/app.js`: `e03b9dc3c9c77847e922d4eb4e944fca12941cbcb447292cb612d61ba1219638`
- `assets/styles/polish.css`: `858a224d4ce8afdce7565435117b5a0449e70d03ab2f78a6544303330d0f59fd`
- `sw.js`: `056e8182d523eeb7a2e29374bce6ca56657aaf315a6ca6d3c35c96a4003d078c`
