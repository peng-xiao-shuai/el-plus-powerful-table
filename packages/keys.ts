import type { InjectionKey } from 'vue'

export const PowerfulTableSymbol = Symbol('powerful-table') as InjectionKey<
  import('@/index').InjectProps
>
export const JustifyFunSymbol = Symbol('justifyFun') as InjectionKey<
  (v: string) => string
>
export const SizeSymbol = Symbol('size') as InjectionKey<import('@/index').Size>
