import React, {createContext, useState, useContext, createRef} from 'react';
import Child from './child'
import InputForward from './forward'

export default class Refs extends React.Component<any, any> {
  private domRef: React.RefObject<any>;
  private childRef: React.RefObject<any>;
  private inputForwardRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.domRef = createRef()
    this.childRef = createRef()
    this.inputForwardRef = createRef()
    this.state = { demo: 'jin' }
  }

  componentDidMount() {
    console.log('--> this.domRef', this.domRef)
    console.log('this.domRef innerHTML:', this.domRef.current.innerHTML)
    console.log('this.childRef :', this.childRef)
    console.log('this.inputForwardRef :', this.inputForwardRef)
    this.inputForwardRef.current.focus()
  }

  render() {
    return <div>
      <h1 ref={this.domRef}>refs</h1>
      <InputForward ref={this.inputForwardRef} state={this.state}>
        InputForward
      </InputForward>
      <Child ref={this.childRef}></Child>
      <button onClick={() => this.childRef.current.changeText('new text')}>
        change text
      </button>
      <button onClick={() => this.childRef.current.changeText('two text')}>
        two text
      </button>
    </div>;
  }
}
