import { ElImage } from 'element-plus'
import type { App } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SetDataType,
} from '~/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'

const Image = defineComponent({
  name: 'PTImage',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const data = props.prop.data as SetDataType<'image'>

    const { REmit, event } = useREmit<'image'>(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'image',
      {
        row: props.row,
        index: props.index!,
        props: props.prop,
      }
    )

    return () => (
      <>
        <ElImage
          src={props.row[props.prop.prop]}
          preview-src-list={[props.row[props.prop.prop]]}
          lazy={true}
          fit={'cover'}
          preview-teleported={true}
          style={data?.style}
          onLoad={(...arg: any) => {
            REmit('load', ...arg)
            event('load', ...arg)
          }}
          onError={(...arg: any) => {
            REmit('error', ...arg)
            event('error', ...arg)
          }}
          onSwitch={(...arg: any) => {
            REmit('switch', ...arg)
            event('switch', ...arg)
          }}
          onClose={(...arg: any) => {
            REmit('close', ...arg)
            event('close', ...arg)
          }}
          {...isProperty(
            { row: props.row, index: props.index!, props: props.prop },
            data?.property
          )}
        ></ElImage>
      </>
    )
  },
})

Image.install = (app: App) => {
  app.component(Image.name!, Image)
}
export const PTImage = Image as SFCWithInstall<typeof Image>
export default Image
