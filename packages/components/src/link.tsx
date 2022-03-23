import { defineComponent, PropType, inject, App } from "vue";
import type { PowerfulTableHeaderProps, HrefDataType, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

const Link = defineComponent({
  name: 'PTLink',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, HrefDataType>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>

          <el-link
            size={size}
            target={props.prop.data?.target || '_blank'}
            type={'primary'}
            underline={props.prop.data?.underline || false}
            href={props.row[props.prop.prop]}
            style={props.prop.data?.style || {}}
          >
            { typeof props.prop.data?.text == 'function' ? props.prop.data?.text(props.row) : props.prop.data?.text}
          </el-link>
        </div>
      </>
    )
  }
})

Link.install = (app: App) => {
  app.component(Link.name, Link);
}
export const PTLink = Link as SFCWithInstall<typeof Link>
export default Link