<template>
  <div class="pt">
    <!-- 按钮组件 -->
    <PTBtnPlus
      v-if="btnConfig !== undefined"
      ref="btnPlusRef"
      v-model:isTable="isTable"
      :btn-config="btnConfig"
      :header-list="header"
      :multiple-selection="currentSelect"
      @change="(...arg) => emit('btn-plus-change', ...arg)"
      @refresh="emit('btn-plus-refresh')"
    >
      <template v-if="$slots['btn-left']" #btn-left>
        <slot name="btn-left" />
      </template>
      <template v-if="$slots['btn-right']" #btn-right>
        <slot name="btn-right" />
      </template>
    </PTBtnPlus>

    <el-table
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
        'tree-props': (tree && tree.props) || {
          children: 'children',
          hasChildren: 'hasChildren',
        },
        size: Size,
        ...property,
      }"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @row-click="rowClick"
    >
      <template #empty>
        <slot name="empty">
          <span>{{ t(LangKey.NoData) }}</span>
        </slot>
      </template>

      <el-table-column
        v-if="isSelect"
        align="center"
        type="selection"
        width="45"
        :selectable="selectable ? selectable : () => true"
      />

      <el-table-column
        v-for="(item, index) in headerLists"
        :key="item.label + index"
        v-bind="{
          fixed: item.fixed || false,
          sortable: item.sortable || false,
          'header-align': item.headerAlign || 'left',
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
                getPropObj(item).filters ||
                getPropObj(item).filtersType === 'select' ||
                getPropObj(item).type === 'switch' ||
                getPropObj(item).type === 'tag'
              "
              ref="filterComponents"
              :header-data="item"
              :list="list"
              :prop-data="getPropObj(item)"
              @header-filter-change="headerFilterChange"
            />
            <PTFDatePicker
              v-else-if="getPropObj(item).filtersType === 'date'"
              ref="filterComponents"
              :header-data="item"
              :list="list"
              @header-filter-change="headerFilterChange"
            />
            <PTFInput
              v-else
              ref="filterComponents"
              :header-data="item"
              :list="list"
              @header-filter-change="headerFilterChange"
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
          >
            <PTRenderJsx
              v-if="typeof prop.render == 'function'"
              :row="scope.row"
              :index="scope.$index"
              :prop="prop"
              :aligning="item.property?.align || item.headerAlign"
            />
            <!-- 插槽 -->
            <slot
              v-else-if="prop.type == 'slot'"
              :name="prop.slotName || 'default'"
              :row="scope.row"
              :index="scope.$index"
            />
            <div
              v-else-if="
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
            <!-- 筛选 -->
            <PTFilter
              v-else-if="
                prop.filters && (prop.type == 'text' || prop.type == undefined)
              "
              v-bind="bindAttr(prop, scope, item)"
            />
            <!-- 动态组件 -->
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
              @btn-click="(payload: any) => emit('btn-click', payload)"
              @switch-change="(row: any) => emit('switch-change', row)"
            />
            <!-- @component-emit="componentEmit" -->
            <!-- 正常 -->
            <PTText
              v-else-if="scope.row[prop.prop]"
              v-bind="bindAttr(prop, scope, item)"
              :list-length="tableLists.length"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div
      style="display: flex; justify-content: space-between; margin-top: 20px"
    >
      <!-- 批量操作 -->
      <div
        v-if="operate && isSelect && operate.operates"
        class="pagination left"
      >
        <el-select v-model="operate.value" clearable :size="Size">
          <el-option
            v-for="(item, index) in operate.operates"
            :key="'operate' + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button
          :style="operate.style || { marginLeft: '20px' }"
          :icon="operate.icon || ''"
          :type="operate.type || 'primary'"
          :size="Size"
          class="search-button"
          @click="batchOperate"
        >
          {{ t(LangKey.Confirm) }}
        </el-button>
      </div>

      <!-- 分页操作 -->
      <!-- TODO 扩展参数 -->
      <div v-if="isPagination" class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :small="Size === 'small' ? true : false"
          :page-sizes="pageSizes"
          :layout="layout"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, toRefs, watch, watchEffect } from 'vue'
import { deepClone } from '../../index'
import { JustifyFunSymbol, SizeSymbol } from '../../keys'
// import en from "element-plus/lib/locale/lang/en";
import { useFilters } from '../../filter/useFilters'
import {
  powerfulTableProps,
  useFunction,
  usePowerfulTableStates,
} from './powerful-table-data'
import type { ComponentEvent } from './powerful-table-data'
import type {
  BtnConfig,
  BtnDataType,
  PowerfulTableLabelValue,
} from '../../../typings'
import { LangKey, t } from '~/locale/lang'
type Row = typeof props.list[number]
// 自定义事件类型
type EmitEventType = {
  (
    e: 'btn-plus-change',
    payload: { effect: BtnConfig.BtnList['effect']; list: any[] }
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
  (e: 'component-emit', componentEvent: ComponentEvent, ...args: any): void
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
// 获取 布局方向
const justifyFun = (val: string): string => {
  const bol = ['center', 'left', 'right'].includes(val)
  return bol
    ? { center: 'center', left: 'flex-start', right: 'flex-end' }[val]!
    : 'center'
}

const props = defineProps(powerfulTableProps)
const emit = defineEmits<EmitEventType>()
/* ------ data数据 ------ */
const { powerfulTableData, multipleTable, filterComponents, stateData, Size } =
  usePowerfulTableStates<Row>(props)

// 局部过滤hook
const { headerFilterChange, getPropObj } = useFilters<Row>(
  stateData,
  props,
  multipleTable
)

/* ------  操作方法  ------ */
const {
  handleSelectionChange,
  rowClick,
  componentEmit,
  sortChange,
  batchOperate,
  get,
  matchComponents,
  bindAttr,
} = useFunction<Row>(emit, powerfulTableData)

const { tableLists, isTable } = toRefs(stateData)
const { listLoading, currentPage, pageSize, currentSelect, operate } =
  toRefs(powerfulTableData)

/* ------ 注入数据 ------ */
// 组件大小
provide(SizeSymbol, Size)
// 单元格内布局
provide(JustifyFunSymbol, justifyFun)

watchEffect(() => {
  Object.assign(powerfulTableData.operate, props.operateData)

  // list数据有的话 关闭加载中...
  // 更具当前list 数据 添加develop
  powerfulTableData.develop = Array.from<boolean>({
    length: stateData.tableLists.length,
  }).fill(false)
  powerfulTableData.listLoading = false
})

// 判断列表是否存在数据，存在则查询选中
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

/* --- 按钮组件参数及方法begin --- */
// 为表格数据重新赋值
watch(
  () => props.list as Row[],
  (newList) => {
    stateData.tableLists = newList || []
  },
  { immediate: true, deep: true }
)
watch(
  () => [powerfulTableData.currentPage, powerfulTableData.pageSize],
  () => {
    // 切换页面清除表头选中
    if (Array.isArray(filterComponents.value)) {
      filterComponents.value.forEach((item: any) => {
        item.state.value = ''
      })
    } else {
      // filterComponents.value.forEach((item: any) => {
      // item.state.value = ''
      // })
    }

    get()
  }
)

// 过滤被隐藏的列
const headerLists = computed(() =>
  props.header.filter((column) => !column.isShowColumn)
)

// 重新渲染表格
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
      const l = list.filter((each: typeof list[0]) => {
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
</script>

<script lang="ts">
export default {
  name: 'PowerfulTable',
}
</script>

<style src="./powerful-table.css"></style>
