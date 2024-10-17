import type { NavItem } from '@nuxt/content/types'

export default interface ISimpleSitemap {
  title: string
  _path: string
  children?: NavItem[] & { lastmod?: string }
}
