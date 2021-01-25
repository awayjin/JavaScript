import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter, getCurrentInstance, getCurrentPages} from '@tarojs/taro'
import './index.less'

export default class Index extends Component {

  state = {
    name: 'name 1'
  }
  config = {
    navigationBarTitleText: 'title base'
  }
  componentWillMount () {
    // 在组件在装载发生前被立刻调用
    // console.log('this.$router', this.$router)
    console.log('Taro.getCurrentInstance() router:', Taro.getCurrentInstance().router)
  }

  componentDidMount () {
    console.log('Taro.getCurrentPages():', Taro.getCurrentPages())
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { name } = this.state
    return (
      <View className='index'>
        <Text>list</Text>
      </View>
    )
  }
}
