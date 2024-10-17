export default interface Article {
  _path: string
  slug: string
  lastmod: string
  createdAt: string
  title: string
  description: string
  author: string
  image?: string
  tags?: string[]
}
