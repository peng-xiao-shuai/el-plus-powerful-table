import { defineComponent, reactive, watch, inject, PropType, watchEffect } from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
  PowerfulTableFilter
} from "../../../../types/powerful-table";

import { slots, props } from './common';

export default defineComponent({
  props: {
    ...props,
    // 过滤的配置数据
    propData: {
      type: Object as PropType<PowerfulTableHeaderProps<any>>,
      default: () => { prop: '' },
    }
  },
  emits: ['headerFilterChange'],
  setup(props, { emit }) {
    const size = inject('size') as string
    const locale = (inject('locale') as {name: string})?.name

    const state = reactive<import('./common').State>({
      value: [],
      options: [],
      visible: false
    })

    const selectChange = (val: any) => {
      if (!val.length) val = ''
      emit('headerFilterChange', val, props.headerData)
    }

    watchEffect(() => {
      if (props.list.length && state.value.length) {
        selectChange(state.value)
      }
    })

    watch(
      () => props.propData,
      (newProps) => {
        // 首先判断是否存在filter属性
        if (newProps.filter) {
          // filter 属性支持 数组和函数 这里在判断是否数组
          if (Array.isArray(newProps.filter)) state.options = newProps.filter
          else {
            console.warn(props.headerData.label, 'The filter attribute of the column must be an array.')
          }
        } else if (newProps.type === 'switch') {
          const arr: PowerfulTableFilter[] = []
          arr.push({
            value: locale == 'zh-cn' ? '开启' : 'open',
            key: newProps.data.activeValue || 1,
          }, {
            value: locale == 'zh-cn' ? '关闭' : 'close',
            key: newProps.data.inactiveValue || 0,
          });
          state.options = arr
        }
      },
      { immediate: true, deep: true }
    );
    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        trigger="manual"
        v-slots={slots(state, props.headerData.label)}
      >
        <el-select
          v-model={state.value}
          multiple
          collapse-tags
          clearable
          placeholder="请选择"
          size={size}
          onVisible-change={(val: boolean) => {
            if (!val) state.visible = false
          }}
          onChange={selectChange}
        >
          {state.options?.map((item: any, index: number) => {
            return (
              <el-option
                key={index}
                label={item.value}
                value={item.key}>
              </el-option>
            );
          })}
        </el-select>
      </el-popover>
    );
  },
});