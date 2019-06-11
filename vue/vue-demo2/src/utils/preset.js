// 获取 cookie
export function getCookie (cName) {
  let cStart = ''
  let cEnd = ''
  if (document.cookie.length > 0) {
    cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return decodeURIComponent(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

// 设置 cookie
export function setCookie (cName, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + encodeURIComponent(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
}

// 生成随机数
export function randomNumber (num) {
  let number = ''
  for (let i = 0; i < num; i++) {
    number += Math.floor(Math.random() * num)
  }
  return number
}

/* eslint-disable */
export function getSearchString(key) {
  // 获取URL中?之后的字符
  var str = location.search;
  str = str.substring(1, str.length)

  // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
  var arr = str.split('&')
  var obj = new Object()

  // 将每一个数组元素以=分隔并赋给obj对象
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split('=')
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1])
  }
  return obj[key]
}
