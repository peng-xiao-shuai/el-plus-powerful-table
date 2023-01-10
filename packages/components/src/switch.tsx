import { defineComponent, getCurrentInstance, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

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
            inactive-text={props.prop.data?.inactiveText || ''}
            active-text={props.prop.data?.activeText || ''}
            v-model={props.row[props.prop.prop]}
            disabled={
              typeof props.prop.data?.disabled === 'function'
                ? props.prop.data?.disabled(props.row)
                : props.prop.data?.disabled || false
            }
            active-color={props.prop.data?.activeColor}
            inactive-color={props.prop.data?.inactiveColor}
            active-value={
              props.prop.data?.activeValue || props.prop.data?.activeValue === 0
                ? props.prop.data?.activeValue
                : 1
            }
            inactive-value={props.prop.data?.inactiveValue || 0}
            before-change={props.prop.data?.beforeFunction}
            onChange={(...arg: any) => REmit('change', ...arg)}
            onClick={(e: Event) => {
              e.stopPropagation()
            }}
            {...props.prop.data?.property}
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
