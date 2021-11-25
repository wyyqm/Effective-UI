function getQueryVariable(variable) {
  const query = variable.split('?')[1]

  const vars = query.split('&')
  const obj = {}

  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    obj[`${pair[0]}`] = pair[1]
  }
  return obj
}

export default getQueryVariable
