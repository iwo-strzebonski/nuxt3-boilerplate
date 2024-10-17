<script setup lang="ts">
import { SizeName, ImageSize } from '~/helpers/getSizeNameFromSize'

interface TagProps {
  alt: string
  aspectRatio?: string
}

interface PictureTagProps extends TagProps {
  images: { src: string; size: SizeName }[]
}

interface ImageTagProps extends TagProps {
  image: {
    src: string
    size: SizeName
  }
}

const $props = defineProps<PictureTagProps | ImageTagProps>()

const backdropRef = ref<HTMLElement>()

const fullScreen = ref(false)

const transitionEnded = ref(true)

const backdropClassName = computed(() => {
  const base =
    'fixed w-screen h-screen inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-700 ease-in-out'

  const fs = fullScreen.value ? 'opacity-100' : 'opacity-0'

  const t = !fullScreen.value && transitionEnded.value ? '-z-10' : ''
  const notT = !transitionEnded.value ? 'z-20' : ''

  return `${base} ${fs} ${t} ${notT}`
})

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fullScreen.value = false
    }
  })

  backdropRef.value?.addEventListener('transitionstart', () => {
    if (fullScreen.value) {
      transitionEnded.value = false
    }
  })

  backdropRef.value?.addEventListener('transitionend', () => {
    if (!fullScreen.value) {
      transitionEnded.value = true
    }
  })
})
</script>

<template>
  <div>
    <picture
      v-if="'images' in $props && $props.images"
      :style="`aspect-ratio: ${$props.aspectRatio || 'auto'}`"
      class="!m-0 cursor-pointer"
      @click="fullScreen = true"
    >
      <source
        v-for="img in $props.images"
        :key="img.src"
        :srcset="img.src"
        :media="`(max-width: ${ImageSize[img.size]})`"
      />

      <nuxt-img
        :src="$props.images[$props.images.length - 1].src"
        :alt="$props.alt"
        class="object-cover w-full h-full"
      />
    </picture>

    <nuxt-img
      v-else-if="'image' in $props && $props.image"
      :src="$props.image.src"
      :alt="$props.alt"
      :style="{ width: ImageSize[$props.image.size], aspectRatio: $props.aspectRatio || 'auto' }"
      @click="fullScreen = true"
    />

    <div ref="backdropRef" :class="backdropClassName" @click="fullScreen = false">
      <picture v-if="'images' in $props && $props.images" class="md:w-2/3 !flex items-center justify-center">
        <source
          v-for="img in $props.images"
          :key="img.src"
          :srcset="img.src"
          :media="`(max-width: ${ImageSize[img.size]})`"
        />

        <nuxt-img
          :src="$props.images[$props.images.length - 1].src"
          :alt="$props.alt"
          style="max-width: calc(100vmin - 2rem); max-height: calc(100vmin - 2rem)"
        />
      </picture>

      <nuxt-img
        v-else-if="'image' in $props && $props.image"
        style="max-width: calc(100vmin - 2rem); max-height: calc(100vmin - 2rem)"
        class="md:w-2/3"
        :src="$props.image.src"
        :alt="$props.alt"
      />
    </div>
  </div>
</template>
