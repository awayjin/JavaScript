import { observable, action } from 'mobx'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Store {
  cache = { queue: [] }
}
const store = new Store()

class Bar extends Component {
  static propTypes = {
    queue: PropTypes.array
  }

  render () {
    const { queue } = this.props
    return (
      <div>
        { queue.length }
      </div>
    )
  }
}

class Foo extends Component {
  static propTypes = {
    cache: PropTypes.object
  }

  render () {
    const { cache } = this.props
    return (
      <div>
        <Bar queue={cache.queue} />
      </div>
    )
  }
}

ReactDOM.render(<Foo cache={store.cache} />, document.getElementById('root'))