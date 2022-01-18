const docMoCallbacks = new Set()

let docMoObserved = false

const docMo = new MutationObserver((mutations) => {
  for (const cb of docMoCallbacks) {
    cb(mutations)
  }
})

export function observeDocumentMutation(callback) {
  if (!docMoObserved) {
    docMo.observe(window.document, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    })

    docMoObserved = true
  }

  docMoCallbacks.add(callback)

  return function disconnect() {
    docMoCallbacks.delete(callback)
    if (docMoCallbacks.size === 0) {
      docMo.disconnect()
      docMoObserved = false
    }
  }
}
