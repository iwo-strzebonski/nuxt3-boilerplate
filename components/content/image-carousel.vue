<script setup lang="ts">
import type ImageProp from '~/types/ImageProp'

const $props = defineProps({
  images: {
    type: Object as PropType<ImageProp[]>,
    required: true,
    default: () => [] as ImageProp[]
  }
})

const activeIndex = ref(0)

/**
 * Set the active index of the carousel.
 * @param {number} index - The index to set.
 */
function setActiveIndex(index: number): void {
  if (index < 0) {
    activeIndex.value = $props.images.length - 1
  } else if (index >= $props.images.length) {
    activeIndex.value = 0
  } else {
    activeIndex.value = index
  }
}

/**
 * Get the position class of the image.
 * @param {number} index - The index of the image.
 * @returns {string} The position class.
 */
function getImagePositionClass(index: number): string {
  if (index === activeIndex.value) {
    return 'translate-x-0'
  }

  if (index - activeIndex.value >= 1 || index === $props.images.length - 1) {
    return 'translate-x-full'
  }

  if (index - activeIndex.value <= -1 || index === 0) {
    return '-translate-x-full'
  }

  return 'hidden'
}
</script>

<template>
  <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <!-- Items -->
      <div
        v-for="(image, index) in $props.images"
        :id="`image-${index}`"
        :key="image.alt"
        class="duration-700 ease-in-out absolute inset-y-0 -inset-x-[0.5px] transition-transform z-10"
        :class="`${getImagePositionClass(index)}`"
        data-carousel-item
      >
        <nuxt-img
          class="absolute block w-full h-full !m-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-scale-down"
          :src="image.src"
          :alt="image.alt"
        />
      </div>
    </div>

    <!-- Slider indicators -->
    <div
      class="absolute z-20 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 bg-white/30 dark:bg-zinc-800/30 px-3 py-2 rounded-md"
    >
      <button
        v-for="(_, index) in images"
        :id="`button-${index}`"
        :key="`button-${index}`"
        type="button"
        :class="
          index === activeIndex
            ? 'bg-black dark:bg-white border-black dark:border-white'
            : 'bg-zinc-500 border-zinc-500 hover:bg-zinc-600 dark:hover:bg-zinc-400 hover:border-zinc-600 dark:hover:border-zinc-400'
        "
        class="w-3 h-3 rounded-full border focus:outline-none backdrop-invert"
        aria-current="true"
        :aria-label="`Slide ${index}`"
        :data-carousel-slide-to="index"
        @click="setActiveIndex(index)"
      ></button>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 left-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
      @click="setActiveIndex(activeIndex - 1)"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-zinc-800/30 group-hover:bg-zinc-800/60 group-focus:ring-4 group-focus:ring-zinc-800/70 group-focus:outline-none"
      >
        <lazy-client-only>
          <fa-icon icon="fa-solid fa-chevron-left" class="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </lazy-client-only>
        <span class="sr-only">Previous</span>
      </span>
    </button>

    <button
      type="button"
      class="absolute top-0 right-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
      @click="setActiveIndex(activeIndex + 1)"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-zinc-800/30 group-hover:bg-zinc-800/60 group-focus:ring-4 group-focus:ring-zinc-800/70 group-focus:outline-none"
      >
        <lazy-client-only>
          <fa-icon icon="fa-solid fa-chevron-right" class="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </lazy-client-only>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>
