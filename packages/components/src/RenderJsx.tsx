import { defineComponent, PropType, h, inject, App } from "vue";
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

const RenderJsx = defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          { props.prop.render?.(h, props.row, props.index as number) }
        </div>
      </>
    )
  }
})

RenderJsx.install = (app: App) => {
  app.component(RenderJsx.name, RenderJsx);
}
export const PTRenderJsx = RenderJsx as SFCWithInstall<typeof RenderJsx>
export default RenderJsx