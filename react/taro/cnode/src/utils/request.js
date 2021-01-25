import Taro from '@tarojs/taro'
import api from '../constants/api'

function getJSON (url, data) {
  return Taro.request({
    url,
    data,
    method: 'GET'
  })
}

function postJSON (url, data) {
  return Taro.request({
    url,
    data,
    method: 'POST'
  })
}

async function getTopicList () {
  const result = await getJSON(api.getTopics).catch(err => {
    // console.log('err:', err)
    return err
  })
  // console.log('result:', result)
  return result
}

export {
  getTopicList,
  postJSON,
}
