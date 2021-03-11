export default {
  namespace: 'demo',
  state: {
    text: 'dva demo',
    list: [
      11, 22
    ]
  },
  reducers: {
    getList(state: any, action: any): any {
      console.log('action:', action)
      return {
        ...state,
        list: action.payload
      }
    }
  }
}
