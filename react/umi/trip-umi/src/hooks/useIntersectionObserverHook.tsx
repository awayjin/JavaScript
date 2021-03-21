// @ts-nocheck3
import {useEffect} from "react";

const useIntersectionObserverHook = (el: string, callback: Function, watch = undefined) => {
  let observer: IntersectionObserver;
  useEffect(() => {
    const node = document.querySelector(el);
    if (node) {
      observer = new IntersectionObserver(entries => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        observer.unobserve(node);
        observer.disconnect();
      }
    }
  }, watch);
};

export default useIntersectionObserverHook;

