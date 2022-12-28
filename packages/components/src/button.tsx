import { defineComponent, getCurrentInstance, inject } from 'vue'
import { JustifyFunSymbol, SizeSymbol } from '../../keys'
import type { App, PropType } from 'vue'
import type {
  BtnDataType,
  PowerfulTableHeaderProps,
  SFCWithInstall,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { LangKey, t } from '~/locale/lang'

const Button = defineComponent({
  name: 'PTButton',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<
        PowerfulTableHeaderProps<any, BtnDataType[] | BtnDataType[][]>
      >,
      default: () => ({}),
    },
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)

    const { proxy } = getCurrentInstance() as any
    /* ------ 按钮回调 ------ */
    const btnChange = (
      item: BtnDataType,
      row: any,
      index: number,
      type: string
    ) => {
      // params 赋值
      let params = {}
      if (typeof item.params === 'object') {
        params = Object.assign({ type }, item.params)
      } else {
        params = Object.assign(
          { type },
          item.params === undefined ? {} : { params: item.params }
        )
      }

      if (item.isConfirmTip) {
        proxy
          .$confirm(
            item.confirmTip
              ? item.confirmTip
              : t<(s: string) => string>(LangKey.OperateHint)(item.tip),
            t(LangKey.Hint),
            {
              confirmButtonText: t(LangKey.Confirm),
              cancelButtonText: t(LangKey.Cancel),
              type: 'warning',
            }
          )
          .then(() => {
            emit('returnEmit', 'btnClick', { params, row, index })
          })
          .catch(() => {
            // console.log('取消删除')
          })
      } else {
        emit('returnEmit', 'btnClick', { params, row, index })
      }
    }

    const btn = (item: BtnDataType) => (
      <el-button
        class={item.text == '' ? 'notSpan' : ''}
        size={size}
        icon={item.icon || ''}
        style={item.style || {}}
        disabled={item.disabled || false}
        type={item.type || 'primary'}
        onClick={(e: Event) => {
          e.stopPropagation()
          !item.isMore &&
            btnChange(
              item,
              props.row,
              props.index as number,
              item.type || 'primary'
            )
        }}
        {...item?.componentProp}
      >
        {typeof item.text != 'string' ? item.tip : item.text}
      </el-button>
    )

    // 提示
    const tipRender = (item: BtnDataType) => (
      <el-tooltip
        popper-class={item.isTooltip ? '' : 'no-tooltip'}
        effect="dark"
        content={item.tip}
        placement="top"
      >
        {btn(item)}
      </el-tooltip>
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
          <span style={{ marginRight: props.prop?.text ? '10px' : '0px' }}>
            {props.prop?.text || ''}
          </span>
          {(props.prop.data as BtnDataType[])
            ?.filter((item) => {
              if (typeof item.showBtn === 'function') {
                return item.showBtn(props.row, props.index)
              } else {
                return item.showBtn === undefined ? true : item.showBtn
              }
            })
            .map((item) => {
              return Array.isArray(item) ? (
                <el-dropdown
                  class="el-dropdown-more"
                  v-slots={{
                    dropdown: () => (
                      <el-dropdown-menu>
                        {(item as BtnDataType[])
                          .filter((each) => !each.isMore)
                          .map((each, index) => (
                            <el-dropdown-item key={index}>
                              {tipRender(each)}
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
                      <>{btn(each)}</>
                    ))}
                  </div>
                </el-dropdown>
              ) : (
                tipRender(item)
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
