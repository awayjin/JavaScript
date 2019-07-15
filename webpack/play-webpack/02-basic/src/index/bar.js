import { getStr as dd }  from '../../common/index.js'


export default function bar () {
  console.log('bar--33')
  console.log('dd:', dd)

  const div = document.createElement('div')
  div.innerHTML = `bar.js, ${ dd() }`
  document.body.append(div)
}