# BSA Study Desk v102 — Validation Summary

## Passed (code-level)
- Node JavaScript syntax checks for main application and service worker.
- Home render-path assertions for companion widget (both blank and populated subjects).
- Subject-transfer JSON excludes global settings and sidecar XP/Study Life exports.
- Unified backup/restore validation and rollback code remains in place; strengthened XP and Study Life import checks.
- Representative corrupt-XP dataset: malformed entries filtered in memory, valid 10 XP yields 20 coins.
- Scoped service-worker cache naming; revised deep links.
- ZIP integrity check.

## Still pending
- Actual GitHub Pages deployment and browser startup/navigation/save checks.
- Full backup/restore test with a copy of the user's own data (must never overwrite original without an offline backup).
- iPad/Apple Pencil timing, palm rejection and handwriting persistence.
- Accuracy of previously recorded study minutes: cannot verify retroactively from code alone.
- End-to-end testing of third-party sync/publishing with connected accounts.

## Important distinction
- Complete study backup: recommended private export covering matching study-storage keys, excluding credentials/visitor-only notes.
- Subject-transfer JSON: includes subject records and may contain private notes, grades or attempts. Do not post it publicly.
