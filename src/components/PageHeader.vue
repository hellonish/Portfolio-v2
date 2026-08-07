<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="mb-10">
    <div v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</div>
    <h1 class="text-h4 font-weight-bold mb-3">{{ title }}</h1>
    <p v-if="description" class="lead measure mb-0">{{ description }}</p>
  </header>
</template>
