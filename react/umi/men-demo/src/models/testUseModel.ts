import {
  useReduceWithModel,
  IModel,
} from '@/hooks/useReduceWithModel/useReduceWithModel';

interface IState {
  count: number;
}

const initialState: IState = { count: 0 };

/**
 * 可以直接返回state，也可以修改draft里面的数据，返回空
 * @param draft
 * @param action
 */

enum actionEnum {
  reset = 'reset',
  increment = 'increment',
  decrement = 'decrement',
  setNum = 'setNum',
}

const model: IModel<IState> = {
  immer: true,
  state: initialState,
  reducers: {
    [actionEnum.increment](
      state: IState,
      action: { type: actionEnum; [extraProps: string]: any },
    ) {
      state.count += action.payload;
      return undefined;
    },
    [actionEnum.setNum](
      state: IState,
      action: { type: actionEnum; [extraProps: string]: any },
    ) {
      state.count = action.payload;
    },
  },
};

const useGlobal = () => {
  const [state, dispatch] = useReduceWithModel(model);

  const reset = () => dispatch({ type: actionEnum.reset });

  const increment = (num = 1) =>
    dispatch({ type: actionEnum.increment, payload: num });

  const decrement = (num = 1) =>
    dispatch({ type: actionEnum.decrement, payload: num });

  const setNum = (num = 1) =>
    dispatch({ type: actionEnum.setNum, payload: num });

  const badAction = () => dispatch({ type: 'some action' });
  return { state, reset, increment, decrement, badAction, setNum };
};

export default useGlobal;
