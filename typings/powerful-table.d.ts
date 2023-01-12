import type {
  CSSProperties,
  Component,
  Plugin,
  VNode,
  VideoHTMLAttributes,
  h,
} from 'vue'
import type {
  ButtonProps,
  ElTooltipProps,
  ImageProps,
  InputProps,
  LinkProps,
  RateProps,
  SwitchProps,
  TableProps,
  TagProps,
} from 'element-plus/es'

/* ------ props ------ */
export interface PowerfulTableProps<L = any> {
  list: L[]
  pageSizes?: number[]
  total?: number
  btnConfig?: BtnConfig.Config
  size?: Size
  selectData?: any[]
  isSelect?: boolean
  selectable?: (row: L, index: number) => boolean
  selectCompare?: string[]
  header: PowerfulTableHeader<L>[]
  layout?: string
  operateData?: PowerfulTableOperateData
  isPagination?: boolean
  tree?: PowerfulTableTree
  property?: Partial<TableProps<L>>
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
  style?: CSSProperties
  operates: PowerfulTableLabelValue[]
}

/* ------ header 表格头部数据 ------ */
// header 表格头部数据
export interface PowerfulTableHeader<L = any> {
  overflowTooltip?: boolean
  label: string
  defaultShow?: boolean // 当前列是否可以操作列显示隐藏
  defaultFilter?: boolean // 当前列是否在表头显示过滤按钮
  minWidth?: string | number
  width?: string | number
  isShowOrFilterColumn?: false | 'show' | 'filter'
  sortable?: boolean | 'custom'
  fixed?: boolean | 'left' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  headerSlotName?: string
  props: PowerfulTableHeaderProps<null, L>[] | PowerfulTableHeaderProps<null, L>
  property?: any
}

export type SetDataType<T extends keyof _TYPE, L = any> = {
  [key in keyof _TYPE<L>[T]]: _TYPE<L>[T][key]
}
// props 单元格数据
export interface PowerfulTableHeaderProps<
  T extends keyof _TYPE | null | undefined,
  L = any
> {
  prop: string
  data?: SetDataType<T, L>
  type?: keyof _TYPE
  // eslint-disable-next-line prettier/prettier
  filters?:
    | PowerfulTableFilter[]
    | ((row: L, index?: number) => string | number)
  text?: string
  slotName?: string
  render?: (h: h, row: L, index: number) => VNode | string | number
  reserve?: string | HTMLElement
  style?: CSSProperties
  filterItem?: boolean // 指定过滤项
  filtersType?: 'select' | 'date'
  property?: any
}

export type _TYPE<L = any> = {
  image: ImageDataType<L>
  text: TextDataType<L>
  switch: SwitchDataType<L>
  btn: BtnDataType<L>[] | (BtnDataType<L>[] | BtnDataType<L>)[]
  video: VideoDataType<L>
  input: InputDataType<L>
  iconfont: IconFontDataType
  tag: TagDataType<L>
  rate: RateDataType<L>
  href: LinkDataType<L>
  slot: null
  textarea: InputDataType<L>
}

export type PowerfulTableFilter = {
  key: string | number
  value: string
}

type ElComponentProp<T extends keyof _TYPE, P = any, L = any> =
  | Partial<P>
  | (({
      row,
      index,
      props,
    }: {
      row: L
      index: number
      props: PowerfulPTableHeaderProps<T, L>
    }) => Partial<P>)

export type TextDataType<L = any> = {
  line?: number
  develop?: boolean
  customFilterFun?: ({
    row,
    index,
    props,
  }: {
    row: L
    index?: number
    props: PowerfulTableHeaderProps<'text'>
  }) => string | number
}

export type ImageDataType<L = any> = {
  style: CSSProperties
  property?: ElComponentProp<'image', ImageProps, L>
}

export type BtnDataType<L = any> = {
  tip?: string
  text: string
  beforeClick?: (
    {
      row,
      index,
      btnIndex,
      props,
      params,
    }: {
      row: L
      index: number
      btnIndex: number[]
      props: PowerfulTableHeaderProps
      params: any
    },
    resolve: (value: unknown) => void
  ) => void
  isMore?: boolean
  style?: CSSProperties
  showBtn?: ((row: L, index: number) => boolean) | boolean
  params?: any
  tipProperty?: Partial<ElTooltipProps>
  property?: ElComponentProp<'btn', ButtonProps, L>
}

export type SwitchDataType<L = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'switch', SwitchProps, L>
}

export type InputDataType<L = any> = {
  symbol?: string
  style?: CSSProperties
  slot?: 'prepend' | 'append' | 'prefix' | 'suffix'
  property?: ElComponentProp<'input', InputProps, L>
}

export type VideoDataType<L = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'video', VideoHTMLAttributes, L>
}

export type IconFontDataType = {
  class?: string[] | string
  style?: CSSProperties
}

export type RateDataType<L = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'rate', RateProps, L>
}

export type LinkDataType<L = any> = {
  target?: '_self' | '_blank' | '_parent' | '_top'
  style?: CSSProperties
  text?: string | ((row: L) => string)
  property?: ElComponentProp<'href', LinkProps, L>
}

export type TagDataType<L = any> = {
  style?: CSSProperties
  color?: (row: L, tag: string) => string
  number?: number
  property?: ElComponentProp<'tag', TagProps, L>
}

export interface LangPackages {
  [s: string]: {
    [s: string]: string | ((...arg: any) => string)
  }
}
// 组件注入数据
export type InjectProps = {
  locale?: LangPackages
  btnSlot?: 'left' | 'right' | 'none' // 控制所有的组件 显示左侧或右侧操作按钮
}

// btnPlus组件
export namespace BtnConfig {
  export type BtnList = {
    style?: CSSProperties
    disabled?: boolean
    operateType?: 'none' | 'single' | 'batch'
    text?: string
    effect?: string
    showBtn?: (() => boolean) | boolean
    beforeClick?: (
      {
        btnItem,
        rows,
      }: {
        btnItem: BtnList
        rows: L
      },
      resolve: (value: unknown) => void
    ) => void
    property?: object
  }
  export type Config = {
    btnSlot?: 'left' | 'right' | 'all'
    btnList: BtnList[]
  }
}

export type SFCWithInstall<T> = T & Plugin

export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = '' | 'large' | 'default' | 'small'
// 自定义事件类型
export type EmitEventType<Row> = {
  (
    e: 'btn-plus-change',
    payload: { effect: BtnConfig.BtnList['effect']; rows: any[] }
  ): void
  (e: 'btn-plus-refresh'): void
  (
    e: 'btn-click',
    payload: { params: BtnDataType['params']; row: Row; index: number }
  ): void
  (e: 'switch-change', row: Row): void
  (
    e: 'size-change',
    payload: {
      params: { pageNum: number; pageSize: number }
      select: Row[]
    }
  ): void
  (e: 'component-event', componentEvent: ComponentEvent, ...args: any): void
  (e: 'sort-custom', payload: { column?: any; prop: string; order: any }): void
  (
    e: 'batch-operate',
    payload: {
      ids: (string | number)[]
      item: PowerfulTableLabelValue
      items: Row[]
    }
  ): void
  (e: 'row-click', ...args: any): void
}
export type EmitType =
  | 'btn-plus-change'
  | 'btn-plus-refresh'
  | 'btn-click'
  | 'switch-change'
  | 'size-change'
  | 'component-emit'
  | 'sort-custom'
  | 'batch-operate'
  | 'row-click'
