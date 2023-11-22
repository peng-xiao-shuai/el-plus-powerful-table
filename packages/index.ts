import components from './components'
import powerfulTable from './powerful-table'
import fComponents from './filter'
import BtnPlus from './btn-plus'
import { PowerfulTableSymbol } from './keys'
import type { _TYPE } from '@/index'
import type { App, Plugin } from 'vue'
export { default as PTBtnPlus } from './btn-plus'
export * from './powerful-table'
export * from './filter'
export * from './components'
// 获取类型
const getType = <T>(target: T) =>
  Object.prototype.toString.call(target).slice(8, -1)

// 深度克隆
export const deepClone = <T>(target: T) => {
  let result
  if (getType(target) === 'Object') {
    result = {} as T
  } else if (getType(target) === 'Array') {
    result = [] as T
  } else result = target

  for (const i in target) {
    const item = target[i]
    if (getType(item) === 'Object' || getType(item) === 'Array') {
      result[i] = deepClone(item)
    } else result[i] = item
  }
  return result
}

/**
 * @description 类型保护
 * @see https://www.tslang.cn/docs/handbook/advanced-types.html 搜索 “自定义类型保护”
 * @param {T} obj 值，它必须是联合类型
 * @param {(obj: T) => boolean} cb 回调函数，返回一个布尔值
 * @example
 * const a = [] | string
 * a.push() // 报错
 * if (isTypeProtect<typeof a, []>(a, (a) => Array.isArray(a))) {
 *   a.push() // 正常
 * }
 * @returns {boolean}
 */
export const isTypeProtect = <T, P extends T>(
  obj: T,
  cb: (obj: T) => boolean
): obj is P => cb(obj)

// 不同类型的data数据类型提示
export const setData = <T extends keyof _TYPE<L>, L = any>(
  data: _TYPE<L>[T]
): _TYPE<L>[T] => data

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: import('@/index').InjectProps) => {
    components.forEach((c) => {
      app.use(c)
    })
    app.provide(PowerfulTableSymbol, options ? options : {})
    app.config.globalProperties.$deepClone = deepClone
  }

  return install
}

export default {
  install: makeInstaller([
    ...components,
    ...fComponents,
    BtnPlus,
    powerfulTable,
  ]),
}
