## IntersectionObserver 交叉观察器

Intersection Observer API提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

- intersectionRatio - 子元素是否进入到可视区域范围， 0-没有， 1-完全进入了
- isIntersecting - 子元素是否可见的

也就是某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到scroll事件后，调用目标元素的 `getBoundingClientRect()` 方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题



```jsx
  useEffect(() => {
    console.log('进入页面')
    const observer = new IntersectionObserver(entries => {
      /**
       * IntersectionObserver
       * intersectionRatio - 子元素是否进入到可视区域范围， 0-没有， 1-完全进入了
       * isIntersecting - 子元素是否可见的
       * */
      // intersectionRatio isIntersecting
      console.log('entries', entries)
    })
    const target = document.querySelector('#loading')
    observer.observe(target)

    return () => {
      console.log('离开页面')
      if (observer) {
        // 解绑元素
        observer.unobserve(target)
        // 停止监听
        observer.disconnect()
      }
    }
  },  [])

    <div id="loading"
         style={{ width: '100px', height: '100px', backgroundColor: '#f90', marginTop: '1000px', marginBottom: '40px'}}
      >

   </div>

```

## 参考

MDN:
https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API