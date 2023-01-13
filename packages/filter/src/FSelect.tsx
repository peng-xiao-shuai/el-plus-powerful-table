import { defineComponent, inject, reactive, watch } from 'vue'
import { props, slots } from './common'
import type { State } from './common'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableFilter,
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SetDataType,
} from '../../../typings'
import { SizeSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

const isFun = <T,>(key: string, data?: T) => {
  if (typeof data == 'function') {
    return data()[key]
  } else {
    return data ? (data as { [s: string]: any })[key] : ''
  }
}
const FSelect = defineComponent({
  name: 'PTFSelect',
  props: {
    ...props,
    // 过滤的配置数据
    propData: {
      type: Object as PropType<PowerfulTableHeaderProps<null>>,
      default: () => {
        return {
          prop: '',
        }
      },
    },
  },
  emits: ['headerFilterChange'],
  setup(props, { emit, expose }) {
    const size = inject(SizeSymbol)

    const state: State<(string | number)[]> = reactive({
      value: [],
      options: [],
      selectVisible: false,
      visible: false,
    })

    const selectVisibleChange = (e: boolean) => {
      if (!e) {
        state.visible = false
      } else {
        state.selectVisible = e
      }
    }

    const selectChange = (val: (number | string)[]) => {
      if (!val.length) val = []
      emit('headerFilterChange', val, props.headerData, props.propData)
    }

    watch(
      () => props.propData,
      (newProps) => {
        // 首先判断是否存在filter属性
        if (newProps.filters) {
          // filter 属性支持 数组和函数 这里在判断是否数组
          if (Array.isArray(newProps.filters)) state.options = newProps.filters
          else {
            console.warn(
              props.headerData.label,
              'The filter attribute of the column must be an array.'
            )
          }
        } else if (newProps.type === 'switch') {
          const arr: PowerfulTableFilter[] = []
          arr.push(
            {
              value: t(LangKey.Open),
              key:
                isFun(
                  'activeValue',
                  (newProps.data as SetDataType<'switch'>)?.property
                ) || 1,
            },
            {
              value: t(LangKey.Close),
              key:
                isFun(
                  'inactiveValue',
                  (newProps.data as SetDataType<'switch'>)?.property
                ) || 0,
            }
          )
          state.options = arr
        }
      },
      { immediate: true, deep: true }
    )

    // 暴露状态
    expose({
      state,
    })

    return () => (
      <el-popover
        v-model={[state.visible, 'visible']}
        placement="bottom-start"
        trigger="contextmenu"
        width={200}
        v-slots={slots(state, props.headerData)}
      >
        <el-select
          v-model={state.value}
          multiple
          collapse-tags
          clearable
          placeholder={t(LangKey.Select)}
          style="width: 100%"
          teleported={false}
          size={size || 'small'}
          onVisibleChange={selectVisibleChange}
          onVisible-change={(val: boolean) => {
            if (!val) state.visible = false
          }}
          onChange={selectChange}
        >
          {state.options?.map((item, index) => {
            return (
              <el-option
                key={index}
                label={item.value}
                value={item.key}
              ></el-option>
            )
          })}
        </el-select>
      </el-popover>
    )
  },
})

const PTFSelect = FSelect as SFCWithInstall<typeof FSelect>
PTFSelect.install = (app: App) => {
  app.component(FSelect.name, FSelect)
}
export { PTFSelect }
export default FSelect
