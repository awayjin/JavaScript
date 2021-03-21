import {useEffect} from "react";

export default function useImagesHook(el: string, callback: Function, watch = undefined, imgDataSrc = 'data-src') {
  useEffect(() => {
    const nodes = document.querySelectorAll(el)
    let observer: IntersectionObserver
    if (nodes?.length) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
        entries.forEach(item => {
          if (item.isIntersecting) {
            const dataSrc = item.target.getAttribute(imgDataSrc)
            if (dataSrc) {
              item.target.setAttribute('src', dataSrc);
              observer.unobserve(item.target) // 解绑元素
            }
          }
        })
      })
      nodes.forEach(item => {
        observer.observe(item)
      })
    }
    return () => {
      if (nodes && observer) {
        observer.disconnect() // 停止监听
      }
    }
  }, watch)
}
