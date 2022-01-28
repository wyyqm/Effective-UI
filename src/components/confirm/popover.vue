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
          ...rest,
          transition: 'el-zoom-in-bottom',
          placement: 'bottom',
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
    const { confirmText, hideCancel, loading, cancelText } = this.$props
    const cancel = !hideCancel && (
      <Button
          onClick={this.onCancel}
          size="small"
          disabled={loading}
      >
        {cancelText}
      </Button>
    )

    const confirm = (
      <Button
        onClick={this.onConfirm}
        size="small"
        type="primary"
        loading={loading}
      >
        {confirmText}
      </Button>
    )

    if (this.content) {
      return (
        <Popover {...this.passedPopoverData}>
          <p class="ef-confirm-popover__content">{this.content}</p>
          <div class="ef-confirm-popover__operates">
            {cancel}
            {confirm}
          </div>
        </Popover>
      )
    } else {
      return (
        <Popover {...this.passedPopoverData}>
          <div class="ef-confirm-popover__operates-only">
            {cancel}
            {confirm}
          </div>
        </Popover>
      )
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
