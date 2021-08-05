//观察者接口 （买房子的人）
interface Observer {
  //当主题状态改变时,更新通知
  update(version: number): void;
}
// 小哥的公众号 大家都关注小哥的公众号
interface Subject {
  //添加观察者
  addObserver(key: string, obj: Observer): void;
  //移除观察者
  deleteObserver(key: string): void;
  //当主题方法改变时,这个方法被调用,通知所有的观察者
  notifyObserver(): void;
}
// 某某杂志(卖房子的小哥)
class MagazineSubject implements Subject {
  //存放订阅者
  // private List<Observer> observers = new ArrayList<Observer>();
  private observers: Map<string, Observer> = new Map<string, Observer>();
  //期刊版本
  private version: number = 0;

  public addObserver(key: string, obj: Observer): void {
    // observers.add(obj);
    this.observers.set(key, obj);
  }

  public deleteObserver(key: string): void {
    if (this.observers.has(key)) {
      this.observers.delete(key);
    } else {
      throw new Error(`Observer的对象上不存在${key}`);
    }
  }

  public notifyObserver(): void {
    for (const item of this.observers) {
      // console.log("🍌", item);
      const o: Observer = item[1];
      o.update(this.version);
    }
  }

  //该杂志发行了新版本
  public publish() {
    //新版本
    this.version++;
    //信息更新完毕，通知所有观察者
    this.notifyObserver();
  }
}
// 买房子的具体人 订阅杂志的人
class CustomerObserver implements Observer {
  //订阅者名字
  private name: string;
  private version: number;

  constructor(name: string) {
    this.name = name;
  }

  public update(version: number): void {
    this.version = version;
    console.log('该杂志出新版本了');
    this.buy();
  }

  public buy(): void {
    console.log(`${this.name} + "购买了第" + ${this.version} + "期的杂志!"`);
  }
}

//创建主题(被观察者)
const magazine: MagazineSubject = new MagazineSubject();
//创建三个不同的观察者
const a: CustomerObserver = new CustomerObserver('A');
const b: CustomerObserver = new CustomerObserver('B');
const c: CustomerObserver = new CustomerObserver('C');
//将观察者注册到主题中
magazine.addObserver('a', a);
magazine.addObserver('b', b);
magazine.addObserver('c', c);

//更新主题的数据，当数据更新后，会自动通知所有已注册的观察者
magazine.publish();
