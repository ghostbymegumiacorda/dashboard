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
