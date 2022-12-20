<template>
  <div class="app-container">
    <!-- <PTButton></PTButton> -->
    <!-- <PTFDatePicker></PTFDatePicker> -->
    <PowerfulTable
      ref="powerfulTable"
      :list="list"
      :is-select="true"
      :btn-config="btnConfigs"
      :select-data="selectData"
      :select-compare="selectCompare"
      :header="headers"
      :operate-data="operateData"
      :total="total"
      :page-sizes="[2, 5, 7]"
      :tree="{ props: { hasChildren: 'hasChildren', children: 'cd' } }"
      :property="{
        'row-class-name': ({index}: any) => 'powerful-table-plus-row'
      }"
      @batch-operate="batchOperate"
      @switch-change="switchChange"
      @btn-click="handlerUpdate"
      @size-change="getList"
      @btn-change="btnChange"
      @refresh="handleRefresh"
      @row-click="handleClick"
    >
      <!-- <template #btn-left>
        <div>
          <el-button>1</el-button>
          <el-button>2</el-button>
        </div>
      </template> -->
      <!-- <template #btn-right>
        <div>
          <el-button>1</el-button>
          <el-button>2</el-button>
        </div>
      </template> -->
      <template #empty>
        <div>23131</div>
      </template>
      <template #Link>
        <div>
          <el-input size="small" placeholder="输入关键字搜索" />
        </div>
      </template>

      <template #A="{ row }">
        <div>
          {{ row.data?.getDate() + '日' }}
        </div>
      </template>
    </PowerfulTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { btnConfig, header, lists } from './indexData'
import type { PowerfulTableOperateData } from '../typings'
// import { PTButton, PTBtnPlus } from '../lib/index.js';

export default defineComponent({
  components: {
    // PTButton,
    // PTBtnPlus
  },
  setup(props, context) {
    const rowA = reactive({ value: {} })
    const list = ref<any>([])
    // 所有页面选中数组
    const selectData = ref([{ a: 1 }, { a: 2 }, { a: 3 }])
    const selectCompare = reactive(['a', 'id'])
    // let listLoading= ref(true)
    const isSelect = ref(true)
    const headers = reactive(header)
    const btnConfigs = reactive(btnConfig)
    const total = ref(lists.length)
    const powerfulTable = ref(null)
    const operateData = reactive<PowerfulTableOperateData>({
      value: '',
      icon: markRaw(Search),
      operates: [
        {
          label: '删除',
          value: 0,
        },
      ],
    })
    const listQuery = reactive({
      pageNum: 1,
      pageSize: 2,
    })

    function handlerSort(e: any) {
      console.log('远程排序', e)
    }
    function getList(data?: any, select?: any) {
      // 切换页面赋值
      selectData.value = select
      Object.assign(listQuery, data)

      if (data) {
        ElMessage.success('切换页面操作，参数详情，查看控制台')
        console.log('page', listQuery, '选中数组', selectData)
      }
      // listLoading.value = true

      setTimeout(() => {
        list.value = lists.filter(
          (item, index) =>
            index >= (listQuery.pageNum - 1) * listQuery.pageSize &&
            index < listQuery.pageNum * listQuery.pageSize
        )
      })
    }

    function batchOperate(e: any) {
      ElMessage.success('批量操作，参数详情，查看控制台')
      console.log('批量操作', e, e.ids)
    }

    function switchChange(e: any) {
      ElMessage.success('开关修改操作，参数详情，查看控制台')
      console.log('修改', e)
    }
    // 修改
    function handlerUpdate(e: any) {
      ElMessage.success('按钮修改操作，参数详情，查看控制台')
      console.log('修改', e)
    }
    function handlerRemove(e: any) {
      ElMessage.success('按钮删除操作，参数详情，查看控制台')
      console.log('删除', e, e.index)
    }
    function handleClick(e: any) {
      ElMessage.success('行点击事件，参数详情，查看控制台')
      console.log('行点击', e, e.index)
    }
    // 左侧按钮回调
    function btnChange(e: any) {
      if (e.effect === 'add') {
        ElMessage.success('新增操作，参数详情，查看控制台')
        console.log('新增操作', e.effect, e.list)
      } else if (e.effect === 'edit') {
        ElMessage.success('修改操作，参数详情，查看控制台')
        console.log('修改操作', e.effect, e.list)
      } else if (e.effect === 'remove') {
        ElMessage.success('批量删除操作，参数详情，查看控制台')
        console.log('批量删除操作', e.effect, e.list)
      }
    }

    const handleRefresh = () => {
      ElMessage.success('刷新')
    }

    onMounted(() => {
      getList()
    })

    return {
      // 变量
      rowA,
      list,
      btnConfigs,
      selectData,
      selectCompare,
      powerfulTable,
      // listLoading,
      isSelect,
      headers,
      total,
      operateData,
      // 方法
      handlerSort,
      getList,
      batchOperate,
      switchChange,
      handlerUpdate,
      handlerRemove,
      btnChange,
      handleRefresh,
      handleClick,
    }
  },
})
</script>

<style>
@import url('https://at.alicdn.com/t/font_2351447_a0951v7l8p.css');
</style>
