import React, {useEffect, useRef, useState} from 'react';
import { useUrlLoader } from '@/hooks/useUrlLoader'
import styles from '../index.less'
import { history } from 'umi';

export default () => {
  const countRef = useRef(10); // 多次渲染
  const didMountRef = useRef(false); // 模仿生命周期
  const domRef: any = useRef(); // dom ref
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      console.log('didMountRef')
      didMountRef.current = true;
    }
    if (domRef?.current) {
      console.log('domRef:', domRef)
      domRef.current.focus();
    }
  })

  useEffect(() => {
    document.title = `${count} times.`
  }, [count]);

  function handleAlert () {
    setTimeout((
    ) => {
      console.log(count)
      console.log('countRef:', countRef.current)
    }, 2000)
  }

  // const unlisten = history.listen((location: { pathname: any; }, action: any) => {
  //   console.log('2. location', location);
  // });
  // unlisten();
// history 栈里的实体个数
//   console.log('history.length:', history.length);
  return (
    <div>
      <h2 className={styles.title}>
        自定义钩子
        higher order component.
      </h2>

      <div>
        <h3>
          <button onClick={() => {
            setCount(count + 1);
            countRef.current++
          }}>add count</button>
        </h3>
        <input type="text" ref={domRef}/>
        like: { count}
        <button onClick={handleAlert}>alert</button>
        <button onClick={() => {
          // 将新入口放入历史堆栈
          history.push({
            pathname: '/',
            search: '?a=query',
            // 一些不存在url参数上面的当前url的状态值
            state: { b: '2. state' }
          })
        }}>go to /</button>
        b
      </div>
    </div>
  );
}
