<script>
import { spanMixin, spanRender } from './utils';

export default {
  name: 'EfSpan',
  mixins: [spanMixin],
  render(h, ctx) {
    return spanRender(h, ctx.props, ctx.data, ctx.children);
  }
};
</script>
