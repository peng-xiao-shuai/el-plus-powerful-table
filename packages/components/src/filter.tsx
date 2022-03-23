import { defineComponent, PropType, App } from "vue";
import type { PowerfulTableHeaderProps, TextDataType, PowerfulTableFilter, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

export const filterFun = (s: string | number, filter: PowerfulTableFilter[]) => {
  const current = filter.find((item) => item.key == s)
  return current ? current.value : s
}

const Filter = defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, TextDataType>>,
      default: () => {}
    }
  },
  setup(props) {
    return () => (
      <>
        {props.row[props.prop.prop] !== 'undefined' ?
        <div>
          { props.prop.text || ""
          }{
            typeof props.prop.filter == 'function' ?
            props.prop.filter(props.row, props.index)
            :
            filterFun(props.row[props.prop.prop], props.prop.filter as PowerfulTableFilter[])
          }
        </div>
        :
        <div> { props.prop.reserve ? <div v-html={props.prop.reserve}></div> : <b>暂无数据</b> } </div>
        }
      </>
    )
  }
})
Filter.install = (app: App) => {
  app.component(Filter.name, Filter);
}
export const PTFilter = Filter as SFCWithInstall<typeof Filter>
export default Filter