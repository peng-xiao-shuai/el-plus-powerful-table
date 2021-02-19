## tableMax Attributes 表格组件
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| list | 当前数据 | array | - | [] |
| header | 表格头部数据 | array | - | [] |
| total | 分页总条数 | number | - | 0 |
| layout | 组件布局，子组件名用逗号分隔 | string | 详情参考[element分页](https://element.eleme.cn/#/zh-CN/component/pagination) | total, sizes, prev, pager, next |
| pageSizes | 每页显示个数选择器的选项设置 | array | - | [10, 20, 30] |
| selectData | 选中的数据 | array | - | [] |
| selectCompare | 选中数据和列表数据相比较的参数`[0]选中数据参数,[1]列表数据参数` | array | - | ['id','id'] |
| isSelect | 是否显示多选 | boolean | false/true | false |
| operateData | 批量操作 | object | - | {} |
---
#### operateData 批量操作
>如果表格有 `header.poprs.type` 为 `input` 的则需要先填写该行数据，在选中该行，否则会出现获取不到 `input` 的值

|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| value | 下拉选中值 | string | - | null |
| size | 按钮和下拉框大小 | string | medium / small / mini | small|
| type | 按钮的类型 | string | primary / success / warning / danger / info / text | primary|
| disabled | 禁用 | boolean| true / false | false |
| icon| 按钮上图标 | string | - | - |
| style | 按钮样式 | object | - | {} |
| operates | 批量操作下拉框数据 | array[object] | - | [] |
###### operates 批量操作下拉框数据
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| label | 批量操作下拉框数据 | array | - | [] |
---
#### header 表格头部数据
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| overflowTooltip | 当内容过长被隐藏时显示 | boolean| true / false | true|
| label | 显示的标题  | string | - | - |
| minWidth | 对应列的最小宽度 | string | - | 100 |
| width | 对应列的宽度 | string | - | - |
| sortable | 排序 | boolean / string | 'custom' / true / false | false |
| headerAlign | 表头对齐方式 | string | left / center / right | center |
| poprs | 单元格数据 | array[object] | - | - |
###### poprs 单元格数据
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| popr | 数据key值 | string | - | - |
| child | 当popr值是对象是用到 仅支持type为text | string | - | - |
| type | 数据类型 | string | image / text / switch / btn / video / input | text |
| data | 每个类型不一样data里值也不一样，<br> type为btn时数据类型为 array[object] | object | - | - |
| filter | 过滤，只支持type为text | array[object] | - | - |

###### filter 过滤
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| key | 单元格里的数据 | string | - | - |
| value| 需要替换的值 | string | - | - |
###### data 类型数据 
###### type == image
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| preview | 预览 | boolean  | true/false | - |
| lazy | 懒加载 | boolean  | true/false | false |
| zIndex | 图片预览层级 | number| - | 2000 |
| style | 图片自定义样式 | object | - | - |
| fit |图片如何适应容器框，同原生[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
###### type == btn
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| tip | 提示文字 | string | - | - |
| style | 按钮样式 | object | - | - |
| icon | 按钮上图标 | string | - | - |
| disabled | 按钮是否禁用 | boolean  | true/false | false |
| type | 按钮类型 | string | primary / success / warning / danger / info / text | primary|
| size | 按钮大小 | string | medium / small / mini | small|
| condi | 控制按钮显示隐藏 | object | - | - |
| emit | 自定义方法名 | string | - | - |

###### condi
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| popr | 根据判断的popr | string | - | - |
| value | 根据判断的popr 的value | string / number| - | - |

###### type == switch
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| activeColor | 打开时的背景色 | string | - | #409EFF |
| inactiveColor | 关闭时的背景色 | string | - | #C0CCDA |
| inactiveText | 关闭时的文字描述 | string | - | - |
| activeText | 关闭时的文字描述 | string | - | - |
| activeValue | 打开时的值 | number | - | 1 |
| inactiveValue | 关闭时的值 | string | primary / success / warning / danger / info / text | primary|
| disabled | 是否禁用| boolean  | true/false | false |

###### type == input
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| style | 输入框样式 | object | - | - |
| size |  输入框大小 | string | medium / small / mini | small|
| placeholder | 输入框文字描述 | string | - | - |
| disabled | 输入框是否禁用| boolean  | true/false | false |
| slot | 输入框前置或后置 | string | prepend / append | - |
| symbol | slot文字或者符合 | string | - | - |

###### type == video
|参数|说明|类型|可选值|默认值
|--|--|--|--|--|
| style | 视频样式 | object | - | - |
| poster | 封面url路径 | string | - | - |
| loop | 循环播放 | boolean  | true/false | false |
---

##### Methods
|方法名|说明|参数
|--|--|--|
| sizeChange | 分页器切换 | { pageNum , pageSize } |
| sortCustom | 远程排序 | column |
| batchOperate | 批量操作 | ids , selection , rows |
| 自定义方法名 | 操作按钮 | row , index |
| switchChange | 开关组件操作 | row |



