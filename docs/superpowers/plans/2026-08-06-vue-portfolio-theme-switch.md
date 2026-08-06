# Vue Portfolio Theme Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the permanent desktop navigation rail and expose a clear, persistent Light/Dark switch without changing the portfolio palettes or compact mobile layout.

**Architecture:** `App.vue` remains the owner of Vuetify theme state, responsive drawer state, and safe persistence. `SideRail.vue` becomes a controlled view that receives `isDark` and emits an explicit `light` or `dark` theme name. Vue Test Utils mounts the real Vuetify and router plugins so tests exercise component behavior rather than mocks.

**Tech Stack:** Vue 3.5, Vuetify 3.13, Vue Router 4.6, Vite 8.2, Vitest 4.1.10, Vue Test Utils 2.4.11, jsdom 26.1.0.

## Global Constraints

- Dark remains the default theme when no valid preference is saved.
- `portfolio-theme` accepts only `light` or `dark`.
- Storage read/write failures must not prevent in-session theme changes.
- The desktop control is a labeled switch; the mobile control remains an icon button.
- Existing light and dark color palettes remain unchanged.
- No system/automatic third theme mode is added.

---

### Task 1: Test and implement responsive theme controls

**Files:**
- Modify: `vue-portfolio/package.json`
- Modify: `vue-portfolio/package-lock.json`
- Create: `vue-portfolio/vitest.config.js`
- Create: `vue-portfolio/src/test/setup.js`
- Create: `vue-portfolio/src/components/SideRail.test.js`
- Create: `vue-portfolio/src/App.test.js`
- Modify: `vue-portfolio/src/App.vue`
- Modify: `vue-portfolio/src/components/SideRail.vue`

**Interfaces:**
- `App.vue` passes `isDark: boolean` to `SideRail.vue`.
- `SideRail.vue` emits `change-theme` with exactly `'light'` or `'dark'`.
- `App.vue` exposes no storage API to child components; it reads and writes the `portfolio-theme` key internally.
- The desktop switch uses checked = dark and unchecked = light.

- [ ] **Step 1: Install the test harness and add the test script**

Run:

```bash
cd vue-portfolio
npm install --save-dev vitest@4.1.10 @vue/test-utils@2.4.11 jsdom@26.1.0
```

Add the script to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run"
}
```

Create `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
})
```

Create `src/test/setup.js` with browser APIs Vuetify expects:

```js
import { vi } from 'vitest'

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})
```

- [ ] **Step 2: Write failing `SideRail` component tests**

Create `src/components/SideRail.test.js` with a memory-router mount helper. Assert that `isDark: true` renders the text `Light` and `Dark`, checks the checkbox/switch input, and gives it the accessible name `Dark mode`. Change the input to unchecked and assert the component emits `change-theme` with `'light'`:

```js
expect(wrapper.text()).toContain('Light')
expect(wrapper.text()).toContain('Dark')
expect(wrapper.get('input[aria-label="Dark mode"]').element.checked).toBe(true)

await wrapper.get('input[aria-label="Dark mode"]').setValue(false)
expect(wrapper.emitted('change-theme')).toEqual([['light']])
```

Add the inverse assertion with `isDark: false`: checking the input emits `['dark']`.

- [ ] **Step 3: Write failing `App` behavior tests**

Create `src/App.test.js` with a helper that sets `window.innerWidth`, calls `vuetify.display.update()`, mounts `App` with the real router and Vuetify plugins, and awaits router readiness.

Cover these behaviors:

```js
expect(wrapper.find('.v-navigation-drawer').classes())
  .toContain('v-navigation-drawer--active')
```

At 1440 pixels, the permanent drawer and controlled `SideRail` are active. After changing the test width to 900 pixels and updating Vuetify display, the drawer closes and the mobile button is visible with `aria-label="Switch to light mode"` while dark mode is active.

For persistence, set `localStorage['portfolio-theme']` to `light` before mount and assert `.v-application` has `v-theme--light`. Store an invalid value and assert the dark theme remains. Emit `change-theme` from `SideRail`, assert the application theme changes, and assert `localStorage.getItem('portfolio-theme')` matches.

For restricted storage, mock `Storage.prototype.getItem` or `setItem` to throw, mount or emit a theme change, and assert the application still renders and changes theme for the session.

- [ ] **Step 4: Run the focused tests and verify the RED state**

Run:

```bash
npm test -- src/components/SideRail.test.js src/App.test.js
```

Expected: FAIL because `SideRail` has no `isDark` prop or labeled switch, the large drawer starts inactive, mobile labels are generic, and storage access is not guarded.

- [ ] **Step 5: Implement controlled theme state and responsive drawer behavior in `App.vue`**

Import `computed`, `watch`, and `useDisplay`. Initialize the drawer from `display.lgAndUp.value` and synchronize it whenever the breakpoint changes:

```js
const display = useDisplay()
const drawer = ref(display.lgAndUp.value)
const isDark = computed(() => theme.global.name.value === 'dark')

watch(display.lgAndUp, (isDesktop) => {
  drawer.value = isDesktop
})
```

Replace direct storage calls with guarded helpers and route both controls through one explicit change function:

```js
function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function changeTheme(next) {
  if (next !== 'light' && next !== 'dark') return
  theme.change(next)
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Theme still changes for this session when persistence is unavailable.
  }
}
```

On mount, apply only `readSavedTheme()` when non-null. Make `toggleTheme()` call `changeTheme(isDark.value ? 'light' : 'dark')`. Pass `:is-dark="isDark"` and listen for `@change-theme="changeTheme"` on `SideRail`. Change the mobile accessible label to `isDark ? 'Switch to light mode' : 'Switch to dark mode'`.

- [ ] **Step 6: Implement the labeled controlled switch in `SideRail.vue`**

Add `isDark: { type: Boolean, required: true }` and replace `toggle-theme` with a validated `change-theme` event. Render the desktop control as one compact row:

```vue
<div v-if="showThemeToggle" class="theme-switch" role="group" aria-label="Colour theme">
  <span class="theme-switch__label">Light</span>
  <v-switch
    :model-value="isDark"
    aria-label="Dark mode"
    color="primary"
    density="compact"
    hide-details
    @update:model-value="$emit('change-theme', $event ? 'dark' : 'light')"
  />
  <span class="theme-switch__label">Dark</span>
</div>
```

Add scoped styles that keep the row compact, prevent the switch from expanding, and reuse the mono typography variables without changing palette colors:

```css
.theme-switch {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.theme-switch :deep(.v-switch) {
  flex: 0 0 auto;
}

.theme-switch__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.72;
}
```

- [ ] **Step 7: Run the focused tests and verify the GREEN state**

Run:

```bash
npm test -- src/components/SideRail.test.js src/App.test.js
```

Expected: all focused tests PASS with no unhandled errors.

- [ ] **Step 8: Run the full automated verification**

Run:

```bash
npm test
npm run build
```

Expected: all tests PASS and Vite produces `dist/` successfully. The existing Node-version warning may remain because Vite 8.2 requests Node 20.19+ while the workspace currently provides Node 20.18; no new warning or build failure is acceptable.

- [ ] **Step 9: Verify both responsive layouts in a browser**

Start `npm run dev -- --host 127.0.0.1`. At 1440 x 900, confirm the 300-pixel navigation rail is at x = 0, its Light/Dark switch is visible, and selecting both states updates the full application. At 900 x 900, confirm the drawer starts closed, the app bar appears, its accessible action label follows the active theme, and opening the menu reveals navigation. Reload after choosing light mode and confirm it remains light. Check that no Vite overlay or console error appears.

- [ ] **Step 10: Review and commit the focused implementation**

Run:

```bash
git diff --check
git status --short
git add vue-portfolio/package.json vue-portfolio/package-lock.json vue-portfolio/vitest.config.js vue-portfolio/src/test/setup.js vue-portfolio/src/App.test.js vue-portfolio/src/components/SideRail.test.js vue-portfolio/src/App.vue vue-portfolio/src/components/SideRail.vue
git commit -m "feat: add visible portfolio theme switch"
```

Do not stage unrelated existing files from the dirty workspace.
