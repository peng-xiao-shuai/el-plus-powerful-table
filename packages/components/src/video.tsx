import { defineComponent, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  VideoDataType,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol } from '~/keys'

const Video = defineComponent({
  name: 'PTVideo',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, VideoDataType>>,
      default: () => ({}),
    },
  },
  emits: ['returnEmit'],
  setup(props) {
    const justifyFun = inject(JustifyFunSymbol)!

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
