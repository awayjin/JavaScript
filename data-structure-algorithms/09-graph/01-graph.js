function Graph () {
  var vertices = [] // 顶点  [ˈvɜːtɪsiːz]
  // 字典将会使用顶点的名字作为键，邻接顶点列表作为值
  var objList = new Dictionary() // 邻接表 adjacency [ə'dʒeɪsənsɪ]

  this.addVertex = function (v) {
    vertices.push(v)
    objList(v, [])
  }
}