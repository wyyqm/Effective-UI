import Operators from './operators'

export const innerProps = {
  ...Operators.props,
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
}
