<script setup lang="ts">
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

const runtimeConfig = useRuntimeConfig()
const $route = useRoute()

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: runtimeConfig.public.APP_URL + $route.path
    }
  ]
}))

onMounted(async () => {
  if (!$pwa) {
    return
  }

  if ($pwa.offlineReady) {
    console.info('App is ready to work offline')
  }

  if ($pwa.isInstalled) {
    if ($pwa.needRefresh) {
      console.info('App has update available')

      await $pwa.updateServiceWorker()
      await $pwa.install()
    }
  } else {
    $pwa.showInstallPrompt = true
    $pwa.install()
  }
})

onBeforeMount(() => {
  initFlowbite()
})
</script>

<template>
  <div>
    <VitePwaManifest />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
