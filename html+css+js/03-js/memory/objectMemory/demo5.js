class Obj {
  a;
  b;
}
const objs = [];
for (let i = 0; i < 1000000; i++) {
  const obj = new Obj();
  //   delete obj.a;
  //   obj.a = undefined;
  delete obj.b;
  objs.push(obj);
}
