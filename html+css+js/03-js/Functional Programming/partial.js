// 偏函数，传递一部分参数，返回一个函数处理其它参数，比如bind，柯里化的前身
function partial(fn, ...args) {
    return (...restArgs) => {
      return fn(...args, ...restArgs)
    }
  }

function add(a, b, c) {
    return a+b+c
}
const add1 = partial(add, 1)
console.log(add1)
const res = add1(2, 3)
console.log(res)