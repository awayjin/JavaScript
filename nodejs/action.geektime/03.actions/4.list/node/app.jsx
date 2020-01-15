const React = require('react')
const Container = require('../components/container.jsx')

module.exports = function (reactData) {
  return <Container
    columns = { reactData }
    filt = {
      (value) => {
        console.log('node/app.jsx filt value:', value)
      }
    }
    sort = {
      value => {
        console.log('node/app.jsx sort value:', value)
      }
    }
    name = 'jin'
  />
}

