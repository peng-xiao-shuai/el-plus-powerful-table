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
  BtnConfig
} from "../../types/powerful-table";

// 主组件props
export const powerfulTableProps = {
  // 按钮组件配置数据
  btnConfig: {
    type: Object as PropType<BtnConfig.Config>,
    default: () => {},
  },
  locale: Object as PropType<{
    name: string;
    el: any
  }>,
  // 组件大小
  size: {
    type: String as PropType<"" | "small" | "large" | "medium" | "mini">,
    default: '',
    validator: (val: string) => ['', 'large', 'medium', 'small', 'mini'].includes(val)
  },
  // 当前数据
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
  // 所有选中
  selectData: {
    type: Array,
    default: () => {
      return new Array();
    },
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Function as PropType<(row: any,index: number) => boolean>,
    default: () => undefined,
  },
  selectCompare: {
    type: Array as PropType<string[]>,
    default: () => ["id", "id"],
  },

  header: {
    type: Array as PropType<PowerfulTableHeader[]>,
    default: () => [],
  },

  // 分页数据
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next",
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30],
  },

  // 批量操作
  operateData: {
    type: Object as PropType<PowerfulTableOperateData>,
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
    type: Object as PropType<PowerfulTableTree>,
    default: () => {},
  },
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
    type: Object,
    default: () => {}
  },
  index: Number,
  aligning: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  }
}

export type PowerfulTableData = {
  listLoading: boolean;
  develop: boolean[];
  currentPage: number;
  pageSize: number;
  currentSelect: any[];
  otherSelect: any[];
  operate: PowerfulTableOperateData;
}
export const useState = (props: any) => {
  // 全局此组件注入的数据
  const injectProps = inject<InjectProps>("powerfulTable");

  /* ----- 组件实例 ----- */
  const multipleTable = ref();
  const configProvider = ref<{ locale: { name: string } } | null>(null);

  /* ------  表格数据  ------ */
  const powerfulTableData = reactive<PowerfulTableData>({
    listLoading: true, //页面是否加载中
    develop: [],       // 展开
    currentPage: 1,    // 当前页
    pageSize: props.pageSizes[0],  //一页多少条
    currentSelect: [], // 当前页选中
    otherSelect: [],   // 其他页选中
    operate: {  // 承载props的operateData
      value: undefined,
      disabled: false,
      icon: "",
      style: undefined,
      operates: [],
    }
  })

  // 组件参数
  const state = reactive({
    tableLists: [] as any[],
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

export const useFunction = (emit: Function, powerfulTableData: PowerfulTableData) => {
  const { proxy } = getCurrentInstance() as any;

  /**
   * 排序方法
   * @param obj https://element-plus.gitee.io/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6 sort-change事件
   */
  const sortChange = (obj: any) => {
    if (obj.column) {
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
          .map((item) => item.id);
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
  const returnEmit = (emitName: EmitType, objVal: any) => {
    // console.log('触发回调', emitName, objVal);

    emit(emitName, objVal);
  };

  /**
   * 行点击操作
   * @param arg 
   */
  const rowClick = (...arg: any) => {
    returnEmit("row-click", { ...arg });
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
  const handleSelectionChange = (e: any[]) => {
    // console.log('选中', e)
    powerfulTableData.currentSelect = JSON.parse(JSON.stringify(e));
  };

  /**
   * 匹配组件
   * @param {string} type 类型
   * @returns 组件名称
   */
  const matchComponents = (type: string) => ({'image': 'Image', 'btn': 'Button', 'switch': 'Switch', 'input': 'Input', 'textarea': 'Input', 'iconfont': 'Icon', 'tag': 'Tags', 'rate': 'Rate', 'href': 'Link', 'video': 'Video'}[type])

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