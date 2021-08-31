export interface MySQLConfig {
  // 连接主机名
  readonly HOST: string
  // 端口
  readonly PORT: string
  // 数据库名
  readonly DATABASE: string
  // 用户名
  readonly USER: string
  // 密码
  readonly PASSWORD: string
}

// 程序在本地运行连接 docker 内 mysql 的配置
export class LocalEnvMySQLConfig implements MySQLConfig {
  HOST = process.env.MYSQL_HOST
  PORT = process.env.MYSQL_PORT
  DATABASE = process.env.MYSQL_DATABASE
  USER = process.env.MYSQL_USERNAME
  PASSWORD = process.env.MYSQL_PASSWORD
}

// 程序在 docker 内运行连接 mysql（内网）的配置
export class DockerEnvMySQLConfig extends LocalEnvMySQLConfig {
  HOST = process.env.MYSQL_HOST_DOCKER
  PORT = process.env.MYSQL_PORT_DOCKER
}
