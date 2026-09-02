<script setup>
import settings from '@/data/site-settings.json'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="projects-section" aria-labelledby="projects-title">
    <header class="projects-header">
      <div>
        <p class="section-kicker mb-2">{{ settings.home.sections.projects.kicker }}</p>
        <h2 id="projects-title" class="section-title">{{ settings.home.sections.projects.title }}</h2>
      </div>
      <p class="projects-intro mb-0">
        {{ settings.home.sections.projects.intro }}
      </p>
      <router-link to="/projects" class="section-link">{{ settings.home.sections.projects.linkLabel }} <span aria-hidden="true">→</span></router-link>
    </header>

    <div class="projects-list">
      <article v-for="(project, index) in items" :key="project.slug" class="project-row">
        <div class="project-row__meta">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ project.status }}</span>
        </div>
        <div>
          <h3 class="project-row__title">{{ project.title }}</h3>
          <p class="project-row__summary mb-0">{{ project.summary }}</p>
        </div>
        <div class="project-row__details">
          <span>{{ project.year }}</span>
          <span>{{ project.tags.slice(0, 3).join(' / ') }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  margin-bottom: clamp(6rem, 12vh, 9rem);
}

.projects-header {
  display: grid;
  grid-template-columns: minmax(150px, 0.55fr) minmax(260px, 1fr) auto;
  align-items: end;
  gap: clamp(1.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
}

.section-kicker,
.project-row__meta,
.project-row__details {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.62;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 0.95;
}

.projects-intro {
  max-width: 44ch;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  line-height: 1.65;
  opacity: 0.64;
}

.section-link {
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration-color: rgba(128, 128, 128, 0.5);
  text-underline-offset: 0.25rem;
}

.section-link:hover,
.section-link:focus-visible {
  color: rgb(var(--v-theme-primary));
}

.projects-list {
  border-top: 1px solid rgba(128, 128, 128, 0.22);
}

.project-row {
  display: grid;
  grid-template-columns: minmax(115px, 0.3fr) minmax(0, 1fr) minmax(140px, 0.35fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: clamp(1.75rem, 4vw, 2.75rem) 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.project-row:last-child {
  border-bottom: 0;
}

.project-row__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  padding-top: 0.2rem;
}

.project-row__title {
  margin-bottom: 0.65rem;
  font-family: var(--font-sans);
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  font-weight: 400;
  line-height: 1.22;
}

.project-row__summary {
  max-width: 65ch;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  line-height: 1.7;
  opacity: 0.68;
}

.project-row__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  padding-top: 0.3rem;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .projects-header {
    grid-template-columns: 1fr auto;
  }

  .projects-intro {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .project-row {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 1.25rem;
  }

  .project-row__details {
    grid-column: 2;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
    padding-top: 0;
  }
}
</style>
