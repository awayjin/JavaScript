import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
import Head from '../../components/head/head'
import Food from '../../components/food/food'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

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
    count: 1
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount(): void {
    // this.setState({
    //   name: 'sam'
    // })
  }

  change () {
    console.log('this.', this.state.parentName)
    this.setState({ parentName: '通过子组件调用 1'})
  }
  render () {
    // @ts-ignore
    const { name, count } = this.state
    return (
      <View className='index'>
        <Head />
        <Food />
        <Button
          onClick={() => {
            Taro.redirectTo({url: '/pages/demo/index'})
          }}
          style={{marginTop: '40px'}}
        >
          go to demo
        </Button>
      </View>
    )
  }
}

export default Index

