/*
 * @Author: Cphayim
 * @Date: 2019-07-09 16:28:58
 * @LastEditTime: 2019-07-11 13:50:53
 * @Description: TypeOrm 数据库配置对象
 */
// tslint:disable: radix
import { join } from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '@/config'

// 导出数据库配置对象
export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.MYSQL.HOST,
  port: parseInt(config.MYSQL.PORT),
  username: config.MYSQL.USER,
  password: config.MYSQL.PASSWORD,
  database: config.MYSQL.DATABASE,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
}

export const redisOptions = {
  host: config.REDIS.REDIS_HOST,
  port: parseInt(config.REDIS.REDIS_PORT),
  db: 0,
}
