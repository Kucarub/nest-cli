/*
 * @Author: Cphayim
 * @Date: 2019-07-09 14:03:05
 * @LastEditTime: 2019-07-11 13:52:00
 * @Description: 配置文件
 */

import { loadEnvFile } from './env'
import { Config } from './base'
import { configFactory } from './factory'
if (!process.env.DOCKER_NODE_ENV) {
  // 加载 .env 文件的环境变量到进程中
  loadEnvFile()
}

export const config: Config = configFactory()
