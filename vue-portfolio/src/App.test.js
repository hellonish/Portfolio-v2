import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const mountedWrappers = []

async function setViewport(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  })
  vuetify.display.update()
  await nextTick()
}

async function mountApp(width = 1440) {
  await setViewport(width)
  const routeComponent = { template: '<div />' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/about', '/projects', '/research', '/blog', '/fonts', '/components']
      .map((path) => ({ path, component: routeComponent })),
  })
  await router.push('/')
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router, vuetify],
    },
  })
  await nextTick()
  mountedWrappers.push(wrapper)
  return wrapper
}

describe('portfolio theme controls', () => {
  beforeEach(() => {
    localStorage.clear()
    vuetify.theme.change('dark')
  })

  afterEach(() => {
    while (mountedWrappers.length) mountedWrappers.pop().unmount()
    vi.restoreAllMocks()
  })

  it('opens the permanent navigation drawer on large screens', async () => {
    const wrapper = await mountApp(1440)

    expect(wrapper.get('.v-navigation-drawer').classes())
      .toContain('v-navigation-drawer--active')
  })

  it('reopens the navigation drawer when crossing into the large breakpoint', async () => {
    const wrapper = await mountApp(900)

    await setViewport(1440)

    expect(wrapper.get('.v-navigation-drawer').classes())
      .toContain('v-navigation-drawer--active')
  })

  it('keeps the permanent drawer open after desktop navigation', async () => {
    const wrapper = await mountApp(1440)

    await wrapper.get('a[href="/about"]').trigger('click')
    await nextTick()

    expect(wrapper.get('.v-navigation-drawer').classes())
      .toContain('v-navigation-drawer--active')
  })

  it('closes the drawer and exposes the current theme action on smaller screens', async () => {
    const wrapper = await mountApp(1440)

    await setViewport(900)

    expect(wrapper.get('.v-navigation-drawer').classes())
      .not.toContain('v-navigation-drawer--active')
    expect(wrapper.get('button[aria-label="Switch to light mode"]').isVisible()).toBe(true)
  })

  it('closes the temporary drawer after mobile navigation', async () => {
    const wrapper = await mountApp(900)

    await wrapper.get('button[aria-label="Open navigation"]').trigger('click')
    expect(wrapper.get('.v-navigation-drawer').classes())
      .toContain('v-navigation-drawer--active')

    await wrapper.get('a[href="/about"]').trigger('click')
    await nextTick()

    expect(wrapper.get('.v-navigation-drawer').classes())
      .not.toContain('v-navigation-drawer--active')
  })

  it('toggles and persists both themes through the mobile action', async () => {
    const wrapper = await mountApp(900)

    await wrapper.get('button[aria-label="Switch to light mode"]').trigger('click')
    await nextTick()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--light')
    expect(wrapper.get('button[aria-label="Switch to dark mode"]').isVisible()).toBe(true)
    expect(localStorage.getItem('portfolio-theme')).toBe('light')

    await wrapper.get('button[aria-label="Switch to dark mode"]').trigger('click')
    await nextTick()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--dark')
    expect(wrapper.get('button[aria-label="Switch to light mode"]').isVisible()).toBe(true)
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
  })

  it('restores a valid saved light theme', async () => {
    localStorage.setItem('portfolio-theme', 'light')

    const wrapper = await mountApp()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--light')
    expect(wrapper.get('input[aria-label="Dark mode"]').element.checked).toBe(false)
  })

  it('ignores an invalid saved theme', async () => {
    localStorage.setItem('portfolio-theme', 'sepia')

    const wrapper = await mountApp()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--dark')
  })

  it('changes and persists the theme through the desktop switch', async () => {
    const wrapper = await mountApp()

    await wrapper.get('input[aria-label="Dark mode"]').setValue(false)
    await nextTick()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })

  it('keeps the default theme when saved preferences cannot be read', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable')
    })

    const wrapper = await mountApp()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--dark')
  })

  it('changes the in-session theme when persistence fails', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable')
    })
    const wrapper = await mountApp()

    await wrapper.get('input[aria-label="Dark mode"]').setValue(false)
    await nextTick()

    expect(wrapper.get('.v-application').classes()).toContain('v-theme--light')
  })
})
