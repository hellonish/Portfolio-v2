<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import blog from '@/data/blog.json'

const route = useRoute()
const post = computed(() => blog.find((item) => item.slug === route.params.slug))
</script>

<template>
  <article v-if="post" class="article">
    <header class="article__header">
      <div class="article__meta"><span>{{ post.kind }}</span><span>{{ post.year }} · {{ post.readingTime }}</span></div>
      <h1>{{ post.title }}</h1>
      <p class="article__intro">{{ post.intro }}</p>
      <div class="article__tags">
        <v-chip v-for="tag in post.tags" :key="tag" size="small" variant="tonal">{{ tag }}</v-chip>
      </div>
    </header>

    <section class="article__metric" :aria-label="post.heroMetric.label">
      <span>{{ post.heroMetric.label }}</span>
      <strong>{{ post.heroMetric.value }}</strong>
    </section>

    <div class="article__body">
      <section v-for="section in post.sections" :key="section.title" class="article__section">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </section>

      <section v-if="post.steps" class="article__section article__steps">
        <p class="article__eyebrow">Method in three moves</p>
        <ol>
          <li v-for="(step, index) in post.steps" :key="step"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ step }}</li>
        </ol>
      </section>

      <section class="article__results">
        <p class="article__eyebrow">Selected results</p>
        <dl>
          <div v-for="result in post.results" :key="result.label">
            <dt>{{ result.label }}</dt>
            <dd>{{ result.value }}</dd>
          </div>
        </dl>
      </section>

      <aside class="article__takeaway">
        <p class="article__eyebrow">What stayed with me</p>
        <p>{{ post.takeaway }}</p>
      </aside>

      <div class="article__actions">
        <a v-if="post.links.report" :href="post.links.report" target="_blank" rel="noopener noreferrer">Read the full report <span aria-hidden="true">↗</span></a>
        <a v-if="post.links.external" :href="post.links.external" target="_blank" rel="noopener noreferrer">{{ post.links.externalLabel }} <span aria-hidden="true">↗</span></a>
        <router-link to="/blog">More writing <span aria-hidden="true">→</span></router-link>
      </div>
    </div>
  </article>

  <div v-else class="article__missing">
    <p class="eyebrow">Writing</p>
    <h1>Post not found</h1>
    <router-link to="/blog">Back to writing →</router-link>
  </div>
</template>

<style scoped>
.article { padding-bottom: 3rem; }
.article__header { max-width: 60rem; padding: clamp(1rem, 4vw, 3rem) 0 clamp(2.5rem, 6vw, 5rem); }
.article__meta, .article__eyebrow { display: flex; gap: 1rem; font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.62; }
.article__header h1, .article__missing h1 { max-width: 18ch; margin: 1.5rem 0; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(3.1rem, 8vw, 6.4rem); font-weight: 400; letter-spacing: -0.055em; line-height: 0.89; }
.article__intro { max-width: 61ch; margin-bottom: 1.5rem; font-size: clamp(1rem, 1.7vw, 1.2rem); line-height: 1.65; opacity: 0.78; }
.article__tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.article__metric { display: flex; flex-direction: column; justify-content: end; min-height: clamp(15rem, 27vw, 22rem); padding: clamp(1.5rem, 4vw, 3rem); background: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary)); }
.article__metric span { margin-bottom: 0.7rem; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.75; }
.article__metric strong { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(4rem, 11vw, 9rem); font-weight: 400; letter-spacing: -0.06em; line-height: 0.8; }
.article__body { max-width: 46rem; margin: 0 auto; padding-top: clamp(3rem, 9vw, 7rem); }
.article__section { margin-bottom: 3rem; }
.article__section h2 { margin-bottom: 0.75rem; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; letter-spacing: -0.035em; line-height: 0.98; }
.article__section p, .article__takeaway > p:last-child { font-size: 1rem; line-height: 1.8; opacity: 0.8; }
.article__steps { margin-top: 4.25rem; padding: 1.75rem 0; border-top: 1px solid rgba(128, 128, 128, 0.24); border-bottom: 1px solid rgba(128, 128, 128, 0.24); }
.article__steps ol { margin: 1.2rem 0 0; padding: 0; list-style: none; }
.article__steps li { display: grid; grid-template-columns: 2.5rem 1fr; gap: 0.65rem; padding: 0.75rem 0; font-size: 0.93rem; line-height: 1.55; border-top: 1px solid rgba(128, 128, 128, 0.15); }
.article__steps li:first-child { border-top: 0; }
.article__steps li span { font-family: var(--font-mono); font-size: 0.67rem; letter-spacing: 0.05em; opacity: 0.58; }
.article__results { margin: 4rem 0; padding: 1.75rem; background: rgba(128, 128, 128, 0.08); }
.article__results dl { margin: 1.2rem 0 0; }
.article__results dl > div { display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; padding: 0.85rem 0; border-top: 1px solid rgba(128, 128, 128, 0.2); }
.article__results dt { font-size: 0.85rem; opacity: 0.73; }
.article__results dd { margin: 0; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; text-align: right; }
.article__takeaway { margin: 4.25rem 0; padding-left: clamp(1.25rem, 3vw, 2.5rem); border-left: 2px solid rgb(var(--v-theme-primary)); }
.article__takeaway > p:last-child { margin: 0.6rem 0 0; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.55rem, 3vw, 2.2rem); line-height: 1.2; opacity: 1; }
.article__actions { display: flex; flex-wrap: wrap; gap: 1.5rem; padding-top: 1.4rem; border-top: 1px solid rgba(128, 128, 128, 0.22); }
.article__actions a, .article__missing a { color: inherit; font-size: 0.83rem; font-weight: 600; text-decoration-color: rgba(128, 128, 128, 0.5); text-underline-offset: 0.25rem; }
.article__actions a:hover, .article__actions a:focus-visible, .article__missing a:hover, .article__missing a:focus-visible { color: rgb(var(--v-theme-primary)); }
.article__missing { padding: 2rem 0 5rem; }
@media (max-width: 600px) { .article__meta { flex-direction: column; gap: 0.3rem; } .article__metric { margin-left: -1.5rem; margin-right: -1.5rem; } .article__results { padding: 1.25rem; } }
</style>
