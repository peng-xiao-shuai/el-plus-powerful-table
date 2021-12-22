import type { PowerfulTableHeader } from '../types/powerful-table'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'

let btnConfig = {
  // hidden: 'none',
  btnList: [{
    tip: '新增',
    auth: '',
    operateType: true,
    effect: 'add',
    type: '',
    // icon: Plus
  }, {
    tip: '修改',
    auth: '',
    operateType: 'single',
    effect: 'edit',
    type: 'primary',
    // icon: Edit
  }, {
    tip: '批量删除',
    auth: '',
    operateType: 'batch',
    effect: 'remove',
    type: 'danger',
    // icon: Delete,
    showTip: true,
    // tipContent: '立即执行批量删除' 
  }]
}

let header: PowerfulTableHeader<Lists>[] = [
  // {
  //   label: "编号", //显示的标题
  //   minWidth: "80px", //对应列的最小宽度
  //   sortable: true, //排序
  //   props: [
  //     {
  //       prop: "id",
  //       // data: {
  //       //   develop: false
  //       // }
  //     },
  //   ],
  // },
  // {
  //   label: "名称", //显示的名称
  //   overflowTooltip: true,
  //   minWidth: "60", //对应列的最小宽度
  //   props: [
  //     {
  //       prop: "name",
  //     },
  //   ],
  // },
  {
    label: "slot（插槽）", //显示的标题
    isShowOrFilterColumn: false,
    // hidden: true,
    props: [
      {
        prop: '',
        type: "slot",
        slotName: "A"
      },
    ],
  },
  {
    label: "性别", //显示的标题
    isShowOrFilterColumn: 'show',
    props: [
      {
        prop: "gender",
        // customFilterFun(row){
        //   return '公'
        // },
        filter: [{ key: 1, value: '公' }, { key: 2, value: '母' }, { key: 3, value: '未知' }],
        // filter: (row: any) => {
        //   return ({ 1: '公', 2: '母', 3: '未知' } as any)[row.gender]
        // }, //过滤
      }
    ],
  },
  {
    label: "价格", //显示的标题
    isShowOrFilterColumn: 'filter',
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
  },
  {
    label: "视频", //显示的标题
    width: 200,
    props: [
      {
        prop: "videoUrl",
        type: "video",
        text: '1',
        data: {
          loop: true,
          poster: (e: any) => e.imageUrl,
          style: {
            width: "100%",
            height: "80px",
            borderRadius: "10px",
            overflow: 'hidden',
            border: "1px solid #ccc",
          }
        },
      },
    ],
  },
  {
    label: "开关", //显示的标题
    overflowTooltip: false,
    props: [
      {
        prop: "switchVal",
        type: "switch",
        data: {
          disabled: (e: any) => false,
          beforeFunction: function (row: any, val: any, old: any) {
            return true
          },
          inactiveText: "关闭",
          activeText: "开启",
          inactiveValue: "0",
          activeValue: "1",
        },
      },
    ],
  },
  {
    label: "图标", //显示的标题
    headerAlign: 'center',
    props: [
      {
        prop: "icon",
        filterItem: true,
        type: "iconfont",
        text: '图标：',
        data: {
          class: 'aaa',
          style: {
            fontSize: '20px'
          }
        },
      },
    ],
  },
  {
    label: "标签(只显示两个)", //显示的标题
    width: 200,
    overflowTooltip: false,
    props: [
      {
        prop: "tag",
        type: "tag",
        data: {
          effect: 'dark',
          number: 2,
          type: 'success',
          color: (r: any, tag: string | number) => {
            return tag == 1 ? '#409EFF' : '#F56C6C'
          },
        },
        filter: [
          { key: 1, value: "男" },
          { key: 2, value: "女" },
          { key: 3, value: "未知" },
        ],
        reserve: '<i><b>VNode</b></i>'
      },
    ],
  },
  {
    label: "图片", //显示的标题
    props: [
      {
        type: "image",
        prop: "imageUrl",
        text: '图片：',
        data: {
          style: {
            width: '40px',
            height: '40px'
          },
          lazy: true,
          preview: true,
        },
      },
    ],
  },
  {
    label: "评分", //显示的标题
    width: '200',
    props: [
      {
        type: "rate",
        prop: "rate",
        data: {
          // allowHalf: true,
          showText: true,
          max: 6,
          colors: ['red', 'yellow', 'green'],
          //   // showScore: true
        },
      },
    ],
  },
  {
    label: "超链接", //显示的标题
    width: '200',
    headerSlotName: 'Link',
    props: [
      {
        type: "href",
        prop: "href",
        data: {
          text: (e: any) => e.name,
        },
        render: (h, row, index) => {
          return h('b', {}, row.gender)
        }
      },
    ],
  },
  {
    label: "内容", //显示的标题
    props: [
      {
        prop: "content",
        type: 'text',
        data: {
          develop: true,
          line: 2
        }
      },
    ],
  },
  // {
  //   label: "操作", //显示的标题
  //   width: 150,
  //   fixed: 'right',
  //   props: [
  //     {
  //       type: "btn",
  //       prop: "btn",
  //       data: [
  //         {
  //           tip: "编辑",
  //           type: "info",
  //           // icon: Edit,
  //           text: "1",
  //           showBtn: false,
  //           emit: "update",
  //         },
  //         {
  //           tip: "编辑",
  //           type: "info",
  //           // icon: Edit,
  //           showBtn: (e: any) => {
  //             return true
  //           },
  //           emit: "update",
  //         },
  //         {
  //           tip: "编辑",
  //           type: "info",
  //           // icon: Edit,
  //           text: "",
  //           emit: "update",
  //         },
  //         {
  //           tip: "删除",
  //           type: "danger",
  //           text: "",
  //           // icon: Delete,
  //           emit: "remove",
  //         },
  //       ],
  //     },
  //   ],
  // }
]

interface Lists {
  id: number;
  name: string;
  icon: string;
  gender: string | number;
  createTime: null | string;
  price: string | number;
  switchVal: number;
  tag: (number | string)[] | string;
  rate: number;
  content: string;
  videoUrl: string;
  imageUrl: string;
  href?: string;
  children?: Lists[]
}
let lists: Lists[] = [
  {
    id: 2,
    name: "蓝猫",
    icon: 'el-icon-hot-water',
    gender: 1,
    createTime: null,
    price: "",
    switchVal: 0,
    tag: [1, 3, 3],
    rate: 4.5,
    content: '11111444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    href: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    children: [{
      id: 4,
      name: "蓝猫",
      icon: 'el-icon-hot-water',
      gender: 4,
      createTime: null,
      price: "",
      switchVal: 1,
      tag: [1, 2, 3],
      rate: 4,
      content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
      videoUrl:
        "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
      imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    }]
  },
  {
    id: 1,
    name: "蓝猫",
    icon: 'el-icon-hot-water',
    gender: 2,
    createTime: null,
    price: "",
    switchVal: 1,
    tag: '1,2,3',
    rate: 4.5,
    content: '3333444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    href: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
  {
    id: 3,
    name: "蓝猫",
    icon: 'el-icon-hot-water',
    gender: 3,
    createTime: null,
    price: "",
    switchVal: 1,
    tag: [1, 2, 3],
    rate: 4,
    content: '44444444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
]

export { btnConfig, header, lists }
