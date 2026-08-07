<script setup>
import about from '@/data/about.json'
import settings from '@/data/site-settings.json'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__intro">
        <p class="site-footer__name mb-3">{{ about.name }}</p>
        <p class="site-footer__summary mb-0">
          {{ about.tagline }}
        </p>
        <p class="site-footer__location mb-0">{{ about.location }} · {{ about.availability }}</p>
      </div>

      <nav class="site-footer__column" aria-label="Footer navigation">
        <p class="site-footer__label">{{ settings.site.footer.navigationLabel }}</p>
        <router-link v-for="item in settings.navigation" :key="item.to" :to="item.to" class="site-footer__link">
          {{ item.label }}
        </router-link>
      </nav>

      <div class="site-footer__column">
        <p class="site-footer__label">{{ settings.site.footer.connectLabel }}</p>
        <a
          v-for="social in about.socials"
          :key="social.label"
          :href="social.url"
          :target="social.url.startsWith('http') ? '_blank' : undefined"
          :rel="social.url.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="site-footer__link"
        >
          {{ social.label }}
          <span v-if="social.url.startsWith('http')" aria-hidden="true">↗</span>
        </a>
        <a :href="about.resume" target="_blank" rel="noopener noreferrer" class="site-footer__link">
          {{ settings.site.footer.resumeLabel }} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="site-footer__bottom">
        <span>© {{ currentYear }} {{ about.name }}</span>
        <a :href="`mailto:${about.email}`" class="site-footer__email">{{ about.email }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: clamp(3rem, 8vh, 6rem);
  border-top: 1px solid rgba(128, 128, 128, 0.22);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(110px, 0.45fr) minmax(110px, 0.45fr);
  gap: clamp(2rem, 6vw, 5rem);
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(2.5rem, 6vw, 4rem) 2rem 1.5rem;
}

.site-footer__name {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.65rem;
  line-height: 1;
}

.site-footer__summary {
  max-width: 45ch;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  line-height: 1.65;
  opacity: 0.7;
}

.site-footer__location,
.site-footer__label,
.site-footer__bottom {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.09em;
  line-height: 1.6;
  text-transform: uppercase;
  opacity: 0.58;
}

.site-footer__location {
  margin-top: 1.25rem;
}

.site-footer__column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
}

.site-footer__label {
  margin-bottom: 0.3rem;
}

.site-footer__link,
.site-footer__email {
  color: inherit;
  font-family: var(--font-sans);
  font-size: 0.84rem;
  line-height: 1.5;
  text-decoration-color: transparent;
  text-underline-offset: 0.25rem;
  transition: color 160ms ease, text-decoration-color 160ms ease;
}

.site-footer__link:hover,
.site-footer__link:focus-visible,
.site-footer__email:hover,
.site-footer__email:focus-visible {
  color: rgb(var(--v-theme-primary));
  text-decoration-color: currentColor;
}

.site-footer__bottom {
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(128, 128, 128, 0.16);
}

.site-footer__email {
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: none;
}

@media (max-width: 700px) {
  .site-footer__inner {
    grid-template-columns: 1fr 1fr;
    padding-inline: 1.5rem;
  }

  .site-footer__intro {
    grid-column: 1 / -1;
  }

  .site-footer__bottom {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-footer__link,
  .site-footer__email {
    transition: none;
  }
}
</style>
