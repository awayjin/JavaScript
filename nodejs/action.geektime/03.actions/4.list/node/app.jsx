const React = require('react')

const title = <h1>react-dom/server app.jsx</h1>
class App extends React.Component {
  render () {
    return (
      <div>
        { title }
        <p>44 </p>
      </div>
    )
  }
}

module.exports = <App />
