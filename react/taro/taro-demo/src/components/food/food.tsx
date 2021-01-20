import React, { Component } from 'react'
// @ts-ignore
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './food.less'
import { AtTabs, AtTabsPane } from 'taro-ui';

class Food extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  state = {
    name: 'default name',
    count: 1,
    current: 1,
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount(): void {
    // this.setState({
    //   name: 'sam'
    // })
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }]
    return (
      <View className='index'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Food

