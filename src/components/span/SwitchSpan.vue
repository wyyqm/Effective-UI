<script>
import { spanMixin, spanRender } from './utils';
import matcher, { collectionToCases } from './matcher'

const isArray = Array.isArray;

export default {
  name: 'EfSwitchSpan',
  mixins: [spanMixin],
  props: {
    value: {
      validator: () => true,
      required: true
    },
    match: {
      type: [Function, Array],
      required: true
    },
    judgeKey: {
      type: String
    },
    textKey: {
      type: String,
    },
    passProps: {
      type: [String, Boolean]
    }
  },
  render(h, ctx) {
    let { props: { value, match, judgeKey, textKey, passProps } } = ctx;
    if (isArray(match)) {
      if (judgeKey) {
        match = collectionToCases(match, judgeKey, textKey, passProps)
      }
      match = matcher(match);
    }
    const result = match(value);
    let text = '';
    let opt = null;
    if (isArray(result)) {
      [text, opt] = result;
    }

    return spanRender(h, { ...ctx.props, ...opt }, ctx.data, [text]);
  }
};
</script>
