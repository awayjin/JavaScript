import React from "react";

function App() {
  const a = 1;
  if (a == 1) {
    console.log("相等");
  } else {
    console.log("不相等");
  }
  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>hello world</h2>
      <h3>hello world</h3>
      <button>button</button>
      <hr />
      <code>const a = 'b';</code>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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

export default App;
