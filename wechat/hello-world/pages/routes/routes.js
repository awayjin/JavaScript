const app = getApp()

Page({
  // onLoad () {
  onLoad: function () {
    
    console.log('routes.js onload. app:', app)
  },

  onReady() {
    console.log('routes.js onReady app:', app)
  },
  goToHello (event) {
    console.log('event:', event)

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