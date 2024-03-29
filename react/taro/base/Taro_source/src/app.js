import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index/index'

import configStore from './store'
import '@tarojs/async-await'

import './app.less'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/detail/index',
      'pages/login/login',
      'pages/user/user',
      'pages/publish/publish',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {
   
  }

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
