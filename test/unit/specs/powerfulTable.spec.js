import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
const localVue = createLocalVue()
import ElementUI from 'element-ui'
localVue.use(ElementUI)

import powerfulTable from '@/powerfulTable/powerful-table.vue'

describe('powerfulTable.vue', () => {
  it('是否有节点', () => {
    const wrapper = mount(powerfulTable)
    console.log(wrapper.findAll('.content').length)
    expect(wrapper.findAll('.content').length).toBe(1)
  })
})