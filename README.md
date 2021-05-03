## el-powerful-table

主要功能：分页多选，批量操作

vue2.0 的 element-ui 二次开发表格组件

### 使用方法

```js
npm i el-powerful-table
```

```js
//main.ts
import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import powerfulTable from "el-powerful-table";

Vue.use(ElementUI)
Vue.use(powerfulTable)

new Vue({
  el: '#app',
  render: h => h(App)
})

//*.vue
<powerful-table :list="list" :total="total" :header="header"></powerful-table>
```

## powerful-table Attributes 表格组件

| 参数          | 说明                                                            | 类型    | 可选值                                                                        | 默认值                          |
| ------------- | --------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- | ------------------------------- |
| list          | 当前数据                                                        | array   | -                                                                             | -                               |
| header        | 表格头部数据                                                    | array   | -                                                                             | -                               |
| total         | 分页总条数                                                      | number  | -                                                                             | 0                               |
| tableName     | 表格名(用于缓存表格的分页) <font color='red'>已废弃</font>      | number  | -                                                                             | 1                               |
| layout        | 组件布局，子组件名用逗号分隔                                    | string  | 详情参考[element 分页](https://element.eleme.cn/#/zh-CN/component/pagination) | total, sizes, prev, pager, next |
| pageSizes     | 每页显示个数选择器的选项设置                                    | array   | -                                                                             | [10, 20, 30]                    |
| selectData    | 选中的数据                                                      | array   | -                                                                             | -                               |
| selectCompare | 选中数据和列表数据相比较的参数`[0]选中数据参数,[1]列表数据参数` | array   | -                                                                             | ['id','id']                     |
| isSelect      | 是否显示多选                                                    | boolean | false/true                                                                    | false                           |
| isPagination  | 是否显示分页器                                                  | boolean | false/true                                                                    | false                           |
| operateData   | 批量操作                                                        | object  | -                                                                             | {}                              |

---

### <font color='#1A72A6'>operateData 批量操作</font>

> 如果表格有 `header.props.type` 为 `input` 的则需要先填写该行数据，在选中该行，否则会出现获取不到 `input` 的值

| 参数     | 说明               | 类型          | 可选值                                             | 默认值  |
| -------- | ------------------ | ------------- | -------------------------------------------------- | ------- |
| value    | 下拉选中值         | string        | -                                                  | null    |
| size     | 按钮和下拉框大小   | string        | medium / small / mini                              | small   |
| type     | 按钮的类型         | string        | primary / success / warning / danger / info / text | primary |
| disabled | 禁用               | boolean       | true / false                                       | false   |
| icon     | 按钮上图标         | string        | -                                                  | -       |
| style    | 按钮样式           | object        | -                                                  | -       |
| operates | 批量操作下拉框数据 | array[object] | -                                                  | -       |

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
  operates:[{
    label: '删除',
    value: 0
  }]
}
```

<a href='https://github.com/Peng-Xiao-Shuai-0902/el-plus-powerful-table/blob/master/src/indexData.js'>查看JSON参数</a>
### <font color='#1A72A6'>header 表格头部数据</font>

| 参数            | 说明                   | 类型             | 可选值                  | 默认值 |
| --------------- | ---------------------- | ---------------- | ----------------------- | ------ |
| overflowTooltip | 当内容过长被隐藏时显示 | boolean          | true / false            | false  |
| label           | 显示的标题             | string           | -                       | -      |
| minWidth        | 对应列的最小宽度       | string           | -                       | 100    |
| width           | 对应列的宽度           | string           | -                       | -      |
| sortable        | 排序                   | boolean / string | 'custom' / true / false | false  |
| headerAlign     | 表头对齐方式           | string           | left / center / right   | center |
| props           | 单元格数据             | array[object]    | -                       | -      |

#### <font color='#50BEFF'>props 单元格数据</font>

| 参数   | 说明                                                                          | 类型          | 可选值                                      | 默认值 |
| ------ | ----------------------------------------------------------------------------- | ------------- | ------------------------------------------- | ------ |
| prop   | 数据 key 值                                                                   | string        | -                                           | -      |
| child  | 当 prop 值是对象是用到 仅支持 `type 为 text`                                  | string        | -                                           | -      |
| type   | 数据类型                                                                      | string        | image / text / switch / btn / video / input | text   |
| data   | 每个类型不一样 data 里值也不一样，<br> type 为 btn 时数据类型为 array[object] | object        | -                                           | -      |
| filter | 过滤，只支持 `type 为 text、tag`                                                  | array[object] | -                                           | -      |
| text   | 数据左侧显示的文字。（例：文字：数据）                                        | string        | -                                           | -      |
| reserve  | 当 prop 值 渲染数据为空时可用 reserve 代替空数据        | string        | -                                           | -      |
| style  | 包裹组件外面那一层 div 样式                                                   | object        | -                                           | -      |

```js

// 假设有一个这样的数据
const data = {
  my:{
    name: 'red'
  },
  myBrother: 'yellow'
}

// 参数示例
[{
  {
  label: '我',
  props:[{
    type: 'text',
    text: '我的名字',
    prop: 'my',
    child: 'name',
    reserve: '我只有在数据空时显示',
    filter:[{
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
}]
```

#### <font color='#50BEFF' id='filter'>filter 过滤</font>

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| key   | 单元格里的数据 | string | -      | -      |
| value | 需要替换的值   | string | -      | -      |

```js
// 参数示例
{
  label: '筛选',
  props:[{
    prop: 'name',
    filter:[{
      key: '1',
      value: '替换1'
    }]
  }]
}
```

#### <font color='#50BEFF'>data 类型数据</font>

<font color='red'>type != 'text' 的并且没有 data 情况下 都建议写上 data:{}</font>

```js
//示例
{
  type: 'image',
  prop:'image',
  data:{}
}
```

#### <font color='#7CCEFF'>type == image（图片）</font>

| 参数    | 说明                                                                                                | 类型    | 可选值                                     | 默认值 |
| ------- | --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------ | ------ |
| preview | 预览                                                                                                | boolean | true/false                                 | true   |
| lazy    | 懒加载                                                                                              | boolean | true/false                                 | true   |
| zIndex  | 图片预览层级                                                                                        | number  | -                                          | 6000   |
| style   | 图片自定义样式                                                                                      | object  | -                                          | -      |
| fit     | 图片如何适应容器框，同原生[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string  | fill / contain / cover / none / scale-down | -      |

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

#### <font color='#7CCEFF'>type == btn（操作按钮）</font>

| 参数     | 说明             | 类型    | 可选值                                               | 默认值  |
| -------- | ---------------- | ------- | ---------------------------------------------------- | ------- |
| tip      | 提示文字         | string  | -                                                    | -       |
| style    | 按钮样式         | object  | -                                                    | -       |
| icon     | 按钮上图标       | string  | -                                                    | -       |
| disabled | 按钮是否禁用     | boolean | true/false                                           | false   |
| type     | 按钮类型         | string  | primary / success / warning / danger / info / text   | primary |
| size     | 按钮大小         | string  | medium / small / mini                                | small   |
| condi    | 控制按钮显示隐藏 | object  | -                                                    | -       |
| emit     | 自定义方法名     | string  | - | -       |

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
            condi: {
              // 此时 name == 1 时才会显示
              prop: 'name',
              value: '1'
            }
          },
          {
            tip: "删除",
            type: "danger",
            text: "D",
            icon: "el-icon-delete",
            emit: "remove",
          },
        ],
      },
    ],
  }
```

#### <font color='#9FDBFF'>condi（判断是否显示按钮）</font>

| 参数  | 说明                     | 类型            | 可选值 | 默认值 |
| ----- | ------------------------ | --------------- | ------ | ------ |
| prop  | 根据判断的 prop          | string          | -      | -      |
| value | 根据判断的 prop 的 value | string / number | -      | -      |

#### <font color='#7CCEFF'>type == switch（开关）</font>

| 参数          | 说明             | 类型    | 可选值     | 默认值 |
| ------------- | ---------------- | ------- | ---------- | ------ |
| activeColor   | 打开时的背景色   | string  | -          | -      |
| inactiveColor | 关闭时的背景色   | string  | -          | -      |
| inactiveText  | 关闭时的文字描述 | string  | -          | -      |
| activeText    | 关闭时的文字描述 | string  | -          | -      |
| activeValue   | 打开时的值       | number  | -          | 1      |
| inactiveValue | 关闭时的值       | number  | -          | 0      |
| disabled      | 是否禁用         | boolean | true/false | false  |
| style         | 开关自定义样式   | object  | -          | -      |


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

#### <font color='#7CCEFF'>type == input（输入框）</font>

| 参数        | 说明              | 类型    | 可选值                | 默认值 |
| ----------- | ----------------- | ------- | --------------------- | ------ |
| style       | 输入框样式        | object  | -                     | -      |
| size        | 输入框大小        | string  | medium / small / mini | small  |
| placeholder | 输入框文字描述    | string  | -                     | -      |
| disabled    | 输入框是否禁用    | boolean | true/false            | false  |
| slot        | 输入框前置或后置  | string  | prepend / append      | -      |
| symbol      | slot 文字或者符合 | string  | -                     | -      |

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

#### <font color='#7CCEFF'>type == video（视频）</font>

| 参数   | 说明           | 类型    | 可选值     | 默认值 |
| ------ | -------------- | ------- | ---------- | ------ |
| style  | 视频样式       | object  | -          | -      |
| poster | 封面 url 路径  | string  | -          | -      |
| loop   | 循环播放       | boolean | true/false | false  |
| style  | 图片自定义样式 | object  | -          | -      |

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

#### <font color='#7CCEFF'>type == iconfont（图标）</font>

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| class | 样式类         | array  | -      | -      |
| style | 图标自定义样式 | object | -      | -      |

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

#### <font color='#7CCEFF'>type == rate（评分）</font>

| 参数      | 说明                                                                    | 类型    | 可选值     | 默认值                                                    |
| --------- | ----------------------------------------------------------------------- | ------- | ---------- | --------------------------------------------------------- |
| max       | 最大数值                                                                | number  | -          | 5                                                         |
| style     | 自定义样式                                                          | object  | -          | -                                                         |
| colors    | 颜色数组                                                                | array   | -          | ['#F7BA2A', '#F7BA2A', '#F7BA2A']                         |
| iconClass | 颜色数组                                                                | array   | -          | ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'] |
| allowHalf | 是否允许半选                                                            | boolean | true/false | false                                                     |
| showText  | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean | -          | false                                                     |
| showScore | 是否显示当前分数，show-score 和 show-text 不能同时为真                  | boolean | true/false | false                                                     |
| texts     | 辅助文字数组                                                            | array   | -          | ['极差', '失望', '一般', '满意', '惊喜']                  |


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

#### <font color='#7CCEFF'>type == href（超链接）</font>

| 参数      | 说明                                            | 类型    | 可选值     | 默认值    |
| --------- | ----------------------------------------------- | ------- | ---------- | --------- |
| style     | 自定义样式                                       | object  | -          | - |
| target    | 跳转类型                                        | string  | -          | '\_blank' |
| type      | 主题类型                                        | string  | -          | 'primary' |
| underline | 是否显示下划线                                  | boolean | true/false | false     |
| prop      | 超链接文字该显示哪个 prop 的值 否则为 text 的值 | string  | -          | 空        |

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

| 参数     | 说明     | 类型   | 可选值 | 默认值    |
| -------- | -------- | ------ | ------ | --------- |
| slotName | 插槽名称 | string | -      | 'default' |


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

| 参数     | 说明     | 类型   | 可选值 | 默认值    |
| -------- | -------- | ------ | ------ | --------- |
| type | 类型 | string | 'primary / success / warning / danger / info'      | 'primary' |
| effect | 主题 | string | 'dark / light / plain'      | 'light' |
| color | 背景颜色 | string | -      | - |
| hit | 是否描边 | boolean | -      | false |
| filter | <a href='#filter'>查看详情</a> | array | -      | - |

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

| 方法名       | 说明                                                                                            | 参数                                                  |
| ------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| sizeChange   | 分页器切换                                                                                      | { pageNum , pageSize }，selectArr(所有页中选中的数据) |
| sortCustom   | 远程排序                                                                                        | column                                                |
| batchOperate | 批量操作                                                                                        | {ids , selection , rows}                              |
| 自定义方法名 | - | {row , index }                                        |
| switchChange | 开关组件操作                                                                                    | row                                                   |
