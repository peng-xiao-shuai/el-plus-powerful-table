<template>
  <div class="pt">
    <PTBtnPlus
      v-if="
        btnConfig !== undefined || $slots['btn-left'] || $slots['btn-right']
      "
      ref="btnPlusRef"
      v-model:isTable="isTable"
      :btn-config="btnConfig"
      :header-list="header"
      :multiple-selection="currentSelect"
      @change="(...arg) => emit(EmitEnum.BtnPlusChange, ...arg)"
      @refresh="emit(EmitEnum.BtnPlusRefresh)"
    >
      <template v-if="$slots['btn-left']" #btn-left>
        <slot name="btn-left" />
      </template>
      <template v-if="$slots['btn-right']" #btn-right>
        <slot name="btn-right" />
      </template>
    </PTBtnPlus>

    <ElTable
      ref="multipleTable"
      v-loading="listLoading"
      class="powerful-table"
      :data="tableLists"
      v-bind="{
        'element-loading-text': 'Loading',
        border: true,
        fit: true,
        'row-key': 'id',
        'highlight-current-row': true,
        lazy: (tree && tree.lazy) || false,
        load: tree && tree.load,
        'tree-props': tree && tree.props,
        size: Size,
        ...property,
      }"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @select="(...arg) => emit(EmitEnum.Select, ...arg)"
      @select-all="(...arg) => emit(EmitEnum.SelectAll, ...arg)"
      @cell-mouse-enter="(...arg) => emit(EmitEnum.CellMouseEnter, ...arg)"
      @cell-mouse-leave="(...arg) => emit(EmitEnum.CellMouseLeave, ...arg)"
      @cell-click="(...arg) => emit(EmitEnum.CellClick, ...arg)"
      @cell-dblclick="(...arg) => emit(EmitEnum.CellDblclick, ...arg)"
      @cell-contextmenu="(...arg) => emit(EmitEnum.CellContextmenu, ...arg)"
      @row-click="(...arg) => emit(EmitEnum.RowClick, ...arg)"
      @row-contextmenu="(...arg) => emit(EmitEnum.RowContextmenu, ...arg)"
      @row-dblclick="(...arg) => emit(EmitEnum.RowDblclick, ...arg)"
      @header-click="(...arg) => emit(EmitEnum.HeaderClick, ...arg)"
      @header-contextmenu="(...arg) => emit(EmitEnum.HeaderContextmenu, ...arg)"
      @filter-change="(...arg) => emit(EmitEnum.FilterChange, ...arg)"
      @current-change="(...arg) => emit(EmitEnum.CurrentChange, ...arg)"
      @header-dragend="(...arg) => emit(EmitEnum.HeaderDragend, ...arg)"
      @expand-change="(...arg) => emit(EmitEnum.ExpandChange, ...arg)"
    >
      <template #empty>
        <slot name="empty">
          <component
            :is="injectProps.emptyElement"
            v-if="injectProps.emptyElement"
          />
          <span v-else>{{ t(LangKey.NoData) }}</span>
        </slot>
      </template>

      <ElTableColumn
        v-if="isSelect"
        align="center"
        type="selection"
        width="45"
        :selectable="selectable ? selectable : () => true"
      />

      <ElTableColumn
        v-for="(item, index) in headerLists"
        :key="item.label + index"
        v-bind="{
          fixed: item.fixed || false,
          sortable: item.sortable || false,
          'header-align': item.headerAlign || 'center',
          'show-overflow-tooltip': item.overflowTooltip || false,
          prop: Array.isArray(item.props)
            ? item.props[0].prop
            : item.props.prop,
          label: item.label,
          'min-width': item.minWidth || 140,
          width: item.width || '',
          align: item.headerAlign || 'center',
          'class-name': item.headerAlign || 'center',
          ...item.property,
        }"
      >
        <template
          v-if="
            ((item.isShowOrFilterColumn == undefined ||
              item.isShowOrFilterColumn === 'filter') &&
              !item.headerSlotName) ||
            item.headerSlotName
          "
          #header
        >
          <!-- 用户自定义表头 -->
          <slot
            v-if="item.headerSlotName"
            :name="item.headerSlotName"
            :item="item"
            :index="index"
          />

          <!-- 内置自定义表头 -->
          <template v-else>
            <PTFSelect
              v-if="
                (getPropObj(item).filters &&
                  Array.isArray(getPropObj(item).filters) &&
                  getPropObj(item).filtersType === 'select') ||
                getPropObj(item).type === 'switch'
              "
              ref="filterComponents"
              :header-data="item"
              :list="list"
              :prop-data="getPropObj(item)"
              @header-filter-change="handleHeaderFilterChange"
            />
            <PTFDatePicker
              v-else-if="getPropObj(item).filtersType === 'date'"
              ref="filterComponents"
              :header-data="item"
              :list="list"
              @header-filter-change="handleHeaderFilterChange"
            />
            <PTFInput
              v-else
              ref="filterComponents"
              :header-data="item"
              :list="list"
              @header-filter-change="handleHeaderFilterChange"
            />
          </template>
        </template>

        <template #default="scope">
          <div
            v-for="(prop, idx) in Array.isArray(item.props)
              ? item.props
              : [item.props]"
            :key="'props' + idx"
            :style="{
              display: index == 0 ? 'inline-block' : 'block',
              ...prop.style,
            }"
            @click="(event: Event) => event.stopPropagation()"
          >
            <!-- 插槽 -->
            <slot
              v-if="prop.type == 'slot'"
              :name="prop.slotName || 'default'"
              :row="scope.row"
              :index="scope.$index"
            />
            <div
              v-else
              :style="{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: justifyFun((item.property?.align as any) || item.headerAlign),
              }"
            >
              <span
                v-if="prop.text"
                :style="{ marginRight: prop.text ? '10px' : '0px' }"
              >
                {{ prop.text }}
              </span>
              <PTRenderJsx
                v-if="typeof prop.render == 'function'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
                :aligning="(item.property?.align as any) || item.headerAlign"
              />
              <template v-else>
                <div
                  v-if="
                    (scope.row[prop.prop] == undefined ||
                      scope.row[prop.prop] == null) &&
                    prop.type != 'btn'
                  "
                >
                  <div v-if="prop.reserve" v-html="prop.reserve" />
                  <div v-else>
                    <span>{{ t(LangKey.NoData) }}</span>
                  </div>
                </div>
                <component
                  :is="matchComponents(prop.type)"
                  v-else-if="
                    prop.type &&
                    [
                      'image',
                      'btn',
                      'switch',
                      'input',
                      'textarea',
                      'iconfont',
                      'tag',
                      'rate',
                      'href',
                      'video',
                    ].includes(prop.type)
                  "
                  v-bind="bindAttr(prop, scope, item)"
                  @return-emit="returnEmit"
                  @component-emit="componentEmit"
                />
                <PTText
                  v-else-if="scope.row[prop.prop]"
                  v-bind="bindAttr(prop, scope, item)"
                  :list-length="tableLists.length"
                  @component-emit="componentEmit"
                />
                <PTFilter
                  v-else-if="
                    prop.filters &&
                    (prop.type == 'text' || prop.type == undefined)
                  "
                  v-bind="bindAttr(prop, scope, item)"
                  @component-emit="componentEmit"
                />
              </template>
            </div>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>

    <div class="bottom-operate">
      <!-- 批量操作 -->
      <div
        v-if="operate && isSelect && operate.operates"
        class="bottom-operate-left"
      >
        <ElSelect
          v-model="operate.value"
          v-bind="{
            clearable: true,
            size: Size,
            ...(operate.selectProperty || {}),
          }"
        >
          <ElOption
            v-for="(item, index) in operate.operates"
            :key="'operate' + index"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>

        <ElButton
          class="search-button"
          v-bind="{
            style: { marginLeft: '20px' },
            type: 'primary',
            size: Size,
            ...(operate.btnProperty || {}),
          }"
          @click="batchOperate"
        >
          {{ t(LangKey.Confirm) }}
        </ElButton>
      </div>

      <!-- 分页操作 -->
      <div v-if="isPagination && total" class="bottom-operate-right">
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :small="Size === 'small' ? true : false"
          v-bind="{
            pageSizes: [10, 20, 30],
            layout: 'total, sizes, prev, pager, next',
            ...(paginationProperty || {}),
            total: paginationProperty?.pageCount ? undefined : total,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deepClone } from '../../index'
import { JustifyFunSymbol, SizeSymbol } from '../../keys'
// import en from "element-plus/lib/locale/lang/en";
import { useFilters } from '../../filter/useFilters'
import {
  EmitEnum,
  powerfulTableProps,
  useFunction,
  useInitiateListRequest,
  usePowerfulTableStates,
} from './powerful-table-data'
import type {
  BtnDataType,
  ComponentEvent,
  PowerfulTableLabelValue,
} from '@/index'
import { LangKey, t } from '~/locale/lang'

type Row = any
// 自定义事件类型
type EmitEventType<Row = any> = {
  (e: EmitEnum.BtnPlusChange, ...args: any): void
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
    e: EmitEnum.SortCustom,
    payload: { column: any; prop: string; order: string }
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
}
const emit = defineEmits<EmitEventType>()
const props = defineProps(powerfulTableProps)

// 获取 布局方向
const justifyFun = (val: string): string => {
  const bol = ['center', 'left', 'right'].includes(val)
  return bol
    ? { center: 'center', left: 'flex-start', right: 'flex-end' }[val]!
    : 'center'
}

/* ------ data数据 ------ */
const {
  powerfulTableData,
  multipleTable,
  filterComponents,
  stateData,
  Size,
  injectProps,
} = usePowerfulTableStates<Row>(props)

// 局部过滤hook
const { handleHeaderFilterChange, getPropObj } = useFilters<Row>(
  stateData,
  props,
  filterComponents
)

const { resetList, getListData } = useInitiateListRequest<Row>(
  powerfulTableData,
  props,
  injectProps,
  stateData
)

/* ------  操作方法  ------ */
const {
  handleSelectionChange,
  returnEmit,
  componentEmit,
  sortChange,
  batchOperate,
  get,
  matchComponents,
  bindAttr,
} = useFunction<Row>(emit, powerfulTableData)

const { tableLists, isTable } = toRefs(stateData)
const { listLoading, currentPage, pageSize, currentSelect, operate, total } =
  toRefs(powerfulTableData)

/* ------ 注入数据 ------ */
// 组件大小
provide(SizeSymbol, Size)
// 单元格内布局
provide(JustifyFunSymbol, justifyFun)

powerfulTableData.watchCache.push(
  watchEffect(() => {
    Object.assign(powerfulTableData.operate, props.operateData)

    // list数据有的话 关闭加载中...
    // 更具当前list 数据 添加develop
    powerfulTableData.develop = Array.from<boolean>({
      length: stateData.tableLists.length,
    }).fill(false)
    powerfulTableData.listLoading = false
  })
)
// 判断列表是否存在数据，存在则查询选中
powerfulTableData.watchCache.push(
  watch(
    () => stateData.tableLists,
    (val) => {
      if (val.length) nextTick(() => getSelect())
    },
    {
      immediate: true,
      deep: true,
    }
  )
)

powerfulTableData.watchCache.push(
  watch(
    () => [powerfulTableData.currentPage, powerfulTableData.pageSize],
    () => {
      // 切换页面清除表头选中
      if (Array.isArray(filterComponents.value)) {
        filterComponents.value.forEach((item: any) => {
          item.state.value = ''
        })
      }

      if (props.listRequest?.listApi) {
        getListData?.()
      }

      get()
    }
  )
)

/* --- 按钮组件参数及方法begin --- */
/**
 * 过滤被隐藏的列
 */
const headerLists = computed(() => {
  return props.header.filter((column) =>
    typeof column.defaultShow == 'boolean' ? column.defaultShow : true
  )
})

/**
 * 重新渲染表格
 */
const anewRender = () => {
  nextTick(() => {
    multipleTable.value?.doLayout()
  })
}

/* ------ 获取选中 ------ */
const getSelect = (arr = props.selectData, list = stateData.tableLists) => {
  if (!props.isSelect) return

  // 1.获取当前页
  // 2.总选中减去当前页
  // 3.得到其他页

  // 获取当前页选中
  const current: Row[] = []
  // 获取 其他页选中
  let other: Row[] = []

  const selectCompare = [
    props.selectCompare ? props.selectCompare[0] : 'id',
    props.selectCompare ? props.selectCompare[1] : 'id',
  ]

  // 获取当前页
  if (arr.length != 0) {
    // console.log('所有选中', arr);
    // 获取当前页
    arr.forEach((item) => {
      const l = list.filter((each: (typeof list)[0]) => {
        return item[selectCompare[0]] == each[selectCompare[1]]
      })

      if (l.length > 0) current.push(l[0])
    })

    // 获取其他页
    if (current.length > 0) {
      other = deepClone(arr)
      for (const j in other) {
        current.forEach((item) => {
          if (item[selectCompare[1]] == other[j][selectCompare[0]]) {
            other.splice(Number(j), 1)
          }
        })
      }
    } else {
      other = deepClone(arr)
    }

    powerfulTableData.otherSelect = other
    powerfulTableData.currentSelect = current
    // console.log('当前页选中', current)
    // console.log('其他页选中', other);

    if (current.length != 0) {
      current.forEach((row) => {
        multipleTable.value?.toggleRowSelection(row, true)
      })
    } else {
      multipleTable.value?.clearSelection()
    }
  } else {
    multipleTable.value?.clearSelection()
  }
}

defineExpose({
  $slots: useSlots(),
  $attrs: useAttrs(),
  $refs: {
    multipleTable,
    filterComponents,
  },
  props,
  injectProps,
  headerLists: headerLists.value,
  powerfulTableData,
  stateData,
  resetList,
  getListData,
  handleSelectionChange,
  anewRender,
})
</script>

<script lang="ts">
export default {
  name: 'PowerfulTable',
}
</script>

<style src="./powerful-table.scss"></style>
