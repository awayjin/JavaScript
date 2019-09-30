// 类型推断 inference
// 类型推断
// 不需要指定变量的类型（函数的返回值类型），Typescript 可以根据某些规则自动为其推断一个类型。
//
// 1.基础类型推断
// 2.最佳通用类型推断
// 3.上下文类型推断
//
// - 前两者都是从右往左的推断，根据值去推断， 例如 let a = 1 // a 被推断的类型是 number
//   - 最佳通用类型推断 例如 let b = [1, 'a'] // b 的最佳通用类型 (string | number)[]
//   - 根据上下类型推断 例如 window.onkeydown = (event) => {} // 推断 event 为 KeyboardEvent
//
// - 当类型推断不符合你的要求的时候，你可以使用类型断言 as，但是类型断言不能乱用，要对自己上下文充分了解


// let a
// let arr = [1, null] as any
//
// let c = (x = 1) => x + 3
//
// window.onkeydown = (event: any) => {
//   console.log(event)
// }

// 类型断言
interface Foo {
  bar: number
}
let foo = {} as Foo
foo.bar = 1 // err
let foo3 = {}

let foo2: Foo = {
  bar: 3
}

// generics 泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，
// 不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// 使用泛型来创建可重用的组件
