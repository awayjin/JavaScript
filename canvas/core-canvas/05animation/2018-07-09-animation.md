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

## 5.2 帧速率的计算
> 动画是由一系列叫做‘帧’(frame)的图像组成，图像显示的频率叫‘帧速率’.
> fps(frame per seconds): 每秒钟播放的帧数

## 5.3 以不同的帧速率来执行各种任务 
> 把不同的任务安排在不同的帧速率上执行

## 5.4 恢复动画背景
> 难点在于处理背景，三种方法
- 将所有内容都擦除，并重新绘制
- 仅重绘内容发生变化的那部分区域
- 从离屏缓冲中将内容发生变化的那部分背景图像复制到屏幕上。(blitting图块复制)