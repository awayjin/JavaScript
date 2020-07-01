import React, { useState, createContext, useContext } from "react";

// @ts-ignore
const CountContext = createContext();
// 子组件
function Counter (props: any) {
  let count = useContext(CountContext)
  return (
    <div>
      <h2>子组件: { count }</h2>
      {/*<p>dd: { dd }</p>*/}
      <button onClick={props.onOk}>子组件 + 2</button>
    </div>
  )
}

// 事件
const onOk = () => {
  console.log('on ok')
}

export function About() {
  const [count, setCount] = useState(0);
  return (
    <h2>
      <p>count: { count }</p>
      <button onClick={ () => {
        setCount(count + 1)
      }}>加一</button>
      {/*<p> <Counter /></p>*/}
      <CountContext.Provider value={ count} onOk={onOk} >
        <Counter />
      </CountContext.Provider>
    </h2>
  );
}