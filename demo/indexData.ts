import { markRaw } from 'vue'
import { ElMessageBox } from 'element-plus/es'
import { Delete, Edit, Grid, Plus, Refresh } from '@element-plus/icons-vue'
import { setData } from '../packages/index'
import type {
  BtnConfig,
  LangPackages,
  PowerfulTableFilter,
  PowerfulTableHeader,
} from '@/index'
import { LangKey } from '~/locale/packages'

console.log(LangKey)

type Lists = {
  id?: number
  name?: string
  engine?: string
  manufacturer?: string
  manufacturerHref?: string
  icon?: string
  brand?: string
  createTime?: null | string
  price?: string | number
  switchVal?: number
  tag?: (number | string)[] | string
  rate?: number
  content?: string
  videoUrl?: string
  imageUrl?: string
  href?: string
  cd?: Lists[]
  data?: string
  driveType?: string
  engineLocation?: string
  [s: string]: any
}

const btnConfig: BtnConfig.Config = {
  // hidden: 'none',
  btnSlot: 'all',
  btnRightList: [
    {
      effect: 'refresh',
      tip: '刷新',
      property: {
        icon: markRaw(Refresh),
        type: 'primary',
      },
    },
    {
      effect: 'columns',
      property: {
        icon: markRaw(Grid),
      },
    },
  ],
  btnList: [
    {
      text: '新增',
      effect: 'add',
      showBtn: true,
      property: {
        icon: markRaw(Plus),
        type: 'primary',
      },
    },
    {
      text: '修改',
      operateType: 'single',
      effect: 'edit',
      // showBtn: () => false,
      property: {
        icon: markRaw(Edit),
        type: 'primary',
      },
    },
    {
      text: '批量删除',
      operateType: 'batch',
      effect: 'remove',
      beforeClick({ btnItem }, resolve) {
        console.log(btnItem)

        ElMessageBox.confirm('是否确认批量删除', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          resolve(true)
        })
      },
      property: {
        icon: markRaw(Delete),
        type: 'danger',
      },
      // tipContent: '立即执行批量删除'
    },
  ],
}

const header: PowerfulTableHeader<Lists>[] = [
  {
    label: '编号', //显示的标题
    minWidth: '100px', //对应列的最小宽度
    headerAlign: 'center',
    sortable: true, //排序
    props: {
      prop: 'id',
      // data: {
      //   develop: false,
      // },
    },
    defaultShow: false,
  },
  {
    label: '制作厂', //显示的名称
    width: 200,
    overflowTooltip: true,
    isShowOrFilterColumn: 'filter',
    defaultFilter: false,
    headerAlign: 'left',
    props: [
      {
        type: 'href',
        prop: 'manufacturerHref',
        text: '厂商：',
        data: setData<'href', Lists>({
          text: (row: any) => row.manufacturer,
          property: {
            underline: true,
          },
        }),
      },
      {
        prop: 'icon',
        type: 'iconfont',
        text: '车标：',
        data: setData<'iconfont', Lists>({
          class: 'viteIcon',
          style: {
            height: '40px',
            lineHeight: '40px',
            fontSize: '40px',
          },
        }),
      },
    ],
  },
  {
    label: '名称', //显示的名称
    width: 220,
    overflowTooltip: true,
    isShowOrFilterColumn: 'filter',
    headerAlign: 'left',
    props: [
      {
        text: '品牌：',
        prop: 'brand',
        filterItem: true,
        filtersType: 'select',
        filters: [
          { key: 'Audi', value: '奥迪' },
          { key: 'BMW', value: '宝马' },
        ],
        render: (h, row) =>
          h('b', `${row.brand}（${{ Audi: '奥迪', BMW: '宝马' }[row.brand!]})`),
      },
      {
        type: 'href',
        prop: 'href',
        text: '型号：',
        data: setData<'href', Lists>({
          text: (row) => row.name!,
        }),
      },
    ],
  },
  {
    label: '图片', //显示的标题
    isShowOrFilterColumn: 'show',
    props: [
      {
        type: 'image',
        prop: 'imageUrl',
        data: setData<'image', Lists>({
          style: {
            borderRadius: '10px',
          },
          property: ({ row, index, props }) => {
            // console.log(row, index, props)
            return {
              // src: 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
            }
          },
        }),
      },
    ],
  },
  {
    label: '售价', //显示的标题
    isShowOrFilterColumn: false,
    // 如果要使用过滤功能 isFilterColumn 参数是必须的, 或者指定 isShowOrFilterColumn 为 'filter'
    headerAlign: 'left',
    props: [
      {
        text: '收藏：',
        prop: 'switchVal',
        type: 'switch',
        data: setData<'switch', Lists>({
          // isConfirmTip: true, // 开启提示
          // confirmTip: '确认修改', // 提示语
          // inactiveText: '关闭',
          // activeText: '开启',
          property: {
            inactiveValue: 0,
            activeValue: 1,
          },
        }),
      },
      {
        prop: 'price',
        type: 'input',
        data: setData<'input', Lists>({
          slot: 'append',
          symbol: '万',
          style: { width: '100%' },
          property({ row, index, props }) {
            return {
              placeholder: '售价',
            }
          },
        }),
      },
    ],
  },
  {
    label: '发动机名称', // 此标题不会显示，因为配置了 自定义表头 headerSlotName
    width: '220',
    isShowOrFilterColumn: 'filter',
    headerSlotName: 'Link',
    // property: {
    //   align: 'left',
    // },
    props: [
      {
        type: 'text',
        prop: 'engine',
        text: '发动机：',
        filters: (row) => row.engine!,
      },
      {
        type: 'rate',
        prop: 'rate',
        text: '评 分：',
        data: setData<'rate', Lists>({
          property: {
            disabled: false,
          },
        }),
      },
      // {
      //   type: 'href',
      //   prop: 'href',
      //   data: {
      //     text: (e: any) => e.name,
      //   },
      //   render: (h, row, index) => {
      //     return h('b', {}, row.name)
      //   },
      // },
    ],
  },
  {
    label: '驱动方式',
    props: {
      prop: 'driveType',
      filters: [
        {
          key: 'q',
          value: '前驱',
        },
        {
          key: 'h',
          value: '后驱',
        },
        {
          key: '4',
          value: '四驱',
        },
      ],
      data: setData<'text', Lists>({
        customFilterFun: ({ row, props }) =>
          row.engineLocation! +
          (props.filters as PowerfulTableFilter[]).find(
            (item) => item.key == row.driveType
          )?.value,
      }),
    },
  },
  {
    label: '宣传视频', //显示的标题
    width: 200,
    // isFilterColumn: true,
    props: {
      prop: 'videoUrl',
      type: 'video',
      data: setData<'video', Lists>({
        style: {
          width: '100%',
          height: '117px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #ccc',
        },
        property: ({ row }) => ({
          poster: row.imageUrl,
          controls: true,
        }),
      }),
    },
  },
  {
    label: '外观颜色(只显示两个)', //显示的标题
    width: 200,
    overflowTooltip: false,
    isShowOrFilterColumn: 'filter',
    props: [
      {
        prop: 'tag',
        type: 'tag',
        data: setData<'tag', Lists>({
          number: 2,
          style: {
            color: 'white',
          },
          color: (r, tag) => {
            return (
              { red: '#BD3145', blue: '#008DAF', white: '#eee' }[tag] || tag
            )
          },
        }),
        filters: [
          { key: 'red', value: '红色' },
          { key: 'black', value: '黑色' },
          { key: 'blue', value: '蓝色' },
          { key: 'gray', value: '灰色' },
          { key: 'white', value: '白色' },
        ],
        reserve: '<i><b>VNode</b></i>',
      },
    ],
  },
  {
    label: '发售日期（插槽）', //显示的标题
    isShowOrFilterColumn: 'filter',
    width: '180px',
    // hidden: true,
    props: [
      {
        prop: 'data',
        filtersType: 'date',
        type: 'slot',
        slotName: 'date',
      },
    ],
  },
  {
    label: '简介', //显示的标题
    width: '300px',
    isShowOrFilterColumn: 'filter',
    props: [
      {
        prop: 'content',
        type: 'text',
        data: setData<'text', Lists>({
          develop: true,
          line: 2,
        }),
      },
    ],
  },
  {
    label: '操作', //显示的标题
    width: 250,
    fixed: 'right',
    isShowOrFilterColumn: false,
    props: [
      {
        type: 'btn',
        prop: 'btn',
        data: setData<'btn', Lists>([
          {
            tip: '编辑按钮',
            // showBtn: false,
            // isTooltip: true,
            params: {
              emit: 'update',
            },
            beforeClick({ row, index, btnIndex, props, params }, resolve) {
              ElMessageBox.confirm('正在进行修改操作，确认要修改？', '提示', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
              }).then(() => {
                resolve(true)
              })
            },
            property: {
              type: 'info',
              icon: markRaw(Edit),
            },
          },
          [
            {
              text: '更多',
              isMore: true,
              property: {
                icon: markRaw(Edit),
              },
            },
            // {
            //   tip: '编辑',
            //   type: 'text',
            //   icon: markRaw(Edit),
            //   params: 'update',
            // },
            {
              text: '删除',
              params: 'remove',
              property: {
                type: 'danger',
                icon: markRaw(Edit),
              },
            },
          ],
          // {
          //   tip: '删除',
          //   type: 'danger',
          //   icon: markRaw(Edit),
          //   showBtn: (e: any) => {
          //     return true
          //   },
          //   params: {
          //     emit: 'remove',
          //   },
          // },
        ]),
      },
    ],
  },
]

const lists: Lists[] = [
  {
    id: 1,
    brand: 'Audi',
    engine: '4.0T 600马力 V8',
    manufacturer: 'Audi Sport',
    manufacturerHref: 'https://www.audi.com.hk/hk/web/tc.html',
    name: 'RS 7 Sportback',
    href: 'https://www.audi.com.hk/hk/web/tc/models/a7/rs-7-sportback-2021.html',
    icon: 'viteaodi',
    price: 146.48,
    switchVal: 1,
    tag: ['red', 'gray'],
    rate: 4.5,
    content:
      '奥迪RS7概念车是由一位来自奥地利的设计者设计出来的，该车的车身外观融合了奥迪旗下多款车型的风格。 其侧面车身以及车位的设计与奥迪R8的设计十分相似，而汽车门则采用了兰博基尼经典的剪刀门设计方式。 2013北美（底特律）国际车展于14日开幕，奥迪全新RS7在车展上正式亮相并发布。',
    videoUrl:
      'http://tbvideo.ixiaochuan.cn/zyvd/264/89/61/84ca-3e46-11ed-87e3-00163e0e67b8',
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b',
    data: '2021-12-xx',
    driveType: '4',
    engineLocation: '前置',
  },
  {
    id: 2,
    brand: 'BMW',
    engine: '4.4T 625马力 V8',
    manufacturer: 'BMW',
    manufacturerHref: 'https://www.bmw.com/en/index.html',
    name: 'BMW 8 Series',
    href: 'https://offers.bmwhk.com/the8/en/?utm_medium=website&utm_source=bmwhk_modelshowroom&utm_campaign=468_Jan2021&utm_content=launch',
    icon: 'vitebaoma',
    price: 196.8,
    switchVal: 0,
    tag: ['white', 'red'],
    rate: 4.5,
    content:
      '宝马M8（BMW M8)是宝马旗下的顶级跑车，采用M部门为其量身打造的4.4T V8双涡轮增压引擎，最大功率可达625马力，峰值扭矩750牛米。这台引擎可以让1.9吨的大家伙在3.2秒内完成0-100加速。M，在宝马车系中代表顶级性能版。',
    imageUrl: 'https://images.unsplash.com/photo-1630037937485-e2da57394d88',
    data: '2022-01-xx',
    driveType: '4',
    engineLocation: '前置',
  },
  {
    id: 3,
    brand: 'Audi',
    engine: '5.2L 620马力 V10',
    manufacturer: 'Audi Sport',
    manufacturerHref: 'https://www.audi.com.hk/hk/web/tc.html',
    name: 'R8 V10 performance',
    href: 'https://www.audi.com.hk/hk/web/tc/models/r8/r8-coupe-v10-performance-quattro.html',
    icon: 'viteaodi',
    price: 232.36,
    switchVal: 1,
    tag: ['blue'],
    rate: 5,
    content:
      '奥迪R8（Audi R8）是一款中置引擎双座跑车，由德国汽车制造商奥迪于2006年推出，极速达316km/h。奥迪R8是奥迪量产的首款中置引擎超级跑车，基于兰博基尼Gallardo的开发平台，融合了奥迪在多个运动赛事中取胜的经验，技术以及突破传统观念的完美设计。强劲的V8和V10发动机、全时四轮驱动系统和奥迪全铝车身空间框架结构，赋予了奥迪R8出众的动力性能，以及在赛道和公路上的卓越表现。',
    imageUrl: 'https://images.unsplash.com/photo-1614026480418-bd11fdb9fa06',
    data: '2021-12-xx',
    driveType: '4',
    engineLocation: '前置',
  },
  {
    id: 4,
  },
]

export const langPackages: LangPackages = {
  en: {
    [LangKey.Confirm]: 'Confirm',
    [LangKey.Column]: 'Column',
    [LangKey.ColumnName]: 'Column name',
    [LangKey.Hidden]: 'Hidden',
    [LangKey.Filter]: 'Filter',
    [LangKey.Refresh]: 'Refresh',
    [LangKey.Cancel]: 'Cancel',
    [LangKey.Hint]: 'Hint',
    [LangKey.OperateHint]: (s) => `Whether to carry out ${s} operate?`,
    [LangKey.More]: 'More',
    [LangKey.NoData]: 'NO DATA',
    [LangKey.Update]: 'Update',
    [LangKey.Edit]: 'Edit',
    [LangKey.PackUp]: 'Pack up',
    [LangKey.ReadFullText]: 'Read full text',
    [LangKey.InputContent]: 'Input content',
    [LangKey.Select]: 'Select',
    [LangKey.Open]: 'Open',
    [LangKey.Close]: 'Close',
    [LangKey.SelectOperateType]: 'Please select an operation type',
    [LangKey.SelectOperateData]:
      'Please select the data you want to manipulate',
    [LangKey.BatchOperate]: (s) => `Whether to batch ${s} the data?`,
  },
  'zh-cn': {
    [LangKey.Confirm]: '确认',
    [LangKey.Column]: '列',
    [LangKey.ColumnName]: '列名',
    [LangKey.Hidden]: '隐藏',
    [LangKey.Filter]: '过滤',
    [LangKey.Refresh]: '刷新',
    [LangKey.Cancel]: '取消',
    [LangKey.Hint]: '提示',
    [LangKey.OperateHint]: (s) => `是否要进行 ${s} 操作?`,
    [LangKey.More]: '更多',
    [LangKey.NoData]: '暂无数据',
    [LangKey.Update]: '修改',
    [LangKey.Edit]: '编辑',
    [LangKey.PackUp]: '收起',
    [LangKey.ReadFullText]: '展开阅读全文',
    [LangKey.InputContent]: '请输入内容',
    [LangKey.Select]: '请选择',
    [LangKey.Open]: '开启',
    [LangKey.Close]: '关闭',
    [LangKey.SelectOperateType]: '请选择操作类型',
    [LangKey.SelectOperateData]: '请选择要操作的数据',
    [LangKey.BatchOperate]: (s) => `是否要进行批量 ${s} 操作?`,
  },
}

export { btnConfig, header, lists }
