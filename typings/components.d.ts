declare module 'vue' {
  export interface GlobalComponents {
    PTImage: typeof import("../packages/index")['PTImage']
    PTButton: typeof import('../packages/index')['PTButton'],
    PTTags: typeof import('../packages/index')['PTTags'],
    PTText: typeof import('../packages/index')['PTText'],
    PTSwitch: typeof import('../packages/index')['PTSwitch'],
    PTVideo: typeof import('../packages/index')['PTVideo'],
    PTRate: typeof import('../packages/index')['PTRate'],
    PTLink: typeof import('../packages/index')['PTLink'],
    PTInput: typeof import('../packages/index')['PTInput'],
    PTIcon: typeof import('../packages/index')['PTIcon'],
    PTFilter: typeof import('../packages/index')['PTFilter'],
    PTRenderJsx: typeof import('../packages/index')['PTRenderJsx'],
    PTBtnPlus: typeof import('../packages/index')['PTBtnPlus'],
    PTFDatePicker: typeof import('../packages/index')['PTFDatePicker'],
    PTFInput: typeof import('../packages/index')['PTFInput'],
    PTFSelect: typeof import('../packages/index')['PTFSelect'],
    PowerfulTable: typeof import('../packages/index')['PowerfulTable'],
  }
}

export {}