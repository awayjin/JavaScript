import React, { Component } from 'react'
// @ts-ignore
import { View, Button, Text } from '@tarojs/components'
// @ts-ignore
import Taro from '@tarojs/taro'

class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  state = {
    name: 'default name',
    count: 1
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount(): void {
    // this.setState({
    //   name: 'sam'
    // })
  }

  render () {
    const { name, count } = this.state
    return (
      <View className='index'>
        { name } - { count}
      </View>
    )
  }
}

export default Index

