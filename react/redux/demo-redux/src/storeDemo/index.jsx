import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{ value }</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={this.props.onDecreaseClick}>decrease</button>
      </div>
    )
  }
}
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = {
  type: 'increase'
}
const decreaseAction = {
  type: 'decrease'
}

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 2 }
    case 'decrease':
      return { count: count - 3 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction)
  }
}

// Connected Component
// const App = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter)
const AddSub = connect(mapStateToProps, mapDispatchToProps)(Counter)

const Index = () => {
  return (
    <div>
      <h2>333</h2>
      <Provider store={store}>
        <AddSub />
      </Provider>
    </div>
  )
}

export default Index