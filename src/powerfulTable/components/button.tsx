import { defineComponent, PropType, getCurrentInstance, inject } from "vue";
import type { PowerfulTableHeaderProps, BtnDataType, EmitType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'

export default defineComponent({
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, BtnDataType[] | BtnDataType[][]>>,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as string
    
    const { proxy } = getCurrentInstance() as any
    /* ------ 按钮回调 ------ */
    const btnChange = (item: BtnDataType, row: any, index: number, type: string) => {
      const params = 
        typeof item.params === 'object' 
        ? Object.assign({type}, item.params) 
        : Object.assign({type}, typeof item.params === 'undefined' ? {} : {params: item.params})

      if (type == 'danger') {
        proxy.$confirm('是否要进行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            proxy.$parent.returnEmit("btnClick", { params, row, index })
          })
          .catch(() => {
            // console.log('取消删除')
          })
      } else {
        proxy.$parent.returnEmit("btnClick", { params, row, index })
      }
    }

    const btn = (item: BtnDataType) => (
      <el-button
        class={item.text == '' ?  'notSpan' : ''}
        size={size}
        style={item.style || {}}
        icon={item.icon || ''}
        disabled={item.disabled || false}
        type={item.type || 'primary'}
        onClick={(e:Event) => {
          e.stopPropagation()
          !item.isMore && btnChange(item, props.row, props.index as number, item.type || 'primary' )
        }}
      >
        { typeof item.text != 'string'  ? item.tip : item.text }
      </el-button>
    )

    return () => (
      <>
        <div class="btnType" style={{display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop?.text ? '10px' : '0px'}}>
            { props.prop?.text || "" }
          </span>
          {
            (props.prop.data as BtnDataType[])?.filter(item => typeof item.showBtn === 'function' ? item.showBtn(props.row, props.index) : (item.showBtn === undefined ? true : item.showBtn))
            .map(item => {
              return Array.isArray(item)
              ? (<el-dropdown class="el-dropdown-more" v-slots={{
                  dropdown: () => (
                    <el-dropdown-menu>
                      {item.filter(each => !each.isMore).map(each => (<el-dropdown-item key={each.label}>
                        <el-tooltip
                          popper-class={item.isTooltip ? '' : 'no-tooltip'}
                          effect="dark"
                          content={each.tip}
                          placement="top"
                        >
                          {btn(each)}
                        </el-tooltip>
                      </el-dropdown-item>))}
                    </el-dropdown-menu>
                  )
                }}>
                  <div>
                    {(item.find(each => each.isMore)
                      ? [item.find(each => each.isMore)]
                      : [{tip: '更多'}])
                      .map(each => (
                        <>
                        {btn(each)}
                        </>
                      ))
                    }
                  </div>
                </el-dropdown>)
              : (<el-tooltip
                  popper-class={item.isTooltip ? '' : 'no-tooltip'}
                  effect="dark"
                  content={item.tip}
                  placement="top"
                >
                  {btn(item)}
                </el-tooltip>)
            })
          }
        </div>
      </>
    )
  }
})