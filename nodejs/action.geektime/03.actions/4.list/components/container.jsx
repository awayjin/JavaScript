const React = require('react');
const ColumnItems = require('./column-items.jsx')

module.exports = class Container extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const columns = this.props.columns
    return (
      <div>
        <div className="filter-course">
          <p>components/container.jsx</p>
          <span>课程:</span>
          <a onClick={ this.handleClick.bind(this, 0) }>全部</a>
          <a  onClick={ this.handleClick.bind(this, 1) }>专栏</a>
          <a onClick={ this.props.filt.bind(this, 2)} >视频课程3</a>
          <a onClick={ this.props.sort.bind(this, 3)} >微课</a>
        </div>
        <hr/>
        <div>
          <div  className="filter-sort">
            <a >上新</a>
            <a >订阅数</a>
            <a >价格</a>
            <span className={ 'columns-length'}>
              { columns.length || '--' }个课程
            </span>
          </div>
          <ColumnItems
            columns = { columns }
          />
        </div>
      </div>
    )
  }
  handleClick (value) {
    console.log('value:', value)
  }
}


