// @ts-nocheck3
import React, { useState, createContext, useContext, Component, useRef } from "react";
import {Link} from "react-router-dom";
// https://github.com/CruxF/IMOOC/tree/master/React?1549967840861

export class StateLife extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props)
    // this.myRef = React.createRef()
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <h2>state and lifeCycle</h2>
        <StatePage title={'setState'} />
        <br/>
      </div>
    )
  }
}

interface IProps {
  title: string;
}

class StatePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    }
  }
  add = () => {
    console.log('2 other selfAddEl:', this.selfAddEl)
    console.log('selfAddElOther:', this.selfAddElOther)
    // state 合并了
    this.setState({ count: this.state.count + 11})
    this.setState({ count: this.state.count + 2})
    this.setState({ count: this.state.count + 1})
  }
  componentDidMount() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      // Vue $nextTick - DOM
      console.log('回调函数中 同步 count by callback', this.state.count) // 回调函数中可以拿到最新的 state
    })
    console.log('异步的 count', this.state.count) // 异步的，拿不到最新值

    // setTimeout 中 setState 是同步的
    setTimeout(() => {
        this.setState({
            count: this.state.count + 1
        })
        console.log('count 同步 in setTimeout', this.state.count)
    }, 0)
  }

  selfAddEl: any = React.createRef();
  selfAddElOther: any = React.createRef();
  addSelf = () => {
    console.log('1. selfAddEl:', this.selfAddEl)
    console.log('selfAddElOther:', this.selfAddElOther)
    // 自己定义的 DOM 事件
    this.selfAddEl.current.addEventListener('click', this.windowClickHandle)
  }
  windowClickHandle = () => {
    this.setState({count: this.state.count + 1})
    this.setState({count: this.state.count + 1})
    this.setState({count: this.state.count + 1})
  }

  componentWillUnmount() {
    this.selfAddEl.current.removeEventListener('click', this.windowClickHandle)
  }

  addWitFunc = () => {
    // 传入函数不合并
    this.setState((state: any, props: any) => {
      return {
        count: state.count + 10
      }
    })
    this.setState((state: any, props: any) => {
      return {
        count: state.count + 20
      }
    })
    this.setState((state: any, props: any) => {
      return {
        count: state.count + 30
      }
    })
  }
  render () {
    return (
      <>
        <StatePageFC title={this.props.title} />
        <div>
          { this.state.count },
          <div ref={this.selfAddElOther} onClick={this.add}>add + 1</div>
          <button ref={this.selfAddEl} onClick={this.addSelf}>自己定义 DOM 事件</button>
          <button onClick={this.addWitFunc}>传入函数不合并，add + 1</button>
        </div>
      </>
    )
  }
}

const StatePageFC:React.FC<IProps> = (props) => {
  return (
    <>
      <h3>state 可能会合并, state, { props.title }</h3>
    </>
  )
}

