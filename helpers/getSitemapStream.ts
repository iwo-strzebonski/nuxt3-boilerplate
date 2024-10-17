import { SitemapStream } from 'sitemap'

import checkForLocalhost from './checkForLocalhost'

// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server'

/**
 * Get sitemap stream
 *
 * @description This function is used to generate a sitemap stream
 * @param {any} event - event
 * @returns {Promise<SitemapStream>} - sitemap stream
 */
export default async function getSitemapStream(event: any) {
  const hostname = checkForLocalhost(event.node.req.headers.host as string)
    ? `http://${event.node.req.headers.host}`
    : `https://${event.node.req.headers.host}`

  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname
  })

  docs.forEach((doc) => {
    sitemap.write({
      url: doc._path,
      title: doc.title,
      changefreq: 'monthly',
      lastmod: doc.lastmod,
      priority: 0.5
    })
  })

  sitemap.end()
  return sitemap
}
