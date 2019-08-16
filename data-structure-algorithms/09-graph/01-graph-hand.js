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
    console.log(vertexes)
    adjList.get(v).push(w)
    adjList.get(w).push(v) // 无向的
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

}

export default Graph