// @ts-nocheck3
import React, { useState, createContext, useContext, Component } from "react";
// https://github.com/CruxF/IMOOC/tree/master/React?1549967840861

export class RefsDOM extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props)
    // this.myRef = React.createRef()
  }
  componentDidMount() {
    // 访问 Refs
    console.log('parent this.textInputParRef', this.textInputParRef)
  }
  textInputParRef: any = React.createRef();
  childRefFocus () {
    // 子节点焦点
    this.textInputParRef.current.focusTextInput()
  }
  render() {
    return (
      <div className="App">
        <h2>refs and the DOM</h2>
        <p>
          <button onClick={ () => this.childRefFocus()}>获得子节点焦点</button>
        </p>
        <Refs ref={this.textInputParRef} />
      </div>
    )
  }
}

class Refs extends React.Component<any, any> {
  myRef: any = React.createRef();
  textInputRef: any = React.createRef();
  constructor(props: Readonly<{}>) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      myAttr: '32'
    }
  }
  focusTextInput = () => {
    this.textInputRef.current.focus()
  }
  componentDidMount() {
    // 访问 Refs
    console.log('this.myRef', this.myRef)
  }
  render () {
    return (
      <>
        <div ref={this.myRef}>myRef</div>
        <input type="text" ref={this.textInputRef} />
        <input type="button" value="focus the text input with bind" onClick={this.focusTextInput} />
        <input type="button" value="focus no bind" onClick={() => {this.focusTextInput()}} />
      </>
    )
  }
}


