import * as React from 'react'
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import WaitingComponent from './WaitingComponent'

const history = createBrowserHistory()

const Layout = React.lazy(() => import('../containers/Layout'))

const About = () => {
  return <h2> About </h2>
}

const User = () => {
  return <h2> User </h2>
}

export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={WaitingComponent(Layout)} />
      <Redirect from="*" to="/" />
    </Switch>

    <nav>
      <ul>
        <li>
          33
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>

    <Route path="/about" component={About} />
    <Route path="/user" component={User} />
  </Router>
)
