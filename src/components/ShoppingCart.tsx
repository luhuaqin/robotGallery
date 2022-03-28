// 函数式组件
import React from "react";
import styles from "../components/ShoppingCart.module.css"
import { FiShoppingCart } from "react-icons/fi"
import { appContext } from '../AppState';

// 定义关键字
// Props 组件间数据传递，组件对外的接口
// 所有的Props都是只读不可修改的（Props对象）
interface Props {

}

// State 组件自有状态，组件内部的数据传递，组件对内的接口
// 修改组件状态需要通过setState()进行修稿，直接修改state不会触发render函数
// setState()异步更新，同步执行，不能依赖当前State计算下一个State。
// setState({doEvent}, callBack) 
// 第一个参数为对象或者函数，内部执行逻辑代码。第二个参数(函数内)可获取到修改后的数据
// setState((preState, preProps) => {return {}}, () => {})
// 上述代码preState和preProps为前一个生命周期的状态
interface State {
  isOpen: boolean
}
class ShoppingCart extends React.Component<Props, State> {
  // 构建函数constructor是唯一可以初始化state的地方
  constructor(props: Props) {
    super(props);
    // 初始化state
    this.state = {
      isOpen: false
    }
    // handleClick函数如果不是箭头函数，
    // 需要通过bind调用绑定当前对象的this，
    // 否则在函数内部访问不到当前对象的this
    // this.handleClick = this.handleClick.bind(this)
  }

  // 此event类型为react dom元素中onClick的时间类型
  // event.target: 时间发生的元素
  // event.currentTarget：事件处理绑定的元素
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 不处理在哪个元素上可点击
    // this.setState({isOpen: !this.state.isOpen})
    // console.log("event.target" + event.target);
    // console.log(`event.currentTarget ${event.currentTarget}`);
    // 处理点击事件是在span元素上才可触发
    if((event.target as HTMLElement).nodeName === "SPAN") {
      this.setState({isOpen: !this.state.isOpen})
    }
  }

  render() {
    return (
      <appContext.Consumer>
        {(value) => {
          return (
            <div className={styles.cartContainer}>
              <button className={styles.button} 
                // onClick={(e) => {
                //   this.setState({isOpen: !this.state.isOpen})
                // }}
                  // 另一种写法，事件驱动
                  onClick={this.handleClick}
              >
                <FiShoppingCart />&nbsp;
                <span>购物车 {value.shoppingCart.items.length} (件)</span>
              </button>
              <div className={styles.cartDropDown}
                  style={{
                    display: this.state.isOpen ? "block" : "none"
                  }}
              >
                <ul>
                  {
                    value.shoppingCart.items.map(i => <li>{i.name}</li>)
                  }
                </ul>
              </div>
            </div>
          )
        }}
      </appContext.Consumer>
    )
  }
}

export default ShoppingCart
