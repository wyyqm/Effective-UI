<script>
import { spanMixin, spanRender } from './utils';
import moment from 'moment'

export default {
  name: 'EfTimeSpan',
  mixins: [spanMixin],
  props: {
    value: {
      validator: v =>
        ['string', 'number'].includes(typeof v)
        || v instanceof Date
        || moment.isMoment(v)
        || v == null,
      required: true
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  render(h, ctx) {
    let { props: { value, format } } = ctx;

    value = value instanceof Date ? +value : parseInt(value);

    const text = (value || value === 0)
      ? moment(value).format(format)
      : '';
    return spanRender(h, ctx.props, ctx.data, [text]);
  }
};
</script>
