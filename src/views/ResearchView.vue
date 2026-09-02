<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import research from '@/data/research.json'
import settings from '@/data/site-settings.json'

const listedResearch = computed(() =>
  [...research].sort((a, b) => Number(b.year) - Number(a.year)),
)
const route = useRoute()

function postRoute(path) {
  return { path, query: { from: route.fullPath } }
}
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="settings.pages.research.eyebrow"
      :title="settings.pages.research.title"
      :description="settings.pages.research.description"
    />

    <div class="research-list">
      <article v-for="item in listedResearch" :key="item.slug" class="research-entry">
        <div class="research-entry__meta">
          <span>{{ item.year }}</span>
          <span>{{ item.venue }}</span>
        </div>
        <div class="research-entry__content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <div class="d-flex flex-wrap ga-1">
            <v-chip v-for="tag in item.tags" :key="tag" size="x-small" variant="tonal">{{ tag }}</v-chip>
          </div>
        </div>
        <div class="research-entry__actions">
          <a :href="item.links.paper" target="_blank" rel="noopener noreferrer" class="minimal-action">Report <span aria-hidden="true">↗</span></a>
          <router-link :to="postRoute(item.links.blog)" class="minimal-action">Read blog <span aria-hidden="true">→</span></router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.research-list { border-top: 1px solid rgba(128, 128, 128, 0.2); }
.research-entry {
  display: grid;
  grid-template-columns: minmax(9rem, 0.45fr) minmax(0, 1.8fr) auto;
  gap: clamp(1rem, 3vw, 3rem);
  padding: 2rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.18);
}
.research-entry__meta { display: grid; align-content: start; gap: 0.45rem; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.07em; line-height: 1.45; text-transform: uppercase; opacity: 0.6; }
.research-entry__content h2 { margin-bottom: 0.55rem; font-family: var(--font-sans); font-size: clamp(1.7rem, 3vw, 2.25rem); font-weight: 400; line-height: 1.05; }
.research-entry__content p { max-width: 66ch; margin-bottom: 1rem; font-size: 0.88rem; line-height: 1.65; opacity: 0.72; }
.research-entry__actions { display: grid; align-content: start; gap: 0.65rem; min-width: 6.5rem; }
.research-entry__actions a { white-space: nowrap; }
@media (max-width: 720px) { .research-entry { grid-template-columns: 1fr; gap: 1rem; } .research-entry__actions { display: flex; flex-wrap: wrap; gap: 1.25rem; } }
</style>
