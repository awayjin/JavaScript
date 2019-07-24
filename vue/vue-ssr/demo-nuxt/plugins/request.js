import axios from 'axios'
// axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = 'H7E5eDBwz1acFVFrBa5c8soVpoNKK2' // eslint-disable-line
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
