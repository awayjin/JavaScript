// import { observable, action } from 'mobx'
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import {observer, PropTypes as ObservablePropTypes} from 'mobx-react'
import React, { Component } from 'react';
import {observable, action} from 'mobx';
// import {PropTypes} from "prop-types";
// import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import {observer, PropTypes } from 'mobx-react'
import ReactDOM from 'react-dom'

class Store {
  @observable cache = { queue: [11, 22] }

  @action.bound refresh() {
    // console.log('this:', this)
    this.cache.queue.push(111)
  }

  @action add () {
    this.cache.queue.push(1);
  }
}
const store = new Store()

@observer
class Bar extends Component {
  static propTypes = {
    // queue: PropTypes.array
    // queue: ObservablePropTypes.observableArray
    queue: PropTypes.observableArray
  }

  render () {
    const { queue } = this.props
    console.log('queue', queue)
    return (
      <div>
        { queue.length }
        --{ queue.map((item, index) => <div key={index}>{ item }</div>)}
      </div>
    )
  }
}


class Foo extends Component {
  static propTypes = {
    // cache: PropTypes.object
    // cache: ObservablePropTypes.observableObject
    cache: PropTypes.observableObject
  }

  render () {
    const { cache } = this.props
    // console.log('this.props:', this.props)
    return (
      <div>
        <button onClick={() => this.props.refresh()}>refresh</button>
        <Bar queue={cache.queue} />
        ---
        <button onClick = {()=> this.props.add() }>加一</button>
        <Bar queue = {cache.queue} />
      </div>
    )
  }
}

ReactDOM.render(
  <Foo cache={store.cache} refresh={store.refresh} add = {store.add} />,
  document.getElementById('root')
)

import './index'
