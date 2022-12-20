import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  IconFontDataType,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

const Icon = defineComponent({
  name: 'PTIcon',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, IconFontDataType>>,
      default: () => ({}),
    },
  },
  emits: ['returnEmit'],
  setup(props) {
    const justifyFun = inject(JustifyFunSymbol)!

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
