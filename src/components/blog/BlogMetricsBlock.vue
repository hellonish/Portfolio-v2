<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <section class="block">
    <p v-if="block.title" class="block__label">{{ block.title }}</p>
    <dl>
      <div v-for="item in block.items" :key="item.label">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.block { margin: 3.75rem 0; padding: 1.75rem; background: rgba(128, 128, 128, 0.08); }
.block__label { margin: 0 0 1.2rem; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.62; }
dl { margin: 0; }
dl > div { display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; padding: 0.85rem 0; border-top: 1px solid rgba(128, 128, 128, 0.2); }
dt { font-size: 0.85rem; opacity: 0.73; }
dd { margin: 0; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; text-align: right; }
@media (max-width: 600px) { .block { padding: 1.25rem; } }
</style>
