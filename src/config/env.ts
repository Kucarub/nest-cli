/*
 * @Author: Cphayim
 * @Date: 2019-08-26 10:10:11
 * @LastEditTime: 2020-08-21 09:56:37
 * @Description: 环境变量加载器
 */
import { join } from 'path'
import { config as loadEnv } from 'dotenv'

/**
 * 加载 .env 文件中的环境变量到当前进程
 */
export function loadEnvFile(): void {
  const ROOT_PATH = join(__dirname, '..', '..')
  const ENV_FILE = join(ROOT_PATH, '.env')
  const { error } = loadEnv({ path: ENV_FILE, encoding: 'utf-8' })
  if (error) {
    throw new Error('.env 文件解析失败: \n' + error.message)
  }
}
