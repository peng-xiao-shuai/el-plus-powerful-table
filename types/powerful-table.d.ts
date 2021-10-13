/* ------ props ------ */
export interface PowerfulTable {
  list: any[];
  pageSizes: number[];
  total: number
  selectData?: any[];
  isSelect?: boolean;
  selectCompare?: string[];
  header: PowerfulTableHeader[];
  layout?: string;
  operateData?: PowerfulTableOperateData;
  isPagination?: boolean;
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
export interface PowerfulTableHeader {
  overflowTooltip?: boolean;
  label: string;
  minWidth?: string | number;
  width?: string | number;
  sortable?: boolean | 'custom';
  fixed?: boolean | 'left' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  props: PowerfulTableHeaderProps[];
}
// props 单元格数据
export interface PowerfulTableHeaderProps {
  prop: string;
  data?: TextDataType | ImageDataType | BtnDataType[] | SwitchDataType | InputDataType | VideoDataType | IconFontDataType | RateDataType | HrefDataType | SlotDataType | TagDataType;
  child?: string;
  type?: Type;
  filter?: PowerfulTableFilter[];
  text?: string;
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
  customFilterFun?: Function;
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
  showBtn?: Function | boolean;
  emit: EmitType
}

export type SwitchDataType = {
  activeColor?: string;
  inactiveColor?: string;
  inactiveText?: string;
  activeText?: string;
  activeValue?: number;
  inactiveValue?: number;
  disabled?: boolean | Function;
  style?: {};
  beforeFunction?: Function;
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
  poster?: string;
  loop?: boolean;
  style?: {};
}

export type IconFontDataType = {
  class: string[];
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
  prop?: string;
}

export type SlotDataType = {
  slotName: string;
}

export type TagDataType = {
  type?: ThemeType;
  effect?: 'dark' | 'light' | 'plain';
  color?: Function;
  hit?: boolean;
  number?: number;
  filter?: PowerfulTableFilter[]
}

type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type EmitType = 'query' | 'success' | 'add' | 'update' | 'remove' | 'occupyOne' | 'occupyTwo'