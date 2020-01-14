const React = require('react');
const ColumnItems = require('./column-items.jsx');

module.exports = class Container extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const columns = this.props.columns
    return (
      <div className={ 'container'} >
        <div className="filter-course">
          <p>components/container.jsx</p>
          <span>课程:</span>
          <a onClick={ this.props.filt.bind(this, 0) }>全部</a>
          <a  onClick={ this.props.filt.bind(this, 1) }>专栏</a>
          <a onClick={ this.props.filt.bind(this, 2)} >视频课程3</a>
          <a onClick={ this.props.filt.bind(this, 3)} >微课</a>
        </div>
        <hr/>
        <div>
          <div  className="class-sort">
            <a onClick={ this.handleClick.bind(this, '0 sort')}>上新</a>
            <a onClick={ this.props.sort.bind(this, 1) } >订阅数</a>
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
    console.log('components/handleClick handleClick value:', value);
  }
}


