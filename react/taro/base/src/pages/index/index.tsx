import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import taro from '@tarojs/taro'
import './index.less'
// import { AtButton } from 'taro-ui'
import Child from './child'

export default class Index extends Component {

  state = {
    name: 'name 1',
    age: 18,
    obj: {
      name: undefined
    }
  }
  config = {
    navigationBarTitleText: 'title base'
  }
  componentWillMount () {
    // 在组件在装载发生前被立刻调用
    console.log('1. componentWillMount 在组件在装载发生前被立刻调用')
  }

  componentDidMount () {
    console.log('2. componentDidMount')
  }

  componentDidShow () {
    console.log('3. show  componentDidShow')
  }

  componentDidHide () {
    console.log('4. hide componentDidHide')
  }

  componentWillUnmount () {
    console.log('5. last componentWillUnmount')
  }

  componentWillUpdate() {
    console.log('6 will componentWillUpdate')
  }

  // 会在父组件传递给子组件的参数发生改变时触发
  componentWillReceiveProps(nextProps) {
    console.log('7. componentWillReceiveProps 会在父组件传递给子组件的参数发生改变时触发:', nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('this.state.name:', this.state.name)
    // console.log('nextProps:', nextProps) // 通过父组件传递的对象
    // console.log('nextState:', nextState) // 下一次状态
    // 检查此次 setState 是否要进行 render 调用
    // if (this.state.name === 'name 1') {
    if (nextState.age < 21) {
      return true
    }
    return false
  }

  handleClick () {
    this.setState(
      {
        name: 'new name',
        age: this.state.age + 1,
        obj: { name: 'obj n' }
      },
      () => {
      console.log('setState 回调.')
    })
  }

  test(value: string) {
    this.setState({
      name: value
    })
  }
  render () {
    const { name, age, obj } = this.state
    // console.log('this.config', this.config)
    return (
      <View className='index'>
        <Child name={name} obj={obj} ontest={this.test.bind(this)} />
        <Button onClick={this.handleClick.bind(this)}>更新name</Button>
        <Text>{ name }, { age }</Text>
        <View>2.{ this.config.navigationBarTitleText }</View>
        <Button
          onClick={() => {
            taro.navigateTo({url: '/pages/list/index'})
          }}
        >
          go to list
        </Button>
      </View>
    )
  }
}
