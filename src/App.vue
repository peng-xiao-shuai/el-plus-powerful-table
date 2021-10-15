<template>
  <div class="app-container">
    <powerful-table
      :list="list"
      isSelect
      :selectData="selectData"
      :selectCompare="selectCompare"
      :header="config"
      :operateData="operateData"
      :total="total"
      :pageSizes="[2,5,7]"
      @batchOperate="batchOperate"
      @switchChange="switchChange"
      @update="handlerUpdate"
      @remove="handlerRemove"
      @sizeChange="getList"
      
    >
      <template #empty>
        <div>
          23131
        </div>
      </template>
      <template #Link>
        <div>
          <el-input size="mini" placeholder="输入关键字搜索" />
        </div>
      </template>

      <template #A="{ row }">
        <div>
          <el-image
            style="width: 100px; border-radius: 10px"
            :src="row.imageUrl"
          ></el-image>
        </div>
      </template>
    </powerful-table>
  </div>
</template>

<script>
import { header, lists } from "./indexData"
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted, defineComponent } from "vue"

export default defineComponent({
  setup (props, context) {
    let rowA = reactive({ value: {} })
    let list = ref([])
    // 所有页面选中数组
    let selectData = reactive([{ a: 1 },{ a: 2 },{ a: 3 }])
    let selectCompare = reactive(["a", "id"])
    // let listLoading= ref(true)
    let isSelect = ref(true)
    let config = reactive(header)
    let total = ref(lists.length)
    let operateData = reactive({
      value: "",
      size: "small",
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

    function handlerSort (e) {
      console.log("远程排序", e)
    }
    function getList (data, selectData) {
      // 切换页面赋值
      selectData = selectData
      Object.assign(listQuery, data)
      
      if (data) {
        ElMessage.success('切换页面操作，参数详情，查看控制台')
        console.log('page' , data, '选中数组' , selectData)
      }
      // listLoading.value = true

      setTimeout(() => {
        list.value = lists.filter((item, index) => index >= (listQuery.pageNum - 1) * listQuery.pageSize && index < listQuery.pageNum * listQuery.pageSize)
      })
    }

    function batchOperate (e) {
      ElMessage.success('批量操作，参数详情，查看控制台')
      console.log("批量操作", e, e.ids)
    }

    function switchChange (e) {
      ElMessage.success('开关修改操作，参数详情，查看控制台')
      console.log("修改", e)
    }
    // 修改
    function handlerUpdate (e) {
      ElMessage.success('按钮修改操作，参数详情，查看控制台')
      console.log("修改", e)
    }
    function handlerRemove (e) {
      ElMessage.success('按钮删除操作，参数详情，查看控制台')
      console.log("删除", e, e.index)
    }

    onMounted(() => {
      getList()
    })

    return {
      // 变量
      rowA,
      list,
      selectData,
      selectCompare,
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
    }
  },
})
</script>
