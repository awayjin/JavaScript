import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
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
  }

  componentDidMount () { }

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
