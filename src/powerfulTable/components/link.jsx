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
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') 
    const size = inject('size') 

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>

        <el-link
          size={size}
          target={(props.prop.data && props.prop.data.target) || '_blank'}
          type={'primary'}
          underline={(props.prop.data && props.prop.data.underline) || false}
          href={props.row[props.prop.prop]}
          style={(props.prop.data && props.prop.data.style) || {}}
        >
          { typeof (props.prop.data && props.prop.data.text) == 'function' ? (props.prop.data && props.prop.data.text(props.row)) : (props.prop.data && props.prop.data.text)}
        </el-link>
      </div>
    )
  }
})