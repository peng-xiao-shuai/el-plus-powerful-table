// import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
// import powerfulTable from '@/powerfulTable/powerful-table.vue'
// import Vue from 'vue'
// const localVue = createLocalVue()
// import ElementPlus from 'element-plus'
// localVue.use(ElementPlus)

// describe('测试powerfulTable', () => {
//   it('测试mount', () => {
//     const wrapper = mount(powerfulTable)
//     // console.log('有无节点', wrapper.find('.el-switch__core').length)
//     expect(true).toBe(true)
//   })
//   // it('测试shallowMount', () => {
//   //   const wrapper = shallowMount(powerfulTable)
//   //   console.log('有无节点', wrapper.find('.el-switch__core').length)
//   //   expect(wrapper.find('.el-switch__core').length).toBe(true)
//   // })
// })

import { shallowMount } from "@vue/test-utils"
import HelloWorld from "@/HelloWorld.vue"

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message"
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
