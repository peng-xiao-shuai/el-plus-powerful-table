import {
  defineComponent,
  inject,
  nextTick,
  reactive,
  ref,
  watchEffect,
} from 'vue'
import { ElDatePicker, ElIcon } from 'element-plus'
import { props } from './common'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/index'
import { SizeSymbol } from '~/keys'

const FDatePicker = defineComponent({
  name: 'PTFDatePicker',
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit, expose }) {
    const size = inject(SizeSymbol)
    const datePickerRef = ref<any>()
    const state: import('./common').State & {
      defaultTime: Date[]
    } = reactive({
      value: '',
      visible: false,
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59),
      ],
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

    // 暴露状态
    expose({
      state,
      header: props.headerData,
    })

    return () => (
      <span
        style={state.value ? { color: 'var(--el-color-primary)' } : {}}
        onClick={async (e) => {
          e.stopPropagation()
          state.visible = !state.visible
          if (!state.visible) return
          await nextTick()
          datePickerRef.value.focus()
        }}
      >
        {props.headerData.label}
        <ElIcon class={state.visible ? 'arrow-down' : 'arrow-up'}>
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#pt-arrow-up"></use>
          </svg>
        </ElIcon>
        <ElDatePicker
          v-model={state.value}
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          default-time={state.defaultTime}
          ref={datePickerRef}
          class="date_style"
          style="padding: 0; overflow: hidden"
          size={size || 'small'}
          onUpdate:modelValue={datePickerChange}
          onVisible-change={(b: boolean) => {
            state.visible = b
          }}
        ></ElDatePicker>
      </span>
    )
  },
})

const PTFDatePicker = FDatePicker as SFCWithInstall<typeof FDatePicker>
PTFDatePicker.install = (app: App) => {
  app.component(FDatePicker.name, FDatePicker)
}
export { PTFDatePicker }
export default FDatePicker
