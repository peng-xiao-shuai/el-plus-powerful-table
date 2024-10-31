import { ElButton, ElIcon } from 'element-plus'
import { ArrowUp } from '@element-plus/icons-vue'
import type { PowerfulTableFilter, PowerfulTableHeader } from '~/index'

export type State<T = string | (string | number)[]> = {
  value: T
  options?: PowerfulTableFilter[]
  selectVisible?: boolean
  visible: boolean
}

export const props = {
  // 表格的配置数据
  headerData: {
    type: Object as PropType<PowerfulTableHeader<any>>,
    default: () => ({}),
  },
  list: {
    type: Array,
    default: () => [],
  },
}

// 输入框插槽
export const btnSlots = (fun: () => void) => {
  return {
    append: () => (
      <ElButton
        icon={
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#pt-search"></use>
          </svg>
        }
        onClick={fun}
      ></ElButton>
    ),
  }
}

// 弹窗插槽
export const slots = (state: State, header: PowerfulTableHeader) => {
  return {
    reference: () => {
      return (
        <span
          class="el-popover-center"
          style={state.value.length ? { color: 'var(--el-color-primary)' } : {}}
          onClick={(e: Event) => {
            if (!header.defaultFilter) return
            e.stopPropagation()
            state.visible = !state.visible
          }}
        >
          {header.label}
          <ElIcon
            style="margin-left: 5px"
            v-show={header.defaultFilter}
            class={state.visible ? 'arrow-down' : 'arrow-up'}
          >
            <ArrowUp />
          </ElIcon>
        </span>
      )
    },
  }
}
