let header = [
  {
    label: "编号", //显示的标题
    minWidth: "60", //对应列的最小宽度
    sortable: true, //排序
    props: [
      {
        prop: "id",
      },
    ],
  },
  {
    label: "名称", //显示的名称
    overflowTooltip: true,
    minWidth: "60", //对应列的最小宽度
    props: [
      {
        prop: "name",
      },
    ],
  },
  {
    label: "slot（插槽）", //显示的标题
    props: [
      {
        type: "slot",
        slotName: "A",
      },
    ],
  },
  {
    label: "性别", //显示的标题
    props: [
      {
        prop: "gender",
        filter: [
          {
            key: 1,
            value: "公",
          },
          {
            key: 1,
            value: "母",
          },
        ], //过滤
      },
    ],
  },
  {
    label: "创建时间", //显示的标题
    props: [
      {
        prop: "createTime",
      },
    ],
    sortable: "custom", //排序
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
  },
  {
    label: "开关", //显示的标题
    overflowTooltip: false,
    props: [
      {
        prop: "switchVal",
        type: "switch",
        data: {
          // inactiveText: "关闭",
          // activeText: "开启",
        },
      },
    ],
  },
  {
    label: "标签", //显示的标题
    overflowTooltip: false,
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
  },
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
  },
  {
    label: "评分", //显示的标题
    props: [
      {
        type: "rate",
        prop: "rate",
        data: {
          allowHalf: true,
          showText: true,
          // colors: ['red', 'yellow', 'green']
          // showScore: true
        },
      },
    ],
  },
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
  },
]

let lists = [
  {
    id: 1,
    name: "蓝猫",
    gender: 1,
    createTime: "2020-12-01",
    price: "",
    switchVal: 1,
    tag: '可爱',
    rate: 4.5,
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
]

export { header, lists }
