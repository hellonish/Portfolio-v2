<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import SiteFooter from '@/components/SiteFooter.vue'
import settings from '@/data/site-settings.json'

const theme = useTheme()
const route = useRoute()
const storageKey = 'portfolio-theme'
const isDark = computed(() => theme.global.name.value === 'dark')
const backTarget = computed(() => {
  const source = route.query.from
  return typeof source === 'string' && source.startsWith('/') && !source.startsWith('//') ? source : '/'
})

onMounted(() => {
  try {
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme === 'light' || savedTheme === 'dark') theme.change(savedTheme)
  } catch {
    // The site remains usable when storage is unavailable.
  }
})

function toggleTheme() {
  const nextTheme = isDark.value ? 'light' : 'dark'
  theme.change(nextTheme)

  try {
    localStorage.setItem(storageKey, nextTheme)
  } catch {
    // The site remains usable when storage is unavailable.
  }
}
</script>

<template>
  <v-app>
    <button
      type="button"
      class="theme-button"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleTheme"
    >
      <span class="theme-button__icon" aria-hidden="true">{{ isDark ? '☀' : '◐' }}</span>
      {{ isDark ? 'Light' : 'Dark' }}
    </button>

    <v-main>
      <v-container class="py-8 py-md-12 px-6 px-md-8" style="max-width: 1080px">
        <nav v-if="$route.path !== '/'" class="page-back-nav" aria-label="Page navigation">
          <router-link :to="backTarget" class="page-back-link" aria-label="Back">
            <span aria-hidden="true">←</span> {{ settings.site.backLabel }}
          </router-link>
        </nav>

        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
      <SiteFooter />
    </v-main>
  </v-app>
</template>

<style scoped>
.page-back-nav {
  margin-bottom: 2.25rem;
}

.theme-button {
  position: fixed;
  z-index: 20;
  top: 1.25rem;
  right: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.3rem;
  padding: 0 0.8rem;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 999px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  color: rgb(var(--v-theme-on-surface));
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.theme-button:hover,
.theme-button:focus-visible {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
}

.theme-button:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
}

.theme-button__icon {
  font-size: 1rem;
  line-height: 1;
}

.page-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid transparent;
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  opacity: 0.68;
  transition: border-color 160ms ease, color 160ms ease, opacity 160ms ease;
}

.page-back-link:hover,
.page-back-link:focus-visible {
  border-color: currentColor;
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}

.page-back-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .page-back-link,
  .theme-button {
    transition: none;
  }
}

@media (max-width: 700px) {
  .theme-button {
    top: 0.85rem;
    right: 0.85rem;
  }
}
</style>
