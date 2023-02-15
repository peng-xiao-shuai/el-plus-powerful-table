import { defineComponent } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableFilter,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '@/index'
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
    const { REmit } = useREmit(emit, 'filter')

    return () => (
      <>
        <div
          onClick={(event: Event) => {
            event.stopPropagation()
            REmit('click', {
              row: props.row,
              index: props.index,
              prop: props.prop.prop,
              event,
            })
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
  app.component(Filter.name, Filter)
}
export const PTFilter = Filter as SFCWithInstall<typeof Filter>
export default Filter
