import type { ToCNode, ToCFlatNode } from '@/types'

/**
 * Flattens a tree of nodes into an array of nodes with children as ids
 *
 * @description This function is used to flatten the table of contents tree
 * @param {ToCNode[]} into The array to flatten into
 * @param {ToCNode} node The node to flatten
 * @returns {ToCNode[]} The flattened array
 */
function flattenToC(into: ToCNode[], node?: ToCNode | ToCNode[]): ToCNode[] {
  if (node == null) return into
  if (Array.isArray(node)) return node.reduce(flattenToC, into)
  into.push(node)
  return flattenToC(into, (node as ToCNode).children as any)
}

/**
 * Converts a tree of nodes into a flat object of nodes with children as ids
 *
 * @description This function is used to convert the table of contents tree into a flat object
 * @param {ToCNode[]} data The tree to convert
 * @returns {ToCFlatNode} The converted tree
 * @example
 * const tree = [
 *   {
 *     id: '1',
 *     text: '1',
 *     depth: 1,
 *     children: [
 *   {
 *     id: '1.1',
 *     text: '1.1',
 *     depth: 2
 *   },
 *   {
 *     id: '1.2',
 *     text: '1.2',
 *     depth: 2
 *   }
 * ]
 *
 * const flat = flatToCtoTree(tree)
 */
export function flatToCtoTree(data: ToCNode[]): { [key: string]: ToCFlatNode } {
  return Object.fromEntries(
    flattenToC([], data).map((node) => {
      const nodeData: ToCFlatNode = {
        id: node.id,
        text: node.text,
        parent: null
      }

      if (node.children && node.children.length > 0) {
        nodeData.children = node.children.map((child) => child.id)
      }

      const parent = data.find((p) => p.children?.includes(node))

      nodeData.parent = parent ? parent.id : null

      return [node.id, nodeData] as [string, ToCFlatNode]
    })
  )
}
