---
layout: post
title:  "HTML5-Canvas基础知识"
date:   2018年07月09日 15:36:32
categories: Canvas
excerpt: 动画
---

* content
{:toc}

---

> window.requestAnimationFrame基于时间的运动

## 5.1 动画循环
> 持续的更新与重绘就叫做“动画循环(animation loop)”

### 5.1.1 通过requestAnimationFrame()方法让浏览器来自行决定帧速率
- 都是通用方法，并不是专为制作动画而用
- 达不到毫秒级的精确性
- 没有对调用动画循环的机制优化
- 不考虑绘制动画的最佳时机
- 最优帧速率(optimal frame rate)