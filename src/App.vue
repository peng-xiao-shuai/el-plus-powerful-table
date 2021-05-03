<template>
  <div class="app-container">
    <powerful-table
      :selectCompare="selectCompare"
      :isSelect="isSelect"
      :operateData="operateData"
      :selectData="selectData"
      :list="list"
      :header="config"
      :total="total"
      @switchChange="switchChange"
      @sortCustom="handlersort"
      @update="handlerUpdate"
      @remove="handlerRemove"
      @batchOperate="batchOperate"
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

export default {
  data () {
    return {
      list: lists,
      selectData: [{ a: 1 }],
      selectCompare: ["id", "a"],
      isSelect: true,
      config: header,
      total: 0,
      operateData: {
        value: "",
        size: "small",
        operates: [
          {
            label: "删除",
            value: 0,
          },
        ],
      },
    }
  },
  mounted () {
    this.getList()
  },
  methods: {

    handlersort (e) {
      console.log("远程排序", e)
    },
    getList (obj, selectData) {
      let data = obj
        ? obj
        : {
          pageNum: 1,
          pageSize: 10,
        }

      // 切换页面赋值
      selectData = selectData
      if (obj) {
        this.$message.success('切换页面操作，参数详情，查看控制台')
        console.log('page' + obj, '选中数组' + selectData)
      }
    },

    batchOperate (e) {
      this.$message.success('批量操作，参数详情，查看控制台')
      console.log("批量操作", e, e.ids)
    },

    switchChange (e) {
      this.$message.success('开关修改操作，参数详情，查看控制台')
      console.log("修改", e)
    },
    // 修改
    handlerUpdate (e) {
      this.$message.success('按钮修改操作，参数详情，查看控制台')
      console.log("修改", e)
    },
    handlerRemove (e) {
      this.$message.success('按钮删除操作，参数详情，查看控制台')
      console.log("删除", e, e.index)
    },
  },
};
</script>
