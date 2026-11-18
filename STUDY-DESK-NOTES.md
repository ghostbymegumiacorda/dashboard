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
