import { ElLink } from 'element-plus'
import type { App } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SetDataType,
} from '~/index'
import {
  isProperty,
  powerfulTableComponentProp,
} from '~/powerful-table/src/powerful-table-data'

const Link = defineComponent({
  name: 'PTLink',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props) {
    const data = props.prop.data as SetDataType<'href'>

    return () => (
      <>
        <ElLink
          type={'primary'}
          underline={false}
          href={props.row[props.prop.prop]}
          style={data?.style || {}}
          {...{
            target: data?.target || '_blank',
            ...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              data?.property
            ),
          }}
        >
          {typeof data?.text == 'function' ? data?.text(props.row) : data?.text}
        </ElLink>
      </>
    )
  },
})

Link.install = (app: App) => {
  app.component(Link.name!, Link)
}
export const PTLink = Link as SFCWithInstall<typeof Link>
export default Link
