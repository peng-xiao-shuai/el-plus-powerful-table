import { inject } from 'vue'
import { useGlobalConfig } from 'element-plus/es'
import { PowerfulTableSymbol } from '../keys'
import LangPackages from './packages'
export { LangKey } from './packages'

export const t = <T = string>(key: string): T => {
  let lang = useGlobalConfig()?.value?.locale?.name || 'en'

  Object.assign(LangPackages, inject(PowerfulTableSymbol)?.locale || {})

  if (!Object.keys(LangPackages).includes(lang)) lang = 'en'

  return (LangPackages[lang][key] || key) as T
}
