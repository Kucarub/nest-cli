import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '@/repositories/user.repository'
import { AuthModule } from '@/app/auth/auth.module'
import { ArticleModule } from '../article/article.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule, ArticleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
