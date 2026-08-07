import { createRouter, createWebHistory } from 'vue-router'
import about from '@/data/about.json'
import settings from '@/data/site-settings.json'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsView.vue') },
  { path: '/research', name: 'research', component: () => import('@/views/ResearchView.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
]

const pageTitles = {
  home: settings.site.title || about.name,
  projects: settings.pages.projects.title,
  research: settings.pages.research.title,
  blog: settings.pages.blog.title,
  'not-found': settings.pages.notFound.title,
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  const siteTitle = settings.site.title || about.name
  const pageTitle = pageTitles[to.name]
  document.title = to.name === 'home' || !pageTitle ? siteTitle : `${pageTitle} — ${siteTitle}`
})

export default router
