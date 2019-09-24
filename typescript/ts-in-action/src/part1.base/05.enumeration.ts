console.log(
  Array(20).join('-'),
  '05-enumeration',
  Array(20).join('-')
)

// 数字枚举
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role)

console.log(Role[0]) // Reporter
console.log(Role['Reporter']) // 0

// 数字枚举
enum Direction {
  up = 11,
  Down,
  Left,
  Right
}

// 字符串枚举
enum Direction2 {
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'up'
}



// 字符串枚举


// 异构枚举

// 枚举成员