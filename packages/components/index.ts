import type { Plugin } from 'vue';
import { PTButton } from './src/button';
import { PTImage } from './src/image';
import { PTTags } from './src/tags';
import { PTVideo } from './src/video';
import { PTRate } from './src/rate';
import { PTLink } from './src/link';
import { PTInput } from './src/input';
import { PTIcon } from './src/icon';
import { PTFilter } from './src/filter';
import { PTSwitch } from './src/switch';
import { PTRenderJsx } from './src/RenderJsx';

export * from './src/button';
export * from './src/image';
export * from './src/tags';
export * from './src/video';
export * from './src/rate';
export * from './src/link';
export * from './src/input';
export * from './src/icon';
export * from './src/filter';
export * from './src/switch';
export * from './src/RenderJsx';

export default [
  PTButton,
  PTImage,
  PTTags,
  PTVideo,
  PTRate,
  PTLink,
  PTInput,
  PTIcon,
  PTSwitch,
  PTFilter,
  PTRenderJsx
] as Plugin[]