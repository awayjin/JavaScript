import { mount } from '@vue/test-utils'
import Component from '@/utils/counter'

// 挂载组件，得到包裹器
const wrapper = mount(Component)

// 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
const vm = wrapper.vm

// console.log('wrapper:', wrapper)
// console.log('vm:', vm)

describe('counter.js', () => {
  it('渲染是否正确', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  it('has a button. 检查已存在的元素', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('模拟用户交互', () => {
    expect(wrapper.vm.count).toBe(0)
    const btn = wrapper.find('button')
    btn.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })

  // it('计数 count++', () => {
  //   // let count = vm.count++ // 后置自增，会在递增前返回数值
  //   let count = ++vm.count // 递增后返回数值
  //   expect(count).toBe(1)
  // })
})
