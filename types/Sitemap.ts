export default interface Sitemap {
  loc: string
  title: string
  children: {
    loc: string
    title: string
  }[]
}
