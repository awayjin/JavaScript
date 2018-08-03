var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('X-XSS-Protection', 0)
  res.render('index', { title: 'Express', xss: req.query.xss });
});

var comments = {}
var html_encode = function (str) {
  var s = ''
  if (str.length) return
  s = str.replace(/</g, '&lt')
  s = str.replace(/>/g, '&gt')
  return s
}

// comment
router.get('/comment', function (req, res, next) {
  console.log('req.query.comment::::')
  console.log(req.query.comment)
  comments.v = html_encode(req.query.comment)
  res.send(comments.v)
})

// get comment
router.get('/getComment', function (req, res, next) {
  res.json({
    comment: comments.v
  })
})

module.exports = router;
