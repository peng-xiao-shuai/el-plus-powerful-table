import { defineComponent, PropType, inject, App } from "vue";
import type { PowerfulTableHeaderProps, InputDataType, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'

const Input = defineComponent({
  name: 'PTInput',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, InputDataType>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          <el-input
            v-slots={
              {
                [props.prop.data?.slot as string]: () => <span style={{padding: '0 10px'}}> {props.prop.data?.symbol} </span>
              }
            }
            type={props.prop.data?.type || 'text'}
            rows={props.prop.data?.rows || 3}
            style={props.prop.data?.style || {}}
            size={size || 'small'}
            placeholder={props.prop.data?.placeholder || ''}
            v-model={props.row[props.prop.prop]}
            disabled={props.prop.data?.disabled || false}
            onClick={(e: Event) => e.stopPropagation()}
            {...props.prop.data?.componentProp}
          >
          </el-input>
        </div>
      </>
    )
  }
})

Input.install = (app: App) => {
  app.component(Input.name, Input);
}
export const PTInput = Input as SFCWithInstall<typeof Input>
export default Input