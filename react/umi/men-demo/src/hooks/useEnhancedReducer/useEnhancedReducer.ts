import { useReducer, Reducer, Dispatch, useCallback } from 'react';
import { Middleware, AnyAction, MiddlewareAPI } from 'redux';
import compose from './compose';

/**
 * inspired by https://github.com/shiningjason/react-enhanced-reducer-hook/blob/master/index.js
 * @param reducer
 * @param initialState
 * @param middlewares
 */
function useEnhancedReducer<S, A = IAnyAction>(
  reducer: Reducer<S, A>,
  initialState: S,
  middlewares: Middleware[] = [],
) {
  const hook = useReducer(reducer, initialState);
  let state = hook[0]; // 用闭包记录state，在中间件可以访问到next state
  const hookDispatch = hook[1];

  const dispatch: Dispatch<A> = action => {
    // eslint-disable-next-line no-underscore-dangle
    //  update next state
    state = reducer(state, action);
    // dispatch hook
    hookDispatch(action);
    return action;
  };

  const store = {
    getState: () => state,
    dispatch,
  } as MiddlewareAPI;

  const chain = middlewares.map(middleware => middleware(store));

  const enhancedDispatch = useCallback(
    compose<Dispatch<AnyAction>>(...chain)(dispatch),
    [],
  );

  return [state, enhancedDispatch];
}

export default useEnhancedReducer;
