<script setup lang="ts">
const academicYear = computed(() => {
  const startYear = new Date().getMonth() < 7 ? new Date().getFullYear() - 1 : new Date().getFullYear()
  const endYear = startYear + 1

  return `${startYear}/${endYear}`
})
</script>

<template>
  <span>
    {{ academicYear }}
  </span>
</template>
