<template>
  <div
    ref="clBtnPlus"
    :class="[
      btnConfig.hidden === 'none' ? 'hidden' : '',
      isPC ? 'cl-btn-plus' : 'cl-btn-plus-mobile',
    ]"
  >
    <!-- 左侧操作按钮 -->
    <el-button-group
      class="filter-item"
      :class="btnConfig.hidden === 'left' ? 'hidden' : ''"
    >
      <template v-for="item in btnList" :key="item.tip">
        <el-button
          :size="size || 'small'"
          :type="item.type"
          :icon="item.icon"
          :style="item.style || {}"
          :disabled="item.disabled || btnDisabled(item.operateType)"
          @click="batchOperate('left', item)"
        >
          {{ item.tip }}
        </el-button>
      </template>
    </el-button-group>

    <!-- 右侧操作按钮 -->
    <el-button-group
      class="filter-item"
      :class="btnConfig.hidden === 'right' ? 'hidden' : ''"
    >
      <template v-for="item in functionBtnList" :key="item.tip">
        <el-tooltip
          class="each"
          effect="dark"
          :content="item.tip"
          placement="top"
        >
          <el-button
            :size="size || 'small'"
            :type="item.type || 'primary'"
            :icon="item.icon"
            @click="batchOperate('right', item)"
          />
        </el-tooltip>
      </template>
      <!-- 下拉操作列 -->
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-tooltip class="each" effect="dark" content="列" placement="top">
          <el-button
            :size="size || 'small'"
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
                :data="headerData.filter(item => item.isShowOrFilterColumn !== false)"
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
                      v-if="scope.row.isShowOrFilterColumn === 'show' || scope.row.isShowOrFilterColumn === undefined"
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
                      v-if="scope.row.isShowOrFilterColumn === 'filter' || scope.row.isShowOrFilterColumn === undefined"
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
  PropType,
  inject,
  getCurrentInstance
} from "vue";
import { PowerfulTableHeader, BtnConfig } from '../../../types/powerful-table';
// import { useStore } from '/@/store/index';
export default defineComponent({
  name: "btnPlus",
  props: {
    // 按钮的配置数据
    btnConfig: {
      type: Object as PropType<BtnConfig.Config>,
      default: () => {},
    },
    // 表格的配置数据
    headerList: {
      type:  Array as PropType<PowerfulTableHeader[]>,
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
    const size = inject('size') as string
    const { proxy } = getCurrentInstance() as any;
    /* ------ 实例 ------ */
    const clBtnPlus = ref();
    // const store = useStore();
    type State = {
      btnHeight: number;
      btnList: BtnConfig.BtnList[];
      headerData: PowerfulTableHeader[];
      functionBtnList: {
          size?: '',
          effect?: string;
          tip: string;
          type?: string;
          icon?: string;
          showTip?: Boolean;
          tipContent?: string;
      }[];
      isPC: boolean;
    }
    const state = reactive<State>({
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
    /**
     * 判断左侧操作按钮是否禁用
     * @param item 当前按钮数据
     * item.operateType 操作类型：none(默认) => 不需要选择数据；single => 有且只能操作一条数据；batch => 批量操作数据(至少选择一条数据以上)
     */
    const btnDisabled = (operateType: 'none'|'single'|'batch'): boolean => {
      // 默认不需要操作数据
      if (operateType === "single" && props.multipleSelection.length !== 1) return true;
      if (operateType === "batch" && props.multipleSelection.length < 1) return true;
      return false;
    };
    
    const functionBtnChange = (value: boolean, row: object) => {
      // console.log(value, row);
      emit("functionBtnChange");
    };
    const batchOperate = (type: string, item: typeof state.functionBtnList[0]) => {
      if (type === "left") {
        // 是否显示提示
        if (item.showTip) {
          let content = item.tipContent || `是否要进行${item.tip}操作?`;
          proxy.$confirm(content, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            proxy.$parent.returnEmit("btnChange", {
              effect: item.effect,
              list: props.multipleSelection,
            })
          })

          return false
        }
        // 直接抛出
        proxy.$parent.returnEmit("btnChange", {
          effect: item.effect,
          list: props.multipleSelection,
        })

        return false
      }
      switch (item.effect) {
        case 'refresh':
          break;
        case 'switch':
          emit("update:isTable", !props.isTable);
          break;
        case 'columns':
          break;
      }
    };
    onMounted(() => {
      state.btnHeight = clBtnPlus.value.offsetHeight;
    });
    watch(
      () => [props.btnConfig, props.headerList],
      ([newBtnConfig, newHeaderList]: any) => {
        console.log(newBtnConfig);
        
        state.btnList = newBtnConfig.btnList;
        state.headerData = newHeaderList;
      },
      { immediate: true, deep: true }
    );
    return {
      clBtnPlus,
      btnDisabled,
      size,
      functionBtnChange,
      batchOperate,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped>
.hidden {
  display: none !important;
}
.cl-btn-plus {
  /* margin-top: 50px; */
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