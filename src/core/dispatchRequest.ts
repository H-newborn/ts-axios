/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 10:39:36
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 13:55:36
 */
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/header'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from '../xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理相关配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理请求头
function transformHeaders(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理请求数据
function transformRequestData(config: AxiosRequestConfig): void {
  const { data } = config
  return transformRequest(data)
}

// 处理相应数据
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default dispatchRequest
