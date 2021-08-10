//导致hidden class
class Obj {
  // private a
  constructor(options) {
    if (options && options.a) {
      this.a = options.a;
    } else {
      this.a = null;
    }
  }
}

const objs = [];
for (let i = 0; i < 300000; i++) {
  const obj = new Obj();
  //   console.log('🐻最初的样子', %DebugPrint(obj));
  objs.push(obj);
}
