<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import SideRail from '@/components/SideRail.vue'
import about from '@/data/about.json'

const theme = useTheme()
const display = useDisplay()
const drawer = ref(display.lgAndUp.value)
const isDark = computed(() => theme.global.name.value === 'dark')

const STORAGE_KEY = 'portfolio-theme'

watch(display.lgAndUp, (isDesktop) => {
  drawer.value = isDesktop
})

onMounted(() => {
  const saved = readSavedTheme()
  if (saved) theme.change(saved)
})

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
    // The selected theme still applies for this session.
  }
}

function toggleTheme() {
  changeTheme(isDark.value ? 'light' : 'dark')
}

function handleNavigate() {
  if (display.mdAndDown.value) drawer.value = false
}
</script>

<template>
  <v-app>
    <!-- Mobile top bar -->
    <v-app-bar v-if="$vuetify.display.mdAndDown" flat density="comfortable" border="b">
      <v-app-bar-nav-icon aria-label="Open navigation" @click="drawer = !drawer" />
      <v-app-bar-title class="text-subtitle-1 font-weight-bold">{{ about.name }}</v-app-bar-title>
      <v-spacer />
      <v-btn
        icon
        variant="text"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.display.lgAndUp"
      :temporary="$vuetify.display.mdAndDown"
      width="300"
      border="e"
    >
      <SideRail
        :show-theme-toggle="$vuetify.display.lgAndUp"
        :is-dark="isDark"
        @change-theme="changeTheme"
        @navigate="handleNavigate"
      />
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-12 py-md-16 px-6" style="max-width: 880px">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
