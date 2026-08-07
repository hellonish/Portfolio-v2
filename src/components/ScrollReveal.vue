<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  delay: { type: Number, default: 0 },
})

const element = ref(null)
const isVisible = ref(false)
let observer

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return

      isVisible.value = true
      observer.unobserve(entry.target)
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  if (element.value) observer.observe(element.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="element"
    class="scroll-reveal"
    :class="{ 'scroll-reveal--visible': isVisible }"
    :style="{ '--reveal-delay': `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 620ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay);
}

.scroll-reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    transition: none;
  }
}
</style>
