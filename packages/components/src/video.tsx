import type { App } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SetDataType,
} from '~/index'
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
      type: Object as PropType<PowerfulTableHeaderProps>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const data = props.prop.data as SetDataType<'video'>
    const { REmit, event } = useREmit<'video'>(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'video',
      {
        row: props.row,
        index: props.index!,
        props: props.prop,
      }
    )

    return () => (
      <>
        <div style={data?.style || {}}>
          <video
            style="width:100%;height: 100%"
            src={props.row[props.prop.prop]}
            loop={false}
            class="avatar video-avatar"
            controls={true}
            onPlay={(evt: Event) => {
              REmit('play', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                evt,
              })
              event('play', evt)
            }}
            onPause={(evt: Event) => {
              REmit('pause', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                evt,
              })
              event('pause', evt)
            }}
            {...isProperty(
              { row: props.row, index: props.index!, props: props.prop },
              data?.property
            )}
          />
        </div>
      </>
    )
  },
})

Video.install = (app: App) => {
  app.component(Video.name!, Video)
}
export const PTVideo = Video as SFCWithInstall<typeof Video>
export default Video
