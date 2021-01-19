import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import './top.less'

class Top extends Component {
  static defaultProps: { name: string, onchange: any };
  clickHandle () {
    console.log('this.props', this.props)
    // @ts-ignore
    this.props.onchange()
  }
  render () {
    return (
      <View className='top'>
        <View className='left'>
          <Image className="img" src={require("../../assets/img/left.png")} />
        </View>
        <Text>top</Text>
        <View className="right">
          <Image className="img" src={require("../../assets/img/search.png")} />
          <Image className="img" src={require("../../assets/img/collect.png")} />
          <Image className="img" src={require("../../assets/img/tuan.png")} />
          <Image className="img" src={require("../../assets/img/lue.png")} />
        </View>
      </View>
    )
  }
}

export default Top


