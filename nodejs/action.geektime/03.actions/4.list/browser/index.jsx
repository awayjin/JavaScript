const Container = require('../components/container.jsx');
// const Container = require('../component/container2.jsx');
const React = require('react');
const ReactDOM = require('react-dom');



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
        filtType = { this.state.filtType }
        filt={(filtType) => {
          this.setState({ filtType })
          console.log('filtType3:', filtType)
            // fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
            fetch(`./list/data?sort=${this.state.sortType}&filt=${filtType}`)
              .then(res => res.json())
              .then(json => {
                this.setState({
                  columns: json,
                  filtType: filtType
                })
              })
        }}
        sort={(sortType) => {
          // fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
          fetch(`./list/data?sort=${sortType}&filt=${this.state.filtType}`)
            .then(res => res.json())
            .then(json => {
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
