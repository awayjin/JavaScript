import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./todoList"
import ReduxTodoList from "./redux-store/TodoList"
import StoreDemo from "./storeDemo"

import { Provider } from 'react-redux'
import store from './redux-store/index'

ReactDOM.render(
  <Provider store={store}>
    <div className="App2" style={{ margin: '20px' }}>
      <ReduxTodoList />
      <hr />
      <TodoList />
      <StoreDemo />
    </div>
  </Provider>,
  document.getElementById('root')
);

