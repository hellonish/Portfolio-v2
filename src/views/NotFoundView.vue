<script setup>
import settings from '@/data/site-settings.json'
</script>

<template>
  <div>
    <div class="eyebrow mb-2">{{ settings.pages.notFound.eyebrow }}</div>
    <h1 class="text-h4 mb-3">{{ settings.pages.notFound.title }}</h1>
    <p class="lead measure mb-6">{{ settings.pages.notFound.description }}</p>
    <v-btn to="/" variant="flat" color="primary" size="small">{{ settings.pages.notFound.backHomeLabel }}</v-btn>
  </div>
</template>
