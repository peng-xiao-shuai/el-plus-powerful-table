import { Search, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { PropType } from 'vue';
import { PowerfulTableHeader, PowerfulTableFilter } from '../../../../types/powerful-table';

export type State = {
  value: string | (string | number)[],
  options?: PowerfulTableFilter[],
  visible: boolean
}

export const props = {
  // 表格的配置数据
  headerData: {
    type: Object as PropType<PowerfulTableHeader<any>>,
    default: () => { },
  },
  list: {
    type: Array,
    default: () => []
  }
}

// 输入框插槽
export const btnSlots = (fun: Function) => {
  return {
    append: () => (<el-button icon={Search} onClick={fun}></el-button>)
  }
};

// 弹窗插槽
export const slots = <T extends State>(state: T, text: string) => {
  return {
    reference: () => {
      return (
        <span
          class="el-popover-center"
          style={state.value.length ? { color: 'var(--el-color-primary)'} : {}}
          onClick={() => { state.visible = !state.visible }}
        >
          {text}
          <el-icon class={state.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}>
            <ArrowUp />
          </el-icon>
        </span>
      );
    }
  }
};