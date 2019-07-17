'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import LifeCycleImg from './images/lifecycle.png'
import './search.less'
import { getStr } from '../../common/index.js'
import { a } from './tree-shaking.js'

console.log('search34444')
class Search extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      Text: null
    }
  }

  // 动态引入组件
  loadComponent () {
    import('./text.js').then(data => {
      console.log('data:', data)
      this.setState({
        Text: data.default
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="search-text">
        <p>
          dynamic: { Text ? <Text /> : null }
        </p>
        <p>common: { getStr() } </p>
        <p>funcA: { a() }</p>
        <img src={ LifeCycleImg } onClick={ this.loadComponent.bind(this) } alt=""/>
      </div>
    )
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
