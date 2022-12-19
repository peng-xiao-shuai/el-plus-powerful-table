import type { App, Plugin, InjectionKey } from 'vue';
import components from './components';
import PowerfulTable from './powerful-table';
import fComponents from './filter';
import BtnPlus from './btn-plus';
export { default as PTBtnPlus } from './btn-plus';
export { default as PowerfulTable } from './powerful-table';
export * from './filter';
export * from './components';
export const PowerfulTableSymbol = Symbol('powerful-table') as InjectionKey<import('../typings').InjectProps>
// 获取类型
const getType = <T>(target: T) => Object.prototype.toString.call(target).slice(8, -1)

// 深度克隆
export const deepClone = <T>(target: T) => {
  let result
  if (getType(target) ==="Object") {
      result = {} as T
  } else if (getType(target)==="Array") {
      result = [] as T
  } else result = target

  for (let i in target) {
    let item = target[i]
    if(getType(item) === "Object" || getType(item) === "Array"){
      result[i] = deepClone(item)
    }else result[i] = item
  }
  return result
}

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: import('../typings').InjectProps) => {
    components.forEach((c) => {
      app.use(c)
    })
    app.provide(PowerfulTableSymbol, options ? options : {})
    app.config.globalProperties.$deepClone = deepClone;
  }

  return install
}

export default {
    install: makeInstaller([...components, ...fComponents, BtnPlus, PowerfulTable])
}