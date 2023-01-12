import { defineComponent, inject } from 'vue'
import { filterFun } from './filter'
import type { App, PropType } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '../../../typings'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'

const Tags = defineComponent({
  name: 'PTTags',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<'tag'>>,
      default: () => ({}),
    },
  },
  emits: ['return-emit', 'component-emit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)
    const { REmit } = useREmit(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'tag'
    )

    /* ------ 标签string转array ------ */
    const tagToArray = (val: string | [], i: number) => {
      return typeof val !== 'string'
        ? [...val].splice(0, i)
        : val.split(',').splice(0, i)
    }

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
          {tagToArray(
            props.row[props.prop.prop],
            props.prop.data?.number || 3
          ).map((tag) => (
            <el-tag
              style={{
                marginRight: '10px',
                borderColor:
                  typeof props.prop.data?.color == 'function'
                    ? 'rgba(0,0,0,0)'
                    : 'auto',
                ...props.prop.data?.style,
              }}
              size={size}
              key={tag}
              type={''}
              color={
                (typeof props.prop.data?.color == 'function' &&
                  props.prop.data?.color(props.row, tag)) ||
                ''
              }
              onClick={(event: Event) => {
                event.stopPropagation()
                REmit('click', {
                  row: props.row,
                  index: props.index,
                  prop: props.prop.prop,
                  event,
                })
              }}
              onClose={(...arg: any) => REmit('close', ...arg)}
              {...isProperty(
                { row: props.row, index: props.index!, props: props.prop },
                props.prop.data?.property
              )}
            >
              {props.prop.filters
                ? typeof props.prop.filters == 'function'
                  ? props.prop.filters(props.row, props.index)
                  : filterFun(tag, props.prop.filters!)
                : tag}
            </el-tag>
          ))}
        </div>
      </>
    )
  },
})

Tags.install = (app: App) => {
  app.component(Tags.name, Tags)
}
export const PTTags = Tags as SFCWithInstall<typeof Tags>
export default Tags
