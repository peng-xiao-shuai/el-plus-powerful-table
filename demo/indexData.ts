import type { PowerfulTableHeader, BtnConfig } from '../typings/powerful-table'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { markRaw } from 'vue';

let btnConfig: BtnConfig.Config = {
  // hidden: 'none',
  btnSlot: 'all',
  btnList: [{
    text: '新增',
    effect: 'add',
    showBtn: true,
    icon: markRaw(Plus),
  }, {
    text: '修改',
    operateType: 'single',
    effect: 'edit',
    type: 'primary',
    showBtn: () => false,
    icon: markRaw(Edit),
    // icon: Edit
  }, {
    text: '批量删除',
    operateType: 'batch',
    effect: 'remove',
    type: 'danger',
    icon: markRaw(Delete),
    // icon: Delete,
    showTip: true,
    // tipContent: '立即执行批量删除' 
  }]
}

let header: PowerfulTableHeader<Lists>[] = [
  {
    label: "编号", //显示的标题
    minWidth: "100px", //对应列的最小宽度
    headerAlign: 'center',
    filters: true,
    sortable: true, //排序
    props: {
        prop: "id",
        // data: {
        //   develop: false
        // }
    }
  },
  {
    label: "超链接", //显示的标题
    width: '200',
    headerSlotName: 'Link',
    property: {
      align: 'left'
    },
    props: [
      {
        type: "href",
        prop: "href",
        data: {
          text: (e: any) => e.name,
        }
      },
      {
        type: "href",
        prop: "href",
        data: {
          text: (e: any) => e.name,
        },
        render: (h, row, index) => {
          return h('b', {}, row.name)
        }
      },
    ],
  },
  {
    label: "名称/性别", //显示的名称
    overflowTooltip: true,
    headerAlign: 'left',
    filters: true,
    props: [
      {
        type: "href",
        prop: "name",
        data: {
          text: (row: Lists) => row.name
        }

      },
      {
        prop: "gender",
        // customFilterFun(row){
        //   return '公'
        // },
        filterItem: true,
        filtersType: 'select',
        filter: [{ key: 1, value: '公' }, { key: 2, value: '母' }, { key: 3, value: '未知' }],
        // filter: (row: any) => {
        //   return ({ 1: '公', 2: '母', 3: '未知' } as any)[row.gender]
        // }, //过滤
      }
    ],
  },
  {
    label: "slot（插槽）", //显示的标题
    filters: true,
    // hidden: true,
    props: [
      {
        prop: 'data',
        filtersType: 'date',
        type: "slot",
        slotName: "A"
      },
    ],
  },
  {
    label: "价格", //显示的标题
    isShowOrFilterColumn: 'filter',
    props: {
      prop: "price",
      type: "input",
      data: {
        slot: "prepend",
        symbol: "￥",
        style: { width: "100%" },
      },
    },
  },
  {
    label: "视频", //显示的标题
    width: 200,
    filters: true,
    props: {
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
  },
  {
    label: "开关", //显示的标题
    width: '200',
    overflowTooltip: false,
    filters: true,
    props: [
      {
        prop: "switchVal",
        type: "switch",
        data: {
          isConfirmTip: true,
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
          class: 'viteIcon',
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
    filters: true,
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
          componentProp: {
            src: 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF'
          }
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
          // showText: true,
          max: 6,
          colors: ['red', 'yellow', 'green'],
          //   // showScore: true
        },
      },
    ],
  },
  {
    label: "内容", //显示的标题
    filters: true,
    props: [
      {
        prop: "content",
        type: 'text',
        data: {
          develop: true,
          line: 2,
        }
      },
    ],
  },
  {
    label: "操作", //显示的标题
    width: 250,
    fixed: 'right',
    isShowOrFilterColumn: false,
    props: [
      {
        type: "btn",
        prop: "btn",
        data: [
          {
            tip: "编辑",
            type: "info",
            icon: markRaw(Edit),
            text: "编辑",
            // showBtn: false,
            // isTooltip: true,
            confirmTip: '正在进行修改操作，确认要修改？',
            isConfirmTip: true,
            params: {
              emit: "update",
            }
          },
          [{
            tip: "更多",
            isMore: true,
            type: "success",
            icon: markRaw(Edit),
          }, {
            tip: "编辑",
            type: "text",
            icon: markRaw(Edit),
            params: "update",
          },
          {
            tip: "删除",
            type: "text",
            isConfirmTip: true,
            icon: markRaw(Delete),
            params: "remove",
          }],
          {
            tip: "删除",
            type: "danger",
            icon: markRaw(Edit),
            showBtn: (e: any) => {
              return true
            },
            params: {
              emit: "remove",
            }
          },
        ],
      },
    ],
  }
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
  cd?: Lists[];
  data: Date
}
let lists: Lists[] = [
  {
    id: 111,
    name: "蓝猫",
    icon: 'vitezujian',
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
    data: new Date(),
    cd: [{
      id: 4,
      name: "蓝猫",
      icon: 'vitezujian',
      gender: 2,
      createTime: null,
      price: "",
      switchVal: 1,
      tag: [1, 2, 3],
      rate: 4,
      content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
      videoUrl:
        "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
      imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
      data: new Date(),
      cd: [{
        id: 41,
        name: "蓝猫",
        icon: 'vitezujian',
        gender: 2,
        createTime: null,
        price: "",
        switchVal: 1,
        tag: [1, 2, 3],
        rate: 4,
        content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
        videoUrl:
          "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
        imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
        data: new Date(),
        cd: [{
          id: 411,
          name: "蓝猫",
          icon: 'vitezujian',
          gender: 2,
          createTime: null,
          price: "",
          switchVal: 1,
          tag: [1, 2, 3],
          rate: 4,
          content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
          videoUrl:
            "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
          imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
          data: new Date(),
          cd: [{
            id: 2222,
            name: "蓝猫",
            icon: 'vitezujian',
            gender: 2,
            createTime: null,
            price: "",
            switchVal: 1,
            tag: [1, 2, 3],
            rate: 4,
            content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
            videoUrl:
              "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
            imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
            data: new Date()
          }]
        }, {
          id: 211,
          name: "蓝猫",
          icon: 'vitezujian',
          gender: 2,
          createTime: null,
          price: "",
          switchVal: 1,
          tag: [1, 2, 3],
          rate: 4,
          content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
          videoUrl:
            "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
          imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
          data: new Date(),
          cd: [{
            id: 22222,
            name: "蓝猫",
            icon: 'vitezujian',
            gender: 2,
            createTime: null,
            price: "",
            switchVal: 1,
            tag: [1, 2, 3],
            rate: 4,
            content: '22222444444444444444444444444444444444444444444444444444444444444444444444',
            videoUrl:
              "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
            imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
            data: new Date()
          }]
        }]
      }]
    }]
  },
  {
    id: 1,
    name: "蓝猫",
    icon: 'vitezujian',
    gender: 2,
    createTime: null,
    price: "",
    switchVal: 1,
    tag: '1,2',
    rate: 4.5,
    content: '3333444444444444444444444444444444444444444444444444444444444444444444444',
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    href: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
    data: new Date('2021/12/31')
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
    data: new Date('2021/12/31')
  },
]

export { btnConfig, header, lists }
