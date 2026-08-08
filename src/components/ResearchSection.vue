<script setup>
import settings from '@/data/site-settings.json'

defineProps({
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="research-section" aria-labelledby="research-title">
    <header class="research-header">
      <div>
        <p class="research-kicker mb-2">{{ settings.home.sections.research.kicker }}</p>
        <h2 id="research-title" class="research-heading">{{ settings.home.sections.research.title }}</h2>
      </div>
      <router-link to="/research" class="research-link">{{ settings.home.sections.research.linkLabel }} <span aria-hidden="true">→</span></router-link>
    </header>

    <div class="research-grid">
      <article v-for="(item, index) in items" :key="item.slug" class="research-item">
        <div class="research-item__topline">
          <span>R—{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ item.year }}</span>
        </div>
        <p class="research-item__venue">{{ item.venue }}</p>
        <h3 class="research-item__title">{{ item.title }}</h3>
        <p class="research-item__summary">{{ item.summary }}</p>
        <p class="research-item__tags mb-0">{{ item.tags.slice(0, 3).join(' / ') }}</p>
        <div class="research-item__actions">
          <a :href="item.links.paper" target="_blank" rel="noopener noreferrer">Report ↗</a>
          <router-link :to="item.links.blog">Blog →</router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.research-section {
  margin-bottom: clamp(6rem, 12vh, 9rem);
  padding: clamp(2.5rem, 6vw, 4rem) 0;
  border-top: 1px solid rgba(128, 128, 128, 0.22);
  border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}

.research-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.research-kicker,
.research-item__topline,
.research-item__venue,
.research-item__tags {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  opacity: 0.58;
}

.research-item__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.3rem;
}

.research-item__actions a {
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.73rem;
  font-weight: 600;
  text-decoration-color: rgba(128, 128, 128, 0.5);
  text-underline-offset: 0.23rem;
}

.research-item__actions a:hover,
.research-item__actions a:focus-visible {
  color: rgb(var(--v-theme-primary));
}

.research-heading {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 6vw, 4.75rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.research-link {
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration-color: rgba(128, 128, 128, 0.5);
  text-underline-offset: 0.25rem;
}

.research-link:hover,
.research-link:focus-visible {
  color: rgb(var(--v-theme-primary));
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.research-item {
  min-width: 0;
  padding: 0 clamp(1.25rem, 3vw, 2rem);
  border-left: 1px solid rgba(128, 128, 128, 0.2);
}

.research-item:first-child {
  padding-left: 0;
  border-left: 0;
}

.research-item:last-child {
  padding-right: 0;
}

.research-item__topline {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.research-item__venue {
  margin-bottom: 0.65rem;
}

.research-item__title {
  margin-bottom: 0.9rem;
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  font-weight: 400;
  line-height: 1.22;
}

.research-item__summary {
  margin-bottom: 1.4rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  line-height: 1.65;
  opacity: 0.64;
}

.research-item__tags {
  line-height: 1.6;
}

@media (max-width: 760px) {
  .research-grid {
    grid-template-columns: 1fr;
  }

  .research-item,
  .research-item:first-child,
  .research-item:last-child {
    padding: 1.75rem 0;
    border-left: 0;
    border-top: 1px solid rgba(128, 128, 128, 0.18);
  }

  .research-item__topline {
    margin-bottom: 1rem;
  }
}
</style>
