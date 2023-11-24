import type { ElTable, InputInstance } from 'element-plus/es'
import type { EmitEnum } from '../powerful-table/src/powerful-table-data'
import type {
  CSSProperties,
  Component,
  Plugin,
  SetupContext,
  VNode,
  WatchStopHandle,
  VideoHTMLAttributes,
  h as createElement,
} from 'vue'
import type { FDatePicker, FInput, FSelect } from '../filter'
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
  TreeNode,
} from 'element-plus'

export interface PowerfulTableData<Row = any> {
  listLoading: boolean
  develop: boolean[]
  currentPage: number
  pageSize: number
  watchCache: WatchStopHandle[]
  currentSelect: PowerfulTableProps<Row>['list']
  otherSelect: PowerfulTableProps<Row>['list']
  operate: PowerfulTableOperateData
  total: number
}

export interface StateData<Row = any> {
  tableLists: PowerfulTableProps<Row>['list']
  isPC: boolean
  isTable: boolean
}

export type PowerfulTableExpose<Row = any> = Readonly<{
  $slots: SetupContext['slots']
  $attrs: SetupContext['attrs']
  $refs: {
    /**
     * 表格 Ref 实例
     */
    multipleTable: InstanceType<typeof ElTable>
    /**
     * 筛选组件 Ref 实例
     */
    filterComponents: import('vue').Ref<
      InstanceType<typeof FSelect | typeof FInput | typeof FDatePicker>[] | null
    >
  }
  /**
   * 组件 props
   */
  props: PowerfulTableProps<Row>
  /**
   * 全局注入数据
   */
  injectProps: InjectProps
  /**
   * 过滤隐藏后的列
   */
  headerLists: PowerfulTableHeader<Row>[]
  /**
   * 内置数据也就是 vue2 中的 data
   */
  powerfulTableData: PowerfulTableData<Row>
  /**
   * 状态数据
   */
  stateData: StateData<Row>
  /**
   * 重置数据发送请求
   */
  resetList: (() => void) | undefined
  /**
   * 重新发送请求
   */
  getListData: (() => void) | undefined
  /**
   * 添加选中行
   */
  handleSelectionChange: (e: Row[]) => void
  /**
   * 重新计算表格布局位置
   */
  anewRender: () => void
}>

/* ------ props ------ */
export interface PowerfulTableProps<Row = any> {
  list: Row[]
  btnConfig?: BtnConfig.Config<Row>
  size?: Size
  selectData?: any[]
  isSelect?: boolean
  selectable?: (row: Row, index: number) => boolean
  selectCompare?: string[]
  header: PowerfulTableHeader<Row>[]
  operateData?: PowerfulTableOperateData
  isPagination?: boolean
  tree?: PowerfulTableTree<Row>
  paginationProperty?: Partial<PaginationProps>
  property?: Partial<TableProps<Row>>

  // 2.1.16
  listRequest?: {
    listApi: (params: object) => Promise<any>
    listQuery?: object
    pageSizeKey?: string
    pageNoKey?: string
    responseKey?: string // 例如 'data.data.result'
    listsKey?: string
    totalKey?: string
  }
}

/* ------ tree 树结构数据 ------ */
export type PowerfulTableTree<Row = any> = {
  lazy?: boolean
  load?: (row: Row, treeNode: TreeNode, resolve: (data: Row[]) => void) => void
  props?: { children: string; hasChildren: string }
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
    | PowerfulTableHeaderProps<any, Row>[]
    | PowerfulTableHeaderProps<any, Row>
  property?: Partial<TableColumnCtx<Row>>
}

export type SetDataType<T extends keyof _TYPE, Row = any> = {
  [key in keyof _TYPE<Row>[T]]: _TYPE<Row>[T][key]
}
// props 单元格数据
export interface PowerfulTableHeaderProps<T extends keyof _TYPE, Row = any> {
  prop: string
  data?: SetDataType<T, Row>
  type?: keyof _TYPE
  // eslint-disable-next-line prettier/prettier
  filters?:
    | PowerfulTableFilter[]
    | ((row: Row, index?: number) => string | number)
  text?: string
  slotName?: string
  render?: (
    h: typeof createElement,
    row: Row,
    index: number
  ) => VNode | string | number | JSX.Element
  reserve?: string | HTMLElement
  style?: CSSProperties
  filterItem?: boolean // 指定过滤项
  filtersType?: 'select' | 'date' | 'input'
  customFilter?: (
    v: string | (number | string)[],
    column: PowerfulTableHeader<Row>,
    resolve: (value: any[]) => void
  ) => void
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

export type EventType = Exclude<keyof _TYPE, 'slot' | 'btn' | 'href'>

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

export type OnEmit<T> = Partial<{
  click: ({ props, index, row }: T, ...arg: any) => void
}>

export type TextDataType<Row = any> = {
  line?: number
  develop?: boolean
  on?: OnEmit<{
    props: PowerfulTableHeaderProps<'text'>
    index: number
    row: Row
  }>
  formatting?: ({
    row,
    index,
    props,
  }: {
    row: Row
    index?: number
    props: PowerfulTableHeaderProps<'text'>
  }) => string | number
}

export type ImageEmit<T> = {
  load?: ({ props, index, row }: T, ...arg: any) => void
  error?: ({ props, index, row }: T, ...arg: any) => void
  switch?: ({ props, index, row }: T, ...arg: any) => void
  close?: ({ props, index, row }: T, ...arg: any) => void
  show?: ({ props, index, row }: T, ...arg: any) => void
}
export type ImageDataType<Row = any> = {
  style: CSSProperties
  on?: ImageEmit<{
    props: PowerfulTableHeaderProps<'image'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'image', ImageProps, Row>
}

export type BtnDataType<Row = any> = {
  tip?: string
  text?: string
  click?: ({
    props,
    params,
    row,
    index,
  }: {
    props: PowerfulTableHeaderProps<'btn'>
    params: any
    row: Row
    index: number
  }) => void
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
      props: PowerfulTableHeaderProps<'btn'>
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

export type SwitchEmit<T> = {
  change?: ({ props, index, row }: T, ...arg: any) => void
}
export type SwitchDataType<Row = any> = {
  style?: CSSProperties
  on?: SwitchEmit<{
    props: PowerfulTableHeaderProps<'switch'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'switch', SwitchProps, Row>
}

export type InputEmit<T> = {
  blur?: ({ props, index, row }: T, ...arg: any) => void
  change?: ({ props, index, row }: T, ...arg: any) => void
  input?: ({ props, index, row }: T, ...arg: any) => void
  focus?: ({ props, index, row }: T, ...arg: any) => void
  clear?: ({ props, index, row }: T, ...arg: any) => void
}
export type InputDataType<Row = any> = {
  symbol?: string
  style?: CSSProperties
  slot?: 'prepend' | 'append' | 'prefix' | 'suffix'
  on?: InputEmit<{
    props: PowerfulTableHeaderProps<'input'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'input', InputProps, Row>
}

export type VideoEmit<T> = {
  play?: ({ props, index, row }: T, ...arg: any) => void
  pause?: ({ props, index, row }: T, ...arg: any) => void
}
export type VideoDataType<Row = any> = {
  style?: CSSProperties
  on?: VideoEmit<{
    props: PowerfulTableHeaderProps<'video'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'video', VideoHTMLAttributes, Row>
}

export type IconFontDataType = {
  class?: string[] | string
  on?: OnEmit<{
    props: PowerfulTableHeaderProps<'iconfont'>
    index: number
    row: Row
  }>
  style?: CSSProperties
}

export type RateEmit<T> = {
  change?: ({ props, index, row }: T, ...arg: any) => void
}
export type RateDataType<Row = any> = {
  style?: CSSProperties
  on?: RateEmit<{
    props: PowerfulTableHeaderProps<'rate'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'rate', RateProps, Row>
}

export type LinkDataType<Row = any> = {
  target?: '_self' | '_blank' | '_parent' | '_top'
  style?: CSSProperties
  text?: string | ((row: Row) => string)
  on?: OnEmit<{
    props: PowerfulTableHeaderProps<'href'>
    index: number
    row: Row
  }>
  property?: ElComponentProp<'href', LinkProps, Row>
}

export type TagEmit<T> = {
  click?: ({ props, index, row }: T, ...arg: any) => void
  close?: ({ props, index, row }: T, ...arg: any) => void
}
export type TagDataType<Row = any> = {
  style?: CSSProperties
  color?: (row: Row, tag: string) => string
  number?: number
  on?: TagEmit<{
    props: PowerfulTableHeaderProps<'tag'>
    index: number
    row: Row
  }>
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
  listRequest?: {
    pageSizeKey?: string
    pageNoKey?: string
    responseKey?: string // 例如 'data.data.result'
    listsKey?: string
    totalKey?: string
  }
  emptyElement?: Component
}

// btnPlus组件
export namespace BtnConfig {
  export type BtnList<Row = any> = {
    style?: CSSProperties
    disabled?: boolean
    operateType?: 'none' | 'single' | 'batch'
    text?: string
    tip?: string
    effect?: string
    showBtn?: (() => boolean) | boolean
    click?: ({ btnItem, rows }: { btnItem: BtnList; rows: Row }) => void
    beforeClick?: (
      {
        btnItem,
        rows,
      }: {
        btnItem: BtnList
        rows: Row
      },
      resolve: (value: boolean) => void
    ) => void
    property?: ElComponentProp<'btn', ButtonProps, any>
  }
  export type Config<Row> = {
    btnList?: BtnList<Row>[]
    btnRightList?: BtnList<Row>[]
  }
}

export type SFCWithInstall<T> = T & Plugin

export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = '' | 'large' | 'default' | 'small'

export type ComponentEvent<Row = any> = {
  componentName: keyof _TYPE | 'filter'
  eventType: string
  row: Row
  index?: number
  props: PowerfulTableHeaderProps<any>[] | PowerfulTableHeaderProps<any>
}

export type EmitType = `${EmitEnum}`
// 定义自定义事件上参数
export type EmitTypeArgs<Row = any> = {
  [EmitEnum.BtnPlusChange]: {
    effect: BtnConfig.BtnList['effect']
    rows: Row[]
  }
  [EmitEnum.BtnClick]: {
    params: BtnDataType['params']
    row: Row
    index: number
  }
  [EmitEnum.SizeChange]: {
    params: { pageNum: number; pageSize: number }
    select: Row[]
  }
  [EmitEnum.ComponentEvent]: ComponentEvent<Row>
  [EmitEnum.BatchOperate]: {
    ids: (string | number)[]
    item: PowerfulTableLabelValue
    rows: Row[]
  }
  [EmitEnum.SortCustom]: { column: any; prop: string; order: string }
}

// 函数类型
export interface Handlers<Row = any> {
  [EmitEnum.BtnPlusChange]: (
    payload: EmitTypeArgs<Row>[EmitEnum.BtnPlusChange]
  ) => void
  [EmitEnum.BtnPlusRefresh]: () => void
  [EmitEnum.BtnClick]: (payload: EmitTypeArgs<Row>[EmitEnum.BtnClick]) => void
  [EmitEnum.SizeChange]: (
    payload: EmitTypeArgs<Row>[EmitEnum.SizeChange]
  ) => void
  [EmitEnum.ComponentEvent]: (
    payload: EmitTypeArgs<Row>[EmitEnum.ComponentEvent],
    ...args: any
  ) => void
  [EmitEnum.BatchOperate]: (
    payload: EmitTypeArgs<Row>[EmitEnum.BatchOperate]
  ) => void
  [EmitEnum.SortCustom]: (
    payload: EmitTypeArgs<Row>[EmitEnum.SortCustom]
  ) => void
}
// 自定义事件类型
export type EmitEventType<Row = any> = {
  (
    e: EmitEnum.BtnPlusChange,
    payload: EmitTypeArgs<Row>[EmitEnum.BtnPlusChange]
  ): void
  (e: EmitEnum.BtnPlusRefresh): void
  (e: EmitEnum.BtnClick, payload: EmitTypeArgs<Row>[EmitEnum.BtnClick]): void
  (
    e: EmitEnum.SizeChange,
    payload: EmitTypeArgs<Row>[EmitEnum.SizeChange]
  ): void
  (
    e: EmitEnum.ComponentEvent,
    payload: EmitTypeArgs<Row>[EmitEnum.ComponentEvent],
    ...args: any
  ): void
  (
    e: EmitEnum.BatchOperate,
    payload: EmitTypeArgs<Row>[EmitEnum.BatchOperate]
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
    payload: EmitTypeArgs<Row>[EmitEnum.SortCustom]
  ): void
}
