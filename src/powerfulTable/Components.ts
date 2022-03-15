import type { App, Plugin } from 'vue';
import Button from './components/button';
import Image from './components/image';
import Tags from './components/tags';
import Video from './components/video';
import Rate from './components/rate';
import Link from './components/link';
import Input from './components/input';
import Icon from './components/icon';
import Filter from './components/filter';
import Switch from './components/switch';
import _PowerfulTable from "./powerful-table.vue"
import { SFCWithInstall } from '../../types/powerful-table';

const withInstall = <T>(component: T)  => {
  (component as T & Plugin).install = (app: App) => {
    app.component((component as any).name, component)
  }

  return component as SFCWithInstall<T>
}

export const PTButton = withInstall(Button)
export const PTImage = withInstall(Image)
export const PTTags = withInstall(Tags)
export const PTVideo = withInstall(Video)
export const PTRate = withInstall(Rate)
export const PTLink = withInstall(Link)
export const PTInput = withInstall(Input)
export const PTIcon = withInstall(Icon)
export const PTFilter = withInstall(Filter)
export const PTSwitch = withInstall(Switch)
export const PowerfulTable = withInstall(_PowerfulTable)

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
  PowerfulTable
] as Plugin[]