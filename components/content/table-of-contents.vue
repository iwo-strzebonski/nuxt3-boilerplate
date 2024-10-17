<script lang="ts">
// @ts-expect-error - Vue 3 Treeview has no types
import Tree from 'vue3-treeview'

import { flatToCtoTree } from '~/helpers/nestedTocToFlat'

import type { ToCFlatNode } from '~/types'

interface TableOfContentsData {
  nodes: { [key: string]: ToCFlatNode }
  config: {
    roots: string[]
    keyboardNavigation: boolean
    editable: boolean
  }
}

export default {
  name: 'TableOfContents',
  components: {
    Tree
  },
  setup() {
    const {
      toc: { value }
    } = useContent()

    if (!value) return {}

    return {
      links: value.links
    }
  },
  data: (): TableOfContentsData => ({
    nodes: {},
    config: {
      roots: [],
      keyboardNavigation: true,
      editable: false
    }
  }),
  mounted() {
    this.$data.nodes = flatToCtoTree(this.links)
    this.$data.config.roots = Object.values(this.$data.nodes)
      .filter((node) => node.parent === null)
      .map((node) => node.id)
  },
  methods: {
    onNodeClick(node: ToCFlatNode | null) {
      if (!node) return

      const element = document.querySelector(`[href="#${node.id}"]`)

      if (!element) return

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<template>
  <div class="border rounded-lg p-4 shadow-md bg-zinc-800 border-zinc-700">
    <span class="text-sm text-zinc-500">Spis treści</span>

    <tree :nodes="nodes" :config="config" @node-focus="onNodeClick" />
  </div>
</template>
