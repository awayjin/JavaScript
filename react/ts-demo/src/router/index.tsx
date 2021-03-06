import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Home} from '../pages/index'
// import {ContextPage} from '../pages/context/index-nest' // 嵌套组件更新
import {ContextPage} from '../pages/context/index-multiple' // 消费多个 Context
// import {ContextPage} from '../pages/context/index-dynamic' // 动态 Context
import {ReducerPage} from '../pages/reducer/index'
import {UseEffectPage} from '../pages/useEffect/index'
import { Composition } from '../pages/composition'
import { DomPage } from '../pages/dom'
import { FormPage } from '../pages/form'
import {RefsDOM} from '../pages/refs/index'
import {StateLife} from '../pages/state-life/index'
import {Portals} from '../pages/portals/index'
import {Antd} from '../pages/antd/index'


function App() {
  return (
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
              <Link to="/context">Context Page</Link>
            </li>
            <li>
              <Link to="/reducer">ReducerPage</Link>
            </li>
            <li>
              <Link to="/dom">dom</Link>
            </li>
            <li>
              <Link to="/form">form</Link>
            </li>
            <li>
              <Link to="/refs">refs</Link>
            </li>
            <li>
              <Link to="/state-life">state lifeCycle</Link>
            </li>
            <li>
              <Link to="/portals">Portals</Link>
            </li>
            <li>
              <Link to="/antd">antd-mobile</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/antd">
            <Antd />
          </Route>
          <Route path="/portals">
            <Portals title={'Portals 非父节点'} demo={'demo'} />
          </Route>
          <Route path="/state-life">
            <StateLife />
          </Route>
          <Route path="/dom">
            <DomPage />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
          <Route path="/composition">
            <Composition />
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
          <Route path="/refs">
            <RefsDOM />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
