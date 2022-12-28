import { defineComponent, inject, reactive } from 'vue'
import { btnSlots, props, slots } from './common'
import type { App } from 'vue'
import type { SFCWithInstall } from '../../../typings'
import { SizeSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

const FInput = defineComponent({
  name: 'PTFInput',
  props,
  emits: ['headerFilterChange'],
  setup(props, { emit }) {
    const size = inject(SizeSymbol)
    const state = reactive<import('./common').State>({
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

    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        width={lengthToWidth(state.value.length)}
        trigger="contextmenu"
        v-slots={slots(state, props.headerData)}
      >
        <el-input
          placeholder={t(LangKey.InputContent)}
          v-model={state.value}
          size={size || 'small'}
          clearable
          teleported={false}
          class="input-with-select"
          v-slots={btnSlots(inputChange)}
        ></el-input>
      </el-popover>
    )
  },
})

const PTFInput = FInput as SFCWithInstall<typeof FInput>
PTFInput.install = (app: App) => {
  app.component(FInput.name, FInput)
}
export { PTFInput }
export default FInput
