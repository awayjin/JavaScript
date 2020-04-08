// 获取应用实例
const app = getApp();

// pages/native-api/network/network.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 

  fetchData (e) {
    // console.log('e:', e)
    wx.request({
      url: 'http://127.0.0.1:3000',
      success (res) {
        console.log('res:', res)
      },
      fail (err) {
        console.log('err:', err)
      }
    })
    // wx.startLocalServiceDiscovery({
    //   url: 'http://localhost:3000',
    //   success (res) {
    //     console.log('res:', res)
    //   },
    //   fail (err) {
    //     console.log('err:', err)
    //   }
    // })

  },

  goToSwiper (e) {
    console.log('e:', e)
    wx.switchTab({
      url: '../../swiper/swiper'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('network.js onload 监听页面加载. app:', app)
    const code = wx.login({
      success(res) {
        console.log('success:', res)
      }
    })
    console.log('aa:', code)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('network.js onReady-监听页面初次渲染完成 app:', app)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})