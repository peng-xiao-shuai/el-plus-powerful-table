import type { PowerfulTableHeader } from '../types/powerful-table'
let header: PowerfulTableHeader[] = [
  {
    label: "编号", //显示的标题
    minWidth: "80px", //对应列的最小宽度
    sortable: true, //排序
    props: [
      {
        prop: "id",
      },
    ],
  },
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
  // {
  //   label: "slot（插槽）", //显示的标题
  //   props: [
  //     {
  //       type: "slot",
  //       data: {
  //         slotName: "A"
  //       },
  //     },
  //   ],
  // },
  {
    label: "性别", //显示的标题
    props: [
      {
        prop: "gender",
        // customFilterFun(row){
        //   return '公'
        // },
        filter: [
          {
            key: 1,
            value: "公",
          },
          {
            key: 2,
            value: "母",
          },
        ], //过滤
      }
    ],
  },
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
  },
  // {
  //   label: "视频", //显示的标题
  //   props: [
  //     {
  //       prop: "videoUrl",
  //       type: "video",
  //       data: {
  //         style: {
  //           width: "120px",
  //           height: "120px",
  //           borderRadius: "10px",
  //           border: "1px solid #ccc",
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    label: "开关", //显示的标题
    overflowTooltip: false,
    props: [
      {
        prop: "switchVal",
        type: "switch",
        data: {
          disabled: (e: any) => false,
          beforeFunction: function (row:any, val:any, old: any) {
            return true
          },
          inactiveText: "关闭",
          activeText: "开启",
        },
      },
    ],
  },
  {
    label: "图标", //显示的标题
    props: [
      {
        prop: "icon",
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
          color:(r: any)=>{
            return r == 1 ? '#409EFF' : '#F56C6C'
          },
        },
        filter: [
          { key: 1, value: "男" },
          { key: 2, value: "女" },
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
    props: [
      {
        type: "href",
        prop: "href",
        data: {
          text: 'aaa'
        }
      },
    ],
  },
  // {
  //   label: "内容", //显示的标题
  //   props: [
  //     {
  //       prop: "content",
  //       type: 'text',
  //       data: {
  //         develop: true,
  //         line: 3
  //       }
  //     },
  //   ],
  // },
  {
    label: "操作", //显示的标题
    width: 150,
    fixed: 'right',
    props: [
      {
        type: "btn",
        prop: "btn",
        data: [
          {
            tip: "编辑",
            type: "info",
            icon: "el-icon-edit-outline",
            text: "1",
            showBtn: false,
            emit: "update",
          },
          {
            tip: "编辑",
            type: "info",
            icon: "el-icon-edit-outline",
            text: "",
            showBtn: (e:any) => {
              return true
            },
            emit: "update",
          },
          {
            tip: "编辑",
            type: "info",
            icon: "el-icon-edit-outline",
            text: "uuu",
            showBtn: (e:any) => {
              return false
            },
            emit: "update",
          },
          {
            tip: "删除",
            type: "danger",
            text: "",
            icon: "el-icon-delete",
            emit: "remove",
          },
        ],
      },
    ],
  }
]

let lists = [
  {
    id: 1,
    name: "蓝猫",
    icon: 'el-icon-hot-water',
    gender: '1',
    createTime: null,
    price: "",
    switchVal: 0,
    tag: [1, 2, 3],
    rate: 4.5,
    content: '455454545444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    href: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
  {
    id: 2,
    name: "蓝猫",
    icon: 'el-icon-hot-water',
    gender: 2,
    createTime: null,
    price: "",
    switchVal: 1,
    tag: '1,2,3',
    rate: 4.5,
    content: '455454545444444444444444444444444444444444444444444444444444444444444444444444',
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
    content: '455454545444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
]

export { header, lists }
