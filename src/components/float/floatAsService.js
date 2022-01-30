import Vue from 'vue'
import makeDialogState from '@/components/float/makeFloatState'

export default function floatAsService(Component) {
  let DialogConstructor = Vue.extend(Component)
  let instance

  const handle = {
    summon(data, props, reference = null) {
      const state = makeDialogState()
      const promise = state.summon(data, reference)

      instance = new DialogConstructor({
        propsData: {
          state,
          ...props,
        }
      })

      instance.$mount()
      document.body.appendChild(instance.$el)

      return promise.then((ret) => {
        instance.$destroy()
        instance.$el.parentNode.removeChild(instance.$el)
        return ret
      })
    },
    open(data, props, reference = null) {
      return handle.summon(data, props, reference).then((res) => {
        if (res.type === 'confirm') {
          return res.data
        } else {
          // never resolve
          return new Promise(() => {})
        }
      })
    }
  }

  Object.defineProperty(handle, 'current', {
    get() {
      return instance
    }
  })

  return handle
}
