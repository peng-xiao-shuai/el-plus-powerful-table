<template>
	<div class="app-container">
		<powerful-table :selectCompare='selectCompare' :isSelect='isSelect' :operateData='operateData' :selectData='selectData' :list='list' :header='config' :total='total' 
		@switchChange='switchChange' @sortCustom='handlersort' @update='handlerUpdate' @remove='handlerRemove' @batchOperate='batchOperate'
		></powerful-table>
	</div>
</template>

<script lang='ts'>
	import { header,lists } from "./indexData"
	import powerfulTable from "./components/powerful-table.vue"
  import { reactive,ref,onMounted } from 'vue'

	export default {
		components: {
			powerfulTable
		},
    setup(){
      let list= reactive(lists)
				// 所有页面选中数组
			let selectData=reactive([{a:1}])
      let selectCompare = reactive(['id','a'])
			// let listLoading= ref(true)
			let isSelect= ref(true)
			let config= reactive(header)
			let total= ref(50)
			let operateData= reactive({
					value: '',
          size: 'small',
					operates: [
						{
							label: "删除",
							value: 0
						}
					],
			})

      function handlersort(e:any){
				console.log('远程排序',e);
			}
			function getList(obj?:any,selectData?:any[]) {
				
				let data = obj ? obj : {
					pageNum: 1,
					pageSize: 10
				}
				
				// 切换页面赋值
				selectData = selectData
				
				// listLoading.value = true
				
				// getData(data).then((response:any) => {
				// 	list = response.data.list
				// // listLoading.value = false

				// 	total = response.data.total
				// })
				
			}
			
			function batchOperate(ids:any[],e:object,rows:any[]){
				console.log('批量操作',ids,e,rows);
			}
			
			function switchChange(e:object){
				console.log('修改',e);
			}
			// 修改
			function handlerUpdate(e:object){
				console.log('修改',e);
			}
			function handlerRemove(e:object,i:number){
				console.log('删除',e,i);
				list.splice(i,1)
			}

      onMounted(()=>{
        getList()
      })

      return{
        // 变量
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
        handlerRemove

      }

    }
	}
</script>
