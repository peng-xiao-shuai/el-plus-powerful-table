import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

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
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)

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

          <el-link
            size={size}
            target={props.prop.data?.target || '_blank'}
            type={'primary'}
            underline={false}
            href={props.row[props.prop.prop]}
            style={props.prop.data?.style || {}}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            )}
          >
            {typeof props.prop.data?.text == 'function'
              ? props.prop.data?.text(props.row)
              : props.prop.data?.text}
          </el-link>
        </div>
      </>
    )
  },
})

Link.install = (app: App) => {
  app.component(Link.name, Link)
}
export const PTLink = Link as SFCWithInstall<typeof Link>
export default Link
