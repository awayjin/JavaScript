const React = require('react')

const title = <h1>react-dom/server app.jsx</h1>
class App extends React.Component {
  render () {
    return (
      <div>
        { title }
        <p>44 </p>
        name: { this.props.name }
        <p>
          columns:
          { this.props.columns.map(item =>  item.column_title ) }
        </p>
      </div>
    )
  }
}

module.exports = function (reactData) {
  // console.log('app.jsx reactData:')
  // console.log(reactData)
  return <App
    columns = { reactData.columns }
    name = 'jin'
  />
}
// module.exports = App
