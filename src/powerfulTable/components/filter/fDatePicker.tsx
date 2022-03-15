import { defineComponent, ref, reactive, watchEffect, inject, nextTick } from "vue";
import { ArrowUp } from '@element-plus/icons-vue';
import { props } from './common';
import type { Size } from '#/powerful-table';

export default defineComponent({
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit }) {

    const size = inject('size') as Size
    const datePickerRef = ref<any>()
    const state = reactive<import('./common').State & {
      defaultTime: Date[]
    }>({
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

    watchEffect(() => {
      if (props.list.length && state.value?.length) {
        datePickerChange(state.value)
      }
    })

    return () => (
      <span
        style={state.value.length ? { color: 'var(--el-color-primary)'} : {}}
        onClick={async () => {
          state.visible = !state.visible
          
          if (!state.visible) return
          await nextTick()
          datePickerRef.value.focus()
          console.log(datePickerRef.value);
          
        }}
      >
        {props.headerData.label}
        <el-icon class={state.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}>
          <ArrowUp />
        </el-icon>
        <el-date-picker
          v-model={state.value}
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          default-time={state.defaultTime}
          ref={datePickerRef}
          class="date_style"
          style="padding: 0; overflow: hidden"
          size={size || 'small'}
          onChange={datePickerChange}
          onBlur={() => { state.visible = false }}
        >
        </el-date-picker>
      </span>
    );
  },
});