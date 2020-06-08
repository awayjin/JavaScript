import React, { useState, createContext, useContext } from "react";

// @ts-ignore
const CountContext = createContext();
// 子组件
function Counter (dd: any) {
  const count = useContext(CountContext)
  return (
    <div>
      <h2>子组件: { count }</h2>
      {/*<p>dd: { dd }</p>*/}
    </div>
  )
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
      <CountContext.Provider value={ count}>
        <Counter />
      </CountContext.Provider>
    </h2>
  );
}