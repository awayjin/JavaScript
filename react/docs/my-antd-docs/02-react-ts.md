## 自定义 hook
- 自定义 hook，把组件逻辑提取到可重用的函数中

## 高阶组件（HOC）higher-order-components

高阶组件是参数为组件，返回值为新组件的函数。

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件

## useRef - 多次渲染之间的纽带

```
const countRef = useRef(10); // 多次渲染
const didMountRef = useRef(false); // 模仿生命周期
const domRef: any = useRef(); // dom ref

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
<input type="text" ref={domRef}/>
```