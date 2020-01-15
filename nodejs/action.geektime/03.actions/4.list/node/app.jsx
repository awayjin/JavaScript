const React = require('react')
const Container = require('../components/container.jsx')
// const Container = require('../component/container.jsx')

module.exports = function (reactData) {
  return <Container
    columns = { reactData.columns }
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
// module.exports = App
