/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 11:12:50
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 14:13:31
 */
import { AxiosRequestConfig } from '../types'
import { transformRequest, transformResponse } from './data'
import { processHeaders } from './header'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
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
