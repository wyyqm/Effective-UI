<template>
  <div class="ef-confirm-operates">
    <el-button
      v-if="!hideCancel"
      size="small"
      :disabled="loading"
      @click="onCancel"
    >
      {{cancelText}}
    </el-button>
    <el-button
      size="small"
      type="primary"
      :loading="loading"
      @click="onConfirm"
    >
      {{confirmText}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ef-confirm-operators',
  props: {
    hideCancel: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    whenConfirm: {
      type: Function,
      default: () => () => true
    },
  },
  methods: {
    async onConfirm() {
      let result = this.whenConfirm()
      if (typeof result?.then === 'function') {
        try {
          this.$emit('update-loading', true)
          result = await result
        } finally {
          this.$emit('update-loading', false)
        }
      }
      if (result) {
        this.$emit('confirm')
      }
    },
    onCancel() {
      if (!this.loading) {
        this.$emit('cancel')
      }
    },
    beforeClose(done) {
      if (!this.loading) {
        done()
      }
    }
  }
}
</script>
