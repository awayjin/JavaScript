import { quickSort } from './sort.js'

// 二分搜索
function binarySearch (array, value) {
  let sort = quickSort(array)
  console.log('sort:', sort)
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    let elementMid = array[mid]
    console.log('mid:', mid)
    console.log('elementMid:', elementMid)
    if (elementMid < value) {
      low = mid + 1
    } else if (elementMid > value) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

export default binarySearch