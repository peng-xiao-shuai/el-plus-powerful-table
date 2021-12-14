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

    const datePickerRef = ref()

    const state = reactive({
      // value: newDate(),
      value: '',
      visible: false,
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59)
      ]
    })

    const datePickerChange = (value: any) => {
      if (!value) state.value = ''
      emit('headerFilterChange', value, props.headerData)
    }

    const dataPickerBlur = () => {
      state.visible = false
    }

    const labelClick = () => {
      state.visible = true
      datePickerRef.value.focus()
    }

    return () => (
      <span
        style={
          state.value
            ? {
              color: '#409EFF',
            }
            : {}
        }
        onClick={labelClick}
      >
        {props.headerData.label}
        <i class={['el-icon--right', state.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down']}></i>
        <el-date-picker
          v-model={state.value}
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD HH:mm:ss"
          default-time={state.defaultTime}
          ref={datePickerRef}
          class="date_style"
          size="mini"
          onChange={datePickerChange}
          onBlur={dataPickerBlur}
        >
        </el-date-picker>
      </span>
    );
  },
});