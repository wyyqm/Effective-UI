<template>
  <el-popover
    v-bind="passedProps"
    ref="popover"
    @value="updateVisible"
    @show="$emit('show', $event)"
    @after-enter="$emit('after-enter', $event)"
    @hide="$emit('hide', $event)"
    @after-leave="afterClose"
  >
    <slot />
  </el-popover>
</template>

<script>
import { Popover as BasePopover } from 'element-ui'

export default {
  name: 'ef-popover',
  props: {
    ...BasePopover.props,
    beforeClose: {
      type: Function
    },
    state: {
      type: Object
    },
  },
  created() {
    if (!this.state.isMount) {
      throw new Error('检测到 isMount === false，是否忘记在弹窗组件上设置 v-if="dialogState.isMount"')
    }
    this.$once('hook:beforeDestroy', this.state.registerFloat(this))
    this.closedReslove = null
  },
  computed: {
    passedProps() {
      const { trigger, state, ...rest } = this.$props
      return {
        ...rest,
        trigger: 'manual',
        reference: state.reference,
        value: state.innerVisible
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideHandler);
    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.clickOutsideHandler)
    })
  },
  methods: {
    clickOutsideHandler(e) {
      if (!this.state.innerVisible) {
        return;
      }

      if (this.state.reference.contains(e.target)) {
        return;
      }
      const popper = this.$refs.popover.$refs.popper;
      const clickInPopper = popper && popper.contains(e.target);

      if (!clickInPopper) {
        this.updateVisible(false)
      }
    },
    updateVisible(value) {
      if (!value) {
        if (this.beforeClose) {
          this.beforeClose(() => {
            this.state.cancel()
          })
        } else {
          this.state.cancel()
        }
      }
    },
    afterClose(payload) {
      if (this.closedReslove) {
        this.closedReslove()
        this.closedReslove = null
      }
      this.$emit('after-leave', payload)
    },
    closedPromise() {
      return new Promise((resolve) => {
        this.closedReslove = resolve
      })
    }
  },
}
</script>

