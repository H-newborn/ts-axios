/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 17:00:57
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 11:22:52
 */
import Axios from './core/Axios'
import defaults from './helpers/defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig } from './types'

// 工厂函数
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 指向 request 方法
  const instance = Axios.prototype.request.bind(context)
  // 继承方法
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
