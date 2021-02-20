import {observable, action} from 'mobx'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const appState = observable({
  timer: 20,
  max: {
    number: 100
  }
})
appState.resetTimer = action(function reset() {
  // appState.timer = 0;
  appState.timer += 1
});
// setInterval(action(function tick() {
//   // console.log('appState:', appState.timer);
//   appState.timer += 1;
// }), 1000);

class Store {
  @observable appState = {
    timer: 20,
    max: {
      number: 100
    }
  }
  @observable num = 500;
  @action add() {
    this.appState.timer++
    this.num++
  }
}
const store = new Store()

class TimerView extends Component {
  static propTypes = {
    max: PropTypes.object
  }
  state = {
    count: 300
  }
  render() {
    const { appState } = this.props.store
    return (
      <div>
        <button onClick={() => {
          console.log('this:', this);
          console.log('this:', appState.timer);
          // console.log('-this:', this.props.store.add);
          // console.log('this:', this.props.appState.resetTimer);
          // this.props.store.resetTimer()
          this.props.store.add()
        }}>
          passed: { appState.timer }
        </button>
        -- { appState.timer }
        -- { this.props.store.num }
        {/*{ this.props.appState.timer }*/}
        {/*- { this.state.count }*/}
        {/*- { this.props.appState.max.number }*/}
      </div>
    )
  }
}

export default {
  // view: <TimerView appState={appState} />
  view: <TimerView store={store} />
}
