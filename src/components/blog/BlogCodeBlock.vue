<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <figure class="block">
    <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
    <pre><code>{{ block.code }}</code></pre>
  </figure>
</template>

<style scoped>
.block { margin: 3rem 0; }
figcaption { margin-bottom: 0.6rem; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.62; }
pre { overflow-x: auto; margin: 0; padding: 1.2rem; background: rgba(128, 128, 128, 0.1); font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.65; }
</style>
