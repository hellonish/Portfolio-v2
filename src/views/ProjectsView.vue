<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EntryRow from '@/components/EntryRow.vue'
import PageHeader from '@/components/PageHeader.vue'
import projects from '@/data/projects.json'
import settings from '@/data/site-settings.json'

const listedProjects = computed(() =>
  [...projects].sort((a, b) => Number(b.year) - Number(a.year)),
)
const route = useRoute()

function postRoute(path) {
  return { path, query: { from: route.fullPath } }
}
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="settings.pages.projects.eyebrow"
      :title="settings.pages.projects.title"
      :description="settings.pages.projects.description"
    />

    <div v-for="project in listedProjects" :key="project.slug" class="project-entry">
      <EntryRow
        :title="project.title"
        :summary="project.summary"
        :meta="`${project.year} · ${project.status}`"
        :tags="project.tags"
        :href="project.links.demo || project.links.repo || project.links.archive"
      />
      <router-link
        v-if="project.links.blog"
        :to="postRoute(project.links.blog)"
        class="project-entry__archive minimal-action"
      >
        Read blog <span aria-hidden="true">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.project-entry {
  position: relative;
}

.project-entry__archive {
  position: absolute;
  right: 0;
  bottom: 1.1rem;
  height: 2rem;
  padding-block: 0;
}

.project-entry__archive:hover,
.project-entry__archive:focus-visible {
  text-decoration: none;
}

@media (max-width: 680px) {
  .project-entry__archive {
    position: static;
    display: inline-block;
    margin: -0.75rem 0 1.2rem;
  }
}
</style>
