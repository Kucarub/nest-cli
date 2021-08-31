export interface RedisConfig {
  // Redis 主机名
  readonly REDIS_HOST: string
  // Redis 端口号
  readonly REDIS_PORT: string
}

// 程序在本地运行连接 docker 内 redis 的配置
export class LocalEnvRedisConfig implements RedisConfig {
  REDIS_HOST = process.env.REDIS_HOST
  REDIS_PORT = process.env.REDIS_PORT
}

// 程序在 docker 内运行连接 redis（内网）的配置
export class DockerEnvRedisConfig extends LocalEnvRedisConfig {
  // docker redis 容器名作为连接主机名
  REDIS_HOST = process.env.REDIS_HOST
  // docker redis 容器内部端口作为连接的内网端口
  REDIS_PORT = process.env.REDIS_PORT
}
