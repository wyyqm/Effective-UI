import Vue from 'vue'

export default function makeFloatState() {
  let float = null

  let doneResolve = null
  const state = Vue.observable({
    data: {},
    isMount: false,
    innerVisible: false,
    reference: null,
  })

  state.summon = async (data, reference = null) => {
    // 单例模式，先关掉之前的再打开
    if (state.isMount) {
      await state.cancel()
    }

    state.data = data || {}

    let promise = new Promise((resolve) => {
      doneResolve = resolve
    })

    state.isMount = true
    state.reference = reference

    Vue.nextTick(() => {
      state.innerVisible = true
    })

    return promise
  }

  state.open = (data, reference = null) => {
    return state.summon(data, reference).then((res) => {
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
    state.reference = null

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

  return state
}
