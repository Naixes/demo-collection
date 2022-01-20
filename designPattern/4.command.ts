// 命令模式
// 1.接收者角色类 👩🏻‍🍳
class Receiver {
  /**
   * 真正执行命令相应的操作
   */
  public action(): void {
    console.log('执行操作');
  }
}

// 2.抽象命令角色类 💁🏻
interface Command {
  execute(): void;
}
//服务员
class ConcreteCommand implements Command {
  private receiver: Receiver = null;
  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }
  public execute(): void {
    this.receiver.action()
  }
}

//你 去饭店点菜 👨🏻
class Invoker {
  private command: Command = null;
  constructor(command: Command) {
    this.command = command;
  }
  public action(): void {
    this.command.execute();
  }
}

const receiver: Receiver = new Receiver();
const command: Command = new ConcreteCommand(receiver);
const invoker: Invoker = new Invoker(command);
invoker.action();
