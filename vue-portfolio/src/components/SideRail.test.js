import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import { describe, expect, it } from 'vitest'
import SideRail from './SideRail.vue'

async function mountSideRail(props) {
  const routeComponent = { template: '<div />' }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/about', '/projects', '/research', '/blog', '/fonts', '/components']
      .map((path) => ({ path, component: routeComponent })),
  })
  await router.push('/')
  await router.isReady()

  return mount(SideRail, {
    props: {
      showThemeToggle: true,
      ...props,
    },
    global: {
      plugins: [router, createVuetify()],
    },
  })
}

describe('SideRail theme switch', () => {
  it('shows dark mode as checked and emits light when unchecked', async () => {
    const wrapper = await mountSideRail({ isDark: true })

    expect(wrapper.text()).toContain('Light')
    expect(wrapper.text()).toContain('Dark')

    const themeSwitch = wrapper.get('input[aria-label="Dark mode"]')
    expect(themeSwitch.element.checked).toBe(true)

    await themeSwitch.setValue(false)

    expect(wrapper.emitted('change-theme')).toEqual([['light']])
  })

  it('shows light mode as unchecked and emits dark when checked', async () => {
    const wrapper = await mountSideRail({ isDark: false })
    const themeSwitch = wrapper.get('input[aria-label="Dark mode"]')

    expect(themeSwitch.element.checked).toBe(false)

    await themeSwitch.setValue(true)

    expect(wrapper.emitted('change-theme')).toEqual([['dark']])
  })
})
