console.log(
  Array(10).join('-'),
  '13-14 泛型',
  Array(10).join('-')
)

function log(value: any) {
  console.log(value)
  return value
}

// 泛型：不预先确定的数据类型，具体的类型在使用时才能确定
// 保证输入参数和返回值是一致的
function log2<T>(value: T) {
  console.log(value)
  return value
}

log2<string[]>(['a', 'b'])
log2<number>(44)
log2(['a', 4])


log(['1a', 'b'])
log(55)
log(['1a', 4])


// 定义一个泛型函数类型
type Log = <T>(value: T) => T
let myLog: Log = log

// 泛型接口
interface log3<T = string> {
  // <T>(value: T): T
  (value: T): T
}

let myLog3: log3<number> = log