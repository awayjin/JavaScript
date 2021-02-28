import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import stores from './store/index.jsx'
import Parent from "./components/Parent"
import TodoList from "./TodoList"

const obj = { ...stores }
console.log('obj:', obj)

ReactDOM.render(
  <Provider {...stores}>
    <Parent />
    <div className="App">
      { TodoList.view }
    </div>
  </Provider>,
  document.getElementById('root')
);
