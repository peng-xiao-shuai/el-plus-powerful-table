declare module 'vue' {
  export interface GlobalComponents {
    PTImage: typeof import("../src/powerfulTable/Components")['PTImage']
    PTButton: typeof import('../src/powerfulTable/Components')['PTButton'],
    PTTags: typeof import('../src/powerfulTable/Components')['PTTags'],
    PTVideo: typeof import('../src/powerfulTable/Components')['PTVideo'],
    PTRate: typeof import('../src/powerfulTable/Components')['PTRate'],
    PTLink: typeof import('../src/powerfulTable/Components')['PTLink'],
    PTInput: typeof import('../src/powerfulTable/Components')['PTInput'],
    PTIcon: typeof import('../src/powerfulTable/Components')['PTIcon'],
    PTFilter: typeof import('../src/powerfulTable/Components')['PTFilter'],
    PTSwitch: typeof import('../src/powerfulTable/Components')['PTSwitch'],
    PowerfulTable: typeof import('../src/powerfulTable/Components')['PowerfulTable']
  }
}

export {}