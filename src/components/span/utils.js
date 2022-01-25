const prefix = 'ef-span--';

const classProps = [
  'lighter',
  'bold',
  'italic',
  'inlineBlock',
  'block',
  'underline',
  'del',
  'ellipsis',
  'clickable'
];

const styleProps = [
  'color',
  'background'
];

const enumClassProps = [
  ['type', ['primary', 'success', 'warning', 'danger', 'info']],
  ['size', ['xs', 's', 'base', 'm', 'l', 'xl']]
];

export function makeProps() {
  const classPropsDef = {};
  classProps.forEach(prop => {
    classPropsDef[prop] = {
      type: Boolean
    };
  });

  const stylePropsDef = {};
  styleProps.forEach(prop => {
    stylePropsDef[prop] = {
      type: String,
      default: null
    };
  });

  const enumClassPropsDef = {};
  enumClassProps.forEach(([prop, enums]) => {
    enumClassPropsDef[prop] = {
      type: String,
      validator(value) {
        return value == null || enums.indexOf(value) !== -1;
      },
      default: null
    };
  });

  return {
    ...classPropsDef,
    ...stylePropsDef,
    ...enumClassPropsDef
  };
}

function parseStyleString(str) {
  try {
    const obj = {};
    const parts = str.split(';');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        let [name, value] = parts[i].split(':');
        name = name.trim();
        value = value.trim();
        if (name !== '' && value !== '') {
          obj[name] = value;
        }
      }
    }
    return obj;
  } catch (e) {
    return {};
  }
}

export function makeNodeDescription(props, data) {
  const {
    class: passedClass,
    staticClass,
    style: passedStyle,
    staticStyle,
    ...rest
  } = data;

  let classes = ['ef-span', staticClass];

  if (passedClass) {
    if (Array.isArray(passedClass)) {
      classes = classes.concat(passedClass);
    } else {
      classes.push(passedClass);
    }
  }

  enumClassProps.forEach(([key]) => {
    if (props[key]) {
      classes.push(`${prefix}${key}-${props[key]}`);
    }
  });

  classProps.forEach((key) => {
    if (props[key]) {
      classes.push(`${prefix}${key}`);
    }
  });

  let propStyle = {};

  styleProps.forEach(key => {
    if (props[key]) {
      propStyle[key] = props[key];
    }
  });

  let style = [propStyle, staticStyle];

  if (Array.isArray(passedStyle)) {
    style = style.concat(passedStyle);
  } else if (typeof passedStyle === 'string') {
    style.push(parseStyleString(passedStyle));
  } else {
    style.push(passedStyle);
  }

  return {
    class: classes,
    style,
    ...rest
  };
}

export const spanMixin = {
  functional: true,
  props: {
    ...makeProps(),
    el: {
      type: String,
      default: 'span'
    },
    icon: {
      type: String,
      default: null
    }
  }
};

export function spanRender(h, props, data, children) {
  let { icon, el } = props;
  if (icon) {
    children = [h('i', { class: icon }), ' '].concat(children);
  }
  return h(el, makeNodeDescription(props, data), children);
}


