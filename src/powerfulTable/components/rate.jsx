import { defineComponent, PropType, inject } from "vue";

export default defineComponent({
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    index: Number,
    prop: {
      type: Object,
      default: () => {}
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject('justifyFun') 
    const size = inject('size') 
    const locale = inject('ElLocaleInjection').lang.value

    return () => (
      <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: justifyFun(props.align)}}>
        <span style={{marginRight: props.prop.text ? '10px' : '0px'}}>
          { props.prop.text || "" }
        </span>

        <el-rate
          size={size}
          v-model={props.row[props.prop.prop]}
          colors={(props.prop.data && props.prop.data.colors) || ['#F7BA2A', '#F7BA2A', '#F7BA2A']}
          max={(props.prop.data && props.prop.data.max) || 5}
          disabled={true}
          style={(props.prop.data && props.prop.data.style) || {}}
          allow-half={(props.prop.data && props.prop.data.allowHalf) || false}
          icon-classes={(props.prop.data && props.prop.data.iconClass) || ['el-icon-star-on','el-icon-star-on','el-icon-star-on']}
          show-text={(props.prop.data && props.prop.data.showText) || false}
          show-score={(props.prop.data && props.prop.data.showScore) || false}
          texts={(props.prop.data && props.prop.data.texts) || (locale == 'zh-cn' ? ['极差', '失望', '一般', '满意', '惊喜'] : (props.prop.data && props.prop.data.texts))}
        />
      </div>
    )
  }
})