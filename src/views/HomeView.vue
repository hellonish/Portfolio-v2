<script setup>
import { computed } from 'vue'
import BlogSection from '@/components/BlogSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import HighlightsSection from '@/components/HighlightsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ResearchSection from '@/components/ResearchSection.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import projects from '@/data/projects.json'
import research from '@/data/research.json'
import blog from '@/data/blog.json'
import settings from '@/data/site-settings.json'

const DEFAULT_SECTION_LIMIT = 3

function sectionSettings(section) {
  return settings.home?.sections?.[section] ?? {}
}

function sectionLimit(section) {
  const configured = Number(sectionSettings(section).limit)
  return Number.isInteger(configured) && configured > 0 ? configured : DEFAULT_SECTION_LIMIT
}

function selectItems(items, section) {
  const config = sectionSettings(section)
  const eligible = config.featuredOnly ? items.filter((item) => item.featured) : items
  return eligible.slice(0, sectionLimit(section))
}

const projectItems = computed(() => selectItems(projects, 'projects'))
const researchItems = computed(() => selectItems(research, 'research'))

const blogItems = computed(() =>
  selectItems(
    [...blog].sort((a, b) => new Date(b.date) - new Date(a.date)),
    'blog',
  ),
)
</script>

<template>
  <div>
    <HeroSection />
    <ScrollReveal>
      <HighlightsSection />
    </ScrollReveal>
    <ScrollReveal :delay="50">
      <ProjectsSection :items="projectItems" />
    </ScrollReveal>
    <ScrollReveal :delay="50">
      <ResearchSection :items="researchItems" />
    </ScrollReveal>
    <ScrollReveal :delay="50">
      <BlogSection :items="blogItems" />
    </ScrollReveal>
  </div>
</template>
