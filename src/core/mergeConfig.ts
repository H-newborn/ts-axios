/*
 * @Descripttion:
 * @version:
 * @Author: zch
 * @Date: 2022-04-13 11:25:11
 * @LastEditors: zch
 * @LastEditTime: 2022-04-13 13:46:31
 */
import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

interface Strat {
  [propName: string]: any
}
const strats: Strat = {}

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 自定义对象合并策略
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// 复杂对象合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  deaultConfig: AxiosRequestConfig,
  customConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!customConfig) {
    return deaultConfig
  }

  const config = Object.create(null)

  for (let key in customConfig) {
    mergeField(key)
  }

  for (let key in deaultConfig) {
    if (!customConfig[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(deaultConfig[key], customConfig![key])
  }

  return config
}
