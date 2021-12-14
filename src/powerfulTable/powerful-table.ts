import {
  PropType
} from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
  PowerfulTableTree,
  PowerfulTableHeaderProps,
  EmitType,
  InjectProps,
} from "../../types/powerful-table";

export const powerfulTableProps = {
  // 按钮组件配置数据
  btnConfig: {
    type: Object,
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

export const powerfulTableEmits  = [
  "btnChange",
  "update:currentPage",
  "sortCustom",
  "batchOperate",
  "switchChange",
  "sizeChange",
  "query",
  "success",
  "add",
  "update",
  "remove",
  "occupyOne",
  "occupyTwo",
  "row-click",
]

export const powerfulTableComponentProp = {
  row: {
    type: Object,
    default: () => {}
  },
  index: Number,
  aligning: {
    type: String,
    default: 'center'
  }
}