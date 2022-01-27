export const innerProps = {
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
  beforeConfirm: {
    type: Function,
    default: () => () => true
  },
}
