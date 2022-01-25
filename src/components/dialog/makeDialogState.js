import Vue from 'vue'

export default function makeDialogState() {
  let dialog = null

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

    dialog && await dialog.closedPromise()
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

  state.registerDialog = (instance) => {
    if (dialog) {
      throw new Error('DialogState 不能同时控制多个弹窗')
    }
    dialog = instance
    return () => {
      dialog = null
    }
  }

  return state
}
