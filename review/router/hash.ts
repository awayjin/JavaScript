//ts逻辑
class router {
  //存贮当前路由
  hashStr: String;
  private watch: any;
  constructor(hash: String) {
    //初始化赋值
    this.hashStr = hash;
    //初始化
    this.watchHash();
    //绑定监听改变事件,由于this被换了，必须用bind绑定
    this.watch = this.watchHash.bind(this);
    window.addEventListener("hashchange", this.watch);
  }
  //监听方法
  watchHash() {
    var hashStr: String = window.location.hash.slice(1);
    this.hashStr = hashStr;
    console.log(hashStr);
    if (hashStr) {
      var id = document.getElementById('container')
      if (hashStr == "router-1") {
        id.innerHTML = "11";
      } else if (hashStr == "router-2") {
        id.innerHTML = "22";
      } else {
        id.innerHTML = "33";
      }
    }
  }
}

// new router(location.hash)
window.addEventListener('hashchange', () => {
  var hash = location.hash.slice(1)
  var container = document.querySelector('#container')
  if (hash == "router-1") {
    container.innerHTML = "11";
  } else if (hash == "router-2") {
    container.innerHTML = "22";
  } else {
    container.innerHTML = "default value";
  }
})
if("onhashchange" in window){ //如果浏览器的原生支持该事件
  window.location.hash = "#defalut";
}
