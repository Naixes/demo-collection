function Sin(val) {
  this.prop = val;
}

//新创建了 堆的引用属性不同 -> 隐藏类
const a = new Sin('foo'); //c++ 对象
const b = new Sin('bar'); //按址引用发生了 混乱

console.log('🐻🐻🐻js中是否一致', a == b); // false
// %xxx 要使用 node --allow-natives-syntax xx.js 执行，允许使用原生方法
console.log('📚V8中是否是同一指向', %HaveSameMap(a, b)); // true
b.prop2 = 'baz'; // 打乱了结构
console.log('📚V8修改之后', %HaveSameMap(a, b)); // false
