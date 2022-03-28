import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppStateProvider } from './AppState';
// 创建上下文对象，创建时需要传入一个默认值
// const defaultContextValue = {
//   userName: "luhuaqin"
// }
// export const appContext = React.createContext(defaultContextValue)

ReactDOM.render(
  <React.StrictMode>
    {/* 使用stateProvider组件的写法 */}
    <AppStateProvider>
      <App />
    </AppStateProvider>
    {/* <appContext.Provider value={defaultContextValue}>
      <App />
    </appContext.Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
