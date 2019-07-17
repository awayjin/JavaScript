import Dictionary from '../07-dictionary/01-dictionary.js'
import Queue from '../04-queue/01-queue.js'

function Graph () {
  var vertices = [] // 顶点  [ˈvɜːtɪsiːz]
  // 字典将会使用顶点的名字作为键，邻接顶点列表作为值
  var adjList = new Dictionary() // 邻接表 adjacency [ə'dʒeɪsənsɪ]

  // 一个用来向图中添加一个新的顶点
  this.addVertex = function (v) {
    vertices.push(v)
    adjList.set(v, [])
  }

  // 添加顶点之间的边
  this.addEdge = function (v, w) {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }

  // print
  this.toString = function () {
    var s = ''
    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + '->'
      var neighbors = adjList.get(vertices[i])
      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' '
      }
      s += '\n'
    }

    return s
  }

  let initializeColor = () => {
    let color = []
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }

  // bfs 宽度优先搜索
  this.bfs = (v, callback) => {
    let color = initializeColor()
    let queue = new Queue()
    queue.enqueue(v)
    
    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u)
      color[u] = 'grey'

      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
        }
      }

      color[u] = 'black'
      if (callback) {
        callback(u)
      }

    }

  }

}

export default Graph