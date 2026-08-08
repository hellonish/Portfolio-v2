<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <section class="block">
    <h2 v-if="block.title">{{ block.title }}</h2>
    <div class="block__scroll">
      <table>
        <thead>
          <tr><th v-for="column in block.columns" :key="column">{{ column }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in block.rows" :key="row.join('-')"><td v-for="(cell, index) in row" :key="`${cell}-${index}`">{{ cell }}</td></tr>
        </tbody>
      </table>
    </div>
    <p v-if="block.note" class="block__note">{{ block.note }}</p>
  </section>
</template>

<style scoped>
.block { margin: 3.75rem 0; padding: 1.75rem; background: rgba(128, 128, 128, 0.08); }
h2 { margin-bottom: 1.15rem; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 400; letter-spacing: -0.03em; line-height: 1; }
.block__scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th, td { padding: 0.8rem 0.35rem; border-top: 1px solid rgba(128, 128, 128, 0.2); text-align: left; white-space: nowrap; }
th { font-family: var(--font-mono); font-size: 0.63rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.62; }
td:not(:first-child) { font-family: var(--font-mono); font-size: 0.75rem; text-align: right; }
.block__note { margin: 1rem 0 0; font-size: 0.84rem; line-height: 1.6; opacity: 0.66; }
@media (max-width: 600px) { .block { padding: 1.25rem; } }
</style>
