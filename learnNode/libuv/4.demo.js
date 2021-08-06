// d8 --allow-natives-syntax 
function Class(val) {
    this.prop = val;
    this.data = "";
}

var a = new Class('foo');
var b = new Class('bar');

// console.log(a == b);
console.log( % HaveSameMap(a, b));

b.prop2 = 'baz';

console.log( % HaveSameMap(a, b));

//true
//false
//node --allow-natives-syntax  /Users/yuanzhijia/Desktop/前端工程师和C语言/4.demo.js
