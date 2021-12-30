/**
 * 比较指定时间是否在指定时间段内
 * @param str 长时间，形如 (2008-07-22 13:04:06)
 * @returns 
 */
export function compare(value: string, begin: string, end: string) {
  const valueData = new Date(value)
  const beginData = new Date(begin)
  const endData = new Date(end)
  if (valueData >= beginData && valueData <= endData) {
    return true
  }
  return false
}