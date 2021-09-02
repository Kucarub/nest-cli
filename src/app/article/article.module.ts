import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { ArticleRepository } from '@/repositories/article.repository'
import { AuthModule } from '@/app/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository]), AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {
}
