import { Base64 } from 'js-base64'

Page({
  // 增加短评
  onAddShortComment () {
    wx.request({
      url: 'http://localhost:3000/v1/book/add/short_comment',
      method: 'POST',
      data: {
        content: '春风十里不如你',
        book_id: 1120
      },
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },

  // onBookLikes
  onBookLikes () {
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/favor',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },

  // 我喜欢的书籍数量
  onBookFavoriteCount () {
    wx.request({
      url: 'http://localhost:3000/v1/book/favor/count',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  // 搜索书籍
  onSearchBook () {
    wx.request({
      url: 'http://localhost:3000/v1/book/search?q=韩寒&stat=30&count=6',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  // book detail
  onBookDetail () {
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/detail',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  // 获取热门书籍列表
  onHotBooks () {
    wx.request({
      url: 'http://localhost:3000/v1/book/hot_list',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },

  // 期刊详细
  getClassicDetail () {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1',
      header: {
        Authorization: this.encodeBasic64()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },

  // 获取期刊点赞情况
  onClassicLike () {
    wx.request({
      url: 'http://localhost:3000/v1/classic/100/1/favor',
      header: {
        Authorization: this.encodeBasic64()
        // Authorization: this.onDemo()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  encodeBasic64() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    // Authorization:Basic base64(account:password)
    return 'Basic ' + base64
  },
  // 点赞
  onLike() {
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'post',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        Authorization: this.encodeBasic64()
        // Authorization: this.onDemo()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  // 取消点赞
  onDisLike() {
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'post',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        Authorization: this.encodeBasic64()
        // Authorization: this.onDemo()
      },
      success(res) {
        console.log('res.data:', res.data)
      },
      fail(err) {
        console.log('err:', err)
      }
    })
  },
  // 获取最新期刊
  onGetLatest () {
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'get',
      header: {
        Authorization: this.encodeBasic64()
        // Authorization: this.onDemo()
      },
      success (res) {
        console.log('res.data:', res.data)
      },
      fail (err) {
        console.log('err:', err)
      }
    })
  },
  onDemo () {
    console.log('new Set', new Set([11, 22, 22, 11]))
    console.log('startsWith', 'aabbcc'.startsWith('a'))
    return 444
  },
  // 获取 token
  onGetToken () {
    const code = wx.login({
      success(res) {
        // console.log('res.code:', res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/v1/token',
            data: {
              account: res.code,
              type: 100
            },
            success(res) {
              console.log('success res:', res)
              const code = res.statusCode.toString()
              // debugger
              if (code.startsWith('2')) {
              // if (code === '200') {
                console.log('res.data.token:', res.data.token)
                // debugger
                wx.setStorage({
                  'key': 'token',
                  'data': res.data.token,
                  success: function (res) {
                    console.log('设置 token:', res)
                  },
                  fail: (res) => {
                    console.log('fail 设置 token:', res)
                  }
                })
                wx.getStorageSync({
                  key: 'token',
                  success: function (res) {
                    console.log('从本地 获取token:', res)
                  },
                  fail: (res) => {
                    console.log('fail 从本地 获取token:', res)
                  }
                })
              }
            },
            fail(res) {
              console.log('fail:', res)
            },
            method: 'POST'
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // console.log('aa:', code)
  },
  onVerifyToken () {
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
      },
      success (res) {
        console.log('success res:', res.data)
      },
      fail (res) {
        console.log('fail res:', res)
      }
    })
  }
})