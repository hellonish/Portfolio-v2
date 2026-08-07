<script setup>
/**
 * One list row, shared by projects / research / blog.
 * Renders as a link when `href` is set, otherwise as a plain block.
 */
defineProps({
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  meta: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  href: { type: String, default: '' },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href || undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    class="entry-row"
  >
    <div class="d-flex align-start ga-4">
      <div class="flex-grow-1">
        <div class="d-flex align-center ga-2 mb-1">
          <span class="entry-title">{{ title }}</span>
          <v-icon v-if="href" size="14" class="entry-arrow">mdi-arrow-top-right</v-icon>
        </div>
        <p v-if="summary" class="text-body-2 measure mb-2" style="opacity: 0.8; line-height: 1.6">
          {{ summary }}
        </p>
        <div v-if="tags.length" class="d-flex flex-wrap ga-1">
          <v-chip v-for="t in tags" :key="t" size="x-small" variant="tonal">{{ t }}</v-chip>
        </div>
      </div>
      <span v-if="meta" class="mono flex-shrink-0 pt-1" style="opacity: 0.7">{{ meta }}</span>
    </div>
  </component>
</template>
