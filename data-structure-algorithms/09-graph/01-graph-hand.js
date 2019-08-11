import Dictionary from '../07-dictionary/01-dictionary.js'
// import Queue from '../04-queue/01-queue.js'

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

}

export default Graph