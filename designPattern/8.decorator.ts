//抽象构件角色（对应动物类）
interface Component {
  fn(): void;
}
// 具体构件角色（对应狗）
class ConcreteComponent implements Component {
  public fn(): void {
    console.log('基本功能：呼吸+觅食+睡觉');
  }
}
//装饰角色
class Decorator implements Component {
  //持有一个Component类型的对象引用
  private component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public fn(): void {
    //客户端的调用委派给具体的子类
    this.component.fn();
  }
}

class ConcreteDecorator extends Decorator {
  constructor(component: Component) {
    super(component);
  }

  public fn(): void {
    super.fn();
    console.log('附加功能：');
    this.eat();
    this.bellow();
  }

  private eat(): void {
    console.log('吃肉');
  }

  private bellow(): void {
    console.log('吼叫');
  }
}

//测试
const component: Component = new ConcreteComponent();
console.log('------装饰前：-------');
component.fn();
const newComponent: Component = new ConcreteDecorator(component);
console.log('------装饰后：-------');
newComponent.fn();
