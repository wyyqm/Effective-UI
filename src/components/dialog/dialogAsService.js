import Vue from 'vue'
import makeDialogState from '@/components/dialog/makeDialogState'

export default function dialogAsService(Component) {
  let DialogConstructor = Vue.extend(Component)
  let instance

  const handle = {
    summon(data, props) {
      const state = makeDialogState()
      const promise = state.summon(data)

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
    open(data, props) {
      return handle.summon(data, props).then((res) => {
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
