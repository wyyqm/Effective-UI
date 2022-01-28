export const innerProps = {
  autoLoading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String
  },
  width: {
    type: String,
    default: '25%'
  },
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
}
