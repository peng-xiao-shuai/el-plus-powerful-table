import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

const Icon = defineComponent({
  name: 'PTIcon',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'iconfont'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'iconfont'
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
          onClick={(event: Event) => {
            event.stopPropagation()
            REmit('click', {
              row: props.row,
              index: props.index,
              prop: props.prop.prop,
              event,
            })
          }}
        >
          <span style={{ marginRight: props.prop.text ? '10px' : '0px' }}>
            {props.prop.text || ''}
          </span>
          <i
            class={
              props.row[props.prop.prop]
                ? [
                    props.row[props.prop.prop],
                    props.prop.data?.class &&
                    typeof props.prop.data?.class === 'string'
                      ? props.prop.data?.class
                      : (props.prop.data?.class as string[]).join(','),
                  ]
                : ['']
            }
            style={props.prop.data?.style || {}}
          ></i>
        </div>
      </>
    )
  },
})

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}
export const PTIcon = Icon as SFCWithInstall<typeof Icon>
export default Icon
