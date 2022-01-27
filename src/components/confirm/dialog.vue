<script>
import EfDialog from '@/components/float/dialog'
import { Button } from 'element-ui'
import { innerProps } from './utils'

export default {
  name: 'ef-confirm-dialog',
  components: { EfDialog },
  props: {
    state: {
      type: Object
    },
    content: {},
    ...innerProps,
  },
  methods: {
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
        this.state.confirm()
      }
    },
    onCancel() {
      this.state.cancel()
    }
  },
  render(h) {
    const { state } = this
    const content = this.content || []
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
        size: 'small',
        type: 'primary',
        loading: props.loading
      },
      on: { click: this.onConfirm }
    }, props.confirmText)

    return h(EfDialog, { props: { state, title: this.title, width: this.width }, class: 'ef-confirm-dialog' }, [
      h('p', { class: 'ef-confirm-dialog__content' }, content),
      h('div', { class: 'ef-confirm-dialog__operates' }, [
        cancel,
        confirm
      ])
    ])
  }
}
</script>

<style lang="scss">
.ef-confirm-dialog__operates {
  text-align: right;
  //margin-top: 15px;
}

.ef-confirm-dialog {
  .el-dialog__header {
    padding: 15px;
    margin-bottom: 15px;
  }

  .el-dialog__body {
    padding: 0 15px 15px 15px;
  }
}


</style>
