import { ElInput } from 'element-plus'
import type { App } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { SizeSymbol } from '~/keys'

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
    const size = inject(SizeSymbol)
    const { REmit, event } = useREmit<'input'>(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'input',
      {
        row: props.row,
        index: props.index!,
        props: props.prop,
      }
    )

    return () => (
      <>
        <ElInput
          v-slots={{
            [props.prop.data?.slot as string]: () => (
              <span style={{ padding: '0 10px' }}>
                {props.prop.data?.symbol}
              </span>
            ),
          }}
          style={props.prop.data?.style || {}}
          size={size}
          v-model={props.row[props.prop.prop]}
          onBlur={(...arg: any) => {
            REmit('blur', ...arg)
            event('blur', ...arg)
          }}
          onFocus={(...arg: any) => {
            REmit('focus', ...arg)
            event('focus', ...arg)
          }}
          onChange={(...arg: any) => {
            REmit('change', ...arg)
            event('change', ...arg)
          }}
          onInput={(...arg: any) => {
            REmit('input', ...arg)
            event('input', ...arg)
          }}
          onClear={(...arg: any) => {
            REmit('clear', ...arg)
            event('clear', ...arg)
          }}
          {...{
            rows: 3,
            ...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            ),
          }}
        ></ElInput>
      </>
    )
  },
})

Input.install = (app: App) => {
  app.component(Input.name, Input)
}
export const PTInput = Input as SFCWithInstall<typeof Input>
export default Input
