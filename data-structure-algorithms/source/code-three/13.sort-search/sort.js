
// 交换数组中的值
function swap (array, a, b) {
  // 临时变量，交换值
  // let temp
  // temp = array[j]
  // array[j] = array[j + 1]
  // array[j + 1] = temp
  // es6 方式交换
  [array[a], array[b]] = [array[b], array[a]]
}

// 冒泡排序
function bubbleSort (array) {
  let { length } = array
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) { // 内循环减去已跑过的轮数
      if (array[j] > array[j + 1]) {
        // [array[j], array[j + 1]] = [array[j + 1], array[j]]
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

// 选择排序
// 选择排序算法是一种原址比较排序算法。
// 选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，
// 接着找到第二小的值并将其放在第二位，以此类推。
function selectionSort (array) {
  let { length } = array
  let indexMin // 最小值索引
  for (let i = 0; i < length - 1; i++) {
    indexMin = i
    for (let j = i; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
      if (i !== indexMin) {
        // swap(array, i, indexMin)
        [array[i], array[indexMin]] = [array[indexMin], array[i]]
      }
      // [array[i], array[indexMin]] = [array[indexMin], array[i]]
      // console.log('i:', i, ', j:', j, ', array:', array)
    }
  }
  return array
}

// 插入排序
// 如果有一个已经有序的数据序列，
// 要求在这个已经排好的数据序列中插入一个数，但要求插入后此数据序列仍然有序
function insertionSort (array) {
  let { length } = array
  let temp
  for (let i = 1; i < length; i++) {
    let j = i // 存储外循环的临时变量索引
    temp = array[i] // 临时变量, 用来存储外循环的值
    while(j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
    // console.log(array)
  }
  return array
}

// 4. 归并排序
// 归并排序是一种分而治之算法。
// 其思想是将原始数组切分成较小的数组，直到每个小数组只
// 有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
function mergeSort(array) {
  if (array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle))
    const right = mergeSort(array.slice(middle, length))
    array = merge(left, right)
  }
  return array
}
function merge(left, right) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(
      left[i] < right[j] ? left[i++] : right[j++]
    )
  }
  return result.concat(
    i < left.length ? left.slice(i) : right.slice(j)
  )
}

// 5. 快速排序
// (1) 首先，从数组中选择一个值作为主元（pivot），也就是数组中间的那个值。
// (2) 创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值。移
// 动左指针直到我们找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后
// 交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元
// 之前，而比主元大的值都排在主元之后。这一步叫作划分（partition）操作。
// (3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的
// 子数组）重复之前的两个步骤，直至数组已完全排序。
function quickSort(array) {
  return quick(array, 0, array.length - 1)
}
function quick(array, left, right) {
  let index
  if (array.length > 1) {
    index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (index < right) {
      quick(array, index, right )
    }
  }
  return array
}
function partition(array, left, right) {
  const pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]]
      // swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

export {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
}