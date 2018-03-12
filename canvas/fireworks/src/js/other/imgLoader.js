/**
 * Created by jinwei on 2018/3/11.
 */
// 读取图片
class ImgLoader {
  // 读取单个图片---静态方法，不能被继承，直接读取，不是通过实例来调用
  static loadImg (url, key) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        resolve({key, img})
      }
      img.onerror = reject
      img.src = url
    })
  }
  // 读取图片数组
  static load (imgs) {
    const promises = []
    for (let key in imgs) {
      promises.push(this.loadImg(imgs[key], key))
    }
    // 异步编程
    return Promise.all(promises)
  }
}

export default ImgLoader
