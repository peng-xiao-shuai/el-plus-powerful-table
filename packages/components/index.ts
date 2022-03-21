import type { Plugin } from 'vue';
import Button from '../../packages/components/button';
import Image from '../../packages/components/image';
import Tags from '../../packages/components/tags';
import Video from '../../packages/components/video';
import Rate from '../../packages/components/rate';
import Link from '../../packages/components/link';
import Input from '../../packages/components/input';
import Icon from '../../packages/components/icon';
import Filter from '../../packages/components/filter';
import Switch from '../../packages/components/switch';
import { withInst } from '$u/withInst';

export const PTButton = withInst(Button)
export const PTImage = withInst(Image)
export const PTTags = withInst(Tags)
export const PTVideo = withInst(Video)
export const PTRate = withInst(Rate)
export const PTLink = withInst(Link)
export const PTInput = withInst(Input)
export const PTIcon = withInst(Icon)
export const PTFilter = withInst(Filter)
export const PTSwitch = withInst(Switch)

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
] as Plugin[]