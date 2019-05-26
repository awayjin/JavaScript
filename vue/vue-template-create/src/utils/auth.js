import { getSearchString } from './preset'
// const currentAuth = ['admin']
const currentAuth = ['guest']

export { currentAuth }

export function getCurrentAuthority () {
  return currentAuth
}

export function check (authority) {
  const current = getCurrentAuthority()
  return current.some(
    item => authority.includes(item)
  )
}

export function isLogin () {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}

const TOKEN_NAME = 'token'
// get token
export function getToken () {
  return getSearchString(TOKEN_NAME)
}

// import Cookies from 'js-cookie'
//
// const TokenKey = 'vue_admin_template_token'
//
// export function getToken() {
//   return Cookies.get(TokenKey)
// }
//
// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }
//
// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
