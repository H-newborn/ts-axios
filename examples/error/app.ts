/*
 * @Descripttion: 
 * @version: 
 * @Author: zch
 * @Date: 2022-04-12 15:55:32
 * @LastEditors: zch
 * @LastEditTime: 2022-04-12 17:46:49
 */
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
  console.log(e.code);
})