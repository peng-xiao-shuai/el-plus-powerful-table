import { defineComponent, PropType, getCurrentInstance, inject } from "vue";
import type { PowerfulTableHeaderProps, SwitchDataType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'

export default defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, SwitchDataType>>,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string

    const { proxy } = getCurrentInstance() as any
    /* ------ 开关回调 ------ */
    const switchChange = (row: any, prop: string, val:string|number = 1, val2:string|number = 0, beforeFunction: Function | undefined) => {
      let value = row[prop] == val ? val2 : val
      if (typeof beforeFunction == 'function' && !beforeFunction(row, row[prop], value)) {
        row[prop] = value
        return false
      }
      proxy.$confirm('是否要进行修改操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        proxy.$parent.returnEmit("switchChange", row)
      })
      .catch(() => {
        row[prop] = value
      })
    }

    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          <el-switch
            size={size}
            style={props.prop.data?.style || {}}
            inactive-text={props.prop.data?.inactiveText || ''}
            active-text={props.prop.data?.activeText || ''}
            v-model={props.row[props.prop.prop]}
            disabled={typeof props.prop.data?.disabled === 'function' ? props.prop.data?.disabled(props.row) : props.prop.data?.disabled || false}
            active-color={props.prop.data?.activeColor}
            inactive-color={props.prop.data?.inactiveColor}
            active-value={
              props.prop.data?.activeValue || props.prop.data?.activeValue === 0
                ? props.prop.data?.activeValue
                : 1
            }
            inactive-value={props.prop.data?.inactiveValue || 0}
            onClick={(e: Event) => {
              e.stopPropagation()
              switchChange(props.row, props.prop.prop, props.prop.data?.activeValue, props.prop.data?.inactiveValue, props.prop.data?.beforeFunction)
            }}
          />
        </div>
      </>
    )
  }
})