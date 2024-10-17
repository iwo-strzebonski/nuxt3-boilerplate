import { streamToPromise } from 'sitemap'

import getSitemapStream from '@/helpers/getSitemapStream'

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'content-type': 'application/xml',
  })
  
  const sitemap = await getSitemapStream(event)
  return streamToPromise(sitemap)
})
