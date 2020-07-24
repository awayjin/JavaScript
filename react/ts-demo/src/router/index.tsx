import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Home} from '../pages/index'
import {About} from '../pages/about/about'
import {Users} from '../pages/user/index'
import {ContextPage} from '../pages/context/index'
import {ReducerPage} from '../pages/reducer/index'
import {UseEffectPage} from '../pages/useEffect/index'
import { Compotion } from '../pages/composition'

interface IThemeProps {
  [key: string]: { color: string, background: string, width?: any, }
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
  'default': {
    color: '#fff',
    background: '#000',
    width: 200,
  }
}
export const ThemeContext = React.createContext(themes.light);

function App() {
  const [theme, setTheme] = useState('default');
  const changeTheme = (changeTheme: string) => {
    console.log(changeTheme)
    setTheme(changeTheme);
  }
  console.log('themes[theme]:', themes[theme]);

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/composition">component composition</Link>
              </li>
              <li>
                <Link to="/useEffect">useEffect</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/context">Context Page</Link>
              </li>
              <li>
                <Link to="/reducer">ReducerPage</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/composition">
              <Compotion />
            </Route>
            <Route path="/reducer">
              <ReducerPage />
            </Route>UseEffectPage
            <Route path="/useEffect">
              <UseEffectPage />
            </Route>composition
            <Route path="/context">
              <ContextPage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
              <a href="#theme-switcher" className="btn btn-light" onClick={()=>{changeTheme('light')}}>浅色主题</a>
              <br/>
              <a href="#theme-switcher" className="btn btn-secondary" onClick={()=>{changeTheme('dark')}}>深色主题</a>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}


export default App;
