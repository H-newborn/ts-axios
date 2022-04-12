import { AxiosRequestConfig, AxiosResponse } from '../types'

/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 15:25:08
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 15:33:16
 */
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string,
    response?: AxiosResponse,
    request?: any
  ) {
    super(message)

    this.config = config
    this.code = code
    this.response = response
    this.request = request
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
