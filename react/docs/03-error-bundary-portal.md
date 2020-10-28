# DVA
- dva 是什么
- 数据流图
- 例子
- reducers
- effects

## dva 是什么
路由： React-Router
架构： Redux
异步操作： Redux-saga

上面三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷。

dva = React-Router + Redux + Redux-saga

## 数据流图
![dva数据流图](https://zos.alipayobjects.com/rmsportal/hUFIivoOFjVmwNXjjfPE.png)

State：一个对象，保存整个应用状态
View：React 组件构成的视图层
Action：一个对象，描述事件
connect 方法：一个函数，绑定 State 到 View
dispatch 方法：一个函数，发送 Action 到 State

## 例子
src 下创建 models 目录

伪代码：
```javascript
// search.js 
import { getList } from '@/services/search'

export default {
  namespace: 'search',
  state: {
    text: 'dva',
    lists: [
      11, 22
    ]
  },
  // 同步
  reducers: {
    getList (state: any, action: any) {
      return {
        ...state,
        lists: Array(5).fill(action.payload)
      }
    }
  },
  // 异步
  effects: {
    *getListAsync ({ payload }, { call, put}) {
      const res = yield call(getList, payload)
      yield put({
        type: 'getList',
        payload: res.lists
      })
    }
  }
}

// dva/index.tsx
import React from "react";
import Search from './search'
import Lists from './lists'
import { connect } from 'dva'

class Dva extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }
  render() {
    return <div>
      <div>
        <Search {...this.props} />
        <Lists {...this.props} ></Lists>
      </div>
    </div>;
  }
}

export default connect(({ search }) => ({
 search
}))(Dva);

// dva/search.tsx
import React from "react";
import { SearchBar } from 'antd-mobile'

export default class Search extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }

  onChange = (value: any) => {
    this.setState({ value })
  }

  onSubmit = () => {
    // 异步
    this.props.dispatch({
      type: 'search/getListAsync',
      payload: this.state.value
    })
    // this.props.dispatch({
    //   type: 'search/getList',
    //   defMy: this.state.value
    // })
  }

  render() {
    return <div>
      <div>
        <SearchBar
          autoFocus
          value={this.state.value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    </div>;
  }
}

```

## effects
Action 处理器，处理异步动作，基于 Redux-saga 实现。Effect 指的是副作用。根据函数式编程，计算以外的操作都属于 Effect，典型的就是 I/O 操作、数据库读写。

```
// 同步
  reducers: {
    getList (state: any, action: any) {
      return {
        ...state,
        lists: Array(5).fill(action.payload)
      }
    }
  },
  // 异步
  effects: {
    *getListAsync ({ payload }, { call, put}) {
      const res = yield call(getList, payload)
      yield put({
        type: 'getList',
        payload: res.lists
      })
    }
  }
```

### call 和 put
dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。

- call：执行异步函数
- put：发出一个 Action，类似于 dispatch
