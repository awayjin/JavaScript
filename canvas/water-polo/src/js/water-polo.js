/**
 * Created by jinwei-258246377@qq.com on 2018/3/17.
 */
class WaterPolo {
  constructor (selector, useOptions) {
    this.init(selector, useOptions)
    this.drawCircle()
    this.drawFrame()
  }

  // 初始化
  init (selector, useOptions) {
    this.options = {
      width: 300,
      height: 300,
      // 波浪滚动速度，数越大越快
      speed: 0.02,
      lineWidth: 2, // 线条宽度
      nowRange: 0, // 页面起始位置
      // 液面位置 百分比表示
      baseY: 40,
      lineColor: '#333', // 线条颜色
      wrapWidth: 5, // 缝隙宽度
      oneWaveWidth: 0.06, // 上层波浪宽度，数越小越宽
      oneWaveHeight: 4, // 上层波浪高度，数越大越高
      // 上层颜色
      oneColor: 'rgba(176,204,53,.6)',
      oneOffsetX: 20, // 上层波浪x轴偏移量
      twoWaveWidth: 0.06, // 下层波浪宽度
      twoWaveHeight: 4, // 下层波浪高度
      twoOffsetX: 50, // 下层波浪x轴偏移量
      // 上层颜色
      twoColor: 'rgba(176,204,53,.4)'
    }

    Object.assign(this.options, useOptions)
    this.canvas = document.getElementById(selector)
    this.canvas.setAttribute('width', this.options.width)
    this.canvas.setAttribute('height', this.options.height)
    // this.canvas.setAttribute('style', 'background: #e8dcdc;')
    this.context = this.canvas.getContext('2d')
    // 解决图像锯齿的问题
    if (window.devicePixelRatio) {
      let canvas = this.canvas
      let width = canvas.width
      let height = canvas.height
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.height = height * window.devicePixelRatio
      canvas.width = width * window.devicePixelRatio
      this.context.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    this.context.imageSmoothingEnabled = true // 解决图像锯齿的问题

    this.context.lineWidth = this.options.lineWidth // 线宽
    this.center = this.options.height / 2 // 圆心
    this.radius = this.center - this.options.wrapWidth - 1 // 圆的半径,解决圆的缝隙问题
  }

  // 动画
  drawFrame () {
    window.requestAnimationFrame(this.drawFrame.bind(this))
    const opt = this.options
    this.context.clearRect(0, 0, opt.width, opt.height)
    // 高度改变动画参数
    if (opt.nowRange <= opt.baseY) {
      let temp = 1
      opt.nowRange += temp
    }

    if (opt.nowRange > opt.baseY) {
      let temp = 1
      opt.nowRange -= temp
    }

    this.makeFluid(opt.oneOffsetX, opt.oneWaveWidth, opt.oneWaveHeight, opt.oneColor)
    this.makeFluid(opt.twoOffsetX, opt.twoWaveWidth, opt.twoWaveHeight, opt.twoColor)

    opt.oneOffsetX += opt.speed
    opt.twoOffsetX += opt.speed
  }

  // 生成液面
  makeFluid (xOffset, waveWidth, waveHeight, color) {
    const context = this.context
    // let points = []
    context.save()
    context.beginPath()
    // 在x轴上取点
    for (let x = 0; x < this.options.width; x += 20 / this.options.height) {
      // 此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
      let y = -Math.sin(x * waveWidth + xOffset)
      // 液面高度百分比改变
      let dy = this.options.height * (1 - this.options.nowRange / 100)
      // points.push([x, dy + y * waveHeight])
      context.lineTo(x, dy + y * waveHeight)
    }
    // 封闭路径
    context.lineTo(this.options.width, this.options.height)
    context.lineTo(0, this.options.height)
    // context.lineTo(points[0][0], points[0][1])
    context.fillStyle = color
    context.fill()
    context.restore()
  }

  // 画圆
  drawCircle () {
    const context = this.context
    context.beginPath()
    context.strokeStyle = this.options.lineColor
    context.arc(this.center, this.center, this.radius + this.options.wrapWidth, 0, 2 * Math.PI, false)
    context.stroke()
    // 裁切正弦波浪
    context.beginPath()
    context.arc(this.center, this.center, this.radius, 0, 2 * Math.PI, false)
    context.clip()
  }
}

export default WaterPolo
