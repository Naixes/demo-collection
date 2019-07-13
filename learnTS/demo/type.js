// 基本类型
// 布尔值
var isDone = false;
// 数值
var decLiteral = 20;
var hexLiteral = 0x14;
var binaryLiteral = 20;
var octalLiteral = 20;
// 字符串
var str = 'aaa';
// 数组
var list = [1, 2, 3, 4];
// 数组泛型
// let list: Array<number> = [1, 2, 3, 4]
// 元祖：指定类型和数量
var x = ['aaa', 1];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 1] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var cName = Color[1];
console.log(cName);
// any
var notSure = 4;
notSure = 'aaa';
var arr = [1, 'aaa', false];
// void
function handler() {
    console.log('hello');
}
// null
var n = null;
// 子类型可以赋值给父类型，--strictNullChecks  严格模式下编译不通过：
// Type 'null' is not assignable to type 'undefined'.
n = undefined;
// undefined
var u = undefined;
u = null;
// never：不能返回的，不能结束的，报错的，是任何类型的子类型
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('something failed');
}
function infiniteLoop() {
    while (true) {
    }
}
create(o, { prop: 0 });
