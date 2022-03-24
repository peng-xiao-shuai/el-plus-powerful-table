import { defineComponent, inject, watchEffect, reactive, App } from "vue";
import { btnSlots, slots, props } from './common';
import type { Size, SFCWithInstall } from '../../../typings'

const FInput = defineComponent({
  name: 'PTFInput',
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit }) {
    const size = inject('size') as Size
    const state = reactive<import('./common').State>({
      value: '',
      visible: false
    })

    const inputChange = () => {
      state.visible = false
      emit('headerFilterChange', state.value, props.headerData)
    }

    watchEffect(() => {
      if (props.list.length && state.value.length) {
        inputChange()
      }
    })

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
          size={size || 'small'}
          clearable
          class="input-with-select"
          v-slots={btnSlots(inputChange)}
        >
        </el-input>
      </el-popover>
    );
  },
});

const PTFInput = FInput as SFCWithInstall<typeof FInput>
PTFInput.install = (app: App) => {
  app.component(FInput.name, FInput);
}
export {
  PTFInput
}
export default FInput