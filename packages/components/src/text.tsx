import { defineComponent, inject, ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'
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
  emits: ['return-emit'],
  setup(props) {
    const justifyFun = inject(JustifyFunSymbol)!
    const develop = ref(Array.from({ length: props.listLength }).fill(false))
    return () => (
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
        <div class={{ content: develop.value[props.index || 0] }}>
          {/* <!-- 主体内容 --> */}
          <div
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
            {props.prop.data &&
            typeof props.prop.data.customFilterFun == 'function'
              ? props.prop.data.customFilterFun(props.row, props.index)
              : props.row[props.prop.prop]}
          </div>

          {/* <!-- 展开全文或收起 --> */}
          <div
            v-show={props.prop.data && props.prop.data.develop}
            class="develop"
            onClick={(e: Event) => {
              e.stopPropagation()
              develop.value[props.index || 0] = !develop.value[props.index || 0]
            }}
          >
            <span
              style={{
                position: develop.value[props.index || 0]
                  ? 'absolute'
                  : 'static',
              }}
            >
              {develop.value[props.index || 0]
                ? t(LangKey.PackUp)
                : t(LangKey.ReadFullText)}
              <el-icon>
                {develop.value[props.index || 0] ? <ArrowUp /> : <ArrowDown />}
              </el-icon>
            </span>
          </div>
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
