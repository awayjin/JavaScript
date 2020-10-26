// @ts-ignore
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
      console.log('<--- action:', action)
      // console.log('<--- state:', state)
      return {
        ...state,
        // payload 自定义
        // lists: Array(5).fill(action.payload)
        lists: action.payload
        // lists: Array(5).fill(action.defMy)
      }
    }
  },
  // 异步
  effects: {
    // @ts-ignore
    *getListAsync ({ payload }, { call, put}) {
      const res = yield call(getList, payload)
      console.log('effects res:', res)
      yield put({
        type: 'getList',
        payload: res.lists
      })
      // yield put({
      //   type: 'getList',
      //   payload
      // })
    }
  }
}
