<script setup>
import { computed } from 'vue'
import EntryRow from '@/components/EntryRow.vue'
import PageHeader from '@/components/PageHeader.vue'
import projects from '@/data/projects.json'
import settings from '@/data/site-settings.json'

const listedProjects = computed(() =>
  [...projects].sort((a, b) => Number(b.year) - Number(a.year)),
)
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
      <a
        v-if="project.links.archive"
        :href="project.links.archive"
        target="_blank"
        rel="noopener noreferrer"
        class="project-entry__archive"
      >
        Project notes <span aria-hidden="true">↗</span>
      </a>
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
  color: inherit;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  opacity: 0.68;
  text-decoration: none;
}

.project-entry__archive:hover,
.project-entry__archive:focus-visible {
  color: rgb(var(--v-theme-primary));
  opacity: 1;
  text-decoration: underline;
}

@media (max-width: 680px) {
  .project-entry__archive {
    position: static;
    display: inline-block;
    margin: -0.75rem 0 1.2rem;
  }
}
</style>
