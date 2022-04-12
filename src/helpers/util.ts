/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 10:39:36
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 17:03:09
 */
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
  return val !== null && toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
