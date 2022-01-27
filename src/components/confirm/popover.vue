<script>
import { Button, Popover } from 'element-ui'
import { innerProps } from './utils'

export default {
  name: 'ef-confirm-popover',
  props: {
    ...Popover.props,
    ...innerProps,
    content: {},
  },
  data() {
    return {
      innerVisible: false,
      confirmed: false,
      closedResolve: null,
    }
  },
  computed: {
    passedPopoverData() {
      const { content, ...rest } = this.$props
      return {
        props: {
          transition: 'el-zoom-in-bottom',
          placement: 'bottom',
          ...rest,
          value: this.innerVisible,
        },
        on: { input: this.onInput, 'after-leave': this.afterLeave }
      }
    }
  },
  methods: {
    async onInput(value) {
      this.innerVisible = value
    },
    async onConfirm() {
      let result = this.beforeConfirm()
      if (typeof result?.then === 'function') {
        try {
          this.$emit('update:loading', true)
          result = await result
        } finally {
          this.$emit('update:loading', false)
        }
      }
      if (result) {
        this.confirmed = true
        this.innerVisible = false
      }
    },
    onCancel() {
      this.innerVisible = false
    },
    afterLeave() {
      if (this.closedResolve) {
        this.closedResolve({
          type: this.confirmed ? 'confirm' : 'cancel'
        })
        this.closedResolve = null
      }
    },
    closedPromise() {
      return new Promise((resolve) => {
        this.closedResolve = resolve
      })
    }
  },
  render(h) {
    const props = this.$props
    const cancel = props.hideCancel
        ? null
        : h(Button, {
          props: {
            size: 'small',
            disabled: props.loading
          },
          on: { click: this.onCancel }
        }, props.cancelText)

    const confirm = h(Button, {
      props: {
        type: 'primary',
        size: 'small',
        loading: props.loading
      },
      on: { click: this.onConfirm }
    }, props.confirmText)

    if (this.content) {
      return h(Popover, this.passedPopoverData, [
        h('p', { class: 'ef-confirm-popover__content' }, this.content),
        h('div', { class: 'ef-confirm-popover__operates' }, [
          cancel,
          confirm,
        ])
      ])
    } else {
      return h(Popover, this.passedPopoverData, [
        h('div', { class: 'ef-confirm-popover__operates-only' }, [
          cancel,
          confirm,
        ])
      ])
    }
  }
}
</script>

<style lang="scss">
.ef-confirm-popover {
}

.ef-confirm-popover__operates {
  text-align: right;
  margin-top: 15px;
}

.ef-confirm-popover__operates-only {
  text-align: center;
}
</style>
