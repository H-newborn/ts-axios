/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 09:19:02
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 09:33:51
 */
import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
    return
  }
}
