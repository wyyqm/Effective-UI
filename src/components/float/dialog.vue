<template>
  <el-dialog
    v-bind="passedProps"
    @update:visible="updateVisible"
    @open="$emit('open', $event)"
    @opened="$emit('opened', $event)"
    @close="$emit('close', $event)"
    @closed="afterClose"
  >
    <template slot="title">
      <slot name="title" />
    </template>

    <slot />

    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
import { Dialog as BaseDialog } from 'element-ui'

export default {
  name: 'ef-dialog',
  props: {
    ...BaseDialog.props,
    state: {
      type: Object
    },
  },
  created() {
    this.$once('hook:beforeDestroy', this.state.registerFloat(this))
    this.closedReslove = null
  },
  computed: {
    passedProps() {
      const { state, ...rest } = this.$props
      return {
        ...rest,
        visible: state.innerVisible
      }
    }
  },
  methods: {
    updateVisible(value) {
      if (!value) {
        this.state.cancel()
      }
    },
    afterClose(payload) {
      if (this.closedReslove) {
        this.closedReslove()
        this.closedReslove = null
      }
      this.$emit('close', payload)
    },
    closedPromise() {
      return new Promise((resolve) => {
        this.closedReslove = resolve
      })
    }
  },
}
</script>

