const React = require('react')

class Container extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="container">
        <h2> container, name:{ this.props.name } </h2>
        <div>
          C:{ this.props.content }
        </div>
        <section className="child">
          { this.props.children }
        </section>
      </div>
    )
  }
}

module.exports = Container