import React, {createContext, useState, useContext, createRef} from 'react';


export default class Refs extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'oldText'
    }
  }

  changeText = (str: string) => {
    this.setState({
      text: str
    })
  }

  render() {
    return <div>
      <h2>child test: { this.state.text}</h2>
    </div>;
  }
}
