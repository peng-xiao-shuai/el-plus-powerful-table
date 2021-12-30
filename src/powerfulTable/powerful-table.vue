<template>
  <div>
    <!-- 按钮组件 -->
    <btn-plus
      ref="btnPlusRef"
      v-model:isTable="isTable"
      :btn-config="btnConfig"
      :headerList="header"
      :multiple-selection="currentSelect"
    >
      <template #btn-left v-if="$slots['btn-left']">
        <slot name="btn-left"></slot>
      </template>
      <template #btn-right v-if="$slots['btn-right']">
        <slot name="btn-right"></slot>
      </template>
    </btn-plus>

    <el-config-provider
      ref="configProvider"
      :locale="locale || (injectProps && injectProps.locale) || en"
    >
      <el-table
        class="powerful-table"
        v-loading="listLoading"
        :data="tableLists"
        ref="multipleTable"
        element-loading-text="Loading"
        border
        fit
        row-key="id"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @row-click="rowClick"
        :lazy="(tree && tree.lazy) || false"
        :load="tree && tree.load"
        :tree-props="
          (tree && tree.props) || {
            children: 'children',
            hasChildren: 'hasChildren',
          }
        "
      >
        <template #empty>
          <slot name="empty">
            <span>暂无数据</span>
          </slot>
        </template>

        <el-table-column
          v-if="isSelect"
          align="center"
          type="selection"
          width="45"
        >
        </el-table-column>

        <el-table-column
          v-for="(item, index) in headerLists"
          :key="item.label + index"
          :fixed="item.fixed || false"
          :sortable="item.sortable || false"
          :header-align="item.headerAlign || 'center'"
          :align="item.headerAlign || 'center'"
          :show-overflow-tooltip="item.overflowTooltip || false"
          :prop="Array.isArray(item.props) ? item.props[0].prop : item.props.prop"
          :label="item.label"
          :min-width="item.minWidth || 140"
          :width="item.width || ''"
          :class-name="item.headerAlign || 'center'"
        >
          <!-- 用户自定义表头 -->
          <template #header v-if="item.headerSlotName">
            <slot :name="item.headerSlotName" :item="item" :index="index">
            </slot>
          </template>

          <!-- 内置自定义表头 -->
          <template v-if="item.filters && (item.isShowOrFilterColumn == undefined || item.isShowOrFilterColumn === 'filter') && !item.headerSlotName" #header>
            <f-select
              v-if="
                getPropObj(item).filter ||
                getPropObj(item).filtersType === 'select' ||
                getPropObj(item).type === 'switch' ||
                getPropObj(item).type === 'tag'
              "
              :header-data="item"
              :prop-data="getPropObj(item)"
              @headerFilterChange="headerFilterChange"
            ></f-select>
            <f-date-picker
              v-else-if="getPropObj(item).filtersType === 'date'"
              :header-data="item"
              @headerFilterChange="headerFilterChange"
            ></f-date-picker>
            <f-input
              v-else
              :header-data="item"
              @headerFilterChange="headerFilterChange"
            ></f-input>
          </template>

          <template #default="scope">
            <div
              v-for="(prop, idx) in Array.isArray(item.props) ? item.props : [item.props]"
              :key="idx"
              :style="{
                display: index == 0 ? 'inline-block' : 'block',
                ...prop.style,
              }"
            >
              <RenderJsx
                v-if="typeof prop.render == 'function'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 插槽 -->
              <slot
                v-else-if="prop.type == 'slot'"
                :name="prop.slotName || 'default'"
                :row="scope.row"
                :index="scope.$index"
              >
              </slot>
              <div
                v-else-if="
                  (scope.row[prop.prop] == undefined ||
                    scope.row[prop.prop] == null) &&
                  prop.type != 'btn'
                "
              >
                <div v-if="prop.reserve" v-html="prop.reserve"></div>
                <div v-else>
                  <span>暂无数据</span>
                </div>
              </div>
              <!-- 筛选 -->
              <Filter
                v-else-if="prop.filter && (prop.type == 'text' || prop.type == undefined)"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 图片 -->
              <Image
                v-else-if="prop.type == 'image'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 按钮 -->
              <Button
                v-else-if="prop.type == 'btn'"
                v-bind="bindAttr(prop, scope, item)"
                @returnEmit="returnEmit"
              />
              <!-- 开关 -->
              <Switch
                v-else-if="prop.type == 'switch'"
                v-bind="bindAttr(prop, scope, item)"
                @returnEmit="returnEmit"
              />
              <!-- 输入框 -->
              <Input
                v-else-if="prop.type == 'input' || prop.type == 'textarea'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- iconfont -->
              <Icon
                v-else-if="prop.type == 'iconfont'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 标签 -->
              <Tags
                v-else-if="prop.type == 'tag'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 评分 -->
              <Rate
                v-else-if="prop.type == 'rate'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 超链接 -->
              <Link
                v-else-if="prop.type == 'href'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <Video
                v-else-if="prop.type == 'video'"
                v-bind="bindAttr(prop, scope, item)"
              />
              <!-- 正常 -->
              <div
                v-else-if="scope.row[prop.prop]"
                :class="{ content: develop[scope.$index] }"
              >
                <!-- 主体内容 -->
                <div
                  :style="prop.data && prop.data.develop ? {
                    display: '-webkit-box',
                    overflow: 'hidden',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': develop[scope.$index]
                      ? 99999
                      : prop.data && prop.data.line || 3
                  } : {}"
                >
                  {{
                    prop.data && typeof prop.data.customFilterFun == "function"
                      ? prop.data.customFilterFun(scope.row, scope.$index)
                      : scope.row[prop.prop]
                  }}
                </div>

                <!-- 展开全文或收起 -->
                <div
                  v-show="prop.data && prop.data.develop"
                  class="develop el-link el-link--primary"
                  @click.stop="develop[scope.$index] = !develop[scope.$index]"
                >
                  <span
                    :style="{
                      position: develop[scope.$index] ? 'absolute' : 'static',
                    }"
                  >
                    {{ develop[scope.$index] ? "收起" : "展开阅读全文" }}
                    <i
                      :class="
                        develop[scope.$index]
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div
        style="display: flex; justify-content: space-between; margin-top: 20px"
      >
        <!-- 批量操作 -->
        <div
          class="pagination left"
          v-if="operate && isSelect && operate.operates"
        >
          <el-select
            v-model="operate.value"
            clearable
            :placeholder="
              configProvider && configProvider.locale.name == 'zh-cn'
                ? '批量操作'
                : 'lot operation'
            "
            :size="size || (injectProps && injectProps.size) || 'small'"
          >
            <el-option
              v-for="(item, index) in operate.operates"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button
            :style="operate.style || { marginLeft: '20px' }"
            :icon="operate.icon || ''"
            :type="operate.type || 'primary'"
            :size="size || (injectProps && injectProps.size) || 'small'"
            class="search-button"
            @click="batchOperate"
          >
            确定
          </el-button>
        </div>

        <!-- 分页操作 -->
        <div class="pagination" v-if="isPagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="pageSizes"
            :layout="layout"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-config-provider>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  nextTick,
  watchEffect,
  provide,
  getCurrentInstance,
  inject,
  toRefs,
  computed,
  watch,
} from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
  PowerfulTableHeaderProps,
  PowerfulTableTree,
} from "../../types/powerful-table";
import { powerfulTableProps, powerfulTableEmits, useState, useFunction } from './powerful-table';
import { compare } from '../utils/format-data';
import en from "element-plus/lib/locale/lang/en";

import btnPlus from "./btnPlus/btnPlus.vue";
import fDatePicker from "./components/filter/fDatePicker";
import fInput from "./components/filter/fInput";
import fSelect from "./components/filter/fSelect";
import RenderJsx from "./components/render-jsx";
import Filter from "./components/filter";
import Image from "./components/image";
import Switch from "./components/switch";
import Button from "./components/button";
import Input from "./components/input";
import Tags from "./components/tags";
import Icon from "./components/icon";
import Rate from "./components/rate";
import Link from "./components/link";
import Video from "./components/video";
// 获取 布局方向
const justifyFun = (val: string) => {
  const bol = ["center", "left", "right"].includes(val);
  return bol
    ? { center: "center", left: "flex-start", right: "flex-end" }[val]
    : "center";
};

export default defineComponent({
  name: "powerful-table",
  props: powerfulTableProps,
  emits: powerfulTableEmits,
  components: {
    btnPlus,
    fDatePicker,
    fInput,
    fSelect,
    RenderJsx,
    Filter,
    Image,
    Switch,
    Button,
    Input,
    Tags,
    Icon,
    Rate,
    Link,
    Video,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any;

    /* ------ data数据 ------ */
    const {
      multipleTable,
      configProvider,
      powerfulTableData,
      injectProps,
      state
    } = useState(props)

    /* ------ 注入数据 ------ */
    // 语言
    provide("locale", props.locale || (injectProps && injectProps.locale) || en);
    // 组件大小
    provide("size", props.size || injectProps?.size || "small");
    // 单元格内布局
    provide("justifyFun", justifyFun);

    /* ------  操作方法  ------ */
    const {
      handleSelectionChange,
      rowClick,
      returnEmit,
      sortChange,
      batchOperate,
      get
    } = useFunction(emit, powerfulTableData)

    watchEffect(() => {
      Object.assign(powerfulTableData.operate, props.operateData);

      // list数据有的话 关闭加载中...
      // 更具当前list 数据 添加develop
      powerfulTableData.develop = Array(state.tableLists.length).fill(false);
      powerfulTableData.listLoading = false;

      // 为表格添加选中
      if (state.tableLists.length && powerfulTableData.currentSelect.length == 0) {
        nextTick(() => {
          getSelect();
        })
      }
    });

    // 过滤被隐藏的列
    const headerLists = computed(() => {
      return props.header.filter(column => !column.hidden)
    });

    /* --- 按钮组件参数及方法begin --- */
    // 为表格数据重新赋值
    watch(
      () => [props.list],
      ([newList]: any) => {
        state.tableLists = newList;
      },
      { immediate: true, deep: true }
    );
    watch(
      ()=> [powerfulTableData.currentPage, powerfulTableData.pageSize],
      ([newPage, newSize]: any) => {
        get()
      }
    )

    // 重新渲染表格
    const anewRender = () => {
      nextTick(() => {
        multipleTable.value.doLayout();
      });
    };

    /**
     * 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
     */
    const headerFilterChange = (value: number | string | (number | string)[], column: PowerfulTableHeader) => {
      const tableLists = props.list;

      if (!value) {
        state.tableLists = tableLists;
        return false;
      }

      let propObj: PowerfulTableHeaderProps<any> = getPropObj(column);

      // 判断监听类型
      if (
        propObj.filter ||
        propObj.filtersType === "select" ||
        propObj.type === "switch"
      ) {
        state.tableLists = tableLists.filter((item: any) => {
          let isShow = (value as (number | string)[]).some(prop => {
            switch (propObj.type) {
              // tag类型单独判断
              case 'tag':
                const tagVal: string[] = (typeof item[propObj.prop] == 'string' ? item[propObj.prop].split(',') : item[propObj.prop]).map((num: string | number) => String(num))
                return tagVal.indexOf(String(prop)) != -1
              default:
                return item[propObj.prop] == prop;
            }
          });
          return isShow;
        });
        // TODO 暂时无法并列过滤数据
        // state.tableLists = [...state.tableLists, ...tableData];
      } else if (propObj.filtersType === "date") {
        const valueAs = value as any[]
        state.tableLists = tableLists.filter((item: typeof props.list[0]) => {
          return compare(item[propObj.prop], valueAs[0], valueAs[1]);
        });
      } else {
        state.tableLists = tableLists.filter((item: typeof props.list[0]) => {
          return item[propObj.prop] && String(item[propObj.prop]).indexOf(String(value)) != -1;
        });
      }
    };

    /* ------  获取需要过滤的prop  ------ */
    const getPropObj = (column: PowerfulTableHeader): PowerfulTableHeaderProps<any> => {
      // 获取过滤项
      let propObj: PowerfulTableHeaderProps<any> = {prop: ''}
      // 判断是否数组
      if (!Array.isArray(column.props)) {
        propObj = column.props
        return propObj
      }
      // 是数组的情况下 首先判断单元格prop的数量
      if (column.props.length === 1) {
        propObj = column.props[0];
      } else if (column.props.length > 1) {
        // 如果数量在两个以上，则需要用户使用(filterItem: true)指定过滤项，未指定则取第一个
        const queryFilterItem = column.props.find(item => item.filterItem)
        // 如果设置了一个或多个过滤项则取过滤后的第一个，如果没设置则取props第一个prop
        propObj = queryFilterItem ? queryFilterItem : column.props[0];
      }
      return propObj;
    };
    /* --- 按钮组件参数及方法end --- */

    /* ------ 获取选中 ------ */
    const getSelect = (arr: any[] = props.selectData, list = state.tableLists) => {
      if (!props.isSelect) return;

      // 1.获取当前页
      // 2.总选中减去当前页
      // 3.得到其他页

      // 获取当前页选中
      let current: any[] = [];
      // 获取 其他页选中
      let other: any[] = [];

      // 获取当前页
      if (arr.length != 0) {
        // console.log('所有选中', arr);
        // 获取当前页
        arr.forEach((item) => {
          let itm = list.filter((each: typeof list[0]) => {
            return item[props.selectCompare[0]] == (each as any)[props.selectCompare[1]]
          });

          if (itm.length > 0) current.push(itm[0]);
        });

        // 获取其他页
        if (current.length > 0) {
          other = JSON.parse(JSON.stringify(arr));
          for (let j in other) {
            current.forEach((item) => {
              if (item[props.selectCompare[1]] == other[j][props.selectCompare[0]]) {
                other.splice(Number(j), 1);
              }
            });
          }
        } else {
          other = JSON.parse(JSON.stringify(arr));
        }

        powerfulTableData.otherSelect = other;
        powerfulTableData.currentSelect = current;
        // console.log('当前页选中', current)
        // console.log('其他页选中', other);

        if (current.length != 0) {
          current.forEach((row) => {
            (multipleTable.value as any).toggleRowSelection(row);
          });
        } else {
          (multipleTable.value as any).clearSelection();
        }
      } else {
        (multipleTable.value as any).clearSelection();
      }
    };

    return {
      headerLists,
      ...toRefs(state),
      headerFilterChange,
      getPropObj,
      ...toRefs(powerfulTableData),

      multipleTable,
      configProvider,
      injectProps,
      en,

      rowClick,
      bindAttr: <D>(prop: PowerfulTableHeaderProps<any, D>, scope: typeof props.list[0], item: PowerfulTableHeader<typeof scope>) => {
        return {
          row: scope.row,
          index: scope.$index,
          prop,
          aligning: item.headerAlign || 'center'
        }
      },
      anewRender,
      returnEmit,
      sortChange,
      batchOperate,
      handleSelectionChange,
      getSelect
    };
  },
});
</script>

<style src='./powerful-table.css'></style>
