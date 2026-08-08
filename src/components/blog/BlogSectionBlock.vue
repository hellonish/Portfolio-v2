<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <section class="block block--section">
    <h2 v-if="block.title">{{ block.title }}</h2>
    <p v-for="paragraph in block.paragraphs" :key="paragraph">{{ paragraph }}</p>
  </section>
</template>

<style scoped>
.block { margin: 0 0 3rem; }
h2 { margin-bottom: 0.85rem; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; letter-spacing: -0.035em; line-height: 0.98; }
p { margin: 0.9rem 0 0; font-size: 1rem; line-height: 1.8; opacity: 0.8; }
p:first-of-type { margin-top: 0; }
</style>
