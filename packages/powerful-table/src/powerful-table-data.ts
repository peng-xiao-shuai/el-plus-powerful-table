import { ElMessage, ElMessageBox, useGlobalConfig } from 'element-plus/es'
import { deepClone } from '../../index'
import { PowerfulTableSymbol } from '../../keys'
import type { FDatePicker, FInput, FSelect } from '../../filter'
import type { PropType } from 'vue'
import type {
  ComponentEvent,
  EmitEventType,
  EmitType,
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
  PowerfulTableOperateData,
  PowerfulTableProps,
  _TYPE,
} from '@/index'
import { LangKey, t } from '~/locale/lang'
// console.log(PTFDatePicker, PTFInput, PTFSelect)

export enum EmitEnum {
  BtnPlusChange = 'btn-plus-change',
  BtnPlusRefresh = 'btn-plus-refresh',
  BtnClick = 'btn-click',
  SizeChange = 'size-change',
  ComponentEvent = 'component-event',
  SortCustom = 'sort-custom',
  BatchOperate = 'batch-operate',
  Select = 'select',
  SelectionChange = 'selection-change',
  SelectAll = 'select-all',
  CellMouseEnter = 'cell-mouse-enter',
  CellMouseLeave = 'cell-mouse-leave',
  CellClick = 'cell-click',
  CellDblclick = 'cell-dblclick',
  CellContextmenu = 'cell-contextmenu',
  RowClick = 'row-click',
  RowContextmenu = 'row-contextmenu',
  RowDblclick = 'row-dblclick',
  HeaderClick = 'header-click',
  HeaderContextmenu = 'header-contextmenu',
  FilterChange = 'filter-change',
  CurrentChange = 'current-change',
  HeaderDragend = 'header-dragend',
  ExpandChange = 'expand-change',
}

type DefaultRow = any
type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type FilterComponents = import('vue').Ref<
  InstanceType<typeof FSelect | typeof FInput | typeof FDatePicker>[] | null
>

// 主组件props
export const powerfulTableProps = {
  // 按钮组件配置数据
  btnConfig: {
    type: Object as PropType<PowerfulTableProps<DefaultRow>['btnConfig']>,
    default: undefined,
  },
  // 组件大小
  size: {
    type: String as PropType<PowerfulTableProps<DefaultRow>['size']>,
    default: '',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  // 当前数据
  list: {
    type: Array as PropType<PowerfulTableProps<DefaultRow>['list']>,
    default: () => [],
  },
  // 所有选中
  selectData: {
    type: Array as PropType<PowerfulTableProps<DefaultRow>['list']>,
    default: () => {
      return []
    },
  },
  isSelect: {
    type: Boolean as PropType<PowerfulTableProps<DefaultRow>['isSelect']>,
    default: false,
  },
  selectable: {
    type: Function as PropType<PowerfulTableProps<DefaultRow>['selectable']>,
    default: undefined,
  },
  selectCompare: {
    type: Array as PropType<PowerfulTableProps<DefaultRow>['selectCompare']>,
    default: () => ['id', 'id'],
  },

  header: {
    type: Array as PropType<PowerfulTableProps<DefaultRow>['header']>,
    default: () => [],
  },

  paginationProperty: {
    type: Object as PropType<
      PowerfulTableProps<DefaultRow>['paginationProperty']
    >,
    default: () => ({}),
  },

  // 批量操作
  operateData: {
    type: Object as PropType<PowerfulTableProps<DefaultRow>['operateData']>,
    default: () => [{}],
  },
  isPagination: {
    type: Boolean,
    default: true,
  },
  tree: {
    type: Object as PropType<PowerfulTableProps<DefaultRow>['tree']>,
    default: () => ({
      props: {
        children: 'children',
        hasChildren: 'hasChildren',
      },
    }),
  },
  property: {
    type: Object as PropType<PowerfulTableProps<DefaultRow>['property']>,
    default: () => ({}),
  },
}

export const powerfulTableComponentProp = {
  row: {
    type: Object as PropType<DefaultRow>,
    default: () => [{}],
  },
  index: {
    type: Number as PropType<number>,
  },
  aligning: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
}

// 附属组件自定义事件抛出
export const useREmit = (
  emit: (s: 'component-emit', event: ComponentEvent, ...arg: any) => void,
  componentName: keyof _TYPE | 'filter',
  props: {
    row: any
    index?: number
    props: PowerfulTableHeaderProps<any>[] | PowerfulTableHeaderProps<any>
  }
) => {
  const REmit = (eventType: string, ...arg: any) => {
    emit(
      'component-emit',
      {
        componentName,
        eventType,
        ...props,
      },
      ...arg
    )
  }

  return {
    REmit,
  }
}

// 对部分支持函数的 property 参数进行判断返回
export const isProperty = <T, R>(e: T, property?: R | ((e: T) => R)) => {
  const isFish = (pet: typeof property): pet is R => {
    return typeof (<R>pet) != 'function'
  }

  return isFish(property) ? property : property!(e)
}

interface PowerfulTableData<L = DefaultRow> {
  listLoading: boolean
  develop: boolean[]
  currentPage: number
  pageSize: number
  currentSelect: PowerfulTableProps<L>['list']
  otherSelect: PowerfulTableProps<L>['list']
  operate: PowerfulTableOperateData
}

interface StateData<L = DefaultRow> {
  tableLists: PowerfulTableProps<L>['list']
  isPC: boolean
  isTable: boolean
}

export const usePowerfulTableStates = <L>(props: PowerfulTableProps<L>) => {
  // 全局此组件注入的数据
  const injectProps = inject(PowerfulTableSymbol, {})

  /* ----- 组件实例 ----- */
  const multipleTable = ref<any>(null)
  const filterComponents: FilterComponents = ref(null)

  /* ------  表格数据  ------ */
  const powerfulTableData: PowerfulTableData<L> = reactive({
    listLoading: true, //页面是否加载中
    develop: [], // 展开
    currentPage: 1, // 当前页
    pageSize: props.paginationProperty?.pageSizes
      ? props.paginationProperty?.pageSizes[0]
      : 10, //一页多少条
    currentSelect: [], // 当前页选中
    otherSelect: [], // 其他页选中
    operate: {
      // 承载props的operateData
      value: undefined,
      disabled: false,
      icon: '',
      prop: 'id',
      style: undefined,
      operates: [],
    },
  })

  // 组件参数
  const stateData: StateData<L> = reactive({
    tableLists: [],
    isPC: true,
    isTable: true,
  })

  // 为表格数据重新赋值
  watch(
    () => props.list as L[],
    (newList) => {
      stateData.tableLists = newList || []
    },
    { immediate: true, deep: true }
  )

  return {
    Size: props.size || useGlobalConfig()?.value?.size,
    multipleTable,
    filterComponents,
    powerfulTableData,
    injectProps,
    stateData,
  }
}

export const useFunction = <L>(
  emit: EmitEventType<L>,
  powerfulTableData: PowerfulTableData<L>,
  filterComponents: FilterComponents
) => {
  const { proxy } = getCurrentInstance() as any

  watch(
    () => [powerfulTableData.currentPage, powerfulTableData.pageSize],
    () => {
      // 切换页面清除表头选中
      if (Array.isArray(filterComponents.value)) {
        filterComponents.value.forEach((item: any) => {
          item.state.value = ''
        })
      }

      get()
    }
  )

  /**
   * 排序方法
   * @param obj https://element-plus.gitee.io/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6 sort-change事件
   */
  const sortChange = (obj: { column: any; prop: string; order: string }) => {
    if (Object.keys(obj.column || {}).length) {
      if (obj.column.sortable == 'custom') {
        emit(EmitEnum.SortCustom, obj)
      }
    }
  }

  /**
   * 批量按钮
   * @returns
   */
  const batchOperate = () => {
    // console.log(powerfulTableData.operate)
    if (
      (powerfulTableData.operate == undefined ||
        powerfulTableData.operate == null) &&
      powerfulTableData.operate !== 0
    ) {
      ElMessage.warning(t(LangKey.SelectOperateType))
      return
    }

    if (powerfulTableData.currentSelect.length == 0) {
      ElMessage.warning(t(LangKey.SelectOperateData))
      return
    }

    ElMessageBox.confirm(
      t<(s: string) => string>(LangKey.BatchOperate)(
        powerfulTableData.operate.operates[powerfulTableData.operate.value || 0]
          .label
      ),
      t(LangKey.Hint),
      {
        confirmButtonText: t(LangKey.Confirm),
        cancelButtonText: t(LangKey.Cancel),
        type: 'warning',
      }
    )
      .then(() => {
        const ids = powerfulTableData.otherSelect
          .concat(powerfulTableData.currentSelect)
          .map((item) => {
            return (item as { [s: string]: string })[
              powerfulTableData.operate.prop || 'id'
            ]
          })
        const rows = powerfulTableData.otherSelect
          .concat(powerfulTableData.currentSelect)
          .map((item) => item)

        emit(EmitEnum.BatchOperate, {
          ids,
          item: powerfulTableData.operate.operates[
            powerfulTableData.operate.value || 0
          ],
          rows,
        })
      })
      .catch(() => {
        // console.log('取消批量操作')
      })
  }

  const returnEmit = (emitName: Extract<EmitType, 'btn-click'>, arg: any) => {
    switch (emitName) {
      case 'btn-click':
        emit(EmitEnum.BtnClick, arg)
        break
    }
  }

  /**
   * 将附属组件（components/src 目录下的文件）中el的事件抛出
   */
  const componentEmit = (e: ComponentEvent, ...arg: any) => {
    emit(EmitEnum.ComponentEvent, e, ...arg)
  }

  /* ------ 回调到组件上 ------ */
  const get = () => {
    const params = {
      pageNum: powerfulTableData.currentPage,
      pageSize: powerfulTableData.pageSize,
    }

    try {
      // 如果父组件是getList方法 无需自定义事件
      proxy.$parent._getList({
        params,
        select: powerfulTableData.otherSelect.concat(
          powerfulTableData.currentSelect
        ),
      })
    } catch {
      emit(EmitEnum.SizeChange, {
        params,
        select: powerfulTableData.otherSelect.concat(
          powerfulTableData.currentSelect
        ),
      })
    }
  }

  /**
   * 添加选中
   * @param e
   */
  const handleSelectionChange = (e: L[]) => {
    powerfulTableData.currentSelect = deepClone(e)
    emit(EmitEnum.SelectionChange, e)
  }

  /**
   * 匹配组件
   * @param {string} type 类型
   * @returns 组件名称
   */
  const matchComponents = (type: string) => {
    return {
      image: 'PTImage',
      btn: 'PTButton',
      switch: 'PTSwitch',
      input: 'PTInput',
      textarea: 'PTInput',
      iconfont: 'PTIcon',
      tag: 'PTTags',
      rate: 'PTRate',
      href: 'PTLink',
      video: 'PTVideo',
    }[type]
  }

  return {
    handleSelectionChange,
    returnEmit,
    componentEmit,
    sortChange,
    batchOperate,
    get,
    matchComponents,
    bindAttr(
      prop: PowerfulTableHeaderProps<'text', L>,
      scope: { $index: number; row: L },
      item: PowerfulTableHeader<L>
    ): {
      row: L
      index: number
      prop: PowerfulTableHeaderProps<'text', L>
      aligning: 'left' | 'center' | 'right'
    } {
      return {
        row: scope.row,
        index: scope.$index,
        prop,
        aligning:
          (item.property?.align as 'left' | 'right' | 'center') ||
          item.headerAlign ||
          'center',
      }
    },
  }
}

export type { StateData, PowerfulTableData, PowerfulTableProps, TranslatePair }
