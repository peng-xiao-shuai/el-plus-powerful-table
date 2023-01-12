## 简要

- 以下【内部组件】为该文件夹中 `packages/components/src` 下的组件

## 2.1.0 202201023

- 删除 `btn-plus` 组件中 `BtnConfig.BtnList` 的 `type icon showTip tipContent`
- 删除 内部组件 `data` 部分参数（由于提供的参数不完整和 `element-plus` 存在差异，全部提供则感觉有点冗余，推荐使用 `property` 参数。内部组件只会保存部分默认值，但是可以通过 `property` 传参替换）
- - `image` 删除 `lazy zIndex style fit `。保留部分默认值 `fit = 'cover'`，`lazy, preview-teleported = true`（`el-image` 中 `lazy preview-teleported` 默认 `false`）
- - `input` 删除 `type placeholder disabled rows`。保留部分默认值 `rows = 3`
- - `href` 删除 `type placeholder rows disabled`。 保留部分默认值 `type = 'primary'`，`underline = false`
- - `rate` 删除 `max colors iconClass allowHalf showText showScore texts property`。 保留部分默认值 `disabled = false`
- - `switch` 删除 `activeColor inactiveColor inactiveText activeText activeValue inactiveValue disabled isConfirmTip confirmTip beforeFunction` 保留部分默认值 `inactiveValue = '0'`，`activeValue = '1'`
- - `tag` 删除 `closable type effect hit` 保留部分默认值 `type = ''`
- - `video` 删除 `poster loop` 保留部分默认值 `controls = true`，`loop = false`
- - `button` 删除 `icon disabled type emit isTooltip isConfirmTip confirmTip` 保留部分默认值 `type = 'primary'`。添加 `beforeClick tipProperty` 参数
- 内部组件 `property` 支持函数类型
- `componentProps` 参数更改为 `property`
- `type` 类型为 `video` 新增 `property` 扩展参数
- `BtnConfig.BtnList` 新增 `property` 扩展参数
- 内部组件新增自定义事件，详情看 `type == 'XX'`（XX 为某个类型）, 内部组件传递到 `powerful-table` 组件由 `component-event` 抛出
- `type = 'text'` `data` 中的 `customFilterFun` 参数值更改
- 修改 组件 `InjectProps` 类型中 `local` 的类型。注入的 `local` 参数现在主要是用于 替换或者扩展组件内部提示文字
- 优化 `button` 在表格中样式
- 修改 `selectable` 默认不允许勾选问题
- `header` 表格头部数据参数中 `filters` 更改为 `defaultFilter`. `hidden` 更改为 `defaultShow`
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
