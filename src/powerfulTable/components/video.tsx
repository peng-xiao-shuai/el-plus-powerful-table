import { defineComponent, PropType, inject } from "vue";
import type { PowerfulTableHeaderProps, VideoDataType } from '../../../types/powerful-table'

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<VideoDataType>>,
      default: () => {}
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  setup(props) {
    const justifyFun = inject('justifyFun') as Function
    
    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{margin: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>
        <div style={props.prop.data?.style || {}}>
          <video
            style="width:100%;height: 100%"
            src={props.row[props.prop.prop]}
            poster={typeof props.prop.data?.poster == 'function' ? props.prop.data?.poster(props.row, props.index) : (props.prop.data?.poster || '')}
            loop={props.prop.data?.loop || false}
            class="avatar video-avatar"
            controls={true}
          />
        </div>
      </div>
    )
  }
})