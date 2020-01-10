const React = require('react')

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'state ka',
      date: new Date()
    }

  }
  render () {
    return (
      <div className="container">
        <div className="filter-course">
          <p>components/container.jsx</p>
          <span>课程:</span>
          <a onClick={ this.handleClick.bind(this, 0) }>全部</a>
          <a  onClick={ this.handleClick.bind(this) }>专栏</a>
          <a onClick={ this.props.sort.bind(this, 3) }>视频课程3</a>
          <a >微课</a>
          <a onClick={
            () => {
              console.log('4444')
            }
          } >1微课</a>
        </div>
        <h2> container, name:{ this.props.name } </h2>
        <div>
          C:{ this.props.content }
          <p>
            state.name:
            { this.state.name }, { this.state.date.toLocaleString() }
          </p>
        </div>
        <section className="child">
          { this.props.children }
        </section>
      </div>
    )
  }

  handleClick (value) {
    this.setState((state) => {
      return {
        name: state.name + value,
        date: new Date()
      }
    })
    console.log('value:', value)
  }
}

module.exports = Container
