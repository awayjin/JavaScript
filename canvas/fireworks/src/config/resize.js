/**
 * Created by jinw01 on 2018/3/13.
 */

function resize (width, height, canvas) {
  // 用户代理检测
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    const body = document.querySelector('body')
    body.style.width = width + 'px'
    body.style.height = height + 'px'
  }

  // 设置各画布的宽高
  canvas.forEach(canvas => {
    let el = document.querySelector(`#${canvas}`)
    el.width = width
    el.height = height
  })
}

export default resize
