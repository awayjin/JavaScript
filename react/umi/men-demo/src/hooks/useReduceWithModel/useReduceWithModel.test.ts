import { renderHook, act } from '@testing-library/react-hooks';
import { useReduceWithModel, IModel } from './useReduceWithModel';

jest.mock('@/utils/env', () => {
  return {
    isLocal: true,
    isInZhuzher: () => false,
  };
});

describe('test useReduceWithModel', () => {
  interface IState {
    count: number;
  }
  const model: IModel<IState> = {
    immer: true,
    state: {
      count: 0,
    },
    reducers: {
      inc(draft) {
        draft.count += 1;
      },
    },
  };

  it('test useEnhancedReducer', () => {
    const { result } = renderHook(() => useReduceWithModel(model));
    act(() => {
      const dispatch = result.current[1] as React.Dispatch<IAnyAction>;
      dispatch({ type: 'inc' });
    });
    expect((result.current[0] as IState).count).toBe(1);
  });
});
