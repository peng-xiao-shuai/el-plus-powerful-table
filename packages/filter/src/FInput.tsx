import { defineComponent, inject, reactive } from 'vue'
import { ElInput, ElPopover } from 'element-plus'
import { btnSlots, props, slots } from './common'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/index'
import { SizeSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

const FInput = defineComponent({
  name: 'PTFInput',
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit, expose }) {
    const size = inject(SizeSymbol)
    const state: import('./common').State = reactive({
      value: '',
      visible: false,
    })

    const inputChange = () => {
      // state.visible = false
      emit('headerFilterChange', state.value, props.headerData)
    }

    const lengthToWidth = (length: number) => {
      if (length < 10) {
        return 200
      } else {
        return state.value.length * 20 > 400 ? 400 : state.value.length * 20
      }
    }

    // 暴露状态
    expose({
      state,
      header: props.headerData,
    })

    return () => (
      <ElPopover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        width={lengthToWidth(state.value.length)}
        trigger="contextmenu"
        v-slots={slots(state, props.headerData)}
      >
        <ElInput
          placeholder={t(LangKey.InputContent)}
          v-model={state.value}
          size={size || 'small'}
          clearable
          class="input-with-select"
          v-slots={btnSlots(inputChange)}
        ></ElInput>
      </ElPopover>
    )
  },
})

const PTFInput = FInput as SFCWithInstall<typeof FInput>
PTFInput.install = (app: App) => {
  app.component(FInput.name, FInput)
}
export { PTFInput, FInput }
export default FInput
