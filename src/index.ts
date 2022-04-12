/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 10:39:36
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 10:44:05
 */
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
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

export default axios
