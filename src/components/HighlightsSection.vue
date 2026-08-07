<script setup>
import about from '@/data/about.json'
import settings from '@/data/site-settings.json'
</script>

<template>
  <section class="highlights-section" aria-labelledby="highlights-title">
    <header class="highlights-header">
      <p class="highlights-kicker mb-2">{{ settings.home.highlights.kicker }}</p>
      <h2 id="highlights-title" class="highlights-title">{{ settings.home.highlights.title }}</h2>
    </header>

    <div class="highlights-list">
      <article v-for="item in about.highlights" :key="item.label" class="highlight-item">
        <p class="highlight-label">{{ item.label }}</p>
        <div>
          <h3 class="highlight-title">{{ item.title }}</h3>
          <p v-if="item.description" class="highlight-description mb-0">
            {{ item.description }}
          </p>
          <div v-if="item.links" class="highlight-links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.highlights-section {
  display: grid;
  grid-template-columns: minmax(130px, 0.35fr) minmax(0, 1fr);
  gap: clamp(2rem, 7vw, 6rem);
  padding: 0 0 clamp(5rem, 10vh, 8rem);
}

.highlights-header {
  align-self: start;
}

.highlights-kicker,
.highlight-label {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  letter-spacing: 0.11em;
  line-height: 1.5;
  text-transform: uppercase;
  opacity: 0.62;
}

.highlights-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1;
}

.highlight-item {
  display: grid;
  grid-template-columns: minmax(100px, 0.28fr) minmax(0, 1fr);
  gap: clamp(1.25rem, 4vw, 3rem);
  padding: 1.55rem 0;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

.highlight-item:last-child {
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.highlight-label {
  padding-top: 0.25rem;
}

.highlight-title,
.highlight-description,
.highlight-links {
  font-family: var(--font-sans);
}

.highlight-title {
  margin-bottom: 0.45rem;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.45;
}

.highlight-description {
  max-width: 58ch;
  font-size: 0.9rem;
  line-height: 1.65;
  opacity: 0.68;
}

.highlight-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.6rem;
}

.highlight-links a {
  color: inherit;
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration-color: rgba(128, 128, 128, 0.5);
  text-underline-offset: 0.25rem;
}

.highlight-links a:hover,
.highlight-links a:focus-visible {
  color: rgb(var(--v-theme-primary));
  text-decoration-color: currentColor;
}

@media (max-width: 700px) {
  .highlights-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .highlight-item {
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 1.25rem;
  }
}
</style>
