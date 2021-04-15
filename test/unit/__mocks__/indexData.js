export const header = [
  {
    label: "编号", //显示的标题
    minWidth: "60", //对应列的最小宽度
    sortable: true, //排序
    poprs: [
      {
        popr: "id",
      },
    ],
  },
  {
    label: "名称", //显示的名称
    overflowTooltip: true,
    minWidth: "60", //对应列的最小宽度
    poprs: [
      {
        popr: "name",
      },
    ],
  },
  {
    label: "slot（插槽）", //显示的标题
    poprs: [
      {
        type: "slot",
        slotName: "A",
      },
    ],
  },
  {
    label: "性别", //显示的标题
    poprs: [
      {
        popr: "gender",
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
    poprs: [
      {
        popr: "createTime",
      },
    ],
    sortable: "custom", //排序
  },
  {
    label: "价格", //显示的标题
    poprs: [
      {
        popr: "price",
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
    poprs: [
      {
        popr: "videoUrl",
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
    poprs: [
      {
        popr: "switchVal",
        type: "switch",
        data: {
          inactiveText: "关闭",
          activeText: "开启",
        },
      },
    ],
  },
  {
    label: "图片", //显示的标题
    poprs: [
      {
        type: "image",
        popr: "imageUrl",
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
    label: "操作", //显示的标题
    poprs: [
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

export const lists = [
  {
    id: 1,
    name: "蓝猫",
    gender: 1,
    createTime: "2020-12-01",
    price: "",
    switchVal: 1,
    videoUrl:
      "https://video.699pic.com/videos/38/43/68/b_NP9VbhF5xkJN1587384368_10s.mp4",
    imageUrl: "https://seopic.699pic.com/photo/50102/4339.jpg_wh1200.jpg",
  },
]
