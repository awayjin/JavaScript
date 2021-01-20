import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { add, minus, asyncAdd } from '../../actions/counter'
import Child from './Child'
// eslint-disable-next-line import/first
import { AtTabs, AtTabsPane } from 'taro-ui';

import './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}


type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  state = {
    name: 'default name',
    parentName: 'parent name',
    count: 1,
    current: 0,
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount(): void {
    // this.setState({
    //   name: 'sam'
    // })
    console.log('componentDidMount')
    Taro.login({
      success (res) {
        if (res.code) {
          console.log('res', res)
          //发起网络请求
          Taro.request({
            method: 'POST',
            url: 'http://localhost:3000/v1/token',
            data: {
              code: res.code,
              account: res.code,
              type: 100,
            },
            success: (data) => {
              console.log('data', data)
            },
            fail: (err) => {
              console.log('err:', err)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  onLaunch() {
    console.log('onLaunch')
  }

  change () {
    console.log('this.', this.state.parentName)
    this.setState({ parentName: '通过子组件调用 1'})
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    // @ts-ignore
    const { name, count } = this.state
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    return (
      <View className='index'>
        <View>
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
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World， demo</Text></View>
        <Button
          onClick={() => {
            this.setState({
              name: 'lily',
              parentName: 'change parentName',
              count: count + 1
            }, () => {
              console.log('name1:', this.state.name)
            })
            console.log('异步 name2:', this.state.name)
          }}
        >
          change name
        </Button>
        <View>
          <Child
            name={this.state.parentName}
            onchange={this.change.bind(this)}
          />
          <Text>{name} {count}</Text>
        </View>

      </View>
    )
  }
}

export default Index

