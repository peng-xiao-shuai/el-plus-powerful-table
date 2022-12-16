<template>
  <div
    ref="clBtnPlus"
    :class="[
      'pt-btn-plus',
      btnConfig.hidden === 'none' ? 'hidden' : '',
      state.isPC ? 'cl-btn-plus' : 'cl-btn-plus-mobile',
    ]"
  >
    <slot
      name="btn-left"
      v-if="
        (injectProps && ['all', 'left'].includes(injectProps.btnSlot || '')) ||
        ['all', 'left'].includes(btnConfig.btnSlot || '')
      "
    >
      <!-- 左侧操作按钮 -->
      <el-button-group
        class="filter-item"
        :class="btnConfig.hidden === 'left' ? 'hidden' : ''"
      >
        <template v-for="item in btnConfig.btnList" :key="item.tip">
          <el-button
            :size="size || 'small'"
            :type="item.type"
            :icon="item.icon"
            :style="item.style || {}"
            :disabled="item.disabled || btnDisabled(item.operateType)"
            v-if="
              typeof item.showBtn === 'function'
                ? item.showBtn()
                : item.showBtn === undefined
                ? true
                : item.showBtn
            "
            @click="batchOperate('left', item)"
          >
            {{ item.text }}
          </el-button>
        </template>
      </el-button-group>
    </slot>

    <slot
      name="btn-right"
      v-if="
        (injectProps && ['all', 'right'].includes(injectProps.btnSlot || '')) ||
        ['all', 'right'].includes(btnConfig.btnSlot || '')
      "
    >
      <!-- 右侧操作按钮 -->
      <el-button-group
        class="filter-item"
        :class="btnConfig.hidden === 'right' ? 'hidden' : ''"
      >
        <template v-for="item in state.functionBtnList" :key="item.tip">
          <el-tooltip
            class="each"
            effect="dark"
            :content="item.tip"
            placement="top"
          >
            <el-button
              :size="item.size || size || 'small'"
              :type="item.type || 'primary'"
              :icon="Refresh"
              @click="batchOperate('right', item)"
            />
          </el-tooltip>
        </template>
        <!-- 下拉操作列 -->
        <el-dropdown ref="dropdown" trigger="click" :hide-on-click="false">
          <div>
            <el-tooltip class="each" effect="dark" content="列" placement="top">
              <el-button
                :size="size || 'small'"
                type="info"
                :icon="Grid"
                @click="
                  batchOperate('right', {
                    effect: 'columns',
                    tip: '列',
                    type: 'info',
                    icon: 'el-icon-s-grid',
                  })
                "
              />
            </el-tooltip>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="dropdown-table">
                <div class="dropdown-table-row dropdown-table-header">
                  <div>列名</div>
                  <div class="checkbox">隐藏</div>
                  <div class="checkbox">筛选</div>
                </div>
                <el-scrollbar style="height: 300px">
                  <div class="dropdown-table-row" v-for="row in state.headerData.filter(item => (item.isShowOrFilterColumn !== false))">
                    <div>{{row.label}}</div>
                    <el-checkbox
                      class="checkbox"
                      :disabled="!(row.isShowOrFilterColumn === 'show' || row.isShowOrFilterColumn === undefined)"
                      v-model="row.hidden"
                      :size="size || 'small'"
                      @change="functionBtnChange()"
                    />
                    <el-checkbox
                      class="checkbox"
                      :disabled="!(row.isShowOrFilterColumn === 'filter' || row.isShowOrFilterColumn === undefined)"
                      v-model="row.filters"
                      :size="size || 'small'"
                      @change="functionBtnChange()"
                    />
                  </div>
                </el-scrollbar>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-button-group>
    </slot>
  </div>
</template>

<script setup lang='ts'>
import {
  ref,
  reactive,
  onMounted,
  watch,
  inject,
  PropType,
  getCurrentInstance,
  Component,
} from "vue";
import {
  PowerfulTableHeader,
  BtnConfig,
  Size,
  ThemeType,
  InjectProps,
} from "../../../typings";
import { Grid, Refresh } from "@element-plus/icons-vue";

type Props = {
  // 按钮的配置数据
  btnConfig: BtnConfig.Config;
  // 表格的配置数据
  headerList: PowerfulTableHeader[];
  // 表格当前选择的数据集合
  multipleSelection: any[];
  // 判断是否为移动端
  isTable: Boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(["update:isTable", "btnChange"]);

const size = inject("size") as Size;
const injectProps = inject<InjectProps>("powerfulTable") || {};

const { proxy } = getCurrentInstance() as any;
/* ------ 实例 ------ */
const clBtnPlus = ref();
// const store = useStore();
type State = {
  btnHeight: number;
  headerData: PowerfulTableHeader[];
  functionBtnList: {
    size?: Size;
    effect?: string;
    tip: string;
    type?: ThemeType;
    icon?: PropType<string | Component>;
    showTip?: Boolean;
    tipContent?: string;
  }[];
  isPC: boolean;
};
const state = reactive<State>({
  btnHeight: 0,
  headerData: [],
  functionBtnList: [
    {
      effect: "refresh",
      tip: "刷新",
      type: "info",
      icon: Refresh,
    },
    // {
    //   effect: "switch",
    //   tip: "切换",
    //   type: "info",
    //   icon: "el-icon-tickets",
    // },
  ],
  // isPC: store.state.isPC.isPC,
  isPC: true,
});

// 实例
const dropdown = ref();
/**
 * 判断左侧操作按钮是否禁用
 * @param item 当前按钮数据
 * item.operateType 操作类型：none(默认) => 不需要选择数据；single => 有且只能操作一条数据；batch => 批量操作数据(至少选择一条数据以上)
 */
const btnDisabled = (operateType?: "none" | "single" | "batch"): boolean => {
  // 默认不需要操作数据
  if (operateType === "single" && props.multipleSelection.length !== 1)
    return true;
  if (operateType === "batch" && props.multipleSelection.length < 1)
    return true;
  return false;
};

const functionBtnChange = () => {
  proxy.$parent.anewRender();
};
const batchOperate = (type: string, item: unknown) => {
  if (type === "left") {
    const btnItem = item as BtnConfig.BtnList;
    // 是否显示提示
    if (btnItem.showTip) {
      let content = btnItem.tipContent || `是否要进行${btnItem.text}操作?`;
      proxy
        .$confirm(content, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          proxy.$parent.returnEmit("btnChange", {
            effect: btnItem.effect,
            list: props.multipleSelection,
          });
        });

      return false;
    }
    // 直接抛出
    proxy.$parent.returnEmit("btnChange", {
      effect: btnItem.effect,
      list: props.multipleSelection,
    });

    return false;
  }
  const functionBtnItem = item as typeof state.functionBtnList[0];
  switch (functionBtnItem.effect) {
    case "refresh":
      proxy.$parent.returnEmit("refresh", {});
      break;
    case "switch":
      emit("update:isTable", !props.isTable);
      break;
    case "columns":
      break;
  }
};
onMounted(() => {
  state.btnHeight = clBtnPlus.value.offsetHeight;
});
watch(
  () => [props.headerList],
  ([newHeaderList]: any) => {
    state.headerData = newHeaderList;
  },
  { immediate: true, deep: true }
);
</script>

<script lang='ts'>
export default {
  name: "PTBtnPlus",
};
</script>

<style lang="scss">
.dropdown-table {
  padding: 10px;
  width: 250px;
  box-sizing: border-box;
  font-size: 14px;

  &-row {
    display: flex;
    border-left: 1px solid var(--el-border-color-lighter);
    box-sizing: border-box;
    color: var(--el-text-color-secondary);

    & > div,
    & > .checkbox {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      border-right: 1px solid var(--el-border-color-lighter);
      border-top: 1px solid var(--el-border-color-lighter);
      box-sizing: border-box;
      padding: 8px 0;
    }
    & > .checkbox {
      width: 20%;
    }

    &:last-of-type {
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }

  &-header {
    border-bottom: none;
    color: var(--el-text-color-regular);;

    & > div {
      font-weight: bold;
    }
  }
}
</style>

<style scoped lang="scss">
.pt-btn-plus {
  &.hidden {
    display: none !important;
  }
  &.cl-btn-plus {
    /* margin-top: 50px; */
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .el-dropdown-menu {
    padding: 10px 20px !important;
  }
}
</style>