import './style.scss'
import {
  ElButton,
  ElButtonGroup,
  ElCheckbox,
  ElPopover,
  ElScrollbar,
  ElTooltip,
} from 'element-plus'
import { SizeSymbol } from '../../keys'
import type { BtnConfig, PowerfulTableHeader } from '~/index'
import { LangKey, t } from '~/locale/lang'

const PTBtnPlus = defineComponent({
  name: 'PTBtnPlus',
  props: {
    // 按钮的配置数据
    btnConfig: {
      type: Object as PropType<BtnConfig.Config<any>>,
      // required: true,
    },
    // 表格的配置数据
    headerList: Array as PropType<PowerfulTableHeader[]>,
    // 表格当前选择的数据集合
    multipleSelection: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    // 判断是否为移动端
    isTable: Boolean,
  },
  emits: ['update:isTable', 'refresh', 'change'],
  setup(props, { emit, slots }) {
    const size = inject(SizeSymbol)

    type State = {
      headerData: PowerfulTableHeader[]
      isPC: boolean
    }
    const state: State = reactive({
      headerData: [],
      // isPC: store.state.isPC.isPC,
      isPC: true,
    })

    /**
     * 判断左侧操作按钮是否禁用
     * @param item 当前按钮数据
     * item.operateType 操作类型：none(默认) => 不需要选择数据；single => 有且只能操作一条数据；batch => 批量操作数据(至少选择一条数据以上)
     */
    const btnDisabled = (
      operateType?: 'none' | 'single' | 'batch'
    ): boolean => {
      // 默认不需要操作数据
      if (operateType === 'single' && props.multipleSelection.length !== 1)
        return true
      if (operateType === 'batch' && props.multipleSelection.length < 1)
        return true
      return false
    }

    const functionBtnChange = () => {
      // proxy.$parent.anewRender()
    }
    const batchOperate = (type: string, btnItem: BtnConfig.BtnList) => {
      if (typeof btnItem.click === 'function') {
        btnItem.click({
          btnItem,
          rows: props.multipleSelection,
        })
        return
      }

      const cb = () => {
        if (type === 'left') {
          emit('change', {
            effect: btnItem.effect,
            rows: props.multipleSelection,
          })
        } else {
          switch (btnItem.effect) {
            case 'refresh':
              emit('refresh')
              break
            case 'switch':
              emit('update:isTable', !props.isTable)
              break
            case 'columns':
              break
            default:
              emit('change', {
                effect: btnItem.effect,
                rows: props.multipleSelection,
              })
              break
          }
        }
      }

      if (typeof btnItem.beforeClick !== 'function') {
        cb()
        return false
      }

      // 是否显示提示
      new Promise((resolve) => {
        btnItem.beforeClick!(
          {
            btnItem,
            rows: props.multipleSelection,
          },
          resolve
        )
      }).then((res) => {
        if (!res) return false
        cb()
      })
    }
    const stop = watch(
      () => props.headerList,
      (newHeaderList) => {
        if (newHeaderList) {
          state.headerData = newHeaderList
          state.headerData.forEach((item) => {
            item.defaultFilter =
              typeof item.defaultFilter == 'boolean'
                ? item.defaultFilter
                : item.isShowOrFilterColumn == 'filter'
            item.defaultShow =
              typeof item.defaultShow == 'undefined' ? true : item.defaultShow
          })
        }
      },
      { immediate: true, deep: true }
    )

    /**
     * 判断是否弹出提示
     */
    const tipBtnNode = (
      item: BtnConfig.BtnList,
      key: string | number,
      direction: 'left' | 'right' = 'left'
    ) => {
      const btn = (
        <ElButton
          class={[
            item.text ? '' : 'no-margin',
            direction === 'left' ? 'btn-plus-left-item' : 'btn-plus-right-item',
          ]}
          size={size}
          style={item.style || {}}
          disabled={item.disabled || btnDisabled(item.operateType)}
          {...item.property}
          onClick={() => batchOperate(direction, item)}
          v-slots={
            item.text
              ? {
                  default: () => item.text,
                }
              : {}
          }
        ></ElButton>
      )
      return item.tip ? (
        <ElTooltip
          key={key}
          content={item.tip}
          class="each"
          effect="dark"
          placement="top"
        >
          {btn}
        </ElTooltip>
      ) : (
        btn
      )
    }

    /**
     * 过滤按钮数组
     */
    const filterButtons = (buttons?: BtnConfig.BtnList[]) => {
      return buttons
        ? buttons.filter((item) =>
            typeof item.showBtn === 'function'
              ? item.showBtn()
              : item.showBtn === undefined
              ? true
              : item.showBtn
          )
        : []
    }

    /**
     * 气泡框渲染函数
     */
    const popoverSlots = (item: BtnConfig.BtnList, index: number) => {
      return {
        default: () => (
          <div class="popover-table">
            <div class="popover-table-row popover-table-header">
              <div class="popover-table-row-label">{t(LangKey.ColumnName)}</div>
              <div class="checkbox">{t(LangKey.Hidden)}</div>
              <div class="checkbox">{t(LangKey.Filter)}</div>
            </div>
            <ElScrollbar style="height: 300px">
              {state.headerData
                .filter((row) => row.isShowOrFilterColumn !== false)
                .map((row, index) => (
                  <div key={index} class="popover-table-row">
                    <div class="popover-table-row-label">
                      <span class="line-1">{row.label}</span>
                    </div>
                    <div class="checkbox">
                      <ElCheckbox
                        v-model={row.defaultShow}
                        class="checkbox"
                        disabled={
                          !(
                            row.isShowOrFilterColumn === 'show' ||
                            row.isShowOrFilterColumn === undefined
                          )
                        }
                        size={size}
                        onChange={() => functionBtnChange()}
                      />
                    </div>
                    <div class="checkbox">
                      <ElCheckbox
                        v-model={row.defaultFilter}
                        class="checkbox"
                        disabled={
                          !(
                            row.isShowOrFilterColumn === 'filter' ||
                            row.isShowOrFilterColumn === undefined
                          )
                        }
                        size={size}
                        onChange={() => functionBtnChange()}
                      />
                    </div>
                  </div>
                ))}
            </ElScrollbar>
          </div>
        ),
        reference: () => <div>{tipBtnNode(item, index)}</div>,
      }
    }

    /**
     * 右侧按钮渲染
     */
    const rightBtnRender = () => {
      return filterButtons(props.btnConfig?.btnRightList).map((item, index) => {
        switch (item.effect) {
          case 'columns':
            return (
              <ElPopover
                placement="bottom"
                trigger="click"
                width="250"
                hide-after={0}
                popper-style="padding: 0"
                v-slots={popoverSlots(item, index)}
              />
            )
          default:
            return tipBtnNode(item, index, 'right')
        }
      })
    }

    onBeforeUnmount(() => {
      stop()
    })

    return () => (
      <>
        <div
          class={[
            'pt-btn-plus',
            state.isPC ? 'cl-btn-plus' : 'cl-btn-plus-mobile',
          ]}
        >
          {slots['btn-left'] ? (
            slots['btn-left']()
          ) : filterButtons(props.btnConfig?.btnList).length > 1 ? (
            // /* 左侧操作按钮 */
            <ElButtonGroup class="filter-item btn-plus-left">
              {filterButtons(props.btnConfig?.btnList).map((item, index) =>
                tipBtnNode(item, index)
              )}
            </ElButtonGroup>
          ) : (
            <div class="filter-item btn-plus-left">
              {tipBtnNode(filterButtons(props.btnConfig?.btnList)[0], 0)}
            </div>
          )}

          {slots['btn-right'] ? (
            slots['btn-right']()
          ) : filterButtons(props.btnConfig?.btnRightList).length > 1 ? (
            <ElButtonGroup class="filter-item btn-plus-right">
              {rightBtnRender()}
            </ElButtonGroup>
          ) : (
            <div class="filter-item btn-plus-right">{rightBtnRender()}</div>
          )}
        </div>
      </>
    )
  },
})

export default PTBtnPlus
