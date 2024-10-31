/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:41:45
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 11:36:23
 * @Description:
 */
import type { App } from 'vue'
import type {
  PowerfulTableFilter,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '~/index'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'

export const filterFun = (
  s: string | number,
  filter: PowerfulTableFilter[]
) => {
  const current = filter.find((item) => item.key == s)
  return current ? current.value : s
}

const Filter = defineComponent({
  name: 'PTFilter',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'text'>>,
      default: () => ({}),
    },
  },
  emits: ['component-emit'],
  setup(props, { emit }) {
    const { REmit, event } = useREmit<'text'>(emit, 'filter', {
      row: props.row,
      index: props.index!,
      props: props.prop,
    })

    return () => (
      <>
        <div
          onClick={(evt: Event) => {
            evt.stopPropagation()
            REmit('click', {
              evt,
            })
            event('click', evt)
          }}
        >
          {typeof props.prop.filters == 'function'
            ? props.prop.filters(props.row, props.index)
            : filterFun(props.row[props.prop.prop], props.prop.filters!)}
        </div>
      </>
    )
  },
})
Filter.install = (app: App) => {
  app.component(Filter.name!, Filter)
}
export const PTFilter = Filter as SFCWithInstall<typeof Filter>
export default Filter
