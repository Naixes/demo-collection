interface IUserDao {
  save(): void;
}

class UserDao implements IUserDao {
  public save(): void {
    console.log('----已经保存数据!----');
  }
}

class UserDaoProxy implements IUserDao {
  private target: IUserDao;
  constructor(target: IUserDao) {
    this.target = target;
  }
  save(): void {
    console.log('开始事物');
    //目标本体对象 本体不放面的时候
    //使用了TS控制了设计模式的约束
    this.target.save();
    console.log('结束事物');
  }
}

const target: UserDao = new UserDao();
const proxy: UserDaoProxy = new UserDaoProxy(target);
proxy.save();
