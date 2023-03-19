<script lang="ts">
export default {
  name: 'ThemeSwitcher',
  mounted() {
    const colorMode = localStorage.getItem('color-mode')

    if (colorMode === 'dark' || colorMode === 'light') {
      this.$colorMode.preference = colorMode
      return
    }

    this.$colorMode.preference = 'dark'
    localStorage.setItem('color-mode', 'dark')
  },
  methods: {
    toggleTheme(): void {
      this.$colorMode.preference = this.$colorMode.preference === 'dark' ? 'light' : 'dark'

      localStorage.setItem('color-mode', this.$colorMode.preference)
    }
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex relative gap-x-3 px-1 py-1 border-solid border-2 rounded-3xl border-black dark:border-white"
    title="Toggle theme"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <lazy-client-only>
      <fa-icon icon="fa-solid fa-moon" class="h-4 w-4" />
      <fa-icon icon="fa-regular fa-sun" class="h-4 w-4" />
      <div
        class="absolute rounded-xl h-5 w-5 top-0.5 left-0.5 dark:left-[calc(100%_-_22px)] duration-300 ease-in-out bg-black dark:bg-white"
      ></div>
    </lazy-client-only>
  </button>
</template>
