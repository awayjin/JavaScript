import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { About } from './About'
import { Users } from '../pages/user/User'
import { Context } from '../pages/context/'
>>>>>>> 2cbf0a52e2be3eb45b09c39f6b79d698a6639cb6

function Index() {
  const [count, setCount] = useState(10)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `${count} times have clicked by you.`
  })
  return (
    <div>
      <p>You clicke { count }</p>
      <p>
        <button onClick={ () => {
          setCount(count + 1)
        } }>
          点击+1
        </button>
      </p>
    </div>
  )
  // return <h2>Home</h2>;
}

interface IThemeProps {
  [key: string]: { color: string, background: string }
}
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee',
  },
  'dark': {
    color: '#fff',
    background: '#000',
  },
}
export const ThemeContext = React.createContext(themes.light);

function AppRouter() {
  console.log('themes.dark:', themes);
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
              <li>
                <Link to="/context">Context</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          {/*<Route path="/users/" component={Users} />*/}
          <Route path="/context" component={Context} />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default AppRouter;
