let template = "<article>\n\
    <img src='data/img/SLUG.jpg' alt='NAME'>\n\
    <h3>#POS. NAME</h3>\n\
    <ul>\n\
    <li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
    <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
    <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
    <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
    <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
    </ul>\n\
</article>";

let content = ''
for (let i = 0; i < games.length; i++) {
  let entry = template
    .replace(/POS/g, (i + 1)) // 索引
    .replace(/SLUG/g, games[i].slug) // 图片
    .replace(/NAME/g, games[i].name) // 名称
  content += entry
}

// console.log('1. content:', content)

document.getElementById('content').innerHTML = content

// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
}

// Notifications API 的通知接口用于向用户配置和显示桌面通知
// Notification.requestPermission() 向用户申请显示通知的权限
var button = document.getElementById('notifications')
button.addEventListener('click', function (e) {
  Notification.requestPermission().then(function (result) {
    console.log('result::', result)
    if (result === 'granted') {
      var options = {
        body: '创建 body',
        icon: 'data/img/lost-in-cyberspace.jpg'
      }
      new Notification('demo title3', options)
    }
  })
})