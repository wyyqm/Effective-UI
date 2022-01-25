import Vue from 'vue'
import makeDialogState from '@/components/dialog/makeDialogState'

export default function dialogAsService(Component) {
  let DialogConstructor = Vue.extend(Component)
  let instance

  const handle = {
    summonDialog(initialState, props) {
      const state = makeDialogState(initialState)
      instance = new DialogConstructor({
        propsData: {
          state,
          ...props,
        }
      })

      instance.$mount()
      document.body.appendChild(instance.$el)

      return state.summon(state.data).then((ret) => {
        instance.$destroy()
        instance.$el.parentNode.removeChild(instance.$el)
        return ret
      })
    },
    openDialog(initialState, props) {
      return handle.summonDialog(initialState, props).then((res) => {
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
