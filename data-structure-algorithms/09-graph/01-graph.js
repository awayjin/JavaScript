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

  // 初如化所有顶多颜色为白色--未访问过
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

  // bfs 宽度优先搜索--最短路径
  this.BFS = (v) => {
    let color = initializeColor()
    let queue = new Queue()
    queue.enqueue(v)

    let d =[] // 从v到u的距离d[u]
    let pred = [] // 前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径
    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u) // 邻接表
      color[u] = 'grey'

      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey' // 访问未探索过

          d[w] = d[u] + 1
          pred[w] = u

          queue.enqueue(w)
        }
      }

      color[u] = 'black' // 完全探索过
      // if (callback) {
      //   callback(u)
      // }
    }

    return {
      distance: d,
      predecessors: pred
    }

  }

}

export default Graph