import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

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
    const justifyFun = inject(JustifyFunSymbol)!
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'video'
    )

    return () => (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: justifyFun(props.aligning),
          }}
        >
          <span style={{ marginRight: props.prop.text ? '10px' : '0px' }}>
            {props.prop.text || ''}
          </span>
          <div style={props.prop.data?.style || {}}>
            <video
              style="width:100%;height: 100%"
              src={props.row[props.prop.prop]}
              poster={
                typeof props.prop.data?.poster == 'function'
                  ? props.prop.data?.poster(props.row, props.index)
                  : props.prop.data?.poster || ''
              }
              loop={props.prop.data?.loop || false}
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
              {...props.prop.data?.property}
            />
          </div>
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
