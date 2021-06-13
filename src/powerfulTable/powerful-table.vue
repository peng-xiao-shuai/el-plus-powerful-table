<template>
  <div>
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
        align="center"
        :prop="item.props[0].child || item.props[0].prop"
        :label="item.label"
        :min-width="item.minWidth || 140"
        :width="item.width || ''"
      >
        <template #default="scope">
          <div
            v-for="(each, idx) in item.props"
            :key="idx"
            :style="each.style || {}"
          >
            <!-- 筛选 -->
            <div v-if="each.filter">
              <div v-if="scope.row[each.prop] !== 'undefined'">
                {{ each.text || ""
                }}{{
                  filterFun(
                    each.child
                      ? scope.row[each.prop][each.child]
                      : scope.row[each.prop],
                    each.filter
                  )
                }}
              </div>
              <div v-else>
                <div v-if="each.reserve" v-html="each.reserve"></div>
                <div v-else>
                  <b>暂无数据</b>
                </div>
              </div>
            </div>
            <!-- 图片 -->
            <div
              v-else-if="
                each.type == 'image' && scope.row[each.prop] !== 'undefined'
              "
            >
              {{ each.text || "" }}
              <el-image
                :src="scope.row[each.prop]"
                :preview-src-list="
                  each.data.preview === false ? [] : [scope.row[each.prop]]
                "
                :lazy="each.data.lazy === false ? false : true"
                :z-index="each.data.zIndex || 6000"
                :style="each.data.style || {}"
                :fit="each.data.fit || 'cover'"
              ></el-image>
            </div>
            <!-- 按钮 -->
            <div v-else-if="each.type == 'btn'" class="btnType">
              <template v-for="(apiece, idx) in each.data" :key="idx">
                <el-tooltip
                  class="btnEach"
                  effect="dark"
                  :content="apiece.tip"
                  placement="top"
                  v-if="
                    apiece.showBtn == undefined
                      ? true
                      : apiece.showBtn(scope.row, scope.$index) === false
                      ? false
                      : true
                  "
                >
                  <template #default>
                    <el-button
                      :style="apiece.style || {}"
                      :icon="apiece.icon || ''"
                      :disabled="apiece.disabled || false"
                      :type="apiece.type || 'primary'"
                      :size="apiece.size || 'small'"
                      @click="
                        btnChange(
                          apiece.emit,
                          scope.row,
                          scope.$index,
                          apiece.type
                        )
                      "
                      >{{ apiece.text || apiece.tip }}</el-button
                    >
                  </template>
                </el-tooltip>
              </template>
            </div>
            <!-- 开关 -->
            <div v-else-if="each.type == 'switch'">
              {{ each.text || "" }}
              <el-switch
                :style="each.data.style || {}"
                :inactive-text="each.data.inactiveText || ''"
                :active-text="each.data.activeText || ''"
                v-model="scope.row[each.prop]"
                :disabled="each.data.disabled || false"
                :active-color="each.data.activeColor"
                :inactive-color="each.data.inactiveColor"
                :active-value="
                  each.data.activeValue || each.data.activeValue === 0
                    ? each.data.activeValue
                    : 1
                "
                :inactive-value="each.data.inactiveValue || 0"
                @click="
                  !each.data.disabled &&
                    switchChange(
                      scope.row,
                      each.prop,
                      each.data.activeValue,
                      each.data.inactiveValue,
                      each.data.beforeFunction
                    )
                "
              >
              </el-switch>
            </div>
            <!-- 输入框 -->
            <div
              v-else-if="
                each.type == 'input' && scope.row[each.prop] !== 'undefined'
              "
            >
              {{ each.text || "" }}
              <el-input
                :style="each.data.style || {}"
                :size="each.data.size || 'small'"
                :placeholder="each.data.placeholder || ''"
                v-model="scope.row[each.prop]"
                :disabled="each.data.disabled || false"
              >
                <template
                  style="padding: 0 10px"
                  v-if="each.data.slot"
                  v-slot:[each.data.slot]
                  >{{ each.data.symbol }}</template
                >
              </el-input>
            </div>
            <!-- iconfont -->
            <div
              v-else-if="
                each.type == 'iconfont' && scope.row[each.prop] !== 'undefined'
              "
            >
              {{ each.text || "" }}
              <i
                :class="[scope.row[each.prop], ...each.data.class] || ['']"
                :style="each.data.style || {}"
              ></i>
            </div>
            <!-- 标签 -->
            <div
              v-else-if="
                each.type == 'tag' && scope.row[each.prop] !== 'undefined'
              "
            >
              <el-tag
                v-for="tag in tagToArray(
                  scope.row[each.prop],
                  (each.data && each.data.number) || 3
                )"
                style="margin-right: 10px"
                :key="tag"
                :closable="false"
                :type="each.data.type || 'primary'"
                :effect="(each.data && each.data.effect) || 'light'"
                :color="(each.data && each.data.color) || ''"
                :hit="(each.data && each.data.hit) || false"
                >{{ each.filter ? filterFun(tag, each.filter) : tag }}</el-tag
              >
            </div>
            <!-- 评分 -->
            <div
              v-else-if="
                each.type == 'rate' && scope.row[each.prop] !== 'undefined'
              "
            >
              {{ each.text || "" }}
              <el-rate
                v-model="scope.row[each.prop]"
                :colors="each.data.colors || ['#F7BA2A', '#F7BA2A', '#F7BA2A']"
                :max="each.data.max || 5"
                :disabled="true"
                :style="each.data.style || {}"
                :allow-half="each.data.allowHalf || false"
                :icon-classes="
                  each.data.iconClass || [
                    'el-icon-star-on',
                    'el-icon-star-on',
                    'el-icon-star-on',
                  ]
                "
                :show-text="each.data.showText || false"
                :show-score="each.data.showScore || false"
                :texts="each.data.texts"
              ></el-rate>
            </div>
            <!-- 超链接 -->
            <div
              v-else-if="
                each.type == 'href' && scope.row[each.prop] !== 'undefined'
              "
            >
              {{ each.text || "" }}
              <el-link
                :target="(each.data && each.data.target) || '_blank'"
                :type="(each.data && each.data.type) || 'primary'"
                :underline="(each.data && each.data.underline) || false"
                :href="scope.row[each.prop]"
                :style="each.data.style || {}"
                >{{
                  scope.row[each.prop]
                    ? scope.row[each.data.prop] || each.text
                    : each.reserve || "暂无数据"
                }}</el-link
              >
            </div>
            <div
              v-else-if="
                each.type == 'video' && scope.row[each.prop] !== 'undefined'
              "
              style="
                border-radius: 10px;
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0 auto;
              "
            >
              {{ each.text || "" }}
              <video
                v-if="scope.row[each.prop]"
                :src="scope.row[each.prop]"
                :poster="each.data.poster || ''"
                :loop="each.data.loop || false"
                :style="each.data.style || {}"
                class="avatar video-avatar"
                controls="controls"
              >
                您的浏览器不支持视频播放
              </video>

              <div
                v-else
                style="
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                  justify-content: center;
                "
              >
                暂无视频
              </div>
            </div>
            <!-- 插槽 -->
            <slot
              v-else-if="each.type == 'slot'"
              :name="each.slotName || 'default'"
              :row="scope.row"
              :index="scope.$index"
            >
            </slot>
            <!-- 正常 -->
            <div v-else-if="scope.row[each.prop]" class="content">
              <div
                :style="{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': develop ? 99999 : each.line || 3,
                }"
              >
                {{ each.text || ""
                }}{{
                  each.child
                    ? scope.row[each.prop][each.child]
                    : scope.row[each.prop] || each.reserve || "暂无数据"
                }}
              </div>
              <div
                v-show="each.develop"
                class="develop el-link el-link--primary"
                @click="develop = !develop"
              >
                <span>
                  {{ develop ? "收起" : "展开阅读全文" }}
                  <i
                    :class="develop ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                  ></i>
                </span>
              </div>
            </div>

            <div v-else>
              <div v-if="each.reserve" v-html="each.reserve"></div>
              <div v-else>
                <b>暂无数据</b>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: space-between">
      <div
        class="pagination left"
        v-if="operateData && isSelect && operateData.operates"
      >
        <el-select
          v-model="operateData.value"
          clearable
          placeholder="批量操作"
          :size="operateData.size || 'small'"
        >
          <el-option
            v-for="(item, index) in operateData.operates"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          :style="operateData.style || { marginLeft: '20px' }"
          :icon="operateData.icon || ''"
          :type="operateData.type || 'primary'"
          :size="operateData.size || 'small'"
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
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
// import store from '/@/store'

export default {
  name: "powerful-table",
  props: {
    // 当前数据
    list: {
      type: Array,
      default: () => []
    },

    // 所有选中
    selectData: {
      type: Array,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    selectCompare: {
      type: Array,
      default: () => ['id', 'id']
    },

    header: {
      type: Array,
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
      type: Object,
      default: () => { }
    },
    // 表格名
    tableName: {
      type: String,
      default: '_num'
    },
    // 是否开启表格pageNum缓存
    isCachePageNum: {
      type: Boolean,
      default: false
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
  emits: ['update:currentPage', 'sortCustom', 'batchOperate', 'switchChange', 'sizeChange', 'query', 'success', 'add', 'update', 'remove', 'occupyOne', 'occupyTwo'],
  data () {
    return {
      listLoading: true,

      // 分页
      currentPage: 1,

      // 当前页选中
      currentSelect: [],
      // 其他页面选中
      otherSelect: [],

      // 展开
      develop: false,

      pageSize: this.pageSizes[0],
    }
  },
  computed: {
    // 筛选是否存在pageNum
    // page () {
    //   if (this.isCachePageNum) {
    //     return store.state.pageNum.pageNums.filter((item) => {
    //       return item && item.name == this.$route.name
    //     })
    //   } else {
    //     return []
    //   }
    // }
  },
  mounted () {
    if (this.isCachePageNum) {
      this.currentPage = this.page.length > 0 && this.page[0].pages[this.tableName] || 1
    }
  },
  methods: {
    tagToArray (e, i) {
      if (typeof e != 'string') {
        let a = JSON.parse(JSON.stringify(e)).splice(0, i)
        return a
      } else {
        return e.split(',')
      }
    },
    // 筛选
    filterFun (e, row) {
      let val

      for (let i in row) {
        val = e == row[i].key ? row[i].value : e
        if (e == row[i].key) {
          val = row[i].value

          break
        } else {
          val = e
        }

      }
      return val
    },
    // 排序方法
    sortChange (obj) {
      if (obj.column) {
        if (obj.column.sortable == 'custom') {
          this.$emit('sortCustom', obj)
        }
      }
    },

    // 批量按钮
    batchOperate () {
      console.log(this.operateData.value)
      if (!this.operateData.value && this.operateData.value != '0') {
        ElMessage({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }

      if (this.currentSelect.length == 0) {
        ElMessage({
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm(`是否要进行批量${this.operateData.operates[this.operateData.value].label}操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = this.otherSelect.concat(this.currentSelect).map(item => item.id)
          let items = this.otherSelect.concat(this.currentSelect).map(item => item)

          this.$emit('batchOperate', { ids, item: this.operateData.operates[this.operateData.value], items })
        })
        .catch(() => {
          console.log('取消批量操作')
        })

    },
    // 按钮回调
    btnChange (emit, row, index, type) {
      if (type == 'danger') {
        this.$confirm('是否要进行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit(emit, { row, index })
          })
          .catch(() => {
            console.log('取消删除')
          })
      } else {
        this.$emit(emit, { row, index })
      }
    },
    // 开关回调
    switchChange (row, prop, val = 1, val2 = 0, beforFunction) {
      let value = row[prop] == val ? val2 : val
      // console.log(!beforFunction(row, prop))
      if (typeof beforFunction == 'function' && !beforFunction(row, prop)) {
        row[prop] = value
        return false
      }
      this.$confirm('是否要进行修改操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('switchChange', row)
        })
        .catch(() => {
          row[prop] = value
        })
    },
    // 获取选中
    getSelect (arr, list = this.list) {

      if (!this.isSelect) return

      // 1.获取当前页
      // 2.总选中减去当前页
      // 3.得到其他页

      // 所有选中
      let all = arr
      // 获取当前页选中
      let current = []
      // 获取 其他页选中
      let other = []

      // 获取当前页
      if (all.length != 0) {
        // console.log('所有选中', all);
        // 获取当前页
        arr.forEach((item) => {
          let itm = list.filter((each) => {
            return item[this.selectCompare[0]] == each[this.selectCompare[1]]
          })

          if (itm.length > 0) {
            current.push(itm[0])
          }
        })

        // this.currentSelect = current
        // console.log('当前页选中', current)
        // 获取其他页
        if (current.length > 0) {
          other = JSON.parse(JSON.stringify(arr))
          for (let j in other) {
            current.forEach((item) => {
              if (item[this.selectCompare[1]] == other[j][this.selectCompare[0]]) {
                other.splice(j, 1)
              }
            })
          }
        } else {
          other = JSON.parse(JSON.stringify(arr))
        }

        this.otherSelect = other
        // console.log('其他页选中', this.otherSelect);

        if (current.length != 0) {
          current.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })

        } else {
          this.$refs.multipleTable.clearSelection()
        }
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    // 添加选中
    handleSelectionChange (e) {
      // console.log('选中', e)
      this.currentSelect = JSON.parse(JSON.stringify(e))
    },

    handleChange (e, type) {
      // console.log('切换', e, type);

      this[type] = e

      this.get()
    },

    get () {
      // 存储pageNum
      if (this.isCachePageNum) {

        // if (this.page.length <= 0) {
        //   store.commit('pageNumPush', { name: this.$route.name, pages: { [this.tableName]: this.currentPage } })
        // } else {
        //   this.page[0].pages[this.tableName] = this.currentPage
        // }
      }

      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }

      try {
        // 如果父组件是getList方法 无需自定义事假
        this.$parent._getList(data, this.otherSelect.concat(this.currentSelect))
      } catch (error) {
        this.$emit('sizeChange', data, this.otherSelect.concat(this.currentSelect))
      }
    }
  },
  watch: {
    // list数据有的话 关闭加载中...
    list: {
      handler (val) {
        // console.log('数据', val)
        this.listLoading = false
        this.$nextTick(() => {
          this.getSelect(this.selectData, val)
        })
      },

      immediate: true
    },
    selectData: {
      handler () {
        this.$nextTick(() => {
          this.getSelect(this.selectData)
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.content {
  position: relative;
  padding-bottom: 23px;
}
.content .develop {
  text-align: center;
  width: 100%;
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

.content .develop span {
  position: absolute;
  bottom: 0;
  font-size: 12px;
}

.btnType .btnEach {
  margin-bottom: 10px;
}

.btnType .btnEach:nth-last-child(2) {
  margin-bottom: 0;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

.left {
  justify-content: flex-start;
}

.el-pagination {
  width: auto;
}
</style>
