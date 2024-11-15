<template>
  <div class="app-container">
    <a
      style="
        display: block;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      "
      href="https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-demo.html"
      >更多示例</a
    >

    <PowerfulTable
      ref="powerfulTable"
      :is-select="true"
      :btn-config="btnConfigs"
      :select-data="selectData"
      :select-compare="selectCompare"
      :header="headers"
      :operate-data="operateData"
      :pagination-property="{
        pageSizes: [2, 5, 7],
      }"
      :list-request="{
        listApi,
      }"
      :tree="{ props: { hasChildren: 'hasChildren', children: 'cd' } }"
      :property="{
        rowClassName: ({index}: any) => 'powerful-table-plus-row'
      }"
      @batch-operate="batchOperate"
      @switch-change="handleSwitchChange"
      @btn-click="handlerUpdate"
      @size-change="getList"
      @btn-plus-change="btnChange"
      @btn-plus-refresh="handleRefresh"
      @row-click="handleClick"
      @component-event="handleComponentEvent"
    >
      <!-- <template #btn-left>
        <div>
          <el-button>1</el-button>
          <el-button>2</el-button>
        </div>
      </template>
      <template #btn-right>
        <div class="111">
          <el-button>3</el-button>
          <el-button>4</el-button>
        </div>
      </template> -->
      <!-- <template #empty>
        <div>暂无车型数据</div>
      </template> -->
      <template #Link>
        <div>
          <el-input
            v-model="engineName"
            size="small"
            placeholder="输入发动机名称"
          />
        </div>
      </template>

      <template #date="{ row }">
        <div>
          {{ row.data }}
        </div>
      </template>
    </PowerfulTable>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { btnConfig, header, lists } from './indexData'
import type { Lists } from './indexData'
import type {
  EmitEnum,
  Handlers,
  PowerfulTableExpose,
  PowerfulTableOperateData,
} from 'es'
export default defineComponent({
  components: {
    // PTBtnPlus
  },
  setup() {
    const rowA = reactive({ value: {} })
    const currentList = ref<any>([])
    // 所有页面选中数组
    const selectData = ref([{ a: 1 }, { a: 3 }])
    const selectCompare = reactive(['a', 'id'])
    // let listLoading= ref(true)
    const isSelect = ref(true)
    const headers = reactive(header())
    const btnConfigs = reactive(btnConfig)
    const total = ref(lists.length)
    const powerfulTable = ref<PowerfulTableExpose | null>(null)
    const operateData = reactive<PowerfulTableOperateData>({
      value: '',
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
    const engineName = ref('')

    const handleComponentEvent = (e: any, ...arg: any) => {
      console.log(
        `接受到${e.componentName}组件返回的${e.eventType}事件`,
        e,
        arg
      )
    }

    function handlerSort(e: any) {
      console.log('远程排序', e)
    }
    function getList(e?: { params: any; select: any }) {
      // 切换页面赋值
      // if (e?.select) selectData.value = e?.select
      Object.assign(listQuery, e?.params)

      if (e?.params) {
        ElMessage.success('切换页面操作，参数详情，查看控制台')
        console.log('page', listQuery, '选中数组', selectData)
      }

      listApi({
        pageNo: 1,
        pageSize: 2,
      }).then((res: any) => {
        currentList.value = res.data.result.rows
      })
      // listLoading.value = true
    }

    const listApi = (params?: any) => {
      console.log(params)

      return new Promise((resolve) => {
        setTimeout(() => {
          const rows = lists.filter((item, index) => {
            return (
              index >= (params.pageNo - 1) * params.pageSize &&
              index < params.pageNo * params.pageSize
            )
          })
          resolve({
            data: {
              result: {
                rows,
                total: lists.length,
              },
              message: '成功',
              code: '200',
            },
          })
        })
      })
    }

    function batchOperate(e: any) {
      ElMessage.success('批量操作，参数详情，查看控制台')
      console.log('批量操作', e, e.ids)
    }

    function handleSwitchChange(e: any) {
      ElMessage.success('开关修改操作，参数详情，查看控制台')
      console.log('修改', e)
    }
    // 修改
    const handlerUpdate: Handlers<Lists>[EmitEnum.BtnClick] = (e) => {
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
        console.log('新增操作', e)
      } else if (e.effect === 'edit') {
        ElMessage.success('修改操作，参数详情，查看控制台')
        console.log('修改操作', e)
      } else if (e.effect === 'remove') {
        ElMessage.success('批量删除操作，参数详情，查看控制台')
        console.log('批量删除操作', e)
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
      // list,
      btnConfigs,
      selectData,
      selectCompare,
      powerfulTable,
      engineName,
      currentList,
      // listLoading,
      isSelect,
      headers,
      total,
      operateData,
      // 方法
      listApi,

      handlerSort,
      handleComponentEvent,
      getList,
      batchOperate,
      handleSwitchChange,
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
@import url('https://at.alicdn.com/t/c/font_2351447_xw9ezbg0kb.css');
</style>
