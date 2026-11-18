# BSA Study Desk v103 — QA status

## Verified with automated/static checks
- Main inline JavaScript passes `node --check`.
- Service-worker JavaScript passes `node --check`.
- ZIP integrity check succeeds.
- Unified backup requires the main dashboard record and refuses a malformed main JSON record.
- Unified backup excludes shared publisher local storage keys and credential-like keys.
- Restore validates top-level subjects and academic progress before any writes.
- Restore retains its rollback attempt if any write fails.
- The error screen includes a diagnostic report that excludes record content and credentials.

## Remaining external/device checks — NOT completed
- End-to-end browser startup/navigation; headless Chromium did not produce an accessible DOM in this environment.
- Actual GitHub Pages deployment and cache refresh on the user's domain.
- Safe backup-and-restore dry run against a COPY of the user's real browser data.
- iPad/Apple Pencil latency, palm rejection, and persistence under real usage.
- GitHub sync and public publisher interaction with user accounts.
- Historical study-time validation; prior time entries cannot be established as genuine by examining HTML.

## Safe verification procedure after upload
1. Back up current data from the old dashboard; store the file offline. Do not clear site data.
2. Upload every packaged asset. Reload with a hard refresh.
3. Confirm Home, Flashcards, Problem Sets, Lectures, Toolkit, and Statistics render.
4. Create a disposable subject, review one card, and create a disposable practice item. Confirm persistence on reload; remove only the disposable records.
5. Download complete backup; check exported JSON contains dashboard and relevant academic/Study Life records but no credentials.
6. Test restoring a copy only in a disposable browser profile, not over your live study record.
7. On iPad, test Pencil strokes and switching notebook pages before doing extended work.
8. Open the shared dashboard in a clean browser profile and confirm it cannot change the personal dashboard's records.
