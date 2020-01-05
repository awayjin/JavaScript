Page({
  goToHello (event) {
    console.log('event:', event)

    debugger
    wx.navigateBack({
      delta: 1
    })
  },
  longPress (event) {
    console.log('event:', event)
  },

  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'page/component/pages/cover-view/cover-view'
    }
  },

  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  }
})