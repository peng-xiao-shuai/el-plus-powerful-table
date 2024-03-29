import { ElIcon } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { App } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { LangKey, t } from '~/locale/lang'

const Text = defineComponent({
  name: 'PTText',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'text'>>,
      default: () => ({}),
    },
    listLength: {
      type: Number,
      default: 0,
    },
  },
  emits: ['component-emit'],
  setup(props, { emit }) {
    const { REmit, event } = useREmit<'text'>(emit, 'text', {
      row: props.row,
      index: props.index!,
      props: props.prop,
    })
    const develop = ref(Array.from({ length: props.listLength }).fill(false))
    return () => (
      <div class={{ content: develop.value[props.index || 0] }}>
        {/* <!-- 主体内容 --> */}
        <div
          onClick={(evt: Event) => {
            evt.stopPropagation()
            REmit('click', {
              row: props.row,
              index: props.index,
              prop: props.prop.prop,
              evt,
            })
            event('click', evt)
          }}
          style={
            props.prop.data && props.prop.data.develop
              ? {
                  display: '-webkit-box',
                  overflow: 'hidden',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': develop.value[props.index || 0]
                    ? 99999
                    : (props.prop.data && props.prop.data.line) || 3,
                }
              : {}
          }
        >
          {props.prop.data && typeof props.prop.data.formatting == 'function'
            ? props.prop.data.formatting({
                row: props.row,
                index: props.index,
                props: props.prop,
              })
            : props.row[props.prop.prop]}
        </div>

        {/* <!-- 展开全文或收起 --> */}
        <div
          v-show={props.prop.data && props.prop.data.develop}
          class="develop"
          onClick={(event: Event) => {
            event.stopPropagation()
            develop.value[props.index || 0] = !develop.value[props.index || 0]
          }}
        >
          <span
            style={{
              position: develop.value[props.index || 0] ? 'absolute' : 'static',
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
            }}
          >
            {develop.value[props.index || 0]
              ? t(LangKey.PackUp)
              : t(LangKey.ReadFullText)}
            <ElIcon>
              {develop.value[props.index || 0] ? <ArrowUp /> : <ArrowDown />}
            </ElIcon>
          </span>
        </div>
      </div>
    )
  },
})

Text.install = (app: App) => {
  app.component(Text.name, Text)
}
export const PTText = Text as SFCWithInstall<typeof Text>
export default Text
