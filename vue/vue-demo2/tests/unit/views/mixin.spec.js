// https://blog.csdn.net/duola8789/article/details/80434962
// 官方文档: https://vue-test-utils.vuejs.org/zh/guides/testing-single-file-components-with-jest.html

// 导入 Vue.js 和组件，进行测试
// import Vue from 'vue'
import { mount } from '@vue/test-utils'
import mixin from '@/views/mixin.vue'
// import mixin from '@/components/HelloWorld.vue'


describe('mixin.vue', () => {
  // test('是一个 Vue 实例', () => {
  //   // mount方法来挂载组件
  //   const wrapper = mount(mixin)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })
  // 现在挂载组件，便得到了这个包裹器
  const wrapper = mount(mixin)
  it('renders the correct markup', () => {
    // expect(wrapper.html()).toContain('<pre></pre>')
    expect(wrapper.html()).toContain('<span class="count">1</span>')
  })
})
