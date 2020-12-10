

## Session

Cookie 在 Web 应用中经常承担标识请求方身份的功能，所以 Web 应用在 Cookie 的基础上封装了 Session 的概念，专门用做用户身份识别。

如何对 session 进行扩展？

session 默认保存到 cookie 里的的某个字段中，当 cookie 越来越多，浏览器拒绝执行。 我们可以讲 session 保存到内存当中.

## Cookie 和 Session 的区别

![cookie和session区别](./img/cookie-session.png)