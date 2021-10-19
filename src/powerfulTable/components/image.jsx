import { defineComponent, PropType, inject } from "vue";

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
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  setup(props) {
    const justifyFun = inject('justifyFun') 
    
    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        <el-image
          src={props.row[props.prop.prop]}
          preview-src-list={(props.prop.data && props.prop.data.preview) === false ? [] : [props.row[props.prop.prop]]}
          lazy={(props.prop.data && props.prop.data.lazy) === false ? false : true}
          z-index={(props.prop.data && props.prop.data.zIndex) || 6000}
          style={(props.prop.data && props.prop.data.style) || {}}
          fit={(props.prop.data && props.prop.data.fit) || 'cover'}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )
  }
})