const request = require('./index')

request('{ hello }').then(hello => console.log('hello:', hello))