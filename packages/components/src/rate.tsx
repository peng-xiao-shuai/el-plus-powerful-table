import { defineComponent, inject } from 'vue'
import { ElRate } from 'element-plus'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { SizeSymbol } from '~/keys'

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
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'rate',
      {
        row: props.row,
        index: props.index,
        props: props.prop,
      }
    )

    return () => (
      <>
        <ElRate
          size={size}
          v-model={props.row[props.prop.prop]}
          disabled={true}
          style={props.prop.data?.style || {}}
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

Rate.install = (app: App) => {
  app.component(Rate.name, Rate)
}
export const PTRate = Rate as SFCWithInstall<typeof Rate>
export default Rate
