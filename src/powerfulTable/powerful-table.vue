<template>
  <div>
    <el-config-provider :locale="locale">
      <el-table
        v-loading="listLoading"
        :data="list"
        ref="multipleTable"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          v-if="isSelect"
          align="center"
          type="selection"
          width="45"
        >
        </el-table-column>

        <el-table-column
          v-for="(item, index) in header"
          :key="index"
          :fixed="item.fixed || false"
          :sortable="item.sortable || false"
          :header-align="item.headerAlign || 'center'"
          :show-overflow-tooltip="item.overflowTooltip || false"
          :align="item.headerAlign || 'center'"
          :prop="item.props[0].child || item.props[0].prop"
          :label="item.label"
          :min-width="item.minWidth || 140"
          :width="item.width || ''"
        >
          <template #default="scope">
            <div
              v-for="(prop, idx) in item.props"
              :key="idx"
              :style="prop.style || {}"
            >
              <RenderJsx
                v-if="typeof prop.render == 'function'" 
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <div v-else-if="scope.row[prop.prop] == undefined || scope.row[prop.prop] == null">
                <div v-if="prop.reserve" v-html="prop.reserve"></div>
                <div v-else>
                  <!-- <span>暂无数据</span> -->
                </div>
              </div>
              <!-- 筛选 -->
              <Filter 
                v-else-if="prop.filter && (prop.type == 'text' || prop.type == undefined)" 
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 图片 -->
              <Image 
                v-else-if="prop.type == 'image'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
                :align="item.headerAlign"
              />
              <!-- 按钮 -->
                <Button
                  v-else-if="prop.type == 'btn'" class="btnType"
                  :row="scope.row"
                  :index="scope.$index"
                  :prop="prop"
                  :align="item.headerAlign"
                  @returnEmit="returnEmit"
                />
              <!-- 开关 -->
              <Switch 
                v-else-if="prop.type == 'switch'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
                @returnEmit="returnEmit"
              />
              <!-- 输入框 -->
              <Input
                v-else-if="prop.type == 'input' || prop.type == 'textarea'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- iconfont -->
              <Icon
                v-else-if="prop.type == 'iconfont'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 标签 -->
              <Tags
                v-else-if="prop.type == 'tag'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 评分 -->
              <Rate
                v-else-if="prop.type == 'rate'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 超链接 -->
              <Link
                v-else-if="prop.type == 'href'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <Video
                v-else-if="prop.type == 'video'"
                :row="scope.row"
                :index="scope.$index"
                :prop="prop"
              />
              <!-- 插槽 -->
              <slot
                v-else-if="prop.type == 'slot'"
                :name="prop.slotName || 'default'"
                :row="scope.row"
                :index="scope.$index"
              >
              </slot>
              <!-- 正常 -->
              <div
                v-else-if="scope.row[prop.prop]"
                :class="{ content: develop[scope.$index] }"
              >
                <div
                  :style="{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': develop[scope.$index]
                      ? 99999
                      : prop.line || 3,
                  }"
                >
                  {{ prop.text || ""
                  }}{{
                    prop.child
                      ? scope.row[prop.prop][prop.child]
                      : scope.row[prop.prop] || prop.reserve || "暂无数据"
                  }}
                </div>
                <div
                  v-show="prop.develop"
                  class="develop el-link el-link--primary"
                  @click="develop[scope.$index] = !develop[scope.$index]"
                >
                  <span
                    :style="{
                      position: develop[scope.$index] ? 'absolute' : 'static',
                    }"
                  >
                    {{ develop[scope.$index] ? "收起" : "展开阅读全文" }}
                    <i
                      :class="
                        develop[scope.$index]
                          ? 'el-icon-arrow-up'
                          : 'el-icon-arrow-down'
                      "
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div
        style="display: flex; justify-content: space-between; margin-top: 20px"
      >
        <div
          class="pagination left"
          v-if="operate && isSelect && operate.operates"
        >
          <el-select
            v-model="operate.value"
            clearable
            placeholder="批量操作"
            :size="operate.size || 'small'"
          >
            <el-option
              v-for="(item, index) in operate.operates"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            :style="operate.style || { marginLeft: '20px' }"
            :icon="operate.icon || ''"
            :type="operate.type || 'primary'"
            :size="operate.size || 'small'"
            class="search-button"
            @click="batchOperate"
          >
            确定
          </el-button>
        </div>

        <div class="pagination" v-if="isPagination">
          <el-pagination
            @size-change="handleChange($event, 'pageSize')"
            @current-change="handleChange($event, 'currentPage')"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :layout="layout"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-config-provider>
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, ref, watchEffect, provide, reactive, getCurrentInstance } from 'vue';
import type { PropType } from 'vue'
import type { PowerfulTableHeader, PowerfulTableOperateData, EmitType } from '../../types/powerful-table'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

import RenderJsx from './components/render-jsx';
import Filter from './components/filter';
import Image from './components/image';
import Switch from './components/switch';
import Button from './components/button';
import Input from './components/input';
import Tags from './components/tags';
import Icon from './components/icon';
import Rate from './components/rate';
import Link from './components/link';
import Video from './components/video';

export default defineComponent({
  name: "powerful-table",
  props: {
    locale: {
      type: Object,
      default: zhCn
    },
    // 组件大小
    size: {
      type: String,
      default: 'small'
    },
    // 当前数据
    list: {
      type: Array,
      default: () => []
    },
    // 所有选中
    selectData: {
      type: Array,
      default: () => {
        return new Array
      }
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    selectCompare: {
      type: Array as PropType<string[]>,
      default: () => ['id', 'id']
    },

    header: {
      type: Array as PropType<PowerfulTableHeader[]>,
      default: () => []
    },

    // 分页数据
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30]
    },

    // 批量操作
    operateData: {
      type: Object as PropType<PowerfulTableOperateData>,
      default: () => {}
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
  },
  components: {
    RenderJsx,
    Filter,
    Image,
    Switch,
    Button,
    Input,
    Tags,
    Icon,
    Rate,
    Link,
    Video,
  },
  emits: ['update:currentPage', 'sortCustom', 'batchOperate', 'switchChange', 'sizeChange', 'query', 'success', 'add', 'update', 'remove', 'occupyOne', 'occupyTwo'],
  setup(props, { emit }) {
    /* ------ 注入数据 ------ */
    // 组件大小
    provide('size', props.size)
    // 单元格内布局
    provide('justifyFun', (val: string) => {
      const bol = ['center', 'left', 'right'].includes(val)
      return bol ? {'center': 'center', 'left': 'flex-start', 'right': 'flex-end'}[val] : 'center'
    })

    const { proxy } = getCurrentInstance() as any

    // 页面是否加载中
    const listLoading = ref(true)
    // 承载props的operateData
    const operate = reactive<PowerfulTableOperateData>({
      value: undefined,
      disabled: false,
      icon: '',
      style: {},
      operates: []
    })
    // 分页
    const currentPage = ref(1)
    // 当前页选中
    const currentSelect = ref([])
    // 其他页面选中
    const otherSelect = ref([])
    // 展开
    const develop = ref<boolean[]>([])
    const pageSize = ref(props.pageSizes[0])

    /* ----- 组件实例 ----- */
    const multipleTable = ref(null)

    watchEffect(() => {
      console.log('触发');
      
      if (props.selectData && props.selectData.length) {
        nextTick(() => {
          getSelect(props.selectData)
        })
      }

      Object.assign(operate, props.operateData)

      // list数据有的话 关闭加载中...
      // 更具当前list 数据 添加develop
      develop.value = Array(props.list.length).fill(false)
      listLoading.value = false
      nextTick(() => {
        getSelect(props.selectData, props.list)
      })
    })

    /* ------ 获取选中 ------ */
    const getSelect = (arr: any, list = props.list) => {

      if (!props.isSelect) return

      // 1.获取当前页
      // 2.总选中减去当前页
      // 3.得到其他页

      // 所有选中
      let all = arr
      // 获取当前页选中
      let current:any = []
      // 获取 其他页选中
      let other:any = []

      // 获取当前页
      if (all.length != 0) {
        // console.log('所有选中', all);
        // 获取当前页
        arr.forEach((item:any) => {
          let itm = list.filter((each) => {
            return item[props.selectCompare[0]] == (each as any)[props.selectCompare[1]]
          })

          if (itm.length > 0) {
            current.push(itm[0])
          }
        })

        // props.currentSelect = current
        // console.log('当前页选中', current)
        // 获取其他页
        if (current.length > 0) {
          other = JSON.parse(JSON.stringify(arr))
          for (let j in other) {
            current.forEach((item:any) => {
              if (item[props.selectCompare[1]] == other[j][props.selectCompare[0]]) {
                other.splice(j, 1)
              }
            })
          }
        } else {
          other = JSON.parse(JSON.stringify(arr))
        }

        otherSelect.value = other
        // console.log('其他页选中', otherSelect.value);

        if (current.length != 0) {
          current.forEach((row:any) => {
            (multipleTable.value as any).toggleRowSelection(row)
          })

        } else {
          (multipleTable.value as any).clearSelection()
        }
      } else {
        (multipleTable.value as any).clearSelection()
      }
    }

    /* ------ 排序方法 ------ */
    const sortChange = (obj: any) => {
      if (obj.column) {
        if (obj.column.sortable == 'custom') {
          emit('sortCustom', obj)
        }
      }
    }
    /* ------ 批量按钮 ------ */
    const batchOperate = () => {
      console.log(operate.value)
      if ((operate.value == undefined || operate.value == null) && operate.value !== 0) {
        proxy.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }

      if (currentSelect.value.length == 0) {
        proxy.$message({
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 1000
        })
        return
      }
      proxy.$confirm(`是否要进行批量${operate.operates[0].label}操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = otherSelect.value.concat(currentSelect.value).map((item: any) => item.id)
          let items = otherSelect.value.concat(currentSelect.value).map(item => item)

          emit('batchOperate', { ids, item: operate.operates[0], items })
        })
        .catch(() => {
          console.log('取消批量操作')
        })

    }
    /* ------ 当前组件的子组件回调 并在此组件暴露出去 ------ */
    const returnEmit = (emitName: EmitType, objVal: any) => {
      console.log('触发回调', emitName, objVal);
      
      emit(emitName, objVal)
    }
    /* ------ 添加选中 ------ */
    const handleSelectionChange = (e: any[]) => {
      // console.log('选中', e)
      currentSelect.value = JSON.parse(JSON.stringify(e))
    }
    /* ------ 条数或页数切换 ------ */
    const handleChange = (e: any, type: any) => {
      // [type].value = e
      console.log(type);
// TODO
      // get()
    }
    /* ------ 回调到组件上 ------ */
    const get = () => {
      let data = {
        pageNum: currentPage.value,
        pageSize: pageSize.value
      }

      try {
        // 如果父组件是getList方法 无需自定义事假
        proxy.$parent._getList(data, otherSelect.value.concat(currentSelect.value))
      } catch (error) {
        emit('sizeChange', data, otherSelect.value.concat(currentSelect.value))
      }
    }

    return {
      listLoading,
      operate,
      currentPage,
      currentSelect,
      otherSelect,
      develop,
      pageSize,
      multipleTable,

      returnEmit,
      handleChange,
      sortChange,
      batchOperate,
      handleSelectionChange
    }

  }
})
</script>

<style scoped>
.content {
  position: relative;
  padding-bottom: 23px;
}
.content > .develop {
  text-align: center;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.5)
  );
}

.content > .develop span {
  /* position: absolute; */
  bottom: 0;
  font-size: 12px;
}

.develop {
  width: 100%;
}

:deep(.btnType) {
  flex-wrap: wrap;
}

:deep(.btnType .btnEach) {
  margin-bottom: 5px;
  margin-top: 5px;
}
:deep(.btnType .notSpan span) {
  display: none;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.left {
  justify-content: flex-start;
}

.el-pagination {
  width: auto;
}
</style>
