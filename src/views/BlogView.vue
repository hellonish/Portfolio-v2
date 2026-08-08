<script setup>
import { computed, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import blog from '@/data/blog.json'
import settings from '@/data/site-settings.json'

const activeTag = ref(null)
const allTags = computed(() => [...new Set(blog.flatMap((post) => post.tags))].sort())
const posts = computed(() => activeTag.value ? blog.filter((post) => post.tags.includes(activeTag.value)) : blog)

function emptyTagMessage(tag) {
  return settings.pages.blog.emptyTagMessage.replace('{tag}', tag)
}
</script>

<template>
  <div>
    <PageHeader
      :eyebrow="settings.pages.blog.eyebrow"
      :title="settings.pages.blog.title"
      description="Research notes and build write-ups shaped from experiments, systems decisions, and the results that changed my mind."
    />

    <div class="d-flex flex-wrap ga-1 mb-7">
      <v-chip :variant="activeTag === null ? 'flat' : 'tonal'" :color="activeTag === null ? 'primary' : undefined" size="small" @click="activeTag = null">{{ settings.pages.blog.allTagsLabel }}</v-chip>
      <v-chip v-for="tag in allTags" :key="tag" :variant="activeTag === tag ? 'flat' : 'tonal'" :color="activeTag === tag ? 'primary' : undefined" size="small" @click="activeTag = activeTag === tag ? null : tag">{{ tag }}</v-chip>
    </div>

    <div class="post-grid">
      <router-link v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="post-card">
        <div class="post-card__topline"><span>{{ post.kind }}</span><span>{{ post.year }} · {{ post.readingTime }}</span></div>
        <div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.summary }}</p>
        </div>
        <div class="post-card__footer"><span>{{ post.heroMetric.value }} <small>{{ post.heroMetric.label }}</small></span><span aria-hidden="true">→</span></div>
      </router-link>
    </div>

    <p v-if="!posts.length" class="text-body-2 mt-6" style="opacity: 0.6">{{ emptyTagMessage(activeTag) }}</p>
  </div>
</template>

<style scoped>
.post-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid rgba(128, 128, 128, 0.2); }
.post-card { display: grid; min-height: 19rem; padding: clamp(1.35rem, 3vw, 2rem); border-bottom: 1px solid rgba(128, 128, 128, 0.18); color: inherit; text-decoration: none; transition: background-color 180ms ease; }
.post-card:nth-child(odd) { border-right: 1px solid rgba(128, 128, 128, 0.18); }
.post-card:hover, .post-card:focus-visible { background: rgba(128, 128, 128, 0.08); }
.post-card__topline, .post-card__footer { display: flex; justify-content: space-between; gap: 1rem; font-family: var(--font-mono); font-size: 0.63rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.62; }
.post-card h2 { margin: 2.2rem 0 0.65rem; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 400; letter-spacing: -0.025em; line-height: 1; }
.post-card p { max-width: 52ch; font-size: 0.84rem; line-height: 1.65; opacity: 0.72; }
.post-card__footer { align-items: end; }
.post-card__footer > span:first-child { font-family: var(--font-sans); font-size: 0.93rem; font-weight: 600; letter-spacing: normal; text-transform: none; opacity: 1; }
.post-card__footer small { margin-left: 0.25rem; font-family: var(--font-mono); font-size: 0.58rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.7; }
.post-card__footer > span:last-child { font-size: 1.35rem; opacity: 1; transition: transform 180ms ease; }
.post-card:hover .post-card__footer > span:last-child { transform: translateX(0.3rem); }
@media (max-width: 650px) { .post-grid { grid-template-columns: 1fr; } .post-card:nth-child(odd) { border-right: 0; } .post-card { min-height: 16rem; } }
</style>
