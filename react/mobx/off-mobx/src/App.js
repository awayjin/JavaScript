import './App.css';
import TodoList from './TodoList'
import React, { useEffect } from 'react'
import stores from './store/index'
import Parent from './components/Parent'

function App() {
  useEffect(() => {
    console.log('stores:', stores);
  })
  return (
    <>
      <Parent />
      <div className="App">
        { TodoList.view }
      </div>
    </>
  );
}

export default App;
