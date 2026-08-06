<script setup>
import about from '@/data/about.json'

defineProps({
  showThemeToggle: { type: Boolean, default: true },
  isDark: { type: Boolean, required: true },
})
defineEmits({
  'change-theme': (theme) => theme === 'light' || theme === 'dark',
  navigate: null,
})

const nav = [
  { title: 'Home', to: '/' },
  { title: 'About', to: '/about' },
  { title: 'Projects', to: '/projects' },
  { title: 'AI Work', to: '/research' },
  { title: 'Blog', to: '/blog' },
]

// Design exploration pages — remove once a direction is chosen.
const labNav = [
  { title: 'Fonts', to: '/fonts' },
  { title: 'Components', to: '/components' },
]
</script>

<template>
  <div class="d-flex flex-column fill-height pa-6">
    <div>
      <div class="text-h6 font-weight-bold mb-1">{{ about.name }}</div>
      <div class="eyebrow mb-6">{{ about.role }}</div>
    </div>

    <v-list nav density="compact" class="pa-0">
      <v-list-item
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        exact
        rounded="lg"
        class="mb-1"
        @click="$emit('navigate')"
      >
        <v-list-item-title class="text-body-2">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="eyebrow mt-8 mb-2 px-2">Design lab</div>
    <v-list nav density="compact" class="pa-0">
      <v-list-item
        v-for="item in labNav"
        :key="item.to"
        :to="item.to"
        exact
        rounded="lg"
        class="mb-1"
        @click="$emit('navigate')"
      >
        <v-list-item-title class="text-body-2">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer />

    <div class="d-flex align-center ga-1 mt-6">
      <v-btn
        v-for="s in about.socials"
        :key="s.label"
        :href="s.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="s.label"
        icon
        size="small"
        variant="text"
        density="comfortable"
      >
        <v-icon size="20">{{ s.icon }}</v-icon>
      </v-btn>

      <v-spacer />

      <div
        v-if="showThemeToggle"
        class="theme-switch ml-2"
        role="group"
        aria-label="Colour theme"
      >
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
    </div>
  </div>
</template>

<style scoped>
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
</style>
