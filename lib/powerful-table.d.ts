import { VNode, Plugin, App } from "@vue/runtime-core"
declare module 'el-plus-powerful-table-ts' {
  const PowerfulTable: {
    install: (app: App<any>, opt: any) => void;
  }
  export default PowerfulTable
}

/* ------ props ------ */
export interface PowerfulTableData {
  list: any[];
  pageSizes: number[];
  total: number
  size?: string,
  locale?: string,
  selectData?: any[];
  isSelect?: boolean;
  selectCompare?: string[];
  header: PowerfulTableHeader[];
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
export interface PowerfulTableHeader<U = any> {
  overflowTooltip?: boolean;
  label: string;
  minWidth?: string | number;
  width?: string | number;
  sortable?: boolean | 'custom';
  fixed?: boolean | 'left' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  headerSlotName?: string 
  props: PowerfulTableHeaderProps<any, U>[];
}
// props 单元格数据
export interface PowerfulTableHeaderProps<T, U = any> {
  prop: string;
  data?: T;
  child?: string;
  type?: Type;
  filter?: PowerfulTableFilter[] | ((row: any, index?: number) => string | number);
  text?: string;
  slotName?: string;
  render?: (h: Function, row: U,index: number) => VNode | string | number;
  reserve?: string | HTMLElement;
  style?: {};
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
  style?: {};
  type?: ThemeType,
  showBtn?: ((row: any, index?: number) => boolean) | boolean;
  emit: EmitType
}

export type SwitchDataType = {
  activeColor?: string;
  inactiveColor?: string;
  inactiveText?: string;
  activeText?: string;
  activeValue?: number;
  inactiveValue?: number;
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
  size?: 'medium' | 'small' | 'mini';
  locale: Object
}

export type SFCWithInstall<T> = T & Plugin

type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type EmitType = 'query' | 'success' | 'add' | 'update' | 'remove' | 'occupyOne' | 'occupyTwo' | 'row-click'