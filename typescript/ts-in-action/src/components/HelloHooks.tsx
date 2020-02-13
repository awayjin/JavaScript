import React, { useState } from 'react'


function Example(props: any) {
  const [ count, setCount ] = useState(0)
  const [number, setNumber] = useState(20)
  console.log(props)
  return (

    <div>
      <p>You clicked {count} times. </p>
      <button onClick={ () => setCount(count + 1)}>
        Click me
      </button>
      <hr/>
      <p>
        { number }
        <button onClick={() => setNumber(number + 3)}>number+3</button>
      </p>
    </div>
  )
}

export default Example