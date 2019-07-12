import * as Redux from 'redux'
import apiMiddleware from './apiMiddleware'
import thunkMiddleware from 'redux-thunk'
import Reducers from '../reducers'
import { persistStore } from 'redux-persist'

const Store = (function(Redux, Reducers) {
  const preloadedState = window.__PRELOADED_STATE__,
    middleware = Redux.applyMiddleware(thunkMiddleware, apiMiddleware),
    reducers = Redux.combineReducers({
      ...Reducers
    })

  return Redux.createStore(
    reducers,
    preloadedState,
    Redux.compose(
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION__({
            trace: true,
            name: 'Vanke Service'
          })
        : f => f
    )
  )
})(Redux, Reducers)

export const persistor = persistStore(Store)

export default Store
