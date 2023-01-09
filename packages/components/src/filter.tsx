import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableFilter,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '../../../typings'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { LangKey, t } from '~/locale/lang'
import { JustifyFunSymbol } from '~/keys'

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
    const justifyFun = inject(JustifyFunSymbol)!
    const { REmit } = useREmit(emit, 'filter')

    return () => (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: justifyFun(props.aligning),
          }}
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
          {props.row[props.prop.prop] !== undefined ? (
            <>
              <span style={{ marginRight: props.prop.text ? '10px' : '0px' }}>
                {props.prop.text || ''}
              </span>
              <div>
                {typeof props.prop.filters == 'function'
                  ? props.prop.filters(props.row, props.index)
                  : filterFun(props.row[props.prop.prop], props.prop.filters!)}
              </div>
            </>
          ) : (
            <div>
              {props.prop.reserve ? (
                <div v-html={props.prop.reserve}></div>
              ) : (
                <b>{t(LangKey.NoData)}</b>
              )}
            </div>
          )}
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
