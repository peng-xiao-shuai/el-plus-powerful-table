import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

const Rate = defineComponent({
  name: 'PTRate',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'rate'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'rate'
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

          <el-rate
            size={size}
            v-model={props.row[props.prop.prop]}
            disabled={true}
            style={props.prop.data?.style || {}}
            onClick={(event: Event) => {
              event.stopPropagation()
              REmit('click', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                event,
              })
            }}
            onChange={(...arg: any) => REmit('change', ...arg)}
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

Rate.install = (app: App) => {
  app.component(Rate.name, Rate)
}
export const PTRate = Rate as SFCWithInstall<typeof Rate>
export default Rate
