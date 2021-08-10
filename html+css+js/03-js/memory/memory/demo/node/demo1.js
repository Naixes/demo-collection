//node --expose-gc
const format = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + 'MB';
};
//内存泄露的题
global.gc();
// 返回 Nodejs 的内存占用情况，单位是 bytes
const mem = process.memoryUsage();
console.log(format(mem.heapUsed));

// let map = new Map();
// let key = new Array(5 * 1024 * 1024);
// map.set(key, 1);
// //这里gc毫无用处
// map.delete(key);
// key = null;

// global.gc();
// const mem2 = process.memoryUsage();
// console.log('对象占用之后🐻', format(mem2.heapUsed));

const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
// console.log(%DebugPrint(wm));
//不用做无谓的挣扎
key = null;
global.gc();
const mem3 = process.memoryUsage();
console.log('使用Weakmap以后🐻', format(mem3.heapUsed));
