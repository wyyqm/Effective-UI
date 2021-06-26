export const deepCopy = (obj) => {
    if (obj === null || obj === undefined) return null
    if (typeof obj !== 'object') return obj
    if (obj.constructor === Date) return new Date(obj)
    var newObj = new obj.constructor() //保持继承链
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            //不遍历其原型链上的属性
            var val = obj[key]
            // eslint-disable-next-line
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合
        }
    }
    return newObj
}
