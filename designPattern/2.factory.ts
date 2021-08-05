// interface A{}
// type xx = {}
// class B{}
// abstract class C{}

// const x:HTMLDivElement = null as any;
// const y:PropertyKey = null as any;
abstract class INoodles {
  public abstract desc(): void;
}

class LzNoodles extends INoodles {
  public desc(): void {
    console.log('兰州拉面');
  }
}

class PaoNoodles extends INoodles {
  public desc(): void {
    console.log('方便面');
  }
}

class GankouNoodles extends INoodles {
  public desc(): void {
    console.log('干扣面');
  }
}

class SimpleNoodlesFactory {
  public static TYPE_LZ: number = 1; //兰州拉面
  public static TYPE_PM: number = 2; //泡面
  public static TYPE_GK: number = 3; //干扣面
  public static createNoodles(type: number): INoodles {
    switch (type) {
      case SimpleNoodlesFactory.TYPE_LZ:
        return new LzNoodles();
      case SimpleNoodlesFactory.TYPE_PM:
        return new PaoNoodles();
      case SimpleNoodlesFactory.TYPE_GK:
        return new GankouNoodles();
      default:
        return new LzNoodles();
    }
  }
}
const noodles: INoodles = SimpleNoodlesFactory.createNoodles(
  SimpleNoodlesFactory.TYPE_LZ
);
noodles.desc();
