export {}

declare module 'vue' {
  export interface GlobalComponents {
    PTImage: typeof import('el-plus-powerful-table')['PTImage']
    PTButton: typeof import('el-plus-powerful-table')['PTButton']
    PTTags: typeof import('el-plus-powerful-table')['PTTags']
    PTText: typeof import('el-plus-powerful-table')['PTText']
    PTSwitch: typeof import('el-plus-powerful-table')['PTSwitch']
    PTVideo: typeof import('el-plus-powerful-table')['PTVideo']
    PTRate: typeof import('el-plus-powerful-table')['PTRate']
    PTLink: typeof import('el-plus-powerful-table')['PTLink']
    PTInput: typeof import('el-plus-powerful-table')['PTInput']
    PTIcon: typeof import('el-plus-powerful-table')['PTIcon']
    PTFilter: typeof import('el-plus-powerful-table')['PTFilter']
    PTRenderJsx: typeof import('el-plus-powerful-table')['PTRenderJsx']
    PTBtnPlus: typeof import('el-plus-powerful-table')['PTBtnPlus']
    PTFDatePicker: typeof import('el-plus-powerful-table')['PTFDatePicker']
    PTFInput: typeof import('el-plus-powerful-table')['PTFInput']
    PTFSelect: typeof import('el-plus-powerful-table')['PTFSelect']
    PowerfulTable: typeof import('el-plus-powerful-table')['PowerfulTable']
  }
}
