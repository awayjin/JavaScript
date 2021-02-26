import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000
})

export const get = (url, param) => {
  return service({
    url,
    method: 'GET',
    // params
  })
}

export const post = (url, param) => {
  return service({
    url,
    method: 'POST',
    // data: JSON.stringify(params)
  })
}

export default service;