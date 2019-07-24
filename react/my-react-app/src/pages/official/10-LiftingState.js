import React from 'react'

// 状态提升
function BoilingVerdict (props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  } else {
    return <p>The water would not boil.</p>
  }
}

class Calculator extends React.Component {

  constructor (props) {
    super(props)
    this.state = { temperature: 'default' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ temperature: e.target.value })
  }

  render () {
    const temperature = this.state.temperature
    return (
      <div>
        <h2> 状态提升 </h2>
        <input type="text" value={ temperature} onChange={ this.handleChange } />

        <BoilingVerdict celsius={ parseFloat(temperature) } />
      </div>
    )
  }
}

let formBack = () => {
  return <Calculator />
}

export default formBack