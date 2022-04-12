/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-12 17:00:57
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 17:14:10
 */
import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 指向 request 方法
  const instance = Axios.prototype.request.bind(context)
  // 继承方法
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
