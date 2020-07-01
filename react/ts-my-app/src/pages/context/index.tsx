// @ts-nocheck
import React, { useState, createContext, useContext, Component } from "react";

import { ToggleProvider, ToggleConsumer } from './ToggleContext'
import { ThemeContext } from "../../router/index";

const CountContext = createContext(0);
const SubCount = () => {
  const count = useContext(CountContext);
  return <h3>{ count}</h3>
};
const Counter = function () {
  const count = useContext(CountContext);
  return (<>
    <h2>{ count }</h2>
    <SubCount />
  </>)
}

export function Context() {
  const [count, setCount] = useState(10);
  const theme = useContext(ThemeContext);
  console.log('theme:', theme);
  // 2-1. 使用 ToggleProvider 组件
  // 2-2. 如果有其他组件一样可以共享 state
  return (
    <>
      <ToggleProvider>
        <Pannel></Pannel>
        {/* 其他组件仍然可以通过 props 访问到共享的 state */}
      </ToggleProvider>
      <>
        <p>You clicked { count } times</p>
        <button onClick={() => {
          setCount(count + 1)
        }}>click me</button>

        <CountContext.Provider value={count}>
          <Counter></Counter>
        </CountContext.Provider>
      </>
    </>
  )
}

const Pannel = () => {
  // 在多个层级内直接通过 props 获取 state 和方法，调用方法改变 state
  return (
    <ToggleConsumer>
      {
        ({ toggle, handleToggle }) => {
          return (
            <div onClick={() => handleToggle()}>
              { toggle ? '✔' : '❌'}
              toggle: { toggle }
            </div>
          )
        }}
    </ToggleConsumer>
  )
}

