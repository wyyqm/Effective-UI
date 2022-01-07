import Mock from 'mockjs'
import getQueryVariable from './queryUrlParams'
const data = {
  'list|150': [
    {
      id: '@natural(10000000,90000000)',
      date: '@natural(1523622008016,1542622789016)',
      orderName: '@cword(3,6)',
      src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      orderId: '@natural(1231231232,9786723424)',
      status: '@integer(0,1)',
      switch: '@boolean()',
      address: '@city(10,20)' + '@cword(10)' + '有限公司'
    }
  ]
}
const result = Mock.mock(data).list
// 对外输出对应的数据接口
export default {
  'get|/parameter/query': (params) => {
    const info = getQueryVariable(params.url)
    const [index, size] = [Number(info.pageIndex), Number(info.pageSize)]
    const newDataList = index > 1 ? result.slice((index - 1) * size, index * size) : result.slice(0, index * size)
    return {
      status: 200,
      message: 'success',
      data: {
        pageIndex: index,
        pageSize: size,
        content: newDataList,
        total: result.length
      }
    }
  }
}

// export default Mock.mock('/parameter/query', 'post', function (option) {
//   const info = JSON.parse(option.body)
//   const [index, size] = [Number(info.currentPage), Number(info.pageSize)]

//   const newDataList = index > 1 ? result.slice((index - 1) * size, index * size) : result.slice(0, index * size)
//   return {
//     status: 200,
//     message: 'success',
//     data: {
//       pageIndex: index,
//       pageSize: size,
//       content: newDataList,
//       total: result.length
//     }
//   }
// })
