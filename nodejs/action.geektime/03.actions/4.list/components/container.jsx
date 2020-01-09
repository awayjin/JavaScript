const React = require('react');

module.exports = class Container extends React.Component {
  render () {
    return (
      <div>
        <div className="filter-course">
          <p>components/container.jsx</p>
          <span>课程:</span>
          <a >全部</a>
          <a >专栏</a>
          <a >视频课程</a>
          <a >微课</a>
        </div>
        <hr/>
        <div>
          <div  className="filter-sort">
            <a >上新</a>
            <a >订阅数</a>
            <a >价格</a>
          </div>
          <ul>
            { this.props.columns.map(item =>  {
              return <li>
                <h2>{ item.column_title }, id: { item.id }</h2>
                <div className='column-subtitle'>{ item.column_subtitle }</div>
                <ul>
                  {
                    item.articles.map(subItem => {
                      return <li>article_title: { subItem.article_title }</li>
                    })
                  }
                </ul>
              </li>
            }) }
          </ul>
        </div>
      </div>
    )
  }
}


