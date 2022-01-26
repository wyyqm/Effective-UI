import Vue from 'vue'

export default function makeFloatState() {
  let float = null

  let doneResolve = null
  const state = Vue.observable({
    data: {},
    isMount: false,
    innerVisible: false,
  })

  state.summon = (data) => {
    state.data = data || {}

    const promise = new Promise((resolve) => {
      doneResolve = resolve
    })

    state.isMount = true

    Vue.nextTick(() => {
      state.innerVisible = true
    })

    return promise
  }

  state.open = (data) => {
    return state.summon(data).then((res) => {
      if (res.type === 'confirm') {
        return res.data
      } else {
        // never resolve
        return new Promise(() => {})
      }
    })
  }

  state.done = async (type, data) => {
    state.innerVisible = false

    float && await float.closedPromise()
    state.data = {}
    state.isMount = false

    doneResolve({ type, data, state })
    doneResolve = null
  }

  state.cancel = () => {
    return state.done('cancel')
  }

  state.confirm = (data) => {
    return state.done('confirm', data)
  }

  state.registerFloat = (instance) => {
    if (float) {
      throw new Error('FloatState 不能同时控制多个弹窗')
    }
    float = instance
    return () => {
      float = null
    }
  }

  state.syncFn = async (value) => {
    return state.open(value)
  }

  return state
}
