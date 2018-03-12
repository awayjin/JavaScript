/**
 * Created by jinwei on 2018/3/7.
 */
// 基础配置
import config from '../config/global'
import util from '../config/util'

// 读取图片
import imgList from '../config/imgList'
import ImgLoader from './other/imgLoader'

util.extend({}, { a: 1 })

class Canvas {
  constructor () {
    this.initProperty()
    // 加载图片
    // ImgLoader.load(imgList).then(imgs => {
    //   document.querySelector('#loading').style.display = 'none'
    //   // bg
    //   this.imgs = this.dealImgs(imgs)
    //   // this.init()
    // }).catch(err => {
    //   console.log('index.js:' + err)
    //   console.log(err)
    // })
    ImgLoader.load(imgList).then(imgs => {
      console.log('index.js imgs:')
      console.log(imgs)
      document.querySelector('#loading').style.display = 'none'
      this.imgs = this.dealImgs(imgs)
      console.log(this.imgs)
      console.log(this.imgs.bg)
    }).catch(err => {
      console.log('index.js err:')
      console.log(err)
    })
    this.createCanvas()
  }

  // 处理图片为需要的对象类型 [] => {}
  dealImgs (imgs) {
    const obj = {}
    imgs.forEach(item => {
      obj[item.key] = item.img
    })
    return obj
  }

  initProperty () {
    // 画布宽高
    this.height = config.height
    this.width = config.width

    // 获取画笔
    config.canvases.forEach(canvasId => {
      this[canvasId + 'Ctx'] = document.querySelector(`#${canvasId}`).getContext('2d')
    })

    // 飘落微粒
    this.fallDots = []
    // 飘落的类型(snow heart mix)
    this.fallType = config.fallType
    // 动画的时间
    this.time = 0
    // 当前执行的状态
    this.status = 1

    /** ******* 阶段一（对话）*********/
    // 对话的参数
    this.dialogueOpt = util.extend({ d: 3 }, config.dialogueOpt)
    // this.dialogueOpt = Object.assign({ d: 4 }, config.dialogueOpt)
    /**
     * Array类型
     * 1. 栈方法-后进先出。 push pop
     * 2. 队列方法-先进先出。unshift shift
     */
    // 对话的文字
    this.dialogue = config.dialogue.shift()

    /** ******* 阶段二（天黑）*********/
    this.sunsetTime = config.sunset

    /** *******阶段三（烟花）*********/
    // 天空颜色
    this.skyColor = {
      hue: 210, // 色彩
      lightness: 0 // 明亮
    }
    // 天空的数组
    this.fireworks = []
    this.fireworkTime = util.random(...config.fireworkInterval) | 0 // 按位或取小数点

    this.fireWords = config.fireWords.split('|')
    this.fireOpt = util.extend({
      end: false,
      time: 600,
      showWords: false
    }, config.fireOpt)

    /** *******阶段四（点题）*********/
    this.titleOpt = {
      current: -1,
      ctx: [],
      end: false,
      start: false
    }
    // 大标题
    this.titleWords = config.titleWords.split('|')
    // 组成字的微粒数组
    this.titleDots = []
  }

  // 创建画布
  createCanvas () {
    const canvas = document.createElement('canvas')
    // canvas.width = this.width
    // canvas.height = this.height
    canvas.setAttribute('width', config.width)
    canvas.setAttribute('height', config.height)
    canvas.setAttribute('style', 'background-color: #333; font-size: 14px;')

    document.body.appendChild(canvas)
  }
}

/* eslint-disable no-new */
new Canvas()
