import { PTFDatePicker } from './src/FDatePicker'
import { PTFInput } from './src/FInput'
import { PTFSelect } from './src/FSelect'

export { default as FDatePicker } from './src/FDatePicker'
export { default as FInput } from './src/FInput'
export { default as FSelect } from './src/FSelect'

export default [PTFDatePicker, PTFInput, PTFSelect] as import('vue').Plugin[]
