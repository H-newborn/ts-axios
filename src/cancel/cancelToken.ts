/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 15:07:43
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 16:48:55
 */
import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
