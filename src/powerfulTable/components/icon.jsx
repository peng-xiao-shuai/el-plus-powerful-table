import { defineComponent, PropType, computed, inject } from "vue";
import { filterFun } from './filter'

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

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        <i
          class={ 
            props.row[props.prop.prop] ?
            (
              [
                props.row[props.prop.prop],
                (props.prop.data && props.prop.data.class) && typeof (props.prop.data && props.prop.data.class) === 'string' ?
                (props.prop.data && props.prop.data.class) : ((props.prop.data && props.prop.data.class)).join(',')
              ]
            )
            :
            ['']
          }
          style={(props.prop.data && props.prop.data.style) || {}}
        ></i>
      </div>
    )
  }
})