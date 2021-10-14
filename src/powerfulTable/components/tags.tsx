import { defineComponent, PropType, computed, inject } from "vue";
import type { PowerfulTableHeaderProps, TagDataType, EmitType } from '../../../types/powerful-table'
import { filterFun } from './filter'

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<TagDataType>>,
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

    /* ------ 标签string转array ------ */
    const tagToArray = (val: string | [], i: number) => {
      return typeof val !== 'string' ? [...val].splice(0, i) : val.split(',').splice(0, i)
    }

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{margin: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        {
          tagToArray(props.row[props.prop.prop], (props.prop.data?.number) || 3)
          .map(tag => (
            <el-tag
              style={{
                marginRight: '10px',
                borderColor: (typeof props.prop.data?.color == 'function') ? 'rgba(0,0,0,0)' : 'auto'
              }}
              size={size}
              key={tag}
              closable={false}
              type={props.prop.data?.type || 'primary'}
              effect={props.prop.data?.effect || 'light'}
              color={(typeof props.prop.data?.color == 'function' && props.prop.data?.color(props.row, tag)) || ''}
              hit={(props.prop.data?.hit) || false}
            >
              { props.prop.filter ? filterFun(tag, props.prop.filter) : tag }
            </el-tag>
          ))
        }
      </div>
    )
  }
})