interface ToCBaseNode {
  id: string
  text: string
}

export interface ToCNode extends ToCBaseNode {
  children?: ToCNode[]
  depth: number
}

export interface ToCFlatNode extends ToCBaseNode {
  children?: string[]
  parent: string | null
  state?: {
    opened?: boolean
  }
}
