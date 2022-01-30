<script>
import EfDialog from '@/components/float/dialog'
import { innerProps } from './utils'
import Operators from './operators'

export default {
  name: 'ef-confirm-dialog',
  components: { EfDialog },
  props: {
    ...innerProps,
    state: {
      type: Object
    },
    content: {},
    reference: {},
  },
  methods: {
    beforeClose(done) {
      if (!this.loading) {
        done()
      }
    },
    updateLoading(value) {
      this.$emit('update:loading', value)
    }
  },
  render() {
    const { cancelText, confirmText, hideCancel, loading, whenConfirm } = this.$props

    return (
      <EfDialog
        beforeClose={this.beforeClose}
        state={this.state}
        title={this.title}
        width={this.width}
        class="ef-confirm-dialog"
      >
        <p class="ef-confirm-dialog__content">{this.content}</p>
        <Operators
          class="ef-confirm-dialog__operates"
          confirmText={confirmText}
          cancelText={cancelText}
          hideCancel={hideCancel}
          loading={loading}
          whenConfirm={whenConfirm}
          vOn:confirm={this.state.confirm}
          vOn:cancel={this.state.cancel}
          vOn:update-loading={this.updateLoading}
        />
      </EfDialog>
    )
  }
}
</script>

<style lang="scss">
.ef-confirm-dialog__operates {
  text-align: right;
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
