//破坏对象的执行时间上
const startTime = +new Date();
for (let i = 0; i < 1000000; i++) {
  const a = {
    a: '1',
    b: '2',
    c: '3',
  };
  a.b = undefined; // 推荐，没有破坏结构，操作也几乎不消耗内存
  // delete a.b; // 干掉了c的back pointer，变成慢对象，delete操作也慢
  // delete a.c; // 没改变back pointer，按照顺序delete没影响
}
const endTime = +new Date();
console.log(endTime - startTime);
