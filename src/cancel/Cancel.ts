/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 16:38:29
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 16:39:46
 */
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
