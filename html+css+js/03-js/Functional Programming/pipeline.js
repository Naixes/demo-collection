// pipeline，把若干个命令串起来，其实就是对一堆函数做一个reduce
function pipeline(initialVal, ...fns) {
    return fns.reduce((pre, cur) => cur(pre), initialVal)
}

const first = arr => arr[0];
const reverse = arr => arr.reverse();
const res = pipeline([1,2,3,4,5], reverse, first);
console.log(res)
// error
const res = pipeline([1,2,3,4,5], first, reverse);