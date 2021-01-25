// @ts-ignore
import React, { Component } from 'react'
// @ts-ignore
import { View, Text, Button, Input, Textarea } from '@tarojs/components'
import Taro, { useRouter} from '@tarojs/taro'
import './index.less'

console.log('env', process.env)
const DemoEvent = () => {
  const handleClick = (event) => {
    // console.log('event', event)
    console.log('env', process.env)
    console.log('env：', process.env.TARO_ENV)
    event.stopPropagation()
  }
  return (
    <View>
      <Button onClick={handleClick}>DemoEvent</Button>
    </View>
  )
}

export default DemoEvent
