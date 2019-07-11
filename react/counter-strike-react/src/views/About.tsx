import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import WaitingComponent from '../router/WaitingComponent'
import styles from '../containers/layout.module.scss'

const Demo = React.lazy(() => import('../containers/Demo'))

export default class Layout extends React.Component {
  public render() {
    return (
      <div className={styles.layout}>
        layout
        {/* <Switch>
          <Route path="/demo" component={WaitingComponent(Demo)} />
        </Switch> */}
      </div>
    )
  }
}
