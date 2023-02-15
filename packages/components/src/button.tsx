import { defineComponent, inject } from 'vue'
import { JustifyFunSymbol, SizeSymbol } from '../../keys'
import type { App, PropType } from 'vue'
import type {
  BtnDataType,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
} from '~/powerful-table/src/powerful-table-data'
import { LangKey, t } from '~/locale/lang'

const Button = defineComponent({
  name: 'PTButton',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'btn'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)

    const btn = (item: BtnDataType, btnIndex: number[]) => (
      <el-button
        class={item.text ? '' : 'no-margin'}
        size={size}
        style={item.style || {}}
        type={'primary'}
        onClick={(e: Event) => {
          e.stopPropagation()
          if (!item.isMore) {
            if (typeof item.beforeClick === 'function') {
              new Promise((resolve) => {
                item.beforeClick!(
                  {
                    row: props.row,
                    index: props.index!,
                    btnIndex,
                    props: props.prop,
                    params: item.params,
                  },
                  resolve
                )
              }).then((res) => {
                if (res) {
                  emit('return-emit', 'btn-click', {
                    props: props.prop,
                    params: item.params,
                    row: props.row,
                    index: props.index,
                    btnIndex,
                  })
                }
              })
            } else {
              emit('return-emit', 'btn-click', {
                props: props.prop,
                params: item.params,
                row: props.row,
                index: props.index,
                btnIndex,
              })
            }
          }
        }}
        {...isProperty(
          { row: props.row, index: props.index!, props: props.prop },
          item?.property
        )}
      >
        {item.text}
      </el-button>
    )

    // 提示
    const tipRender = (item: BtnDataType, index: number[]) => (
      <>
        {item.tip ? (
          <el-tooltip
            popper-class={item.tip ? '' : 'no-tooltip'}
            effect="dark"
            content={item.tip}
            placement="top"
            {...item.tipProperty}
          >
            {btn(item, index)}
          </el-tooltip>
        ) : (
          <>{btn(item, index)}</>
        )}
      </>
    )

    return () => (
      <>
        <div
          class="btnType"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: justifyFun(props.aligning),
          }}
        >
          <span style={{ marginRight: props.prop.text ? '10px' : '0px' }}>
            {props.prop.text || ''}
          </span>
          {(props.prop.data as BtnDataType[])
            ?.filter((item) => {
              if (typeof item.showBtn === 'function') {
                return item.showBtn(props.row, props.index!)
              } else {
                return item.showBtn === undefined ? true : item.showBtn
              }
            })
            .map((item, index) => {
              return Array.isArray(item) ? (
                <el-dropdown
                  class="el-dropdown-more"
                  v-slots={{
                    dropdown: () => (
                      <el-dropdown-menu>
                        {(item as BtnDataType[])
                          .filter((each) => !each.isMore)
                          .map((each, i) => (
                            <el-dropdown-item key={index}>
                              {tipRender(each, [index, i])}
                            </el-dropdown-item>
                          ))}
                      </el-dropdown-menu>
                    ),
                  }}
                >
                  <div>
                    {(item.some((each) => each.isMore)
                      ? [item.find((each) => each.isMore)]
                      : [{ tip: t(LangKey.More) }]
                    ).map((each) => (
                      <>{btn(each, [index])}</>
                    ))}
                  </div>
                </el-dropdown>
              ) : (
                tipRender(item, [index])
              )
            })}
        </div>
      </>
    )
  },
})

Button.install = (app: App) => {
  app.component(Button.name, Button)
}
export const PTButton = Button as SFCWithInstall<typeof Button>
export default Button
