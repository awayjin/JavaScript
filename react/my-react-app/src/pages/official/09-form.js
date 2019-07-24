import React from 'react'

class Form extends React.Component {

  constructor (props) {
    super(props)

    this.state = { value: 'default' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    alert('A name was submitted:' + this.state.value)
    event.preventDefault()
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return (
      <div>
        <h2>form-module 表单</h2>
        <form onSubmit={ this.handleSubmit }>
          name: <input type="text" value={ this.state.value } onChange={ this.handleChange } />
          <input type="submit" value={'submit2'} />
        </form>
      </div>
    )
  }
}

let formBack = () => {
  return <Form />
}

export default formBack