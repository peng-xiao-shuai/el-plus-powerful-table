import { defineComponent, PropType, getCurrentInstance, inject } from "vue";

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object,
      default: () => {}
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') 
    const size = inject('size') 

    const { proxy } = getCurrentInstance() 
    /* ------ 开关回调 ------ */
    const switchChange = (row, prop, val = 1, val2 = 0, beforeFunction) => {
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
        emit('returnEmit', 'switchChange', row)
      })
      .catch(() => {
        row[prop] = value
      })
    }

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        <el-switch
          size={size}
          style={(props.prop.data && props.prop.data.style) || {}}
          inactive-text={(props.prop.data && props.prop.data.inactiveText) || ''}
          active-text={(props.prop.data && props.prop.data.activeText) || ''}
          v-model={props.row[props.prop.prop]}
          disabled={props.prop.data ? (typeof props.prop.data.disabled === 'function' ? props.prop.data.disabled(props.row) : props.prop.data.disabled || false) : false}
          active-color={(props.prop.data && props.prop.data.activeColor)}
          inactive-color={(props.prop.data && props.prop.data.inactiveColor)}
          active-value={
            (props.prop.data && (props.prop.data.activeValue || props.prop.data.activeValue === 0
              ? props.prop.data.activeValue
              : 1)) || 1
          }
          inactive-value={(props.prop.data && props.prop.data.inactiveValue) || 0}
          onClick={(e) => {
            e.stopPropagation()
            switchChange(
              props.row, props.prop.prop,
              (props.prop.data && props.prop.data.activeValue),
              (props.prop.data && props.prop.data.inactiveValue),
              (props.prop.data && props.prop.data.beforeFunction),
            )
          }}
        />
      </div>
    )
  }
})