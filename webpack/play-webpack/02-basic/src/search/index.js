'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import LifeCycleImg from './images/lifecycle.png'
import './search.less'

console.log('search34444')
class Search extends React.Component {
  render() {
    debugger
    return <div className="search-text">
      Search Text3
      <img src={ LifeCycleImg } alt=""/>
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
