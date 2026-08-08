<script setup>
import { computed } from 'vue'
import BlogCalloutBlock from './BlogCalloutBlock.vue'
import BlogCodeBlock from './BlogCodeBlock.vue'
import BlogListBlock from './BlogListBlock.vue'
import BlogMetricsBlock from './BlogMetricsBlock.vue'
import BlogSectionBlock from './BlogSectionBlock.vue'
import BlogTableBlock from './BlogTableBlock.vue'

const props = defineProps({
  blocks: { type: Array, default: () => [] },
})

const components = {
  callout: BlogCalloutBlock,
  code: BlogCodeBlock,
  list: BlogListBlock,
  metrics: BlogMetricsBlock,
  section: BlogSectionBlock,
  table: BlogTableBlock,
}

const resolvedBlocks = computed(() => props.blocks
  .map((block) => ({ ...block, component: components[block.type] }))
  .filter((block) => block.component))
</script>

<template>
  <div class="blog-content">
    <component
      :is="block.component"
      v-for="(block, index) in resolvedBlocks"
      :key="`${block.type}-${block.title || block.label || index}`"
      :block="block"
    />
  </div>
</template>
