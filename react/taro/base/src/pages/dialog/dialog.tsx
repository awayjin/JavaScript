import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter} from '@tarojs/taro'
import './index.less'

const Dialog = (props) => {
  // const router = useRouter();
  // console.log('router', router)
  return (
    <View>
      <View>我是 dialog, {props.children}, attr: {props.myAttr}</View>
    </View>
  )
}

export default Dialog
