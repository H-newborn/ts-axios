/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 14:21:01
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 14:21:23
 */
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
