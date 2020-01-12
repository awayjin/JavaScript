import { quickSort } from './sort.js'

// 插值搜索
function interpolation (arr, value) {
  let array = quickSort(arr)
  console.log('array:', array)
  const { length } = array
  let low = 0
  let high = length - 1
  let delta = -1
  let position = -1
  
  while (
    low <= high &&
    value >= array[low] &&
    value <= array[high]
  ) {
    delta = (Number(value) - Number(array[low])) / (Number(array[high]) - Number(array[low]))
    position = low + Math.floor((high - low) * delta)

    if (array[position] === value) {
      return position
    }

    if (array[position] < value) {
      low = position + 1
    } else {
      high = position - 1
    }
  }
  return -1


  // console.log('sort:', sort)
  // let low = 0
  // let high = array.length - 1
  // while (low <= high) {
  //   const mid = Math.floor((low + high) / 2)
  //   let elementMid = array[mid]
  //   console.log('mid:', mid)
  //   console.log('elementMid:', elementMid)
  //   if (elementMid < value) {
  //     low = mid + 1
  //   } else if (elementMid > value) {
  //     high = mid - 1
  //   } else {
  //     return mid
  //   }
  // }
  // return -1
}

export default interpolation