import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableHeaderProps,
  RateDataType,
  SFCWithInstall,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

const Rate = defineComponent({
  name: 'PTRate',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, RateDataType>>,
      default: () => ({}),
    },
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
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

          <el-rate
            size={size}
            v-model={props.row[props.prop.prop]}
            colors={
              props.prop.data?.colors || ['#F7BA2A', '#F7BA2A', '#F7BA2A']
            }
            max={props.prop.data?.max || 5}
            disabled={true}
            style={props.prop.data?.style || {}}
            allow-half={props.prop.data?.allowHalf || false}
            icon-classes={
              props.prop.data?.iconClass || [
                'el-icon-star-on',
                'el-icon-star-on',
                'el-icon-star-on',
              ]
            }
            show-text={props.prop.data?.showText || false}
            show-score={props.prop.data?.showScore || false}
            texts={props.prop.data?.texts || undefined}
            {...props.prop.data?.property}
          />
        </div>
      </>
    )
  },
})

Rate.install = (app: App) => {
  app.component(Rate.name, Rate)
}
export const PTRate = Rate as SFCWithInstall<typeof Rate>
export default Rate
