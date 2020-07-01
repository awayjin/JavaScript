import React, {createContext, useState} from 'react';
import { ToggleProvider } from './toggleContext'
import {Pannel} from './panel'
import {Counter} from "./Counter";
// 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6

export const CountContext = createContext(0);

export function ContextPage() {
  const [count, setCount] = useState(50);
  return (
    <>
      <ToggleProvider>
        <Pannel></Pannel>
      </ToggleProvider>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={()=>{setCount(count+1)}}>click me</button>
        <CountContext.Provider value={count}>
          <Counter></Counter>
        </CountContext.Provider>
      </div>
    </>
  );
}


