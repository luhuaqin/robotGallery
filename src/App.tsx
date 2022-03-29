import React, { useState, useEffect } from 'react';
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
const App : React.FC = (props) => {
  // setCount: 异步操作
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  // useEffect(() => {
  //   document.title = `点击${count}次`
  // }, [count])
  useEffect(() => {
    document.title = "Robot Gallery"
  }, [])

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then(res => res.json())
  //   .then(res => setRobotGallery(res))
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        setRobotGallery(data)
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  
  return (
      <div className={styles.app}>
        <div className={styles.appHeader}> 
          <img src={logo} className={styles.appLogo} alt="" />
          <h1>罗伯特机器人</h1>
        </div>
        {/* <button onClick={() => {
          setCount(count + 1)
        }}>Click</button>
        <span>count: {count}</span> */}
        {/* 购物车下拉菜单 */}
        <ShoppingCart />
        {
          !error || error !== "" && <div>网站出错：{error}</div>
        }
        { !loading ?
          <div className={styles.robotList}>
            {
              robotGallery.map(e => 
                <Robot id={e.id} email={e.email} name={e.name} />
              )
            }
          </div>
          : <h2>loading 加载中</h2>
        }
      </div>
    );
}

export default App;
