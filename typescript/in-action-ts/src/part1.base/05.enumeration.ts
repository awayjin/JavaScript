console.log(
  Array(20).join('-'),
  '05-enumeration',
  Array(20).join('-')
)

// 枚举主要用来定义一些常量，比如请求URL、文本提示信息等等，
// 这样方便记忆，减少硬编码，增加可读性。
/*
// const.ts
export enum URL {
  GET_CITY = "/api/getCity"
}

// app.ts
import { URL } from "./const"
axios.get(URL.GET_CITY).then(function(resp) {
  // render city select
}
*/

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


// 异构枚举 - 字符串枚举和数字枚举混用
enum Answer {
  n = 1,
  Y = 'yes'
}

// 枚举成员 - 只读属性
// Role.Developer = 3 //
enum Char {
  a,
  // computed
  d = Math.random()
}

// 常量枚举
const enum Month {
  Jan,
  Feb
}

// 枚举类型
enum E {a, b}
enum F {a = 2, b = 3}

let e: E = 33
let f: F = 44