import { defineComponent, PropType } from "vue";
import type { PowerfulTableHeaderProps, TextDataType, PowerfulTableFilter } from '../../../types/powerful-table'

export const filterFun = (s: string | number, filter: PowerfulTableFilter[]) => {
  const current = filter.filter((item) => item.key == s)
  return current.length ? current[0].value : s
}

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<TextDataType>>,
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
            (
              props.prop.data?.customFilterFun &&
              (props.prop.data as {customFilterFun: Function}).customFilterFun(props.row, props.index)
            )
            ||
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