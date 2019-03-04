var express = require('express');
var router = express.Router();

function html_entity (str) {
  var s = ''
  if (str.length === 0) return s
  s = str.replace(/&/g, '&amp') // 和号
  s = s.replace(/>/g, '&gt;') // 大 于
  s = s.replace(/</g, '&lt;') // 小于
  s = s.replace(/\s/g, '&nbsp;') // 空格
  s = s.replace(/\'/g, '&#39;') // 单引号
  s = s.replace(/\"/g, '&quot;') // 双引号
  s = s.replace(/\n/g, '<br>') // 换行
  return s
}
// html_entity('<img src=" &" a=&><br>')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.xss)
  // res.set('X-XSS-Protection', 0)
  res.render('index', {
    title: 'Express',
    xss: req.query.xss
  });
});

var comments = {}
router.get('/comment', function (req, res, next) {
  comments.v = html_entity(req.query.comment)
  console.log('comment::::')
  console.log(comments.v)
  // res.send(comments.v)
})

router.get('/getComment', function (req, res, next) {
  res.json({
    comment: comments.v
  })
})

module.exports = router;
