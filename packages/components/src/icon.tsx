import type { App } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'

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
                  props.prop.data?.class &&
                    (typeof props.prop.data?.class === 'string'
                      ? props.prop.data?.class
                      : (props.prop.data?.class as string[]).join(',')),
                ]
              : ['']
          }
          style={props.prop.data?.style || {}}
        ></i>
      </>
    )
  },
})

Icon.install = (app: App) => {
  app.component(Icon.name, Icon)
}
export const PTIcon = Icon as SFCWithInstall<typeof Icon>
export default Icon
