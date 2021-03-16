export default {
  namespace: 'demoSearch',
  state: {
    text: 'dva demoSearch',
    list: [
      222
    ]
  },
  reducers: {
    getList(state: any, action: any): any {
      console.log('demoSearch action:', action)
      return {
        ...state,
        list: action.payload
      }
    }
  }
}
