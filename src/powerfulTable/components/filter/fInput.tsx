import { defineComponent, ref, reactive, watch, Transition } from "vue";

//定义props的类型
interface Props {
  headerData: any
}

export default defineComponent({
  props: {
    // 表格的配置数据
    headerData: {
      type: Object,
      default: () => { },
    }
  },
  setup(props: Props, { emit }) {

    const state = reactive({
      value: [],
      options: [],
      visible: false
    })

    const inputChange = () => {
      state.visible = false
      emit('headerFilterChange', state.value, props.headerData)
    }

    const slots = {
      reference: (e: any) => {
        return (
          <span
            style={
              state.value.length
                ? {
                  color: '#409EFF',
                }
                : {}
            }
            onClick={() => { state.visible = !state.visible }}
          >
            {props.headerData.label}
            <i class={['el-icon--right', state.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down']}></i>
          </span>
        );
      },
    };

    const btnSlots = {
      append: (e: any) => {
        return (
          <el-button icon="el-icon-search" onClick={inputChange}></el-button>
        );
      },
    };

    watch(
      props.headerData,
      (newProps, oldProps) => {
        state.options = newProps.options ? newProps.options : [];
      },
      { immediate: true, deep: true }
    );
    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        width="{400}"
        trigger="click"
        v-slots={slots}
      >
        <el-input
          placeholder="请输入内容"
          v-model={state.value}
          size="mini"
          clearable
          class="input-with-select"
          v-slots={btnSlots}
        >
        </el-input>
      </el-popover>
    );
  },
});