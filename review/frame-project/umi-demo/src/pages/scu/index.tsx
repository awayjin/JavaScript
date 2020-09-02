import React, {createContext, useState, useContext, Suspense} from 'react';
import _ from 'lodash'

export default class Demo extends React.Component<any, any> {
  constructor(props: React.Component) {
    super(props);
  }
  state = {
    text: 20,
    list: [
      { id: '01', title:  'til 01', detail: { name: 'name 1' }},
      { id: '02', title:  'til 02', detail: { name: 'name 2' }},
    ],
    footer: 'footer info',
  };

  // shouldComponentUpdate(s: any, nextState: any): any {
  //   console.log('nextState:', nextState)
  //   if (nextState.list !== this.state.list) {
  //     return true // 可以渲染
  //   }
  //   return false // 不重复渲染
  // }

  // shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
  //   return true
  // }

  shouldComponentUpdate (nextProps: any, nextState: any): boolean {
    console.log('nextProps:', nextProps)
    console.log('nextState:', nextState)
    console.log('this.state:', this.state)
    if (nextState.list !== this.state.list) {
      console.log('to render')
      return true
    }
    console.log('no render')
    return false
  }

  onSubmitTitle = (title: any) => {
    // 为了演示 SCU ，故意写的错误用法
    // this.state.list.push({
    //   id: `id-${Date.now()}`,
    //   title
    // })
    // this.setState({
    //   list: this.state.list
    // })
    this.setState({
      list: [
        ...this.state.list,
        {
          id: +new Date() + Math.random(),
          title,
          detail: { name: `name ${Math.floor(Math.random() * 10)}`}
        }
      ]
    })
  }
  render() {
    const { list, footer } = this.state
    return (
      <div>
        <Input onSubmitTitle={this.onSubmitTitle} />
        <List list={list} />
        <Footer footer={footer}/>
      </div>
    );
  }
}

interface IList {
  id: string;
  title: string;
  detail: any;
}
class List extends React.Component<any, any> {
  render() {
    const { list } = this.props
    return (
      <ul>
        {
          list.map((item: IList) => {
            return <li key={item.id}>{ item.title }, { item.detail.name }</li>
          })
        }
      </ul>
    );
  }
}

class Footer extends React.Component<any, any> {
  shouldComponentUpdate(): boolean {
    return false
  }

  render() {
    console.log('父组件不更新, SCU returns false' );
    const { footer } = this.props
    return (
      <h4>{ footer }</h4>
    );
  }
}
class Input extends React.Component<any, any> {
  state = {
    value: 'default'
  }
  onSubmit = () => {
    const { onSubmitTitle } = this.props
    onSubmitTitle(this.state.value)
  }
  onChange = (e: any) => {
    this.setState({ value: e.target.value})
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.onChange}/>
        <button onClick={this.onSubmit}>submit</button>
      </div>
    );
  }
}
