import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './router/index'

class ShoppingList extends React.Component {
  return () {
    return  (
      <div>
        <h1>name: {this.props.name}</h1>
        <ul>
          <li>11</li>
          <li>232</li>
        </ul>
      </div>
    )
  }
}

// return React.createElement('div', {className: 'shopping-list'},
//   React.createElement('h1', /* ... h1 children ... */),
//   React.createElement('ul', /* ... ul children ... */)
// );

function App() {
  return (
    <div className="App">
      {/*<ShoppingList name="Away" />*/}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default Router
// export default App;
