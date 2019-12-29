const Container = require('../components/container.jsx')
const React = require('react')

module.exports = function (data) {
  return <Container
    columns={data}
    filt={() => {}}
    sort={() => {}}
  />
}