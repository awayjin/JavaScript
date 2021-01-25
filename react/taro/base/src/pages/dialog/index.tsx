import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter} from '@tarojs/taro'
import './index.less'
import Dialog from './dialog'

const Index = () => {
  const router = useRouter();
  console.log('router', router)
  return (
    <View>
      <Dialog myAttr='my attr'>
        <Text>first</Text>
      </Dialog>
      <Dialog>second</Dialog>
      <Dialog></Dialog>
    </View>
  )
}

export default Index
