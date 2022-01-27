export function getTextFromTextVNode(node) {
  if (Array.isArray(node) && node.length === 1 && node[0]) {
    return node[0].tag ? false : node[0].text
  }
  return false
}
