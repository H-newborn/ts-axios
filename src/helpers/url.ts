import { isDate, isPlainObject } from "./util"

export function buildURL(url: string, params?: any): string {
  if(!params) { return url }
  
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val == null) {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString
      } else if (isPlainObject(val)) {
        values = [val]
      }
    })
  })
  
  return ''
} 
