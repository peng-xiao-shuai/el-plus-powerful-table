import { App, defineComponent, PropType, getCurrentInstance, inject } from "vue";
import type { PowerfulTableHeaderProps, BtnDataType, Size, SFCWithInstall } from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table'

const Button = defineComponent({
  name: 'PTButton',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, BtnDataType[] | BtnDataType[][]>>,
      default: () => {}
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') as Function
    const size = inject('size') as Size
    
    const { proxy } = getCurrentInstance() as any
    /* ------ 按钮回调 ------ */
    const btnChange = (item: BtnDataType, row: any, index: number, type: string) => {
      const params = 
        typeof item.params === 'object' 
        ? Object.assign({type}, item.params) 
        : Object.assign({type}, typeof item.params === 'undefined' ? {} : {params: item.params})

      if (item.isConfirmTip) {
        proxy.$confirm(item.confirmTip ? item.confirmTip : `是否要进行${item.tip}操作, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            emit('returnEmit', "btnClick", { params, row, index })
          })
          .catch(() => {
            // console.log('取消删除')
          })
      } else {
        emit('returnEmit', "btnClick", { params, row, index })
      }
    }

    const btn = (item: BtnDataType) => (
      <el-button
        class={item.text == '' ?  'notSpan' : ''}
        size={size}
        icon={item.icon || ''}
        style={item.style || {}}
        disabled={item.disabled || false}
        type={item.type || 'primary'}
        onClick={(e:Event) => {
          e.stopPropagation()
          !item.isMore && btnChange(item, props.row, props.index as number, item.type || 'primary' )
        }}
        {...item?.componentProp}
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

Button.install = (app: App) => {
  app.component(Button.name, Button);
}
export const PTButton = Button as SFCWithInstall<typeof Button>
export default Button