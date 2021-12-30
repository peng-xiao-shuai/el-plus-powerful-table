import { defineComponent, inject, PropType, reactive, watch } from "vue";
import { PowerfulTableHeader } from '../../../../types/powerful-table';
import { btnSlots, slots, State } from './common';

export default defineComponent({
  props: {
    // 表格的配置数据
    headerData: {
      type: Object as PropType<PowerfulTableHeader<any>>,
      default: () => { },
    }
  },
  emits: ['headerFilterChange'],
  setup(props, { emit }) {
    const size = inject('size') as string
    const state = reactive<State>({
      value: '',
      visible: false
    })

    const inputChange = () => {
      state.visible = false
      emit('headerFilterChange', state.value, props.headerData)
    }

    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        width={state.value.length < 10 ? 200 : state.value.length * 20 > 400 ? 400 : state.value.length * 20}
        trigger="click"
        v-slots={slots(state, props.headerData.label)}
      >
        <el-input
          placeholder="请输入内容"
          v-model={state.value}
          size={size}
          clearable
          class="input-with-select"
          v-slots={btnSlots(inputChange)}
        >
        </el-input>
      </el-popover>
    );
  },
});