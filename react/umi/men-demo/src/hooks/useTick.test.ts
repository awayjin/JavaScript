import { renderHook, act } from '@testing-library/react-hooks';
import useTick from './useTick';

jest.useFakeTimers();

describe('test useTick', () => {
  it('tick should increase', () => {
    const { result } = renderHook(() => useTick(1, 3));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    // 一秒之后tick 为2
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.tick).toBe(2);
  });

  it('tick should increase every 2 second', () => {
    const { result } = renderHook(() => useTick(1, 3, 1, 2));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    // 一秒之后tick 为2
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.tick).toBe(2);
  });

  it('tick should increase 2, every 2 second', () => {
    const { result } = renderHook(() => useTick(1, 4, 2, 2));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    // 两秒之后加到3
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.tick).toBe(3);
  });

  it('tick should decrease', () => {
    const { result } = renderHook(() => useTick(4, 1));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.tick).toBe(3);
  });

  it('tick should decrease every 2 second', () => {
    const { result } = renderHook(() => useTick(3, 0, 1, 2));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.tick).toBe(2);
  });

  it('tick should decrease 2, every 2 second', () => {
    const { result } = renderHook(() => useTick(4, 0, 2, 2));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.tick).toBe(2);
  });

  it('multiple execution， only one tick run', () => {
    const { result } = renderHook(() => useTick(1, 3));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    act(() => {
      const { runTick } = result.current;
      runTick();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.tick).toBe(2);
  });

  it('tick should reset', () => {
    const { result } = renderHook(() => useTick(1, 3, 1, 1));
    act(() => {
      const { runTick } = result.current;
      runTick();
    });
    // 2秒之后跳到3，然后重置为1
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(result.current.tick).toBe(1);
  });
});
