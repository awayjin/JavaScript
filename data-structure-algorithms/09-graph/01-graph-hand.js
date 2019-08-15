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

  // 图的遍历\Graph Traversal -- BFS(breadth-first search)
  // 广度优先搜素
  this.bfs = (v, callback) => {
    let color = initColors()
    let queue = new Queue()
    queue.enqueue(v)

    console.log(adjList)
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

}

export default Graph