---
layout: post
title:  "HTML5-Canvas基础知识"
date:   2018年05月09日 09:46:32
categories: Canvas
excerpt: Canvas元素大小与绘图表面，canvas状态保存与恢复
---

* content
{:toc}

---
#HTML5-Canvas基础知识
## 1.canvas元素大小和绘图表面的大小(drawing surface)
 > --css设置元素大小不会改变绘图表面的大小

## 2.canvas状态的保存与恢复
 >   --save与restore用于保存及恢复当前canvas绘图环境的所有属性
    save-当前环境压入堆栈顶部，restore从堆栈顶部弹出一组状态信息

## 3. 性能工具
```html
  3.1 性能分析器(Profiler)
      Take Heap Snapshot 创建堆快照用来显示网页上的JS对象和相关的DOM节点的内存分布情况。
      Record Allocation Timeline 从整个Heap角度记录内存的分配信息，利用这个可以实现隔离内存泄漏问题。
      Record Allocation Profile 从JS函数角度记录内存的分配信息。
  3.2 时间轴工具(TimeLine)
  3.3 jsPerf
      JavaScript性能测试-benchmark(跑分)
```
## 4.事件处理
  > 4.1 鼠标坐标转换为Canvas坐标
```javascript
  function windowToCanvas (canvas, x, y) {
    // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    var posBox = canvas.getBoundingClientRect()
    return {
      // canvas.width / posBox.width 元素大小与绘图表面不相符时，进行缩放
      x: x - posBox.left * (canvas.width / posBox.width),
      y: y - posBox.top * (canvas.height / posBox.height)
    }
  }
  var canvas = document.getElementById('canvas')
  canvas.onclick = function (e) {
    // clientX 鼠标指针水平坐标
    windowToCanvas(canvas, e.clientX, e.clientY)
  }
```
 > 4.2 键盘事件
 
 keydown keyup keypress
 
 > 4.3 触摸事件
 
 ## 5.绘制表面的保存与恢复
 >绘图表面自身进行保存与恢复，进行临时性的绘制动作。
 如皮带线条、辅助线(guidewrite)或注解(annotation)
 
- 5.1 Canvas立即模式(immediate-mode)绘制图形, 绘画应用程序(paint application)
- 5.2 SVG保留模式(retained-mode)-维护一份所绘图像列表,画图应用程序(drawing application)
