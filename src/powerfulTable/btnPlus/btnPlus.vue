<template>
  <div
    ref="clBtnPlus"
    :class="[
      btnConfig.hidden === 'none' ? 'hidden' : '',
      isPC ? 'cl-btn-plus' : 'cl-btn-plus-mobile',
    ]"
  >
    <el-button-group
      class="filter-item"
      :class="btnConfig.hidden === 'left' ? 'hidden' : ''"
    >
      <template v-for="(item, btnIndex) in btnList" :key="btnIndex">
        <el-button
          :size="item.size || 'mini'"
          :type="item.type"
          :icon="item.icon"
          :style="item.style || {}"
          :disabled="item.disabled || btnDisabled(item)"
          @click="batchOperate('left', item)"
        >
          {{ item.tip }}
        </el-button>
      </template>
    </el-button-group>
    <el-button-group
      class="filter-item"
      :class="btnConfig.hidden === 'right' ? 'hidden' : ''"
    >
      <template v-for="(item, index) in functionBtnList" :key="index">
        <el-tooltip
          class="each"
          effect="dark"
          :content="item.tip"
          placement="top"
        >
          <el-button
            :key="index"
            :size="item.size || 'mini'"
            :type="item.type || 'primary'"
            :icon="item.icon"
            @click="batchOperate('right', item)"
          />
        </el-tooltip>
      </template>
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-tooltip class="each" effect="dark" content="列" placement="top">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-s-grid"
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
        <template #dropdown>
          <el-dropdown-menu>
            <div class="dropdown-table" style="padding: 10px">
              <el-table
                :data="headerDatas"
                height="350"
                border
                highlight-current-row
                size="mini"
              >
                <el-table-column
                  align="center"
                  prop="label"
                  label="列名"
                  width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="显/隐"
                  width="80"
                  show-overflow-tooltip
                >
                  <template #default="scope">
                    <el-switch
                      v-model="scope.row.hidden"
                      :active-value="false"
                      :inactive-value="true"
                      @change="functionBtnChange($event, scope.row)"
                    ></el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="筛选"
                  width="80"
                  show-overflow-tooltip
                >
                  <template #default="scope">
                    <el-switch
                      v-model="scope.row.filters"
                      @change="functionBtnChange($event, scope.row)"
                    ></el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-button-group>
  </div>
</template>

<script lang='ts'>
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  computed,
  defineComponent,
} from "vue";
// import { useStore } from '/@/store/index';
export default defineComponent({
  name: "btnPlus",
  props: {
    // 按钮的配置数据
    btnConfig: {
      type: Array,
      default: () => [],
    },
    // 表格的配置数据
    tableConfig: {
      type: Array,
      default: () => [],
    },
    // 表格当前选择的数据集合
    multipleSelection: {
      type: Array,
      default: () => [],
    },
    // 判断是否为移动端
    isTable: Boolean,
  },
  emits: ["update:isTable", "functionBtnChange", "btnChange"],
  setup(props, { emit }) {
    const clBtnPlus = ref();
    // const store = useStore();
    const state = reactive({
      btnHeight: 0,
      btnList: [],
      headerData: [],
      functionBtnList: [
        {
          effect: "refresh",
          tip: "刷新",
          type: "info",
          icon: "el-icon-refresh",
        },
        {
          effect: "switch",
          tip: "切换",
          type: "info",
          icon: "el-icon-tickets",
        },
      ],
      // isPC: store.state.isPC.isPC,
      isPC: true,
    });
    // 过滤被隐藏的列
    const headerDatas = computed(() => {
      let arr = [];
      arr = state.headerData.filter((item: any) => item.label !== "操作");
      return arr;
    });
    /**
     * 判断按钮是否禁用
     * @param item 当前按钮数据
     * item.operateType 操作类型：none(默认) => 不需要选择数据；single => 有且只能操作一条数据；batch => 批量操作数据(至少选择一条数据以上)
     */
    const btnDisabled = computed(() => (item: any) => {
      let flag = false;
      // 默认不需要操作数据
      if (!item.operateType) return false;
      if (
        item.operateType === "single" &&
        props.multipleSelection.length !== 1
      ) {
        flag = true;
      } else if (
        item.operateType === "batch" &&
        props.multipleSelection.length < 1
      ) {
        flag = true;
      }
      return flag;
    });
    const functionBtnChange = (value: boolean, row: object) => {
      // console.log(value, row);
      emit("functionBtnChange");
    };
    const batchOperate = (type: string, item: any) => {
      if (type === "left") {
        emit("btnChange", item);
      } else {
        if (item.effect === "switch") {
          emit("update:isTable", !props.isTable);
        }
      }
    };
    onMounted(() => {
      state.btnHeight = clBtnPlus.value.offsetHeight;
    });
    watch(
      () => [props.btnConfig, props.tableConfig],
      ([newBtnConfig, newTableConfig]: any) => {
        state.btnList = newBtnConfig.btnList;
        state.headerData = newTableConfig.headerList;
      },
      { immediate: true, deep: true }
    );
    onMounted(() => {});
    return {
      headerDatas,
      clBtnPlus,
      btnDisabled,
      functionBtnChange,
      batchOperate,
      ...toRefs(state),
    };
  },
});
</script>
<style>
.hidden {
  display: none !important;
}
.cl-btn-plus {
  margin-top: 50px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-dropdown-menu {
  padding: 10px 20px !important;
}

/* .cl-btn-plus-mobile {
		.filter-item {
			margin-bottom: 10px;
		}
	} */
</style>