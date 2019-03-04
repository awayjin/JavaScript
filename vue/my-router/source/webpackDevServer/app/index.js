import index from '../css/index.css'

/**
 *
 * require和import的区别
 */
var sub = require('./sub')
var app = document.createElement('div')
app.innerHTML = '<h1>Hello World h1</h1>'
document.body.appendChild(app)