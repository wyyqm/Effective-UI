<script>
import EfPopover from '@/components/float/popover'
import { innerProps } from './utils'
import Operators from './operators'

export default {
  name: 'ef-confirm-popover',
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
      <EfPopover
        beforeClose={this.beforeClose}
        state={this.state}
        transition="el-zoom-in-bottom"
        class="ef-confirm-popover"
      >
        {
          this.content ? (
            <p className="ef-confirm-popover__content">
              {this.content}
            </p>
          ) : null
        }
        <Operators
          class={this.content ? 'ef-confirm-popover__operates' : 'ef-confirm-popover__operates-center'}
          confirmText={confirmText}
          cancelText={cancelText}
          hideCancel={hideCancel}
          loading={loading}
          whenConfirm={whenConfirm}
          vOn:confirm={this.state.confirm}
          vOn:cancel={this.state.cancel}
          vOn:update-loading={this.updateLoading}
        />
      </EfPopover>
    )
  }
}
</script>

<style lang="scss">
.ef-confirm-popover {
}

.ef-confirm-popover__content {
  margin: 16px 0;
}

.ef-confirm-popover__operates {
  text-align: right;
}

.ef-confirm-popover__operates-center {
  text-align: center;
}
</style>
