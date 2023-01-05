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
      v-if="
        (injectProps && ['all', 'left'].includes(injectProps.btnSlot || '')) ||
        ['all', 'left'].includes(btnConfig.btnSlot || '')
      "
      name="btn-left"
    >
      <!-- 左侧操作按钮 -->
      <el-button-group
        class="filter-item"
        :class="btnConfig.hidden === 'left' ? 'hidden' : ''"
      >
        <template v-for="item in btnConfig.btnList" :key="item.tip">
          <el-button
            v-if="
              typeof item.showBtn === 'function'
                ? item.showBtn()
                : item.showBtn === undefined
                ? true
                : item.showBtn
            "
            v-bind="{
              size: size || 'small',
              type: item.type,
              icon: item.icon,
              style: item.style || {},
              disabled: item.disabled || btnDisabled(item.operateType),
              ...item.property,
            }"
            @click="batchOperate('left', item)"
          >
            {{ item.text }}
          </el-button>
        </template>
      </el-button-group>
    </slot>

    <slot
      v-if="
        (injectProps && ['all', 'right'].includes(injectProps.btnSlot || '')) ||
        ['all', 'right'].includes(btnConfig.btnSlot || '')
      "
      name="btn-right"
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
            <el-tooltip
              class="each"
              effect="dark"
              :content="t(LangKey.Column)"
              placement="top"
            >
              <el-button
                :size="size || 'small'"
                type="info"
                :icon="Grid"
                @click="
                  batchOperate('right', {
                    effect: 'columns',
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
                  <div>{{ t(LangKey.ColumnName) }}</div>
                  <div class="checkbox">{{ t(LangKey.Hidden) }}</div>
                  <div class="checkbox">{{ t(LangKey.Filter) }}</div>
                </div>
                <el-scrollbar style="height: 300px">
                  <div
                    v-for="(row, index) in state.headerData.filter(
                      (item) => item.isShowOrFilterColumn !== false
                    )"
                    :key="index"
                    class="dropdown-table-row"
                  >
                    <div>{{ row.label }}</div>
                    <el-checkbox
                      v-model="row.isShowColumn"
                      class="checkbox"
                      :disabled="
                        !(
                          row.isShowOrFilterColumn === 'show' ||
                          row.isShowOrFilterColumn === undefined
                        )
                      "
                      :size="size || 'small'"
                      @change="functionBtnChange()"
                    />
                    <el-checkbox
                      v-model="row.isFilterColumn"
                      class="checkbox"
                      :disabled="
                        !(
                          row.isShowOrFilterColumn === 'filter' ||
                          row.isShowOrFilterColumn === undefined
                        )
                      "
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

<script setup lang="ts">
import {
  getCurrentInstance,
  inject,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { Grid, Refresh } from '@element-plus/icons-vue'
import { PowerfulTableSymbol, SizeSymbol } from '../../keys'
import type {
  BtnConfig,
  PowerfulTableHeader,
  Size,
  ThemeType,
} from '../../../typings'
import type { Component, PropType } from 'vue'
import { LangKey, t } from '~/locale/lang'

const props = defineProps({
  // 按钮的配置数据
  btnConfig: {
    type: Object as PropType<BtnConfig.Config>,
    required: true,
  },
  // 表格的配置数据
  headerList: Array as PropType<PowerfulTableHeader[]>,
  // 表格当前选择的数据集合
  multipleSelection: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  // 判断是否为移动端
  isTable: Boolean,
})
const emit = defineEmits<{
  (e: 'update:isTable', isTable: boolean): void
}>()

const size = inject(SizeSymbol)
const injectProps = inject(PowerfulTableSymbol, {})

const { proxy } = getCurrentInstance() as any
/* ------ 实例 ------ */
const clBtnPlus = ref()
// const store = useStore();
type State = {
  btnHeight: number
  headerData: PowerfulTableHeader[]
  functionBtnList: {
    size?: Size
    effect?: string
    tip: string
    type?: ThemeType
    icon?: PropType<string | Component>
    showTip?: boolean
    tipContent?: string
  }[]
  isPC: boolean
}
const state = reactive<State>({
  btnHeight: 0,
  headerData: [],
  functionBtnList: [
    {
      effect: 'refresh',
      tip: t(LangKey.Refresh),
      type: 'info',
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
})

// 实例
const dropdown = ref()
/**
 * 判断左侧操作按钮是否禁用
 * @param item 当前按钮数据
 * item.operateType 操作类型：none(默认) => 不需要选择数据；single => 有且只能操作一条数据；batch => 批量操作数据(至少选择一条数据以上)
 */
const btnDisabled = (operateType?: 'none' | 'single' | 'batch'): boolean => {
  // 默认不需要操作数据
  if (operateType === 'single' && props.multipleSelection.length !== 1)
    return true
  if (operateType === 'batch' && props.multipleSelection.length < 1) return true
  return false
}

const functionBtnChange = () => {
  proxy.$parent.anewRender()
}
const batchOperate = (type: string, btnItem: BtnConfig.BtnList) => {
  if (type === 'left') {
    // 是否显示提示
    if (btnItem.showTip) {
      const content =
        btnItem.tipContent ||
        t<(s?: string) => string>(LangKey.OperateHint)(btnItem.text)

      proxy
        .$confirm(content, t(LangKey.Hint), {
          confirmButtonText: t(LangKey.Confirm),
          cancelButtonText: t(LangKey.Cancel),
          type: 'warning',
        })
        .then(() => {
          proxy.$parent.returnEmit('btnChange', {
            effect: btnItem.effect,
            list: props.multipleSelection,
          })
        })

      return false
    }
    // 直接抛出
    proxy.$parent.returnEmit('btnChange', {
      effect: btnItem.effect,
      list: props.multipleSelection,
    })

    return false
  }
  switch (btnItem.effect) {
    case 'refresh':
      proxy.$parent.returnEmit('refresh', {})
      break
    case 'switch':
      emit('update:isTable', !props.isTable)
      break
    case 'columns':
      break
  }
}
onMounted(() => {
  state.btnHeight = clBtnPlus.value.offsetHeight
})
watch(
  () => [props.headerList],
  ([newHeaderList]: any) => {
    state.headerData = newHeaderList
  },
  { immediate: true, deep: true }
)
</script>

<script lang="ts">
export default {
  name: 'PTBtnPlus',
}
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
      width: 30%;
    }

    &:last-of-type {
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }

  &-header {
    border-bottom: none;
    color: var(--el-text-color-regular);

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
