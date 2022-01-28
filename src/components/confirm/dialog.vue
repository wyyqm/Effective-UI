<script>
import EfDialog from '@/components/float/dialog'
import { Button } from 'element-ui'
import { innerProps } from './utils'

export default {
  name: 'ef-confirm-dialog',
  components: { EfDialog },
  props: {
    ...innerProps,
    state: {
      type: Object
    },
    content: {},
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
    const { cancelText, confirmText, hideCancel, loading } = this.$props

    return (
        <EfDialog
          state={this.state}
          title={this.title}
          width={this.width}
          class="ef-confirm-dialog"
        >
          <p class="ef-confirm-dialog__content">{this.content}</p>
          <div class="ef-confirm-dialog__operates">
            {
              !hideCancel && (
                <Button
                  onClick={this.onCancel}
                  size="small"
                  disabled={loading}
                >
                  {cancelText}
                </Button>
              )
            }
            <Button
              onClick={this.onConfirm}
              size="small"
              type="primary"
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
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
