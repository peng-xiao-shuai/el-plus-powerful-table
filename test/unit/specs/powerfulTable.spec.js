import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import powerfulTable from '@/powerfulTable/powerful-table.vue'
import { header, lists } from "../__mocks__/indexData"
import Vue from 'vue'
const localVue = createLocalVue()
import ElementPlus from 'element-plus'
localVue.use(ElementPlus)

describe('测试powerfulTable', () => {
  it('测试mount', () => {
    const wrapper = mount(powerfulTable, {
      // stubs: {
      //   transition: false
      // },
      localVue,
      propsData: {
        total: 1,
        header: header,
        list: lists,
        isSelect: ['id', 'a'],
        operateData: {
          value: "",
          size: "small",
          operates: [
            {
              label: "删除",
              value: 0,
            },
          ],
        }
      }
    })
    console.log('有无节点', wrapper.find('.el-switch__core').length)
    expect(true).toBe(true)
  })
  it('测试shallowMount', () => {
    const wrapper = shallowMount(powerfulTable)
    console.log('有无节点', wrapper.find('.el-switch__core').length)
    expect(wrapper.find('.el-switch__core').length).toBe(true)
  })
})