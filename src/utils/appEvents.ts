// src/utils/appEvents.ts
//
// Shared custom-event names for the one-time, first-load-only
// entrance sequence: Preloader finishes → Navbar bounce-drops in →
// Home hero's SVG wordmark starts drawing.
//
// Same window.dispatchEvent/addEventListener pattern already used
// for 'navbar-visibility' in Navbar.tsx — just centralized here so
// the string names can't drift out of sync between files.

export const PRELOADER_COMPLETE_EVENT = "preloader-complete";
export const NAV_ENTRANCE_COMPLETE_EVENT = "nav-entrance-complete";

// Timing constants — MUST stay in sync with:
//   • App.tsx's isLoading setTimeout (currently 2000ms)
//   • preloader.css's `.preloader { transition: opacity 0.6s ... }`
// If either of those changes, update the matching constant here too.
export const PRELOADER_MIN_VISIBLE_MS = 2000;
export const PRELOADER_FADE_MS = 600;
export const PRELOADER_TOTAL_MS = PRELOADER_MIN_VISIBLE_MS + PRELOADER_FADE_MS;

// Additional delay after preloader is fully gone before animations start
// This ensures the user sees the preloader design completely before any
// entrance animations (navbar bounce-drop, SVG drawing) begin
export const ANIMATION_DELAY_MS = 800;