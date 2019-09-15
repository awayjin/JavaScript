
import Graph from './01-graph-hand'

const graph = new Graph()


describe('09-graph/01-graph.js', () => {
  let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

  test('添加 A -> I,9个顶点, 添加边，然后打印出来', () => {
    // 添加所有的顶点
    arr.map(item => graph.addVertex(item))

    // 给 A 添加3条边 B C D
    graph.addEdge('A', 'B')
    graph.addEdge('A', 'C')
    graph.addEdge('A', 'D')

    // console.log('graph.toString()::', graph.toString())
    // 打印 A => B C D
    // expect(graph.toString()).toBe('A => B C D')
  })

  test('Graph Traversal bfs method', () => {
    let printNode = (v) => {
      if (arr.includes(v) == 'A') {
        expect(v).toBe('A')
      }
      console.log(v)
    }

    // 从顶点 A 开始遍历
    graph.bfs(arr[0], printNode)

  })
})
