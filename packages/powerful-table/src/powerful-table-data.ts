import {
  ref,
  inject,
  reactive,
  PropType,
  getCurrentInstance
} from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
  PowerfulTableTree,
  EmitType,
  InjectProps,
  BtnConfig,
  Size
} from '../../../typings'
import { deepClone } from '../../index';

type DefaultRow = any
type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
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
    default: () => {},
  },
  locale: Object as PropType<PowerFulTableProps<DefaultRow>['locale']>,
  // 组件大小
  size: {
    type: String as PropType<PowerFulTableProps<DefaultRow>['size']>,
    default: '',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val)
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
    default: () => ["id", "id"],
  },

  header: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['header']>,
    default: () => [],
  },

  // 分页数据
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next",
  },
  pageSizes: {
    type: Array as PropType<PowerFulTableProps<DefaultRow>['pageSizes']>,
    default: () => [10, 20, 30],
  },

  // 批量操作
  operateData: {
    type: Object as PropType<PowerFulTableProps<DefaultRow>['operateData']>,
    default: () => {},
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
    default: () => {},
  },
  property: {
    type: Object,
    default: () => {}
  }
}
// 主组件emits
export const powerfulTableEmits  = [
  "btnChange",
  "sortCustom",
  "batchOperate",
  "switchChange",
  "sizeChange",
  "btnClick",
  "row-click",
  "refresh"
]


export const powerfulTableComponentProp = {
  row: {
    type: Object as PropType<DefaultRow>,
    default: () => {}
  },
  index: Number,
  aligning: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  }
}

type PowerfulTableData<L = DefaultRow> = {
  listLoading: boolean;
  develop: boolean[];
  currentPage: number;
  pageSize: number;
  currentSelect: PowerFulTableProps<L>['list'];
  otherSelect: PowerFulTableProps<L>['list'];
  operate: PowerfulTableOperateData;
}

type State<L = DefaultRow> = {
  tableLists: PowerFulTableProps<L>['list'],
  isPC: boolean
  isTable: boolean
}

export function usePowerfulTableState<L>(props: PowerFulTableProps<L>){
  // 全局此组件注入的数据
  const injectProps = inject<InjectProps>("powerfulTable") || {};

  /* ----- 组件实例 ----- */
  const multipleTable = ref<any>(null);
  const configProvider = ref<{locale: PowerFulTableProps<L>['locale']}>();

  /* ------  表格数据  ------ */
  const powerfulTableData = reactive<PowerfulTableData<L>>({
    listLoading: true, //页面是否加载中
    develop: [],       // 展开
    currentPage: 1,    // 当前页
    pageSize: props.pageSizes ? props.pageSizes[0] : 10,  //一页多少条
    currentSelect: [], // 当前页选中
    otherSelect: [],   // 其他页选中
    operate: {  // 承载props的operateData
      value: undefined,
      disabled: false,
      icon: "",
      prop: 'id',
      style: undefined,
      operates: [],
    }
  })

  // 组件参数
  const state = reactive<State<L>>({
    tableLists: [],
    isPC: true,
    isTable: true,
  });

  return {
    multipleTable,
    configProvider,
    powerfulTableData,
    injectProps,
    state
  }
}

export const useFunction = <L>(emit: Function, powerfulTableData: PowerfulTableData<L>) => {
  const { proxy } = getCurrentInstance() as any;

  /**
   * 排序方法
   * @param obj https://element-plus.gitee.io/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6 sort-change事件
   */
  const sortChange = (obj: { column?: any, prop: string, order: any }) => {
    if (Object.keys(obj.column || {}).length) {
      if (obj.column.sortable == "custom") {
        emit("sortCustom", obj);
      }
    }
  };

  /**
   * 批量按钮
   * @returns 
   */
  const batchOperate = () => {
    // console.log(powerfulTableData.operate)
    if (
      (powerfulTableData.operate == undefined || powerfulTableData.operate == null) &&
      powerfulTableData.operate !== 0
    ) {
      proxy.$message({
        message: "请选择操作类型",
        type: "warning",
        duration: 1000,
      });
      return;
    }

    if (powerfulTableData.currentSelect.length == 0) {
      proxy.$message({
        message: "请选择要操作的数据",
        type: "warning",
        duration: 1000,
      });
      return;
    }
    proxy
      .$confirm(`是否要进行批量${powerfulTableData.operate.operates[0].label}操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        let ids = powerfulTableData.otherSelect
          .concat(powerfulTableData.currentSelect)
          .map((item) => (item as {[s: string]: string})[powerfulTableData.operate.prop || 'id']);
        let items = powerfulTableData.otherSelect
          .concat(powerfulTableData.currentSelect)
          .map((item) => item);

        emit("batchOperate", { ids, item: powerfulTableData.operate.operates[0], items });
      })
      .catch(() => {
        // console.log('取消批量操作')
      });
  };

  /**
   * 当前组件的子组件回调 并在此组件暴露出去
   * @param {EmitType} emitName
   * @param objVal 
   */
  const returnEmit = <T>(emitName: EmitType, objVal: T) => {
    // console.log('触发回调', emitName, objVal);

    emit(emitName, objVal);
  };

  /**
   * 行点击操作
   * @param arg 
   */
  const rowClick = (...arg: any) => {
    returnEmit<{row: L, column: any, event: Event}>("row-click", { ...arg });
  };

  /* ------ 回调到组件上 ------ */
  const get = () => {
    let data = {
      pageNum: powerfulTableData.currentPage,
      pageSize: powerfulTableData.pageSize,
    };

    try {
      // 如果父组件是getList方法 无需自定义事件
      proxy.$parent._getList(
        data,
        powerfulTableData.otherSelect.concat(powerfulTableData.currentSelect)
      );
    } catch (error) {
      emit("sizeChange", data, powerfulTableData.otherSelect.concat(powerfulTableData.currentSelect));
    }
  };

  /**
   * 添加选中
   * @param e 
   */
  const handleSelectionChange = (e: L[]) => {
    // console.log('选中', e)
    powerfulTableData.currentSelect = deepClone(e);
  };

  /**
   * 匹配组件
   * @param {string} type 类型
   * @returns 组件名称
   */
  const matchComponents = (type: string) => ({'image': 'PTImage', 'btn': 'PTButton', 'switch': 'PTSwitch', 'input': 'PTInput', 'textarea': 'PTInput', 'iconfont': 'PTIcon', 'tag': 'PTTags', 'rate': 'PTRate', 'href': 'PTLink', 'video': 'PTVideo'}[type])

  return {
    handleSelectionChange,
    rowClick,
    returnEmit,
    sortChange,
    batchOperate,
    get,
    matchComponents
  }
}

export type {
  State,
  PowerfulTableData,
  PowerFulTableProps,
  TranslatePair
}