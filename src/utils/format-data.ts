/**
 * 比较指定时间是否在指定时间段内
 * @param value 目标时间 可被new Date()解析
 * @param begin 开始时间 可被new Date()解析
 * @param end 结束时间 可被new Date()解析
 * @returns boolean
 */
export function compare(value: string, begin: string, end: string):boolean {
  const valueData = new Date(value)
  const beginData = new Date(begin)
  const endData = new Date(end)
  if (valueData >= beginData && valueData <= endData) {
    return true
  }
  return false
}