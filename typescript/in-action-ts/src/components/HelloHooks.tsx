import React, { useState, useEffect } from 'react'
import {string} from "prop-types";

interface Greeting {
  name: string;
}

function Example(props: Greeting) {
  const [ count, setCount ] = useState(0)
  const [number, setNumber] = useState(20)
  // 联合类型
  const [text, setText] = useState<null | string>(null)
  console.log(props)

  let me: Greeting = {
    name: '3'
  };
  let meFunc = (arg: string | null | undefined) => {
    return arg
  }
  meFunc(null)
  meFunc(undefined)
  meFunc('33')

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`
    if (count > 5 || number > 25) {
      setText('休息一下')
    }
  }, [count, number])
  return (

    <div>
      <p>You clicked {count} times. { text }</p>
      <button onClick={ () => setCount(count + 1)}>
        Click me
      </button>
      <hr/>
      <p>
        { number }. { text}
        <button onClick={() => setNumber(number + 3)}>number+3</button>
      </p>
    </div>
  )
}

Example.defaultProps = {
  firstName: ''
}

export default Example