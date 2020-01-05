// import "@babel/polyfill";
// import "regenerator-runtime/runtime";

// import demoJson from './json/demo.json'
// console.log('demoJson:', demoJson)
//
// const a = 444
// console.log('const webpack-dev-server:', a)
//
// const arrow = () => {
//   return 'arrow function'
// }
// console.log('arrow:', arrow)

// alert(a)

import React from 'react'
import ReactDOM from "react-dom";
import Container from '../components/container.jsx'
// const Container = require('./comp')

const title = <span>title, world.</span>
class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Welcome Component name',
      content: 'content Welcome.'
    }
  }

  render () {
    return (
      <Container
        name={ this.state.name }
        content={ this.state.content }
      >
        <div>child, title: { title }</div>
        <h2>child, { this.state.content }</h2>
      </Container>
    )
  }
}

ReactDOM.render(
  <Welcome name='jin' />,
  document.getElementById('app')
)
