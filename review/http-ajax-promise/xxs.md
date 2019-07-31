<section>
  <h2><a href="http://www.w3school.com.cn/html/html_entities.asp" target="_blank">实体编码：</a></h2>
  和号：&amp; 大于号:&gt; 小于号:&lt;
  换行: \n <br>
  引号:&quot;  单引号：&#39; 空格: &nbsp;
</section>

<ol>
  <li>1.0 了解XSS的定义:跨站脚本攻击(Cross Site Scripting)</li>
  <li>2.0 理解XSS原理</li>
  <li>
    3.0 理解XSS的攻击方式
    (1) 反射型：发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS代码。这个过程像一次反射，故叫反射型XSS
    url:http://localhost:3000/?xss=%3Ciframe%20src=%22http://www.baidu.com%22%3E
    不解析=:<%= xss %>， 解析-:<%- xss %>
    res.set('X-XSS-Protection', 0)
    xss: req.query.xss
    
    (2) 存储型： 存储型XSS和反射型XSS的差别仅在于，提交的代码会存储在服务器端（数据库，内存，文件系统等），下次请求目标页面时不用再提交XSS代码

    (3) DOM-based or local XSS（基于DOM或本地的XSS攻击）
  </li>
  <li>4.0 掌握XSS的攻击方式</li>
</ol>

<h2>三、 掌握XSS的防御措施</h2>
编码、过滤、校正
<p>编码: 对用户输入的数据进行HTML Entity编码,<img src="html_entity.JPG" alt=""></p>
<p>
  过滤: 移除用户上传的DOM属性，如onerror等事件，移除用户上传的Style节点，script节点、iframe节点等
</p>
<p>校正: 避免直接对HTML Entity解码，使用DOM Parse转换，校正不配对的DOM标签 </p>