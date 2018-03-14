/**
 * Created by jinw01 on 2018/3/14.
 */
// 继承微粒类
import Particle from './particle'
import util from '../../config/util'

class Snowflake extends Particle {
  constructor ({ x, y, minSize = 5, maxSize = 7.5, size, speed = 0.5, opacity = 0.8 } = {}) {
    /**
     * super-可作函数调用，也可作对象使用
     * 1.作为函数时，只能在构造函数中，代表调用父类的构造函数
     *  A.prototype.constructor.call(this)
     * 2. 作为对象，普通方法中，指向原型对象
     *  A.prototype.p()
     *  2.2 在静态方法中，指向父类
     */
    super({x, y, minSize, maxSize, size})
    this.opacity = util.random(opacity, 1)
    this.speed = speed * (1 + Math.random())
    this.direction = Math.random() > 0.5 ? 0.5 : -0.5
  }

  fall () {
    this.x += Math.random() * this.direction
    this.y += this.speed
  }
  /**
   * http://www.zhangxinxu.com/study/201210/css3-animate-flip-example.html
   H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
   S：Saturation(饱和度)。取值为：0.0% - 100.0%
   L：Lightness(亮度)。取值为：0.0% - 100.0%
   A：Alpha透明度。取值0~1之间。
   */
  render (context) {
    this.fall()
    if (this.outOfBounds()) return false

    this.g = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    this.g.addColorStop(0, `hsla(255, 255%, 255%, ${this.opacity})`)
    this.g.addColorStop(1, 'hsla(255, 255%, 255%, 0)')

    context.beginPath()
    context.fillStyle = this.g
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    context.fill()
    return true
  }
}

export default Snowflake
