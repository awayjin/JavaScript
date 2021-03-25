import { isFunction } from '@/utils';
import produce from 'immer';
import useEnhancedReducer from '../useEnhancedReducer/useEnhancedReducer';
import { middlewares } from '../useEnhancedReducer/middlewares';

export interface IModel<S = {}> {
  immer: boolean; // 是否使用immer
  state: S;
  reducers: {
    [p: string]: Reducer;
  };
}

export function useReduceWithModel<S, A = IAnyAction>(
  model: IModel<S>,
): [S, React.Dispatch<A>] {
  const { state: initialState, reducers, immer } = model;

  const reducer: Reducer<S, IAnyAction> = (draft, action) => {
    const { type } = action;
    let method = reducers[type];

    if (immer) {
      method = produce(reducers[type]);
    }
    if (!isFunction(method)) {
      throw new Error(`reducers 没有相关函数定义 ${type}`);
    }
    return method(draft, action);
  };

  // const hook = useEnhancedReducer<S, A>(reducer, initialState, middlewares);
  // const dispatch = useCallback(hook[1], []);
  // return [hook[0], dispatch];
  return useEnhancedReducer<S, A>(reducer, initialState, middlewares);
}
