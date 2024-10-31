/*
 * 局部过滤hook
 * @Author: peng-xiao-shuai
 * @Date: 2021-09-22 16:31:33
 * @Last Modified by: peng-xiao-shuai
 * @Last Modified time: 2023-03-14 09:58:12
 */

import { deepClone } from '../index'
import type { PowerfulTableHeader, PowerfulTableHeaderProps } from '~/index'
import type {
  FilterComponents,
  PowerfulTableProps,
  StateData,
} from '../powerful-table/src/powerful-table-data'
export function useFilters<L>(
  state: StateData<L>,
  props: PowerfulTableProps<L>,
  filterComponents: FilterComponents
) {
  const treeProps = props.tree?.props!

  // 为list数据排序，使其存在树形数据的在前面
  let tableLists: (L & { [s: string]: any; _cdSort: number })[] = []
  /**
   * 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
   */
  const headerFilter = (
    value: (number | string)[],
    column: PowerfulTableHeader<L>,
    // 初始数据
    initList: any[] = deepClone(props.list)
  ) => {
    // 存在值则不在进行排序，优化性能 用于树形排序，目前树形排序存在问题，所有没什么作用
    if (!tableLists.length) {
      tableLists = deepClone(
        <PowerfulTableProps<L & { [s: string]: any; _cdSort: number }>>props
      ).list.sort((a, b) => {
        a._cdSort = a[treeProps?.children!] ? 1 : 0
        b._cdSort = b[treeProps?.children!] ? 1 : 0
        return b._cdSort - a._cdSort
      })
    }

    const filterList = initList

    if (!value || (Array.isArray(value) && !value.length)) {
      return props.list
    }

    const propObj = propObjs<L>(column)
    // 判断监听类型
    if (
      (propObj.filters && propObj.filtersType === 'select') ||
      propObj.type === 'switch'
    ) {
      recursionFilterFun<L>(
        treeProps,
        tableLists,
        (data: (typeof props.list)[number]): boolean => {
          // 类型断言
          const D = data as L & { [s: string]: any }
          const isShow = value.some((prop) => {
            switch (propObj.type) {
              // tag类型单独判断
              case 'tag': {
                const tagVal: string[] = (
                  typeof D[propObj.prop] == 'string'
                    ? D[propObj.prop].split(',')
                    : D[propObj.prop]
                )?.map((num: string | number) => String(num))
                return tagVal?.includes(String(prop))
              }
              default:
                return D[propObj.prop] == prop
            }
          })
          return isShow
        },
        filterList
      )
    } else if (propObj.filtersType === 'date') {
      const valueAs = value as string[]
      recursionFilterFun<L>(
        treeProps,
        tableLists,
        (data: (typeof props.list)[number]): boolean =>
          compare(
            (data as L & { [s: string]: any })[propObj.prop],
            valueAs[0],
            valueAs[1]
          ),
        filterList
      )
    } else {
      recursionFilterFun<L>(
        treeProps,
        tableLists,
        (data: (typeof props.list)[number]) =>
          String(
            (data as L & { [s: string]: any })[propObj.prop] || ''
          ).includes(String(value)),
        filterList
      )
    }
    return filterList
  }

  /**
   * 获取需要过滤的prop
   */
  const getPropObj = computed(
    () =>
      (column: PowerfulTableHeader): PowerfulTableHeaderProps<'text', L> => {
        return propObjs<L>(column)
      }
  )

  const handleHeaderFilterChange = (
    value: string | (number | string)[],
    column: PowerfulTableHeader<L>
  ) => {
    let filterList: any[] = []
    // item.state 是存在的不确定是否是vue的bug. vue文件 <script setup> 中使用 expose 没有问题，
    // 但是在 tsx 中使用 expose 组件ref可以获取到 expose 暴露的数据，但是类型上不存在 expose 暴露的数据
    const componentData = filterComponents.value?.filter(
      (item: any) => item.state.value.length
    )

    if (componentData?.length) {
      // 自定义过滤逻辑
      if (typeof getPropObj.value(column).customFilter === 'function') {
        new Promise<any[]>((resolve) => {
          getPropObj.value(column).customFilter!(value, column, resolve)
        }).then((res) => {
          state.tableLists = res
        })
        return
      }

      componentData.forEach((item: any) => {
        filterList = headerFilter(item.state.value, item.header, filterList)
        state.tableLists = filterList
      })
    } else {
      state.tableLists = props.list
    }
  }

  return {
    handleHeaderFilterChange,
    getPropObj,
  }
}

/**
 * 递归过滤
 * @param {object} propValue el-table treeProps属性
 * @param {array} data tableLists 数据集
 * @param {function} callback 自定义过滤逻辑
 * @param {array} lists 过滤接受的数组
 * @date
 */
const recursionFilterFun = <L>(
  propValue: { children: string; hasChildren: string },
  data: L[],
  callback: (data: L) => boolean,
  lists: any[]
) => {
  if (data && data.length) {
    data.forEach((item: L) => {
      const D = deepClone(item) as { [s: string]: any }
      if (D[propValue.children] && D[propValue.children].length) {
        // 清除子集，避免添加的数据中不符合过滤的子集仍然存在
        D[propValue.children] = []
        isPush(callback(item), lists, D)

        recursionFilterFun<L>(
          propValue,
          (item as L & { [s: string]: any })[propValue.children],
          callback,
          callback(item) ? lists[lists.length - 1][propValue.children] : lists
        )
      } else {
        isPush(callback(item), lists, D)
      }
    })
  }
}

// 判断是否可以添加数据，如果list中存在一样的 data 数据则不添加
// TODO 不支持树形表格，多个表头参数查询，非树形表格没问题
const isPush = <D>(bool: boolean, list: any[], data: D) => {
  if (bool) {
    if (list.length) {
      const listStr = list.map((item) => JSON.stringify(item))

      listStr.some((item) => {
        return item
          .replace(/,"_cdSort":\d/, '')
          .includes(JSON.stringify(data).replace(/,"_cdSort":\d/, ''))
      })
        ? ''
        : list.push(data)
    } else {
      list.push(data)
    }
  }
}

const propObjs = <L>(
  column: PowerfulTableHeader
): PowerfulTableHeaderProps<'text', L> => {
  // 获取过滤项
  let propObj: PowerfulTableHeaderProps<'text', L> = { prop: '' }
  // 判断是否数组
  if (!Array.isArray(column.props)) {
    propObj = column.props
    return propObj
  }
  // 是数组的情况下 首先判断单元格prop的数量
  if (column.props.length === 1) {
    propObj = column.props[0]
  } else if (column.props.length > 1) {
    // 如果数量在两个以上，则需要用户使用(filterItem: true)指定过滤项，未指定则取第一个
    const queryFilterItem = column.props.find((item) => item.filterItem)
    // 如果设置了一个或多个过滤项则取过滤后的第一个，如果没设置则取props第一个prop
    propObj = queryFilterItem ? queryFilterItem : column.props[0]
  }
  return propObj
}

/**
 * 比较指定时间是否在指定时间段内
 * @param value 目标时间 可被new Date()解析
 * @param begin 开始时间 可被new Date()解析
 * @param end 结束时间 可被new Date()解析
 * @returns boolean
 */
const compare = (value: string, begin: string, end: string): boolean => {
  const valueData = new Date(value)
  const beginData = new Date(begin)
  const endData = new Date(end)
  if (valueData >= beginData && valueData <= endData) {
    return true
  }
  return false
}
