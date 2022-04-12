/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 10:39:36
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 15:51:56
 */
import { createError } from './helpers/error'
import { parseHeaders } from './helpers/parseHeaders'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 网络错误或者超时错误
      if (request.status === 0) {
        return
      }

      // 解析headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status < 200 || response.status > 300) {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      } else {
        resolve(response)
      }
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function(e) {
      reject(createError('Timeout of ${timeout}ms exceeded', config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      // data为空的情况下 不需要设置请求头
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
