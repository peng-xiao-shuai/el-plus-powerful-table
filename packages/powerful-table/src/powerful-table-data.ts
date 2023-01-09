import { getCurrentInstance, inject, reactive, ref } from 'vue'
import { configProviderContextKey } from 'element-plus'
import { deepClone } from '../../index'
import { PowerfulTableSymbol } from '../../keys'
import type { PropType } from 'vue'
import type {
  BtnConfig,
  EmitEventType,
  EmitType,
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
  PowerfulTableOperateData,
  PowerfulTableTree,
  Size,
  _TYPE,
} from '../../../typings'
import { LangKey, t } from '~/locale/lang'

type DefaultRow = any
type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}
export type ComponentEvent = {
  componentName: keyof _TYPE | 'filter'
  eventType: string
}

interface PowerFulTableProps<L> {
  btnConfig?: BtnConfig.Config
  locale?: { name: string; el: TranslatePair }
  size?: Size
  list: L[]
  selectData?: L[]
  isSelect?: boolean
  selectable?: (row: L, index: number) => boolean
  selectCompare?: string[]
  header: PowerfulTableHeader[]
  layout?: string
  pageSizes?: number[]
  operateData?: PowerfulTableOperateData
  isPagination?: boolean
  total?: number
  tree?: PowerfulTableTree
  property?: object
}

// 主组件props
export const powerfulTableProps = {
  // 按钮组件配置数据
  btnConfig: {
    type: Object as PropType<PowerFulTableProps<DefaultRow>['btnConfig']>,
    default: () => [{}],
  },
  locale: Object as PropType<PowerFulTableProps<DefaultRow>['locale']>,
  // 组件大小
  size: {
    type: String as PropType<PowerFulTableProps<DefaultRow>['size']>,
    default: '',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  // 当前数据
  list: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['list']>,
    default: () => [],
  },
  // 所有选中
  selectData: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['list']>,
    default: () => {
      return () => []
    },
  },
  isSelect: {
    type: Boolean as PropType<PowerFulTableProps<DefaultRow>['isSelect']>,
    default: false,
  },
  selectable: {
    type: Function as PropType<PowerFulTableProps<DefaultRow>['selectable']>,
    default: undefined,
  },
  selectCompare: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['selectCompare']>,
    default: () => ['id', 'id'],
  },

  header: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['header']>,
    default: () => [],
  },

  // 分页数据
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next',
  },
  pageSizes: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['pageSizes']>,
    default: () => [10, 20, 30],
  },

  // 批量操作
  operateData: {
    type: Object as PropType<PowerFulTableProps<DefaultRow>['operateData']>,
    default: () => [{}],
  },
  isPagination: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  tree: {
    type: Object as PropType<PowerFulTableProps<DefaultRow>['tree']>,
    default: () => ({}),
  },
  property: {
    type: Object,
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
  componentName: keyof _TYPE | 'filter'
) => {
  const REmit = (eventType: string, ...arg: any) => {
    emit(
      'component-emit',
      {
        componentName,
        eventType,
      },
      ...arg
    )
  }

  return {
    REmit,
  }
}

interface PowerfulTableData<L = DefaultRow> {
  listLoading: boolean
  develop: boolean[]
  currentPage: number
  pageSize: number
  currentSelect: PowerFulTableProps<L>['list']
  otherSelect: PowerFulTableProps<L>['list']
  operate: PowerfulTableOperateData
}

interface StateData<L = DefaultRow> {
  tableLists: PowerFulTableProps<L>['list']
  isPC: boolean
  isTable: boolean
}

export const usePowerfulTableStates = <L>(props: PowerFulTableProps<L>) => {
  // 全局此组件注入的数据
  const injectProps = inject(PowerfulTableSymbol, {})

  /* ----- 组件实例 ----- */
  const multipleTable = ref<any>(null)
  const filterComponents = ref<any>(null)

  /* ------  表格数据  ------ */
  const powerfulTableData: PowerfulTableData<L> = reactive({
    listLoading: true, //页面是否加载中
    develop: [], // 展开
    currentPage: 1, // 当前页
    pageSize: props.pageSizes ? props.pageSizes[0] : 10, //一页多少条
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

  return {
    Size:
      props.size || inject(configProviderContextKey)?.value?.size || 'small',
    multipleTable,
    filterComponents,
    powerfulTableData,
    injectProps,
    stateData,
  }
}

export const useFunction = <L>(
  emit: EmitEventType<L>,
  powerfulTableData: PowerfulTableData<L>
) => {
  const { proxy } = getCurrentInstance() as any

  /**
   * 排序方法
   * @param obj https://element-plus.gitee.io/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6 sort-change事件
   */
  const sortChange = (obj: { column?: any; prop: string; order: any }) => {
    if (Object.keys(obj.column || {}).length) {
      if (obj.column.sortable == 'custom') {
        emit('sort-custom', obj)
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
      proxy.$message({
        message: t(LangKey.SelectOperateType),
        type: 'warning',
        duration: 1000,
      })
      return
    }

    if (powerfulTableData.currentSelect.length == 0) {
      proxy.$message({
        message: t(LangKey.SelectOperateData),
        type: 'warning',
        duration: 1000,
      })
      return
    }
    proxy
      .$confirm(
        t<(s: string) => string>(LangKey.BatchOperate)(
          powerfulTableData.operate.operates[0].label
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
        const items = powerfulTableData.otherSelect
          .concat(powerfulTableData.currentSelect)
          .map((item) => item)

        emit('batch-operate', {
          ids,
          item: powerfulTableData.operate.operates[0],
          items,
        })
      })
      .catch(() => {
        // console.log('取消批量操作')
      })
  }

  const returnEmit = (
    emitName: Extract<EmitType, 'btn-click' | 'switch-change'>,
    arg: any
  ) => {
    switch (emitName) {
      case 'btn-click':
        emit('btn-click', arg)
        break
      case 'switch-change':
        emit('switch-change', arg)
        break
    }
  }

  /**
   * 将附属组件（components/src 目录下的文件）中el的事件抛出
   */
  const componentEmit = (e: ComponentEvent, ...arg: any) => {
    emit('component-event', e, ...arg)
  }

  /**
   * 行点击操作
   * @param arg
   */
  const rowClick = (...arg: any) => {
    emit('row-click', ...arg)
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
      emit('size-change', {
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
    // console.log('选中', e)
    powerfulTableData.currentSelect = deepClone(e)
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
    rowClick,
    returnEmit,
    componentEmit,
    sortChange,
    batchOperate,
    get,
    matchComponents,
    bindAttr(
      prop: PowerfulTableHeaderProps<null, L>,
      scope: { $index: number; row: L },
      item: PowerfulTableHeader<L>
    ): {
      row: L
      index: number
      prop: PowerfulTableHeaderProps<null, L>
      aligning: 'left' | 'center' | 'right'
    } {
      return {
        row: scope.row,
        index: scope.$index,
        prop,
        aligning: item.property?.align || item.headerAlign || 'center',
      }
    },
  }
}

export type { StateData, PowerfulTableData, PowerFulTableProps, TranslatePair }
