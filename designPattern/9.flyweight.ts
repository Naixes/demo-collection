// 享元模式
interface Shape {
  draw(): void;
}

class Circle implements Shape {
  private color: string;
  private x: number;
  private y: number;
  private radius: number;

  constructor(color: string) {
    this.color = color;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public draw(): void {
    console.log(
      'Circle: Draw() [Color : ' +
        this.color +
        ', x : ' +
        this.x +
        ', y :' +
        this.y +
        ', radius :' +
        this.radius
    );
  }
}

//创建一个工厂，生成基于给定信息的实体类的对象。
class ShapeFactory {
  private static circleMap = new Map<string, Shape>();

  public static getCircle(color: string): Shape {
    let circle: Circle = <Circle>this.circleMap.get(color);

    if (circle == null) {
      circle = new Circle(color);
      this.circleMap.set(color, circle);
      console.log('创建实例--》🐻🐻🐻🐻 : ' + color);
    }
    return circle;
  }
}

//使用该工厂，通过传递颜色信息来获取实体类的对象。

class FlyweightPatternDemo {
  private static colors: string[] = ['Red', 'Green', 'Blue', 'White', 'Black'];
  constructor() {
    for (let i = 0; i < 20; ++i) {
      const circle: Circle = <Circle>(
        ShapeFactory.getCircle(FlyweightPatternDemo.getRandomColor())
      );
      circle.setX(FlyweightPatternDemo.getRandomX());
      circle.setY(FlyweightPatternDemo.getRandomY());
      circle.setRadius(100);
      circle.draw();
    }
  }
  private static getRandomColor(): string {
    // console.log(
    //   '🐼🐼🐼🐼🐼',
    //   <number>Math.ceil(Math.random() * (this.colors.length - 1))
    // );
    return this.colors[
      <number>Math.ceil(Math.random() * (this.colors.length - 1))
    ];
  }
  private static getRandomX(): number {
    return <number>(Math.random() * 100);
  }
  private static getRandomY(): number {
    return <number>(Math.random() * 100);
  }
}

new FlyweightPatternDemo();

//100个○ 颜色 位置 半径

//30个红色 位置 半径不一样

//创建1个红色的即可 复用这个红色的○
