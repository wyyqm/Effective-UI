function match(value, cond) {
  if (typeof cond === 'function') {
    return cond(value);
  }
  for (let key in cond) {
    if (cond.hasOwnProperty(key)) {
      if (typeof cond[key] === 'function') {
        if (!cond[key](value[key])) {
          return false;
        }
      } else if (cond[key] !== value[key]) {
        return false;
      }
    }
  }
  return true;
}

function isMatchable(value) {
  const type = typeof value;
  if (type === 'function') {
    return true;
  }
  return type === 'object' && value != null;
}

export function collectionToCases(collection, judgeKey, textKey, passProps) {
  return collection.map((item) => {
    const { [judgeKey]: judge, [textKey]: text, } = item
    let props = {}
    if (passProps === true) {
      props = { ...item }
      delete props[judgeKey]
      delete props[textKey]
    } else if (typeof passProps === 'string') {
      props = item[passProps]
    }

    return [judge, text, props]
  })
}

export default function matcher(cases) {
  return value => {
    const isMatchableValue = isMatchable(value);
    for (let [cond, ...rest] of cases) {
      if (cond === value) {
        return rest;
      }

      if (isMatchableValue && isMatchable(cond)) {
        if (match(value, cond)) {
          return rest;
        }
      }
    }
    return false;
  };
}

matcher.any = () => true;
matcher.truthy = v => !!v;
matcher.falsy = v => !v;
matcher.in = (values) => v => values.indexOf(v) !== -1;
matcher.notIn = (values) => v => values.indexOf(v) === -1;
