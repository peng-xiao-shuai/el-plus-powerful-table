import { defineComponent, h } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'

const RenderJsx = defineComponent({
  name: 'PTRenderJsx',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'text'>>,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => <>{props.prop.render?.(h, props.row, props.index as number)}</>
  },
})

const PTRenderJsx = RenderJsx as SFCWithInstall<typeof RenderJsx>
PTRenderJsx.install = (app: App) => {
  app.component(RenderJsx.name, RenderJsx)
}
export { PTRenderJsx }
export default RenderJsx
