interface IContainer<T extends new () => any> {
  callback: () => InstanceType<T>;
  singleton: boolean;
  instance?: InstanceType<T>;
}
interface NewAble<T> {
  new (...args: any[]): T;
}
type TBind<T> = [key: string, Fn: NewAble<T>];
class CreateIoc {
  private container = new Map<string, IContainer<any>>();
  public bind<T>(...params: TBind<T>) {
    this.helpBind(params, false);
  }
  public singleton<T>(...params: TBind<T>) {
    this.helpBind(params, true);
  }
  private helpBind<T>(params: TBind<T>, singleton: boolean) {
    const [key, Fn] = params;
    //  new Fn == InstanceType 实例
    const callback = () => new Fn();
    const _instance: IContainer<typeof Fn> = { callback, singleton };
    this.container.set(key, _instance);
  }
  public restore(key: string) {
    this.container.delete(key);
  }
  public use<T>(namspace: string) {
    const item = this.container.get(namspace);
    if (item !== undefined) {
      if (item.singleton && !item.instance) {
        item.instance = item.callback();
      }
      return item.singleton ? <T>item.instance : <T>item?.callback();
    } else {
      throw new Error('没有找到item');
    }
  }
}
interface IUserService {
  test(str: string): void;
}
class UserService implements IUserService {
  constructor() {}
  public test(str: string): void {
    console.log('[ str ]', str);
  }
}
const ioc = new CreateIoc();
ioc.bind<IUserService>('userService', UserService);
const user = ioc.use<IUserService>('userService');
user.test('京程一灯🏮');
