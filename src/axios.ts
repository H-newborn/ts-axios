/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 17:00:57
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 14:57:44
 */
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './helpers/defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'

// 工厂函数
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 指向 request 方法
  const instance = Axios.prototype.request.bind(context)
  // 继承方法
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
