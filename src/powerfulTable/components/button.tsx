import { defineComponent, PropType, getCurrentInstance, inject } from "vue";
import type { PowerfulTableHeaderProps, BtnDataType, EmitType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'

export default defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<BtnDataType[]>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string
    
    const { proxy } = getCurrentInstance() as any
    /* ------ 按钮回调 ------ */
    const btnChange = (emitName: EmitType, row: any, index: number, type: string) => {
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
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
            { props.prop.text || "" }
          </span>
          {
            (props.prop.data as BtnDataType[])?.filter(item => typeof item.showBtn === 'function' ? item.showBtn(props.row, props.index) : (item.showBtn === undefined ? true : item.showBtn))
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
                  onClick={(e:Event) => {
                    e.stopPropagation()
                    btnChange(item.emit, props.row, props.index as number, item.type || 'primary' )
                  }}
                >
                  { typeof item.text != 'string'  ? item.tip : item.text }
                </el-button>
              </el-tooltip>
            ))
          }
        </div>
      </>
    )
  }
})