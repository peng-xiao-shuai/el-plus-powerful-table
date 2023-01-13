import type { EmitEnum } from '../packages/powerful-table/src/powerful-table-data'
import type { CSSProperties, Plugin, VNode, VideoHTMLAttributes, h } from 'vue'
import type {
  ButtonProps,
  ElTooltipProps,
  ImageProps,
  InputProps,
  LinkProps,
  PaginationProps,
  RateProps,
  SwitchProps,
  TableColumnCtx,
  TableProps,
  TagProps,
} from 'element-plus'
/* ------ props ------ */
export interface PowerfulTableProps<Row = any> {
  list: Row[]
  btnConfig?: BtnConfig.Config
  size?: Size
  selectData?: any[]
  isSelect?: boolean
  selectable?: (row: Row, index: number) => boolean
  selectCompare?: string[]
  header: PowerfulTableHeader<Row>[]
  operateData?: PowerfulTableOperateData
  isPagination?: boolean
  tree?: PowerfulTableTree
  paginationProperty?: any
  property?: Partial<TableProps>
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
  prop?: string
  style?: CSSProperties
  selectProperty?: InstanceType<
    typeof import('element-plus')['ElSelect']
  >['$props']
  btnProperty?: Partial<ButtonProps>
  operates: PowerfulTableLabelValue[]
}

/* ------ header 表格头部数据 ------ */
// header 表格头部数据
export interface PowerfulTableHeader<Row = any> {
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
  props:
    | PowerfulTableHeaderProps<null, Row>[]
    | PowerfulTableHeaderProps<null, Row>
  property?: Partial<TableColumnCtx<Row>>
}

export type SetDataType<T extends keyof _TYPE, Row = any> = {
  [key in keyof _TYPE<Row>[T]]: _TYPE<Row>[T][key]
}
// props 单元格数据
export interface PowerfulTableHeaderProps<
  T extends keyof _TYPE | null | undefined,
  Row = any
> {
  prop: string
  data?: SetDataType<T, Row>
  type?: keyof _TYPE
  // eslint-disable-next-line prettier/prettier
  filters?:
    | PowerfulTableFilter[]
    | ((row: Row, index?: number) => string | number)
  text?: string
  slotName?: string
  render?: (h: h, row: Row, index: number) => VNode | string | number
  reserve?: string | HTMLElement
  style?: CSSProperties
  filterItem?: boolean // 指定过滤项
  filtersType?: 'select' | 'date' | 'input'
}

export type _TYPE<Row = any> = {
  image: ImageDataType<Row>
  text: TextDataType<Row>
  switch: SwitchDataType<Row>
  btn: BtnDataType<Row>[] | (BtnDataType<Row>[] | BtnDataType<Row>)[]
  video: VideoDataType<Row>
  input: InputDataType<Row>
  iconfont: IconFontDataType
  tag: TagDataType<Row>
  rate: RateDataType<Row>
  href: LinkDataType<Row>
  slot: null
  textarea: InputDataType<Row>
}

export type PowerfulTableFilter = {
  key: string | number
  value: string
}

type ElComponentProp<T extends keyof _TYPE, P = any, Row = any> =
  | Partial<P>
  | (({
      row,
      index,
      props,
    }: {
      row: Row
      index: number
      props: PowerfulTableHeaderProps<T, Row>
    }) => Partial<P>)

export type TextDataType<Row = any> = {
  line?: number
  develop?: boolean
  customFilterFun?: ({
    row,
    index,
    props,
  }: {
    row: Row
    index?: number
    props: PowerfulTableHeaderProps<'text'>
  }) => string | number
}

export type ImageDataType<Row = any> = {
  style: CSSProperties
  property?: ElComponentProp<'image', ImageProps, Row>
}

export type BtnDataType<Row = any> = {
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
      row: Row
      index: number
      btnIndex: number[]
      props: PowerfulTableHeaderProps
      params: any
    },
    resolve: (value: unknown) => void
  ) => void
  isMore?: boolean
  style?: CSSProperties
  showBtn?: ((row: Row, index: number) => boolean) | boolean
  params?: any
  tipProperty?: Partial<ElTooltipProps>
  property?: ElComponentProp<'btn', ButtonProps, Row>
}

export type SwitchDataType<Row = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'switch', SwitchProps, Row>
}

export type InputDataType<Row = any> = {
  symbol?: string
  style?: CSSProperties
  slot?: 'prepend' | 'append' | 'prefix' | 'suffix'
  property?: ElComponentProp<'input', InputProps, Row>
}

export type VideoDataType<Row = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'video', VideoHTMLAttributes, Row>
}

export type IconFontDataType = {
  class?: string[] | string
  style?: CSSProperties
}

export type RateDataType<Row = any> = {
  style?: CSSProperties
  property?: ElComponentProp<'rate', RateProps, Row>
}

export type LinkDataType<Row = any> = {
  target?: '_self' | '_blank' | '_parent' | '_top'
  style?: CSSProperties
  text?: string | ((row: Row) => string)
  property?: ElComponentProp<'href', LinkProps, Row>
}

export type TagDataType<Row = any> = {
  style?: CSSProperties
  color?: (row: Row, tag: string) => string
  number?: number
  property?: ElComponentProp<'tag', TagProps, Row>
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
    effect?: any
    showBtn?: (() => boolean) | boolean
    beforeClick?: (
      {
        btnItem,
        rows,
      }: {
        btnItem: BtnList
        rows: Row
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

export type EmitType = `${EmitEnum}`
// 自定义事件类型
export type EmitEventType<Row> = {
  (
    e: EmitEnum.BtnPlusChange,
    payload: { effect: BtnConfig.BtnList['effect']; rows: Row[] }
  ): void
  (e: EmitEnum.BtnPlusRefresh): void
  (
    e: EmitEnum.BtnClick,
    payload: { params: BtnDataType['params']; row: Row; index: number }
  ): void
  (
    e: EmitEnum.SizeChange,
    payload: {
      params: { pageNum: number; pageSize: number }
      select: Row[]
    }
  ): void
  (
    e: EmitEnum.ComponentEvent,
    componentEvent: ComponentEvent,
    ...args: any
  ): void
  (
    e: EmitEnum.BatchOperate,
    payload: {
      ids: (string | number)[]
      item: PowerfulTableLabelValue
      rows: Row[]
    }
  ): void
  (e: EmitEnum.Select, ...args: any): void
  (e: EmitEnum.SelectionChange, ...args: any): void
  (e: EmitEnum.SelectAll, ...args: any): void
  (e: EmitEnum.CellMouseEnter, ...args: any): void
  (e: EmitEnum.CellMouseLeave, ...args: any): void
  (e: EmitEnum.CellClick, ...args: any): void
  (e: EmitEnum.CellDblclick, ...args: any): void
  (e: EmitEnum.CellContextmenu, ...args: any): void
  (e: EmitEnum.RowClick, ...args: any): void
  (e: EmitEnum.RowContextmenu, ...args: any): void
  (e: EmitEnum.RowDblclick, ...args: any): void
  (e: EmitEnum.HeaderClick, ...args: any): void
  (e: EmitEnum.HeaderContextmenu, ...args: any): void
  (e: EmitEnum.FilterChange, ...args: any): void
  (e: EmitEnum.CurrentChange, ...args: any): void
  (e: EmitEnum.HeaderDragend, ...args: any): void
  (e: EmitEnum.ExpandChange, ...args: any): void
  (
    e: EmitEnum.SortCustom,
    payload: { column: any; prop: string; order: string }
  ): void
}
