## [DEMO](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-demo.html)

## [DOCS](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-doc.html)

## 语言
对于语言方面组件是默认使用 `英语` 因为 `element-plus` 默认是使用英语，不引用中文包的主要原因是避免增大体积。
组件内部语言跟随 `element-plus`。 部分 提示文字 语言，组件内部也支持 `中、英` 文，如果你需要支持更多语言或者更改组件内部
的语言，可以在 `use(PowerfulTable, { local: 您的语言变量 })` 替换。也可以参考我们提供的 `demo` 实现。

## el-plus-powerful-table-ts

此插件已 `el-plus-powerful-table` 作为基础，进行重构。部分功能将领先 `el-plus-powerful-table` 基础版本。
`el-plus-powerful-table` 的 `ts` 版本

`vue3.0` 的 `element-plus` 二次开发表格组件

## 简要

- 以下【内部组件】为该文件夹中 `packages/components/src` 下的组件

## 2.2.1 20231016
- `BtnList` 补充 `click` 属性
- 组件销毁前清除监听事件

## 2.2.0 20231005
- 新增 `type = 'btn'` 时，添加 `click` 属性，需要注意的事，存在 `click` 属性时将不会触发 `beforeClick` 属性
- 优化了内部组件 `button` 文件中的 `class` 由原来的 `class={item.text ? '' : 'no-margin'}` 改成空。
- 新增全局组件注入 `emptyElement`
- 新增全局组件注入 `listRequest`，以及在 `Props` 属性上添加。
- 组件添加暴露数据，类型为 `PowerfulTableExpose`

## 2.1.15 20230315

- 解决切换批量操作点击确定后选择的批量操作类型永远是第一个 `bug`
- `component-event` 自定义事件参数返回更改， 由原来的 `{ componentName:  string, eventType:  string }` 改为
`{ componentName: string, eventType: string, index: number, prop:  PowerfulTableHeaderProps<any>[] | PowerfulTableHeaderProps<any>, row: any }`

## 2.1.14 20230312

- 解决没有类型提示 `bug`

## 2.1.13 20230311
## 2.1.12 20230311

- 取消将 `@element-plus/icons` 添加到 `es` 和 `lib`
## 2.1.11 20230311

- 删除 `btnConfig.Config` 以及 `InjectProps` 中 `btnSlot` 参数
- 修复 `btn-left` 以及 `btn-right` 插槽无效 `bug`

## 2.1.10 20230223

- 修复鼠标悬浮组件没有类型提示 `bug`

## 2.1.9 20230222
## 2.1.8 20230222
## 2.1.7 20230222
- 修复 `treeProps` 为 `undefined` 问题
- 修复类型为 `tag` 时，数据为 `undefined` 报错
- `type = 'text'` `data` 中的 `customFilterFun` 属性值更改为 `formatting`
- `PowerfulTableHeaderProps` 类型上新增属性 `customFilter` 自定义过滤

## 2.1.6 20230221

- 修改自定义过滤头部渲染逻辑

## 2.1.5 20230216

- 修复未全局安装 `element-plus` 时引发组件不能使用 `bug`
- 删除内部组件 `input` 的 `onClick` 事件， 因为和 `onFocus` 重合
- 删除内部组件 `rate` 的 `onClick` 事件，因为 `ElRate` 上不存在 `onClick`

## 2.1.3 20230215

- 修复 `lib | es` 文件夹内 `.d.ts` 文件中引入的 `typings` 文件路径找不到

## 2.1.2 20230214

- 更改打包配置

## 2.1.1 20230130

- `btn-plus` 文件重构（`vue` 改成 `tsx`)
- - `btnConfig` 新增属性 `btnRightList` 类型为 `BtnList[]`
- - 类型 `BtnList` 新增属性 `tip beforeClick property`

## 2.1.0 20230107

- 删除 `btn-plus` 组件中 `BtnConfig.BtnList` 的 `type icon showTip tipContent`
- 删除 内部组件 `data` 部分属性（由于提供的属性不完整和 `element-plus` 存在差异，全部提供则感觉有点冗余，推荐使用 `property` 属性。内部组件只会保存部分默认值，但是可以通过 `property` 传参替换）
- - `image` 删除 `lazy zIndex style fit `。保留部分默认值 `fit = 'cover'`，`lazy, preview-teleported = true`（`el-image` 中 `lazy preview-teleported` 默认 `false`）
- - `input` 删除 `type placeholder disabled rows`。保留部分默认值 `rows = 3`
- - `href` 删除 `type placeholder rows disabled`。 保留部分默认值 `type = 'primary'`，`underline = false`
- - `rate` 删除 `max colors iconClass allowHalf showText showScore texts property`。 保留部分默认值 `disabled = false`
- - `switch` 删除 `activeColor inactiveColor inactiveText activeText activeValue inactiveValue disabled isConfirmTip confirmTip beforeFunction` 保留部分默认值 `inactiveValue = '0'`，`activeValue = '1'`
- - `tag` 删除 `closable type effect hit` 保留部分默认值 `type = ''`
- - `video` 删除 `poster loop` 保留部分默认值 `controls = true`，`loop = false`
- - `button` 删除 `icon disabled type emit isTooltip isConfirmTip confirmTip` 保留部分默认值 `type = 'primary'`。添加 `beforeClick tipProperty` 属性
- 内部组件 `property` 支持函数类型
- `componentProps` 属性更改为 `property`
- `type` 类型为 `video` 新增 `property` 扩展属性
- `BtnConfig.BtnList` 新增 `property` 扩展属性
- 内部组件新增自定义事件，详情看 `type == 'XX'`（XX 为某个类型）, 内部组件传递到 `powerful-table` 组件由 `component-event` 抛出
- `type = 'text'` `data` 中的 `customFilterFun` 属性值更改
- 修改 组件 `InjectProps` 类型中 `local` 的类型。注入的 `local` 属性现在主要是用于 替换或者扩展组件内部提示文字
- 优化 `button` 在表格中样式
- 修改 `selectable` 默认不允许勾选问题
- `header` 表格头部数据属性中 `filters` 更改为 `defaultFilter`. `hidden` 更改为 `defaultShow`
- `props` 单元格数据 `filter` 更改为 `filters`
- 删除 组件 `props` 中的 `local`
- 使用`vite`进行构建
- - 构建库模式优化，生成`es、cjs`两种模式
- `element-plus` 版本更新到 `2.0+`

  ## 2.0.7 20220328

- **新增 props `property`**
- - [**ElTable 属性**](https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes)
- `type` 为 `btn、image、input、rate、switch、tag` 的 `data` 中新增 `componentProp` 扩展参数
- `href` 类型更改为 `link`
- - `link` 的 `data` 中新增属性 `icon`
- - `link` 的 `data` 中 `text` 没有值时将显示 `prop` 数据在页面上
- `input` 类型新增 `type` 同 `el-input type`
- 修复 `rate` 类型中 `locale` 警告
- 优化 `link` 的 `data` 中 `target` 属性类型固定
- 修复 `Failed to resolve component: PTBtnPlus` 警告

## 2.0.0 20220314

- **新增支持内置组件导出`PT`开头：例如:`PTImage，PTButton`**
- - 主要用于 `powerful-table-draggable` 组件的引用
- `switch、btn` 类型新增属性
- - `isConfirmTip` 是否开启点击时确认框提示
- - `isConfirmTip` 确认框提示文字
- 优化 `el-pagination small`属性随组件或全局 `size` 属性更改
- 解决鼠标悬浮在组件上没有类型

## 1.1.0 20211231

- 新增表格顶部按钮功能
- - 新增配置项 <a href="btnConfig">**传送门**</a>
- - 新增插槽 `btn-left` `btn-right`
- `header` 新增属性
- - `isShowOrFilterColumn` 是否开启过滤或者显示隐藏列的开关
- - `selectable` 行是否可以选中
- `prop` 新增属性
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
- - 新增 `params`，`isMore` 属性。`params` 自定义传入数据，将会在点击按钮时返回。例如：

```js
{
  {
    ;('update')
  }
}

// index.vue
;<powerfulTable v-on:btnClick="handleOperate"></powerfulTable>

// row 当前行数据 params 自定义传入的数据 index 当前行的下标
const handleOperate = ({ row, params, index }) => ({})
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
