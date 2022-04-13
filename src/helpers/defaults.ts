/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 11:12:50
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 11:17:32
 */
import { AxiosRequestConfig } from '../types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
