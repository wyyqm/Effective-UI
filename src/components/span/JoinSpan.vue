<script>
import { spanMixin, spanRender } from './utils';

export default {
  name: 'EfJoinSpan',
  mixins: [spanMixin],
  props: {
    value: {
      type: Array,
      required: true
    },
    separator: {
      type: String,
      default: ', '
    },
    defaults: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: null
    }
  },
  render(h, ctx) {
    let { props: { value, separator, formatter, defaults } } = ctx;

    let text = Array.isArray(value) && value.length > 0
      ? (formatter ? value.map(formatter) : value).join(separator)
      : defaults;

    return spanRender(h, ctx.props, ctx.data, [text]);
  }
};
</script>
