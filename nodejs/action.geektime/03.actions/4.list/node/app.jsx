const React = require('react')
// 不知道为什么要在上层目录,
// 运行 index.js 才能编译 require 过来的 jsx
const Container = require('../components/container.jsx')
// const Container = require(__dirname + '/../components/container.jsx')
// const Container = require(__dirname + '/c.jsx')

class Container2 extends React.Component {
  render () {
    return (
      <div>
        <div className="filter-course">
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

module.exports = function (reactData) {
  return <Container
    columns = { reactData.columns }
    name = 'jin'
  />
}
// module.exports = App
