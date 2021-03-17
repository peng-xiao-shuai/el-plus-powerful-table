# el-plus-powerful-table

主要功能：分页多选，批量操作

vue3.0 的 element-plus 二次开发表格组件

### 使用方法

```js
npm i el-plus-powerful-table
```

```js
//main.ts
import ElementPlus from "element-plus";
import powerfulTable from "el-plus-powerful-table";

const app = createApp(App);
app.use(powerfulTable);
app.use(ElementPlus);
app.mount("#app");

//*.vue
<powerful-table :list="list" :total="total" :header="header"></powerful-table>
```

## powerful-table Attributes 表格组件

| 参数          | 说明                                                            | 类型    | 可选值                                                                        | 默认值                          |
| ------------- | --------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- | ------------------------------- |
| list          | 当前数据                                                        | array   | -                                                                             | []                              |
| header        | 表格头部数据                                                    | array   | -                                                                             | []                              |
| total         | 分页总条数                                                      | number  | -                                                                             | 0                               |
| tableName     | 表格名(用于缓存表格的分页)                                      | number  | -                                                                             | 1                               |
| layout        | 组件布局，子组件名用逗号分隔                                    | string  | 详情参考[element 分页](https://element.eleme.cn/#/zh-CN/component/pagination) | total, sizes, prev, pager, next |
| pageSizes     | 每页显示个数选择器的选项设置                                    | array   | -                                                                             | [10, 20, 30]                    |
| selectData    | 选中的数据                                                      | array   | -                                                                             | []                              |
| selectCompare | 选中数据和列表数据相比较的参数`[0]选中数据参数,[1]列表数据参数` | array   | -                                                                             | ['id','id']                     |
| isSelect      | 是否显示多选                                                    | boolean | false/true                                                                    | false                           |
| isPagination  | 是否显示分页器                                                  | boolean | false/true                                                                    | false                           |
| operateData   | 批量操作                                                        | object  | -                                                                             | {}                              |

---

#### operateData 批量操作

> 如果表格有 `header.poprs.type` 为 `input` 的则需要先填写该行数据，在选中该行，否则会出现获取不到 `input` 的值

| 参数     | 说明               | 类型          | 可选值                                             | 默认值  |
| -------- | ------------------ | ------------- | -------------------------------------------------- | ------- |
| value    | 下拉选中值         | string        | -                                                  | null    |
| size     | 按钮和下拉框大小   | string        | medium / small / mini                              | small   |
| type     | 按钮的类型         | string        | primary / success / warning / danger / info / text | primary |
| disabled | 禁用               | boolean       | true / false                                       | false   |
| icon     | 按钮上图标         | string        | -                                                  | -       |
| style    | 按钮样式           | object        | -                                                  | {}      |
| operates | 批量操作下拉框数据 | array[object] | -                                                  | []      |

##### operates 批量操作下拉框数据

| 参数  | 说明               | 类型  | 可选值 | 默认值 |
| ----- | ------------------ | ----- | ------ | ------ |
| label | 批量操作下拉框数据 | array | -      | []     |

---

#### header 表格头部数据

| 参数            | 说明                   | 类型             | 可选值                  | 默认值 |
| --------------- | ---------------------- | ---------------- | ----------------------- | ------ |
| overflowTooltip | 当内容过长被隐藏时显示 | boolean          | true / false            | true   |
| label           | 显示的标题             | string           | -                       | -      |
| minWidth        | 对应列的最小宽度       | string           | -                       | 100    |
| width           | 对应列的宽度           | string           | -                       | -      |
| sortable        | 排序                   | boolean / string | 'custom' / true / false | false  |
| headerAlign     | 表头对齐方式           | string           | left / center / right   | center |
| poprs           | 单元格数据             | array[object]    | -                       | -      |

##### poprs 单元格数据

| 参数   | 说明                                                                          | 类型          | 可选值                                      | 默认值 |
| ------ | ----------------------------------------------------------------------------- | ------------- | ------------------------------------------- | ------ |
| popr   | 数据 key 值                                                                   | string        | -                                           | -      |
| child  | 当 popr 值是对象是用到 仅支持 type 为 text                                    | string        | -                                           | -      |
| type   | 数据类型                                                                      | string        | image / text / switch / btn / video / input | text   |
| data   | 每个类型不一样 data 里值也不一样，<br> type 为 btn 时数据类型为 array[object] | object        | -                                           | -      |
| filter | 过滤，只支持 type 为 text                                                     | array[object] | -                                           | -      |
| text   | 数据左侧显示的文字。（例：文字：数据）                                        | string        | -                                           | -      |
| style  | 包裹组件外面那一层 div 样式                                                   | object        | -                                           | -      |

##### filter 过滤

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| key   | 单元格里的数据 | string | -      | -      |
| value | 需要替换的值   | string | -      | -      |

##### data 类型数据

##### type == image（图片）

| 参数    | 说明                                                                                                | 类型    | 可选值                                     | 默认值 |
| ------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------ | ------ |
| preview | 预览                                                                                                | boolean | true/false                                 | -      |
| lazy    | 懒加载                                                                                              | boolean | true/false                                 | false  |
| zIndex  | 图片预览层级                                                                                        | number  | -                                          | 2000   |
| style   | 图片自定义样式                                                                                      | object  | -                                          | -      |
| fit     | 图片如何适应容器框，同原生[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string  | fill / contain / cover / none / scale-down | -      |

##### type == btn（操作按钮）

| 参数     | 说明             | 类型    | 可选值                                               | 默认值  |
| -------- | ---------------- | ------- | ---------------------------------------------------- | ------- |
| tip      | 提示文字         | string  | -                                                    | -       |
| style    | 按钮样式         | object  | -                                                    | -       |
| icon     | 按钮上图标       | string  | -                                                    | -       |
| disabled | 按钮是否禁用     | boolean | true/false                                           | false   |
| type     | 按钮类型         | string  | primary / success / warning / danger / info / text   | primary |
| size     | 按钮大小         | string  | medium / small / mini                                | small   |
| condi    | 控制按钮显示隐藏 | object  | -                                                    | -       |
| emit     | 自定义方法名     | string  | 'look', 'update', 'remove', 'occupyOne', 'occupyTwo' | -       |

##### condi

| 参数  | 说明                     | 类型            | 可选值 | 默认值 |
| ----- | ------------------------ | --------------- | ------ | ------ |
| popr  | 根据判断的 popr          | string          | -      | -      |
| value | 根据判断的 popr 的 value | string / number | -      | -      |

##### type == switch（开关）

| 参数          | 说明             | 类型    | 可选值     | 默认值  |
| ------------- | ---------------- | ------- | ---------- | ------- |
| activeColor   | 打开时的背景色   | string  | -          | #409EFF |
| inactiveColor | 关闭时的背景色   | string  | -          | #C0CCDA |
| inactiveText  | 关闭时的文字描述 | string  | -          | -       |
| activeText    | 关闭时的文字描述 | string  | -          | -       |
| activeValue   | 打开时的值       | number  | -          | 1       |
| inactiveValue | 关闭时的值       | number  | -          | 0       |
| disabled      | 是否禁用         | boolean | true/false | false   |
| style         | 图片自定义样式   | object  | -          | -       |

##### type == input（输入框）

| 参数        | 说明              | 类型    | 可选值                | 默认值 |
| ----------- | ----------------- | ------- | --------------------- | ------ |
| style       | 输入框样式        | object  | -                     | -      |
| size        | 输入框大小        | string  | medium / small / mini | small  |
| placeholder | 输入框文字描述    | string  | -                     | -      |
| disabled    | 输入框是否禁用    | boolean | true/false            | false  |
| slot        | 输入框前置或后置  | string  | prepend / append      | -      |
| symbol      | slot 文字或者符合 | string  | -                     | -      |

##### type == video（视频）

| 参数   | 说明           | 类型    | 可选值     | 默认值 |
| ------ | -------------- | ------- | ---------- | ------ |
| style  | 视频样式       | object  | -          | -      |
| poster | 封面 url 路径  | string  | -          | -      |
| loop   | 循环播放       | boolean | true/false | false  |
| style  | 图片自定义样式 | object  | -          | -      |

##### type == iconfont（图标）

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| class | 样式类         | array  | -      | -      |
| style | 图片自定义样式 | object | -      | -      |

##### type == rate（评分）

| 参数      | 说明                                                                    | 类型    | 可选值     | 默认值                                                    |
| --------- | ----------------------------------------------------------------------- | ------- | ---------- | --------------------------------------------------------- |
| max       | 最大数值                                                                | number  | -          | 5                                                         |
| style     | 图片自定义样式                                                          | object  | -          | -                                                         |
| colors    | 颜色数组                                                                | array   | -          | ['#F7BA2A', '#F7BA2A', '#F7BA2A']                         |
| iconClass | 颜色数组                                                                | array   | -          | ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'] |
| allowHalf | 是否允许半选                                                            | boolean | true/false | false                                                     |
| showText  | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean | -          | false                                                     |
| showScore | 是否显示当前分数，show-score 和 show-text 不能同时为真                  | boolean | true/false | false                                                     |
| texts     | 辅助文字数组                                                            | array   | -          | ['极差', '失望', '一般', '满意', '惊喜']                  |

##### type == href（超链接）

| 参数      | 说明                                            | 类型    | 可选值     | 默认值    |
| --------- | ----------------------------------------------- | ------- | ---------- | --------- |
| target    | 跳转类型                                        | string  | -          | '\_blank' |
| type      | 主题类型                                        | string  | -          | 'primary' |
| underline | 是否显示下划线                                  | boolean | true/false | false     |
| popr      | 超链接文字该显示哪个 popr 的值 否则为 text 的值 | string  | -          | 空        |

---

#### Methods

| 方法名       | 说明         | 参数                   |
| ------------ | ------------ | ---------------------- |
| sizeChange   | 分页器切换   | { pageNum , pageSize } |
| sortCustom   | 远程排序     | column                 |
| batchOperate | 批量操作     | ids , selection , rows |
| 自定义方法名 | 操作按钮     | row , index            |
| switchChange | 开关组件操作 | row                    |

```

```
