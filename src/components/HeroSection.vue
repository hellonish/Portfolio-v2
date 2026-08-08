<script setup>
import about from '@/data/about.json'
import settings from '@/data/site-settings.json'
import portraitUrl from '../../picture.png'
</script>

<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="hero-kicker mb-5">{{ about.hero.kicker }}</p>

      <h1 id="hero-title" class="hero-title mb-7">{{ about.name }}</h1>

      <p class="hero-summary mb-5">
        {{ about.hero.summary }}
      </p>
      <p class="hero-note mb-0">{{ about.hero.note }}</p>

      <nav class="hero-actions mt-9" aria-label="Portfolio links">
        <a :href="`mailto:${about.email}`" class="hero-link">
          {{ settings.home.hero.contactLabel }} <span aria-hidden="true">↗</span>
        </a>
        <a
          :href="about.resume"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-link"
        >
          {{ settings.home.hero.resumeLabel }} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </div>

    <div class="hero-portrait-frame">
      <img
        :src="portraitUrl"
        :alt="`Portrait of ${about.name}`"
        class="hero-portrait"
        width="720"
        height="720"
        fetchpriority="high"
      />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.65fr);
  align-items: center;
  gap: clamp(3rem, 7vw, 6rem);
  min-height: min(690px, calc(100vh - 7rem));
  padding: clamp(2rem, 6vh, 4.5rem) 0 clamp(4rem, 9vh, 7rem);
}

.hero-copy {
  max-width: 650px;
}

.hero-kicker,
.hero-summary,
.hero-note,
.hero-link {
  font-family: var(--font-sans);
}

.hero-kicker {
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
  opacity: 0.66;
}

.hero-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(4rem, 6.6vw, 6rem);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.88;
  white-space: nowrap;
}

.hero-summary {
  max-width: 52ch;
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  line-height: 1.65;
}

.hero-note {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.66;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  color: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  transition: border-color 160ms ease, color 160ms ease;
}

.hero-link:hover,
.hero-link:focus-visible {
  border-color: currentColor;
  color: rgb(var(--v-theme-primary));
}

.hero-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}

.hero-portrait-frame {
  overflow: hidden;
  width: min(100%, 220px);
  aspect-ratio: 4 / 5;
  justify-self: end;
  border: 1px solid rgba(128, 128, 128, 0.22);
  border-radius: 8px;
  background: rgb(var(--v-theme-surface-variant));
}

.hero-portrait {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 49% 50%;
  filter: saturate(0.78) contrast(1.02);
}

@media (max-width: 959px) {
  .hero-section {
    grid-template-columns: minmax(0, 1fr) minmax(220px, 0.65fr);
    gap: 2.75rem;
    min-height: auto;
    padding-top: 2rem;
  }
}

@media (max-width: 700px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 1rem 0 4.5rem;
  }

  .hero-copy {
    order: 2;
  }

  .hero-title {
    font-size: clamp(2.9rem, 14vw, 4.5rem);
  }

  .hero-portrait-frame {
    width: min(72%, 240px);
    aspect-ratio: 5 / 4;
    justify-self: center;
  }

  .hero-portrait {
    object-position: 50% 43%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-link {
    transition: none;
  }
}
</style>
