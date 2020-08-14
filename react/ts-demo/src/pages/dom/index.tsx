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
      <EventDemo title={'event demo'} />
    </>
  )
}

interface IEvent {
  title: string;
}

class EventDemo extends React.Component<IEvent, any> {
  constructor(props: any) {
    super(props);
    // this.clickHandler1 = this.clickHandler1.bind(this)
  }
  changeTitle = () => {
    document.title = 'eventDemo title'
  }

  // 实例方法
  clickHandler1() {
    console.log('this....', this) // this 默认是 undefined
  }

  // 静态方法, this 指向实例
  clickHandler2 = () => {
    console.log('静态方法 this....', this) // this 默认是 undefined
  }

  clickHandler3 = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(event)
  }

  render() {
    const props = this.props
    return (
      <>
        <h2>{ props.title }</h2>
        <button onClick={this.changeTitle}>changeTitle</button>
        <p>
          <button onClick={this.clickHandler1}>clickHandler1</button>
          <button onClick={this.clickHandler1.bind(this)}>clickHandler1 with bind</button>
        </p>
        <p>
          <button onClick={this.clickHandler2}>clickHandler 2</button>
          <button onClick={this.clickHandler2.bind(this)}>clickHandler1 with bind</button>
        </p>
        <div>
          <h3>事件</h3>
          <a href="##" onClick={this.clickHandler3}> event preventDefault</a>
        </div>
      </>
    );
  }
}