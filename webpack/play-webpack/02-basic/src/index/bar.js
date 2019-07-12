export default function bar () {
  console.log('bar--33')
  const div = document.createElement('div')
  div.innerText = 'bar.js'
  document.body.append(div)
}