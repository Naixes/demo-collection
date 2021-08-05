// 方法一：ts实现
class Singleton {
  // 私有
  private static instance: Singleton;
  private constructor() {
    // 也可以写到这里
  }
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

Singleton.getInstance();

// 方法二：通过proxy实现
function makeSingleton(func) {
  let instance,
    handler = {
      construct: function (target, args) {
        if (!instance) {
          instance = new func();
        }
        return instance;
      },
    };
  return new Proxy(func, handler);
}

// 以这个constructor为例
function Test() {
  this.value = 0;
}

// 普通创建实例
const t1 = new Test(),
  t2 = new Test();
t1.value = 123;
console.log(t2.value); // 0 因为 t1、t2 是不同的实例

// 使用proxy
const TestSingleton = makeSingleton(Test),
  s1 = new TestSingleton(),
  s2 = new TestSingleton();
s1.value = 123;
console.log(s2.value); // 123 现在 s1、s2 是相同的实例。
