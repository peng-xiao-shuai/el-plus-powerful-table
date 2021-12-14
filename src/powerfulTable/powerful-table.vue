<template>
  <div>
    <el-config-provider
      ref="configProvider"
      :locale="locale || (injectProps && injectProps.locale) || en"
    >
      <!-- 按钮组件 -->
      <btn-plus
        ref="btnPlusRef"
        v-model:isTable="isTable"
        :btn-config="btnConfig"
        :table-config="tableConfigs"
        :multiple-selection="currentSelect"
        @functionBtnChange="functionBtnChange"
        @btnChange="btnChange"
      ></btn-plus>
      <el-table
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
          :prop="item.props[0].child || item.props[0].prop"
          :label="item.label"
          :min-width="item.minWidth || 140"
          :width="item.width || ''"
          :class-name="item.headerAlign || 'center'"
        >
          <!-- 自定义表头 -->
          <!-- <template #header v-if="item.headerSlotName">
            <slot :name="item.headerSlotName" :item="item" :index="index">
            </slot>
          </template> -->

          <template v-if="item.isFilterColumn" #header>
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
              v-for="(prop, idx) in item.props"
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
                class="btnType"
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
                  :style="{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': develop[scope.$index]
                      ? 99999
                      : (prop.data && prop.data.line) || 3,
                  }"
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
            @size-change="handleChange($event, 'pageSize')"
            @current-change="handleChange($event, 'currentPage')"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
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
  ref,
  watchEffect,
  provide,
  reactive,
  getCurrentInstance,
  inject,
  toRefs,
  computed,
  watch,
  PropType
} from "vue";
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
  PowerfulTableHeaderProps,
  PowerfulTableTree,
  EmitType,
  InjectProps,
} from "../../types/powerful-table";
import { powerfulTableProps, powerfulTableEmits } from './powerful-table';
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
    // 全局此组件注入的数据
    const injectProps = inject<InjectProps>("powerfulTable");

    /* ------ 注入数据 ------ */
    // 语言
    provide("locale", props.locale || (injectProps && injectProps.locale) || en);
    // 组件大小
    provide("size", props.size || injectProps?.size || "small");
    // 单元格内布局
    provide("justifyFun", justifyFun);

    /* ------ data数据 ------ */
    // 页面是否加载中
    const listLoading = ref(true);
    // 承载props的operateData
    const operate = reactive<PowerfulTableOperateData>({
      value: undefined,
      disabled: false,
      icon: "",
      style: undefined,
      operates: [],
    });
    // 分页
    const currentPage = ref(1);
    // 当前页选中
    const currentSelect = ref([]);
    // 其他页面选中
    const otherSelect = ref<any[]>([]);
    const pageSize = ref(props.pageSizes[0]);
    // 展开
    const develop = ref<boolean[]>([]);
    // 组件参数
    const state = reactive({
      tableConfigs: {
        headerList: props.header,
      },
      tableLists: [] as any[],
      isPC: true,
      isTable: true,
    });

    /* ----- 组件实例 ----- */
    const multipleTable = ref();
    const configProvider = ref<{ locale: { name: string } } | null>(null);

    watchEffect(() => {
      Object.assign(operate, props.operateData);

      // list数据有的话 关闭加载中...
      // 更具当前list 数据 添加develop

      develop.value = Array(state.tableLists.length).fill(false);
      listLoading.value = false;
      nextTick(() => {
        getSelect(props.selectData, state.tableLists);
      });
    });

    // 过滤被隐藏的列
    const headerLists = computed(() => {
      return props.header.filter((column: any) => !column.hidden);
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
    // 左侧按钮回调
    const btnChange = (res: any) => {
      if (res.showTip) {
        let content = res.tipContent || `是否要进行${res.tip}操作?`;
        proxy
          .$confirm(content, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            emit("btnChange", {
              effect: res.effect,
              list: currentSelect.value,
            });
          });
      } else {
        emit("btnChange", {
          effect: res.effect,
          list: currentSelect.value,
        });
      }
    };
    // 按钮右侧列按钮回调
    const functionBtnChange = () => {
      nextTick(() => {
        multipleTable.value.doLayout();
      });
    };

    /**
     * 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
     */
    const headerFilterChange = (value: any, column: any) => {
      const tableLists = props.list;
      let tableData: any[] = [];

      if (!value) {
        state.tableLists = tableLists;
        return false;
      }

      let propObj: PowerfulTableHeaderProps<any> = getPropObj(column);

      // 判断监听类型
      if (
        propObj.filter ||
        propObj.filtersType === "select" ||
        propObj.type === "switch" ||
        propObj.type === "tag"
      ) {
        tableData = tableLists.filter((item: any) => {
          let isShow = value.some((prop: any) => {
            return item[propObj.prop] == prop;
          });
          return isShow;
        });
        // TODO 暂时无法并列过滤数据
        // state.tableLists = [...state.tableLists, ...tableData];
      } else if (propObj.filtersType === "date") {
        tableData = tableLists.filter((item: any) => {
          // return compare(item[propObj.prop], value[0], value[1]);
        });
      } else {
        console.log(value, column, propObj.prop);
        tableData = tableLists.filter((item: any) => {
          console.log(item[propObj.prop]);
          return item[propObj.prop] && item[propObj.prop].indexOf(value) >= 0;
        });
      }
      state.tableLists = tableData;
    };
    const getPropObj = (column: any) => {
      // 获取过滤项
      let propObj: PowerfulTableHeaderProps<any> = { prop: "" };
      // 首先判断单元格prop的数量
      if (column.props.length === 1) {
        propObj = column.props[0];
      } else if (column.props.length > 1) {
        // 如果数量在两个以上，则需要用户使用(filterItem: true)指定过滤项，未指定则取第一个
        let iResult: PowerfulTableHeaderProps<any>[] = [{ prop: "" }];
        iResult = column.props.filter((item: PowerfulTableHeaderProps<any>) => {
          return item.filterItem;
        });
        // 如果设置了一个或多个过滤项则取过滤后的第一个，如果没设置则取props第一个prop
        propObj = iResult.length ? iResult[0] : column.props[0];
      }
      return propObj;
    };
    /* --- 按钮组件参数及方法end --- */

    /* ------ 获取选中 ------ */
    const getSelect = (arr: any[], list = props.list) => {
      if (!props.isSelect) return;

      // 1.获取当前页
      // 2.总选中减去当前页
      // 3.得到其他页

      // 所有选中
      let all = arr;
      // 获取当前页选中
      let current: any[] = [];
      // 获取 其他页选中
      let other: any[] = [];

      // 获取当前页
      if (all.length != 0) {
        // console.log('所有选中', all);
        // 获取当前页
        arr.forEach((item) => {
          let itm = list.filter((each: typeof list[0]) => {
            return (
              item[props.selectCompare[1]] ==
              (each as any)[props.selectCompare[0]]
            );
          });

          if (itm.length > 0) {
            current.push(itm[0]);
          }
        });

        // console.log('当前页选中', current)
        // 获取其他页
        if (current.length > 0) {
          other = JSON.parse(JSON.stringify(arr));
          for (let j in other) {
            current.forEach((item) => {
              if (
                item[props.selectCompare[1]] == other[j][props.selectCompare[0]]
              ) {
                other.splice(Number(j), 1);
              }
            });
          }
        } else {
          other = JSON.parse(JSON.stringify(arr));
        }

        otherSelect.value = other;
        // console.log('其他页选中', otherSelect.value);

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
    /* ------ 排序方法 ------ */
    const sortChange = (obj: any) => {
      if (obj.column) {
        if (obj.column.sortable == "custom") {
          emit("sortCustom", obj);
        }
      }
    };
    /* ------ 批量按钮 ------ */
    const batchOperate = () => {
      // console.log(operate.value)
      if (
        (operate.value == undefined || operate.value == null) &&
        operate.value !== 0
      ) {
        proxy.$message({
          message: "请选择操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }

      if (currentSelect.value.length == 0) {
        proxy.$message({
          message: "请选择要操作的数据",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      proxy
        .$confirm(`是否要进行批量${operate.operates[0].label}操作?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          let ids = otherSelect.value
            .concat(currentSelect.value)
            .map((item) => item.id);
          let items = otherSelect.value
            .concat(currentSelect.value)
            .map((item) => item);

          emit("batchOperate", { ids, item: operate.operates[0], items });
        })
        .catch(() => {
          // console.log('取消批量操作')
        });
    };
    const rowClick = (...arg: any) => {
      returnEmit("row-click", { ...arg });
    };
    /* ------ 当前组件的子组件回调 并在此组件暴露出去 ------ */
    const returnEmit = (emitName: EmitType, objVal: any) => {
      // console.log('触发回调', emitName, objVal);

      emit(emitName, objVal);
    };
    /* ------ 添加选中 ------ */
    const handleSelectionChange = (e: any[]) => {
      // console.log('选中', e)
      currentSelect.value = JSON.parse(JSON.stringify(e));
    };
    /* ------ 条数或页数切换 ------ */
    const handleChange = (e: number, type: string) => {
      type === "pageSize" ? (pageSize.value = e) : (currentPage.value = e);
      get();
    };
    /* ------ 回调到组件上 ------ */
    const get = () => {
      let data = {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      };

      try {
        // 如果父组件是getList方法 无需自定义事件
        proxy.$parent._getList(
          data,
          otherSelect.value.concat(currentSelect.value)
        );
      } catch (error) {
        emit("sizeChange", data, otherSelect.value.concat(currentSelect.value));
      }
    };

    return {
      headerLists,
      ...toRefs(state),
      btnChange,
      functionBtnChange,
      headerFilterChange,
      getPropObj,

      develop,
      listLoading,
      operate,
      currentPage,
      currentSelect,
      otherSelect,
      pageSize,
      multipleTable,
      configProvider,
      injectProps,
      en,

      rowClick,
      bindAttr: (prop: PowerfulTableHeaderProps<typeof scope>, scope: typeof props.list[0], item: PowerfulTableHeader<typeof scope>) => {
        return {
          row: scope.row,
          index: scope.$index,
          prop: prop,
          aligning: item.headerAlign
        }
      },
      returnEmit,
      handleChange,
      sortChange,
      batchOperate,
      handleSelectionChange,
    };
  },
});
</script>

<style scoped>
/* 树表格时icon和文字居中 */
:deep(.cell) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
:deep(.center .cell) {
  justify-content: center;
}
:deep(.right .cell) {
  justify-content: flex-end;
}

.content {
  position: relative;
  padding-bottom: 23px;
}
.content > .develop {
  text-align: center;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.5)
  );
}

.content > .develop span {
  /* position: absolute; */
  bottom: 0;
  font-size: 12px;
}

.develop {
  width: 100%;
}

:deep(.btnType) {
  flex-wrap: wrap;
}

:deep(.btnType .btnEach) {
  margin-bottom: 5px;
  margin-top: 5px;
}
:deep(.btnType .notSpan span) {
  display: none;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.left {
  justify-content: flex-start;
}

.el-pagination {
  width: auto;
}
</style>
