import { ElLink } from 'element-plus'
import type { App } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
} from '~/powerful-table/src/powerful-table-data'

const Link = defineComponent({
  name: 'PTLink',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'href'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props) {
    return () => (
      <>
        <ElLink
          type={'primary'}
          underline={false}
          href={props.row[props.prop.prop]}
          style={props.prop.data?.style || {}}
          {...{
            target: props.prop.data?.target || '_blank',
            ...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            ),
          }}
        >
          {typeof props.prop.data?.text == 'function'
            ? props.prop.data?.text(props.row)
            : props.prop.data?.text}
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
