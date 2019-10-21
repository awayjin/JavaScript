

var p = function (err, cb) {
  return cb(3)
}

var p1 = p(null, function (arg) {
  console.log('arg:', arg)
  return 11
})

console.log('p1:', p1)
console.log('22')

