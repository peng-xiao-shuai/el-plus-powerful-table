import { defineComponent } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'

const Video = defineComponent({
  name: 'PTVideo',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'video'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'video'
    )

    return () => (
      <>
        <div style={props.prop.data?.style || {}}>
          <video
            style="width:100%;height: 100%"
            src={props.row[props.prop.prop]}
            loop={false}
            class="avatar video-avatar"
            controls={true}
            onPlay={(event: Event) => {
              REmit('play', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                event,
              })
            }}
            onPause={(event: Event) => {
              REmit('pause', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                event,
              })
            }}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              props.prop.data?.property
            )}
          />
        </div>
      </>
    )
  },
})

Video.install = (app: App) => {
  app.component(Video.name, Video)
}
export const PTVideo = Video as SFCWithInstall<typeof Video>
export default Video
