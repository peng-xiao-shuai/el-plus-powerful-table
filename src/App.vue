<template>
  <div class="app-container">
    <powerful-table
      ref='powerfulTable'
      :list="list"
      isSelect
      :btnConfig="btnConfigs"
      :selectData="selectData"
      :selectCompare="selectCompare"
      :header="config"
      :operateData="operateData"
      :total="total"
      :pageSizes="[2, 5, 7]"
      @batchOperate="batchOperate"
      @switchChange="switchChange"
      @btnClick="handlerUpdate"
      @sizeChange="getList"
      @btnChange="btnChange"
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
          <el-input size="mini" placeholder="输入关键字搜索" />
        </div>
      </template>

      <template #A="{ row }">
        <div>
          {{row.data}}
        </div>
      </template>
    </powerful-table>
  </div>
</template>

<script lang="ts">
import { btnConfig, header, lists } from "./indexData"
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted, defineComponent, nextTick } from "vue"

export default defineComponent({
  setup (props, context) {
    let rowA = reactive({ value: {} })
    let list = ref<any>([])
    // 所有页面选中数组
    let selectData = reactive([{ a: 1 }, { a: 2 }, { a: 3 }])
    let selectCompare = reactive(["a", "id"])
    // let listLoading= ref(true)
    let isSelect = ref(true)
    let config = reactive(header)
    let btnConfigs = reactive(btnConfig)
    let total = ref(lists.length)
    const powerfulTable = ref(null)
    let operateData = reactive({
      value: "",
      operates: [
        {
          label: "删除",
          value: 0,
        },
      ],
    })
    const listQuery = reactive({
      pageNum: 1,
      pageSize: 2
    })

    function handlerSort (e: any) {
      console.log("远程排序", e)
    }
    function getList (data?: any, selectData?: any) {
      // 切换页面赋值
      selectData = selectData
      Object.assign(listQuery, data)

      if (data) {
        ElMessage.success('切换页面操作，参数详情，查看控制台')
        console.log('page', data, '选中数组', selectData)
      }
      // listLoading.value = true

      setTimeout(() => {
        list.value = lists.filter((item, index) => index >= (listQuery.pageNum - 1) * listQuery.pageSize && index < listQuery.pageNum * listQuery.pageSize)
      })
    }

    function batchOperate (e: any) {
      ElMessage.success('批量操作，参数详情，查看控制台')
      console.log("批量操作", e, e.ids)
    }

    function switchChange (e: any) {
      ElMessage.success('开关修改操作，参数详情，查看控制台')
      console.log("修改", e)
    }
    // 修改
    function handlerUpdate (e: any) {
      ElMessage.success('按钮修改操作，参数详情，查看控制台')
      console.log("修改", e)
    }
    function handlerRemove (e: any) {
      ElMessage.success('按钮删除操作，参数详情，查看控制台')
      console.log("删除", e, e.index)
    }
    // 左侧按钮回调
    function btnChange (e: any) {
      if (e.effect === 'add') {
        ElMessage.success('新增操作，参数详情，查看控制台')
        console.log("新增操作", e.effect, e.list)
      } else if (e.effect === 'edit') {
        ElMessage.success('修改操作，参数详情，查看控制台')
        console.log("修改操作", e.effect, e.list)
      } else if (e.effect === 'remove') {
        ElMessage.success('批量删除操作，参数详情，查看控制台')
        console.log("批量删除操作", e.effect, e.list)
      }
    };

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
      config,
      total,
      operateData,
      // 方法
      handlerSort,
      getList,
      batchOperate,
      switchChange,
      handlerUpdate,
      handlerRemove,
      btnChange
    }
  },
})
</script>
