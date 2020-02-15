function ide(arg: number): number {
  return arg
}

function ide2(arg: any): any {
  return arg + '5'
}

ide2(5)

// 需要一种方法使返回值的类型与传入参数的类型是相同的
// 我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
function ide3<T>(arg: T): T {
  return arg
}
ide3(4)
ide3('5')
ide3(new Array())

// 定义了泛型函数后，可以用两种方法使用
// 明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()
ide3<string>('my')