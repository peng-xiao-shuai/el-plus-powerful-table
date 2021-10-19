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
    /* ------ 按钮回调 ------ */
    const btnChange = (emitName, row, index, type) => {
      if (type == 'danger') {
        proxy.$confirm('是否要进行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            emit('returnEmit', emitName, { row, index })
          })
          .catch(() => {
            console.log('取消删除')
          })
      } else {
        emit('returnEmit', emitName, { row, index })
      }
    }

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        {
          props.prop.data && props.prop.data.filter(item => typeof item.showBtn === 'function' ? item.showBtn(props.row, props.index) : (item.showBtn === undefined ? true : item.showBtn))
          .map(item =>(
            <el-tooltip
              class="btnEach"
              effect="dark"
              content={item.tip}
              placement="top"
            >
              <el-button
                class={item.text == '' ?  'notSpan' : ''}
                size={size}
                style={item.style || {}}
                icon={item.icon || ''}
                disabled={item.disabled || false}
                type={item.type || 'primary'}
                onClick={(e) => {
                  e.stopPropagation()
                  btnChange(item.emit, props.row, props.index, item.type || 'primary' )
                }}
              >
                { typeof item.text != 'string'  ? item.tip : item.text }
              </el-button>
            </el-tooltip>
          ))
        }
      </div>
    )
  }
})