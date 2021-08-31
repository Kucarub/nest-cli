/*
 * @Author: Cphayim
 * @Date: 2019-08-26 10:29:29
 * @LastEditTime: 2020-08-05 15:46:26
 * @Description: 配置工厂
 */
import { Config, DockerEnvConfig, LocalEnvConfig } from './base'

/**
 * 配置对象工厂
 */
export function configFactory(): Config {
  // 判断是否在 docker 容器内运行，该环境变量在 docker-compose 中注入
  const isInDocker = process.env.DOCKER_NODE_ENV
  const config: Config = isInDocker ? new DockerEnvConfig() : new LocalEnvConfig()
  checkMissingOption(config)
  if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line: no-console
    // console.log(config)
  }
  return config
}

/**
 * 检查是否有缺失的环境变量，直接抛出错误
 */
function checkMissingOption(config: Config) {
  Object.keys(config).forEach(key => {
    if (config[key] === undefined) {
      throw new RangeError(`[${key}] 参数缺失，请检查 .env 文件`)
    }
  })
}
