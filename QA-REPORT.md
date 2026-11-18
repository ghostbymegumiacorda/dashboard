# BSA Study Desk v101 — QA and Remaining Verification

## Checks completed in this environment
- `node --check` of the complete primary application script: PASS.
- Shared publisher compatibility string guard presence: PASS (16 required replacements present).
- Shared-snapshot unit test: PASS. No leaked flashcard confidence/date, lecture completion, private mistake-linked answer, or problem completion/attempt date; teaching questions and answers retained.
- Unified backup/restore unit tests: PASS. Filters out `bsa_gh_` credentials and `bsa_sync_` metadata, filters visitor-only `bsa_shared_v67_` notes, accepts legacy plaintext keys, rejects protected keys and malformed core dashboard records, preserves current local settings.
- ZIP integrity validation: PASS.

## Not verified
- Desktop Chromium end-to-end and mobile emulation: BLOCKED by execution environment. Chromium navigation to both `http://127.0.0.1` and `file://` returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. No browser smoke test can be claimed.
- Physical iPad and Apple Pencil latency, touch and palm rejection: not testable here.
- Actual GitHub Pages service worker update and personal/shared publication: not deployed or browser-tested.
- Accuracy of previously recorded study time or XP: historical data cannot be independently reconstructed.

## Safe rollout checklist
1. On the **current** website, export `Backup all study data` first. Save the JSON offline.
2. Replace the repository files using this ZIP; do **not** delete browser local storage/site data.
3. Test Home, subject switcher, Flashcards, Problem Sets, Lectures, Toolkit, focus timer and Academic Progress.
4. Check Import/Export backup download and test restore only after keeping a separate backup; reloading after restore is expected.
5. If using shared publishing, inspect a generated shared export before publishing and verify no personal progress or notes are included.
6. On iPad, check Pencil strokes, finger scrolling, page switching and whether handwriting persists after reloading.

## Design notes
The recorded-time audit compares `subject.days[].mins` against completed `subject.sessions[].mins`. They are different accounting views: Pomodoro rounds can be recorded in days without corresponding completed-session entries, so differences are informational, not automatic errors. No historical minutes or XP are changed by v101.
