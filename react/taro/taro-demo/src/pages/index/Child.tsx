import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'

class Child extends Component {
  static defaultProps: { name: string, onchange: any };
  clickHandle () {
    console.log('this.props', this.props)
    // @ts-ignore
    this.props.onchange()
  }
  render () {
    const { name }: any = this.props
    return (
      <View>
        <Button
          // onClick={() => {
          //   // this.clickHandle()
          //   console.log('this.props', this.props)
          //   this.props.onchange()
          // }}
          onClick={this.clickHandle.bind(this)}
        >子组件调用</Button>
        child - { name }
        <Button
          onClick={() => {
            console.log('Taro', Taro)
          }}
        >
          log
        </Button>
      </View>
    )
  }
}

export default Child
