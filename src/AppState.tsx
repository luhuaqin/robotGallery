// 创建全局state和上下文关系组件context<component>
import React, { useState } from "react";

// 使用interface定义上下文类型
interface AppStateValue {
  userName: string,
  shoppingCart: { items: {id: number, name: string}[] }
}

const defaultContextValue: AppStateValue = {
  userName: "luhuaqin",
  shoppingCart: { items: [] }
}
export const appContext = React.createContext(defaultContextValue)
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)

export const AppStateProvider: React.FC = (props) => {
  const [state, setState] = useState(defaultContextValue)
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
