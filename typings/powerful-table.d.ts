import type { Component, Plugin, VNode, h } from 'vue'

/* ------ props ------ */
export interface PowerfulTableData<L> {
  list: L[]
  pageSizes: number[]
  total: number
  size?: Size
  selectData?: any[]
  isSelect?: boolean
  selectable?: (row: any, index: number) => boolean
  selectCompare?: string[]
  header: PowerfulTableHeader<L>[]
  layout?: string
  operateData?: PowerfulTableOperateData
  isPagination?: boolean
  tree?: PowerfulTableTree
  property?: any
}

/* ------ tree 树结构数据 ------ */
export type PowerfulTableTree = {
  lazy?: boolean
  load?: (row, treeNode, resolve) => void
  props?: object
}

/* ------ operateData 批量操作 ------ */
// operates 批量操作下拉框数据
export type PowerfulTableLabelValue = {
  label: string
  value: string | number
  [s: string]: string | number
}
// operateData 批量操作
export interface PowerfulTableOperateData {
  value?: number | ''
  type?: ThemeType
  disabled?: boolean
  prop?: string
  icon?: string | Component
  style?: StyleValue
  operates: PowerfulTableLabelValue[]
}

/* ------ header 表格头部数据 ------ */
// header 表格头部数据
export interface PowerfulTableHeader<L = any> {
  overflowTooltip?: boolean
  label: string
  isShowColumn?: boolean // 当前列是否可以操作列显示隐藏
  isFilterColumn?: boolean // 当前列是否在表头显示过滤按钮
  minWidth?: string | number
  width?: string | number
  isShowOrFilterColumn?: false | 'show' | 'filter'
  sortable?: boolean | 'custom'
  fixed?: boolean | 'left' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  headerSlotName?: string
  props: PowerfulTableHeaderProps<L>[] | PowerfulTableHeaderProps<L>
  property?: any
}
// props 单元格数据
export interface PowerfulTableHeaderProps<L = any, D = any> {
  prop: string
  data?: D
  type?: Type
  // eslint-disable-next-line prettier/prettier
  filters?: PowerfulTableFilter[] | ((row: L, index?: number) => string | number);
  text?: string
  slotName?: string
  render?: (h: h, row: L, index: number) => VNode | string | number
  reserve?: string | HTMLElement
  style?: StyleValue
  filterItem?: boolean // 指定过滤项
  filtersType?: 'select' | 'date'
  property?: any
}

export type Type =
  | 'image'
  | 'text'
  | 'switch'
  | 'btn'
  | 'video'
  | 'input'
  | 'iconfont'
  | 'tag'
  | 'rate'
  | 'href'
  | 'slot'
  | 'textarea'

export type PowerfulTableFilter = {
  key: string | number
  value: string
}

export type TextDataType = {
  line?: number
  develop?: boolean
  customFilterFun?: (row: any, index?: number) => string | number
}

export type ImageDataType = {
  preview?: boolean
  lazy?: boolean
  zIndex?: number
  style?: StyleValue
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  property?: object
}

export type BtnDataType = {
  tip: string
  icon?: string | Component
  disabled?: boolean
  text?: string
  isMore?: boolean
  style?: StyleValue
  type?: ThemeType
  showBtn?: ((row: any, index?: number) => boolean) | boolean
  emit?: EmitType
  isTooltip?: boolean
  isConfirmTip?: boolean
  confirmTip?: string
  params?: any
  property?: object
}

export type SwitchDataType = {
  activeColor?: string
  inactiveColor?: string
  inactiveText?: string
  activeText?: string
  activeValue?: number | string
  inactiveValue?: number | string
  disabled?: boolean | ((row: any) => boolean)
  style?: StyleValue
  isConfirmTip?: boolean
  confirmTip?: string
  beforeFunction?: (
    row: any,
    value: number | string,
    oldValue: number | string
  ) => boolean
  property?: object
}

export type InputDataType = {
  type?: string
  symbol?: string
  placeholder?: string
  rows?: string | number
  disabled?: boolean
  style?: StyleValue
  slot?: 'prepend' | 'append'
  property?: object
}

export type VideoDataType = {
  poster?: ((row: any, index?: number) => string) | string
  loop?: boolean
  style?: StyleValue
  property?: object
}

export type IconFontDataType = {
  class?: string[] | string
  style?: StyleValue
}

export type RateDataType = {
  max?: number
  style?: StyleValue
  colors?: string[]
  iconClass?: string[]
  allowHalf?: boolean
  showText?: boolean
  showScore?: boolean
  texts?: string[]
  property?: object
}

export type LinkDataType = {
  target?: '_self' | '_blank' | '_parent' | '_top'
  style?: StyleValue
  type?: ThemeType
  icon?: Component
  underline?: boolean
  text?: string | ((row: any) => string)
  property?: object
}

export type TagDataType = {
  type?: ThemeType
  style?: StyleValue
  effect?: 'dark' | 'light' | 'plain'
  color?: (row: any, tag: string) => string
  hit?: boolean
  number?: number
  property?: object
}

export interface LangPackages {
  [s: string]: {
    [s: string]: string | ((...arg: any) => string)
  }
}
// 组件注入数据
export type InjectProps = {
  size?: Size
  locale?: LangPackages
  btnSlot?: 'left' | 'right' | 'none' // 控制所有的组件 显示左侧或右侧操作按钮
}

// btnPlus组件
export namespace BtnConfig {
  export type BtnList = {
    type?: ThemeType
    icon?: string | Component
    style?: StyleValue
    disabled?: boolean
    operateType?: 'none' | 'single' | 'batch'
    text?: string
    showTip?: boolean
    effect?: string
    showBtn?: (() => boolean) | boolean
    tipContent?: string
    property?: object
  }
  export type Config = {
    hidden?: 'left' | 'right' | 'none'
    btnSlot?: 'left' | 'right' | 'all'
    btnList: BtnList[]
  }
}

export type SFCWithInstall<T> = T & Plugin

export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = '' | 'large' | 'default' | 'small'
export type EmitType =
  | 'query'
  | 'success'
  | 'add'
  | 'update'
  | 'remove'
  | 'occupyOne'
  | 'occupyTwo'
  | 'row-click'
