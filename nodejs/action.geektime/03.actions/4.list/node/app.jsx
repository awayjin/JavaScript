const React = require('react')
const Container = require('../components/container.jsx')

module.exports = function (reactData) {
  return <Container
    columns = { reactData.columns }
    filt = {
      (value) => {
        console.log('filt value:', value)
      }
    }
    sort = {
      value => {
        console.log('sort value:', value)
      }
    }
    name = 'jin'
  />
}
// module.exports = App
