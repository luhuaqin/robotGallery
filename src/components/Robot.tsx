// 函数式组件
import React, { useContext } from "react";
import styles from "./Robot.module.css"
import { appContext, appSetStateContext } from '../AppState';


interface RobotProps {
  id: number,
  name: string,
  email: string
}

/**
 * 
 * @returns jsx
 * props: 组件间传递数据
 * React.FC: 函数定义（FC：functionalComponent）
 */
const Robot : React.FC<RobotProps> = ({id, name, email}) => {
  const value = useContext(appContext)
  const setState = useContext(appSetStateContext)
  const addToCart = () => {
    if(setState) {
      setState(state => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, {id, name}]
          }
        }
      })
    }
  }
  return (
    // 使用stateProvider的写法
    // 使用useContext钩子的写法
    <div className={styles.cardContainer}>
      <img src={`https://www.robohash.org/${id}`} alt="robot"/>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.userName}</p>
      <button onClick={addToCart}>加入购物车</button>
    </div>
    // 使用consumer组件的写法
    // <appContext.Consumer>
    //   {
    //     (value) => {
    //       return  <div className={styles.cardContainer}>
    //                 <img src={`https://www.robohash.org/${id}`} alt="robot"/>
    //                 <h2>{name}</h2>
    //                 <p>{email}</p>
    //                 <p>作者：{value.userName}</p>
    //               </div>
    //     }
    //   }
    // </appContext.Consumer>
  )
}

export default Robot