## DOM 元素
> React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。我们借此机会完善了浏览器 DOM 实现的一些特殊情况。

在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。例如，与 HTML 中的 tabindex 属性对应的 React 的属性是 tabIndex。例外的情况是 aria-* 以及 data-* 属性，一律使用小写字母命名。比如, 你依然可以用 aria-label 作为 aria-label。

```javascript
function DomPage () {
  const html = 'First &middot; &lt; Second'
  function createMarkup() {
    return {__html: 'First &middot; Second'};
  }

  const [check, setCheck] = useState(false)
  const toggleCheck = () => {
    setCheck(!check)
  }

  return (
    <>
      <h2>dom </h2>
      { html }
      <div>
        <input type="checkbox" defaultChecked={true}/>
        <input type="checkbox" checked={check} onChange={toggleCheck} />
        <button onClick={ toggleCheck }>toggle</button>
      </div>
      <div dangerouslySetInnerHTML={{'__html': html} } />
      <div dangerouslySetInnerHTML={createMarkup()}></div>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </>
  )
}
```