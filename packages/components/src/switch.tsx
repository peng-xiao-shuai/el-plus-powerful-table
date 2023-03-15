import { defineComponent, inject } from 'vue'
import { ElSwitch } from 'element-plus'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { SizeSymbol } from '~/keys'

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
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'switch',
      {
        row: props.row,
        index: props.index,
        props: props.prop,
      }
    )

    return () => (
      <>
        <ElSwitch
          size={size}
          style={props.prop.data?.style || {}}
          v-model={props.row[props.prop.prop]}
          active-value={'1'}
          inactive-value={'0'}
          onChange={(...arg: any) => REmit('change', ...arg)}
          {...isProperty(
            { row: props.row, index: props.index!, props: props.prop },
            props.prop.data?.property
          )}
        />
      </>
    )
  },
})

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}
export const PTSwitch = Switch as SFCWithInstall<typeof Switch>
export default Switch
