<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <aside class="block">
    <p class="block__label">{{ block.label }}</p>
    <p>{{ block.text }}</p>
  </aside>
</template>

<style scoped>
.block { margin: 4.25rem 0; padding-left: clamp(1.25rem, 3vw, 2.5rem); border-left: 2px solid rgb(var(--v-theme-primary)); }
.block__label { margin: 0 0 0.6rem; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.62; }
.block > p:last-child { margin: 0; font-family: var(--font-sans); font-size: clamp(1.55rem, 3vw, 2.2rem); line-height: 1.2; }
</style>
