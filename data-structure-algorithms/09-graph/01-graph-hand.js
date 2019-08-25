import Dictionary from '../07-dictionary/01-dictionary.js'
import Queue from '../04-queue/01-queue.js'

function Graph () {
  let vertexes = []
  let adjList = new Dictionary()

  // add vertex
  this.addVertex = (v) => {
    vertexes.push(v)
    adjList.set(v, [])
  }

  // add edge
  this.addEdge = (v, w) => {
    // console.log(vertexes)
    adjList.get(v).push(w)
    // adjList.get(w).push(v) // 无向的
  }

  // toString
  this.toString = () => {
    let s = ''
    for (let i = 0; i < vertexes.length; i++) {
      s += vertexes[i] + ' => '
      let neighbours = adjList.get(vertexes[i])
      for (let j = 0; j < neighbours.length; j++) {
        s += neighbours[j] + ' '
      }
      s += '\n'
    }
    return s
  }

  // 初始化顶点全标为白色-没发现的
  let initColors = () => {
    let colors = []
    for (let i = 0; i < vertexes.length; i++) {
      colors[vertexes[i]] = 'white'
    }
    return colors
  }

  // 图的遍历\Graph Traversal -- bfs(breadth-first search)
  // 广度优先搜素 - bfs
  this.bfs = (v, callback) => {
    let color = initColors()
    let queue = new Queue()
    queue.enqueue(v)

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbours = adjList.get(u)

      color[u] = 'gray'
      for (let i = 0; i < neighbours.length; i++) {
        let w = neighbours[i]
        if (color[w] === 'white') {
          color[w] = 'gray'
          queue.enqueue(w)
        }
      }
      color[u] = 'black'

      if (callback) {
        callback(u)
      }

    }
  }

  // 图的遍历\Graph Traversal -- BFS(breadth-first search)
  // 广度优先搜素 - BFS改进版
  // 增加源顶点 v 到 u 的距离 d[u]
  // 增加前溯点 v 到 别的顶点 u 最短路径 pred[u]
  this.BFS = (v) => {
    let color = initColors()
    let queue = new Queue()
    queue.enqueue(v)

    let d = [] // 距离
    let pred = [] // 前溯点

    // 初始化距离和前溯点
    for (let i = 0; i < vertexes.length; i++) {
      d[vertexes[i]] = 0
      pred[vertexes[i]] = null
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbours = adjList.get(u)

      color[u] = 'gray'
      for (let i = 0; i < neighbours.length; i++) {
        let w = neighbours[i]
        if (color[w] === 'white') {
          color[w] = 'gray'

          // d[u] + 1 来设置 v 和 w 之间的距离
          d[w] = d[u] + 1
          // 发现顶点 u 的领点 w 时，设置 w 的前溯点为 u
          pred[w] = u

          queue.enqueue(w)
        }
      }
      color[u] = 'black'


    }

    return {
      distance: d,
      predecessors: pred
    }
  }

  // dfs-深度优先搜索
  this.dfs = (callback) => {
    let color = initColors() // [A: "white", B: "white", C: "white", D: "white", E: "white", …]
    // console.log('color:', color)
    for (let i = 0; i < vertexes.length; i++) {
      if (color[vertexes[i]] === 'white') {
        console.log('vertices[i]:', vertexes[i]) // only once
        dfsVisit(vertexes[i], color, callback)
      }
    }
  }

  let dfsVisit = (u, color, callback) => {
    color[u] = 'grey'
    if (callback) {
      callback(u)
    }

    let neighbors = adjList.get(u)
    // console.log('neighbors:', neighbors)
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      // console.log('w---', w)
      if (color[w] === 'white') {
        dfsVisit(w, color, callback) // 递归
      }
    }
    // color[u] = 'black'
  }

  // 深度优先搜索-改进版--DFS
  // depth-first search
  let time = 0
  this.DFS = () => {
    let color = []
    let d = [] // 顶点发现时间
    let pred = [] // 前溯点
    let f = [] // 完成探索时间

    for (let i = 0; i < vertexes.length; i++) {
      color[vertexes[i]] = 'white'
      d[vertexes[i]] = 0
      f[vertexes[i]] = 0
      pred[vertexes[i]] = null
    }

    for (let i = 0; i < vertexes.length; i++) {
      if (color[vertexes[i]] === 'white') {
        DFSVisitor(vertexes[i], color, d, f, pred)
      }
    }

    return {
      distance: d,
      predecessors: pred,
      finished: f
    }
  }

  function DFSVisitor (u, color, d, f, pred) {
    console.log('discovered:', u)
    d[u] = ++time
    color[u] = 'grey'
    let neighbours = adjList.get(u)
    for (let i = 0; i < neighbours.length; i++) {
      let w = neighbours[i]
      if (color[w] === 'white') {
        pred[w] = u
        DFSVisitor(w, color, d, f, pred)
      }
    }
    vertexes[u] = 'black'
    f[u] = ++time
    console.log('explored:', u)
  }

}

export default Graph