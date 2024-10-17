<script setup lang="ts">
import type { Article } from '~/types'

const $props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true
  }
})
</script>

<template>
  <nuxt-link
    :id="$props.article.slug"
    :to="$props.article._path"
    class="block w-full md:w-[calc(50%_-_0.5rem)] p-6 bg-white border border-zinc-200 rounded-lg shadow hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 no-underline"
  >
    <div v-if="$props.article.image" class="article-card__image">
      <img :src="$props.article.image" :alt="$props.article.title" />
    </div>

    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {{ $props.article.title }}
      </h5>

      <span class="mb-4 text-sm font-light text-zinc-700 dark:text-zinc-400">
        {{ new Date($props.article.createdAt).toLocaleString() }} &middot; {{ $props.article.author }}
      </span>
    </div>

    <p class="font-normal text-zinc-700 dark:text-zinc-400">
      {{ $props.article.description }}
    </p>

    <div v-if="$props.article.tags && $props.article.tags.length" class="text-sm text-zinc-700 dark:text-zinc-400">
      Tagi: {{ $props.article.tags.join(', ') }}
    </div>

    <div class="text-xs font-light text-zinc-700 dark:text-zinc-400">
      Ostatnia modyfikacja: {{ new Date($props.article.lastmod).toLocaleString() }}
    </div>
  </nuxt-link>
</template>
