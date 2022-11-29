/*
 * 局部过滤hook
 * @Author: chenle 
 * @Date: 2021-09-22 16:31:33 
 * @Last Modified by: chenle
 * @Last Modified time: 2022-11-28 16:39:11
 */

import type {
  PowerfulTableHeader,
  PowerfulTableHeaderProps,
} from "../../typings";
import { computed } from "vue";
export function useFilters(state: any, props: any) {
  /**
     * 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
     */
  const headerFilterChange = (
    value: number | string | (number | string)[],
    column: PowerfulTableHeader
  ) => {
    // console.log(value, column);
    const tableLists = props.list;

    if (!value || (value instanceof Array && !value.length)) {
      state.tableLists = props.list;
      console.log(state.tableLists);
      return false;
    }

    let propObj: PowerfulTableHeaderProps<any> = propObjs(column);

    // 判断监听类型
    if (
      propObj.filter ||
      propObj.filtersType === "select" ||
      propObj.type === "switch"
    ) {
      state.tableLists = tableLists.filter((item: any) => {
        let isShow = (value as (number | string)[]).some((prop) => {
          switch (propObj.type) {
            // tag类型单独判断
            case "tag":
              const tagVal: string[] = (
                typeof item[propObj.prop] == "string"
                  ? item[propObj.prop].split(",")
                  : item[propObj.prop]
              ).map((num: string | number) => String(num));
              return tagVal.indexOf(String(prop)) != -1;
            default:
              return item[propObj.prop] == prop;
          }
        });
        return isShow;
      });
      // TODO 暂时无法并列过滤数据
      // state.tableLists = [...state.tableLists, ...tableData];
    } else if (propObj.filtersType === "date") {
      const valueAs = value as any[];
      state.tableLists = tableLists.filter((item: typeof props.list[0]) => {
        return compare(item[propObj.prop], valueAs[0], valueAs[1]);
      });
    } else {
      state.tableLists = tableLists.filter((item: typeof props.list[0]) => {
        return (
          item[propObj.prop] &&
          String(item[propObj.prop]).indexOf(String(value)) != -1
        );
      });
    }
  };


  /**
   * 获取需要过滤的prop
   */
  const getPropObj = computed(() => (column: PowerfulTableHeader): PowerfulTableHeaderProps<any> => {
    return propObjs(column)
  });

  return {
    headerFilterChange,
    getPropObj
  }
}

const propObjs = (column: PowerfulTableHeader): PowerfulTableHeaderProps<any> => {
  // 获取过滤项
  let propObj: PowerfulTableHeaderProps<any> = { prop: "" };
  // 判断是否数组
  if (!Array.isArray(column.props)) {
    propObj = column.props;
    return propObj;
  }
  // 是数组的情况下 首先判断单元格prop的数量
  if (column.props.length === 1) {
    propObj = column.props[0];
  } else if (column.props.length > 1) {
    // 如果数量在两个以上，则需要用户使用(filterItem: true)指定过滤项，未指定则取第一个
    const queryFilterItem = column.props.find((item) => item.filterItem);
    // 如果设置了一个或多个过滤项则取过滤后的第一个，如果没设置则取props第一个prop
    propObj = queryFilterItem ? queryFilterItem : column.props[0];
  }
  return propObj;
}

/**
 * 比较指定时间是否在指定时间段内
 * @param value 目标时间 可被new Date()解析
 * @param begin 开始时间 可被new Date()解析
 * @param end 结束时间 可被new Date()解析
 * @returns boolean
 */
const compare = (value: string, begin: string, end: string): boolean => {
  const valueData = new Date(value);
  const beginData = new Date(begin);
  const endData = new Date(end);
  if (valueData >= beginData && valueData <= endData) {
    return true;
  }
  return false;
};