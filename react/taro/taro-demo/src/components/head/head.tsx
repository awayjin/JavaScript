import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Top from './top'
import './head.less'

class Head extends Component {
  static defaultProps: { name: string, onchange: any };
  constructor(){
    // @ts-ignore
    super(...arguments)
    this.state={
      "store":{
        title:"川湘居",
        notice:"欢迎光临，很高兴为您服务~",
        tags:["味道赞","主食真好","分量足"]
      }
    }
  }
  clickHandle () {
    console.log('this.props', this.props)
    // @ts-ignore
    this.props.onchange()
  }
  render () {
    const {store}=this.state;
    return (
      <View className={'head'}>
        <Top />
        <Image className="back" src={require('../../assets/img/back.jpg')} />
        <View className="store">
          <Image className="store_img" src={require('../../assets/img/store.jpg')} />
          <View className="store_text">
            <Text className="title">{store.title}</Text>
            <Text>{store.notice}</Text>
            <View>
              {store.tags.map((item,index)=><Text className="tags_text" key={index}>{item}</Text>)}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Head
