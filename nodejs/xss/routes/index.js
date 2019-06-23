var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 自执行: http://localhost:3000/?xss=<img src='' onerror='alert(11)'>
// 诱导: http://localhost:3000/?xss=<p onclick='alert(22)'>click me</p>
// iFrame 广告等: http://localhost:3000/?xss=<iframe src='//qq.com' />

router.get('/', function (req, res) {
  res.set('X-XSS-Protection', 0) // 关闭 XSS 保护
  res.render('index', {
    title: 'Express XSS Demo',
    xss: req.query.xss
  })
})

var comments = {
  a: 1
}
// 实体编码
function htmlEncode (str) {
  // return str
  var s = ''
  console.log('str.length:', str.length)
  if (str.length === 0) return
  s = str.replace(/</g, '&lt')
  s = str.replace(/>/g, '&gt')
  return s
}

// encode.js：可以使用 https://github.com/mathiasbynens/he 中的he.js
//
// domParse：可以用 https://github.com/blowsie/Pure-JavaScript-HTML5-Parser


// comment
router.get('/comment', function (req, res) {
  console.log('req.query.comment::::', req.query.comment)
  var html = htmlEncode(req.query.comment)
  console.log('html entity::::', html)
  comments.v = html
  res.send(comments.v)
  // res.send(33)
})

// getCompment
router.get('/getComment', function (req, res) {
  console.log('comments:', comments)
  res.json({
    comment: comments.v || 'default',
    comment2: 444
  })
})

module.exports = router;
