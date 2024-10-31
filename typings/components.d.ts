declare module 'vue' {
  export interface GlobalComponents {
    PTImage: typeof import('../index')['PTImage']
    PTButton: typeof import('../index')['PTButton']
    PTTags: typeof import('../index')['PTTags']
    PTText: typeof import('../index')['PTText']
    PTSwitch: typeof import('../index')['PTSwitch']
    PTVideo: typeof import('../index')['PTVideo']
    PTRate: typeof import('../index')['PTRate']
    PTLink: typeof import('../index')['PTLink']
    PTInput: typeof import('../index')['PTInput']
    PTIcon: typeof import('../index')['PTIcon']
    PTFilter: typeof import('../index')['PTFilter']
    PTRenderJsx: typeof import('../index')['PTRenderJsx']
    PTBtnPlus: typeof import('../index')['PTBtnPlus']
    PTFDatePicker: typeof import('../index')['PTFDatePicker']
    PTFInput: typeof import('../index')['PTFInput']
    PTFSelect: typeof import('../index')['PTFSelect']
    PowerfulTable: typeof import('../index')['PowerfulTable']
  }
}

export {}
