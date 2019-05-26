// const currentAuth = ['admin']
const currentAuth = ['guest']

export { currentAuth }

export function getCurrentAuthority () {
  return currentAuth
}

export function check (authority) {
  // console.log('authority: ', authority)
  const current = getCurrentAuthority()
  return current.some(
    item => authority.includes(item)
  )
}

export function isLogin () {
  const current = getCurrentAuthority()
  // console.log('isLogin-current:', current, ', &&:', current && current[0] !== 'guest')
  return current && current[0] !== 'guest'
}
