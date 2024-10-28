import { ElTag } from 'element-plus'
import { filterFun } from './filter'
import type { App } from 'vue'
import type { PowerfulTableHeaderProps, SFCWithInstall } from '@/index'
import {
  isProperty,
  powerfulTableComponentProp,
  useREmit,
} from '~/powerful-table/src/powerful-table-data'
import { SizeSymbol } from '~/keys'

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
    const size = inject(SizeSymbol)
    const { REmit, event } = useREmit<'tag'>(
      emit as (event: 'component-emit', ...args: any[]) => void,
      'tag',
      {
        row: props.row,
        index: props.index!,
        props: props.prop,
      }
    )

    /* ------ 标签string转array ------ */
    const tagToArray = (val: string | [], i: number) => {
      return typeof val !== 'string'
        ? [...val].splice(0, i)
        : val.split(',').splice(0, i)
    }

    return () => (
      <>
        {tagToArray(
          props.row[props.prop.prop],
          props.prop.data?.number || 3
        ).map((tag) => (
          <ElTag
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
            type={'primary'}
            color={
              (typeof props.prop.data?.color == 'function' &&
                props.prop.data?.color(props.row, tag)) ||
              ''
            }
            onClick={(evt: Event) => {
              evt.stopPropagation()
              REmit('click', {
                row: props.row,
                index: props.index,
                prop: props.prop.prop,
                evt,
              })
              event('click', evt)
            }}
            onClose={(...arg: any) => {
              REmit('close', ...arg)
              event('close', ...arg)
            }}
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
          </ElTag>
        ))}
      </>
    )
  },
})

Tags.install = (app: App) => {
  app.component(Tags.name!, Tags)
}
export const PTTags = Tags as SFCWithInstall<typeof Tags>
export default Tags
