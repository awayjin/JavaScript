/**
 * Created by jinw01 on 2018/3/14.
 */
import config from '../../config/global'
import util from '../../config/util'

// 微粒类
class Particle {
  constructor ({ x, y, minSize = 5, maxSize = 7.5, size, opacity = 1 } = {}) {
    this.size = size ? size : util.random(minSize, maxSize) // eslint-disable-line
    this.x = x ? x : util.random(0, (config.width - this.size)) // eslint-disable-line
    this.y = y ? y : -this.size // eslint-disable-line
    this.opacity = opacity
  }

  outOfBounds (height = config.height, width = config.width) {
    if (this.x >= -this.size &&
      this.x <= width &&
      this.y <= height &&
      this.y >= -this.size) {
      return false
    } else {
      return true
    }
  }
}

export default Particle
