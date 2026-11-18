# BSA Study Desk v110 — Spacious App UI Makeover

## Scope
A presentation and app-shell update based on v109. No academic data migration, deletion, reset, or XP/study-time recalculation is included.

## Implemented
- Replaced the compressed web-page presentation with a full-height app workspace on desktop: persistent left navigation rail and independently scrolling main content.
- Expanded sidebar width, subject selector, navigation hit areas, section spacing, and footer controls.
- Reworked the top workspace bar into a sticky app header with a translucent surface, clearer page title, subject context, and larger quick actions.
- Increased spacing, card padding, typography hierarchy, button/input hit areas, and Home dashboard layout proportions.
- Kept the illustrated avatar sprite visible and prominent in the Study Life Home card and existing avatar/room surfaces.
- Added tablet and phone-specific layout rules while retaining the existing mobile header and bottom navigation.
- Updated PWA theme/background colors for the lavender app shell.
- Added missing PWA icon assets: icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png, favicon.png.
- Bumped service-worker cache version to `v110-spacious-app-ui`.

## Preservation
- All four avatar sprite files are included.
- Existing app HTML and feature logic are based on v109.
- No localStorage keys or academic data structures were intentionally changed.
- PWA remains `display: standalone`.

## Checks performed
- All inline JavaScript blocks passed `node --check`.
- Service worker passed `node --check`.
- Manifest parsed as valid JSON.
- All referenced PWA icon assets exist.
- ZIP integrity check passed.

## Not verified
- Live browser rendering and interaction.
- GitHub Pages deployment/cache behavior on the user's device.
- Actual installed PWA appearance on iPadOS, Android, or Windows.
- Apple Pencil/handwriting performance.

This is an app-style web/PWA interface update, not a native iOS/Android/Windows binary.
