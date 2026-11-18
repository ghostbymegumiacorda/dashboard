BSA Study Desk v88 — Pending games and UI polish

Added playable Sudoku (two puzzles with answer checking) and Minesweeper (8×8, 10 mines, flood reveal, flags via toggle or right click), alongside existing 2048 and Memory Match. Added responsive game layout and consistent Break Corner navigation. Corrected Academic Progress copy: unified backup already includes the bsa-academic-progress-v1 localStorage key. Break games do not award XP.

Still pending: verified XP rewards for flashcards, quizzes, and problem sets; full study-time audit; end-to-end shared-site read-only publishing verification; live browser/iPad QA. This release does not claim those features are fixed. Export a unified backup before deploying.


## v89 — pending XP integrations and foreground study-time fix
- Review queue: +3 XP per unique flashcard per local day, capped at 45/day.
- Problem sets: +30 XP on first completion (all problems marked), capped at 90/day.
- Achievements for 100 unique cards and 10 completed sets.
- Focus timer now logs foreground active minutes instead of elapsed wall-clock time; break time excluded.
- XP ledger is separate from study-time totals and included in unified JSON backup.
- Pending: quiz XP (different quiz flows require validation), complete historical study-time audit, live browser/iPad tests, and shared-publishing/read-only audit.


## v90 — Consolidated pending-work pass
- Added XP for completed Exam Simulator quizzes: at least five questions, at least 80% attempted; 20 XP, max 60 quiz XP/day, once per identical question set per day.
- Added Quiz Finisher achievement for five eligible exams.
- Retained existing v89 focus-time foreground tracking, targeted study-time reset, academic ranks, flashcard and problem-set XP, and Break Corner games.
- The shared publisher still requires a live authenticated GitHub publish; a code review or local test does not verify deployment or all read-only paths.
- Historical study-time records are not automatically rewritten or fabricated. User can use the targeted reset after backup.

## v91 — Shared publisher correction and verification notes
- Removed an impossible shared-export compatibility assertion: the exporter first replaced the navigation declaration, then demanded the original declaration still exist. This caused publishing to fail before upload.
- Removed redundant no-op compatibility checks and clarified publisher failure text.
- Kept XP and study-time records isolated, with existing quiz rewards and study games.
- Attempted Chromium browser smoke tests, but the environment blocks both local HTTP and file:// navigation (ERR_BLOCKED_BY_ADMINISTRATOR). These are not passed tests.
- A real GitHub publish requires repository permissions and an authorized token. No live deployment was performed.
- Historical records cannot be independently verified from the application source. Export backup and use targeted study-time reset if appropriate.

## v92 — Consolidated HTML changes (no live tests requested)
- Standardized minimalist chrome, panel radii, sidebar scroll, keyboard focus and responsive spacing.
- Added a visible recorded-study-time audit by subject; the audit distinguishes saved historical minutes from validated active time. Historical minutes cannot be reconstructed without source events.
- Added shared-export guards for floating Quick Add and sync controls, and explicitly restricted shared navigation to Flashcards, Problem Sets, Lectures, Study Toolkit.
- Shared export still needs an authorized GitHub publish by the owner; this ZIP does not deploy itself.
- No browser/device tests performed, at the user's request. No claim of full verification.

## v93 — Sidebar duplication and decorative UI
- Removed the duplicate Personalization Corner button from the bottom utility area; the main Home navigation entry remains.
- Refined sidebar visual hierarchy, active navigation accent, brand, tool footer and Home cards with restrained lavender/mint decoration.
- Reduced-motion preference is respected.
- No live browser testing performed per request.

## v94 — Enjoyable Study Space
- New My Study Space section: Study Garden, Daily Quests, customizable Study Room, collectible badges.
- Four new Break Corner games: Snake, Word Guess, Nonogram, Bubble Pop.
- All break games are separate from XP and study-time totals.
- Room preferences save in a separate localStorage key (`bsa-joy-v1`). Existing academic records and study-time data are not migrated or overwritten.
- Garden, quests, and collectibles derive from existing eligible academic XP history.
- No live browser/device tests performed per request. This update is not deployed to GitHub Pages.
- Important: Room preferences are stored locally and are not yet included in the unified data export; retain the browser's site data when upgrading.

## v95 — Study Life integrated into the personal dashboard
- New Study Life navigation entry with Cozy Room, Avatar, Market, Pets, and Inventory tabs.
- Study Coins are earned from the existing capped academic XP ledger at 2 coins per XP. Break Corner activities grant no coins or XP.
- Market sells room decorations, outfits, pets, and food. Purchases, inventory, coin spending, and pet status persist locally.
- Pet care: happy for 24 hours after feeding, hungry at 24h, weak at 48h, passed away at 72h. Revival costs 80 coins; no academic data is removed. Food costs 20 coins.
- Avatar appearance and outfit choices are saved, with a lightweight emoji character representation (not bespoke pixel-art sprites).
- Unified full-subject JSON export now includes academicProgress, studyLife, and studyJoy; Replace everything restore imports those optional fields. Older backups remain accepted.
- Repaired a preexisting malformed My Study Space component that prevented JavaScript parsing in the v94 source.
- Existing academic XP and study-time records are not modified by purchases or pet care.
- No browser or iPad interaction testing was performed. Uploading the ZIP does not automatically deploy it.

## v96 — Study Life expansion
- Added compact Study Life widget to both Home layouts with coins, pet status, food reserve and room shortcut.
- Added Study Town with five unlockable places based on lifetime earned Study Coins; visiting does not spend currency.
- Added Seasonal Collections with four permanent progress-based cosmetic keepsakes.
- Added pet food quick-navigation and approximate next-hunger-stage countdown.
- Room now changes to a night palette based on the device's local hour.
- No study XP, academic grades or time records are changed by these additions.
- Existing Study Life state is reused without resetting purchases, pets, or avatar.
- This is a lightweight HTML/emoji implementation, not a sprite-based simulation; no automatic pet-care notifications outside the app.
- Syntax checked; live browser and iPad tests not performed.

## v97 hotfix
- Fix Home render crash in v96: declare `lifeWidget` before rendering it.
- Does not reset or migrate any user data.
- JavaScript syntax checked; no live browser test performed.

## v98 Mobile, handwriting and Study Life repairs
- Mobile feature tabs scroll horizontally instead of clipping. Sidebar navigation scrolls on smaller screens.
- Handwriting defaults to direct finger/stylus drawing; two-finger pinch and movement operate without a pan toggle.
- Handwriting undo/redo buttons now cover vector strokes and raster history (vector history takes precedence); separate shape undo buttons removed.
- Notebook toolbar and paper layout visually refined.
- Replaced Study Life's emoji human avatar with a lightweight customizable CSS pixel student.
- Study Town locations now open their own simple illustrated scene with return navigation rather than only a toast.
- No academic records, XP, or study time intentionally changed. No live mobile or Apple Pencil verification; export backups before deploying.

## v99 — Illustrated pixel-art avatar update
- Replaced CSS block avatar with four original illustrated pixel-art sprites (front, walking, back, happy), inspired by the user-provided style reference.
- Added pose picker to avatar preview and sprite integration in Study Room and Home widget.
- Existing avatar appearance settings remain stored but do not recolor the fixed illustrated sprites yet.
- New PNG assets must be uploaded beside index.html.
- Academic data, XP, coins, pet records and study-time logic are unchanged.
- JavaScript syntax checked; not device/browser tested.

## v100 — Academic dashboard stability and workflow repair
- Removed duplicate decorative Home dashboard layer; retained original subject-aware HomeView.
- Added four immediate academic action cards to Home (flashcards, problem sets, lectures, accounting toolkit).
- Reorganized sidebar sections: Study Life/Break Corner under Personal, garden and quests accessible via Study Life. No saved tabs or data deleted.
- Fixed misleading Home 'full backup' action to invoke unified study-data export. Added explicit complete backup button and scope warning to Import & Export.
- Wrapped the main application in a recoverable React error boundary with a backup download action; added an explanatory fallback when React CDN files fail to load.
- Updated offline service-worker cache version to v100 and prevented deletion of unrelated site caches.
- Study-time audit remains non-destructive. Earlier totals cannot be retroactively verified; no study minutes, XP or grades were edited.
- Based on the latest available v99 source; retained avatar sprite assets.
- Passed Node JavaScript parsing and ZIP integrity. NOT verified in a browser or on iPad; no claims of runtime correctness.

## v101 — Academic Stabilization and Audit
- Removed redundant My Study Space rail entry; original Study Life tab still links to garden and quests. Stored data remains untouched.
- Home includes a priority recommendation selected from unresolved mistakes, due reviews, unfinished lectures, and practice sets.
- Unified backup now excludes visitor-only shared notes and accepts legacy plain-text study keys, while validating core JSON records before restoring. A failed write triggers rollback of touched keys.
- Time audit now reports saved daily minutes versus completed session minutes; differences can legitimately come from Pomodoro rounds or manual records. Historical minutes are never rewritten automatically.
- XP and derived coin totals ignore negative/non-finite legacy records without altering history.
- Small-screen layout fixes for review panels, tables, and responsive touch canvases; reduced-motion styling.
- Updated service-worker cache version to v101, with application scope isolation.
- No changes to academic scores, saved time, subjects, pet status, unlocked items or purchase history.
- Real-browser smoke tests recorded separately. iPad/Apple Pencil hardware testing is not possible here; browser emulation is not equivalent.

- Read-only publisher snapshot now strips private flashcard recall ratings, lecture completion, problem attempts, their review timestamps, and mistake-derived personal answer notes. Shared localStorage isolation now fails closed.
- Browser-test limitation: Chromium launches, but both local HTTP and file navigation are blocked by this execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). This release does NOT claim end-to-end browser or iPad validation.
- Follow-up security fix: Unified backup explicitly excludes GitHub sync credential keys (`bsa_gh_*`) and sync metadata (`bsa_sync_*`); verified in Node unit tests. See QA-REPORT.md.

## v102 — Reliability follow-up
- Home: Study Life companion widget now renders consistently on both populated and blank-subject Home paths.
- The subject-transfer JSON no longer includes global settings, XP ledger, coins or Study Life; it may still contain sensitive subject-level notes, grades and attempts, so keep it private. Complete backup still captures all eligible study-data keys.
- Unified restore now validates XP event structure, disallows negative XP, and rejects malformed Study Life spend/inventory fields before writing data.
- Progress display ignores malformed events without modifying the saved ledger; coins remain derived from eligible XP, not games.
- Updated deep-link allowlist to include Study Life and Academic Achievements.
- Service-worker caches now use the repository URL scope in the cache name. New releases remove caches in the same scope family only; historical cache names are intentionally not purged across repositories.
- No historical recorded study minutes or grades were changed.
- Code and representative malformed-progress checks passed; no live browser/iPad validation possible here.

## v103 — Data protection and diagnostics
- Excludes ALL shared-publisher local keys from complete personal study backups.
- Prevents a successful-looking unified backup when the main document is missing or malformed.
- Validates restored subjects before modifying any storage.
- Adds a minimal, privacy-aware crash diagnostic export with app version, key counts and error message; no study notes, passwords, or GitHub credentials.
- Avoids non-finite minute totals in the study-time audit.
- Bumps offline cache version.
- NOTE: No live device testing or account-sync integration testing; verification report included.

## v104 — Backup integrity follow-up
- Backup key filter no longer indiscriminately excludes all study-session keys. Auth/login session keys remain excluded.
- Complete backup validates main subjects, rejects duplicate subject IDs and malformed major academic collections.
- Backup JSON now includes a summary of subjects, flashcards, problem sets, lectures and session records.
- Restore requires a main dashboard record and shows a content preview before confirmation.
- No academic record is reset or modified by this release.
- Live browser, GitHub sync and hardware interaction tests still require the actual environment.

## v105 — Legacy Import Safety and Honest Storage Meter
- Complete unified backups are explicitly rejected by the older subject import screen; the user is directed to Study Toolkit → Restore all study data.
- The old subject backup Replace path validates subject IDs and optional XP/Study Life payloads before replacing subjects, and attempts to roll back optional localStorage writes on failure.
- Separated optional progress and room records from the main imported dashboard state. Existing optional records remain unchanged when not present in the import.
- Added a non-destructive “Check backup contents” control to Import & Export.
- Storage meter estimates all eligible study-data localStorage keys, not just the main dashboard; wording no longer claims every browser has a fixed 5 MB quota.
- Updated diagnostics release label and service worker version.
- Live browser/device and real-record restore tests remain pending.

## v106 — Consolidated Dashboard & Study Life workflows
- Consolidated subject-level Academic Overview on Home with due reviews, unresolved mistakes, assessed topic count and observed problem-set accuracy.
- Uses the existing smartTopicStats and learningNextAction ranking to list prioritized weak topics and deep-link to topic Roadmap records.
- Adds a confirmed batch action to turn unresolved mistakes into flashcards; deduplicates by normalized question, keeps mistake history and avoids overwriting grades.
- Added persistent Home presentation preferences (compact layout, show/hide Study Life, show/hide topic insights) in a separate localStorage key.
- Improves mistake-log guidance with a count of matching existing flashcards.
- In Study Life, added non-rewarding pet activities (pet, play, rest) and a left/center/right furniture layout option saved alongside the room state.
- Adds responsive/touch-friendly presentation rules without rewriting existing handwriting or timing data.
- No data migrations or resets. Existing academic progress, study sessions, pets and inventory remain stored in their previous keys.
- These changes complete the actionable dashboard workflow set from the agreed development list in one package. Advanced sprite recoloring, fully walkable town, and externally scheduled seasonal events were not implemented as fully functioning simulations; those are separate, larger product features, not represented as repaired.
- Syntax checked and static markers verified. Live GitHub, cross-browser, iPad and Apple Pencil tests were not performed; no claim of end-to-end verification.


## v107 — Consolidated Study Life completion and UI polish
- Avatar: real CSS-based pixel avatar responds to skin tone, hair color, hairstyle, outfit and owned accessories (with walking/back/happy previews); original PNG assets retained.
- Study Town: walkable/tappable 5×5 town map with directional controls, unlocked location entry, persistent avatar position.
- Room: lamp and plant position selectors; persisted placement; existing desk placement and equipment retained.
- Seasonal events: calendar-season-specific claim button and persistent collectible claims, using existing academic coin thresholds. No remote scheduling or real-money rewards.
- Inventory: displays collected seasonal keepsakes.
- UI: larger touch targets, focus indicators, mobile town layout, reduced-motion handling.
- Academic XP, study-time data, coin balances, purchases, pet feeding and data keys preserved unchanged.
- These are local app features, not a networked multiplayer or 3D animated world.

## v108 — Visual Makeover
- Redesigned desktop and responsive visual hierarchy: lavender/mint accents, card styling, balanced white space, and cleaner typography.
- Reorganized sidebar under Study, Tools, Progress, Plan, and Your Space without removing routes.
- Home now pairs academic priorities with a compact Study Life summary.
- Simplified four academic quick-action tiles, toned down overly dense panels, and collapsed detailed topic insights until requested.
- Existing themes remain selectable. Updated light/lavender skin styling only.
- No changes to saved study data, XP, time, coins, pet status, or backups.
- JavaScript syntax checks only; browser and device rendering not verified.
