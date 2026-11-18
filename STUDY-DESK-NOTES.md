v80: Fix shared dashboard publishing HTML: inject boot script at FIRST actual </head>, not last occurrence inside JavaScript strings. Restore read-only banner at actual root opening. Republish shared website from personal dashboard.

# BSA Study Desk: notes for future updates

Last updated: November 5, 2026.

These notes are written so that you, or an AI helping you later, can understand the app and change it safely. When you ask for an update, give it this file and the current `index.html`.

## 1. What the app is

The app is a single-page **offline PWA** hosted on GitHub Pages.

| File | What it is |
|---|---|
| `index.html` | The entire app: CSS in `<style>`, all JS in one `<script>` |
| `sw.js` | Service worker for offline support. **Bump `VERSION`** (currently `study-desk-v5`) every time you change `index.html`, so devices update |
| `manifest.json` and the icons | Install-to-home-screen metadata |

How the code is written:

- **React 18 is loaded from a CDN** as UMD builds from jsDelivr. There is no build step and no JSX.
- **Components are plain `React.createElement` calls.** Older code writes it out in full; newer code uses the alias `h`.
- **All JS lives inside one IIFE:** `(() => { ... })()`.
  - Function declarations are hoisted.
  - `const` helpers must be defined before they are *called*. Definition order doesn't matter, because calls happen at runtime.

## 2. Data model

Everything is stored in localStorage under the key `bsa-study-dashboard:v1`:

```
doc = {
  version, updatedAt, activeId, settings, settingsU, deleted: {id: time},
  subjects: [{
    id, name, code, school, textbook?, _u,
    topics:[{id, kind:"topic"|"exam", week, code, title, standard, scope, status, due, covers[], sub:[{id,t,p,s,done}]}],
    cards:[{id, topicId, q, a, tip, conf, srs}],
    mistakes:[...], quizzes:[{id, topicId, score, items, date}], sessions:[...], days:[...],
    grading?: { ...see section 4... }          // optional
    book?:   { title, author, chapters:[{id,no,name,page,topicId}] }   // optional, see section 5b
    drills?: [{ ...drill template, see section 5b... }]                // optional
  }]
}
```

How editing works:

- `update(fn, whole)` in `App` clones the doc and applies your change.
  - `fn(activeSubject, doc)` changes the active subject.
  - `whole(doc)` changes any part of the doc.
- After the change, it calls `stampChanges` and `markDirty`, which triggers the GitHub sync.

How GitHub sync merges two devices' changes (`mergeDocs`):

- **Collections merge item by item:** the `COLLS` lists (topics, cards, mistakes, quizzes, sessions, days).
- **Subject-level fields are last-writer-wins.** This includes `grading`.
  - So grading syncs automatically with no change to the sync engine.
  - If two devices edit grades offline, the newer whole grading object wins.
- `settings` sync as a whole, using `settingsU`.

Device-only preferences (not synced) are stored through `localPref(k)` and `setLocalPref(k, v)`, under localStorage keys `bsa_pref_<k>`:

| Key | What it stores |
|---|---|
| `gcTab` | Last open Grades section |
| `gcSlider` | Value of the "if I average X%" slider |
| `gcWhatIf` | The what-if sandbox |
| `nlmPrompt` | Last NotebookLM prompt picked |
| `nlmKind_<subjectId>` | Subject type picked for NotebookLM prompts |

## 3. What was added (October 2026)

All new code sits in one block right **before `function App()`**, in this order:

1. **Engine** (`gc*` pure functions)
2. **XLSX writer**
3. **NotebookLM prompt library**
4. **Grades UI**

All new CSS is appended at the end of `<style>`, under `/* ---------- grades ---------- */`.

Original code that was touched is all small, additive changes:

| Where | Change |
|---|---|
| `ICONS` | Added `grade` (percent sign) |
| `App` → `tabs` | Added `["grades","Grades","grade"]` **at the end**. The mobile bottom nav uses `tabs[0..3]` and `tabs[5]`, so keep that order |
| `App` | Added `openGrades(id, tab)`; renders `GradesView` when `nav.tab === "grades"` |
| `MoreSheet` | "Grades" is the first option, which is how phone users reach it |
| `QuickAdd` | New "Enter a grade score" item; `App` routes it to Grades instead of `openEditor` |
| `HomeView` | `GradeMini` card added in the side column (shown only when the subject has grading) |
| `DataModal` | Prompt tab now renders `NotebookLMPrompts`; import preview and toast mention a grading system |
| `parseImport` / `applyPartial` | Accept `"grading"` in imported JSON; it merges into the subject and keeps existing scores |
| `matchTopic` | Fallback: `"Week 5"`, `"wk 5"` or `"W5"` matches a topic by week number |
| CSS: screen reach | See "Screen fit" below. Fixes parts of the UI being unreachable on iPad, iPhone and small or zoomed laptop windows |

## 4. Grades: logic

### Shape of `subject.grading`

Always pass grading through `gcNorm()` before using it. It sanitizes the data and adds any missing ids.

```
{
  v:1, units:3, include:true,            // include = counts in semester QPI
  round:"none"|"2"|"1"|"0",             // final % rounding before letter lookup
  trans:0,                               // transmutation base (0=off; 50 → raw p becomes 50+50p)
  target:"A-",                           // goal letter ("" = none)
  retention:false, retMin:"",            // retention subject; retMin "" = use global default
  terms:[{id,name,weight, comps:[{id,name,weight, parts:[{id,name,weight,calc:"points"|"average", items:[{id,label,score|null,max}]}]}]}],
  scale:[{id,letter,min,qpi}]            // order doesn't matter; sorted by min when used
}
```

The structure is **term → component → part → items**.

- A component with one part shows its items directly.
- With two or more parts (for example, Class standing split into Quizzes and Attendance), each part has its own weight.

### Calculation rules (`gcCompute`)

**Part score**
- With `points`: the sum of scores divided by the sum of maxes.
- With `average`: the mean of each item's score/max.
- Transmutation is applied per part.

**Weighted averages renormalize over what has data.** If a part or component has no scores yet, it is skipped, and the remaining weights are scaled up to 100%.

**`actual` mode** ("grade so far") counts only items that already have a score.

**`proj` mode with a value `r`** fills in what's missing:
- Every blank item (max set, score empty) counts as `r`.
- Every part with no items at all counts as `r`.
- `gcSummary` uses this mode to produce:
  - `lo` (r = 0, worst case) and `hi` (r = 1, best case)
  - `at(r)`, the projected grade for any `r`
  - `share`, the fraction of the grade still ungraded

**What you need (`gcNeed`).**
- The projected grade is linear in `r`, so the needed average is `r = (cutoff − lo) / (hi − lo)`.
- The cutoff accounts for rounding. With whole-number rounding, 89.5 counts as 90.
- Results: `secured` (already safe), `need` (the average to hit), `reach` (would need over 100%), or `missed` (nothing left to grade).

**Letter lookup (`gcLetter`).** The grade is rounded first, then given the highest letter whose `min` it reaches.

**Semester QPI (`gcSemester`).** A units-weighted average of letter QPIs. It skips subjects with `include === false` and subjects with no grade yet.

**Retention (`gcRetention`).** The minimum letter is `g.retMin`, or the global `settings.gcGoals.retLetter` (default `B-`). Letters are matched exactly (case-insensitive) against that subject's own scale.

**Scholarship (`gcScholar`).**
- The rule lives in `settings.gcGoals`:
  - `scholarOn`
  - `scholarQpi` (default 2.00)
  - `scholarScope`: `"all"` or `"retention"`
- To find the uniform average you need, it scans `r` from 0 to 1 in 0.5% steps. A scan is needed because letters jump in steps, so QPI isn't linear.

### Imports and copying

- **`gcFromJSON`** reads NotebookLM's grading JSON. It is tolerant of key names (`weight`, `percent`, `percentage`, `components`, `parts`, `subcomponents`, `scale`, `letterGrades`, and so on) and of values like `"30%"`.
- **`gcMergeStructure`** applies an imported structure. It keeps typed scores wherever term, component and part names match, and only overrides rounding or transmutation if the import states them.
- **`gcBlank`** makes the same setup with no scores and fresh ids. It's used for classmates and for "copy from subject".

### Screens (`GradesView`)

| Tab | What it does |
|---|---|
| **My scores** | `GcOverview` (grade so far, range bar, need table, goal, retention line, slider) plus `GcEditor` (scores only) |
| **Setup** | `GcSettings` (units, rounding, transmutation, include in QPI, retention), `GcScale` (letters and QPI), `GcEditor` (structure), `GcImportBox` (NotebookLM), copy from another subject, remove grading |
| **What-if** | `GcWhatIf`: a sandbox saved in `bsa_pref_gcWhatIf` that never touches real data |
| **All subjects** | `GcGoals` (retention and scholarship), QPI tiles, summary table, `GcExport` |

How saving works inside `GradesView`:
- Edits update local state immediately.
- They save to the doc after 450 ms, and also when you leave the screen or the page is hidden.
- Changes from another device are picked up only when no local save is pending.

`NumInput` is the number box. It keeps your text while you type, so you can enter "8." or clear the box, and emits `number | null`.

### Exports

**Excel.** `gcWorkbook(list, goals)` builds a real `.xlsx` through `gcXlsx` (a dependency-free zip with no compression, plus SpreadsheetML). It contains a Summary sheet plus one sheet per subject. Values are numbers, not formulas.

**PDF.** `gcPrint(html)` puts the report into `#gc-print`, adds `body.gc-printing`, and calls `window.print()`. Print CSS hides everything else, and the class is removed on `afterprint`.

**HTML report file.** The same report as a standalone `.html` file, for phones where print does nothing.

**Saving files.** `gcSaveFile` uses the phone share sheet on touch devices when it's available, then the `downloads` capability, then a normal download link.

## 4b. Screen fit (reach every part of the UI)

The overrides are appended in the grades CSS block, under `reach every part of the screen`.

- **Use `dvh`, not plain `vh`.** Safari's `100vh` is the height with its toolbars hidden, so the sidebar bottom and popup Save buttons ran under the toolbar. Every height uses `100dvh`, with a `vh` line first as a fallback.
  - This applies to `.rail`, `.shell`, `.backdrop` and `.modal` (`92dvh` on phones).
- **Short screens** (`max-height: 560px`, such as a phone sideways or a laptop at 125% zoom): popups start at the top and use the full height.
- **Focus timer bar:** the page gets extra bottom padding while the bar shows, so the bar never covers the last items.
- **Tested reachable at:** phone 390×664, phone sideways 844×390, iPad 820×1050 and 1180×700, laptop 1366×650 and 1093×520. Every button and field on every page and popup was checked.

## 5. NotebookLM prompt library

- **23 prompts in 3 groups.**
  - Set up a subject.
  - Make study material (returns JSON to import).
  - Study in chat: quiz, tutor, reviewer, compare, predict exam, mnemonics, stuck, study plan, audio, recitation prep, essay practice, case analysis, lab/practical.
- **14 subject types (`NLM_KINDS`).** `nlmGuessKind` picks one automatically from the subject name; you can change it per subject. The types are general, computation, theory/law, science, health, history and social science, language, philosophy and theology, programming, business, engineering and architecture, arts and design, research and thesis, and PE/NSTP/skills.
- **`NLM_PROMPTS`** is a list of `{id, group:"setup"|"make"|"chat", json, title, desc, make(ctx)}`.
- **`nlmContext(subject, topicId, kind)`** fills in:
  - the subject name and code
  - the chosen topic
  - the exact topic titles, so imports match the right roadmap topics
  - the next exam and its scope
  - today's date
  - a hint for the subject type (`NLM_KINDS`)
- **To add a prompt,** push one object into `NLM_PROMPTS`. JSON prompts must return keys that `parseImport` understands: `topics`, `flashcards`, `mistakes`, `quizzes` or `grading`.
- **The original CFAS prompt** is kept unchanged as `NOTEBOOKLM_PROMPT`, listed as "Original CFAS study pack".

## 5b. Textbook map and computation drills for any subject (October 29, 2026)

All code is in one block before `function App()`, after `GradeMini`, prefixed `dr`/`bk` (`DR_*`, `BkPanel`, `BkEditor`, `DrPanel`, `DrManager`, `DrForm`). CSS is at the end of `<style>` under `textbook map and computation drills`.

- **Storage:** `subject.book` and `subject.drills` are subject fields, last-writer-wins like `grading`. No sync changes.
- **CFAS:** keeps the built-in `TEXTBOOK` and `PROBLEMS` (`subject.textbook === true`). Editing or importing a map into CFAS copies the built-in chapters into `subject.book`; "Use built-in map" deletes it again. Imported drills run beside the built-ins.
- **Drill template:** `{name, topicId, q, vars, given, ans, fmt, dp, unit, cur, steps, req, tol}`.
  - `vars`: `[min,max,step]`, a fixed number, `{choices:[...]}`, or a formula using earlier vars.
  - `ans`, `req` and `given` values are formulas, run by `drCompile` (a small parser, no `eval`). Functions: round, floor, ceil, abs, min, max, sum, avg, sqrt, pow, exp, ln, log, log10, if, pvf, fvf, pva, pvad, fva, fvad, pmt. `12%` means 0.12.
  - `fmt`: money, number, count or percent. `{expr}` or `{expr|count}` in question and steps shows a value. A step `{if, text}` shows only when true.
  - `drNorm` reads any key spelling NotebookLM uses and is idempotent. `drCheck` rejects unknown names; `drMake` retries random numbers until `req` holds.
- **Pool:** `drPool(subject)` = CFAS built-ins + valid templates. `ComputeSet` now uses it; fixed-number drills appear once per set; an empty pool shows a message instead of looping.
- **Import:** `parseImport` reads `textbook` / `textbookMap` / `book` and `drills` (also `computationDrills` etc.). `applyPartial` merges them after topics, so new topics link. Broken drills are listed in the preview, never imported.
- **Prompts:** `book` (setup group) and `drills` (make group) are pushed onto `NLM_PROMPTS`. `nlmContext` now also returns `topicTitles`.
- **Tested:** 41 browser checks (CFAS unchanged, imports, editor, formats, reload, phone 390×664) plus engine unit tests. Zero console errors apart from blocked web fonts in the test sandbox.

## 6. Defaults you should check

- **Letter cutoffs and QPI values are placeholders:** A 92 / 4.0, A- 86 / 3.5, B 80 / 3.0, B- 74 / 2.5, C 70 / 2.0, F 0 / 0. Set the real ones per subject in Setup.
- **The default template** is Midterms 50% and Finals 50%, each split into exam 30%, class standing 40% and exam 30%.
- **The scholarship rule** defaults to QPI 2.00 over all subjects. Note that in the starter scale, B equals 3.00.

## 7. Updating safely

1. Keep a backup of the working zip before any change.
2. Name every new function or constant with a unique prefix (`gc`, `nlm`, …). Some names are already used: `GRADES` is the flashcard rating list, and `h`, `norm`, `clone`, `uid` and `today` are shared helpers.
3. New per-subject data should be a field on the subject. It syncs as a whole, last-writer-wins. Use a `COLLS` collection only if items need to merge one by one, and in that case add it to `COLLS` deliberately.
4. Don't reorder `tabs` in `App`.
5. Bump `VERSION` in `sw.js`.
6. Test in a browser:
   - open every tab
   - add a card and a mistake
   - enter a grade score
   - reload, and check that everything is still there
   - export to Excel
   - check that the console shows no errors

The October 2026 version passed:
- 35 end-to-end checks
- a full smoke test of the original features
- a reachability check at 6 screen sizes
- 966 prompt variations (no blanks or broken text)
- imports of realistic NotebookLM replies for every JSON prompt

There were zero console errors.

## 5c. Lectures and problem sets (November 5, 2026)

All code is in one block before `function App()`, prefixed `ps`/`lx`. CSS is at the end of `<style>` under `lectures & problem sets`.

- **Storage:** `subject.lectures` and `subject.psets`, both added to `COLLS`, so they merge item by item across devices.
  - Lecture: `{id, topicId, topicText, title, source, summary, sections:[{id,h,body}], terms:[{t,d}], checks:[{q,a}], done}`
  - Set: `{id, topicId, topicText, title, source, intro, problems:[{id,no,title,subtopic,difficulty,problem,req[],choices[],answer,approach,solution,trap,st}]}`; `st` is `""`, `"got"` or `"miss"`.
- **Tabs:** `lectures` and `psets` were appended to the end of `tabs`; the order of the others is unchanged. They are also in `MoreSheet` for phones.
- **Text format:** bodies are markdown-lite, rendered by `PsMd` without innerHTML. It supports paragraphs, `-` bullets, `1.` steps, `##` headings, `>` callouts, `**bold**` and pipe tables. A 4-column table with the header `| Debit | | Credit | |` under a `**bold**` line renders as a T-account.
- **Import:** `parseImport` reads `lectures` and `problemSets` (plus many key spellings) through `psFromJSON`. Invalid JSON gets a second try through `psRepairJSON`, which fixes raw line breaks inside strings and trailing commas.
  - `psApply` matches by title. A set with the same title gets new problems appended, so NotebookLM "continue" batches work. A lecture with the same title gets its sections refreshed or appended.
- **Prompts:** a new group `lp`, "Lectures & problem sets", with 7 prompts: `lecture`, `pset`, `pset-book`, `pset-compre`, `pset-mcq`, `lecture-chat` and `pset-chat`. The section plans (`PS_PLAN`) and problem guidance (`PS_PROB`) adapt to each `NLM_KINDS` type.
  - `go("nlm", {pid, topicId})` opens the prompt picker with that prompt and topic preselected.
- **Built-in sample:** `PS_SAMPLE_PAS7` has 2 sets (33 problems) and a PAS 7 lecture. It is offered with one button on accounting subjects until it has been added.
- **Tested:** 31 browser checks, 98 prompt and subject-type variations, phone 390×664, a cross-device merge, and a smoke test of every original tab.


## November 18, 2026 — v19 unified learning (addendum)

- Added subject-level `learningEvents` to `COLLS` for item-by-item GitHub merging. Existing data is preserved; no historical events are fabricated.
- `App.update` now records changes to existing flashcard SRS state and problem-set statuses as timestamped events. AI attempts continue in the existing `aiAttempts` collection.
- `smartTopicStats` uses recent event history, with provisional AI results at half weight. Legacy current statuses are only used for sources that do not yet have events. This is an estimate, not a validated grade or mastery assessment.
- Today's priorities show a recommended next action and link to an existing feature.
- AI Practice Lab adapts exercise modes and grading instructions to the selected subject; accounting-specific modes remain for accounting courses.
- Insights now uses timestamped seven-day learning events rather than interpreting the latest problem status as a historical attempt.
- Current limits: historical activity before v19 is not reconstructed; the engine does not automatically create flashcards or schedules; general AI Tutor messages and lecture reading are not mastery evidence. The new integration is not yet verified with live GitHub multi-device sync or live Gemini requests.
- The service worker cache version is `study-desk-v19-unified-learning`.


## v20 Concept Vault bulk cleanup
- Select cards toggles checkbox mode for the current subject; Select visible respects confidence/topic/search/duplicate filters.
- Show duplicates matches normalized question and answer; keeps the first card visible and flags later copies.
- Delete selected requires explicit confirmation and uses the existing update/stampChanges deletion tombstones for GitHub sync.
- Selection does not change card ratings. Verify cross-device deletion after sync before relying on it.


## v21 Adaptive StudyFlow
- New subject-neutral guided learning loop on Today, with topic selector and automatic checkpoint updates.
- Learn/refresh checkpoint is explicitly self-reported and recorded in `learningEvents`; practice/reassessment use saved review, problem and AI attempt evidence; correction uses existing mistake records.
- Buttons navigate to existing lectures, roadmap, problem sets, Concept Vault, Mistake Log, and session scheduling.
- Does not auto-generate lessons or calendar events. Not a verified AI diagnosis; observed mastery is heuristic.
- v21 service worker cache bust. Back up and test on a separate GitHub Pages branch before production.

## v22 — Curriculum and navigation update
- Added Curriculum tab and searchable ten-term BSA prospectus (SY 2025–2026), with course codes, titles, units and stated prerequisites.
- Add one course or missing courses in a term to existing Subjects. No automatic enrollment or invented lecture content. Existing course codes are skipped.
- StudyFlow home has a shortcut to curriculum planning. Original subject-neutral learning workflows remain in place.
- Added Study Paper, Forest Night, Midnight Blue and Warm Sand themes.
- Navigation spacing, grouping and mobile curriculum layout improved.
- The curriculum is a reference template; learners may still add any subjects manually.
- Browser/Gemini and multi-device synchronization tests are still required before replacing a production deployment.


## v23 — On-demand Lecture Practice & Local Smart Scheduling
- In Lectures, open a lecture, choose question type, count, and difficulty, then press Generate. Only this click calls Gemini. Review the generated questions and answers before saving as a reusable Problem Set. AI answers are provisional.
- On Today, Smart Schedule generates a local preview from recorded priorities, due cards, and unfinished existing sessions. Save explicitly to Calendar. No Gemini request. No guessed clock times.
- Save/reuse is free of additional API calls. Do not regenerate unnecessarily.
- Manual export and backup before deployment. Live browser, API, and cross-device tests still needed.

## v24 appearance sidebar
Sidebar displays only seven favorite theme swatches in a single row. Customize the seven in Appearance; the full theme catalog remains available there.


## v25 Tutor and sidebar fixes
- Fixed Ask Tutor blank screen caused by referencing `ready` before its `useState` declaration.
- Increased available desktop sidebar navigation height and compacted spacing without changing stored data.
- Updated service worker cache version to v25.

## v26 — Curriculum organization and safe bulk cleanup
- Subject selector now groups prospectus subjects by academic term, with custom subjects in their own group.
- Curriculum view supports an optional missing-only filter and a status selector (planned / taking now / completed / on hold).
- Bulk cleanup removes **only empty subjects tagged as prospectus imports**, after confirmation. It intentionally does not remove subjects with saved learning content. Export data before bulk deletion, particularly when syncing between devices.
- Curriculum cards use a more readable responsive layout. No Gemini requests are added.
- Planned enhancement (not included): subject-specific practice templates and a redesigned study-tools navigation.


## v27 Navigation and UI refresh
- Collapsible grouped sidebar navigation (Home, Learn, Practice, Progress, Plan & organize).
- Search tool names or navigation groups; selected page stays visible when searching.
- Home quick-launch tiles for StudyFlow, Practice, Lectures, Flashcards, AI Tutor, Schedule.
- Compact workspace toolbar showing current section and selected subject with direct Ask Tutor and Quick Add actions.
- Theme-aware responsive styling, existing seven-theme favorites retained.
- No change to subject data, saved study records, Gemini settings, or GitHub sync schema.


## v28 Study Toolkit
Added Notes (local browser storage, export Markdown and print/PDF), calculator, debit/credit worksheet, formula book, and focus timer in one organized Toolkit page. Notes/formulas are device-local and NOT part of GitHub synchronization or the main backup. Export them separately. Printing uses browser Print > Save as PDF. Existing grade report already had PDF printing.


## v29 — UI focus
- Removed duplicate desktop sidebar Quick Add; top toolbar remains. Mobile quick-add FAB remains.
- Simplified Concept Vault primary actions: Add Card and Review.
- Moved selection and duplicate controls into a collapsible Manage Cards section.
- Preserved existing cards, rating logic, filters, drill, and deletion confirmation.
- No new retention algorithm or sync changes in this release.

## v30 — Foundation & Print
- Study Toolkit > Solve & Review records an independent or assisted attempt, correction, and a delayed retry reminder (1 day if assisted/incorrect, 3 days if independent). This is a local practice log, **not** a verified adaptive mastery engine or automated answer checker. Saved attempts are local browser data, with a per-subject JSON export button.
- Print / PDF for toolkit notes and formulas uses an A4 print-friendly document, line wrapping, safe text insertion and page margins. Accounting worksheets print as a proper table with repeated header and row break protection. Browser print dialog provides Save as PDF; long unbroken formulas may still wrap, and print rendering depends on the browser.
- Sharing: the deployed GitHub Pages application is client-side. Sharing its URL does not grant write access to the owner's GitHub repository, but viewers can interact with their own local copy; this is **not** a true read-only viewer. Do not publish private synced content, credentials or personal study records. A safe classmate sharing experience requires a separate sanitized, read-only published site or backend access control.
- Existing data keys remain unchanged. No automatic integration of v30 practice log with GitHub sync. Export backups before upgrading. Live browser, GitHub sync, and PDF visual tests remain outstanding.


## v31 print and navigation patch
- Prevents oversized problem sections from being pushed to the next page in PDF output. A4 portrait and table row pagination improvements.
- Adds Print / PDF inside individual lectures. Existing problem-set print buttons remain available.
- Maps existing subject codes to prospectus terms in the selector without modifying subject records.
- Adds a Toolkit error boundary and safer parsing of local toolkit data; if a runtime failure remains it displays the error instead of a blank area.
- Note: this patch has not been visually validated in the user browser.


## v32 — Verified Toolkit render correction
- Fixed misplaced closing parenthesis in ToolkitView: the root React element was prematurely closed after Notes, leaving subsequent tool branches in a comma expression whose final result was `false`.
- All six tool panels now belong to the root element.
- Verified by directly executing the component with mocked React hooks: before patch return was `false`; after patch root element contains 12 children.
- Retains v31 print formatting and curriculum grouping changes.
- No new PDF export for quizzes or Concept Vault in this release.
- Do not clear site data. Back up before deployment.

## v33 — Toolkit Plus (2026-11-18)
- Added handwriting canvas for touch, Apple Pencil, stylus, and mouse. Each subject has multiple local pages; pages can be exported as PNG or printed to PDF. Canvas is freehand, not text recognition.
- Added a curated, searchable formula library with worked accounting examples, plus user formulas.
- Added Classmate Publisher: select subjects and categories (lectures, cards, problem sets, typed notes), optionally include answers, then download a self-contained, static HTML handout or print it as PDF. It excludes grades, API keys, chat history, and mastery statistics. This is **not live role-based permission control**: previously distributed copies cannot be revoked.
- Added a Toolkit-only JSON export for local notes, formulas, attempts, and handwriting pages. This is export-only; there is no automated restore/sync for those records yet.
- Improved shared print styles and Toolkit PDF typography; printing still depends on the browser and has not been visually verified in every case.
- Existing local storage keys and primary data were not reset.


## v34: Print Markdown formatting
- Render Markdown tables, bold text and lists in Classmate Publisher exports and Toolkit print views using the existing safe parser.
- Refine table and page-break print CSS.
- This is **not** live account-based classmate permissions; that requires an authenticated backend.


## v35: Handwriting tools
- Added pen/eraser, straight line, arrow, rectangle, and ellipse drawing modes.
- Added per-page undo and redo (up to 30 recent changes); snapshots saved after each completed stroke or shape.
- Preserved the existing `bsa_ink_v33_<subjectId>` storage key and PNG/PDF export.
- Undo/redo history is session-only; completed page images persist locally.
- Account-based classmate sharing remains unimplemented; Supabase/Firebase are possible external backends with usage-limited free plans.

## v36 — Sharing and Study Toolkit improvements
- Share Dashboard exports a **separate navigable read-only HTML snapshot** with a single general permission profile (selected subjects, selected material types, answers on/off). Publish that HTML to your existing GitHub Pages repository to get a shareable link. This is not authenticated access control and cannot revoke downloaded copies. Only explicitly selected content is included; review before publishing.
- Classmate export now includes a quizzes option (where quiz question data uses the expected fields), alongside lectures, flashcards, problem sets and typed notes.
- Handwriting adds page renaming, paper guide styles and Ctrl/Cmd+Z shortcuts in addition to existing shapes and undo/redo. Export important notes separately.
- Toolkit adds a T-account builder using the Worksheet's account rows; it is a visual summary, not a full posting engine.
- Printable Toolkit and handout materials use a consistent sans-serif print typeface; Markdown tables and bold are parsed through the existing Markdown renderer. Dedicated export buttons on every existing quiz and flashcard screen are not yet implemented.
- Back up existing data before deploying. This release was syntax/ZIP checked but not browser-tested on a physical iPad.


## v37 additions
- Handwriting: T-account and double-line tools; page-name search and modified timestamps for newly saved pages. Existing image-backed pages remain compatible.
- Mistake Notebook, Smart Review Queue, Exam Simulator, Accounting Practice Workspace, and Mastery Tracker are available under Study Toolkit.
- Review records use localStorage key `bsa_retention_v37`; journal practice uses `bsa_journal_v37_<subject-id>`.
- Exam grading uses exact text comparison, not semantic equivalence. Mastery reflects self-reported review ratings.
- Sharing and PDF print formatting remain from v36; not all individual quiz screens have dedicated PDF export buttons.
- Handwriting remains image-backed (not editable individual vector strokes); undo/redo applies within the current session.


## v38 — Stability and exports
- Exam grading normalizes case, whitespace, trailing punctuation, peso signs, commas and equivalent numeric values; paraphrases still need manual review.
- Review Queue and Exam Simulator have dedicated printable/PDF sheets with escaped Markdown rendering and A4 layout.
- Handwriting pages can be backed up/restored as JSON; page deletion added. Existing PNG/PDF and undo/redo retained.
- This does NOT implement editable vector stroke history, comprehensive cross-device sync, or automatic detection of all quiz errors. These remain pending.

## v39 review integration
- Import subject flashcards into the spaced review queue without duplicating exact question text.
- Save incorrect Exam Simulator responses as scheduled mistake-review entries.
- Print accounting journal practice to PDF via browser print.
- Remaining work: editable vector handwriting, comprehensive PDF buttons, automatic integration across all quiz/problem-set workflows, cross-device synchronization, and live iPad/browser testing.


## v40 transaction journal
- General Journal now stores individually dated, described, balanced transactions per subject in localStorage (bsa_toolkit_transactions_v40_<subjectId>).
- Saved transactions can be edited/deleted, exported as JSON, and printed. T-account ledger summarizes saved entries only.
- Existing v37 separate accounting practice journal remains unchanged.


## v41 Review and printing integration
- Smart Review Queue: import all subject flashcards, problem-set questions, and assisted/incorrect Solve & Review attempts. Duplicate questions are skipped.
- Exam Simulator: printable blank exam, as well as existing results printout.
- Mistake Notebook: printable corrected mistakes and CSV export.
- General Journal printout uses a real Markdown table per dated transaction instead of pipe-delimited prose.
- Still pending: fully editable handwriting strokes, automatic event-driven mistake capture from every legacy quiz, secure automatic cross-device sync, per-screen PDF exports, full browser/iPad regression tests.

## v42
- Handwriting notebook: print a single page or the entire subject notebook to paginated A4 PDF, including page titles and last-modified timestamps.
- Existing v41 tools retained. Full backlog (editable vector strokes, cloud sync, comprehensive PDF coverage, real-device tests) remains incomplete.

## v43 — Handwriting page organization and fullscreen
- Searchable, sortable page sidebar (recent, oldest, name, original order), with selected page and modified timestamps.
- Fullscreen writing mode and Escape to exit, with sidebar hide/show.
- Existing per-page local storage, exports, tools and backups retained.
- Canvas still stores flattened images, not editable vector strokes.


## v44 notebook maintenance
- Duplicate a handwriting page while preserving its current canvas snapshot.
- Move handwriting pages up or down in original order.
- Wait for notebook images to load before triggering multi-page printing.
- Constrain single-page printing to A4 printable height.
- No changes to existing localStorage keys or previous page images.
- Outstanding: vector-editable strokes, universal quiz interception, automatic cross-device sync, and physical iPad testing.

## v45 — Concept Vault PDF exports
- Added two dedicated Concept Vault print actions for the currently filtered cards: questions-only and questions with answer key.
- A4 layout with Markdown rendering and table support; no data migration.
- Remaining work: editable ink objects, other per-screen exports, broader auto-mistake capture, cross-device sync, and device regression tests.


## v46 — Lecture review queue integration
- Smart Review Queue can import each lecture's self-check questions, skipping existing identical prompts per subject.
- Review PDF printing prevents splitting table rows and repeats table headers on printed pages.
- Hardened numeric journal parsing against non-finite input.
- Local-only storage and previous features retained.

## v47 automatic exam review
- Missed answers are automatically imported into the Smart Review Queue when the exam is submitted or the timer expires. Duplicate questions are skipped.
- Auto grading remains exact/normalized and may flag equivalent conceptual paraphrases; review them manually.
- No change to saved notebook image format or sharing architecture.

## v48 Journal portability and individual PDF exports
- Per-transaction print/PDF action in saved General Journal entries.
- Export journal as spreadsheet-friendly CSV with UTF-8 BOM.
- Restore subject journal from validated JSON backup (confirmation required, no silent overwrite).
- No new hosting service. Editable handwriting strokes and cross-device sync remain pending.


## v49 — Unified study-data backup and restore

Study Toolkit now offers **Backup all study data** and **Restore all study data**. The backup includes the dashboard subject records, handwritten pages, typed notes, review queues, journal entries, formulas, and other local `bsa_` / `bsa-` study records. It intentionally excludes dashboard settings, API keys, GitHub sync credentials, and authentication data. Restoration validates the file and requests confirmation before replacing matching local records, preserving existing dashboard settings. Keep the JSON backup private and export your current data before restoring. Cross-device use is manual export/import, not automatic synchronization.

## v50 — Mock Exam PDF
- Added dedicated questions-only and answer-key PDF printing to the Mock Exam result screen.
- Printed answer keys include responses, correct answers, explanations and traps where available.
- Questions-only print includes space for handwritten answers.
- Use the browser Print dialog to save as PDF.

## v51 — Problem-set PDF controls
- Problem-set toolbar: Print filtered and Filtered answer key use the active All / Not tried / Missed / Got it filter.
- Each problem now has PDF and PDF + key controls, printing only that problem.
- Existing full-set print controls are unchanged.
- No localStorage schema changes.

## v52 — Toolkit PDF coverage
- Mistake Notebook can print saved mistakes with solutions and learning points.
- Mastery Tracker can print a subject-by-topic mastery report.
- Both exports use the existing browser print/Save as PDF flow and do not change saved data.

## v53 — Automatic computation mistake capture
- Incorrect answers in Practice → Computation drills are saved immediately in the Mistake Notebook.
- Saved record includes question, attempted answer, correct answer, worked steps, and topic where available.
- Duplicate active mistakes from the same drill are suppressed.
- Existing study data schema and prior exports remain compatible.

## v54 — Filtered formula PDF
- Formula Library now has a Print matching formulas / PDF button.
- The PDF includes only formulas matching the current search and their available usage steps and worked examples.
- Existing per-formula and complete-library printing remains intact.

## v55 — Consolidated review and accounting safety
- StudySession flashcards marked Again and problems marked incorrect now create deduplicated Mistake Notebook records immediately.
- Accounting Practice Workspace validates negative/invalid amounts, missing account names, double-sided lines and debit/credit totals.
- Balancing is explicitly described as arithmetic validation, not proof of correct classification.
- No destructive migration of handwriting pages. Full vector editing is still pending.
- Physical iPad testing has not been performed.

## v56 — Non-destructive editable shape layer (partial)
- Newly created line, double-line, T-account, arrow, rectangle and ellipse shapes are stored as vector objects per notebook page.
- Select mode permits moving and deleting new shape objects after saving.
- Legacy raster handwriting is preserved and remains non-selectable.
- Individual page PNG and PDF exports composite the current page's vector shapes.
- The all-pages print path composites only the currently open page's vector objects; other pages retain their saved raster snapshots. Full notebook-wide vector rendering is pending.
- Pen strokes remain raster and cannot be individually selected.
- Browser/iPad runtime testing remains outstanding.

## v57 — Notebook shape handling fixes
- Print all pages now composites saved vector shapes for every notebook page, not just the active page.
- Clear page removes both raster ink and vector shapes after confirmation.
- Select-mode drag pointer capture moved to the SVG parent to follow pointer movements.
- Enlarge and Shrink actions resize the selected vector shape.
- Legacy raster ink is preserved. Vector pen strokes and vector undo/redo are still pending.
- Syntax checked; no physical iPad test.

## v58 — Vector shape undo/redo
- Added separate Undo shape and Redo shape buttons for newly created vector objects.
- Shape edits (add, move, resize, delete) can be reversed during the current page editing session.
- Dragging records one undo checkpoint instead of one per pointer movement.
- Shape history resets on page or subject change; saved shapes persist.
- Existing raster pen strokes and legacy drawings are preserved.
- Full vector pen strokes and device runtime tests remain pending.

## v59 — Consolidated handwriting upgrade
- New pen strokes are stored as editable vector paths, not permanently flattened into raster snapshots.
- Select/move, enlarge/shrink, delete and vector undo/redo work with newly drawn pen strokes and shapes.
- PNG/PDF export composites raster legacy content and new vector strokes/shapes on all pages.
- Notebook import validates vector shape arrays, preserving legacy PNG backups.
- Print-all resets its loading placeholder before writing the final document.
- Existing raster handwriting remains readable but not individually editable.
- No physical iPad test; this build requires real-device validation before replacing a production copy.

## v60 — Consolidated accounting checks
- Journal editor rejects malformed, negative and >2-decimal amounts before saving.
- Restored journal entries now require exactly one debit or credit per line and cent-precision amounts.
- Saved transactions are audited individually; problematic transaction numbers are shown in the journal.
- T-account ledger adds an unadjusted trial balance summary, with printable and CSV versions.
- Trial balance is arithmetic only: no account-type inference or adjusting-entry correctness claim.
- Browser and iPad interaction tests are still outstanding.

## v61 — Accounting audit safety and reliability
- Invalid saved transactions no longer silently contribute to the T-account ledger or trial balance.
- The ledger explicitly states included/excluded transaction counts and warns that arithmetic balance is not classification verification.
- Each invalid saved transaction displays a review warning.
- Local-storage journal loading rejects non-array/corrupted saved data instead of crashing.
- Trial balance CSV line endings corrected.
- Static syntax and ZIP checks performed; interactive browser and physical iPad tests not performed.

## v62 — Mock exam mistake deduplication
- Repeated misses of the same question and correct answer update the existing active mistake instead of adding another identical active entry.
- Repeat misses are counted, and the most recent wrong answer and date are retained.
- The notebook select tool labels the deletion action clearly for new strokes and shapes.
- Raster eraser does not erase vector objects directly; select the object and use Erase selected stroke / shape.
- Syntax and archive checks only; browser/iPad interaction tests are still pending.

## v63 — Consolidated feature release
- Eraser removes whole editable vector objects under the pointer as well as raster ink.
- Handwriting canvas disables touch scrolling while drawing.
- Per-subject 10-column accounting worksheet with account rows, totals, adjusted-TB reconciliation, validation warnings, CSV and printable report.
- Existing v62 study and mistake tracking features retained. Complete quiz-mode integration not independently audited.
- Legacy raster handwriting remains non-editable. Physical iPad/browser runtime testing not completed.

## v64 — How-To Corner and handwriting zoom
- New searchable How-To Corner in sidebar and home quick links with navigation shortcuts.
- Guides cover handwriting, zoom, PDFs, accounting tools, review, and backups.
- Handwriting zoom supports 50–300%, plus/minus, reset. Zoom changes on-screen display only, not exported resolution.
- Paper area scrolls to pan around zoomed notes.
- Browser/iPad runtime behavior still needs testing.

## v65 — Pen size slider and AI Dashboard Guide
- Handwriting pen size is now a 1–24 px slider with live numeric value and reset.
- Existing Gemini-powered Ask page adds Dashboard Guide mode with a fixed, versioned navigation map; the AI can answer questions about where to find features.
- How-To Corner includes a shortcut to Ask in Dashboard Guide mode.
- Gemini connection/API key is required; no AI service is bundled, and no private notes are sent in Dashboard Guide mode.
- The dashboard guide cannot inspect live UI or take actions; it may be mistaken about unsupported details.
- Syntax and ZIP integrity checked, browser/iPad behavior not physically tested.

## v66 — Personalization
- Home page now greets John Angel, including when no topics are configured.
- Dashboard Guide AI is told the preferred name John Angel.
- No study data was modified.

## v67 — Shared Website Permission Manager
- Share Dashboard includes permission switches for public materials, print/PDF, private browser notes, personal flashcards, and practice scratchpad.
- Export Shared Dashboard now downloads index.html for the separate `bsa-study-desk-shared` GitHub Pages repository.
- Open Shared Dashboard website link targets https://ghostbymegumiacorda.github.io/bsa-study-desk-shared/.
- Switch changes require re-export and redeployment. GitHub Pages is static hosting, so switches do not remotely revoke content or synchronize.
- Classmate notes, cards, and practice scratchpad are stored only in their own browser localStorage.
- Shared submissions are disabled without secure authentication/backend. Public material should be reviewed before publishing.

## v68 — GitHub publishing from the personal dashboard
- Share Dashboard now offers Publish selected materials & permissions.
- GitHub API updates index.html in ghostbymegumiacorda/bsa-study-desk-shared; existing SHA fetched before update.
- Fine-grained GitHub personal access token must be manually supplied each session and limited to the shared repository (Contents read/write). It is held in React memory only, not persisted or exported.
- Publish is explicit, not automatic on every save. GitHub Pages deployment follows the commit; allow minutes for propagation.
- Create shared repository and configure GitHub Pages main/root before publishing.
- Classmate personal data remains in each browser. No secure real-time permissions or multi-device student sync.
- SECURITY: A token entered into a website can be stolen by malicious scripts or extensions. Use a short-lived, repository-scoped token; revoke it if exposed. Never include it in HTML or public files.

## v69 — Pinch zoom and paper panning
- One-finger touch pans the handwriting paper; two-finger pinch zooms from 50% to 400% with viewport anchoring.
- Pen/stylus pointer still draws. Optional Finger draws toggle enables one-finger writing; switch it off for panning.
- Zoom buttons preserve the center of the visible paper and exports retain the original 1100×1500 coordinate system.
- Existing handwriting data model unchanged. Back up notebooks before upgrading.
- Live iPad touch testing has not been performed; verify gestures and stylus behavior before relying on this release.

## v70 — Readable PDF export styling
- Shared A4 print design: stronger typography hierarchy, green section bands, table header shading, row striping, generous spacing and print-friendly page breaks.
- Branded heading treatment for lecture notes, problem sets, study sheets and general print exports.
- Handwriting single-page and all-pages PDF print layouts have clearer titles and metadata.
- PDF export still uses the browser Print / Save as PDF dialog. Enable Background graphics to reproduce the subtle shading, if desired.
- Content is unchanged; this is a presentation-only update. Actual printer and iPad rendering have not been visually verified.

## v71 — Personalization Corner and PDF signature
- Personalization Corner in Home navigation and sidebar tools.
- Editable name, block, program, school, and text sign-off; preview and toggles for which identity fields appear on exports.
- Defaults to John Angel / ACC. Profile is browser-local and not included in the shared classmate website.
- New PDF exports display a Prepared by identity strip instead of the former generic footer/link.
- Added identity treatment to common print flows including problem sets, study sheets, journal/general print and handwriting.
- Fixed a pre-existing syntax error in the handwriting multi-page print CSS string (unescaped quote).
- Save your study data backup before updating. Test printing on your browser/iPad.

## v72 — Handwriting selection and two erasers
- Select / Move supports touch, Apple Pencil and mouse: tap a vector stroke/shape and drag; selection remains indicated.
- Hit testing now follows the actual stroke or shape more closely, rather than a broad rectangular bound.
- Stroke eraser deletes entire editable vector strokes or shapes.
- Pencil eraser rubs out raster pixels; older flattened ink is not individually selectable.
- Pen, zoom, PDF and personalization features retained. Test on iPad before class; back up notebooks before replacing.

## v73 — Full shared interface
- Publishing now exports the full personal app shell, not the former summarized HTML viewer.
- Selected subjects, topics, lectures, cards, quizzes, and problem sets are seeded into the full interface.
- Read-only guards prevent changing published subject records and editing through the primary editor.
- Personal grades, mistakes, sessions, streaks, and mastery data are excluded.
- Publishing token remains only in the private browser session.
- Some local practice tools can still store their own separate local data; the read-only guarantee concerns published records, not local exercises.
- The original personal site remains unchanged; republish once to replace the old shared index.html.
- Browser-level end-to-end tests are still required.

## v74 — Custom problem set PDF selection
- Added Customize PDF to problem set view. Pick individual problems, Select all, Clear all, Missed only, or enter numbers/ranges like 1-5, 8, 12.
- Optional answer key and solutions; preview uses the existing branded print template.
- Existing full-set and filtered print actions remain.
- Physical PDF page numbers can still be selected in the browser's print dialog.
- JavaScript syntax checked; interactive browser/iPad tests not performed.

## v75 — Customize PDF dialog display fix
- Reused the app's existing `.backdrop` modal overlay CSS rather than an undefined `.modal-overlay` class.
- Increased custom PDF dialog width and added internal padding for controls.
- Added explicit button type to prevent accidental form submission.
- Existing problem range and solution selection options unchanged.

## v76 — Separate read-only Study Library
- IMPORTANT: Replaces the v73 full-dashboard clone. That clone retained unrelated app controls and created confusing shared/local behavior.
- Shared website is now a self-contained, read-only Study Library containing ONLY selected subjects' lectures, quizzes, and problem sets.
- No personal app source, localStorage, subject creation, appearance settings, progress, grades, private notes, flashcards, or publisher controls are included.
- The public website has subject navigation, Lectures / Quizzes / Problem sets filters, and optional Print / Save PDF.
- Publish again from the PERSONAL dashboard using GitHub token to replace the existing shared index.html. Old shared website remains online until this new version is published.
- This release does not modify or remove any records already saved by the previous shared website. Back up the personal dashboard and check URLs if data appears in both.

## v77 — Handwriting eraser and shape rendering fixes
- Pencil eraser removes editable vector strokes under the eraser and also clears older raster ink using destination-out, not white paint.
- Stroke eraser removes touched sections of vector strokes, and removes whole geometric shapes.
- Shapes render their live preview on a separate transparent canvas with requestAnimationFrame; no full-canvas getImageData/putImageData per move.
- New pen strokes draw to a temporary canvas and are stored only as editable vectors; existing pages remain compatible.
- Undo shape snapshots are captured once at eraser pointer-down.
- Back up handwriting before upgrading. Browser/iPad physical testing not completed.

## v78 — Full navigation, read-only published dashboard
- Publishing uses the full personal dashboard HTML shell rather than the simplified study library.
- Published snapshot includes selected subjects with lectures, quizzes and problem sets ONLY; no grades, notes, flashcards, private settings, sessions or mistakes.
- Central document mutations, editor opening and settings updates are blocked in read-only mode; edit-only buttons are intercepted while reading/navigation and PDF buttons remain available.
- The public site is rebuilt when Publish is clicked. It is not an authenticated permissions system; any data deliberately published is public.
- IMPORTANT: interactive iPad and GitHub Pages browser tests are not completed. Test in a private/incognito browser and verify no changes to the personal dashboard.

## v79 shared publish fix
Insert bootstrap and read-only guard at the actual closing HTML tags, not earlier string literals inside the dashboard JavaScript. Re-publish the shared site after uploading v79 to the personal repository.


v81: NotebookLM math expressions (inline/display fractions and labels) and more resilient JSON candidate extraction. Supports common math notation; complex LaTeX is not a full KaTeX renderer.
