import { streamToPromise } from 'sitemap'
import convert from 'xml-js'

import checkForLocalhost from '@/helpers/checkForLocalhost'
import getSitemapStream from '@/helpers/getSitemapStream'

import type { SitemapXML } from '@/types'

// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server'

interface IPageMeta {
  name: string
  content: string
}

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'content-type': 'application/json',
  })

  const docs = await serverQueryContent(event).find()
  const sitemap = await getSitemapStream(event)
  const sitemapString = (await streamToPromise(sitemap)).toString()
  // eslint-disable-next-line import/no-named-as-default-member
  const sitemapJSON = convert.xml2js(sitemapString, { compact: true }) as SitemapXML
  const hostname = checkForLocalhost(event.node.req.headers.host as string)
    ? `http://${event.node.req.headers.host}`
    : `https://${event.node.req.headers.host}`

  docs.forEach((doc) => {
    const index = sitemapJSON.urlset.url.findIndex((url) => url.loc._text === `${hostname}${doc._path}`)

    if (index === -1) {
      return
    }

    sitemapJSON.urlset.url[index].loc._text = `${doc._path}`

    const { description, title, head, image } = doc

    const meta = head.meta as IPageMeta[]

    if (description) sitemapJSON.urlset.url[index].description = { _text: description }
    if (image) sitemapJSON.urlset.url[index].image = { _text: doc.image }
    if (title) sitemapJSON.urlset.url[index].title = { _text: title }
    if (meta.length) {
      const author = (meta as IPageMeta[]).find((m) => m.name === 'author')
      const tags = (meta as IPageMeta[]).find((m) => m.name === 'keywords')
      const createdAt = (meta as IPageMeta[]).find((m) => m.name === 'createdAt')

      if (author) {
        sitemapJSON.urlset.url[index].author = {
          _text: author.content
        }
      }

      if (tags) {
        sitemapJSON.urlset.url[index].tags = {
          _text: tags.content
        }
      }

      if (createdAt) {
        sitemapJSON.urlset.url[index].createdAt = {
          _text: createdAt.content
        }
      }
    }
  })

  return sitemapJSON
})
