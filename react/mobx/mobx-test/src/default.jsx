// import { observable, action } from 'mobx'
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import {observer, PropTypes as ObservablePropTypes} from 'mobx-react'
import React, { Component } from 'react';
import {observable, action, autorun} from 'mobx';
import {PropTypes} from "prop-types";
import {observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import ReactDOM from 'react-dom'
import Overview from './overview.jsx'

class Store {
  @observable cache = { queue: [11, 22], tick: 333 }
  @observable num = 555

  @action.bound refresh() {
    // console.log('this:', this)
    this.cache.queue.push(111)
  }

  @action
  add () {
    // this.cache.queue.push(21);
    // this.cache.tick += 1;
    console.log('3 this:', this);
    this.num += 99
  }
}
const store = new Store()
autorun(() => {
  // console.log('5. autorun:', store.str + '/' + store.num)
  console.log('5. autorun:', store.num)
})

@observer
class Bar extends Component {
  static propTypes = {
    // queue: PropTypes.array
    // queue: ObservablePropTypes.observableArray
    queue: ObservablePropTypes.observableArray
  }

  render () {
    const { queue, num } = this.props
    console.log('this--:', this.props)
    return (
      <div>
        { queue.length }
        <p>
          <button onClick = {()=> {
            this.props.add()
          } }>加一</button>
          --{ num }
        </p>
        { queue.map((item, index) => <div key={index}>{ item }</div>)}
      </div>
    )
  }
}

class Foo extends Component {
  static propTypes = {
    // cache: PropTypes.object
    // cache: ObservablePropTypes.observableObject
    cache: ObservablePropTypes.observableObject,
    num: PropTypes.number
  }

  render () {
    const { cache } = this.props
    // console.log('this.props:', this.props)
    return (
      <div>
        <button onClick={() => {
          this.props.refresh()
        }}>refresh</button>
        <div>
          { Overview.view }
        </div>
        <Bar queue = {cache.queue} {...this.props} />
      </div>
    )
  }
}

ReactDOM.render(
  <Foo cache={store.cache} refresh={store.refresh} add = {store.add} num={store.num} />,
  document.getElementById('root')
)

// import './index'
