import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter} from '@tarojs/taro'
import './index.less'

const Hook = () => {
  const router = useRouter();
  console.log('router', router)
  return (
    <View>
      <View>hook</View>
    </View>
  )
}

export default Hook
