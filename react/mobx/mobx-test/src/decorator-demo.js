class Numberic {
  PI = 3.14;
  add (...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}

