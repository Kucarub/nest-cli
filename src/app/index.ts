/*
 * @Author: Cphayim
 * @Date: 2019-07-06 16:55:14
 * @LastEditTime: 2019-07-10 09:59:57
 * @Description: 根模块
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'nestjs-redis'
import { EventsModule } from '@/app/websocket/events.module'

import { LoggerMiddleware } from '@/middlewares/logger.middleware'
import { typeOrmOptions, redisOptions } from '@/libs/db'
// 业务子模块
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ArticleModule } from './article/article.module'
import { UploadModule } from './upload/upload.module'
import { OcrModule } from './ocr/ocr.module'
import { VideoModule } from './video/video.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    // 数据库模块
    TypeOrmModule.forRoot(typeOrmOptions),
    // Redis 连接模块
    // RedisModule.register(redisOptions),
    // EventsModule,
    // 子模块
    UserModule,
    AuthModule,
    ArticleModule,
    UploadModule,
    OcrModule,
    VideoModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
