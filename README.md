## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 添加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关，不影响运行结果
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤消 编辑
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等。
  - `workflow` 工作流程改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

  ## 语言
  对于语言方面组件是默认使用 `英语` 因为 `element-plus` 默认是使用英语，不引用中文包的主要原因是避免增大体积。
  组件内部语言跟随 `element-plus`。 部分 提示文字 语言，组件内部也支持 `中、英` 文，如果你需要支持更多语言或者更改组件内部
  的语言，可以在 `use(PowerfulTable, { local: 您的语言变量 })` 替换。也可以参考我们提供的 `demo` 实现。

  ## 2.1.0 202201023

- 使用`vite`进行构建
- - 构建库模式优化，生成`es、cjs`两种模式
- `element-plus` 版本更新到 `2.0+`
- 优化 `button` 在表格中样式
- 修改 `selectable` 默认不允许勾选问题
- `header` 表格头部数据参数中 `filters` 更改为 `defaultFilter`. `hidden` 更改为 `defaultShow`
- `props` 单元格数据 `filter` 更改为 `filters`
- 删除 组件 `props` 中的 `local`
- 修改 组件 `InjectProps` 类型中 `local` 的类型。注入的 `local` 参数现在主要是用于 替换或者扩展组件内部提示文字
- `componentProps` 参数更改为 `property`
- `type` 类型为 `video` 新增  `property` 扩展参数
- `BtnConfig.BtnList` 新增 `property` 扩展参数
- 内部组件新增自定义事件，详情看 `type == 'XX'`（XX 为某个类型）, 内部组件传递到 `powerful-table` 组件由 `component-event` 抛出
- `type = 'text'` `data` 中的 `customFilterFun` 参数值更改

  ## 2.0.7 20220328
- **新增 props `property`**
- - [**ElTable 属性**](https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes)
- `type` 为 `btn、image、input、rate、switch、tag` 的 `data` 中新增 `componentProp` 扩展参数
- `href` 类型更改为 `link`
- - `link` 的 `data` 中新增属性 `icon`
- - `link` 的 `data` 中 `text` 没有值时将显示 `prop` 数据在页面上
- `input` 类型新增 `type` 同 `el-input type`
- 修复 `rate` 类型中 `locale` 警告
- 优化 `link` 的 `data` 中 `target` 参数类型固定
- 修复 `Failed to resolve component: PTBtnPlus` 警告

## 2.0.0 20220314

- **新增支持内置组件导出`PT`开头：例如:`PTImage，PTButton`**
- - 主要用于 `powerful-table-draggable` 组件的引用
- `switch、btn` 类型新增参数
- - `isConfirmTip` 是否开启点击时确认框提示
- - `isConfirmTip` 确认框提示文字
- 优化 `el-pagination small`参数随组件或全局 `size` 参数更改
- 解决鼠标悬浮在组件上没有类型

## 1.1.0 20211231

- 新增表格顶部按钮功能
- - 新增配置项 <a href="btnConfig">**传送门**</a>
- - 新增插槽 `btn-left` `btn-right`
- `header` 新增参数
- - `isShowOrFilterColumn` 是否开启过滤或者显示隐藏列的开关
- - `selectable` 行是否可以选中
- `prop` 新增参数
- - `filtersType` 过滤类型
- - `filterItem` 指定过滤项

## 1.0.6 20211226

- 解决数据选中 `bug`
- 优化部分样式问题
- 优化 `props` 类型从数组 改为 数组或者对象均可
- 按钮配置优化
- - 可配置二维数组
- - 删除 `emit`
- - 新增 `isTooltip` 是否显示提示
- - 新增 `params`，`isMore` 参数。`params` 自定义传入数据，将会在点击按钮时返回。例如：

```js
{
  ...
  params: {
    emit: 'update'
  }
}

// index.vue
<powerfulTable v-on:btnClick='handleOperate'>
</powerfulTable>

...

// row 当前行数据 params 自定义传入的数据 index 当前行的下标
const handleOperate = ({row, params, index}) {

}
```

`isMore` 用来判断是否将当前对象数据 显示为 更多按钮

```js
{
  ;[
    {
      type: 'btn',
      prop: 'btn',
      data: [
        {
          tip: '编辑',
          type: 'info',
          icon: markRaw(Edit),
          text: '编辑',
          // showBtn: false,
          // isTooltip: true,
          params: {
            emit: 'update',
          },
        },
        [
          {
            tip: '更多',
            isMore: true,
            type: 'success',
            icon: markRaw(Edit),
          },
          {
            tip: '编辑',
            type: 'text',
            icon: markRaw(Edit),
            params: 'update',
          },
          {
            tip: '更多a',
            isMore: true, // 这个将不会被引用到
            type: 'success',
            icon: markRaw(Edit),
          },
          {
            tip: '删除',
            type: 'text',
            icon: markRaw(Delete),
            params: 'remove',
          },
        ],
        {
          tip: '删除',
          type: 'danger',
          icon: markRaw(Delete),
          showBtn: (e: any) => {
            return true
          },
          params: {
            emit: 'remove',
          },
        },
      ],
    },
  ]
}
```

- 删除 `child` 字段
- 新增全局组件注入 `locale` 和 `size`

===============================================================

## el-plus-powerful-table-ts

此插件已 `el-plus-powerful-table` 作为基础，进行重构。部分功能将领先 `el-plus-powerful-table` 基础版本。
`el-plus-powerful-table` 的 `ts` 版本

主要功能：分页多选，批量操作

vue3.0 的 element-plus 二次开发表格组件

### [DEMO](https://peng-xiao-shuai.github.io/el-plus-powerful-table/)

### 使用方法

```js
npm i el-plus-powerful-table-ts
```

```js
//main.ts
import ElementPlus from "element-plus";
import powerfulTable from "el-plus-powerful-table-ts";

const app = createApp(App);
app.use(powerfulTable, {
	btnSlot: 'all',
	// locale: zhCn
});
app.use(ElementPlus);
app.mount("#app");

//*.vue
<powerful-table :list="list" :total="total" :header="header"></powerful-table>
```

### 传送门

<a href='#filter'>**过滤**</a>&emsp;<a href='#text'>**文本**</a>&emsp;<a href='#image'>**图片**</a>&emsp;
<a href='#btn'>**按钮**</a>&emsp;<a href='#beforeFunction'>**开关**</a>&emsp;<a href='#input'>**输入框**</a>&emsp;
<a href='#video'>**视频**</a>&emsp;<a href='#iconfont'>**图标**</a>&emsp;<a href='#rate'>**评分**</a>&emsp;
<a href='#href'>**超链接**</a>&emsp;<a href='#slot'>**插槽**</a>&emsp;<a href='#tag'>**标签**</a>

## powerful-table 表格组件全局参数 (优先级小于局部配置)

| 参数    | 说明                                                                                        | 类型                | 可选值                    | 默认值 |
| ------- | ------------------------------------------------------------------------------------------- | ------------------- | ------------------------- | ------ |
| locale<font color='red'>已删除</font>  | 组件语言                                                                                    | object&lt;Language> | -                         | zhCn   |
| size    | 组件大小                                                                                    | string              | medium / small / mini     | small  |
| btnSlot | 是否启用顶部按钮插槽 `all` => 全部显示；`left` => 只显示左侧按钮；`right` => 只显示右侧按钮 | array               | 'left' / 'right' / 'none' | -      |

---

## powerful-table Attributes 表格组件

| 参数          | 说明                                                            | 类型                 | 可选值                                                                        | 默认值                          |
| ------------- | --------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------- | ------------------------------- |
| locale<font color='red'>已删除</font>| 组件语言                | object&lt;Language>  | -                                                                             | zhCn                            |
| size          | 组件大小                                                        | string               | medium / small / mini                                                         | small                           |
| list          | 当前数据                                                        | array                | -                                                                             | -                               |
| header        | 表格头部数据                                                    | array                | -                                                                             | -                               |
| total         | 分页总条数                                                      | number               | -                                                                             | 0                               |
| layout        | 组件布局，子组件名用逗号分隔                                    | string               | 详情参考[element 分页](https://element.eleme.cn/#/zh-CN/component/pagination) | total, sizes, prev, pager, next |
| pageSizes     | 每页显示个数选择器的选项设置                                    | array                | -                                                                             | [10, 20, 30]                    |
| selectData    | 选中的数据                                                      | array                | -                                                                             | -                               |
| selectCompare | 选中数据和列表数据相比较的参数`[0]选中数据参数,[1]列表数据参数` | array                | -                                                                             | ['id','id']                     |
| isSelect      | 是否显示多选                                                    | boolean              | false/true                                                                    | false                           |
| selectable    | 当前行是否可以选中                                              | function(row, index) | -                                                                             | -                               |
| isPagination  | 是否显示分页器                                                  | boolean              | false/true                                                                    | false                           |
| operateData   | 批量操作                                                        | object               | -                                                                             | {}                              |
| btnConfig     | 表格顶部按钮配置                                                | object               | -                                                                             | {}                              |
| property      | 表格属性扩展字段                                                | object               | -                                                                             | {}                              |

---

### <font color='#1A72A6'>operateData 批量操作</font>

> 如果表格有 `header.props.type` 为 `input` 的则需要先填写该行数据，在选中该行，否则会出现获取不到 `input` 的值

| 参数     | 说明                                                                               | 类型               | 可选值                                                       | 默认值  |
| -------- | ---------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------ | ------- |
| value    | 下拉选中值                                                                         | string             | -                                                            | null    |
| type     | 按钮的类型                                                                         | string             | default / primary / success / warning / danger / info / text | primary |
| disabled | 禁用                                                                               | boolean            | true / false                                                 | false   |
| icon     | 按钮上图标                                                                         | Component / string | -                                                            | -       |
| style    | 按钮样式                                                                           | object             | -                                                            | -       |
| prop     | 点击确认按钮后，`batchOperate` 返回的 `ids` 中的数据是根据你指定的 `prop` 返回数组 | string             | -                                                            | `id`    |
| operates | 批量操作下拉框数据                                                                 | array[object]      | -                                                            | -       |

#### <font color='#50BEFF'>operates 批量操作下拉框数据</font>

| 参数  | 说明                   | 类型   | 可选值 | 默认值 |
| ----- | ---------------------- | ------ | ------ | ------ |
| label | 批量操作下拉框显示文字 | string | -      | -      |
| value | 批量操作下拉框值       | string | -      | -      |

---

```js
// 参数示例
const operateData = {
  value: 0,
  operates: [
    {
      label: '删除',
      value: 0,
    },
  ],
}
```

### <font color='#1A72A6' id='btnConfig'>btnConfig 表格顶部按钮</font>

| 参数    | 说明                                                                                        | 类型          | 可选值                    | 默认值 |
| ------- | ------------------------------------------------------------------------------------------- | ------------- | ------------------------- | ------ |
| hidden  | 隐藏 左侧、右侧以及全部按钮 (`none` 隐藏顶部所有按钮)。注意这里是使用 `display: none` 隐藏  | string        | 'left' / 'right' / 'none' | null   |
| btnSlot | 是否启用顶部按钮插槽 `all` => 全部显示；`left` => 只显示左侧按钮；`right` => 只显示右侧按钮 | string        | 'left' / 'right' / 'all'  | null   |
| btnList | 左侧按钮配置                                                                                | array[object] | -                         | -      |

#### <font color='#50BEFF'>btnList 左侧按钮配置</font>

| 参数        | 说明                                                                                                                      | 类型                        | 可选值 | 默认值 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------ | ------ |
| type        | 批量操作下拉框显示文字                                                                                                    | string                      | -      | -      |
| icon        | 图标 使用`markRaw`将`Component`转为原始对象                                                                               | Component                   | -      | -      |
| style       | 样式                                                                                                                      | object                      | -      | {}     |
| disabled    | 是否禁用 如果为 `true` 那么 `operateType` 的禁用将会失效                                                                  | boolean                     | -      | -      |
| operateType | 操作类型：`none`(默认) => 不需要选择数据；`single` => 有且只能操作一条数据；`batch` => 批量操作数据(至少选择一条数据以上) | 'none' / 'single' / 'batch' | -      | -      |
| text        | 按钮中文字                                                                                                                | string                      | -      | -      |
| showTip     | 是否显示点击按钮后操作提示                                                                                                | boolean                     | -      | -      |
| tipContent  | 操作提示文字                                                                                                              | string                      | -      | -      |
| effect      | 自定义操作类型将会在自定义事件 `btnChange` 抛出                                                                           | string                      | -      | -      |
| showBtn     | 控制按钮显示隐藏                                                                                                          | function() / boolean        | -      | -      |

---

```js
// 参数示例
const btnConfig = {
  // hidden: 'none',
  btnList: [
    {
      text: '新增',
      auth: '',
      operateType: true,
      effect: 'add',
      type: '',
      // icon: Plus
    },
    {
      text: '修改',
      auth: '',
      operateType: 'single',
      effect: 'edit',
      type: 'primary',
      // icon: Edit
    },
    {
      text: '批量删除',
      auth: '',
      operateType: 'batch',
      effect: 'remove',
      type: 'danger',
      // icon: Delete,
      showTip: true,
      // tipContent: '立即执行批量删除'
    },
  ],
}
```

<a href='https://github.com/Peng-Xiao-Shuai-0902/el-plus-powerful-table/blob/master/src/indexData.js'>查看 JSON 参数</a>

### <font color='#1A72A6'>header 表格头部数据</font>

| 参数                 | 说明                                           | 类型             | 可选值                    | 默认值 |
| -------------------- | ---------------------------------------------- | ---------------- | ------------------------- | ------ |
| overflowTooltip      | 当内容过长被隐藏时显示                         | boolean          | true / false              | false  |
| label                | 显示的标题                                     | string           | -                         | -      |
| minWidth             | 对应列的最小宽度                               | string           | -                         | 100    |
| width                | 对应列的宽度                                   | string           | -                         | -      |
| sortable             | 排序                                           | boolean / string | 'custom' / true / false   | false  |
| fixed                | 固定列                                         | string / boolean | true / left / right       | false  |
| headerAlign          | 表头对齐方式                                   | string           | left / center / right     | center |
| headerSlotName       | 列头插槽                                       | string           | -                         | -      |
| defaultShow         | 当前列默认显示或隐藏      | boolean          | -     | true      |
| defaultFilter       | 当前列默认是否过滤 （isShowOrFilterColumn == 'filter' 时默认 true）        | boolean          | -     | false      |
| isShowOrFilterColumn | 右侧按钮选择列时是否显示（隐藏和筛选开关组件） | string / boolean | false / 'show' / 'filter' | -      |
| props                | 单元格数据                                     | array[object]    | -                         | -      |
| property             | 表格属性扩展字段                               | object           | -                         | {}     |

#### <font color='#50BEFF'>props 单元格数据</font>

| 参数        | 说 明                    | 类型            | 可选值              | 默认值    |
| ----------- | ------------------------| ----------------| ------------------ | --------- |
| prop        | 数据 key 值              | string        | -                    |    -      |
| type        | 数据类型                | string          | <a href='#image'>image</a> / <a href='#text'>text</a> / <a href='#switch'>switch</a> / <a href='#btn'>btn</a> / <a href='#video'>video</a> / <a href='#input'>input</a> / <a href='#iconfont'>iconfont</a> / <a href='#tag'>tag</a> / <a href='#rate'>rate</a> / <a href='#href'>href</a> / <a href='#slot'>slot</a> | text      |
| data        | 每个类型不一样 data 里值也不一样，<br> type 为 btn 时数据类型为 array[object]    | object     | -   | - |
| filters      | 过滤，只支持 `type` 为 `text、tag`| array[object] / function(row,index) => string | number  | -  | -   |
| filtersType | 过滤类型 用于表格顶部右侧列按钮点击时，是否过滤，是的话，自定义表头将根据类型所弹出相应的操作元素（如果指定了 `headerSlotName` 和 `isShowOrFilterColumn` 为 `show` 或者 `false` 将会无效。如果是 `filtersType: select` 需要指定 `filters` 为数组类型） | string    | "select" / "date" / "input"    | "input"   |
| filterItem  | 指定过滤项 (当 `props` 是数组且长度大于 `1` 时有用) 如果多个 prop 的情况下没有指定 filterItem 过滤项 那么将使用第一个作进行过滤   | boolean  | -    | -   |
| text    | 数据左侧显示的文字。（例：文字：数据）   | string  | -    | -  |
| reserve  | 当 prop 值 渲染数据为空时可用 reserve 代替空数据 可传 `HTML` 标签  | string   | HTMLElement  | -         | -   |
| render      | [渲染函数](https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0)  | function(h,row,index)   | -  | -    |
| style       | 包裹组件外面那一层 div 样式  | object   | -   | -  |
| slotName    | 插槽名称   | string  | - | 'default' |
| property    | 表格属性扩展字段  | object  | - | {}  |

```js

// 假设有一个这样的数据
const data = [{
  my:{
    name: 'red'
  },
  myBrother: 'yellow'
}]

// 参数示例
[
  {
  label: '我',
  props:[{
    type: 'text',
    text: '我的名字',
    prop: 'my',
    // child: 'name',
    reserve: '<b>我只有在数据空时显示</b>',
    customFilterFun: ({row, index, props}) => {
      return row.my.name
    }
    filters:[{
      key: 'red',
      value: 'black'
    }]
  }]
},
{
  label: '我的兄弟',
  props:[{
    prop: 'myBrother',
  }]
}
]
```

#### <font color='#50BEFF' id='filters'>filters 过滤</font>

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| key   | 单元格里的数据 | string | -      | -      |
| value | 需要替换的值   | string | -      | -      |

```js
// 参数示例 内置替换是以 == 进行判断 所有 当key值为 '1' 而数据中的值为 1 仍然可以匹配上
{
  label: '筛选',
  props:[{
    prop: 'name',
    filters:[{
      key: '1',
      value: '替换1'
    }]
  }]
}
```

#### <font color='#50BEFF'>data 类型数据</font>

```js
//示例
{
  type: 'image',
  prop:'image',
  data:{}
}
```

#### <font color='#7CCEFF' id='text'>type == text （默认 text）</font>

| 参数            | 说明                             | 类型                | 可选值     | 默认值 |
| --------------- | -------------------------------- | ------------------- | ---------- | ------ |
| line            | 超出多少的行数使用...代替        | number              | -          | 3      |
| develop         | 是否显示 “展开/收起 操作按钮”    | boolean             | false/true | false  |
| customFilterFun | 自定义当前单元格数据文本 (row)。props 为header 配置的 当前 props 值 | function({row,index, props}) | -          | -      |

#### Emit
| 方法名       | 说明   | 参数      |
| click       | 点击事件   | {row, index, prop, event}      |

```js
{
    label: "类型", //显示的标题
    props: [
      {
        prop: "gender",
        customFilterFun(row){
          return '风和自由'
        }
      }
    ],
  },
```

#### <font color='#7CCEFF' id='image'>type == image（图片）</font>

| 参数           | 说明                                                                                                | 类型    | 可选值                                     | 默认值 |
| -------------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------ | ------ |
| preview        | 预览                                                                                                | boolean | true/false                                 | true   |
| lazy           | 懒加载                                                                                              | boolean | true/false                                 | true   |
| zIndex         | 图片预览层级                                                                                        | number  | -                                          | 6000   |
| style          | 图片自定义样式                                                                                      | object  | -                                          | -      |
| fit            | 图片如何适应容器框，同原生[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string  | fill / contain / cover / none / scale-down | -      |
| property | 属性扩展字段                                                                                        | object  | -                                          | {}     |

```js
//示例
{
  label: "图片", //显示的标题
  props: [
    {
      type: "image",
      prop: "imageUrl",
      data: {
        style: {
          width: "120px",
          height: "120px",
          borderRadius: "10px",
        },
        lazy: true,
        preview: true,
      },
    },
  ],
}
```

#### <font color='#7CCEFF' id='btn' >type == btn（操作按钮）</font>

| 参数         | 说明                                                    | 类型                          | 可选值                                             | 默认值                                |
| ------------ | ------------------------------------------------------- | ----------------------------- | -------------------------------------------------- | ------------------------------------- |
| tip          | 提示文字                                                | string                        | -                                                  | -                                     |
| text         | 按钮文字                              | string                        | -                                                  | tip                                   |
| style        | 按钮样式                                                | object                        | -                                                  | -                                     |
| icon         | 按钮上图标 使用`markRaw`将`Component`转为原始对象       | Component / string            | -                                                  | -                                     |
| disabled     | 按钮是否禁用                                            | boolean                       | true/false                                         | false                                 |
| type         | 按钮类型                                                | string                        | primary / success / warning / danger / info / text | primary                               |
| showBtn      | 控制按钮显示隐藏 返回当前行数据 (row)，返回 boolean     | function(row,index) / boolean | -                                                  | -                                     |
| isTooltip<font color='red'>已删除</font>    | 是否启用按钮上方提示, tip存在值时显示                                    | boolean                       | true / false                                       | false                                 |
| isConfirmTip | 是否启用点击后确认操作提示 `可以使用 confirmTip 自定义` | boolean                       | true / false                                       | false                                 |
| confirmTip   | 点击后确认操作提示文字                                  | string                        | -                                                  | 是否要进行`[item.tip]`操作, 是否继续? |
| params       | 自定义数据                                              | -                             | -                                                  | {}                                    |
| isMore       | 是否更多 当 `data` 是二维数组时有效                     | boolean                       | true / false                                       | false                                 |

| emit <font color='red'>已删除</font> | 自定义方法名 | string | 'query', 'success', 'add', 'update', 'remove', 'occupyOne', 'occupyTwo' | - |
| property | 属性扩展字段 | object | - | {} |

```js
// 参数示例
{
    label: "操作", //显示的标题
    props: [
      {
        type: "btn",
        data: [
          {
            tip: "编辑",
            type: "info",
            icon: "el-icon-edit-outline",
            text: "U",
            emit: "update",
            showBtn: (row)=>{
              return false
            }
          },
          {
            tip: "删除",
            type: "danger",
            text: "", //将不会显示按钮文字
            icon: "el-icon-delete",
             showBtn: (row)=>{
              return true
            }
            emit: "remove",
          },
          [{
            tip: "更多",
            isMore: true,
            type: "success",
             showBtn: (row)=>{
              return true
            }
            emit: "remove",
          },{
            tip: "删除",
            type: "danger",
            text: "", //将不会显示按钮文字
            icon: markRaw(Delete),
             showBtn: (row)=>{
              return true
            }
            emit: "remove",
          },]
        ],
      },
    ],
  }
```

#### <font color='#7CCEFF' id='beforeFunction'>type == switch（开关）</font>

| 参数           | 说明                                                                                     | 类型                         | 可选值       | 默认值                        |
| -------------- | ---------------------------------------------------------------------------------------- | ---------------------------- | ------------ | ----------------------------- |
| activeColor    | 打开时的背景色                                                                           | string                       | -            | -                             |
| inactiveColor  | 关闭时的背景色                                                                           | string                       | -            | -                             |
| inactiveText   | 关闭时的文字描述                                                                         | string                       | -            | -                             |
| activeText     | 关闭时的文字描述                                                                         | string                       | -            | -                             |
| activeValue    | 打开时的值                                                                               | number                       | -            | 1                             |
| inactiveValue  | 关闭时的值                                                                               | number                       | -            | 0                             |
| disabled       | 是否禁用                                                                                 | boolean                      | true/false   | false                         |
| isConfirmTip   | 是否启用点击后确认操作提示 `可以使用 confirmTip 自定义`                                  | boolean                      | true / false | false                         |
| confirmTip     | 点击后确认操作提示文字                                                                   | string                       | -            | 是否要进行修改操作, 是否继续? |
| style          | 开关自定义样式                                                                           | object                       | -            | -                             |
| beforeFunction | 修改前事件,返回 true 时正常执行 false 点击无变化，可以在此函数中自行处理 为 false 时提示 | function(row,value,oldValue) | -            | -                             |
| property | 属性扩展字段                                                                             | object                       | -            | {}                            |

```js
//示例
{
    label: "开关", //显示的标题
    overflowTooltip: false,
    props: [
      {
        prop: "switchVal",
        type: "switch",
        data: {
          inactiveText: "关闭",
          activeText: "开启",
          activeValue: 1,
          inactiveValue: 0
        },
      },
    ],
  }
```

#### <font color='#7CCEFF' id='input'>type == input/textarea（输入框）</font>

| 参数           | 说明                                    | 类型                    | 可选值               | 默认值 |
| -------------- | --------------------------------------- | ----------------------- | -------------------- | ------ |
| type           | 输入框类型                              | string                  | -                    | text   |
| style          | 输入框样式                              | object                  | -                    | -      |
| placeholder    | 输入框文字描述                          | string                  | -                    | -      |
| disabled       | 输入框是否禁用,使用函数需要返回 boolean | boolean / function(row) | true/false           | false  |
| slot           | 输入框前置或后置                        | string                  | 'prepend' / 'append' | -      |
| rows           | 显示的高度 `textarea` 专有              | string / number         | -                    | 3      |
| symbol         | slot 文字或者符合                       | string                  | -                    | -      |
| property | 属性扩展字段                            | object                  | -                    | {}     |

```js
//示例
{
  label: "价格", //显示的标题
  props: [
    {
      prop: "price",
      type: "input",
      data: {
        slot: "prepend",
        symbol: "￥",
        style: { width: "100%" },
      },
    },
  ],
}
```

#### <font color='#7CCEFF' id='video'>type == video（视频）</font>

| 参数   | 说明          | 类型    | 可选值     | 默认值 |
| ------ | ------------- | ------- | ---------- | ------ |
| style  | 视频样式      | object  | -          | -      |
| poster | 封面 url 路径 | string  | -          | -      |
| loop   | 循环播放      | boolean | true/false | false  |

```js
//示例
{
  label: "视频", //显示的标题
  props: [
    {
      prop: "videoUrl",
      type: "video",
      data: {
        cover: "",
        style: {
          width: "120px",
          height: "120px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        },
      },
    },
  ],
}
```

#### <font color='#7CCEFF' id='iconfont'>type == iconfont（图标）</font>

| 参数  | 说明           | 类型           | 可选值 | 默认值 |
| ----- | -------------- | -------------- | ------ | ------ |
| class | 样式类         | string / array | -      | -      |
| style | 图标自定义样式 | object         | -      | -      |

```js
//示例
{
  type: 'iconfont',
  prop:'icon',
  data:{
    class: ['viteicon','vitestar'],
    style: {
      background: 'yellow'
    }
  }
}
```

#### <font color='#7CCEFF' id='rate'>type == rate（评分）</font>

| 参数           | 说明                                                                    | 类型    | 可选值     | 默认值                                                    |
| -------------- | ----------------------------------------------------------------------- | ------- | ---------- | --------------------------------------------------------- |
| max            | 最大数值                                                                | number  | -          | 5                                                         |
| style          | 自定义样式                                                              | object  | -          | -                                                         |
| colors         | 颜色数组                                                                | array   | -          | ['#F7BA2A', '#F7BA2A', '#F7BA2A']                         |
| iconClass      | 图标数组                                                                | array   | -          | ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'] |
| allowHalf      | 是否允许半选                                                            | boolean | true/false | false                                                     |
| showText       | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean | -          | false                                                     |
| showScore      | 是否显示当前分数，show-score 和 show-text 不能同时为真                  | boolean | true/false | false                                                     |
| texts          | 辅助文字数组                                                            | array   | -          | ['极差', '失望', '一般', '满意', '惊喜']                  |
| property | 属性扩展字段                                                            | object  | -          | {}                                                        |

```js
//示例
{
  label: "评分", //显示的标题
  props: [
    {
      type: "rate",
      prop: "rate",
      data: {
        allowHalf: true,
        showText: true,
        colors: ['red', 'yellow', 'green']
      },
    },
  ],
}
```

#### <font color='#7CCEFF' id='link'>type == link（超链接）</font>

| 参数      | 说明                                                                            | 类型                   | 可选值     | 默认值    |
| --------- | ------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- |
| style     | 自定义样式                                                                      | object                 | -          | -         |
| target    | 跳转类型                                                                        | string                 | -          | '\_blank' |
| type      | 主题类型                                                                        | string                 | -          | 'primary' |
| icon      | 图标                                                                            | Component              | -          | -         |
| underline | 是否显示下划线                                                                  | boolean                | true/false | false     |
| text      | 所显示的文本                                                                    | string / function(row) | -          | -         |
| prop <font color='red'>已删除</font> | 超链接文字该显示哪个 prop 的值 否则为 text 的值  | string   | - | 空  |

```js
//示例
{
  label: "超链接", //显示的标题
  props: [
    {
      type: "href",
      prop: "href",
      data: {
        prop: 'name',
      },
    },
  ],
}
```

#### <font color='#7CCEFF' id='slot'>type == slot（插槽）</font>

```js
//示例
{
  label: "slot（插槽）", //显示的标题
  props: [
    {
      type: "slot",
      slotName: "A",
    },
  ],
}

//vue
<powerful-table>
  <template #A="{ row,index }">
    <div>
      <el-image
        style="width: 100px; border-radius: 10px"
        :src="row.imageUrl"
      ></el-image>
    </div>
  </template>
</powerful-table>
```

#### <font color='#7CCEFF' id='tag'>type == tag</font>

| 参数           | 说明                           | 类型                        | 可选值                                        | 默认值    |
| -------------- | ------------------------------ | --------------------------- | --------------------------------------------- | --------- |
| type           | 类型                           | string                      | 'primary / success / warning / danger / info' | 'primary' |
| effect         | 主题                           | string                      | 'dark / light / plain'                        | 'light'   |
| color          | 背景颜色 返回颜色值            | function(row,tag)           | -                                             | -         |
| hit            | 是否描边                       | boolean                     | -                                             | false     |
| number         | 需要显示前多少个               | number                      | -                                             | 3         |
| filters<font color='red'>已删除</font>         | <a href='#filters'>查看详情</a> | array / function(row,index) | -                                             | -         |
| property | 属性扩展字段                   | object                      | -                                             | {}        |

---

```js
//示例
{
  label: "标签", //显示的标题
  props: [
    {
      prop: "tag",
      type: "tag",
      data: {
        effect: 'dark',
        // type: 'success'
      }
    },
  ],
}
```

## Event

| 方法名       | 说明                 | 参数      |
| ------------ | -------------------- | ----------------------------------------------------- |
| size-change   | 分页器切换           | { pageNum , pageSize }，selectArr(所有页中选中的数据) |
| sort-custom   | 远程排序             | column                                                |
| batch-operate | 批量操作             | {ids , selection , rows}                              |
| btn-click     | 表格操作按钮         | {row , index, params }  |
| btn-plus-change    | 表格顶部左侧操作按钮 | {rows , effect } 返回所有选中的行                     |
| btn-plus-refresh    | 表格顶部刷新按钮 | -                     |
| switch-change | 开关组件操作         | row                                                   |
| row-click    | 行点击事件           | {row, column, event}                                  |
| component-event | 内部组件事件           | {row, column, event}                                  |

## Slot

| 插槽名           | 说明                                             |
| ---------------- | ------------------------------------------------ |
| btn-left         | 表格顶部左侧按钮（btnSlot 需等于 all 或者 left） |
| btn-right        | 表格顶部右侧按钮（btnSlot 需等于 all 或者 right  |
| empty            | 表格内数据为空时内容                             |
| refresh          | 刷新                                             |
| [slotName]       | 表格内自定义的插槽名称                           |
| [headerSlotName] | 表格列头内自定义的插槽名称                       |
