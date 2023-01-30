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
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流程改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 语言
对于语言方面组件是默认使用 `英语` 因为 `element-plus` 默认是使用英语，不引用中文包的主要原因是避免增大体积。
组件内部语言跟随 `element-plus`。 部分 提示文字 语言，组件内部也支持 `中、英` 文，如果你需要支持更多语言或者更改组件内部
的语言，可以在 `use(PowerfulTable, { local: 您的语言变量 })` 替换。也可以参考我们提供的 `demo` 实现。

## el-plus-powerful-table-ts

此插件已 `el-plus-powerful-table` 作为基础，进行重构。部分功能将领先 `el-plus-powerful-table` 基础版本。
`el-plus-powerful-table` 的 `ts` 版本

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

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| --- | ---- | ----- | ---- | ------ |
| `btnSlot` | 是否启用顶部按钮插槽 `all / ''(全部显示)`，`left(只显示左侧按钮)`，`right(只显示右侧按钮)` | `enum` | `'left' / 'right' / 'none'` | - |
| `locale` | 内部部分文字语言 | `LangPackages` | - | 查看源码 `package/locale/packages` 文件中 `langPackages` 变量 <a href='https://github.com/peng-xiao-shuai/el-plus-powerful-table/blob/master-ts/packages/locale/packages.ts'>查看</a> |

---

## powerful-table Attributes 表格组件

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ---- | ----- | ------ |
| `size` | 组件大小 | `string` | `medium / small / mini` | `small` |
| `list` | 当前数据 | `array` | - | - |
| `header` | 表格头部数据 | `PowerfulTableHeader<Row = any>` | - | - |
| `selectData` | 选中的数据 | `array` | -  | - |
| `selectCompare` | 选中数据和列表数据相比较的参数`[0]选中数据参数，[1]列表数据参数` | `string[]` | - | `['id','id']` |
| `isSelect` | 是否显示多选 | `boolean` | `false / true` | `false` |
| `selectable` | 当前行是否可以选中 | `(row: Row, index: number) => boolean` | - | - |
| `isPagination` | 是否显示分页器 | `boolean` | `false / true` | `false` |
| `operateData` | 批量操作 | `PowerfulTableOperateData` | - | - |
| `btnConfig` | 表格顶部按钮配置 | `PowerfulTableOperateData` | - | - |
| `tree` | 树形表格配置 | `PowerfulTableTree` | - | - |
| `paginationProperty` | 分页器组件扩展字段 | `Partial<PaginationProps>` | - | - |
| `property` | 表格组件扩展字段 | `Partial<TableProps<Row>>` | - | - |
---

### <font color='#1A72A6'>operateData 批量操作</font>

> 如果表格有 `header.props.type` 为 `input` 的则需要先填写该行数据，在选中该行，否则会出现获取不到 `input` 的值

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ----- | ----- |
| `value` | 下拉选中值 | `string` | - | - |
| `style` | 按钮样式 | `CSSProperties` | - | - |
| `prop` | 点击确认按钮后，`batchOperate` 返回的 `ids` 中的数据是根据你指定的 `prop` 返回数组 | `string` | - | `id` |
| `btnProperty` | `el-button` 组件扩展字段 (支持 `el-button` 组件所有参数) | `InstanceType<typeof import('element-plus')['ElSelect']>['$props']` | - | - |
| `selectProperty` | `el-select` 组件扩展字段 (支持 `el-select` 组件所有参数) | `Partial<ButtonProps>` | - | - |
| `operates` | 批量操作下拉框数据 | `PowerfulTableLabelValue[]` | - | - |

#### <font color='#50BEFF'>operates 批量操作下拉框数据</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ----- | ------ |
| `label` | 批量操作下拉框显示文字 | `string` | - | - |
| `value` | 批量操作下拉框值 | `string` | - | - |

---

### <font color='#1A72A6' id='btnConfig'>btnConfig 表格顶部按钮</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | --- | ----- | ------ |
| `btnSlot` | 是否启用顶部按钮插槽 `all / ''(全部显示)`，`left(只显示左侧按钮)`，`right(只显示右侧按钮)` | `enum` | `'left' / 'right' / 'none'` | - |
| `btnList` | 左侧按钮配置 | `BtnList[]` | - | - |
| `btnRightList` | 右侧按钮配置 | `BtnList[]` | - | - |

#### <font color='#50BEFF'>btnList 左侧按钮配置</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | --- | ------ | ----- |
| `style` | 样式 | `CSSProperties` | - | - |
| `disabled` | 是否禁用 如果为 `true` 那么 `operateType` 的参数将会失效 | `boolean` | - | - |
| `operateType` | 操作类型：`none 默认` (不需要选择数据)，`single` (只能操作一条数据)，`batch` (批量操作数据(至少选择一条数据以上)) | `'none' / 'single' / 'batch'` | - | - |
| `text` | 按钮文字 | `string` | - | - |
| `effect` | 自定义数据将会在自定义事件 `btn-plus-change` 抛出 | `string` | - | - |
| `showBtn` | 控制按钮显示隐藏 | `(row: Row, index: number) => boolean / boolean` | - | - |
| `tip` | 按钮提示，不传则没有提示 | `string` | - | - |
| `beforeClick` | 按钮点击前事件 | `({btnItem, rows}: {btnItem: BtnList， rows: Row}, resolve: (value: boolean) => void) => void` | - | - |
| `property` | `el-button` 组件扩展字段 (支持 `el-button` 组件所有参数) | `Partial<ButtonProps>` | - | - |
---

<a href='https://github.com/Peng-Xiao-Shuai-0902/el-plus-powerful-table/blob/master/src/indexData.js'>查看 JSON 参数</a>

### <font color='#1A72A6'>header 表格头部数据</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------- | ------ |
| `overflowTooltip` | 当内容过长被隐藏时显示 | `boolean` | `true / false` | `false` |
| `label` | 显示的标题 | `string` | - | - |
| `minWidth` | 对应列的最小宽度 | `string / number` | - | `140` |
| `width` | 对应列的宽度 | `string / number` | - | - |
| `sortable` | 排序 | `string / boolean` | `'custom' / true / false` | `false` |
| `fixed` | 固定列 | `string / boolean` | `true / 'left' / 'right'` | `false`  |
| `headerAlign` | 表头对齐方式 | `enum` | `left / 'center' / 'right'` | `'center'` |
| `headerSlotName` | 列头插槽 | `string` | - | - |
| `defaultShow` | 当前列默认显示或隐藏 | `boolean` | - | `true` |
| `defaultFilter` | 当前列默认是否过滤 `(isShowOrFilterColumn == 'filter' 时默认 true)` | `boolean` | - | `false` |
| `isShowOrFilterColumn` | 右侧按钮选择列时是否显示（隐藏和筛选开关组件） | `string / boolean` | `false / 'show' / 'filter'` | - |
| `props` | 单元格数据 | `PowerfulTableHeaderProps<null, Row>[] / PowerfulTableHeaderProps<null, Row>` | - | - |
| `property` | `el-table-column` 组件扩展字段 (支持 `el-table-column` 组件所有参数) | `Partial<TableColumnCtx<Row>>` | - | - |

#### <font color='#50BEFF'>props 单元格数据</font>

| 参数 | 说 明 | TS类型 | 可选值 | 默认值 |
| ---- | ----- | ----- | ------ | ---- |
| `prop` | 数据 ``key`` 值 | `string` | - | - |
| `type` | 数据类型 | `enum` | <a href='#image'>image</a> / <a href='#text'>text</a> / <a href='#switch'>switch</a> / <a href='#btn'>btn</a> / <a href='#video'>video</a> / <a href='#input'>input</a> / <a href='#iconfont'>iconfont</a> / <a href='#tag'>tag</a> / <a href='#rate'>rate</a> / <a href='#href'>href</a> / <a href='#slot'>slot</a> | text |
| `data` | 每个类型不一样 `data` 里值也不一样 | `_TYPE['xxx']` | - | - |
| `filters` | 过滤，只支持 `type` 为 `text、tag`| `PowerfulTableFilter[] / (row: Row, index: number) => string` | `number`  | -  | -   |
| `filtersType` | 过滤类型 用于表格顶部右侧列按钮点击时，是否过滤，是的话，自定义表头将根据类型所弹出相应的操作元素（如果指定了 `headerSlotName` 和 `isShowOrFilterColumn` 为 `show` 或者 `false` 将会无效。如果是 `filtersType: select` 需要指定 `filters` 为数组类型） | `string` | `"select" / "date" / "input"` | `"input"` |
| `filterItem`  | 指定过滤项 (当 `props` 是数组且长度大于 `1` 时有用) 如果多个 `prop` 的情况下没有指定 `filterItem` 过滤项 那么将使用第一个作进行过滤 | `boolean`  | - | - |
| `text` | 数据左侧显示的文字 | `string` | - | - |
| `reserve` | 当 `prop` 值渲染数据为空时可用 `reserve` 代替空数据 可传 `HTML` 标签  | `HTMLElement / string` | -  | `no Data` |
| `render` | [渲染函数](https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0)  | `(h: h, row: Row, index: number) => VNode / string / number` | -  | - |
| `style` | 样式  | `CSSProperties`   | -   | -  |
| `slotName` | 插槽名称 | `string`  | - | `'default'` |

#### <font color='#50BEFF' id='filters'>filters 过滤</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ------ | ----- | ------ |
| `key` | 单元格里的数据 | `string` | - | - |
| `value` | 需要替换的值 | `string` | - | - |

### <font color='#50BEFF'>data 类型数据</font>
#### <font color='#7CCEFF' id='text'>type == text （默认 text）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ------ | ----- | ------ |
| `line` | 超出多少的行数使用...代替 | `number` | - | `3` |
| `develop` | 是否显示 `“展开 / 收起”` 操作按钮 | `boolean` | `false / true` | `false` |
| `customFilterFun` | 自定义当前单元格数据文本。`props` 为 `header` 配置的当前 `props` 值 | `({row: Row, index: number, props: PowerfulTableHeaderProps<'text'>}) => string / number `| - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `click` | 点击触发 | `{row: Row, index: number, prop: string, event: Event}` |


#### <font color='#7CCEFF' id='image'>type == image（图片）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ----- | ----- | ------ |
| `style` | 图片自定义样式 | `CSSProperties`  | - | - |
| `property` | 属性扩展字段 (支持 `el-image` 组件所有参数) | `Partial<ImageProp> / (row: Row, index: number, props: PowerfulTableHeaderProps<'image', Row>) => Partial<ImageProp>` | - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `load` | 图片加载成功触发 | `e: Event` |
| `error` | 图片加载成功触发 | `e: Error` |
| `switch` | 图片加载成功触发 | `index: number` |
| `close` | 图片加载成功触发 | - |

#### <font color='#7CCEFF' id='btn' >type == btn（操作按钮）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ----- | ------ | ---- |
| `tip` | 提示文字 | `string` | - | - |
| `text` | 按钮文字 | `string` | - | - |
| `style` | 按钮样式 | `CSSProperties` | - | - |
| `showBtn` | 控制按钮显示隐藏 | `(row: Row, index: number) => void / boolean` | - | - |
| `beforeClick` | 点击前事件, `props(当前配置的props) btnIndex(按钮下标) resolve(回调函数，传递boolean)` | `({row,index, props btnIndex, params}, resolve) => void`| - | - |
| `params` | 自定义数据 | - | - | - |
| `isMore` | 是否更多 当 `data` 是二维数组时有效 | `boolean` | `true / false` | `false` |
| `property` | 属性扩展字段 (支持 `el-button` 组件所有参数) | `Partial<ButtonProp> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'btn', Row> }) => Partial<ButtonProp>` | - | - |
| `tipProperty` | 属性扩展字段 | `Partial<ElTooltipProps>` | - | - |

#### <font color='#7CCEFF' id='beforeFunction'>type == switch（开关）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ------ | ----- | ----- |
| `style` | 开关自定义样式 | `CSSProperties` | - | - |
| `property` | 属性扩展字段 (支持 `el-switch` 组件所有参数) | `Partial<SwitchProp> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'switch', Row> }) => Partial<SwitchProp>` | - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `change` | `switch` 状态发生变化时的回调函数 | `val` 新状态的值 |

#### <font color='#7CCEFF' id='input'>type == input/textarea（输入框）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ------ | ----- | ------ |
| `style` | 输入框样式 | `CSSProperties` | - | - |
| `slot` | 输入框前置或后置 | `enum` | `'prepend' / 'append' / 'prefix' / 'suffix'` | - |
| `symbol` | 文字或者符号在插槽中显示 | `string` | - | - |
| `property` | 属性扩展字段 (支持 `el-input` 组件所有参数) | `Partial<InputProp> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'input', Row> }) => Partial<InputProp>` | - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `blur` | 输入框失去焦点时触发 | `event: FocusEvent` |
| `focus` | 输入框获得焦点时触发 | `event: FocusEvent` |
| `change` | 数据改变时，当输入框失去焦点或用户按 Enter 时触发 | `value: string / number` |
| `input` | 在 `Input` 值改变时触发 | `value: string / number` |
| `clear` | 点击由 `clearable` 属性生成的清空按钮时触发 | - |

#### <font color='#7CCEFF' id='video'>type == video（视频）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------- | ---- |
| `style`  | 样式 | `CSSProperties` | - | -      |
| `property` | 属性扩展字段 (支持 `video` 标签所有参数) | `Partial<VideoHTMLAttributes> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'video', Row> }) => Partial<VideoHTMLAttributes>` | - | - |

#### <font color='#7CCEFF' id='iconfont'>type == iconfont（图标）</font>

| 参数  | 说明           | TS类型           | 可选值 | 默认值 |
| ----- | -------------- | -------------- | ------ | ------ |
| `class` | 样式类 | `string / string[]` | - | - |
| `style` | 图标自定义样式 | `CSSProperties` | - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `click` | 点击触发 | `{row: Row, index: number, prop: string, event: Event}` |

#### <font color='#7CCEFF' id='rate'>type == rate（评分）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | --- | ------ | ----- | ------ |
| `style` | 样式 | `CSSProperties` | - | - |
| `property` | 属性扩展字段 (支持 `el-rate` 组件所有参数) | `Partial<RateProps> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'rate', Row> }) => Partial<RateProps>`  | - | - |

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `click` | 点击触发 | `{row: Row, index: number, prop: string, event: Event}` |
| `change` | 值改变触发 | `val` 改变后的值 |

#### <font color='#7CCEFF' id='link'>type == href（超链接）</font>

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ----- |
| `style` | 自定义样式 | `CSSProperties` | - | - |
| `target` | 跳转类型 | `enum` | `'_self' / '_blank' / '_parent' / '_top'` | `'\_blank'` |
| `text` | 所显示的文本 | `string / (row: Row) => string` | - | - |
| `property` | 属性扩展字段 (支持 `el-link` 组件所有参数) | `Partial<LinkProps> / ({ row: Row, index: number, props: PowerfulTableHeaderProps<'href', Row> }) => Partial<LinkProps>`  | - | - |

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
```
``` html
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

| 参数 | 说明 | TS类型 | 可选值 | 默认值 |
| ---- | ---- | ----- | ------ | ----- |
| `color` | 背景颜色，返回颜色值 | `(row,tag) => string` | - | - |
| `number` | 需要显示前多少个 | `number` | - | `3` |
| `property` | 属性扩展字段 (支持 `el-tag` 组件所有参数) | `Partial<TagProps> / ({ row, index, props }) => Partial<TagProps>`  | - | - |
---

####  <font color='#7CCEFF'>Emit</font> （事件将会抛出到 `component-emit` 上）

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `click` | 点击触发 | `{row: Row, index: number, prop: string, event: Event}` |
| `close` | 关闭 Tag 时触发的事件 | - |

## Event

| 方法名 | 说明 | 类型 |
| ------ | --- | ---- |
| `size-change` | 分页器切换, `select` 所有页中选中的数据 | `({ pageNum: number; pageSize: number }, select: Row[])` |
| `sort-custom` | 远程排序 | `({ column: any, prop: string, order: string })` |
| `batch-operate` | 批量操作 | `({ ids: (string / number)[], item: PowerfulTableLabelValue, rows: Row[]})` |
| `btn-click` | 表格操作按钮 | `({params: BtnDataType['params'], row: Row, index: number})` |
| `btn-plus-change` | 表格顶部左侧操作按钮，`rows` 返回所有选中的行 | `({ effect: BtnConfig.BtnList['effect'], rows: Row[] })` |
| `btn-plus-refresh` | 表格顶部刷新按钮 | - |
| `row-click` | 行点击事件 | `({row: Row, column: any, event: Event})` |
| `component-event` | 内部组件事件 | `({componentName: keyof _TYPE / 'filter', eventType: string}, ...arg: any)` |

## Slot

| 插槽名 | 说明 |
| ----- | ----- |
| `btn-left` | 表格顶部左侧按钮 (`btnSlot` 需等于 `all` or `left`) |
| `btn-right` | 表格顶部右侧按钮 (`btnSlot` 需等于 `all` or `right`)  |
| `empty` | 表格内数据为空时内容 |
| `refresh` | 刷新 |
| `[slotName]` | 表格内自定义的插槽名称 |
| `[headerSlotName]` | 表格列头内自定义的插槽名称 |
