<script setup>
import { computed } from 'vue'
import EntryRow from '@/components/EntryRow.vue'
import PageHeader from '@/components/PageHeader.vue'
import research from '@/data/research.json'
import settings from '@/data/site-settings.json'

const listedResearch = computed(() =>
  [...research].sort((a, b) => Number(b.year) - Number(a.year)),
)
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="settings.pages.research.eyebrow"
      :title="settings.pages.research.title"
      :description="settings.pages.research.description"
    />

    <EntryRow
      v-for="item in listedResearch"
      :key="item.slug"
      :title="item.title"
      :summary="item.summary"
      :meta="item.year"
      :tags="item.tags"
      :href="item.links.page || item.links.paper || item.links.repo"
    />
  </div>
</template>
