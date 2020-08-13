import React, { useState } from 'react'
import './index.css'

// 组件组合： https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html

export function DomPage () {
  const html = 'First &middot; &lt; Second'
  function createMarkup() {
    return {__html: 'First &middot; Second'};
  }

  const [check, setCheck] = useState(false)
  const toggleCheck = () => {
    setCheck(!check)
  }

  return (
    <>
      <h2>dom </h2>
      { html }
      <div>
        <input type="checkbox" defaultChecked={true}/>
        <input type="checkbox" checked={check} onChange={toggleCheck} />
        <button onClick={ toggleCheck }>toggle</button>
      </div>
      <div dangerouslySetInnerHTML={{'__html': html} } />
      <div dangerouslySetInnerHTML={createMarkup()}></div>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </>
  )
}
