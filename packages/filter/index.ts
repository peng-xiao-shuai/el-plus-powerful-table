import type { Plugin } from 'vue';
import { PTFDatePicker } from './src/FDatePicker';
import { PTFInput } from './src/FInput'
import { PTFSelect } from './src/FSelect';

export * from './src/FDatePicker';
export * from './src/FInput'
export * from './src/FSelect';

export default [
  PTFDatePicker,
  PTFInput,
  PTFSelect
] as Plugin[]