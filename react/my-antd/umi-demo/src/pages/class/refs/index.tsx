import React, {createContext, useState, useContext, createRef} from 'react';
import Child from './child'

export default class Refs extends React.Component<any, any> {
  private domRef: React.RefObject<any>;
  private childRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.domRef = createRef()
    this.childRef = createRef()
  }

  componentDidMount() {
    console.log('--> this.domRef', this.domRef)
    console.log('this.domRef innerHTML:', this.domRef.current.innerHTML)
    console.log('this.childRef :', this.childRef)
  }

  render() {
    return <div>
      <h1 ref={this.domRef}>refs</h1>
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
