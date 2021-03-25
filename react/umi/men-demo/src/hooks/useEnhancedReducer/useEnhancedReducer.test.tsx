/* eslint-disable no-shadow */
// import test from 'ava'
import { renderHook, act } from '@testing-library/react-hooks';
import useEnhancedReducer from './useEnhancedReducer';

describe('test useEnhancedReducer', () => {
  interface IState {
    count: number;
  }
  const state: IState = {
    count: 0,
  };
  const reducer = function(state: IState, action: IAnyAction) {
    const { type } = action;
    switch (type) {
      case 'inc': {
        return {
          count: state.count + 1,
        };
      }
      default:
        return state;
    }
  };

  it('test useEnhancedReducer', () => {
    const { result } = renderHook(() => useEnhancedReducer(reducer, state));
    act(() => {
      const dispatch = result.current[1] as React.Dispatch<IAnyAction>;
      dispatch({ type: 'inc' });
    });
    expect((result.current[0] as IState).count).toBe(1);
  });
});
