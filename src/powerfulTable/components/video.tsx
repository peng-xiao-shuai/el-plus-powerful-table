import { defineComponent, PropType, inject } from "vue";
import type { PowerfulTableHeaderProps, VideoDataType } from '../../../types/powerful-table'
import { powerfulTableComponentProp } from '../powerful-table'

export default defineComponent({
  props: {
   ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, VideoDataType>>,
      default: () => {}
    }
  },
  setup(props) {
    const justifyFun = inject('justifyFun') as Function
    
    return () => (
      <>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.aligning)}}>
          <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
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
      </>
    )
  }
})