function takeOver(props) {
  const provideKey = Symbol('takeOver')
  const injectKey = `takeOver$${Math.random()}`
  const connectKey = `${injectKey}$connect`
  return {
    inject: {
      [injectKey]: {
        from: provideKey,
        default: null
      }
    },
    data() {
      const connect = Object.create(null)
      for (const prop of props) {
        connect[prop] = false
      }
      return {
        [connectKey]: connect
      }
    },
    beforeCreate() {
      this.__connected = Vue.observable(Object.create(null))
      const {propsData} = this.$options
      for (const prop of props) {
        // eslint-disable-next-line no-prototype-builtins
        Vue.set(this.__connected, prop, !propsData.hasOwnProperty(prop))
        // eslint-disable-next-line no-prototype-builtins
        if (!this.hasOwnProperty(prop)) {
          Object.defineProperty(this, prop, {
            configurable: true,
            get() {
              const originValue = this.$props[prop]
              if (this.paginationContext__ && this.__connected[prop]) {
                return this.paginationContext__.data[prop]
              }
              return originValue
            }
          })
        }
      }
    },
    beforeUpdate() {
      const { propsData } = this.$options
      for (const prop of props) {
        Vue.set(this.__connected, prop, !propsData.hasOwnProperty(prop))
      }
    },
  }
}
