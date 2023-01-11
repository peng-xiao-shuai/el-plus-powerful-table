import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

const Image = defineComponent({
  name: 'PTImage',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'image'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'image'
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
          <el-image
            src={props.row[props.prop.prop]}
            preview-src-list={[props.row[props.prop.prop]]}
            lazy={true}
            fit={'cover'}
            preview-teleported={true}
            style={props.prop.data?.style}
            onClick={(e: Event) => e.stopPropagation()}
            onLoad={(...arg: any) => REmit('load', ...arg)}
            onError={(...arg: any) => REmit('error', ...arg)}
            onSwitch={(...arg: any) => REmit('switch', ...arg)}
            onClose={(...arg: any) => REmit('close', ...arg)}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            )}
          ></el-image>
        </div>
      </>
    )
  },
})

Image.install = (app: App) => {
  app.component(Image.name, Image)
}
export const PTImage = Image as SFCWithInstall<typeof Image>
export default Image
