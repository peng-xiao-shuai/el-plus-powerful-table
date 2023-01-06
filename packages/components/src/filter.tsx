import { defineComponent } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableFilter,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { LangKey, t } from '~/locale/lang'

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
  setup(props) {
    return () => (
      <>
        {props.row[props.prop.prop] !== undefined ? (
          <div>
            {props.prop.text || ''}
            {typeof props.prop.filters == 'function'
              ? props.prop.filters(props.row, props.index)
              : filterFun(props.row[props.prop.prop], props.prop.filters!)}
          </div>
        ) : (
          <div>
            {props.prop.reserve ? (
              <div v-html={props.prop.reserve}></div>
            ) : (
              <b>{t(LangKey.NoData)}</b>
            )}
          </div>
        )}
      </>
    )
  },
})
Filter.install = (app: App) => {
  app.component(Filter.name, Filter)
}
export const PTFilter = Filter as SFCWithInstall<typeof Filter>
export default Filter
