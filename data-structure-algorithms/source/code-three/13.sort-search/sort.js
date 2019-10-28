
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
      console.log('i:', i, ', j:', j, ', array:', array)
    }
  }
  return array
}

export {
  bubbleSort,
  selectionSort
}