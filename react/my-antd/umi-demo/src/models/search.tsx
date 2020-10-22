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
      console.log('action:', action)
      return {
        ...state,
        // payload 自定义
        lists: Array(10).fill(action.payload)
      }
    }
  },
  // 异步
  effects: {
    // @ts-ignore
    *getListAsync ({ payload }, { call, put}) {
      yield put({
        type: 'getList',
        payload
      })
    }
  }
}
