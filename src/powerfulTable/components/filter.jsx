import { defineComponent, PropType } from "vue";

export const filterFun = (s, filter) => {
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
      type: Object,
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
            filterFun(props.row[props.prop.prop], props.prop.filter)
          }
        </div>
        :
        <div> { props.prop.reserve ? <div v-html={props.prop.reserve}></div> : <b>暂无数据</b> } </div>
        }
      </>
    )
  }
})