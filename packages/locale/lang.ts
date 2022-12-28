import { inject } from 'vue'
import { configProviderContextKey } from 'element-plus'
import { PowerfulTableSymbol } from '../keys'
import LangPackages from './packages'
export { LangKey } from './packages'

export const t = <T = string>(key: string): T => {
  let lang = inject(configProviderContextKey)?.value?.locale?.name || 'en'

  Object.assign(LangPackages, inject(PowerfulTableSymbol)?.locale || {})

  if (!Object.keys(LangPackages).includes(lang)) lang = 'en'

  return (LangPackages[lang][key] || key) as T
}
