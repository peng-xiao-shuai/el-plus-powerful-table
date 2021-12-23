import { VNode, Plugin, App } from "@vue/runtime-core"
declare module 'el-plus-powerful-table-ts' {
  const PowerfulTable: {
    install: (app: App<any>, opt: any) => void;
  }
  export default PowerfulTable
}

/* ------ props ------ */
export interface PowerfulTableData<L> {
  list: L[];
  pageSizes: number[];
  total: number
  size?: Size;
  locale?: string,
  selectData?: any[];
  isSelect?: boolean;
  selectCompare?: string[];
  header: PowerfulTableHeader<L>[];
  layout?: string;
  operateData?: PowerfulTableOperateData;
  isPagination?: boolean;
  tree?: PowerfulTableTree;
}

/* ------ tree 树结构数据 ------ */
export type PowerfulTableTree = {
  lazy?: boolean;
  load?: (row: any, treeNode: any, resolve: Function) => void;
  props?: {}
}

/* ------ operateData 批量操作 ------ */
// operates 批量操作下拉框数据
export type PowerfulTableLabelValue = {
  label: string;
  value: string;
  [s: string]: string
}
// operateData 批量操作
export interface PowerfulTableOperateData {
  value?: number;
  type?: ThemeType;
  disabled?: boolean;
  icon?: string;
  style?: {};
  operates: PowerfulTableLabelValue[]
}

/* ------ header 表格头部数据 ------ */
// header 表格头部数据
export interface PowerfulTableHeader<L = any> {
  overflowTooltip?: boolean;
  label: string;
  hidden?: boolean;
  minWidth?: string | number;
  width?: string | number;
  isShowOrFilterColumn?: false | 'show' | 'filter';
  sortable?: boolean | 'custom';
  fixed?: boolean | 'left' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  headerSlotName?: string;
  props: PowerfulTableHeaderProps<L>[] | PowerfulTableHeaderProps<L>;
}
// props 单元格数据
export interface PowerfulTableHeaderProps<L = any, D = any> {
  prop: string;
  data?: D;
  type?: Type;
  filter?: PowerfulTableFilter[] | ((row: L, index?: number) => string | number);
  text?: string;
  slotName?: string;
  render?: (h: Function, row: L, index: number) => VNode | string | number;
  reserve?: string | HTMLElement;
  style?: {};
  filterItem?: boolean;
  filtersType?: 'select' | 'date'
}

type Type = 'image' | 'text' | 'switch' | 'btn' | 'video' | 'input' | 'iconfont' | 'tag' | 'rate' | 'href' | 'slot' | 'textarea'

export type PowerfulTableFilter = {
  key: string | number;
  value: string
}

export type TextDataType = {
  line?: number;
  develop?: boolean;
  customFilterFun?: (row: any, index?: number) => string | number;
}

export type ImageDataType = {
  preview?: boolean;
  lazy?: boolean;
  zIndex?: number;
  style?: {};
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export type BtnDataType = {
  tip: string;
  icon?: string;
  disabled?: boolean;
  text?: string;
  isMore?: boolean;
  style?: {};
  type?: ThemeType;
  showBtn?: ((row: any, index?: number) => boolean) | boolean;
  emit?: EmitType
}

export type SwitchDataType = {
  activeColor?: string;
  inactiveColor?: string;
  inactiveText?: string;
  activeText?: string;
  activeValue?: number | string;
  inactiveValue?: number | string;
  disabled?: boolean | ((row: any) => boolean);
  style?: {};
  beforeFunction?: (row: any, value: number | string, oldValue: number | string) => boolean;
}

export type InputDataType = {
  symbol?: string;
  placeholder?: string;
  rows?: string | number;
  disabled?: boolean;
  style?: {};
  slot?: 'prepend' | 'append';
}

export type VideoDataType = {
  poster?: ((row: any, index?: number) => string) | string;
  loop?: boolean;
  style?: {};
}

export type IconFontDataType = {
  class?: string[] | string;
  style?: {};
}

export type RateDataType = {
  max?: number;
  style?: {};
  colors?: string[];
  iconClass?: string[];
  allowHalf?: boolean;
  showText?: boolean;
  showScore?: boolean;
  texts?: string[]
}

export type HrefDataType = {
  target?: string;
  style?: {};
  type?: ThemeType;
  underline?: boolean;
  text?: string | ((row: any) => string)
}

export type TagDataType = {
  type?: ThemeType;
  effect?: 'dark' | 'light' | 'plain';
  color?: (row: any, tag: string) => string;
  hit?: boolean;
  number?: number;
  filter?: PowerfulTableFilter[]
}

// 组件注入数据
export type InjectProps = {
  size?: Size;
  locale: {
    name: string;
    el: any
  }
}

// btnPlus组件
export namespace BtnConfig {
  export type BtnList = {
    type?: ThemeType;
    icon?: '';
    style?: {};
    disabled?: boolean;
    operateType: 'none' | 'single' | 'batch';
    tip: string
  }
  export type Config = {
    hidden?: 'left' | 'right' | 'none',
    btnList: BtnList[]
  }
}

export type SFCWithInstall<T> = T & Plugin

type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type Size = '' | 'large' | 'medium' | 'small' | 'mini'
type EmitType = 'query' | 'success' | 'add' | 'update' | 'remove' | 'occupyOne' | 'occupyTwo' | 'row-click'