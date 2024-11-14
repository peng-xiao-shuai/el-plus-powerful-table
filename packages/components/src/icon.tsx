import type { App } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SetDataType,
} from '~/index'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'

const Icon = defineComponent({
  name: 'PTIcon',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const data = props.prop.data as SetDataType<'iconfont'>

    const { REmit, event } = useREmit<'iconfont'>(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'iconfont',
      {
        row: props.row,
        index: props.index!,
        props: props.prop,
      }
    )

    return () => (
      <>
        <i
          onClick={(evt: Event) => {
            evt.stopPropagation()
            REmit('click', {
              evt,
            })
            event('click', evt)
          }}
          class={
            props.row[props.prop.prop]
              ? [
                  props.row[props.prop.prop],
                  data?.class &&
                    (typeof data?.class === 'string'
                      ? data?.class
                      : (data?.class as string[]).join(',')),
                ]
              : ['']
          }
          style={data?.style || {}}
        ></i>
      </>
    )
  },
})

Icon.install = (app: App) => {
  app.component(Icon.name!, Icon)
}
export const PTIcon = Icon as SFCWithInstall<typeof Icon>
export default Icon
