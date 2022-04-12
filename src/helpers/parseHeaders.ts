/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 14:38:18
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 14:49:09
 */
export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
