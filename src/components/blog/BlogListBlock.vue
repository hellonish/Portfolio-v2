<script setup>
defineProps({
  block: { type: Object, required: true },
})
</script>

<template>
  <section class="block">
    <h2 v-if="block.title">{{ block.title }}</h2>
    <p v-if="block.intro" class="block__intro">{{ block.intro }}</p>
    <component :is="block.ordered ? 'ol' : 'ul'" class="block__list">
      <li v-for="(item, index) in block.items" :key="item">
        <span v-if="block.ordered" class="block__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span>{{ item }}</span>
      </li>
    </component>
  </section>
</template>

<style scoped>
.block { margin: 3.75rem 0; padding: 1.75rem 0; border-top: 1px solid rgba(128, 128, 128, 0.24); border-bottom: 1px solid rgba(128, 128, 128, 0.24); }
h2 { margin-bottom: 0.75rem; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 400; letter-spacing: -0.03em; line-height: 1; }
.block__intro { margin: 0 0 1.15rem; font-size: 0.95rem; line-height: 1.7; opacity: 0.78; }
.block__list { margin: 0; padding: 0; list-style: none; }
li { display: grid; grid-template-columns: auto 1fr; gap: 0.75rem; padding: 0.8rem 0; font-size: 0.93rem; line-height: 1.6; border-top: 1px solid rgba(128, 128, 128, 0.15); }
li:first-child { border-top: 0; }
.block__number { font-family: var(--font-mono); font-size: 0.67rem; letter-spacing: 0.05em; opacity: 0.58; }
</style>
