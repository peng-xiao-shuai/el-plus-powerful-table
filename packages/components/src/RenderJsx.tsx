import { defineComponent, h, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

const RenderJsx = defineComponent({
  name: 'PTRenderJsx',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<null>>,
      default: () => ({}),
    },
  },
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
          {props.prop.render?.(h, props.row, props.index as number)}
        </div>
      </>
    )
  },
})

const PTRenderJsx = RenderJsx as SFCWithInstall<typeof RenderJsx>
PTRenderJsx.install = (app: App) => {
  app.component(RenderJsx.name, RenderJsx)
}
export { PTRenderJsx }
export default RenderJsx
