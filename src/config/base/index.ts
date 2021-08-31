import { AppConfig, LocalEnvAppConfig, DockerEnvAppConfig } from './app.config'
import { MySQLConfig, LocalEnvMySQLConfig, DockerEnvMySQLConfig } from './mysql.config'
import { RedisConfig, LocalEnvRedisConfig, DockerEnvRedisConfig } from './redis.config'

export interface Config {
  readonly APP: AppConfig
  readonly MYSQL: MySQLConfig
  readonly REDIS: RedisConfig
}

// 应用在本地运行的配置
export class LocalEnvConfig implements Config {
  APP: AppConfig = new LocalEnvAppConfig()
  MYSQL: MySQLConfig = new LocalEnvMySQLConfig()
  REDIS: RedisConfig = new LocalEnvRedisConfig()
}

// 应用在 docker 运行的配置
export class DockerEnvConfig implements Config {
  APP: AppConfig = new DockerEnvAppConfig()
  MYSQL: MySQLConfig = new DockerEnvMySQLConfig()
  REDIS: RedisConfig = new DockerEnvRedisConfig()
}
