import type { App, Plugin } from 'vue';
import FDatePicker from './src/FDatePicker';
import FInput from './src/FInput'
import FSelect from './src/FSelect';
import { withInst } from '$u/withInst';

export const PTFDatePicker = withInst(FDatePicker)
export const PTFInput = withInst(FInput)
export const PTFSelect = withInst(FSelect)

export default [
  PTFDatePicker,
  PTFInput,
  PTFSelect
] as Plugin[]