import { useEffect } from 'react';
import { isEmpty } from 'project-libs';

/**
 * 1，监听图片是否进入可视区域；
 * 2，将src属性的值替换为真实的图片地址，data-src
 * 3，停止监听当前的节点
 * @param {*} ele
 * @param {*} callback
 * @param {*} watch
 *
 * demo：
 useImgHook('.item-img', (entries: IntersectionObserver) => {
    console.log('entries:', entries)
  }, null)
 <img alt='img' className='item-img' src={require('@/assets/blank.png')} data-src={item.img} />
 */
export default function useImgHook(ele: any, callback: any, watch = []){
  let observer: IntersectionObserver;
  useEffect(()=>{
    const nodes = document.querySelectorAll(ele);
    if(!isEmpty(nodes)){
      observer = new IntersectionObserver((entries)=>{
        callback && callback(entries);
        entries.forEach(item => {
          // console.log(item)
          if(item.isIntersecting){
            const dataSrc: any = item.target.getAttribute('data-src');
            item.target.setAttribute('src', dataSrc);
            observer.unobserve(item.target);
          }
        });
      });
      nodes.forEach(item => {
        observer.observe(item);
      });
    }

    return () => {
      if(!isEmpty(nodes) && observer){
        observer.disconnect();
      }
    }
  }, watch)
}
