const React = require('react');
const ReactDOM = require('react-dom');
const Container = require('../components/container.jsx');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      columns: reactInitData,
      filtType: reactInitFiltType,
      sortType: reactInitSortType
    }
  }

  render() {
    return (
      <Container
        columns={this.state.columns}
        filt={(filtType) => {
          fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
            .then(res => res.json())
            .then(json => {
              console.log('browser/index.jsx. filt json', json)
              this.setState({
                columns: json,
                filtType: filtType
              })
            })
        }}
        sort={(sortType) => {
          fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
            .then(res => res.json())
            .then(json => {
              console.log('browser/index.jsx. sort json', json)
              this.setState({
                columns: json,
                sortType: sortType
              })
            })
        }}
      />
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('react-app')
)
