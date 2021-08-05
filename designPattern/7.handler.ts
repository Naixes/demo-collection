abstract class Handler {
  public sucesser: Handler;
  //定义一个抽象的处理请求的方法
  public abstract handlerRequest(user: string, days: number): void;

  //获取当前角色的下一个处理者角色
  public getNextHandler(): Handler {
    return this.sucesser;
  }
  //设置当前角色的下一个处理者角色
  public setNextHandler(sucesser: Handler): void {
    this.sucesser = sucesser;
  }
}
//班主任处理请假请求
class HeadTeacher extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days < 5) {
      console.log('班主任同意' + user + '同学的请假请求');
    } else {
      console.log('班主任无法处理' + user + '同学的请假请求');
    }
    // 如果下一个执行者不为空，由下一个执行者执行
    if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
      // return this.getNextHandler().handlerRequest(user, days);
    }
    return null;
  }
}
//院系主任处理请假请求
class Department extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days < 30) {
      console.log('院系主任同意' + user + '同学的请假请求');
    } else {
      console.log('院系主任无法处理' + user + '同学的请假请求');
    }
    if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
    }
    return null;
  }
}
//校级主任处理请假请求
class Leader extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days >= 30) {
      console.log('校级主任同意' + user + '同学的请假请求');
    } else if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
      //return getNextHandler().handlerRequest(user, days);
    }
    return null;
  }
}
class SimpleFactory {
  public static TYPE_HeadTeacher: number = 1; //兰州拉面
  public static TYPE_Department: number = 2; //泡面
  public static TYPE_Leader: number = 3; //干扣面

  public static createHandler(type: number): Handler {
    switch (type) {
      case SimpleFactory.TYPE_HeadTeacher:
        return new HeadTeacher();
      case SimpleFactory.TYPE_Department:
        return new Department();
      case SimpleFactory.TYPE_Leader:
      default:
        return new Leader();
    }
  }
}
// 获取三个不同的处理者对象
const h1: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_HeadTeacher);
const h2: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Department);
const h3: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Leader);
// 设置角色的处理层次
h1.setNextHandler(h2);
h2.setNextHandler(h3);

h1.handlerRequest('李四', 35);
// console.log("*************************");
// h2.handlerRequest("王五", 15);
// console.log("*************************");
// h2.handlerRequest("朱七", 30);
