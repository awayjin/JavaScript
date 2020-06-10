import {
    ClassicModel
} from '../../models/classic.js'
import {
    LikeModel
} from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({

    /**
     * 页面的初始数据
     */

    properties: {
        cid: Number,
        type: Number,
        needNavi:{
          type:Boolean,
          value:true
        }
    },

    data: {
        classic: null,
        latest: true,
        first: false,
        likeCount: 0,
        likeStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */

    attached(options) {
        const cid = this.properties.cid
        console.log(cid,type)
        const type = this.properties.type
        if (!cid) {
            classicModel.getLatest().then(res => {
                this.setData({
                    classic: res,
                    likeCount: res.fav_nums,
                    likeStatus: res.like_status
                })
            })
        } else {
            classicModel.getById(cid, type).then(res => {
              console.log(res.id,res.type)
                this._getLikeStatus(res.id, res.type)
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        }
    },

    methods: {
        // 获取 token
  onGetToken () {
    const code = wx.login({
      success(res) {
        // console.log('res.code:', res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://192.168.0.101:3000/v1/token',
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
        onLike: function(event) {
            const behavior = event.detail.behavior
            likeModel.like(behavior, this.data.classic.id,
                this.data.classic.type)
        },

        onNext: function(event) {
            this._updateClassic('next')
        },

        onPrevious: function(event) {
            this._updateClassic('previous')
        },

        _updateClassic: function(nextOrPrevious) {
            console.log(this.data.classic)
            const index = this.data.classic.index
            const classic = classicModel.getClassic(index, nextOrPrevious)
            classic.then(res => {
                this._getLikeStatus(res.id, res.type)
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        },

        _getLikeStatus: function(artID, category) {
          console.log(artID,category)
            const status = likeModel.getClassicLikeStatus(artID, category)
            status.then(
                (res) => {
                    this.setData({
                        likeCount: res.fav_nums,
                        likeStatus: res.like_status
                    })
                })
        },
    }
})