import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Store, { persistor } from './store'
import Router from './router'

export default () => (
  <Provider store={Store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
)
