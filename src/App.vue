<template>
  <div class="app-container">
    <powerful-table
      :selectData="selectData"
      :list="list"
      :header="config"
      :total="total"
    >
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
    let list = reactive(lists)
    // 所有页面选中数组
    let selectData = reactive([{ a: 1 }])
    let selectCompare = reactive(["id", "a"])
    // let listLoading= ref(true)
    let isSelect = ref(true)
    let config = reactive(header)
    let total = ref(1)
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

    function handlersort (e) {
      console.log("远程排序", e)
    }
    function getList (obj, selectData) {
      let data = obj
        ? obj
        : {
          pageNum: 1,
          pageSize: 10,
        }

      // 切换页面赋值
      selectData = selectData
      if (obj) {
        ElMessage.success('切换页面操作，参数详情，查看控制台')
        console.log('page' + obj, '选中数组' + selectData)
      }
      // listLoading.value = true

      // getData(data).then((response:any) => {
      // 	list = response.data.list
      // // listLoading.value = false

      // 	total = response.data.total
      // })
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
      handlersort,
      getList,
      batchOperate,
      switchChange,
      handlerUpdate,
      handlerRemove,
    }
  },
})
</script>
