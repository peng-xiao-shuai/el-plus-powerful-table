import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

const Switch = defineComponent({
  name: 'PTSwitch',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'switch'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'switch'
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
          <el-switch
            size={size}
            style={props.prop.data?.style || {}}
            v-model={props.row[props.prop.prop]}
            active-value={'1'}
            inactive-value={'0'}
            onChange={(...arg: any) => REmit('change', ...arg)}
            onClick={(e: Event) => {
              e.stopPropagation()
            }}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            )}
          />
        </div>
      </>
    )
  },
})

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}
export const PTSwitch = Switch as SFCWithInstall<typeof Switch>
export default Switch
