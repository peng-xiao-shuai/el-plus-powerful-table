import { defineComponent, PropType, inject } from "vue";
import type { PowerfulTableHeaderProps, ImageDataType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'

export default defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, ImageDataType>>,
      default: () => {}
    }
  },
  setup(props) {
    const justifyFun = inject('justifyFun') as Function
    
    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          {props.row[props.prop.prop] !== 'undefined' ?
            <el-image
              src={props.row[props.prop.prop]}
              preview-src-list={props.prop.data?.preview === false ? [] : [props.row[props.prop.prop]]}
              lazy={props.prop.data?.lazy === false ? false : true}
              z-index={props.prop.data?.zIndex || 6000}
              style={props.prop.data?.style || {}}
              fit={props.prop.data?.fit || 'cover'}
              onClick={(e: Event) => e.stopPropagation()}
            />
          :
          <div> { props.prop.reserve ? <div v-html={props.prop.reserve}></div> : <b>暂无数据</b> } </div>
          }
        </div>
      </>
    )
  }
})