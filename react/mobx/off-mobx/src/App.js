import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList'

function App() {
  return (
    <div className="App">
    { TodoList.view }
    </div>
  );
}

export default App;