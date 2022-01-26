<script>
import addListener from '@/utils/addListener'

export default {
  functional: true,
  name: 'ef-sync',
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    value: {
      required: true
    },
    fn: {
      type: Function,
      required: true
    }
  },
  render(h, context) {
    const { trigger, value, fn } = context.props
    const target = context.children[0]
    target.data.on = target.data.on || {}
    const { input } = context.listeners
    addListener(target.data.on, trigger, (event) => {
      const ret = fn(value, event)
      if (typeof ret?.then === 'function') {
        ret.then((newValue) => {
          input(newValue)
        })
      } else {
        input(ret)
      }
    })
    return context.children
  }
}
</script>
