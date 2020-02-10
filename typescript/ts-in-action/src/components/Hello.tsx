import React from 'react'
import { Button } from 'antd'

interface Greeting {
  name: string
}

// TypeScript的核心原则之一是对值所具有的结构进行类型检查。
// 它有时被称做“鸭式辨型法”或“结构性子类型化”。
// 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
// const Hello = (props: Greeting) => {
//   return <h1>Hello Component: { props.name }</h1>
// }

class Hello extends React.Component<Greeting, any> {
  render () {
    return (<h1>Hello Component: { this.props.name }</h1>)
  }
}


interface Greeting3 {
  name: string;
  firstName?: string;
  lastName?: string
}
// FC 函数组件的缩写, 自动引入了 children 属性
const Hello3: React.FC<Greeting3> = (
  {
    name, firstName, lastName,
    children
  }) => {
  return <Button>{name} {firstName} {lastName}</Button>
}

// 定义静态属性，默认提示出来. 默认属性是可选属性
Hello3.defaultProps = {
  firstName: 'jin',
  lastName: ''
}

const Hello4 = (props: Greeting3) => <Button>{ props.name }</Button>

// const Hello3: React.FC<Greeting> = (props) => {
//   return <Button>{ props.name }</Button>
// }

// 泛型
function add<T> (arg: T): T {
  return arg
}
console.log(add(1))
console.log(add('33'))
console.log(add({}))
console.log(add(false))

export default { Hello, Hello4 }