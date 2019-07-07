# PWA
PWA（Progressive web apps，渐进式 Web 应用）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。

### PWA 的优势
PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。

### 核心 PWA 指南
- PWA 介绍
- PWA 结构
- 通过 Service workers 让 PWA 离线工作
- 让 PWA 易于安装
- 通过通知推送让 PWA 可重用
- 渐进式加载

## 1. PWA 介绍
[PWA 介绍](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Introduction)

### 1.1 什么是渐进式web应用?

PWA应用是指那些使用指定技术和标准模式来开发的web应用，这将同时赋予它们web应用和原生应用的特性。

易于发现，链接分享 web 应用，离线运行

渐进式增强和响应式设计已经可以让我们构建对移动端友好的网站。

### 1.2 什么使应用成为PWA?
PWA不是使用一种技术创建的。它们代表了构建Web应用程序的新理念，涉及一些特定的模式，API和其他功能。

当应用程序满足某些要求时，可以将其视为PWA，功能：离线工作，可安装，易于同步，可以发送推送通知等。

Lighthouse

一些关键的原则来辨别一个web应用是否是一个PWA应用
。它应该具有以下特点:

- Discoverable 可被发现, 内容可以通过搜索引擎发现

- Installable 易安装, 可以出现在设备的主屏幕。

- Linkable 可链接, 你可以简单地通过一个URL来分享它。 

- Network independent 独立于网络, 它可以在离线状态或者是在网速很差的情况下运行。

- Progressive 渐进式, 它在老版本的浏览器仍旧可以使用，在新版本的浏览器上可以使用全部功能。

- Re-engageable 可重用, 无论何时有新的内容它都可以发送通知。

- Responsive 响应性, 它在任何具有屏幕和浏览器的设备上可以正常使用——包括手机，平板电脑，笔记本，电视，冰箱，等。

- Safe 安全的, 在你和应用之间的连接是安全的，可以阻止第三方访问你的敏感数据。

### 1.3 这么做值得吗？

较小的代价就可以实现PWA的核心特性，这样的优势是巨大的。例如：

- 减少应用安装后的加载时间, 多亏了 Service Workers来进行缓存, 以此来节省带宽和时间。

- 当应用有可用的更新时，可以仅仅去更新发生改变的那部分内容。与之相反，对于一个原生应用而言，即便是最微小的改动也需要强制用户去再次下载整个应用

- 外观和使用感受与原生平台更加融为一体——应用图标被放置在主屏幕上，应用可以全屏运行，等

- 凭借系统通知和推送消息与用户保持连接，对用户产生更多的吸引力，并且提高转换效率。


您甚至可以使用 PWABuilder 网站在线生成 PWA。
[PWABuilder](https://www.pwabuilder.com/)


### 1.4 浏览器支持

PWA 所需的关键要素是 service worker 支持。

其他功能，如 Web App Manifest，Push，Notifications和 Add to Home Screen 功能也得到了广泛的支持。 目前，Safari 对 Web App Manifest 和 Add to Home Screen 的支持有限，并且不支持 Web 推送通知。

### 2. PWA 结构
[PWA 结构](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/App_structure)