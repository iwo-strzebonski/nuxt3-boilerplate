<script setup lang="ts">
import { FwbPagination } from 'flowbite-vue'

import type { Article } from '~/types'

const $props = defineProps({
  parent: {
    type: String,
    required: false,
    default: ''
  }
})

const currentPage = ref(1)

const { data: articles, error } = useLazyAsyncData<Article[]>('articles', async () => {
  const {
    urlset: { url }
  } = await $fetch('/sitemap')

  // const v = await fetchContentNavigation()

  // console.debug('value', v)

  const arts = url
    .filter((u) => u.loc._text.includes(`/blog/articles${$props.parent && `/${$props.parent}/`}`))
    .map(
      (u) =>
        ({
          _path: u.loc._text.replace(location.origin, ''),
          slug: u.loc._text.split('/').pop(),
          lastmod: u.lastmod._text as string,
          createdAt: u.createdAt?._text as string,
          title: u.title?._text as string,
          description: u.description?._text as string,
          author: u.author?._text as string,
          image: u.image?._text,
          tags: u.tags?._text.split(', ')
        }) as Article
    )
    .filter((u) => u.title && u.description && u.author && u.createdAt)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    })

  return arts
})

const paginatedArticles = computed(() => {
  if (!articles.value) return []

  return articles.value.slice((currentPage.value - 1) * 4, currentPage.value * 4)
})

const totalPages = computed(() => {
  if (!articles.value) return 0

  return Math.ceil(articles.value.length / TOTAL_PER_PAGE)
})

onMounted(() => {
  refreshNuxtData('articles')
})

watch(error, (err) => {
  if (err) {
    alert('Wystąpił błąd podczas pobierania artykułów. Spróbuj ponownie później.')
  }
})

watch(currentPage, (page) => {
  if (page > totalPages.value) {
    currentPage.value = totalPages.value
  }

  if (page < 1) {
    currentPage.value = 1
  }
})

const TOTAL_PER_PAGE = 4
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap gap-4">
      <article-card v-for="article in paginatedArticles" :id="article.slug" :key="article._path" :article="article" />
    </div>

    <div class="w-full inline-flex justify-center items-center mt-4">
      <fwb-pagination
        v-model="currentPage"
        layout="table"
        :per-page="TOTAL_PER_PAGE"
        :total-items="(articles || []).length"
        class="flowbite"
      />
    </div>

    <!-- <pagination-component :current-page="currentPage" :total-pages="totalPages" @page-change="onPageChange($event)" /> -->
  </div>
</template>
