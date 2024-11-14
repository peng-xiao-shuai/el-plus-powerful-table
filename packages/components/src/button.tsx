import {
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElTooltip,
} from 'element-plus'
import { JustifyFunSymbol, SizeSymbol } from '../../keys'
import type { App } from 'vue'
import type {
  BtnDataType,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '~/index'
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
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)

    const btn = (item: BtnDataType, btnIndex: number[]) => (
      <ElButton
        size={size}
        style={item.style || {}}
        type={'primary'}
        onClick={(e: Event) => {
          e.stopPropagation()
          if (!item.isMore) {
            if (typeof item.click === 'function') {
              item.click({
                props: props.prop,
                params: item.params,
                row: props.row,
                index: props.index!,
              })
              return
            }

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
      </ElButton>
    )

    // 提示
    const tipRender = (item: BtnDataType, index: number[]) => (
      <>
        {item.tip ? (
          <ElTooltip
            popper-class={item.tip ? '' : 'no-tooltip'}
            effect="dark"
            content={item.tip}
            placement="top"
            {...item.tipProperty}
          >
            {btn(item, index)}
          </ElTooltip>
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
                <ElDropdown
                  class="el-dropdown-more"
                  v-slots={{
                    dropdown: () => (
                      <ElDropdownMenu>
                        {(item as BtnDataType[])
                          .filter((each) => !each.isMore)
                          .map((each, i) => (
                            <ElDropdownItem key={index}>
                              {tipRender(each, [index, i])}
                            </ElDropdownItem>
                          ))}
                      </ElDropdownMenu>
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
                </ElDropdown>
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
  app.component(Button.name!, Button)
}
export const PTButton = Button as SFCWithInstall<typeof Button>
export default Button
