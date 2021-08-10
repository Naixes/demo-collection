function Yideng(val) {
  this.prop = val;
}

const a = new Yideng('foo');
const b = new Yideng('bar');

console.log('[ 🐻js中是否一致 ]', a == b);
console.log('[ 🌺v8中是否一致 ]', %HaveSameMap(a, b));

b.prop2 = 'baz';
console.log('[ 📚修改后v8中是否一致 ]', %HaveSameMap(a, b));
