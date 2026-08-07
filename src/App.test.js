import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const mountedWrappers = []

async function mountApp(path = '/') {
  const routeComponent = { template: '<div />' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/projects', '/research', '/blog'].map((route) => ({ path: route, component: routeComponent })),
  })
  await router.push(path)
  await router.isReady()

  const wrapper = mount(App, { global: { plugins: [router, vuetify] } })
  await nextTick()
  mountedWrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  while (mountedWrappers.length) mountedWrappers.pop().unmount()
})

beforeEach(() => {
  localStorage.clear()
  vuetify.theme.change('dark')
})

describe('portfolio app shell', () => {
  it('has no sidebar or mobile navigation control', async () => {
    const wrapper = await mountApp()

    expect(wrapper.find('.v-navigation-drawer').exists()).toBe(false)
    expect(wrapper.find('button[aria-label="Open navigation"]').exists()).toBe(false)
    expect(wrapper.get('footer').isVisible()).toBe(true)
  })

  it('shows a home link on non-home pages', async () => {
    const wrapper = await mountApp('/projects')

    expect(wrapper.get('a[aria-label="Back to home"]').attributes('href')).toBe('/')
  })

  it('switches theme through a button and remembers the choice', async () => {
    const wrapper = await mountApp()
    await wrapper.get('button[aria-label="Switch to light mode"]').trigger('click')
    await nextTick()

    expect(localStorage.getItem('portfolio-theme')).toBe('light')
    expect(wrapper.get('button[aria-label="Switch to dark mode"]').isVisible()).toBe(true)
  })
})
