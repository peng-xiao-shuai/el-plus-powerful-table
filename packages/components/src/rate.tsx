import { defineComponent, PropType, inject, App } from "vue";
import type { PowerfulTableHeaderProps, RateDataType, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

const Rate = defineComponent({
  name: 'PTRate',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, RateDataType>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string
    const locale = ((inject('locale') as {name: string}) || {name: 'en'}).name

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>

          <el-rate
            size={size}
            v-model={props.row[props.prop.prop]}
            colors={props.prop.data?.colors || ['#F7BA2A', '#F7BA2A', '#F7BA2A']}
            max={props.prop.data?.max || 5}
            disabled={true}
            style={props.prop.data?.style || {}}
            allow-half={props.prop.data?.allowHalf || false}
            icon-classes={props.prop.data?.iconClass || ['el-icon-star-on','el-icon-star-on','el-icon-star-on']}
            show-text={props.prop.data?.showText || false}
            show-score={props.prop.data?.showScore || false}
            texts={props.prop.data?.texts || (locale == 'zh-cn' ? ['极差', '失望', '一般', '满意', '惊喜'] : props.prop.data?.texts)}
            {...props.prop.data?.componentProp}
          />
        </div>
      </>
    )
  }
})

Rate.install = (app: App) => {
  app.component(Rate.name, Rate);
}
export const PTRate = Rate as SFCWithInstall<typeof Rate>
export default Rate