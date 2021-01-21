import React, { Component } from 'react'
import taro from '@tarojs/taro'
import { Button, View, Text } from '@tarojs/components'

type IProps = {
  name: string;
  // obj: ({ name: string }) => void;
  obj: { name: string | undefined };
  ontest: (value: string) => void;
}

class Child extends Component<IProps, any> {
  static defaultProps = {
    obj: { name: 'name default props' }
  }
  componentWillReceiveProps (nextProps) {
    console.log('child.tsx componentWillReceiveProps nextProps', nextProps)
  }
  pCb () {
    console.log('this.props:', this.props)
    this.props.ontest('子组件调用' + Math.random())
  }
  render() {
    const { name, obj } = this.props
    return (
      <View onClick={this.pCb.bind(this)}>
        child: {name}, obj: { obj.name }
      </View>
    )
  }
}

export default Child;
