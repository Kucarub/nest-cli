import { join } from 'path'

type NodeEnv = 'development' | 'production' | 'testing'

export interface AppConfig {
  // 项目名
  readonly NAME: string
  // 项目中文名
  readonly CHINESE_NAME: string
  // 项目版本号
  readonly VERSION: string
  // 环境
  readonly ENV: NodeEnv
  // 是否开发环境
  readonly IS_DEV: boolean
  // 应用程序端口号
  readonly LISTEN_PORT: string
  // 安全密钥
  readonly SECRET_KEY: string
  // token 有效期（秒）
  readonly TOKEN_EXPIRES: number
  // 本地项目根路径
  readonly ROOT_LOCAL_PATH: string
  // 静态资源本地路径
  readonly STATIC_LOCAL_PATH: string
  // 静态资源站点前缀
  readonly STATIC_SITE_PREFIX: string
  // 文档站点前缀
  readonly DOC_SITE_PREFIX: string
  // 日志站点前缀
  readonly LOG_SITE_PREFIX: string
  // 文件存储站点前缀
  readonly FILE_SITE_PREFIX: string
  // 工具站点前缀
  readonly KIT_SITE_PREFIX: string
}

// 程序在本地运行的配置
export class LocalEnvAppConfig implements AppConfig {
  NAME = process.env.PROJECT_NAME
  CHINESE_NAME = process.env.PROJECT_NAME
  VERSION = process.env.PROJECT_VERSION
  ENV = (process.env.NODE_ENV as NodeEnv) || 'production'
  IS_DEV = (process.env.NODE_ENV as NodeEnv) === 'development'
  // 使用外部的端口号
  LISTEN_PORT = process.env.NEST_LISTEN_PORT
  SECRET_KEY = process.env.APP_SECRET_KEY
  TOKEN_EXPIRES = 24 * 3600 // 24h
  ROOT_LOCAL_PATH = join(__dirname, '..', '..', '..')
  STATIC_LOCAL_PATH = join(this.ROOT_LOCAL_PATH, 'data', 'oss')
  STATIC_SITE_PREFIX = 'oss'
  DOC_SITE_PREFIX = 'doc'
  LOG_SITE_PREFIX = 'log'
  FILE_SITE_PREFIX = 'file'
  KIT_SITE_PREFIX = 'kit'
}

// 程序在 docker 内运行的配置
export class DockerEnvAppConfig extends LocalEnvAppConfig {
  // 使用内部的端口号
  LISTEN_PORT = process.env.NEST_LISTEN_PORT_DOCKER
  STATIC_LOCAL_PATH = join(this.ROOT_LOCAL_PATH, 'data', 'oss')
}
