<template>
  <el-drawer
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
  </el-drawer>
</template>

<script>
import { Drawer as BaseDrawer } from 'element-ui'

export default {
  name: 'ef-drawer',
  props: {
    ...BaseDrawer.props,
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

