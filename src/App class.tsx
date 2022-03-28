import React from 'react';
import logo from "./assets/images/logo.svg";
// import './App.css';
// 模块形式引用css样式
import styles from './App.module.css';  // 引入文件类型声明 *.d.ts: 质保函类型声明，不包含逻辑，不会被编译、打包
import robot from './mockdata/robots.json'
import Robot from './components/Robot'
import ShoppingCart from './components/ShoppingCart';
import { render } from '@testing-library/react';
// 模拟攻击，直接注入html会被react拦截
// const html = "<img onerror='alert(\"Hacked!\")' src='invalid-image' />"
// // 模拟攻击，不会被拦截
// const jsHacked = "javascript: alert('Hacked!')"

interface Props {

}

interface State {
  robotGallery: any[],
  count: number
}
class App extends React.Component<Props, State> {
  // 生命周期的第一阶段，初始化。包含两个函数
  // 1、constructor：初始化组件state
  constructor(props) {
    super(props)
    this.state = {
      robotGallery: [],
      count: 0
    }
  }

  // 2、componentDidMount: 在组件创建好dom元素后，挂载进页面的时候调用。只在初始化的时候调用一次
  // 初始化网络数据
  componentDidMount() {
    // fetch是原生js的get请求方法，返回值为promise
    fetch("https://jsonplaceholder.typicode.com/users").then(res => 
      res.json()  // json()返回的也是promise
    ).then(res => this.setState({robotGallery: res}))
  }

  // 生命周期第二阶段：更新。包含四个内置函数
  // 1、componentWillReceiveProps 在组件接收到一个新的prop(更新后)被调用。避免使用，会产生副作用（已被废止）
  // 2、1的替代函数getDerivedStateFromProps(nextProps, prevState) {} //在组件初始化及组件更新时都会被调用
  // 3、shouldComponentUpdate(nextProps, prevState) 通过判断props和state的变化来控制组件是否需要被更新，返回的是boolean值，返回true则更新，返回false则不更新 
  // 4、componentDidUpdate(){}  组件发生更新，UI重洗渲染函数就会被执行

  // 生命周期第三阶段：销毁。只需要注意一个函数
  // 1、componentWillUnmount() {}   在组件被销毁后调用，可以在这个函数回收及监听事件。避免内存泄漏
  
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}> 
          <img src={logo} className={styles.appLogo} alt="" />
          <h1>罗伯特机器人</h1>
        </div>
        <button onClick={() => {
          this.setState((state, props) => {return {count: state.count+1}}, () => {console.log("newCount" + this.state.count);})
          console.log("oldCount" + this.state.count);
          this.setState((state, props) => {return {count: state.count+1}}, () => {console.log("newCount" + this.state.count);})
          console.log("oldCount" + this.state.count);
        }}>Click</button>
        <span>count: {this.state.count}</span>
        {/* 购物车下拉菜单 */}
        <ShoppingCart />
        <div className={styles.robotList}>
          {/* <div>{html}</div>
          <a href={jsHacked}>My website</a> */}
          {/* 机器人列表 */}
          {
            this.state.robotGallery.map(e => 
              <Robot id={e.id} email={e.email} name={e.name} />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
