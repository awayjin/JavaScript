const React = require('react');

module.exports = class ColumnItems extends React.Component {
  render () {
    return (
      <ul>
        { this.props.columns.map(item =>  {
          return <li key={ item.id }>
            <h2>{ item.column_title }, 上新 id: { item.id }</h2>
            <div className='column-subtitle'>
              <p>订阅数: { item.sub_count }, 价格: { item.column_price }</p>
              子标题:{ item.column_subtitle }
            </div>
            <ul>
              {
                item.articles.map(subItem => {
                  return <li  key={ subItem.id } >article_title: { subItem.article_title }</li>
                })
              }
            </ul>
          </li>
        }) }
      </ul>
    )
  }
}

