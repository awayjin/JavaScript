
// import './part1.base/04.datatype.ts'
// import './part1.base/05.enumeration'
// import './part1.base/06-07.interface.ts'
// import './part1.base/09.function.ts'
// import './part1.base/10-11.class'
// import './part1.base/12.class-interface'
// import './part1.base/13-14.generics'
// import './part1.base/15-16-17.type-compatibility.ts'

// let hello: string = 'Hello TypeScript'

// console.log(hello)

// document.querySelectorAll('.app')[0].innerHTML = hello

import React from 'react'
import ReactDOM from 'react-dom'

// import { Hello } from './components/Hello'
import Hello from './components/Hello'
import HelloHooks from './components/HelloHooks'
import About from './components/About'

// console.log('Hello3:', Hello3)
console.log('Hello:', Hello)

ReactDOM.render(
  <div>
    <Hello.Hello name='TypeScript JSX' />
    <HelloHooks name={'name'} />
    { Hello.Hello4({name:'函数组件', non: 3}) }
    <About title={'abt til 123'} msg={'abt msg'}></About>
  </div>,
  document.querySelectorAll('.app')[0]
)