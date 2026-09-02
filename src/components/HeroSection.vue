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
        <a :href="`mailto:${about.email}`" class="hero-link hero-link--launch">
          <span>{{ settings.home.hero.contactLabel }}</span>
          <span class="hero-link__arrow hero-link__arrow--launch" aria-hidden="true">
            <span>↗</span><span>↗</span>
          </span>
        </a>
        <a
          :href="about.resume"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-link hero-link--launch"
        >
          <span>{{ settings.home.hero.resumeLabel }}</span>
          <span class="hero-link__arrow hero-link__arrow--launch" aria-hidden="true">
            <span>↗</span><span>↗</span>
          </span>
        </a>
        <a
          href="https://twitter.com/nishant_sh20"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-link hero-link--launch"
        >
          <span>Twitter</span>
          <span class="hero-link__arrow hero-link__arrow--launch" aria-hidden="true">
            <span>↗</span><span>↗</span>
          </span>
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
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 610px);
  align-items: center;
  gap: clamp(2.5rem, 5vw, 5rem);
  min-height: 100vh;
  padding: clamp(2rem, 6vh, 4.5rem) 0 clamp(4rem, 9vh, 7rem);
  isolation: isolate;
  overflow: hidden;
}

.hero-copy,
.hero-portrait-frame {
  position: relative;
  z-index: 1;
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
  font-family: 'Passero One', cursive;
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
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0 0.4rem;
  color: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  transition: color 180ms ease;
}

.hero-link::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: currentColor;
  content: '';
  opacity: 0.45;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
}

.hero-link__arrow {
  display: inline-block;
  line-height: 1;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease, border-color 180ms ease, box-shadow 260ms ease;
}

/* The arrow launches out and a fresh one takes its place. */
.hero-link--launch::after {
  transform: scaleX(0.38);
  transform-origin: left;
}

.hero-link--launch:hover::after,
.hero-link--launch:focus-visible::after {
  transform: scaleX(1);
  opacity: 1;
}

.hero-link__arrow--launch {
  position: relative;
  width: 1em;
  height: 1.1em;
  overflow: hidden;
}

.hero-link__arrow--launch span {
  position: absolute;
  inset: 0;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
}

.hero-link__arrow--launch span:last-child {
  transform: translate(-0.42rem, 0.42rem);
  opacity: 0;
}

.hero-link--launch:hover .hero-link__arrow--launch span:first-child,
.hero-link--launch:focus-visible .hero-link__arrow--launch span:first-child {
  transform: translate(0.42rem, -0.42rem);
  opacity: 0;
}

.hero-link--launch:hover .hero-link__arrow--launch span:last-child,
.hero-link--launch:focus-visible .hero-link__arrow--launch span:last-child {
  transform: translate(0);
  opacity: 1;
}

.hero-link:hover,
.hero-link:focus-visible {
  color: rgb(var(--v-theme-primary));
}

.hero-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}

.hero-portrait-frame {
  overflow: hidden;
  width: auto;
  height: 50vh;
  aspect-ratio: 1;
  justify-self: end;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 50%;
  background: rgb(var(--v-theme-surface-variant));
}

.hero-portrait {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 39%;
  transform: scale(1.1);
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
    width: min(100%, 360px);
    height: auto;
    aspect-ratio: 1;
    justify-self: center;
  }

  .hero-portrait {
    object-position: 50% 39%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-link,
  .hero-link::after,
  .hero-link__arrow,
  .hero-link__arrow--launch span {
    transition: none;
  }

  .hero-link:hover .hero-link__arrow,
  .hero-link:focus-visible .hero-link__arrow {
    transform: none;
  }

  .hero-link--launch:hover .hero-link__arrow--launch span:first-child,
  .hero-link--launch:focus-visible .hero-link__arrow--launch span:first-child {
    transform: none;
    opacity: 1;
  }

  .hero-link--launch:hover .hero-link__arrow--launch span:last-child,
  .hero-link--launch:focus-visible .hero-link__arrow--launch span:last-child {
    opacity: 0;
  }
}
</style>
