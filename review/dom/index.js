var el = require('./element')

var ul = el(
  'ul',
  { id: 'list'},
  [
    el('li', { props: 'item'}, ['item 1']),
    el('li', { props: 'item'}, ['item 2']),
    el('li', { props: 'item'}, ['item 3'])
  ]
)

console.log('ul:')
console.log(ul)