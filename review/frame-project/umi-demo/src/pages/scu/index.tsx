import React, {createContext, useState, useContext, Suspense} from 'react';

export default class Demo extends React.Component<any, any> {
  constructor(props: React.Component) {
    super(props);
  }
  state = {
    text: 20,
    list: [
      { id: '01', title:  'til 01'},
      { id: '02', title:  'til 02'},
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

  onSubmitTitle = (title: any) => {
    this.setState({
      list: [...this.state.list, { id: +new Date() + Math.random(), title }]
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
}
class List extends React.Component<any, any> {
  render() {
    const { list } = this.props
    return (
      <ul>
        {
          list.map((item: IList) => {
            return <li key={item.id}>{ item.title }</li>
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
