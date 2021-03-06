import React, {Component} from 'react';
import Comp from './Comp'

// 组件使用
import JsxTest from "./components/JsxTest";
import StateMgt from "./components/StateMgt";
import EventHandle from "./components/EventHandle";
import ContextTest from "./components/ContextTest";
import HocTest from "./components/HocTest.js";
import Composition from "./components/Composition";
import HooksTest from "./components/HooksTest";

import ReduxTest from "./components/ReduxTest";
import RouterText from "./components/RouterText"

import MyReduxTest from "./components/MyReduxTest"
import MyRouterTest from './components/MyRouterTest';

// 使用第三方组件
import AntdForm from "./components/AntdForm"

// 使用自定义组件
import MyForm from "./components/MyForm"
import Dialog from "./components/Dialog"
import {Dialog2} from "./components/Dialog"
import Tree from "./components/Tree"

// 组件库
// 按需引入
// import { Button } from 'antd';
// import "antd/dist/antd.css"
// 配置按需导入：
// 方案一
// 安装react-app-rewired取代react-scripts，可以扩展webpack的配置
// npm install react-app-rewired customize-cra babel-plugin-import -D
// 编写配置文件config-overrides.js，参考同名文件
// 修改scripts
// 方案二（本项目使用）
// npm run eject 
// 修改配置文件
import { Button } from 'antd';
// 配置装饰器也有类似的两种方案
// eject需要修改package.json和配置文件

// 状态映射，合并冲突
import {connect} from 'react-redux'
// 独立的actions，当actions没找到时会报错，好维护
import {SET_AGE} from './actions'

// 路由
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './home'
import News from './news/index'

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      name: 'three'
    }
  }
  changeAge() {
    this.props.setAge(20)
  }
  render() {
    return (
      <Router>
        <div style={{margin: '40px'}}>
          {/* 路由 */}
          <h2>======路由======</h2>
          <h3>---自己实现的路由测试---</h3>
          <MyRouterTest></MyRouterTest>
          <h3>---路由1---</h3>
          <div className="nav-bar">
            <Link to="/">首页</Link>
            <Link to="/news">新闻</Link>
          </div>
          <Route path="/" exact component= {Home}></Route>
          <Route path="/news" exact component= {News}></Route>
          <h3>---路由2---</h3>
          <RouterText></RouterText>
          <h2>======Redux======</h2>
          <h3>---自己实现的Redux和Redux中间件测试---</h3>
          <MyReduxTest></MyReduxTest>
          <h3>---Redux和react-redux测试---</h3>
          <ReduxTest></ReduxTest>
          <div className="App">
            name：{this.state.name}<br/>
            desc: {this.props.desc}<br/>
            age: {this.props.age}
            <input type="button" value="改变age" onClick={this.changeAge.bind(this)}></input>
            <Comp/>
          </div>
          <h2>======第三方组件======</h2>
          <Button>mua~</Button>
          <AntdForm></AntdForm>
          <h2>======自定义组件======</h2>
          <h3>---树组件---</h3>
          <Tree></Tree>
          <h3>---表单组件---</h3>
          <MyForm></MyForm>
          <h3>---弹框组件---</h3>
          <Dialog>我是弹框组件,我不在声明的位置,嘻嘻~~~~</Dialog>
          <Dialog2>我是弹框组件2,我不在声明的位置,嘻嘻~~~~</Dialog2>
          <h2>======JsxTest======</h2>
          {/* <JsxTest /> */}
          <h2>======状态管理======</h2>
          {/* <StateMgt /> */}
          <h2>======事件处理======</h2>
          {/* <EventHandle /> */}
          <h2>======上下文======</h2>
          {/* <ContextTest /> */}
          <h2>======Hoc======</h2>
          {/* <HocTest /> */}
          <h2>======组件复合======</h2>
          {/* <Composition /> */}
          <h2>======Hooks======</h2>
          <HooksTest />
        </div>
      </Router>
    )
  }
}

// export default App;
// connect(fn1, {})
// fn1：解决冲突，state：reducer中的state，props组件接收的的参数
// {}：action
export default connect(function (state, props) {
  console.log('state',state, 'props', props)
  // 结果冲突，混合state和props
  return state.user
}, {
  // 可以当作组件的一部分，props中可以访问
  setAge(newAge) {
    // 必须return，返回为action
    return {
      // 用来区分不同的操作
      type: SET_AGE,
      // 新值
      newAge
    }
  }
})(App)
