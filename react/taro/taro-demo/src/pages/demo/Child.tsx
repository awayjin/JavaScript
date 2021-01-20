// import React, { Component } from 'react'
// // import Taro, { Component } from '@tarojs/taro'
// import { connect } from 'react-redux'
// import { View, Button, Text } from '@tarojs/components'
//
// type PageStateProps = {
//   counter: {
//     num: number
//   }
// }
//
// type PageDispatchProps = {
//   add: () => void
//   dec: () => void
//   asyncAdd: () => any
// }
//
// type PageOwnProps = {}
//
// type PageState = {}
//
// type IProps = PageStateProps & PageDispatchProps & PageOwnProps
//
// interface Index {
//   props: IProps;
// }
//
// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
// class Child extends Component {
//   componentWillReceiveProps (nextProps) {
//     console.log(this.props, nextProps)
//   }
//
//   state = {
//     name: 'default name',
//     count: 1
//   }
//
//   componentWillUnmount () { }
//
//   componentDidShow () { }
//
//   componentDidHide () { }
//
//   componentDidMount(): void {
//     // this.setState({
//     //   name: 'sam'
//     // })
//   }
//
//   render () {
//     const { name, count } = this.state
//     return (
//       <View>
//         child
//       </View>
//     )
//   }
// }
//
// export default Child

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
