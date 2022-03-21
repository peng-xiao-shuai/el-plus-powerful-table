import { defineComponent, PropType, inject } from "vue";
import type { PowerfulTableHeaderProps, IconFontDataType } from 'typings/powerful-table'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

export default defineComponent({
  name: 'PTIcon',
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