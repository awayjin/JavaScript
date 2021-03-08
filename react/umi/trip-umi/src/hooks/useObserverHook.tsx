import { useEffect } from 'react';

let observer: any;
export default function useObserverHook(ele: any, callback: any, watch = []) {
  useEffect(() => {
    /**
     * IntersectionObserver
     * intersectionRatio - 子元素是否进入到可视区域范围， 0-没有， 1-完全进入了
     * isIntersecting - 子元素是否可见的
     * */
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver(entries => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        // 解绑元素
        observer.unobserve(node);

        // 停止监听
        observer.disconnect();
      }
    }
  }, watch);
}
