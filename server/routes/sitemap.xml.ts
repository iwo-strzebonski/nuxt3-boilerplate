import { streamToPromise } from 'sitemap'

import getSitemapStream from '@/helpers/getSitemapStream'

export default defineEventHandler(async (event) => {
  const sitemap = await getSitemapStream(event)
  return streamToPromise(sitemap)
})
