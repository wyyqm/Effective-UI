<template>
  <div
    class="ef-confirm"
    @click="onElClick"
    :class="{ 'is-disabled': disabled }"
  >
    <slot v-if="dialog">
      <trigger-btn
        v-bind="$props"
        :loading="loadingOnBtn && applyLoading"
      >
        {{ applyBtnText }}
      </trigger-btn>
    </slot>

    <el-dialog
      top="0"
      v-if="dialog"
      :title="applyTitle"
      width="25%"
      append-to-body
      :visible.sync="visible"
      :show-close="!hideCancel"
      custom-class="ef-confirm--dialog"
      destroy-on-close
      :before-close="beforeDialogClose"
      :modal="!disableModal"
    >
      <template slot="default">
        <content-box
          :content="contentText"
          :hide-cancel="hideCancel"
          :loading="!loadingOnBtn && applyLoading"
          :cancel-text="applyCancelText"
          :confirm-text="applyConfirmText"
          @cancel="fire('Cancel', false)"
          @confirm="onConfirm"
        >
          <slot name="content" />
        </content-box>
      </template>
    </el-dialog>

    <el-popover
      v-else
      ref="popover"
      placement="bottom"
      v-model="visible"
      :disabled="disabled"
      trigger="manual"
      :title="applyTitle"
      transition="el-zoom-in-bottom"
    >
      <template slot="default">
        <content-box
            :content="contentText"
            :hide-cancel="hideCancel"
            mini
            :loading="!loadingOnBtn && applyLoading"
            :cancel-text="applyCancelText"
            :confirm-text="applyConfirmText"
            @cancel="fire('Cancel', false)"
            @confirm="onConfirm"
        >
          <slot name="content" />
        </content-box>
      </template>
      <template slot="reference">
        <slot>
          <trigger-btn
              v-bind="$props"
              :loading="loadingOnBtn && applyLoading"
          >
            {{ applyBtnText }}
          </trigger-btn>
        </slot>
      </template>
    </el-popover>
  </div>
</template>

<script>

import { Button } from 'element-ui'

const makeGetter = prop => function() {
  return typeof this[prop] === 'function'
      ? this[prop](this.data)
      : this[prop];
};

const TriggerBtn = {
  functional: true,
  props: Button.props,
  render: (h, { props, children }) =>
    h(Button, {
      props,
      class: 'ef-confirm__btn'
    }, children)
};

const ContentBox = {
  functional: true,
  props: {
    content: {
      type: String,
      required: true
    },
    hideCancel: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    cancelText: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      required: true
    },
    mini: {
      type: Boolean
    }
  },
  render: (h, { props, children, listeners }) => {
    const content = children.length
        ? children
        : [h('p', {}, props.content)];

    const cancel = props.hideCancel
        ? null
        : h(Button, {
          props: {
            size: props.mini ? 'mini' : 'small',
            disabled: props.loading
          },
          on: { click: listeners.cancel }
        }, props.cancelText);

    const confirm = h(Button, {
      props: {
        type: 'primary',
        size: props.mini ? 'mini' : 'small',
        loading: props.loading
      },
      on: { click: listeners.confirm }
    }, props.confirmText);

    return h('div', [
      ...content,
      h('div', { class: 'ef-confirm__operates'}, [
        cancel,
        index
      ])
    ]);
  }
};

export default {
  name: 'ef-confirm',
  components: {
    TriggerBtn,
    ContentBox
  },
  props: {
    // data 可以传任何值
    data: {
      default: null,
      validator: () => true
    },
    dialog: {
      type: Boolean
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    content: {
      type: [String, Function],
      default: '确定要执行这项操作吗？'
    },
    hideCancel: {
      type: Boolean
    },
    beforeConfirm: {
      type: Function,
      default: () => {
      }
    },
    beforeCancel: {
      type: Function,
      default: () => {
      }
    },
    confirmText: {
      type: [String, Function],
      default: '确定'
    },
    cancelText: {
      type: [String, Function],
      default: '取消'
    },
    afterConfirm: {
      type: Function,
      default: null
    },
    afterCancel: {
      type: Function,
      default: null
    },
    disableModal: {
      type: Boolean
    },
    btnText: {
      type: [String, Function],
      default: '执行'
    },
    uncontrolledLoading: {
      type: Boolean
    },
    loadingOnBtn: {
      type: Boolean
    },
    ...TriggerBtn.props
  },
  data() {
    return {
      visible: false,
      listened: false,
      innerLoading: false
    };
  },
  computed: {
    contentText: makeGetter('content'),
    applyBtnText: makeGetter('btnText'),
    applyConfirmText: makeGetter('confirmText'),
    applyCancelText: makeGetter('cancelText'),
    applyTitle: makeGetter('title'),
    applyLoading() {
      if (this.uncontrolledLoading) {
        return this.innerLoading;
      } else {
        return this.loading;
      }
    }
  },
  methods: {
    async onConfirm() {
      this.$emit('update:loading', true);
      // 这里过一会再设置 loading 状态，立即设置会导致 下面的 fire 提取返回
      this.$nextTick(() => this.innerLoading = true);
      await this.fire('Confirm');
      if (this.loadingOnBtn && this.afterConfirm) {
        await this.afterConfirm(this.data);
      }
      this.$emit('update:loading', false);
      this.innerLoading = false;
    },
    async fire(type, payload) {
      if (!this.loadingOnBtn && this.applyLoading) {
        return false;
      }
      // 触发两个钩子，任何钩子返回 false 都将阻止关闭
      let allowClose = true;
      if (this['before' + type]) {
        allowClose = await this['before' + type](this.data, payload);
      }
      if (allowClose === false) {
        return false;
      }
      this.$emit(type.toLowerCase(), this.data, payload);

      if (this['after' + type]) {
        if (this.loadingOnBtn) {
          // after 钩子不再控制是否关闭弹窗
          allowClose = true;
        } else {
          allowClose = await this['after' + type](this.data, payload);
        }
      }
      if (allowClose === false) {
        return false;
      }

      this.visible = false;
      return true;
    },
    clickOutsideHandler(e) {
      if (this.dialog) {
        return;
      }
      if (!this.visible) {
        return;
      }
      if (this.$el.contains(e.target)) {
        return;
      }
      const popper = this.$refs.popover.$refs.popper;
      const clickInPopper = popper && popper.contains(e.target);

      if (!clickInPopper) {
        this.fire('Cancel', true);
      }
    },
    async beforeDialogClose(done) {
      await this.fire('Cancel', true) && done();
    },
    onElClick() {
      if (!this.disabled && !this.loading) {
        this.visible = true;
      }
    },
    listen() {
      if (!this.dialog && !this.listened) {
        document.addEventListener('click', this.clickOutsideHandler);
        this.listened = true;
      }
    },
    removeListener() {
      if (this.listened) {
        document.removeEventListener('click', this.clickOutsideHandler);
        this.listened = false;
      }
    }
  },
  watch: {
    disabled(val) {
      if (val) {
        this.visible = false;
      }
    },
    dialog(val) {
      val ? this.removeListener() : this.listen();
    }
  },
  mounted() {
    this.listen();
  },
  beforeDestroy() {
    this.removeListener();
  }
};
</script>

<style lang="scss">
.ef-confirm {
  display: inline-block;

  &__operates {
    text-align: right;
    margin-top: 15px;
  }
}

.el-button-group > .ef-confirm {
  &:not(:last-child) .ef-confirm__btn {
    margin-right: -1px;
  }

  &:first-child .ef-confirm__btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & {
    float: left;
    position: relative;
  }

  & + .ef-confirm {
    margin-left: 0;
  }

  &:not(:first-child):not(:last-child) .ef-confirm__btn {
    border-radius: 0;
  }

  &:last-child .ef-confirm__btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.is-disabled,
  &:active,
  &:focus,
  &:hover {
    z-index: 1;
  }
}
.ef-confirm--dialog {
  top: 40%;
  transform: translateY(-50%);
  & .el-dialog__header {
    padding: 15px;
    margin-bottom: 15px;
  }
  & .el-dialog__body {
    padding: 0 15px 15px 15px;
  }
}
</style>
