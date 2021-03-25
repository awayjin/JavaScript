/**
 * 返回时钟，按定时器delay递减
 * const {tick, runTick} = useTick(maxTick = 60, delay = 1)
 */
import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * @param beginTick
 * @param endTick
 * @param interValue tick定时递减或者递增的差值
 * @param delay tick定时器执行间隔
 */
export default function useTick(
  beginTick = 60,
  endTick = 0,
  interValue = 1,
  delay = 1,
) {
  const [tick, setTick] = useState(beginTick);
  const timerRef = useRef<NodeJS.Timeout>();

  const reset = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    setTick(beginTick);
  }, [beginTick]);

  const runTick = useCallback(() => {
    // timerRef.
    if (timerRef.current === undefined) {
      timerRef.current = setInterval(() => {
        // 是否递减模式
        const isDec = beginTick > endTick;
        if (isDec) {
          setTick(value => {
            return value - interValue;
          });
        } else {
          setTick(value => {
            return value + interValue;
          });
        }
      }, delay * 1000);
    }
  }, [beginTick, endTick, interValue, delay]);

  useEffect(() => {
    // 到终点了就回复初始状态
    if (tick === endTick) {
      reset();
    }
  }, [endTick, reset, tick]);

  // unmount的时候就重置所有状态
  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tick, runTick };
}
