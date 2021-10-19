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
        <el-input
          v-slots={
            {
              [(props.prop.data && props.prop.data.slot) ]: () => <span style={{padding: '0 10px'}}> {(props.prop.data && props.prop.data.symbol)} </span>
            }
          }
          type={props.prop.type}
          rows={(props.prop.data && props.prop.data.rows) || 3}
          style={(props.prop.data && props.prop.data.style) || {}}
          size={size || 'small'}
          placeholder={(props.prop.data && props.prop.data.placeholder) || ''}
          v-model={props.row[props.prop.prop]}
          disabled={props.prop.data ? (typeof props.prop.data.disabled === 'function' ? props.prop.data.disabled(props.row) : props.prop.data.disabled || false) : false}
          onClick={(e) => e.stopPropagation()}
        >
        </el-input>
      </div>
    )
  }
})