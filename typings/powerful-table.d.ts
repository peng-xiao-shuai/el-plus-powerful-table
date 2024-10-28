import type { ElTable, InputInstance } from 'element-plus/es'
import type { EmitEnum } from '../powerful-table/src/powerful-table-data'
import type {
  CSSProperties,
  Component,
  Plugin,
  SetupContext,
  VNode,
  VideoHTMLAttributes,
  WatchStopHandle,
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
  resetList: (params?: object) => void | undefined
  /**
   * 重新发送请求
   */
  getListData: (params?: object) => void | undefined
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
  /**
   * 是否开启分页
   * @default true
   */
  isPagination?: boolean
  tree?: PowerfulTableTree<Row>
  /**
   * el-pagination props
   * @see https://element-plus.gitee.io/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7
   */
  paginationProperty?: Partial<PaginationProps>
  /**
   * el-table props
   * @see https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
   */
  property?: Partial<TableProps<Row>>

  // 2.1.16
  listRequest?: {
    listApi: (params: object) => Promise<any>
    /**
     * 查询条件
     * @default {[pageNoKey]: 1, [pageSizeKey]: 10}
     */
    listQuery?: object
    /**
     * 条数 key
     * @default 'pageSize'
     */
    pageSizeKey?: string
    /**
     * 页数 key
     * @default 'pageNo'
     */
    pageNoKey?: string
    /**
     * 网络请求返回的目标对象 key
     * @default 'data.result'
     */
    responseKey?: string // 例如 'data.data.result'
    /**
     * 网络请求返回的目标对象中的属性 key
     * @default 'rows'
     */
    listsKey?: string
    /**
     * 条数 key
     * @default 'pageSize'
     */
    totalKey?: string
  }
}

/**
 * tree 树结构数据
 */
export type PowerfulTableTree<Row = any> = {
  lazy?: boolean
  load?: (row: Row, treeNode: TreeNode, resolve: (data: Row[]) => void) => void
  props?: { children: string; hasChildren: string }
}

/* ------ operateData 批量操作 ------ */
// operates 批量操作下拉框数据
export type PowerfulTableLabelValue = {
  /**
   * 显示在页面的 label
   */
  label: string
  /**
   * 变量接收的值
   */
  value: string | number
  [s: string]: string | number
}
// operateData 批量操作
export interface PowerfulTableOperateData {
  /**
   * 当前批量操作下拉框选中的值
   * @default ''
   */
  value?: PowerfulTableLabelValue['value']
  /**
   * `@batchOperate` 事件返回的对象中 ids 组成的值。假设为 id 时，那 `@batchOperate` 事件中 ids 值为 `[选中数据].map(item => item.id)`
   * @default 'id'
   */
  prop?: string
  /**
   * 样式
   * @deprecated
   */
  style?: CSSProperties
  /**
   * `el-select` 组件 `props`
   * @see https://element-plus.gitee.io/zh-CN/component/select.html#select-attributes
   */
  selectProperty?: InstanceType<
    typeof import('element-plus')['ElSelect']
  >['$props']
  /**
   * `el-button` 组件 `props`
   * @see https://element-plus.gitee.io/zh-CN/component/button.html#button-attributes
   */
  btnProperty?: Partial<ButtonProps>
  /**
   * `el-tooltip` 组件 `props`
   * @see https://element-plus.gitee.io/zh-CN/component/tooltip.html#tooltip-attributes
   */
  tooltipProperty?: Partial<ElTooltipProps>
  /**
   * 批量操作按钮
   * @default []
   */
  operates: PowerfulTableLabelValue[]
}

/* ------ header 表格头部数据 ------ */
// header 表格头部数据
export interface PowerfulTableHeader<Row = any> {
  /**
   * 是否显示溢出提示
   * @default false
   */
  overflowTooltip?: boolean
  /**
   * 列标签
   */
  label: string
  /**
   * 是否默认显示列
   * @default true
   */
  defaultShow?: boolean
  /**
   * 是否默认在表头显示过滤按钮
   */
  defaultFilter?: boolean // 当前列是否在表头显示过滤按钮
  /**
   * 列的最小宽度
   * @default 140
   */
  minWidth?: string | number
  /**
   * 列的宽度
   * @default '100%'
   */
  width?: string | number
  /**
   * 是否显示或显示过滤列
   * @default undefined
   */
  isShowOrFilterColumn?: false | 'show' | 'filter'
  /**
   * 是否可排序
   * @default false
   */
  sortable?: boolean | 'custom'
  /**
   * 是否固定列
   * @default false
   */
  fixed?: boolean | 'left' | 'right'
  /**
   * 表格头部文本对齐方式
   * @default 'center'
   */
  headerAlign?: 'left' | 'center' | 'right'
  /**
   * 自定义表格头部插槽名称
   */
  headerSlotName?: string
  /**
   * 单元格显示数据
   */
  props:
    | PowerfulTableHeaderProps<any, Row>[]
    | PowerfulTableHeaderProps<any, Row>
  /**
   * el-tableColumn props 表格列属性
   * @see https://element-plus.gitee.io/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
   */
  property?: Partial<TableColumnCtx<Row>>
}

export type SetDataType<T extends keyof _TYPE, Row = any> = {
  [key in keyof _TYPE<Row>[T]]: _TYPE<Row>[T][key]
}
/**
 * props 单元格数据
 */
export interface PowerfulTableHeaderProps<T extends keyof _TYPE, Row = any> {
  /**
   * 属性：字符串类型
   */
  prop: string

  /**
   * 数据：可选的SetDataType方法的参数
   */
  data?: SetDataType<T, Row>

  /**
   * 类型：可选的_TYPE枚举类型的关键字
   * @default 'text'
   */
  type?: keyof _TYPE

  /**
   * 过滤器：可选的PowerfulTableFilter数组，或一个函数用于接收行和索引作为参数并返回字符串或数字
   */
  filters?:
    | PowerfulTableFilter[]
    | ((row: Row, index?: number) => string | number)

  /**
   * 文本：可选的字符串
   */
  text?: string

  /**
   * 插槽名称：可选的字符串
   */
  slotName?: string

  /**
   * 渲染函数
   */
  render?: (
    /**
     * h 是一个函数，用来创建虚拟节点
     */
    h: typeof createElement,
    /**
     * 当前行数据
     */
    row: Row,
    index: number
  ) => VNode | string | number | JSX.Element
  /**
   * 预留字段，可选类型为字符串或 `HTMLElement`
   */
  reserve?: string | HTMLElement

  /**
   * 元素的样式
   */
  style?: CSSProperties

  /**
   * 是否为过滤项
   */
  filterItem?: boolean // 指定过滤项

  /**
   * 过滤类型，可选值为'select'、'date'或'input'
   */
  filtersType?: 'select' | 'date' | 'input'
  /**
   * 自定义过滤器
   */
  customFilter?: (
    /**
     * value 值
     */
    v: string | (number | string)[],
    /**
     * 单元格配置数据
     */
    column: PowerfulTableHeader<Row>,
    /**
     * resolve 用于设置过滤后数据
     */
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
  iconfont: IconFontDataType<Row>
  tag: TagDataType<Row>
  rate: RateDataType<Row>
  href: LinkDataType<Row>
  slot: null
  textarea: InputDataType<Row>
}

export type EventType = Exclude<keyof _TYPE, 'slot' | 'btn' | 'href'>

export type PowerfulTableFilter = {
  /**
   * 文本对应的值
   */
  key: string | number
  /**
   * 显示的文本
   */
  value: string
}

type ElComponentProp<T extends keyof _TYPE, P = any, Row = any> =
  | Partial<P>
  | (({
      /**
       * 当前行数据
       */
      row,
      /**
       * 当前行索引
       */
      index,
      /**
       * 单元格配置数据
       */
      props,
    }: {
      row: Row
      index: number
      props: PowerfulTableHeaderProps<T, Row>
    }) => Partial<P>)

export type OnEmit<T> = Partial<{
  /**
   * 点击事件
   */
  click: (params: T, ...arg: any) => void
}>

export type TextDataType<Row = any> = {
  /**
   * 超出多少的行数使用 ... 代替
   */
  line?: number
  /**
   * 是否显示 “展开 / 收起” 操作按钮
   */
  develop?: boolean
  /**
   * 事件合集
   */
  on?: OnEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'text'>
    /**
     * 当前行下标
     */
    index: number
    /**
     * 当前行数据
     */
    row: Row
  }>
  /**
   * 格式化函数
   */
  formatting?: ({
    /**
     * 当前行数据
     */
    row,
    /**
     * 当前行索引
     */
    index,
    /**
     * 单元格配置数据
     */
    props,
  }: {
    row: Row
    index?: number
    props: PowerfulTableHeaderProps<'text'>
  }) => string | number
}

export type ImageEmit<T> = {
  /**
   * 可选的加载回调函数，用于加载数据
   * @param params 调用该函数时传递的参数
   * @param arg 可变参数
   * @returns 无返回值
   */
  load?: (params: T, ...arg: any) => void

  /**
   * 可选的错误回调函数，用于处理错误
   * @param params 调用该函数时传递的参数
   * @param arg 可变参数
   * @returns 无返回值
   */
  error?: (params: T, ...arg: any) => void

  /**
   * 可选的切换回调函数，用于切换状态
   * @param params 调用该函数时传递的参数
   * @param arg 可变参数
   * @returns 无返回值
   */
  switch?: (params: T, ...arg: any) => void

  /**
   * 可选的关闭回调函数，用于关闭组件
   * @param params 调用该函数时传递的参数
   * @param arg 可变参数
   * @returns 无返回值
   */
  close?: (params: T, ...arg: any) => void

  /**
   * 可选的显示回调函数，用于显示组件
   * @param params 调用该函数时传递的参数
   * @param arg 可变参数
   * @returns 无返回值
   */
  show?: (params: T, ...arg: any) => void
}
export type ImageDataType<Row = any> = {
  /**
   * 图片的样式
   */
  style: CSSProperties
  /**
   * 图片事件合集
   */
  on?: ImageEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'image'>
    /**
     * 当前行下标
     */
    index: number
    /**
     * 当前行数据
     */
    row: Row
  }>
  /**
   * el-image props 图片属性
   * @see https://element-plus.gitee.io/zh-CN/component/image.html#image-attributes
   */
  property?: ElComponentProp<'image', ImageProps, Row>
}

export type BtnDataType<Row = any> = {
  /**
   * 提示文本
   */
  tip?: string
  /**
   * 按钮文本
   */
  text?: string
  /**
   * 点击事件
   */
  click?: ({
    /**
     * 单元格配置数据
     */
    props,
    /**
     * 自定义数据，data.params 数据，原封不动返回
     */
    params,
    /**
     * 当前行数据
     */
    row,
    /**
     * 当前行索引
     */
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
      /**
       * 当前行数据
       */
      row: Row
      /**
       * 当前行索引
       */
      index: number
      /**
       * 当前按钮索引
       */
      btnIndex: number[]
      /**
       * 单元格配置数据
       */
      props: PowerfulTableHeaderProps<'btn'>
      /**
       * 自定义数据，data.params 数据，原封不动返回
       */
      params: any
    },
    /**
     * resolve 调用表示成功，往下继续执行
     */
    resolve: (value: unknown) => void
  ) => void

  /**
   * 是否为更多操作按钮
   */
  isMore?: boolean

  /**
   * 元素样式
   */
  style?: CSSProperties

  /**
   * 是否显示按钮
   * @param row 行数据
   * @param index 行索引
   * @returns 是否显示按钮
   */
  showBtn?: ((row: Row, index: number) => boolean) | boolean

  /**
   * 自定义参数
   */
  params?: any

  /**
   * el-tooltip props 提示框属性
   * @see https://element-plus.gitee.io/zh-CN/component/tooltip.html#attributes
   */
  tipProperty?: Partial<ElTooltipProps>

  /**
   * el-button props 按钮属性
   * @see https://element-plus.gitee.io/zh-CN/component/button.html#button-attributes
   */
  property?: ElComponentProp<'btn', ButtonProps, Row>
}

export type SwitchEmit<T> = {
  /**
   * change 事件
   */
  change?: (params: T, ...arg: any) => void
}
export type SwitchDataType<Row = any> = {
  /**
   * 元素样式
   */
  style?: CSSProperties
  on?: SwitchEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'switch'>
    /**
     * 当前行下标
     */
    index: number
    /**
     * 当前行数据
     */
    row: Row
  }>
  /**
   * el-switch props 开关属性
   * @see https://element-plus.gitee.io/zh-CN/component/switch.html#attributes
   */
  property?: ElComponentProp<'switch', SwitchProps, Row>
}

export type InputEmit<T> = {
  /**
   * 可选的模糊函数，用于处理模糊事件
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   * @returns 无返回值
   */
  blur?: (params: T, ...arg: any) => void

  /**
   * 可选的改变函数，用于处理改变事件
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   * @returns 无返回值
   */
  change?: (params: T, ...arg: any) => void

  /**
   * 可选的输入函数，用于处理输入事件
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   * @returns 无返回值
   */
  input?: (params: T, ...arg: any) => void

  /**
   * 可选的聚焦函数，用于处理聚焦事件
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   * @returns 无返回值
   */
  focus?: (params: T, ...arg: any) => void

  /**
   * 可选的清除函数，用于处理清除事件
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   * @returns 无返回值
   */
  clear?: (params: T, ...arg: any) => void
}
export type InputDataType<Row = any> = {
  /**
   * 表示一个可选的符号，类型为字符串
   */
  symbol?: string

  /**
   * 表示一个可选的样式对象，类型为CSSProperties
   */
  style?: CSSProperties

  /**
   * 表示一个可选的slot属性，类型为 'prepend' | 'append' | 'prefix' | 'suffix'
   * @see https://element-plus.gitee.io/zh-CN/component/input.html#slots
   */
  slot?: 'prepend' | 'append' | 'prefix' | 'suffix'

  /**
   * 表示一个可选的on属性，类型为 InputEmit接口的实例
   */
  on?: InputEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'input'>
    /**
     * index属性表示当前行在表格中的索引值
     */
    index: number
    /**
     * row属性表示当前行的数据对象
     */
    row: Row
  }>

  /**
   * 表示一个可选的property属性，类型为 ElComponentProp<'input', InputProps, Row>的实例
   */
  property?: ElComponentProp<'input', InputProps, Row>
}

/**
 * 视频事件发射类型
 */
export type VideoEmit<T> = {
  /**
   * 播放事件
   * @param params 参数
   * @param arg 附加参数
   * @returns 无返回值
   */
  play?: (params: T, ...arg: any) => void
  /**
   * 暂停事件
   * @param params 参数
   * @param arg 附加参数
   * @returns 无返回值
   */
  pause?: (params: T, ...arg: any) => void
}
export type VideoDataType<Row = any> = {
  /**
   * 元素样式
   */
  style?: CSSProperties
  /**
   * 视频事件
   */
  on?: VideoEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'video'>
    /**
     * 数字类型的索引
     */
    index: number
    /**
     * 表格行数据
     */
    row: Row
  }>
  /**
   * 视频属性
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
   */
  property?: ElComponentProp<'video', VideoHTMLAttributes, Row>
}

export type IconFontDataType<Row = any> = {
  /**
   * 类型为 string[] 或 string 的可选类名
   */
  class?: string[] | string

  /**
   * 可选的事件处理函数，返回值为包含属性、索引和行对象的 PowerfulTableHeaderProps 对象
   */
  on?: OnEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'iconfont'>
    /**
     * 数字类型的索引
     */
    index: number
    /**
     * 表格行数据
     */
    row: Row
  }>

  /**
   * 类似 CSS 的样式对象
   */
  style?: CSSProperties
}

export type RateEmit<T> = {
  /**
   * change 事件
   */
  change?: (params: T, ...arg: any) => void
}
export type RateDataType<Row = any> = {
  /**
   * 样式属性
   */
  style?: CSSProperties

  /**
   * 事件合集
   */
  on?: RateEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'rate'>
    /**
     * 数字类型的索引
     */
    index: number
    /**
     * 表格行数据
     */
    row: Row
  }>

  /**
   * el-rate props 评分属性
   * @see https://element-plus.gitee.io/zh-CN/component/rate.html#attributes
   */
  property?: ElComponentProp<'rate', RateProps, Row>
}

export type LinkDataType<Row = any> = {
  /**
   * 原生 target 属性，类型为 '_self' | '_blank' | '_parent' | '_top'
   */
  target?: '_self' | '_blank' | '_parent' | '_top'
  /**
   * 样式属性
   */
  style?: CSSProperties
  /**
   * 链接文字
   */
  text?: string | ((row: Row) => string)
  /**
   * 事件合集
   */
  on?: OnEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'href'>
    /**
     * 数字类型的索引
     */
    index: number
    /**
     * 表格行数据
     */
    row: Row
  }>
  /**
   * el-link props 链接属性
   * @see https://element-plus.gitee.io/zh-CN/component/link.html#attributes
   */
  property?: ElComponentProp<'href', LinkProps, Row>
}

export type TagEmit<T> = {
  /**
   * 点击事件回调函数，可选参数
   *
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   */
  click?: (params: T, ...arg: any) => void

  /**
   * 关闭事件回调函数，可选参数
   *
   * @param params T类型的参数
   * @param ...arg 任意数量的参数
   */
  close?: (params: T, ...arg: any) => void
}
export type TagDataType<Row = any> = {
  /**
   * 可选的CSS样式对象
   */
  style?: CSSProperties

  /**
   * 可选的函数，用于设置每个标签的颜色
   * @param row 行数据
   * @param tag 标签内容
   * @returns 标签颜色
   */
  color?: (row: Row, tag: string) => string

  /**
   * 可选的数字，用于设置标签数量
   */
  number?: number

  /**
   * 事件合集
   */
  on?: TagEmit<{
    /**
     * 单元格配置数据
     */
    props: PowerfulTableHeaderProps<'tag'>
    /**
     * 数字类型的索引
     */
    index: number
    /**
     * 表格行数据
     */
    row: Row
  }>
  /**
   * el-tag props 标签属性
   * @see https://element-plus.gitee.io/zh-CN/component/tag.html#attributes
   */
  property?: ElComponentProp<'tag', TagProps, Row>
}

export interface LangPackages {
  [s: string]: {
    [s: string]: string | ((...arg: any) => string)
  }
}
// 组件注入数据
export type InjectProps = {
  /**
   * 语言包
   * @see https://github.com/peng-xiao-shuai/el-plus-powerful-table/blob/master-ts/packages/locale/packages.ts
   */
  locale?: LangPackages
  /**
   * 列表请求配置
   */
  listRequest?: {
    /**
     * 查询条件
     * @default {[pageNoKey]: 1, [pageSizeKey]: 10}
     */
    listQuery?: object
    /**
     * 条数 key
     * @default 'pageSize'
     */
    pageSizeKey?: string
    /**
     * 页数 key
     * @default 'pageNo'
     */
    pageNoKey?: string
    /**
     * 网络请求返回的目标对象 key
     * @default 'data.result'
     */
    responseKey?: string // 例如 'data.data.result'
    /**
     * 网络请求返回的目标对象中的属性 key
     * @default 'rows'
     */
    listsKey?: string
    /**
     * 条数 key
     * @default 'pageSize'
     */
    totalKey?: string
  }
  /**
   * 空数据时显示的组件
   */
  emptyElement?: Component
}

// btnPlus组件
export namespace BtnConfig {
  export type BtnList<Row = any> = {
    /**
     * 表格按钮的样式对象
     */
    style?: CSSProperties

    /**
     * 按钮是否禁用
     */
    disabled?: boolean

    /**
     * 按钮的操作类型，可选值为 'none', 'single', 'batch'
     */
    operateType?: 'none' | 'single' | 'batch'

    /**
     * 按钮显示的文本内容
     */
    text?: string

    /**
     * 按钮提示信息
     */
    tip?: string

    /**
     * 按钮功能，将会返回到 `@btn-plus-change` 中 effect
     */
    effect?: string

    /**
     * 是否显示按钮，返回值为布尔值
     */
    showBtn?: (() => boolean) | boolean

    /**
     * 按钮点击事件回调函数
     * @param btnItem 按钮对象
     * @param rows 行数据对象数组
     */
    click?: ({ btnItem, rows }: { btnItem: BtnList; rows: Row }) => void

    /**
     * 按钮点击前的回调函数
     * @param btnItem 按钮对象
     * @param rows 行数据对象数组
     * @param resolve 调用后执行后续操作
     */
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

    /**
     * 按钮组件的属性对象
     * @see https://element-plus.gitee.io/zh-CN/component/button.html#attributes
     */
    property?: ElComponentProp<'btn', ButtonProps, any>
  }
  export type Config<Row> = {
    /**
     * 左侧按钮列表
     */
    btnList?: BtnList<Row>[]
    /**
     * 右侧按钮列表
     */
    btnRightList?: BtnList<Row>[]
  }
}

export type SFCWithInstall<T> = T & Plugin

export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Size = '' | 'large' | 'default' | 'small'

export type ComponentEvent<Row = any> = {
  /**
   * 组件名称，可以是_TYPE类型的关键字或者'filter'
   */
  componentName: keyof _TYPE | 'filter'
  /**
   * 事件类型
   */
  eventType: string
  /**
   * 行数据
   */
  row: Row
  /**
   * 索引（可选）
   */
  index?: number
  /**
   * 单元格配置
   */
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
