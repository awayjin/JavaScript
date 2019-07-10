import * as React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import WaitingComponent from './WaitingComponent'

const history = createBrowserHistory()

const Layout = React.lazy(() => import('../containers/Layout'))

export default () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={WaitingComponent(Layout)} />

      <Redirect from="*" to="/" />
    </Switch>
  </Router>
)
