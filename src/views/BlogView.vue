<script setup>
import { computed, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import EntryRow from '@/components/EntryRow.vue'
import blog from '@/data/blog.json'
import settings from '@/data/site-settings.json'

const activeTag = ref(null)

const allTags = computed(() => [...new Set(blog.flatMap((p) => p.tags))].sort())

const posts = computed(() => {
  const list = activeTag.value ? blog.filter((p) => p.tags.includes(activeTag.value)) : blog
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function emptyTagMessage(tag) {
  return settings.pages.blog.emptyTagMessage.replace('{tag}', tag)
}
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="settings.pages.blog.eyebrow"
      :title="settings.pages.blog.title"
      :description="settings.pages.blog.description"
    />

    <div class="d-flex flex-wrap ga-1 mb-6">
      <v-chip
        :variant="activeTag === null ? 'flat' : 'tonal'"
        :color="activeTag === null ? 'primary' : undefined"
        size="small"
        @click="activeTag = null"
      >
        {{ settings.pages.blog.allTagsLabel }}
      </v-chip>
      <v-chip
        v-for="t in allTags"
        :key="t"
        :variant="activeTag === t ? 'flat' : 'tonal'"
        :color="activeTag === t ? 'primary' : undefined"
        size="small"
        @click="activeTag = activeTag === t ? null : t"
      >
        {{ t }}
      </v-chip>
    </div>

    <EntryRow
      v-for="p in posts"
      :key="p.slug"
      :title="p.title"
      :summary="p.summary"
      :meta="`${formatDate(p.date)} · ${p.readingTime}`"
      :tags="p.tags"
    />

    <p v-if="!posts.length" class="text-body-2 mt-6" style="opacity: 0.6">
      {{ emptyTagMessage(activeTag) }}
    </p>
  </div>
</template>
