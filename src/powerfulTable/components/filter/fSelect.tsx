import { defineComponent, ref, reactive, watch, Transition, PropType } from "vue";
import type {
  PowerfulTableHeaderProps,
} from "../../../../types/powerful-table";

export default defineComponent({
  props: {
    // 表头的配置数据
    headerData: {
      type: Object,
      default: () => { },
    },
    // 过滤的配置数据
    propData: {
      type: Object as PropType<PowerfulTableHeaderProps<any>>,
      default: () => { prop: '' },
    }
  },
  setup(props, { emit }) {

    const state = reactive({
      value: [],
      options: [],
      selectVisible: false,
      visible: false
    })

    const selectVisibleChange = (e: boolean) => {
      if (!e) {
        state.visible = false
      } else {
        state.selectVisible = e
      }
    }

    const selectChange = (val: any) => {
      if (!val.length) val = ''
      emit('headerFilterChange', val, props.headerData)
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

    watch(
      props.propData,
      (newProps: any) => {
        if (newProps.filter) {
          if (Array.isArray(newProps.filter)) state.options = newProps.filter
          else {
            const arr: any = []
            for (const key in newProps.filter) {
              arr.push({
                label: newProps.filter[key],
                value: key,
              });
            }
            state.options = arr
          }
        } else if (props.propData.type === 'switch') {
          const arr: any = []
          arr.push({
            label: '开启',
            value: props.propData.data.activeValue || 1,
          }, {
            label: '关闭',
            value: props.propData.data.inactiveValue || 0,
          });
          state.options = arr
        }
      },
      { immediate: true, deep: true }
    );
    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        width="{400}"
        trigger="manual"
        v-slots={slots}
      >
        <el-select
          v-model={state.value}
          multiple
          collapse-tags
          placeholder="请选择"
          size="mini"
          onVisibleChange={selectVisibleChange}
          onChange={selectChange}
        >
          {state.options.map((item: any, index: number) => {
            return (
              <el-option
                key={index}
                label={props.headerData.labelName ? item[props.headerData.labelName] : item.value}
                value={props.headerData.valueName ? item[props.headerData.valueName] : item.key}>
              </el-option>
            );
          })}
        </el-select>
      </el-popover>
    );
  },
});