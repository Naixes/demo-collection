//内存占用上巨大的问题
class Obj {
  a;
  b;
}
const objs = [];
for (let i = 0; i < 1000000; i++) {
  const obj = new Obj();
  delete obj.b;
  objs.push(obj);
}
