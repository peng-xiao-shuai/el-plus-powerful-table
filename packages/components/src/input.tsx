import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

const Input = defineComponent({
  name: 'PTInput',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'input'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'input'
    )

    return () => (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: justifyFun(props.aligning),
          }}
        >
          <span style={{ marginRight: props.prop.text ? '10px' : '0px' }}>
            {props.prop.text || ''}
          </span>
          <el-input
            v-slots={{
              [props.prop.data?.slot as string]: () => (
                <span style={{ padding: '0 10px' }}>
                  {props.prop.data?.symbol}
                </span>
              ),
            }}
            rows={3}
            style={props.prop.data?.style || {}}
            size={size}
            v-model={props.row[props.prop.prop]}
            onClick={(event: Event) => {
              event.stopPropagation()
              REmit('click', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                event,
              })
            }}
            onBlur={(...arg: any) => REmit('blur', ...arg)}
            onFocus={(...arg: any) => REmit('focus', ...arg)}
            onChange={(...arg: any) => REmit('change', ...arg)}
            onInput={(...arg: any) => REmit('input', ...arg)}
            onClear={(...arg: any) => REmit('clear', ...arg)}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            )}
          ></el-input>
        </div>
      </>
    )
  },
})

Input.install = (app: App) => {
  app.component(Input.name, Input)
}
export const PTInput = Input as SFCWithInstall<typeof Input>
export default Input
