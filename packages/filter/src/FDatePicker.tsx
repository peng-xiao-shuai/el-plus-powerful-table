import {
  defineComponent,
  inject,
  nextTick,
  reactive,
  ref,
  watchEffect,
} from 'vue';
import { ArrowUp } from '@element-plus/icons-vue';
import { props } from './common';
import type { App } from 'vue';
import type { SFCWithInstall, Size } from '../../../typings';

const FDatePicker = defineComponent({
  name: 'PTFDatePicker',
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit }) {
    const size = inject('size') as Size;
    const datePickerRef = ref<any>();
    const state = reactive<
      import('./common').State & {
        defaultTime: Date[];
      }
    >({
      value: '',
      visible: false,
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
    });

    const datePickerChange = (value: any) => {
      if (!value) state.value = '';
      emit('headerFilterChange', value, props.headerData);
    };

    watchEffect(() => {
      if (props.list.length && state.value?.length) {
        datePickerChange(state.value);
      }
    });

    return () => (
      <span
        style={state.value ? { color: 'var(--el-color-primary)' } : {}}
        onClick={async (e) => {
          e.stopPropagation();
          state.visible = !state.visible;
          if (!state.visible) return;
          await nextTick();
          datePickerRef.value.focus();
        }}
      >
        {props.headerData.label}
        <el-icon class={state.visible ? 'arrow-up' : 'arrow-down'}>
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
          onBlur={() => {
            setTimeout(() => (state.visible = false), 100);
          }}
        ></el-date-picker>
      </span>
    );
  },
});

const PTFDatePicker = FDatePicker as SFCWithInstall<typeof FDatePicker>;
PTFDatePicker.install = (app: App) => {
  app.component(FDatePicker.name, FDatePicker);
};
export { PTFDatePicker };
export default FDatePicker;
