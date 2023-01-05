import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  ImageDataType,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

const Image = defineComponent({
  name: 'PTImage',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, ImageDataType>>,
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
          <el-image
            src={props.row[props.prop.prop]}
            preview-src-list={
              props.prop.data?.preview === false
                ? []
                : [props.row[props.prop.prop]]
            }
            lazy={props.prop.data?.lazy === false ? false : true}
            z-index={props.prop.data?.zIndex}
            style={props.prop.data?.style || {}}
            fit={props.prop.data?.fit || 'cover'}
            preview-teleported={true}
            onClick={(e: Event) => e.stopPropagation()}
            {...props.prop.data?.property}
          />
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
