import { defineComponent, getCurrentInstance, inject } from 'vue'
import type { App, PropType } from 'vue'
import type {
  PowerfulTableHeaderProps,
  SFCWithInstall,
  SwitchDataType,
} from '../../../typings'
import { powerfulTableComponentProp } from '~/powerful-table/src/powerful-table-data'
import { JustifyFunSymbol, SizeSymbol } from '~/keys'
import { LangKey, t } from '~/locale/lang'

const Switch = defineComponent({
  name: 'PTSwitch',
  props: {
    ...powerfulTableComponentProp,
    prop: {
      type: Object as PropType<PowerfulTableHeaderProps<any, SwitchDataType>>,
      default: () => ({}),
    },
  },
  emits: ['returnEmit'],
  setup(props, { emit }) {
    const justifyFun = inject(JustifyFunSymbol)!
    const size = inject(SizeSymbol)

    const { proxy } = getCurrentInstance() as any
    /* ------ 开关回调 ------ */
    const switchChange = <L,>(
      row: L,
      prop: keyof L,
      val: string | number = 1,
      val2: string | number = 0,
      beforeFunction:
        | ((row: L, prop: L[keyof L], value: string | number) => boolean)
        | undefined
    ) => {
      const value = row[prop] == val ? val2 : val
      if (
        typeof beforeFunction == 'function' &&
        !beforeFunction(row, row[prop], value)
      ) {
        row[prop] = value as L[keyof L]
        return false
      }
      if (props.prop.data?.isConfirmTip) {
        proxy
          .$confirm(
            props.prop.data?.confirmTip
              ? props.prop.data?.confirmTip
              : t<(s: any) => string>(LangKey.OperateHint)(t(LangKey.Update)),
            t(LangKey.Hint),
            {
              confirmButtonText: t(LangKey.Confirm),
              cancelButtonText: t(LangKey.Cancel),
              type: 'warning',
            }
          )
          .then(() => {
            emit('returnEmit', 'switchChange', row)
          })
          .catch(() => {
            row[prop] = value as L[keyof L]
          })
      } else {
        emit('returnEmit', 'switchChange', row)
      }
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
          <el-switch
            size={size}
            style={props.prop.data?.style || {}}
            inactive-text={props.prop.data?.inactiveText || ''}
            active-text={props.prop.data?.activeText || ''}
            v-model={props.row[props.prop.prop]}
            disabled={
              typeof props.prop.data?.disabled === 'function'
                ? props.prop.data?.disabled(props.row)
                : props.prop.data?.disabled || false
            }
            active-color={props.prop.data?.activeColor}
            inactive-color={props.prop.data?.inactiveColor}
            active-value={
              props.prop.data?.activeValue || props.prop.data?.activeValue === 0
                ? props.prop.data?.activeValue
                : 1
            }
            inactive-value={props.prop.data?.inactiveValue || 0}
            onClick={(e: Event) => {
              e.stopPropagation()
              if (
                typeof props.prop.data?.disabled === 'function'
                  ? props.prop.data?.disabled(props.row)
                  : props.prop.data?.disabled || false
              )
                return
              switchChange<typeof props.row>(
                props.row,
                props.prop.prop,
                props.prop.data?.activeValue,
                props.prop.data?.inactiveValue,
                props.prop.data?.beforeFunction
              )
            }}
            {...props.prop.data?.property}
          />
        </div>
      </>
    )
  },
})

Switch.install = (app: App) => {
  app.component(Switch.name, Switch)
}
export const PTSwitch = Switch as SFCWithInstall<typeof Switch>
export default Switch
