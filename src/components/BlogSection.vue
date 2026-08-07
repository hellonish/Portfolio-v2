<script setup>
import settings from '@/data/site-settings.json'

defineProps({
  items: { type: Array, default: () => [] },
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <section class="blog-section" aria-labelledby="blog-title">
    <header class="blog-header">
      <div class="blog-heading-wrap">
        <span class="blog-count">{{ String(items.length).padStart(2, '0') }}</span>
        <h2 id="blog-title" class="blog-heading">{{ settings.home.sections.blog.title }}</h2>
      </div>
      <router-link to="/blog" class="blog-link">{{ settings.home.sections.blog.linkLabel }} <span aria-hidden="true">→</span></router-link>
    </header>

    <ol class="blog-list">
      <li v-for="post in items" :key="post.slug" class="blog-row">
        <time :datetime="post.date" class="blog-date">{{ formatDate(post.date) }}</time>
        <div>
          <h3 class="blog-title">{{ post.title }}</h3>
          <p class="blog-summary mb-0">{{ post.summary }}</p>
        </div>
        <span class="blog-time">{{ post.readingTime }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.blog-section {
  margin-bottom: clamp(5rem, 10vh, 8rem);
}

.blog-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.blog-heading-wrap {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.blog-count,
.blog-date,
.blog-time {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.58;
}

.blog-heading {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 0.95;
}

.blog-link {
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration-color: rgba(128, 128, 128, 0.5);
  text-underline-offset: 0.25rem;
}

.blog-link:hover,
.blog-link:focus-visible {
  color: rgb(var(--v-theme-primary));
}

.blog-list {
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(128, 128, 128, 0.22);
  list-style: none;
}

.blog-row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  gap: clamp(1.25rem, 4vw, 3rem);
  padding: 1.6rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.18);
}

.blog-date,
.blog-time {
  padding-top: 0.25rem;
}

.blog-title {
  margin-bottom: 0.35rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45;
}

.blog-summary {
  max-width: 66ch;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  line-height: 1.6;
  opacity: 0.62;
}

@media (max-width: 650px) {
  .blog-row {
    grid-template-columns: 1fr auto;
  }

  .blog-date {
    grid-column: 1 / -1;
  }
}
</style>
