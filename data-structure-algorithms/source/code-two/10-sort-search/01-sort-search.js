function ArrayList () {
  let array = []

  this.insert = (item) => {
    array.push(item)
  }

  this.toString = () => {
    return array.join()
  }

  // 插入排序
  this.insertionSort = () => {
    let length = array.length
    let j, temp

    for (let i = 1; i < length; i++) {
      j = i // 用i的值来初始化一个辅助变量
      temp = array[i] // 将其值亦存储于一临时变量中

      // 数组中 前面的值 比 待比较 的值大
      while (j > 0 && array[j - 1] > temp) {
        // 把这个值移到当前位置上
        array[j] = array[j - 1]
        // 并减小j
        j--
      }

      array[j] = temp

    }

  }

}

export default ArrayList