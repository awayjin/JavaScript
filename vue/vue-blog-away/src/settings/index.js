// 模块重定向
// 如果我们想要在当前模块中，导出指定导入模块的默认导出（等于是创建了一个“重定向”）
export { default } from './a.js'
export * from './a.js'
