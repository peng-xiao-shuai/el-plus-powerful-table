import { defineComponent, PropType, computed, inject } from "vue";
import type { PowerfulTableHeaderProps, InputDataType, EmitType } from '../../../types/powerful-table'

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => {}
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string

    // 获取data
    const data = computed<InputDataType | undefined>(() => props.prop.data as InputDataType | undefined)

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{margin: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        <el-input
          v-slots={
            {
              [data.value?.slot as string]: () => <span style={{padding: '0 10px'}}> {data.value?.symbol} </span>
            }
          }
          type={props.prop.type}
          rows={data.value?.rows || 3}
          style={data.value?.style || {}}
          size={size || 'small'}
          placeholder={data.value?.placeholder || ''}
          v-model={props.row[props.prop.prop]}
          disabled={data.value?.disabled || false}
        >
        </el-input>
      </div>
    )
  }
})