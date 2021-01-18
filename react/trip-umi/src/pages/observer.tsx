import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi'
// @ts-ignore
import { useObserverHook } from '@/hooks'

export default () => {
  const [state, setState] = useState();
  useObserverHook('#loading', (entries: any)=>{
    console.log(entries)
  });
  // useEffect(() => {
  //   console.log('进入页面')
  //   const observer = new IntersectionObserver(entries => {
  //     /**
  //      * IntersectionObserver
  //      * intersectionRatio - 子元素是否进入到可视区域范围， 0-没有， 1-完全进入了
  //      * isIntersecting - 子元素是否可见的
  //      * */
  //     // intersectionRatio isIntersecting
  //     console.log('entries', entries)
  //   })
  //   const target: any = document.querySelector('#loading')
  //   observer.observe(target)
  //
  //   return () => {
  //     console.log('离开页面')
  //     if (observer) {
  //       // 解绑元素
  //       observer.unobserve(target)
  //       // 停止监听
  //       observer.disconnect()
  //     }
  //   }
  // },  [])

  return (
    <div>
      <h1 className={styles.title}>observer</h1>
      <button onClick={() => history.push('/')}>go to index</button>
      <div id="loading"
         style={{ width: '100px', height: '100px', backgroundColor: '#f90', marginTop: '1000px', marginBottom: '40px'}}
      >

      </div>
    </div>
  );
}
