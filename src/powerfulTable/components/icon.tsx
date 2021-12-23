import { defineComponent, PropType, computed, inject } from "vue";
import type { PowerfulTableHeaderProps, IconFontDataType, EmitType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'
import { filterFun } from './filter'

export default defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, IconFontDataType>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          <i
            class={ 
              props.row[props.prop.prop] ?
              (
                [
                  props.row[props.prop.prop],
                  props.prop.data?.class && typeof props.prop.data?.class === 'string' ?
                  props.prop.data?.class : (props.prop.data?.class as string[]).join(',')
                ]
              )
              :
              ['']
            }
            style={props.prop.data?.style || {}}
          ></i>
        </div>
      </>
    )
  }
})