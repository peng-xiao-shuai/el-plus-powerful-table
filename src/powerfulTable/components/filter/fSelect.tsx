import { defineComponent, ref, reactive, watch, inject, PropType } from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
  PowerfulTableFilter
} from "../../../../types/powerful-table";

import { slots, State } from './common';

export default defineComponent({
  props: {
    // 表头的配置数据
    headerData: {
      type: Object as PropType<PowerfulTableHeader<any>>,
      default: () => { },
    },
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

    const state = reactive<State>({
      value: [],
      options: [],
      visible: false
    })

    const selectChange = (val: any) => {
      if (!val.length) val = ''
      emit('headerFilterChange', val, props.headerData)
    }

    watch(
      props.propData,
      (newProps) => {
        // 首先判断是否存在filter属性
        if (newProps.filter) {
          // filter 属性支持 数组和函数 这里在判断是否数组
          if (Array.isArray(newProps.filter)) state.options = newProps.filter
          else {
            console.warn(props.headerData.label, 'The filter attribute of the column must be an array.')
          }
        } else if (props.propData.type === 'switch') {
          const arr: PowerfulTableFilter[] = []
          arr.push({
            value: locale == 'zh-cn' ? '开启' : 'open',
            key: props.propData.data.activeValue || 1,
          }, {
            value: locale == 'zh-cn' ? '关闭' : 'close',
            key: props.propData.data.inactiveValue || 0,
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