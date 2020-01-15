const React = require('react');
const ColumnItem = require('./column-items.jsx');

module.exports = class Container extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const columns = this.props.columns
    let filtType = this.props.filtType || '0'
    return (
      <div className={ 'container'} >
        <div className="filter-course">
          <p>components/container.jsx</p>
          <span>课程:</span>
          <a
            className={  filtType == '0' ? 'current' : ''}
            onClick={ this.props.filt.bind(this, 0) }>
            全部
          </a>
          <a
            className={  filtType == '1' ? 'current' : ''}
             onClick={ this.props.filt.bind(this, 1) }>
            专栏
          </a>
          <a
            className={  filtType == '2' ? 'current' : ''}
            onClick={ this.props.filt.bind(this, 2) }>
            视频课程
          </a>
          <a
            className={  filtType == '3' ? 'current' : ''}
            onClick={ this.props.filt.bind(this, 3) } >
            微课
          </a>
        </div>
        <hr/>
        <div>
          <div  className="class-sort">
            <span>排序:</span>
            <a onClick={ this.props.sort.bind(this, 0)}>上新</a>
            <a onClick={ this.props.sort.bind(this, 1) } >订阅数</a>
            <a onClick={ this.props.sort.bind(this, 2) } >价格</a>
            <span className={ 'columns-length'}>
              { columns.length || '--' }个课程
            </span>
          </div>
          <ColumnItem
            columns = { columns }
          />
        </div>
      </div>
    )
  }
  handleClickCourse (value) {
    console.log('components/handleClick handleClick value:', value);
    return this.props.filt.bind(this, value);
  }
}


