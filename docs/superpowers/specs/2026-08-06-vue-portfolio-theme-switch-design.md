# Vue Portfolio Theme Switch Design

## Goal

Make the existing light/dark theme control visible and understandable on desktop while preserving the compact mobile experience and the user's saved preference.

## Current Behavior and Root Cause

The application already defines light and dark Vuetify themes, changes between them at runtime, and stores the selected theme under `portfolio-theme` in `localStorage`.

On large screens, the theme control is placed at the bottom of the navigation drawer. The drawer is configured as permanent at the large breakpoint, but its `v-model` starts as `false`. In the reproduced 1440 x 900 layout, Vuetify translates the 300-pixel drawer entirely off-screen, which hides both desktop navigation and the theme control. At medium and smaller breakpoints, a separate icon button appears in the mobile app bar.

## Approved Design

### Responsive layout

- The navigation drawer is open and permanent at Vuetify's large breakpoint and above.
- At medium breakpoints and below, the drawer remains temporary and closed until the menu button opens it.
- Crossing into the large breakpoint opens the drawer; crossing back into the temporary layout closes it.
- Navigating from the temporary drawer closes it. Desktop navigation remains visible.

### Desktop theme switch

- Replace the sidebar's icon-only theme button with a compact, labeled switch.
- The control presents `Light`, a compact switch, and `Dark` in one row so both available states remain visible.
- The checked state represents dark mode; the unchecked state represents light mode.
- The control stays in the sidebar footer beside the existing social links and is reachable by keyboard.
- The switch exposes an accessible label and current state through native/Vuetify switch semantics.

### Mobile theme control

- Keep the existing icon button in the mobile app bar to preserve space.
- Its icon continues to indicate the action available: moon while light mode is active and sun while dark mode is active.
- Its accessible label describes the destination state rather than using a generic toggle label.

### Theme state and persistence

- Dark remains the default theme when no preference has been saved.
- On mount, only valid saved values (`light` or `dark`) are restored.
- Changing the theme through either responsive control updates Vuetify and persists the resulting theme to `localStorage`.
- Both controls derive their displayed state from Vuetify's global theme so they cannot drift out of sync.

## Component Boundaries

- `App.vue` owns responsive drawer state, Vuetify theme state, and persistence.
- `SideRail.vue` receives the current `isDark` state, renders the desktop switch, and emits the requested `light` or `dark` theme name; it does not access storage.
- Existing theme definitions in `src/plugins/vuetify.js` remain unchanged.
- Styling changes are limited to the compact switch presentation and do not alter unrelated portfolio components.

## Error Handling

`localStorage` is a browser API and can fail in restricted environments. Theme changes must still work for the current session if reading or writing storage fails. Invalid stored values are ignored and dark mode remains active.

## Testing and Verification

Automated tests will cover:

- the desktop drawer being visible at the large breakpoint;
- dark mode being the initial default without a saved preference;
- restoration of valid saved preferences and rejection of invalid values;
- switch state reflecting the active theme;
- switching in either direction updating Vuetify and persistence;
- storage failures not preventing an in-session theme change;
- accessible labels describing the available action/state.

Browser verification will check representative large and small viewports, confirm that only the intended control is visible at each breakpoint, exercise both theme directions, reload to verify persistence, and check for console errors.

## Out of Scope

- Changing the existing light or dark color palettes.
- Adding a third system/automatic theme mode.
- Redesigning the navigation rail or mobile app bar beyond the visibility fix and theme-control treatment.
- Refactoring unrelated design-lab pages or portfolio content.
